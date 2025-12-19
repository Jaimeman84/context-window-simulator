/**
 * AI Model configuration
 */
export interface ModelConfig {
  /** Unique model identifier */
  id: string;

  /** Display name for the model */
  name: string;

  /** Maximum context window size in tokens */
  contextWindow: number;

  /** Brief description of the model */
  description: string;

  /** Color theme for UI display */
  color: string;

  /** Provider name */
  provider: string;
}

/**
 * Available AI models with different context window sizes
 */
export const MODELS: ModelConfig[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5',
    contextWindow: 4096,
    description: 'Standard context window (4K tokens)',
    color: 'blue',
    provider: 'OpenAI',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    contextWindow: 8192,
    description: 'Advanced model (8K tokens)',
    color: 'purple',
    provider: 'OpenAI',
  },
  {
    id: 'gpt-3.5-turbo-16k',
    name: 'GPT-3.5 (16K)',
    contextWindow: 16384,
    description: 'Extended context window (16K tokens)',
    color: 'cyan',
    provider: 'OpenAI',
  },
  // {
  //   id: 'gpt-4-turbo',
  //   name: 'GPT-4 Turbo',
  //   contextWindow: 128000,
  //   description: 'Large context window (128K tokens)',
  //   color: 'indigo',
  //   provider: 'OpenAI',
  // },
  // {
  //   id: 'claude-3-opus',
  //   name: 'Claude 3 Opus',
  //   contextWindow: 200000,
  //   description: 'Very large context window (200K tokens)',
  //   color: 'orange',
  //   provider: 'Anthropic',
  // },
];

/**
 * Get model by ID
 */
export function getModelById(id: string): ModelConfig | undefined {
  return MODELS.find((model) => model.id === id);
}

/**
 * Get default model (GPT-3.5)
 */
export function getDefaultModel(): ModelConfig {
  return MODELS[0];
}
