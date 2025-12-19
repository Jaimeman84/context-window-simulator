import {
  SimulatorState,
  SimulatorAction,
  MessageRole,
  Message,
} from '@/types';
import { createMessage } from '@/lib/messageHelpers';
import { calculateTotalTokens, calculateCapacityPercentage } from '@/lib/tokenCalculator';
import { handleOverflow } from '@/lib/overflowHandler';

/**
 * Simulator state reducer
 * Handles all state transitions for the context window simulator
 */
export function simulatorReducer(
  state: SimulatorState,
  action: SimulatorAction
): SimulatorState {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { role, content } = action.payload;

      // Create new message
      const newMessage = createMessage(role as MessageRole, content);

      // Add to messages array
      const updatedMessages = [...state.messages, newMessage];

      // Calculate new totals
      const totalTokens = calculateTotalTokens(
        state.systemPrompt,
        updatedMessages
      );

      // Handle overflow
      const { messages, isOverflowing, removedCount } = handleOverflow(
        updatedMessages,
        state.modelConfig.contextWindow,
        state.systemPrompt.tokenCount
      );

      // Calculate remaining and percentage
      const remainingTokens = Math.max(
        0,
        state.modelConfig.contextWindow - totalTokens
      );
      const capacityPercentage = calculateCapacityPercentage(
        totalTokens,
        state.modelConfig.contextWindow
      );

      return {
        ...state,
        messages,
        totalTokens,
        remainingTokens,
        capacityPercentage,
        isOverflowing,
      };
    }

    case 'REMOVE_MESSAGE': {
      const messageId = action.payload;

      // Remove the message
      const updatedMessages = state.messages.filter(
        (msg) => msg.id !== messageId
      );

      // Recalculate totals
      const totalTokens = calculateTotalTokens(
        state.systemPrompt,
        updatedMessages
      );

      // Handle overflow (in case removal brings us back in range)
      const { messages, isOverflowing } = handleOverflow(
        updatedMessages,
        state.modelConfig.contextWindow,
        state.systemPrompt.tokenCount
      );

      const remainingTokens = Math.max(
        0,
        state.modelConfig.contextWindow - totalTokens
      );
      const capacityPercentage = calculateCapacityPercentage(
        totalTokens,
        state.modelConfig.contextWindow
      );

      return {
        ...state,
        messages,
        totalTokens,
        remainingTokens,
        capacityPercentage,
        isOverflowing,
      };
    }

    case 'CHANGE_MODEL': {
      const newModelConfig = action.payload;

      // Recalculate with new model's context window
      const totalTokens = calculateTotalTokens(
        state.systemPrompt,
        state.messages
      );

      // Handle overflow with new model size
      const { messages, isOverflowing } = handleOverflow(
        state.messages,
        newModelConfig.contextWindow,
        state.systemPrompt.tokenCount
      );

      const remainingTokens = Math.max(
        0,
        newModelConfig.contextWindow - totalTokens
      );
      const capacityPercentage = calculateCapacityPercentage(
        totalTokens,
        newModelConfig.contextWindow
      );

      return {
        ...state,
        modelConfig: newModelConfig,
        messages,
        totalTokens,
        remainingTokens,
        capacityPercentage,
        isOverflowing,
      };
    }

    case 'UPDATE_SYSTEM_PROMPT': {
      const newContent = action.payload;
      const newSystemPrompt = {
        ...state.systemPrompt,
        content: newContent,
        tokenCount: createMessage('system', newContent).tokenCount,
        isCustom: true,
      };

      // Recalculate totals
      const totalTokens = calculateTotalTokens(
        newSystemPrompt,
        state.messages
      );

      // Handle overflow
      const { messages, isOverflowing } = handleOverflow(
        state.messages,
        state.modelConfig.contextWindow,
        newSystemPrompt.tokenCount
      );

      const remainingTokens = Math.max(
        0,
        state.modelConfig.contextWindow - totalTokens
      );
      const capacityPercentage = calculateCapacityPercentage(
        totalTokens,
        state.modelConfig.contextWindow
      );

      return {
        ...state,
        systemPrompt: newSystemPrompt,
        messages,
        totalTokens,
        remainingTokens,
        capacityPercentage,
        isOverflowing,
      };
    }

    case 'RESET': {
      const totalTokens = state.systemPrompt.tokenCount;
      const remainingTokens =
        state.modelConfig.contextWindow - totalTokens;
      const capacityPercentage = calculateCapacityPercentage(
        totalTokens,
        state.modelConfig.contextWindow
      );

      return {
        ...state,
        messages: [],
        totalTokens,
        remainingTokens,
        capacityPercentage,
        isOverflowing: false,
      };
    }

    case 'LOAD_STATE': {
      return action.payload;
    }

    default:
      return state;
  }
}
