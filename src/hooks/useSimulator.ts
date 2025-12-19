import { useReducer, useCallback, useMemo } from 'react';
import { simulatorReducer } from '@/reducers/simulatorReducer';
import {
  SimulatorState,
  ModelConfig,
  MessageRole,
  getDefaultModel,
} from '@/types';
import { DEFAULT_SYSTEM_PROMPT } from '@/lib/constants';
import { calculateTokens } from '@/lib/tokenCalculator';

/**
 * Main hook for simulator state management
 * Provides state and actions for the context window simulator
 */
export function useSimulator(initialModel?: ModelConfig) {
  const model = initialModel || getDefaultModel();

  // Initial state
  const initialState: SimulatorState = {
    modelConfig: model,
    systemPrompt: {
      content: DEFAULT_SYSTEM_PROMPT,
      tokenCount: calculateTokens(DEFAULT_SYSTEM_PROMPT),
      isCustom: false,
    },
    messages: [],
    totalTokens: calculateTokens(DEFAULT_SYSTEM_PROMPT),
    remainingTokens:
      model.contextWindow - calculateTokens(DEFAULT_SYSTEM_PROMPT),
    capacityPercentage:
      (calculateTokens(DEFAULT_SYSTEM_PROMPT) / model.contextWindow) * 100,
    isOverflowing: false,
  };

  const [state, dispatch] = useReducer(simulatorReducer, initialState);

  // Actions
  const addMessage = useCallback((role: MessageRole, content: string) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { role, content } });
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: messageId });
  }, []);

  const changeModel = useCallback((modelConfig: ModelConfig) => {
    dispatch({ type: 'CHANGE_MODEL', payload: modelConfig });
  }, []);

  const updateSystemPrompt = useCallback((content: string) => {
    dispatch({ type: 'UPDATE_SYSTEM_PROMPT', payload: content });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const loadState = useCallback((newState: SimulatorState) => {
    dispatch({ type: 'LOAD_STATE', payload: newState });
  }, []);

  // Computed values
  const visibleMessages = useMemo(
    () => state.messages.filter((msg) => msg.isVisible),
    [state.messages]
  );

  const removedMessages = useMemo(
    () => state.messages.filter((msg) => !msg.isVisible),
    [state.messages]
  );

  return {
    // State
    state,
    visibleMessages,
    removedMessages,

    // Actions
    actions: {
      addMessage,
      removeMessage,
      changeModel,
      updateSystemPrompt,
      reset,
      loadState,
    },
  };
}
