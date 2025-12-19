/**
 * Message role types in the context window
 */
export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

/**
 * Represents a single message in the context window
 */
export interface Message {
  /** Unique identifier for the message */
  id: string;

  /** Type/role of the message */
  role: MessageRole;

  /** Text content of the message */
  content: string;

  /** Calculated token count for this message */
  tokenCount: number;

  /** Timestamp when the message was added */
  timestamp: number;

  /** Whether the message is currently in the context window */
  isVisible: boolean;

  /** Whether the message was truncated */
  isTruncated: boolean;
}

/**
 * System prompt configuration
 */
export interface SystemPrompt {
  /** System prompt content */
  content: string;

  /** Token count for system prompt */
  tokenCount: number;

  /** Whether this is a custom system prompt */
  isCustom: boolean;
}

/**
 * Configuration for message role display
 */
export interface MessageRoleConfig {
  icon: string;
  color: string;
  label: string;
}

/**
 * Map of role configurations
 */
export const MESSAGE_ROLE_CONFIGS: Record<MessageRole, MessageRoleConfig> = {
  system: {
    icon: '🔧',
    color: 'neutral',
    label: 'System',
  },
  user: {
    icon: '👤',
    color: 'primary',
    label: 'User',
  },
  assistant: {
    icon: '🤖',
    color: 'secondary',
    label: 'Assistant',
  },
  tool: {
    icon: '🛠️',
    color: 'accent',
    label: 'Tool',
  },
};
