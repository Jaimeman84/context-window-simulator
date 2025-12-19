'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSimulator } from '@/hooks/useSimulator';
import { ContextWindow } from '@/components/simulator/ContextWindow';
import { getDefaultModel } from '@/types';

const TUTORIAL_STEPS = [
  {
    title: 'What is a Context Window?',
    description:
      'A context window is the maximum amount of text that an AI model can process at once. Think of it as the model\'s "working memory."',
    action: null,
    explanation:
      'Everything in a conversation counts toward this limit: system instructions, your messages, and the AI\'s responses.',
  },
  {
    title: 'Filling the Window',
    description:
      'Let\'s add some messages and watch how the context window fills up.',
    action: 'add_messages',
    explanation:
      'Notice how each message consumes tokens. The progress bar shows how full the window is.',
  },
  {
    title: 'Reaching Limits',
    description:
      'What happens when the context window gets full? Let\'s find out.',
    action: 'fill_window',
    explanation:
      'When the window reaches capacity, older messages must be removed to make room for new ones. This is called truncation or overflow.',
  },
  {
    title: 'Why It Matters',
    description:
      'Understanding context windows helps you design better AI applications.',
    action: null,
    explanation:
      'Different models have different context sizes. Choosing the right model for your needs is crucial for building effective AI features.',
  },
];

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { state, actions } = useSimulator(getDefaultModel());

  const handleNext = () => {
    const step = TUTORIAL_STEPS[currentStep];

    if (step.action === 'add_messages') {
      actions.addMessage('user', 'Hello! How are you?');
      setTimeout(() => {
        actions.addMessage(
          'assistant',
          "I'm doing well, thank you! How can I help you today?"
        );
      }, 500);
    } else if (step.action === 'fill_window') {
      // Add several longer messages
      actions.addMessage(
        'user',
        'Can you explain what a context window is in detail?'
      );
      setTimeout(() => {
        actions.addMessage(
          'assistant',
          'A context window is the maximum amount of text that an AI model can process at once. Think of it as the model\'s working memory. Everything in our conversation - including this message, your questions, my responses, and the system prompt - all counts toward that limit. When the window fills up, older messages need to be removed to make room for new ones. This is why you might notice that in very long conversations, the AI might not remember things from much earlier in the chat.'
        );
      }, 800);
      setTimeout(() => {
        actions.addMessage(
          'user',
          'What happens if I try to add more content than fits?'
        );
      }, 1600);
      setTimeout(() => {
        actions.addMessage(
          'assistant',
          'When you try to add content that exceeds the context window, the oldest messages in the conversation are automatically removed. This ensures the model stays within its processing limits. However, this means the AI loses access to that earlier context.'
        );
      }, 2400);
    }

    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, step.action ? 3000 : 100);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    actions.reset();
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Interactive Tutorial</h1>
        <p className="text-base-content/70">
          Learn about context windows step by step
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {TUTORIAL_STEPS.length}
          </span>
          <button onClick={handleReset} className="btn btn-ghost btn-sm">
            Reset
          </button>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={((currentStep + 1) / TUTORIAL_STEPS.length) * 100}
          max="100"
        ></progress>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Instructions */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card bg-base-200 shadow-lg"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl">{step.title}</h2>
                <p className="text-lg">{step.description}</p>

                <div className="divider"></div>

                <div className="bg-info/10 p-4 rounded-lg">
                  <p className="text-sm">{step.explanation}</p>
                </div>

                {step.action && (
                  <div className="alert alert-info mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="text-sm">
                      Click "Next" to see this in action
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn btn-outline"
            >
              Previous
            </button>

            {currentStep < TUTORIAL_STEPS.length - 1 ? (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            ) : (
              <Link href="/scenarios" className="btn btn-primary">
                Try Scenarios
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Simulator */}
        <div>
          <ContextWindow state={state} showControls={false} />
        </div>
      </div>
    </div>
  );
}
