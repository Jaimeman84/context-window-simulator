# Architecture Design Document (ADD)

## Context Window Simulator - Technical Architecture

---

## 1. System Overview

### 1.1 Purpose
The Context Window Simulator is a client-side educational web application built to help students understand AI context windows through interactive visualization and hands-on experimentation.

### 1.2 Architecture Style
- **Pattern**: Component-based architecture
- **Rendering**: Server-side rendering (SSR) with client-side interactivity
- **State**: Local component state with React hooks
- **Data Flow**: Unidirectional (top-down)

### 1.3 Key Principles
- **Simplicity First**: No over-engineering, keep it simple
- **Client-Side Only**: No backend required, all simulation runs in browser
- **Performance**: Smooth 60fps animations, instant feedback
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive design for all devices

---

## 2. Technology Stack

### 2.1 Core Framework

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Next.js** | 14+ | React framework | App Router, SSR, optimal performance |
| **React** | 18+ | UI library | Component model, hooks, ecosystem |
| **TypeScript** | 5+ | Type safety | Developer experience, fewer bugs |

### 2.2 Styling & UI

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Tailwind CSS** | 3+ | Utility-first CSS | Rapid development, consistency |
| **DaisyUI** | 4+ | Component library | Pre-built components, theming |
| **Framer Motion** | 10+ | Animations | Smooth, performant animations |

### 2.3 Development Tools

| Technology | Purpose | Justification |
|------------|---------|---------------|
| **ESLint** | Code linting | Code quality, consistency |
| **Prettier** | Code formatting | Automated formatting |
| **Husky** | Git hooks | Pre-commit checks |

### 2.4 Why This Stack?

✅ **Next.js 14+**: App Router provides excellent developer experience, automatic code splitting, and optimal performance out of the box

✅ **DaisyUI**: Semantic component classes reduce development time and provide consistent, accessible UI components

✅ **Tailwind CSS**: Utility-first approach speeds up styling and ensures design consistency

✅ **Framer Motion**: Declarative animations make complex transitions simple and performant

✅ **TypeScript**: Catches errors early, provides better IDE support, documents code through types

---

## 3. System Architecture

### 3.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js App Router                      │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │  Tutorial  │  │ Scenarios  │  │   Sandbox    │  │  │
│  │  │    Page    │  │    Page    │  │     Page     │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Shared React Components                   │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  ┌──────────────┐  ┌─────────────┐  ┌───────────┐  │  │
│  │  │   Context    │  │   Message   │  │  Token    │  │  │
│  │  │   Window     │  │   List      │  │  Counter  │  │  │
│  │  └──────────────┘  └─────────────┘  └───────────┘  │  │
│  │                                                      │  │
│  │  ┌──────────────┐  ┌─────────────┐  ┌───────────┐  │  │
│  │  │   Progress   │  │   Message   │  │  Tooltip  │  │  │
│  │  │     Bar      │  │    Card     │  │  System   │  │  │
│  │  └──────────────┘  └─────────────┘  └───────────┘  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Core Logic & State Management               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  ┌──────────────┐  ┌─────────────┐  ┌───────────┐  │  │
│  │  │useSimulator  │  │ useTokens   │  │useScenario│  │  │
│  │  │   Hook       │  │   Hook      │  │   Hook    │  │  │
│  │  └──────────────┘  └─────────────┘  └───────────┘  │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Utility Functions                       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │  • tokenCalculator.ts  - Token estimation           │  │
│  │  • messageHelpers.ts   - Message operations         │  │
│  │  • scenarioData.ts     - Scenario definitions       │  │
│  │  • constants.ts        - App-wide constants         │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Component Architecture

### 4.1 Component Hierarchy

```
App
│
├── Layout (RootLayout)
│   ├── Header
│   └── Footer
│
├── Home Page (/)
│   ├── Hero
│   ├── WelcomeModal
│   └── FeatureCards
│
├── Tutorial Page (/tutorial)
│   ├── TutorialStep
│   │   ├── ContextWindow
│   │   ├── TokenCounter
│   │   └── ProgressBar
│   └── NavigationButtons
│
├── Scenarios Page (/scenarios)
│   ├── ScenarioSelector
│   └── ScenarioRunner
│       ├── ContextWindow
│       ├── MessageList
│       ├── TokenBreakdown
│       └── ScenarioControls
│
└── Sandbox Page (/sandbox)
    ├── SimulatorControls
    │   ├── ModelSelector
    │   ├── ComparisonToggle
    │   └── ActionButtons
    ├── ContextWindow (x1 or x2 for comparison)
    │   ├── CapacityIndicator
    │   ├── MessageList
    │   │   └── MessageCard (multiple)
    │   └── TokenBreakdown
    ├── AddMessageModal
    └── ExportModal
```

---

## 5. Data Models

### 5.1 Core Types

```typescript
// types/message.ts

export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

export interface Message {
  id: string;                    // Unique identifier
  role: MessageRole;             // Message type
  content: string;               // Message text
  tokenCount: number;            // Calculated tokens
  timestamp: number;             // When added
  isVisible: boolean;            // In context window?
  isTruncated: boolean;          // Was it cut off?
}

export interface SystemPrompt {
  content: string;
  tokenCount: number;
  isCustom: boolean;
}
```

```typescript
// types/model.ts

export interface ModelConfig {
  id: string;                    // e.g., 'gpt-3.5-turbo'
  name: string;                  // Display name
  contextWindow: number;         // Max tokens
  description: string;           // Short description
  color: string;                 // UI color theme
}

export const MODELS: ModelConfig[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5',
    contextWindow: 4096,
    description: 'Standard context window',
    color: 'blue'
  },
  {
    id: 'gpt-3.5-turbo-16k',
    name: 'GPT-3.5 (16K)',
    contextWindow: 16384,
    description: 'Extended context window',
    color: 'green'
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    contextWindow: 8192,
    description: 'Advanced model',
    color: 'purple'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    contextWindow: 128000,
    description: 'Large context window',
    color: 'indigo'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    contextWindow: 200000,
    description: 'Very large context window',
    color: 'orange'
  }
];
```

```typescript
// types/scenario.ts

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modelId: string;               // Which model to use
  steps: ScenarioStep[];
  learningObjectives: string[];
}

export interface ScenarioStep {
  id: string;
  instruction: string;           // What to tell the user
  action: 'add_message' | 'add_document' | 'wait' | 'explain';
  payload?: any;                 // Data for the action
  expectedOutcome: string;       // What should happen
}
```

```typescript
// types/simulator.ts

export interface SimulatorState {
  modelConfig: ModelConfig;
  systemPrompt: SystemPrompt;
  messages: Message[];
  totalTokens: number;
  remainingTokens: number;
  capacityPercentage: number;
  isOverflowing: boolean;
}
```

---

## 6. State Management

### 6.1 State Architecture

**Philosophy**: Keep state management simple using React hooks. No Redux, Zustand, or other state libraries needed.

**State Location**:
- **Local Component State**: UI-only state (modals open/closed, animations)
- **Custom Hooks**: Shared business logic (simulator state, token calculations)
- **Context API**: Theme, user preferences (minimal usage)

### 6.2 Core Hook: `useSimulator`

```typescript
// hooks/useSimulator.ts

export function useSimulator(initialModel: ModelConfig) {
  const [state, dispatch] = useReducer(simulatorReducer, {
    modelConfig: initialModel,
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    messages: [],
    totalTokens: 0,
    remainingTokens: initialModel.contextWindow,
    capacityPercentage: 0,
    isOverflowing: false
  });

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

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    actions: {
      addMessage,
      removeMessage,
      changeModel,
      reset
    }
  };
}
```

### 6.3 Reducer Logic

```typescript
// reducers/simulatorReducer.ts

function simulatorReducer(
  state: SimulatorState,
  action: SimulatorAction
): SimulatorState {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { role, content } = action.payload;
      const tokenCount = calculateTokens(content);

      const newMessage: Message = {
        id: generateId(),
        role,
        content,
        tokenCount,
        timestamp: Date.now(),
        isVisible: true,
        isTruncated: false
      };

      const updatedMessages = [...state.messages, newMessage];
      const totalTokens = calculateTotalTokens(
        state.systemPrompt,
        updatedMessages
      );

      // Handle overflow
      const { messages, isOverflowing } = handleOverflow(
        updatedMessages,
        state.modelConfig.contextWindow,
        state.systemPrompt.tokenCount
      );

      return {
        ...state,
        messages,
        totalTokens,
        remainingTokens: state.modelConfig.contextWindow - totalTokens,
        capacityPercentage: (totalTokens / state.modelConfig.contextWindow) * 100,
        isOverflowing
      };
    }

    case 'REMOVE_MESSAGE': {
      // ... removal logic
    }

    case 'CHANGE_MODEL': {
      // ... model change logic
    }

    case 'RESET': {
      return {
        ...state,
        messages: [],
        totalTokens: state.systemPrompt.tokenCount,
        remainingTokens: state.modelConfig.contextWindow - state.systemPrompt.tokenCount,
        capacityPercentage: (state.systemPrompt.tokenCount / state.modelConfig.contextWindow) * 100,
        isOverflowing: false
      };
    }

    default:
      return state;
  }
}
```

---

## 7. Core Algorithms

### 7.1 Token Calculation

```typescript
// utils/tokenCalculator.ts

/**
 * Estimates token count for text
 * Rough approximation: 1 token ≈ 4 characters for English
 * This is simplified for educational purposes
 */
export function calculateTokens(text: string): number {
  // Remove extra whitespace
  const cleaned = text.trim().replace(/\s+/g, ' ');

  // Approximate token count
  // More accurate would use tiktoken library, but adds complexity
  const charCount = cleaned.length;
  const estimatedTokens = Math.ceil(charCount / 4);

  return Math.max(1, estimatedTokens); // Minimum 1 token
}

/**
 * Calculate total tokens in conversation
 */
export function calculateTotalTokens(
  systemPrompt: SystemPrompt,
  messages: Message[]
): number {
  const messageTokens = messages.reduce(
    (sum, msg) => sum + msg.tokenCount,
    0
  );

  return systemPrompt.tokenCount + messageTokens;
}

/**
 * Get capacity status based on percentage
 */
export function getCapacityStatus(percentage: number): {
  status: 'low' | 'medium' | 'high' | 'critical';
  color: string;
  message: string;
} {
  if (percentage < 60) {
    return {
      status: 'low',
      color: 'success',
      message: 'Plenty of space available'
    };
  } else if (percentage < 85) {
    return {
      status: 'medium',
      color: 'warning',
      message: 'Getting full, watch your space'
    };
  } else if (percentage < 100) {
    return {
      status: 'high',
      color: 'error',
      message: 'Almost full! Next message may truncate old ones'
    };
  } else {
    return {
      status: 'critical',
      color: 'error',
      message: 'Overflow! Old messages have been removed'
    };
  }
}
```

### 7.2 Overflow Handling

```typescript
// utils/overflowHandler.ts

/**
 * Handle context window overflow
 * Removes oldest messages until within limit
 */
export function handleOverflow(
  messages: Message[],
  maxTokens: number,
  systemPromptTokens: number
): {
  messages: Message[];
  isOverflowing: boolean;
  removedCount: number;
} {
  const availableTokens = maxTokens - systemPromptTokens;
  let currentTokens = messages.reduce((sum, msg) => sum + msg.tokenCount, 0);

  if (currentTokens <= availableTokens) {
    return {
      messages: messages.map(msg => ({ ...msg, isVisible: true })),
      isOverflowing: false,
      removedCount: 0
    };
  }

  // Remove oldest messages until we fit
  const updatedMessages = [...messages];
  let removedCount = 0;

  while (currentTokens > availableTokens && updatedMessages.length > 0) {
    const oldest = updatedMessages[0];

    // Mark as not visible instead of removing
    // (for educational visualization)
    updatedMessages[0] = { ...oldest, isVisible: false };
    currentTokens -= oldest.tokenCount;
    removedCount++;

    // Move to end of array so it's still accessible
    updatedMessages.push(updatedMessages.shift()!);
  }

  return {
    messages: updatedMessages,
    isOverflowing: true,
    removedCount
  };
}
```

---

## 8. Component Specifications

### 8.1 ContextWindow Component

```typescript
// components/ContextWindow.tsx

interface ContextWindowProps {
  state: SimulatorState;
  onMessageRemove?: (messageId: string) => void;
  showControls?: boolean;
  comparisonMode?: boolean;
}

export function ContextWindow({
  state,
  onMessageRemove,
  showControls = false,
  comparisonMode = false
}: ContextWindowProps) {
  return (
    <div className="context-window">
      {/* Capacity Indicator */}
      <CapacityIndicator
        current={state.totalTokens}
        max={state.modelConfig.contextWindow}
        percentage={state.capacityPercentage}
      />

      {/* Token Breakdown */}
      <TokenBreakdown
        systemTokens={state.systemPrompt.tokenCount}
        messageTokens={state.totalTokens - state.systemPrompt.tokenCount}
        remaining={state.remainingTokens}
      />

      {/* Message List */}
      <MessageList
        messages={state.messages}
        systemPrompt={state.systemPrompt}
        onRemove={onMessageRemove}
        showControls={showControls}
      />
    </div>
  );
}
```

### 8.2 MessageCard Component

```typescript
// components/MessageCard.tsx

interface MessageCardProps {
  message: Message;
  onRemove?: (id: string) => void;
  showControls?: boolean;
}

export function MessageCard({
  message,
  onRemove,
  showControls = false
}: MessageCardProps) {
  const roleConfig = {
    system: { icon: '🔧', color: 'neutral', label: 'System' },
    user: { icon: '👤', color: 'primary', label: 'User' },
    assistant: { icon: '🤖', color: 'secondary', label: 'Assistant' },
    tool: { icon: '🛠️', color: 'accent', label: 'Tool' }
  };

  const config = roleConfig[message.role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: message.isVisible ? 1 : 0.3, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        'message-card',
        `message-card--${message.role}`,
        !message.isVisible && 'message-card--hidden'
      )}
    >
      <div className="message-card__header">
        <span className="message-card__icon">{config.icon}</span>
        <span className="message-card__label">{config.label}</span>
        <span className="message-card__tokens">{message.tokenCount} tokens</span>
        {showControls && message.isVisible && (
          <button
            onClick={() => onRemove?.(message.id)}
            className="btn btn-ghost btn-xs"
          >
            ×
          </button>
        )}
      </div>
      <div className="message-card__content">
        {message.content}
      </div>
      {!message.isVisible && (
        <div className="message-card__removed-badge">
          Removed (overflow)
        </div>
      )}
    </motion.div>
  );
}
```

### 8.3 ProgressBar Component

```typescript
// components/ProgressBar.tsx

interface ProgressBarProps {
  current: number;
  max: number;
  showLabel?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  current,
  max,
  showLabel = true,
  animated = true
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const status = getCapacityStatus(percentage);

  return (
    <div className="progress-bar">
      {showLabel && (
        <div className="progress-bar__label">
          <span>{current.toLocaleString()} / {max.toLocaleString()} tokens</span>
          <span className={`badge badge-${status.color}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      <div className="progress-bar__track">
        <motion.div
          className={`progress-bar__fill progress-bar__fill--${status.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0 }}
        />
      </div>
      {status.percentage >= 60 && (
        <div className={`alert alert-${status.color} mt-2`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
```

---

## 9. Routing & Navigation

### 9.1 Route Structure

```
/                     → Home page (landing)
/tutorial             → Step-by-step tutorial
/scenarios            → Pre-built scenario list
/scenarios/[id]       → Individual scenario runner
/sandbox              → Free-form sandbox mode
/about                → About the project (optional)
```

### 9.2 Navigation Flow

```typescript
// components/Navigation.tsx

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          🧠 Context Window Simulator
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/tutorial"
              className={pathname === '/tutorial' ? 'active' : ''}
            >
              Tutorial
            </Link>
          </li>
          <li>
            <Link
              href="/scenarios"
              className={pathname.startsWith('/scenarios') ? 'active' : ''}
            >
              Scenarios
            </Link>
          </li>
          <li>
            <Link
              href="/sandbox"
              className={pathname === '/sandbox' ? 'active' : ''}
            >
              Sandbox
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <QuestionMarkIcon />
        </button>
      </div>
    </nav>
  );
}
```

---

## 10. Performance Considerations

### 10.1 Optimization Strategies

1. **Code Splitting**
   - Next.js automatic code splitting
   - Lazy load heavy components (Framer Motion animations)
   - Dynamic imports for scenarios

2. **Memoization**
   - `useMemo` for expensive calculations (token totals)
   - `useCallback` for event handlers
   - `React.memo` for MessageCard components

3. **Virtual Scrolling**
   - Not needed unless >100 messages
   - Keep it simple for educational tool

4. **Animation Performance**
   - Use CSS transforms (GPU-accelerated)
   - Limit simultaneous animations
   - `will-change` for animated elements

### 10.2 Bundle Size

**Target**: < 200KB initial bundle

**Strategies**:
- Tree-shaking unused DaisyUI components
- Optimize Framer Motion imports
- No heavy dependencies (no markdown parsers, etc.)

---

## 11. Accessibility

### 11.1 ARIA Implementation

```typescript
// Example: ProgressBar with ARIA

<div
  role="progressbar"
  aria-valuenow={current}
  aria-valuemin={0}
  aria-valuemax={max}
  aria-label={`Context window capacity: ${percentage}% full`}
>
  {/* Visual progress bar */}
</div>
```

### 11.2 Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate through interactive elements |
| `Enter` / `Space` | Activate buttons |
| `Escape` | Close modals |
| `Arrow keys` | Navigate message list |
| `?` | Open help overlay |

### 11.3 Screen Reader Support

- Announce when messages are added/removed
- Announce capacity changes
- Describe visual elements (progress bars, color coding)
- Provide text alternatives for icons

---

## 12. Error Handling

### 12.1 Error Boundaries

```typescript
// components/ErrorBoundary.tsx

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 12.2 Graceful Degradation

- If animations fail → fall back to instant transitions
- If localStorage unavailable → skip preference saving
- If JavaScript disabled → show static content with message

---

## 13. Testing Strategy

### 13.1 Unit Tests

**Test Coverage**:
- Token calculation functions
- Overflow handling logic
- Message manipulation helpers
- State reducer logic

**Tools**: Jest + React Testing Library

### 13.2 Component Tests

**Test Coverage**:
- ContextWindow renders correctly
- MessageCard displays all roles
- ProgressBar updates on state change
- Modals open/close properly

### 13.3 Integration Tests

**Test Coverage**:
- Add message → updates token count
- Overflow → removes oldest message
- Model change → recalculates capacity
- Scenario completion → advances steps

### 13.4 E2E Tests (Optional)

**Tools**: Playwright or Cypress

**Test Flows**:
- Complete tutorial flow
- Run a full scenario
- Use sandbox mode
- Compare two models

---

## 14. Deployment

### 14.1 Hosting Platform

**Recommended**: Vercel (optimal for Next.js)

**Alternatives**: Netlify, Cloudflare Pages

### 14.2 Build Process

```bash
npm run build
npm run start
```

### 14.3 Environment Variables

```env
# .env.local
NEXT_PUBLIC_APP_URL=https://context-window-simulator.vercel.app
```

### 14.4 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      # Vercel auto-deploys on push
```

---

## 15. Future Extensibility

### 15.1 Potential Enhancements

1. **Advanced Token Counting**
   - Integrate tiktoken library for accurate counts
   - Support different tokenizers per model

2. **More Scenarios**
   - Plugin system for custom scenarios
   - Community-contributed scenarios

3. **Export Features**
   - PDF reports
   - Shareable links
   - Embed widget for blogs

4. **Analytics** (Privacy-respecting)
   - Track which scenarios are most helpful
   - Identify where users get confused
   - A/B test explanations

### 15.2 Extensibility Patterns

```typescript
// Plugin interface for custom scenarios
interface ScenarioPlugin {
  id: string;
  definition: Scenario;
  customComponents?: Record<string, React.ComponentType>;
}

// Registration
registerScenario(myCustomScenario);
```

---

## 16. Security Considerations

### 16.1 Client-Side Security

- **No user data stored externally**
- **LocalStorage only for preferences**
- **No API keys required**
- **No server-side processing**
- **Content Security Policy headers**

### 16.2 Input Validation

```typescript
// Validate user input in message forms
export function validateMessage(content: string): {
  isValid: boolean;
  error?: string;
} {
  if (!content.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (content.length > 50000) {
    return { isValid: false, error: 'Message too long (max 50,000 characters)' };
  }

  return { isValid: true };
}
```

---

## 17. Documentation

### 17.1 Code Documentation

- **TSDoc comments** for all public functions
- **README.md** with setup instructions
- **Component Storybook** (optional, for design system)

### 17.2 User Documentation

- **Inline tooltips** for UI elements
- **Help modal** with keyboard shortcuts
- **About page** with learning resources

---

## Summary

This architecture provides:

✅ **Scalability**: Component-based design allows easy feature additions
✅ **Maintainability**: TypeScript + clear patterns = fewer bugs
✅ **Performance**: Optimized rendering, code splitting, efficient algorithms
✅ **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen readers
✅ **Simplicity**: No over-engineering, straightforward state management
✅ **Extensibility**: Plugin system for scenarios, clear interfaces

The architecture prioritizes **educational value** and **developer experience** while maintaining production-quality standards.
