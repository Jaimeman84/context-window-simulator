import { MessageRole } from './message';

/**
 * Scenario difficulty level
 */
export type ScenarioDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Scenario step action types
 */
export type ScenarioAction =
  | 'add_message'
  | 'add_document'
  | 'wait'
  | 'explain'
  | 'highlight';

/**
 * Individual step in a scenario
 */
export interface ScenarioStep {
  /** Step identifier */
  id: string;

  /** Instruction text to show user */
  instruction: string;

  /** Action to perform */
  action: ScenarioAction;

  /** Data for the action */
  payload?: {
    role?: MessageRole;
    content?: string;
    size?: number;
    highlight?: string;
    explanation?: string;
  };

  /** What should happen (for educational purposes) */
  expectedOutcome: string;

  /** Auto-advance delay in milliseconds (0 = wait for user) */
  autoAdvanceDelay?: number;
}

/**
 * Complete scenario definition
 */
export interface Scenario {
  /** Unique scenario identifier */
  id: string;

  /** Scenario title */
  title: string;

  /** Brief description */
  description: string;

  /** Difficulty level */
  difficulty: ScenarioDifficulty;

  /** Model to use for this scenario */
  modelId: string;

  /** Estimated time to complete */
  estimatedMinutes: number;

  /** Icon for display */
  icon: string;

  /** Learning objectives */
  learningObjectives: string[];

  /** Scenario steps */
  steps: ScenarioStep[];
}

/**
 * Scenario execution state
 */
export interface ScenarioState {
  /** Current scenario */
  scenario: Scenario | null;

  /** Current step index */
  currentStepIndex: number;

  /** Whether scenario is running */
  isRunning: boolean;

  /** Whether scenario is complete */
  isComplete: boolean;

  /** Steps completed */
  completedSteps: number[];
}
