import { Message, SystemPrompt } from './message';
import { ModelConfig } from './model';

/**
 * Main simulator state
 */
export interface SimulatorState {
  /** Current model configuration */
  modelConfig: ModelConfig;

  /** System prompt */
  systemPrompt: SystemPrompt;

  /** All messages in conversation */
  messages: Message[];

  /** Total tokens used (including system prompt) */
  totalTokens: number;

  /** Remaining token capacity */
  remainingTokens: number;

  /** Capacity percentage (0-100+) */
  capacityPercentage: number;

  /** Whether context window is overflowing */
  isOverflowing: boolean;
}

/**
 * Capacity status levels
 */
export type CapacityStatus = 'low' | 'medium' | 'high' | 'critical';

/**
 * Capacity status information
 */
export interface CapacityInfo {
  status: CapacityStatus;
  color: string;
  message: string;
  showWarning: boolean;
}

/**
 * Token breakdown by type
 */
export interface TokenBreakdown {
  systemPrompt: number;
  userMessages: number;
  assistantMessages: number;
  toolMessages: number;
  total: number;
  remaining: number;
}

/**
 * Simulator action types
 */
export type SimulatorAction =
  | { type: 'ADD_MESSAGE'; payload: { role: string; content: string } }
  | { type: 'REMOVE_MESSAGE'; payload: string }
  | { type: 'CHANGE_MODEL'; payload: ModelConfig }
  | { type: 'UPDATE_SYSTEM_PROMPT'; payload: string }
  | { type: 'RESET' }
  | { type: 'LOAD_STATE'; payload: SimulatorState };

/**
 * Overflow result
 */
export interface OverflowResult {
  messages: Message[];
  isOverflowing: boolean;
  removedCount: number;
}
