'use client';

import { useState, useRef } from 'react';
import { MODELS } from '@/types';

const SYSTEM_PROMPT_TOKENS = 300;
const CONTEXT_WINDOW = MODELS[0].contextWindow; // GPT-3.5 4096 tokens

// Generate a long list of messages to allow infinite scrolling
const generateMessages = (count: number) => {
  const messages = [];
  for (let i = 0; i < count; i++) {
    const msgNum = i + 1;
    if (i % 2 === 0) {
      messages.push({
        role: 'user' as const,
        tokens: 150 + (i * 10),
        content: `Message ${msgNum}: User question`
      });
    } else {
      messages.push({
        role: 'assistant' as const,
        tokens: 250 + (i * 15),
        content: `Message ${msgNum}: Assistant response`
      });
    }
  }
  return messages;
};

const DEMO_MESSAGES = generateMessages(30); // Generate 30 messages for demonstration

// Generate steps dynamically - 2 messages per step
const generateSteps = () => {
  const steps = [
    {
      title: 'Start: System Prompt Only',
      description: 'Every conversation begins with a system prompt that defines the AI\'s behavior. This always stays in the context window.',
      messageCount: 0,
    }
  ];

  for (let i = 1; i <= 15; i++) {
    const messageCount = i * 2;
    const totalTokens = SYSTEM_PROMPT_TOKENS + DEMO_MESSAGES.slice(0, messageCount).reduce((sum, m) => sum + m.tokens, 0);
    const isOverflow = totalTokens > CONTEXT_WINDOW;

    steps.push({
      title: `Step ${i}: ${isOverflow ? 'Overflow - Old Messages Fading' : 'Adding Messages'}`,
      description: isOverflow
        ? `Messages ${messageCount - 1}-${messageCount} added. Oldest messages are fading/truncated to stay within the ${CONTEXT_WINDOW.toLocaleString()} token limit. System prompt always remains!`
        : `Messages ${messageCount - 1}-${messageCount} added. Total: ${totalTokens.toLocaleString()} tokens used (${Math.round((totalTokens / CONTEXT_WINDOW) * 100)}% full).`,
      messageCount
    });
  }

  return steps;
};

const STEPS = generateSteps();

export default function VisualizerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const messageListRef = useRef<HTMLDivElement>(null);

  const step = STEPS[currentStep];
  const activeMessages = DEMO_MESSAGES.slice(0, step.messageCount);

  // Don't auto-scroll - let users see the top messages

  // Calculate total tokens including system prompt
  const totalTokens = SYSTEM_PROMPT_TOKENS + activeMessages.reduce((sum, msg) => sum + msg.tokens, 0);
  const overflow = Math.max(0, totalTokens - CONTEXT_WINDOW);

  // Calculate how many tokens have been truncated from the beginning
  const tokensTruncated = overflow;

  // Calculate which messages should be visible and their opacity
  const messagesWithState = activeMessages.map((msg, index) => {
    // Calculate position of this message in the original sequence
    const tokensBeforeThis = activeMessages.slice(0, index).reduce((sum, m) => sum + m.tokens, 0);
    const messageStart = tokensBeforeThis;
    const messageEnd = tokensBeforeThis + msg.tokens;

    // Check if this message is affected by truncation
    if (tokensTruncated === 0) {
      // No truncation - message fully visible
      return { ...msg, opacity: 1, isTruncated: false, tokensRemaining: msg.tokens };
    } else if (tokensTruncated >= messageEnd) {
      // Completely truncated
      return { ...msg, opacity: 0, isTruncated: true, tokensRemaining: 0 };
    } else if (tokensTruncated > messageStart) {
      // Partially truncated
      const tokensRemaining = messageEnd - tokensTruncated;
      const opacity = Math.max(0.15, tokensRemaining / msg.tokens);
      return { ...msg, opacity, isTruncated: true, tokensRemaining };
    } else {
      // Not truncated
      return { ...msg, opacity: 1, isTruncated: false, tokensRemaining: msg.tokens };
    }
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Context Window Visualizer</h1>
        <p className="text-base-content/70">
          See how messages fill the context window and what happens when it overflows
        </p>
      </div>

      {/* Current Step Info */}
      <div className="card bg-base-200 mb-6">
        <div className="card-body">
          <h2 className="text-2xl font-bold">{step.title}</h2>
          <p className="text-base-content/80">{step.description}</p>
          <div className="mt-2">
            <span className="text-sm font-mono">
              Total Tokens: <span className={totalTokens > CONTEXT_WINDOW ? 'text-error font-bold' : 'text-success'}>{totalTokens}</span> / {CONTEXT_WINDOW}
              {totalTokens > CONTEXT_WINDOW && (
                <span className="text-error ml-2">
                  (Overflow: {totalTokens - CONTEXT_WINDOW} tokens removed from oldest messages)
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Bar Visualization */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">Context Window ({CONTEXT_WINDOW} tokens)</h3>

          {/* The horizontal bar */}
          <div className="relative h-32 bg-base-300 rounded-lg border-2 border-base-content/20">
            {/* System Prompt - always visible */}
            <div
              className="absolute left-0 top-0 h-full bg-gray-700 border-r-2 border-gray-900 flex items-center justify-center transition-all duration-500"
              style={{ width: `${(SYSTEM_PROMPT_TOKENS / CONTEXT_WINDOW) * 100}%` }}
            >
              <span className="text-xs font-bold text-white rotate-0">System</span>
            </div>

            {/* Messages */}
            {messagesWithState.filter(msg => msg.tokensRemaining > 0).map((msg) => {
              // Calculate position accounting for truncation
              // Only show the portion that hasn't been truncated
              const originalIndex = messagesWithState.indexOf(msg);
              const tokensBeforeThis = activeMessages.slice(0, originalIndex).reduce((sum, m) => sum + m.tokens, 0);

              // Adjust position: subtract truncated tokens, then add system prompt
              const adjustedStart = Math.max(0, tokensBeforeThis - tokensTruncated);
              const leftPosition = ((SYSTEM_PROMPT_TOKENS + adjustedStart) / CONTEXT_WINDOW) * 100;
              const width = (msg.tokensRemaining / CONTEXT_WINDOW) * 100;

              // Skip if completely outside the window
              if (leftPosition >= 100 || width <= 0) return null;

              return (
                <div
                  key={originalIndex}
                  className={`absolute top-0 h-full border-r border-base-content/30 flex items-center justify-center transition-all duration-500 ${
                    msg.role === 'user' ? 'bg-blue-500' : 'bg-orange-400'
                  }`}
                  style={{
                    left: `${leftPosition}%`,
                    width: `${width}%`,
                    opacity: msg.opacity,
                  }}
                >
                  <span className="text-xs font-bold text-white">{originalIndex + 1}</span>
                  {msg.isTruncated && (
                    <div className="absolute inset-0 bg-red-500/30 animate-pulse" />
                  )}
                </div>
              );
            })}

            {/* Overflow indicator */}
            {totalTokens > CONTEXT_WINDOW && (
              <div
                className="absolute top-0 right-0 h-full w-1 bg-error animate-pulse"
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded"></div>
              <span>System Prompt (always present)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span>User Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-400 rounded"></div>
              <span>Assistant Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400/30 rounded border-2 border-red-500"></div>
              <span>Faded = Truncated/Removed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">Messages in Context Window</h3>

          {/* Controls */}
          <div className="flex gap-3 justify-center mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn btn-outline"
            >
              Previous
            </button>
            <button
              onClick={handleReset}
              className="btn btn-outline"
            >
              Reset
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === STEPS.length - 1}
              className="btn btn-primary"
            >
              Next Step
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="text-center mb-6 text-sm text-base-content/70">
            Step {currentStep + 1} of {STEPS.length}
          </div>

          <div ref={messageListRef} className="space-y-2 max-h-[340px] overflow-y-auto pr-2">
            {/* System Prompt */}
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div className="flex-grow">
                <div className="font-semibold text-white">System Prompt</div>
                <div className="text-sm text-gray-300">Always present - {SYSTEM_PROMPT_TOKENS} tokens</div>
              </div>
            </div>

            {/* Messages - only show non-truncated ones */}
            {messagesWithState.filter(msg => msg.tokensRemaining > 0).map((msg) => {
              const originalIndex = messagesWithState.indexOf(msg);
              return (
                <div
                  key={originalIndex}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                    msg.role === 'user' ? 'bg-blue-500/20' : 'bg-orange-400/20'
                  }`}
                  style={{ opacity: msg.opacity }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    msg.role === 'user' ? 'bg-blue-500' : 'bg-orange-400'
                  }`}>
                    {originalIndex + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold">
                      {msg.content}
                      {msg.isTruncated && <span className="text-error ml-2">(Being Truncated)</span>}
                    </div>
                    <div className="text-sm opacity-70">{msg.tokens} tokens</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
