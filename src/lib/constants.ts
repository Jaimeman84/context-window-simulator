/**
 * Application-wide constants
 */

/** Default system prompt */
export const DEFAULT_SYSTEM_PROMPT = 'You are a helpful AI assistant.';

/** Approximate characters per token (for estimation) */
export const CHARACTERS_PER_TOKEN = 4;

/** Approximate words per token */
export const WORDS_PER_TOKEN = 0.75;

/** Capacity warning thresholds */
export const CAPACITY_THRESHOLDS = {
  low: 60, // 0-60% = green/low
  medium: 85, // 60-85% = yellow/medium
  high: 100, // 85-100% = red/high
  critical: 100, // 100%+ = critical/overflow
};

/** Tutorial step count */
export const TUTORIAL_STEPS = 4;

/** Local storage keys */
export const STORAGE_KEYS = {
  tutorialComplete: 'cws_tutorial_complete',
  lastVisitedPage: 'cws_last_page',
  theme: 'cws_theme',
};

/** Animation durations (ms) */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

/** Sample messages for demos */
export const SAMPLE_MESSAGES = {
  userGreeting: 'Hello! How are you?',
  assistantGreeting: "I'm doing well, thank you! How can I help you today?",
  userQuestion: 'Can you explain what a context window is?',
  assistantExplanation:
    'A context window is the maximum amount of text that an AI model can process at once. Think of it as the model\'s "working memory." Everything in our conversation - including this message - counts toward that limit. When the window fills up, older messages need to be removed to make room for new ones.',
  userLongMessage:
    'I have a really long question that I need to ask you. It involves multiple parts and requires a detailed explanation. First, I want to understand how context windows work in practice. Second, I need to know what happens when the limit is reached. Third, I am curious about the differences between various model sizes. Can you help me understand all of these concepts?',
};

/** Document size presets (in tokens) */
export const DOCUMENT_SIZES = {
  small: 500,
  medium: 2000,
  large: 5000,
  veryLarge: 20000,
};
