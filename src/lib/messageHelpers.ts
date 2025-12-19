import { Message, MessageRole } from '@/types';
import { calculateTokens } from './tokenCalculator';

/**
 * Generate unique ID for messages
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new message
 */
export function createMessage(
  role: MessageRole,
  content: string,
  options?: Partial<Message>
): Message {
  return {
    id: options?.id || generateId(),
    role,
    content,
    tokenCount: options?.tokenCount || calculateTokens(content),
    timestamp: options?.timestamp || Date.now(),
    isVisible: options?.isVisible ?? true,
    isTruncated: options?.isTruncated ?? false,
  };
}

/**
 * Sort messages by timestamp
 */
export function sortMessagesByTimestamp(messages: Message[]): Message[] {
  return [...messages].sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Filter messages by role
 */
export function filterMessagesByRole(
  messages: Message[],
  role: MessageRole
): Message[] {
  return messages.filter((msg) => msg.role === role);
}

/**
 * Get message by ID
 */
export function getMessageById(
  messages: Message[],
  id: string
): Message | undefined {
  return messages.find((msg) => msg.id === id);
}

/**
 * Update message by ID
 */
export function updateMessage(
  messages: Message[],
  id: string,
  updates: Partial<Message>
): Message[] {
  return messages.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg));
}

/**
 * Remove message by ID
 */
export function removeMessage(messages: Message[], id: string): Message[] {
  return messages.filter((msg) => msg.id !== id);
}

/**
 * Get the most recent message
 */
export function getLatestMessage(messages: Message[]): Message | undefined {
  if (messages.length === 0) return undefined;
  return messages[messages.length - 1];
}

/**
 * Count messages by role
 */
export function countMessagesByRole(
  messages: Message[],
  role: MessageRole
): number {
  return messages.filter((msg) => msg.role === role).length;
}

/**
 * Create a sample conversation
 */
export function createSampleConversation(): Message[] {
  return [
    createMessage('user', 'Hello! How are you?'),
    createMessage(
      'assistant',
      "I'm doing well, thank you! How can I help you today?"
    ),
    createMessage('user', 'Can you explain what a context window is?'),
    createMessage(
      'assistant',
      'A context window is the maximum amount of text that an AI model can process at once. Think of it as the model\'s "working memory."'
    ),
  ];
}
