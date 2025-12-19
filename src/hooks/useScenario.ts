import { useState, useCallback, useEffect } from 'react';
import { Scenario, ScenarioStep } from '@/types';
import { useSimulator } from './useSimulator';
import { getModelById } from '@/types';
import { createMessage } from '@/lib/messageHelpers';

/**
 * Hook for managing scenario execution
 */
export function useScenario(scenario: Scenario) {
  const model = getModelById(scenario.modelId);
  const { state, actions } = useSimulator(model);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const currentStep = scenario.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / scenario.steps.length) * 100;

  // Execute the current step's action
  const executeStepAction = useCallback((step: ScenarioStep) => {
    setIsExecuting(true);

    switch (step.action) {
      case 'add_message':
        if (step.payload?.role && step.payload?.content) {
          setTimeout(() => {
            actions.addMessage(step.payload!.role!, step.payload!.content!);
            setIsExecuting(false);
          }, 500);
        }
        break;

      case 'add_document':
        if (step.payload?.content) {
          setTimeout(() => {
            actions.addMessage('user', step.payload!.content!);
            setIsExecuting(false);
          }, 500);
        }
        break;

      case 'explain':
      case 'wait':
      case 'highlight':
        // These actions don't modify state, just show info
        setIsExecuting(false);
        break;

      default:
        setIsExecuting(false);
    }
  }, [actions]);

  // Move to next step
  const nextStep = useCallback(() => {
    if (currentStepIndex < scenario.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      executeStepAction(scenario.steps[nextIndex]);
    } else {
      setIsComplete(true);
    }
  }, [currentStepIndex, scenario.steps, executeStepAction]);

  // Move to previous step
  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsComplete(false);
    }
  }, [currentStepIndex]);

  // Reset scenario
  const resetScenario = useCallback(() => {
    setCurrentStepIndex(0);
    setIsComplete(false);
    setIsExecuting(false);
    actions.reset();
  }, [actions]);

  // Auto-execute first step on mount
  useEffect(() => {
    if (currentStepIndex === 0 && scenario.steps[0]) {
      executeStepAction(scenario.steps[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // State
    state,
    currentStep,
    currentStepIndex,
    totalSteps: scenario.steps.length,
    progress,
    isComplete,
    isExecuting,

    // Actions
    nextStep,
    previousStep,
    resetScenario,
  };
}
