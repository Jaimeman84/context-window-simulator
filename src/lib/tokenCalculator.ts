import { CHARACTERS_PER_TOKEN } from './constants';
import { Message, SystemPrompt, TokenBreakdown, CapacityInfo, CapacityStatus } from '@/types';
import { CAPACITY_THRESHOLDS } from './constants';

/**
 * Calculate estimated token count for text
 * Uses rough approximation: 1 token ≈ 4 characters for English
 * This is simplified for educational purposes
 */
export function calculateTokens(text: string): number {
  if (!text) return 0;

  // Remove extra whitespace
  const cleaned = text.trim().replace(/\s+/g, ' ');

  // Approximate token count
  const charCount = cleaned.length;
  const estimatedTokens = Math.ceil(charCount / CHARACTERS_PER_TOKEN);

  // Minimum 1 token for non-empty strings
  return Math.max(1, estimatedTokens);
}

/**
 * Calculate total tokens in conversation
 */
export function calculateTotalTokens(
  systemPrompt: SystemPrompt,
  messages: Message[]
): number {
  const messageTokens = messages.reduce((sum, msg) => sum + msg.tokenCount, 0);
  return systemPrompt.tokenCount + messageTokens;
}

/**
 * Get token breakdown by message type
 */
export function getTokenBreakdown(
  systemPrompt: SystemPrompt,
  messages: Message[],
  maxTokens: number
): TokenBreakdown {
  const systemTokens = systemPrompt.tokenCount;

  const userTokens = messages
    .filter((msg) => msg.role === 'user')
    .reduce((sum, msg) => sum + msg.tokenCount, 0);

  const assistantTokens = messages
    .filter((msg) => msg.role === 'assistant')
    .reduce((sum, msg) => sum + msg.tokenCount, 0);

  const toolTokens = messages
    .filter((msg) => msg.role === 'tool')
    .reduce((sum, msg) => sum + msg.tokenCount, 0);

  const total = systemTokens + userTokens + assistantTokens + toolTokens;
  const remaining = Math.max(0, maxTokens - total);

  return {
    systemPrompt: systemTokens,
    userMessages: userTokens,
    assistantMessages: assistantTokens,
    toolMessages: toolTokens,
    total,
    remaining,
  };
}

/**
 * Get capacity status based on percentage
 */
export function getCapacityStatus(percentage: number): CapacityInfo {
  let status: CapacityStatus;
  let color: string;
  let message: string;
  let showWarning: boolean;

  if (percentage < CAPACITY_THRESHOLDS.low) {
    status = 'low';
    color = 'success';
    message = 'Plenty of space available';
    showWarning = false;
  } else if (percentage < CAPACITY_THRESHOLDS.medium) {
    status = 'medium';
    color = 'warning';
    message = 'Getting full - watch your space';
    showWarning = true;
  } else if (percentage < CAPACITY_THRESHOLDS.high) {
    status = 'high';
    color = 'error';
    message = 'Almost full! Next message may remove old ones';
    showWarning = true;
  } else {
    status = 'critical';
    color = 'error';
    message = 'Overflow! Old messages have been removed';
    showWarning = true;
  }

  return { status, color, message, showWarning };
}

/**
 * Format token count with commas for readability
 */
export function formatTokenCount(tokens: number): string {
  return tokens.toLocaleString();
}

/**
 * Calculate percentage of capacity used
 */
export function calculateCapacityPercentage(
  currentTokens: number,
  maxTokens: number
): number {
  if (maxTokens === 0) return 0;
  return (currentTokens / maxTokens) * 100;
}

/**
 * Estimate tokens for text as user types (real-time)
 */
export function estimateTokensRealtime(text: string): {
  tokens: number;
  characters: number;
  words: number;
} {
  const tokens = calculateTokens(text);
  const characters = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return { tokens, characters, words };
}
