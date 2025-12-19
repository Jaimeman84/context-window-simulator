'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Scenario } from '@/types';
import { useScenario } from '@/hooks/useScenario';
import { ContextWindow } from '@/components/simulator/ContextWindow';
import Link from 'next/link';

interface ScenarioRunnerProps {
  scenario: Scenario;
}

export function ScenarioRunner({ scenario }: ScenarioRunnerProps) {
  const {
    state,
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    isComplete,
    isExecuting,
    nextStep,
    previousStep,
    resetScenario,
  } = useScenario(scenario);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <span className="text-5xl">{scenario.icon}</span>
            {scenario.title}
          </h1>
          <p className="text-base-content/70 mt-2">{scenario.description}</p>
        </div>
        <div className="text-right">
          <div className={`badge badge-lg mb-2 ${
            scenario.difficulty === 'beginner' ? 'badge-success' :
            scenario.difficulty === 'intermediate' ? 'badge-warning' :
            'badge-error'
          }`}>
            {scenario.difficulty}
          </div>
          <p className="text-sm text-base-content/50">
            ~{scenario.estimatedMinutes} min
          </p>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="font-semibold mb-2">Learning Objectives:</h3>
          <ul className="space-y-1">
            {scenario.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-success mt-0.5">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <button onClick={resetScenario} className="btn btn-ghost btn-xs">
            Reset Scenario
          </button>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"
        ></progress>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Instructions */}
        <div className="space-y-6">
          {!isComplete ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="card bg-base-200 shadow-lg"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="card-title text-2xl">
                      {currentStep?.instruction}
                    </h2>
                    {isExecuting && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}
                  </div>

                  <div className="divider"></div>

                  <div className="bg-info/10 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">
                      Expected Outcome:
                    </p>
                    <p className="text-sm">{currentStep?.expectedOutcome}</p>
                  </div>

                  {currentStep?.payload?.explanation && (
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
                        {currentStep.payload.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card bg-success/10 border-2 border-success shadow-lg"
            >
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="card-title text-2xl mb-2">
                  Scenario Complete!
                </h2>
                <p className="text-base-content/70 mb-4">
                  Great job! You've completed the "{scenario.title}" scenario.
                </p>

                <div className="bg-base-200 p-4 rounded-lg w-full mb-4">
                  <p className="font-semibold mb-2">What you learned:</p>
                  <ul className="text-sm space-y-1 text-left">
                    {scenario.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button onClick={resetScenario} className="btn btn-outline">
                    Try Again
                  </button>
                  <Link href="/scenarios" className="btn btn-ghost">
                    More Scenarios
                  </Link>
                  <Link href="/sandbox" className="btn btn-primary">
                    Open Sandbox
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          {!isComplete && (
            <div className="flex justify-between">
              <button
                onClick={previousStep}
                disabled={currentStepIndex === 0}
                className="btn btn-outline"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <button
                onClick={nextStep}
                disabled={isExecuting}
                className="btn btn-primary"
              >
                {currentStepIndex < totalSteps - 1 ? 'Next' : 'Complete'}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Simulator */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ContextWindow state={state} showControls={false} />
        </div>
      </div>
    </div>
  );
}
