import { Message, OverflowResult } from '@/types';

/**
 * Handle context window overflow by removing oldest messages
 * Marks messages as not visible rather than deleting them (educational)
 */
export function handleOverflow(
  messages: Message[],
  maxTokens: number,
  systemPromptTokens: number
): OverflowResult {
  const availableTokens = maxTokens - systemPromptTokens;
  let currentTokens = messages.reduce((sum, msg) => sum + msg.tokenCount, 0);

  // If we fit within limits, mark all as visible
  if (currentTokens <= availableTokens) {
    return {
      messages: messages.map((msg) => ({ ...msg, isVisible: true })),
      isOverflowing: false,
      removedCount: 0,
    };
  }

  // Need to remove oldest messages until we fit
  const updatedMessages = [...messages];
  let removedCount = 0;
  let startIndex = 0;

  // Calculate how many messages to hide from the start
  while (currentTokens > availableTokens && startIndex < updatedMessages.length) {
    const oldest = updatedMessages[startIndex];
    currentTokens -= oldest.tokenCount;
    removedCount++;
    startIndex++;
  }

  // Mark messages as visible/invisible
  const result = updatedMessages.map((msg, index) => ({
    ...msg,
    isVisible: index >= startIndex,
  }));

  return {
    messages: result,
    isOverflowing: true,
    removedCount,
  };
}

/**
 * Check if adding a message would cause overflow
 */
export function wouldOverflow(
  messages: Message[],
  newTokenCount: number,
  maxTokens: number,
  systemPromptTokens: number
): {
  willOverflow: boolean;
  tokensOver: number;
  messagestoRemove: number;
} {
  const currentTokens = messages.reduce((sum, msg) => sum + msg.tokenCount, 0);
  const availableTokens = maxTokens - systemPromptTokens;
  const totalAfterAdd = currentTokens + newTokenCount;

  if (totalAfterAdd <= availableTokens) {
    return {
      willOverflow: false,
      tokensOver: 0,
      messagestoRemove: 0,
    };
  }

  const tokensOver = totalAfterAdd - availableTokens;
  let tokensToRemove = tokensOver;
  let messagesToRemove = 0;

  // Calculate how many messages need to be removed
  for (const msg of messages) {
    if (tokensToRemove <= 0) break;
    tokensToRemove -= msg.tokenCount;
    messagesToRemove++;
  }

  return {
    willOverflow: true,
    tokensOver,
    messagestoRemove: messagesToRemove,
  };
}

/**
 * Get only visible messages
 */
export function getVisibleMessages(messages: Message[]): Message[] {
  return messages.filter((msg) => msg.isVisible);
}

/**
 * Get only removed/hidden messages
 */
export function getRemovedMessages(messages: Message[]): Message[] {
  return messages.filter((msg) => !msg.isVisible);
}

/**
 * Count visible tokens
 */
export function countVisibleTokens(messages: Message[]): number {
  return messages
    .filter((msg) => msg.isVisible)
    .reduce((sum, msg) => sum + msg.tokenCount, 0);
}
