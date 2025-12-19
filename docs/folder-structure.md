# Folder Structure

## Context Window Simulator - Project Organization

---

## Complete Directory Structure

```
context-window-simulator/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD pipeline
│
├── .husky/
│   ├── pre-commit                    # Pre-commit git hooks
│   └── pre-push                      # Pre-push git hooks
│
├── docs/
│   ├── icp.md                        # Ideal Customer Profile
│   ├── workflow.md                   # User Journey & Workflow
│   ├── add.md                        # Architecture Design Document
│   ├── brd.md                        # Business Requirements Document
│   └── folder-structure.md           # This file
│
├── public/
│   ├── favicon.ico                   # Site favicon
│   ├── logo.svg                      # Application logo
│   ├── og-image.png                  # Open Graph social media image
│   └── robots.txt                    # SEO robots file
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout component
│   │   ├── page.tsx                  # Home page (/)
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── tutorial/
│   │   │   └── page.tsx              # Tutorial page (/tutorial)
│   │   │
│   │   ├── scenarios/
│   │   │   ├── page.tsx              # Scenarios list (/scenarios)
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Individual scenario (/scenarios/[id])
│   │   │
│   │   ├── sandbox/
│   │   │   └── page.tsx              # Sandbox page (/sandbox)
│   │   │
│   │   └── about/
│   │       └── page.tsx              # About page (/about) [optional]
│   │
│   ├── components/                   # React components
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Site header/navigation
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   └── Navigation.tsx        # Main navigation menu
│   │   │
│   │   ├── simulator/                # Core simulator components
│   │   │   ├── ContextWindow.tsx     # Main context window container ✅
│   │   │   ├── MessageList.tsx       # List of messages ✅
│   │   │   ├── MessageCard.tsx       # Individual message display ✅
│   │   │   ├── TokenCounter.tsx      # Token count display ✅
│   │   │   ├── ProgressBar.tsx       # Capacity progress bar ✅
│   │   │   ├── TokenBreakdown.tsx    # Token distribution breakdown (integrated in TokenCounter)
│   │   │   ├── CapacityIndicator.tsx # Visual capacity indicator (integrated in ProgressBar)
│   │   │   └── ModelSelector.tsx     # Model selection dropdown (in page layouts)
│   │   │
│   │   ├── tutorial/
│   │   │   ├── TutorialStep.tsx      # Individual tutorial step
│   │   │   ├── TutorialNavigation.tsx # Next/Previous buttons
│   │   │   └── WelcomeModal.tsx      # First-time user welcome
│   │   │
│   │   ├── scenarios/
│   │   │   ├── ScenarioCard.tsx      # Scenario selection card (in page layout)
│   │   │   ├── ScenarioRunner.tsx    # Scenario execution container ✅
│   │   │   └── ScenarioControls.tsx  # Scenario control buttons (integrated in ScenarioRunner)
│   │   │
│   │   ├── sandbox/
│   │   │   ├── AddMessageModal.tsx   # Modal for adding messages ✅
│   │   │   ├── AddDocumentModal.tsx  # Modal for adding documents (future)
│   │   │   ├── ExportModal.tsx       # Export functionality modal (future)
│   │   │   ├── ComparisonView.tsx    # Side-by-side model comparison (future)
│   │   │   └── SandboxControls.tsx   # Control panel for sandbox (integrated in page)
│   │   │
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Button.tsx            # Custom button component (using DaisyUI)
│   │   │   ├── Modal.tsx             # Reusable modal (using DaisyUI)
│   │   │   ├── Tooltip.tsx           # Tooltip component ✅
│   │   │   ├── Badge.tsx             # Badge/label component (using DaisyUI)
│   │   │   ├── Alert.tsx             # Alert/notification component (using DaisyUI)
│   │   │   └── Card.tsx              # Card container component (using DaisyUI)
│   │   │
│   │   └── shared/
│   │       ├── ErrorBoundary.tsx     # Error boundary wrapper
│   │       ├── LoadingSpinner.tsx    # Loading state component
│   │       └── HelpIcon.tsx          # Help icon with tooltip
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useSimulator.ts           # Main simulator state hook
│   │   ├── useTokens.ts              # Token calculation hook
│   │   ├── useScenario.ts            # Scenario execution hook
│   │   ├── useLocalStorage.ts        # LocalStorage persistence hook
│   │   ├── useComparison.ts          # Model comparison hook
│   │   └── useAnimation.ts           # Animation utilities hook
│   │
│   ├── lib/                          # Core utilities and logic
│   │   ├── tokenCalculator.ts        # Token counting functions ✅
│   │   ├── overflowHandler.ts        # Context window overflow logic ✅
│   │   ├── messageHelpers.ts         # Message manipulation helpers ✅
│   │   ├── modelConfigs.ts           # Model configuration data (integrated in constants)
│   │   ├── scenarioData.ts           # Pre-built scenario definitions ✅
│   │   ├── constants.ts              # App-wide constants ✅
│   │   └── utils.ts                  # General utility functions (as needed)
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── message.ts                # Message-related types
│   │   ├── model.ts                  # Model configuration types
│   │   ├── scenario.ts               # Scenario types
│   │   ├── simulator.ts              # Simulator state types
│   │   └── index.ts                  # Type exports
│   │
│   ├── reducers/                     # State reducers
│   │   ├── simulatorReducer.ts       # Main simulator state reducer
│   │   └── scenarioReducer.ts        # Scenario execution reducer
│   │
│   ├── context/                      # React Context providers
│   │   ├── ThemeContext.tsx          # Theme context (dark mode, etc.)
│   │   └── TutorialContext.tsx       # Tutorial progress context
│   │
│   └── styles/                       # Additional styling
│       ├── animations.css            # Custom animations
│       └── components.css            # Component-specific styles
│
├── .env.local                        # Environment variables (local)
├── .env.example                      # Example environment variables
├── .eslintrc.json                    # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── .gitignore                        # Git ignore rules
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies
├── package-lock.json                 # Locked dependency versions
└── README.md                         # Project documentation
```

---

## Directory Explanations

### Root Level

#### `.github/workflows/`
Contains GitHub Actions configuration for CI/CD pipelines. Automates testing, linting, and deployment.

#### `.husky/`
Git hooks for pre-commit and pre-push checks. Ensures code quality before commits are made.

#### `docs/`
**Purpose**: Project documentation and planning documents.
- All planning documents created before coding
- Reference materials for development
- Educational content planning

#### `public/`
**Purpose**: Static assets served directly by Next.js.
- Favicon, logos, images
- Files accessible at root URL
- No processing/bundling applied

---

### `src/app/` - Next.js App Router

**Purpose**: Pages and routing using Next.js 14+ App Router.

Each folder represents a route:
- `app/page.tsx` → `/` (home)
- `app/tutorial/page.tsx` → `/tutorial`
- `app/scenarios/page.tsx` → `/scenarios`
- `app/scenarios/[id]/page.tsx` → `/scenarios/short-conversation`
- `app/sandbox/page.tsx` → `/sandbox`

**Key Files**:
- `layout.tsx`: Root layout wrapping all pages
- `globals.css`: Global CSS styles, Tailwind imports

**Why App Router?**
- Server components by default (performance)
- Simplified routing (folder-based)
- Built-in layouts and loading states
- Streaming and suspense support

---

### `src/components/` - React Components

**Purpose**: All React UI components organized by feature.

#### `components/layout/`
**Purpose**: Site-wide layout components.
- Header, Footer, Navigation
- Used in root layout
- Consistent across all pages

#### `components/simulator/`
**Purpose**: Core simulation UI components.
- **ContextWindow.tsx**: Main container showing messages and capacity
- **MessageCard.tsx**: Individual message display with role, content, tokens
- **ProgressBar.tsx**: Visual capacity indicator
- **TokenCounter.tsx**: Token count display with breakdown
- **ModelSelector.tsx**: Dropdown to change AI model

These are the heart of the application - used across Tutorial, Scenarios, and Sandbox.

#### `components/tutorial/`
**Purpose**: Tutorial-specific components.
- **TutorialStep.tsx**: Each step of the tutorial
- **WelcomeModal.tsx**: First-time user onboarding

#### `components/scenarios/`
**Purpose**: Scenario-specific components.
- **ScenarioCard.tsx**: Clickable card for scenario selection
- **ScenarioRunner.tsx**: Executes scenario steps
- **ScenarioControls.tsx**: Next, Previous, Reset buttons

#### `components/sandbox/`
**Purpose**: Sandbox mode components.
- **AddMessageModal.tsx**: Form to add messages
- **ComparisonView.tsx**: Side-by-side model comparison
- **ExportModal.tsx**: Export simulation state

#### `components/ui/`
**Purpose**: Reusable, generic UI components.
- Built on top of DaisyUI
- Can be used anywhere in the app
- Consistent styling and behavior

#### `components/shared/`
**Purpose**: Shared utilities and wrappers.
- **ErrorBoundary.tsx**: Catches React errors
- **LoadingSpinner.tsx**: Loading states

**Organization Principle**: Components are grouped by feature/domain, not by type. This makes it easy to find related components.

---

### `src/hooks/` - Custom React Hooks

**Purpose**: Reusable stateful logic extracted into hooks.

#### `useSimulator.ts`
**Primary hook for simulator state management.**
- Manages messages, tokens, capacity
- Provides actions: addMessage, removeMessage, changeModel, reset
- Uses useReducer for complex state logic
- Used in Tutorial, Scenarios, and Sandbox

#### `useTokens.ts`
**Token calculation and estimation.**
- Calculates tokens for text
- Provides token breakdown by type
- Real-time token estimates as user types

#### `useScenario.ts`
**Scenario execution logic.**
- Steps through scenario
- Triggers actions at each step
- Tracks progress

#### `useLocalStorage.ts`
**Persists user preferences.**
- Saves tutorial completion status
- Saves theme preference
- Generic key-value storage

#### `useComparison.ts`
**Model comparison mode logic.**
- Manages dual simulator states
- Synchronizes messages across models
- Calculates differences

**Why Custom Hooks?**
- Separates business logic from UI
- Reusable across components
- Easier to test
- Cleaner component code

---

### `src/lib/` - Core Logic & Utilities

**Purpose**: Pure functions and business logic (no React).

#### `tokenCalculator.ts`
**Token counting algorithms.**
```typescript
calculateTokens(text: string): number
calculateTotalTokens(systemPrompt, messages): number
getCapacityStatus(percentage): Status
```

#### `overflowHandler.ts`
**Handles context window overflow.**
```typescript
handleOverflow(messages, maxTokens): { messages, isOverflowing, removedCount }
```

#### `messageHelpers.ts`
**Message manipulation utilities.**
```typescript
createMessage(role, content): Message
sortMessagesByTimestamp(messages): Message[]
filterVisibleMessages(messages): Message[]
```

#### `modelConfigs.ts`
**AI model definitions.**
```typescript
const MODELS: ModelConfig[] = [
  { id: 'gpt-3.5-turbo', contextWindow: 4096, ... },
  { id: 'gpt-4-turbo', contextWindow: 128000, ... },
  ...
]
```

#### `scenarioData.ts`
**Pre-built scenario definitions.**
```typescript
const SCENARIOS: Scenario[] = [
  {
    id: 'short-conversation',
    title: 'Short Conversation',
    steps: [...],
    ...
  },
  ...
]
```

#### `constants.ts`
**App-wide constants.**
```typescript
const DEFAULT_SYSTEM_PROMPT = "You are a helpful assistant."
const TOKENS_PER_CHARACTER = 0.25
const CAPACITY_THRESHOLDS = { warning: 85, critical: 100 }
```

**Why Separate from Hooks?**
- Can be used outside React components
- Easier to unit test (pure functions)
- No dependencies on React lifecycle
- Can be imported anywhere

---

### `src/types/` - TypeScript Types

**Purpose**: Centralized type definitions.

#### `message.ts`
```typescript
export type MessageRole = 'system' | 'user' | 'assistant' | 'tool'

export interface Message {
  id: string
  role: MessageRole
  content: string
  tokenCount: number
  timestamp: number
  isVisible: boolean
  isTruncated: boolean
}
```

#### `model.ts`
```typescript
export interface ModelConfig {
  id: string
  name: string
  contextWindow: number
  description: string
  color: string
}
```

#### `simulator.ts`
```typescript
export interface SimulatorState {
  modelConfig: ModelConfig
  systemPrompt: SystemPrompt
  messages: Message[]
  totalTokens: number
  remainingTokens: number
  capacityPercentage: number
  isOverflowing: boolean
}
```

#### `index.ts`
```typescript
// Central export point
export * from './message'
export * from './model'
export * from './scenario'
export * from './simulator'
```

**Why Separate Types?**
- Single source of truth
- Import from one place: `import { Message } from '@/types'`
- Prevents duplicate type definitions
- Easier to maintain

---

### `src/reducers/` - State Reducers

**Purpose**: Complex state management logic.

#### `simulatorReducer.ts`
```typescript
type SimulatorAction =
  | { type: 'ADD_MESSAGE'; payload: { role, content } }
  | { type: 'REMOVE_MESSAGE'; payload: string }
  | { type: 'CHANGE_MODEL'; payload: ModelConfig }
  | { type: 'RESET' }

export function simulatorReducer(
  state: SimulatorState,
  action: SimulatorAction
): SimulatorState {
  switch (action.type) {
    case 'ADD_MESSAGE': // ...
    case 'REMOVE_MESSAGE': // ...
    case 'CHANGE_MODEL': // ...
    case 'RESET': // ...
  }
}
```

**Why Reducers?**
- Predictable state updates
- Easier to debug (action history)
- Testable in isolation
- Scales well for complex state

---

### `src/context/` - React Context

**Purpose**: Share state across component tree without prop drilling.

#### `ThemeContext.tsx`
```typescript
export const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>()
```

#### `TutorialContext.tsx`
```typescript
export const TutorialContext = createContext<{
  currentStep: number
  completedSteps: number[]
  completeStep: (step: number) => void
}>()
```

**When to Use Context?**
- Global state (theme, user preferences)
- Deeply nested components need same data
- Avoid prop drilling

**When NOT to Use Context?**
- Local component state (use useState)
- Complex state logic (use reducers with hooks)
- Frequently changing values (performance issues)

---

### `src/styles/` - Additional Styles

**Purpose**: Custom CSS beyond Tailwind utilities.

#### `animations.css`
```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}
```

#### `components.css`
```css
/* Custom component styles not easily done with Tailwind */
.message-card {
  /* Complex gradients, custom shadows, etc. */
}
```

**Why Separate?**
- Some animations are complex for Tailwind
- Custom component styling
- CSS variables for theming

---

## File Naming Conventions

### React Components
- **PascalCase**: `MessageCard.tsx`, `ContextWindow.tsx`
- **Reason**: Matches React component naming

### Utilities & Helpers
- **camelCase**: `tokenCalculator.ts`, `messageHelpers.ts`
- **Reason**: Standard JavaScript function naming

### Types
- **camelCase**: `message.ts`, `simulator.ts`
- **Reason**: Represents module, not class

### Constants
- **camelCase files**: `constants.ts`, `modelConfigs.ts`
- **SCREAMING_SNAKE_CASE inside**: `const DEFAULT_SYSTEM_PROMPT = ...`

### Hooks
- **camelCase with 'use' prefix**: `useSimulator.ts`, `useTokens.ts`
- **Reason**: React hook naming convention

---

## Import Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

**Usage**:
```typescript
// Instead of: import { useSimulator } from '../../../hooks/useSimulator'
import { useSimulator } from '@/hooks/useSimulator'

// Instead of: import { Message } from '../../../types/message'
import { Message } from '@/types'
```

**Benefits**:
- Cleaner imports
- No relative path hell (`../../..`)
- Easy to refactor (move files without breaking imports)

---

## Component Organization Principles

### 1. Feature-Based Organization
Group by feature, not by file type.

**Good**:
```
components/
  simulator/
    ContextWindow.tsx
    MessageCard.tsx
    TokenCounter.tsx
```

**Bad**:
```
components/
  containers/
    ContextWindow.tsx
  presentational/
    MessageCard.tsx
    TokenCounter.tsx
```

### 2. Co-location
Keep related files close together.

```
hooks/
  useSimulator.ts           # Hook
reducers/
  simulatorReducer.ts       # Reducer used by hook
types/
  simulator.ts              # Types used by both
```

### 3. Shallow Hierarchy
Avoid deep nesting (max 3-4 levels).

**Good**: `src/components/simulator/MessageCard.tsx`

**Bad**: `src/components/simulator/messages/cards/MessageCard.tsx`

### 4. Single Responsibility
Each file has one primary purpose.

- `tokenCalculator.ts` → Token calculation only
- `MessageCard.tsx` → Display one message only

---

## File Size Guidelines

| File Type | Max Lines | Reasoning |
|-----------|-----------|-----------|
| Component | ~300 | If larger, split into subcomponents |
| Hook | ~200 | If larger, split into multiple hooks |
| Utility | ~150 | If larger, split by domain |
| Type file | ~100 | Keep focused on one domain |

**When to Split**:
- File is hard to understand at a glance
- Multiple responsibilities
- Difficult to test

---

## Testing Structure (Future)

When adding tests:

```
src/
  components/
    simulator/
      ContextWindow.tsx
      __tests__/
        ContextWindow.test.tsx
  lib/
    tokenCalculator.ts
    __tests__/
      tokenCalculator.test.ts
```

**Why Co-locate Tests?**
- Easy to find test for a file
- Tests move with the code
- Clear what's tested vs not

---

## Build Output (Not in Repo)

These folders are generated and git-ignored:

```
.next/                    # Next.js build output
node_modules/             # Dependencies
out/                      # Static export (if used)
.vercel/                  # Vercel deployment config
```

---

## Configuration Files Purpose

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js build configuration, redirects, headers |
| `tailwind.config.ts` | Tailwind CSS customization, DaisyUI theme |
| `tsconfig.json` | TypeScript compiler options, path aliases |
| `.eslintrc.json` | Linting rules, code quality |
| `.prettierrc` | Code formatting rules |
| `package.json` | Dependencies, scripts, project metadata |

---

## Adding New Features

### Example: Adding a New Scenario

1. **Define scenario data**:
   - Add to `src/lib/scenarioData.ts`

2. **Create scenario types** (if new):
   - Add to `src/types/scenario.ts`

3. **Update scenario runner** (if needed):
   - Modify `src/components/scenarios/ScenarioRunner.tsx`

4. **Add to scenario list**:
   - Update `src/app/scenarios/page.tsx`

**No new folders needed** - everything has a place!

---

## Adding New Components

### Example: Adding a "Save Simulation" Feature

1. **Create component**:
   - `src/components/sandbox/SaveSimulationModal.tsx`

2. **Create helper function**:
   - Add to `src/lib/exportHelpers.ts`

3. **Create types**:
   - Add to `src/types/export.ts`

4. **Use in Sandbox**:
   - Import in `src/app/sandbox/page.tsx`

---

## Implementation Status

### Core Features (Implemented ✅)
- ✅ Visual context window display with scrollable message list
- ✅ Real-time token counter with breakdown by message type
- ✅ Interactive message system (add/remove messages)
- ✅ Overflow behavior demonstration with visual indicators
- ✅ Step-by-step tutorial (4 steps)
- ✅ Pre-built scenarios (short conversation, document upload, long conversation)
- ✅ Sandbox mode with full experimentation capabilities
- ✅ Model selection (multiple context window sizes)
- ✅ Educational tooltips throughout the app
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Progress bar with color-coded capacity indicators
- ✅ Quick Add buttons for common message templates
- ✅ Compact multi-column layout for efficient UI

### UI/UX Refinements (Recently Completed)
- ✅ Optimized message window height (`max-h-64`)
- ✅ Improved token counter text contrast
- ✅ Accurate percentage display with `Math.floor()`
- ✅ Multi-column Quick Add button layout in sidebar
- ✅ Uniform button styling across Quick Add templates
- ✅ Document scenario accuracy fix (84% capacity)
- ✅ Extended assistant responses for overflow triggering

### Future Enhancements (Planned)
- 🔜 Model comparison mode (side-by-side)
- 🔜 Advanced scenario: Multi-tool workflow
- 🔜 Export simulation functionality
- 🔜 Custom system prompts
- 🔜 Token visualization breakdown chart
- 🔜 Dark mode theme toggle

## Summary

### Key Organizational Principles

✅ **Feature-based grouping**: Components organized by domain
✅ **Separation of concerns**: UI, logic, types are separate
✅ **Flat hierarchy**: Avoid deep nesting
✅ **Co-location**: Related files are close together
✅ **Clear naming**: Conventions are consistent
✅ **Scalable**: Easy to add new features
✅ **Discoverable**: Intuitive structure

### Quick Reference

Need a...
- **UI Component?** → `src/components/`
- **Stateful logic?** → `src/hooks/`
- **Pure function?** → `src/lib/`
- **Type definition?** → `src/types/`
- **New page?** → `src/app/`
- **Reusable UI element?** → `src/components/ui/`

This structure supports rapid development while maintaining clarity and organization.
