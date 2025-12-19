# User Workflow & Journey

## Context Window Simulator - User Experience Flow

---

## Overview

This document outlines the complete user journey through the Context Window Simulator, from first landing to deep understanding of context windows. The experience is designed to be progressive, building from simple concepts to complex scenarios.

---

## User Journey Map

### 1. Landing & Onboarding (0-30 seconds)

#### Entry Point
User arrives at the application homepage.

#### First Impression
```
┌─────────────────────────────────────────────┐
│  🧠 Context Window Simulator                │
│  Learn how AI models manage their "memory"  │
│                                             │
│  [Start Interactive Tutorial]              │
│  [Jump to Sandbox]                         │
└─────────────────────────────────────────────┘
```

#### Welcome Modal (First-time visitors)
- **Trigger**: First visit (localStorage check)
- **Content**:
  - "Welcome! This tool helps you understand AI context windows"
  - "You'll see how AI models manage limited memory"
  - "Let's start with a quick overview"
- **Actions**:
  - [Take 2-minute tour]
  - [Skip to sandbox]

#### User Decision Points
1. **Guided Learning Path** → Proceed to tutorial mode
2. **Self-Directed Exploration** → Jump to sandbox mode

---

### 2. Tutorial Mode (2-5 minutes)

#### Step 1: Introduction to Context Windows

**Screen Layout**:
```
┌──────────────────────────────────────────┐
│ Step 1 of 4: What is a Context Window?   │
├──────────────────────────────────────────┤
│                                          │
│  [Visual: Empty box with label]          │
│  "This represents a context window -     │
│   the AI's working memory"               │
│                                          │
│  Capacity: 4000 tokens                   │
│  ████████░░░░░░░░░░ 0/4000 (0%)          │
│                                          │
│                    [Next →]              │
└──────────────────────────────────────────┘
```

**Interactive Element**:
- Animated visualization of empty window
- Highlight the capacity bar
- Tooltip: "Hover to learn what tokens are"

**Learning Objective**: Understand the concept of limited memory

---

#### Step 2: Adding Content

**Screen Layout**:
```
┌──────────────────────────────────────────┐
│ Step 2 of 4: Filling the Window          │
├──────────────────────────────────────────┤
│ Context Window (4000 tokens)             │
│ ████████████░░░░░░░░ 2000/4000 (50%)     │
│ ┌────────────────────────────────────┐   │
│ │ System: You are a helpful assistant│   │
│ │ (12 tokens)                        │   │
│ │                                    │   │
│ │ User: Hello! How are you?          │   │
│ │ (8 tokens)                         │   │
│ │                                    │   │
│ │ Assistant: I'm doing well...       │   │
│ │ (186 tokens)                       │   │
│ └────────────────────────────────────┘   │
│                                          │
│  👉 Click [Add Message] to continue      │
│                    [Next →]              │
└──────────────────────────────────────────┘
```

**Interactive Element**:
- User clicks "Add Message" button
- Watch token counter increase
- Progress bar fills proportionally
- Color changes: green → yellow → red

**Learning Objective**: See how content consumes tokens

---

#### Step 3: Reaching Limits

**Screen Layout**:
```
┌──────────────────────────────────────────┐
│ Step 3 of 4: What Happens When Full?     │
├──────────────────────────────────────────┤
│ Context Window (4000 tokens)             │
│ ████████████████████ 3800/4000 (95%)     │
│ ⚠️  Nearly full!                         │
│ ┌────────────────────────────────────┐   │
│ │ [Older messages greyed out]        │   │
│ │ ...                                │   │
│ │ User: Recent message               │   │
│ │ (8 tokens)                         │   │
│ └────────────────────────────────────┘   │
│                                          │
│  ⚠️  When the window is full, old        │
│     messages are removed to make room    │
│                                          │
│  [Add one more message →]                │
└──────────────────────────────────────────┘
```

**Interactive Element**:
- User adds message that exceeds limit
- Animation: Oldest message fades out and disappears
- Visual feedback: "This message was removed"
- Token count adjusts

**Learning Objective**: Experience truncation behavior

---

#### Step 4: Why It Matters

**Screen Layout**:
```
┌──────────────────────────────────────────┐
│ Step 4 of 4: Real-World Impact          │
├──────────────────────────────────────────┤
│                                          │
│  🎯 Key Takeaways:                       │
│                                          │
│  ✓ Context windows are limited           │
│  ✓ Everything counts toward the limit    │
│  ✓ Old content is removed when full      │
│  ✓ Larger windows = more memory          │
│                                          │
│  📚 Real-world examples:                 │
│  • Document analysis (needs big window)  │
│  • Long conversations (fills up fast)    │
│  • Multi-turn coding help (medium need)  │
│                                          │
│  [🎮 Try Scenarios] [🔬 Open Sandbox]   │
└──────────────────────────────────────────┘
```

**User Decision Point**:
1. **Explore Scenarios** → Go to pre-built scenarios
2. **Free Exploration** → Go to sandbox mode

---

### 3. Scenario Mode (3-8 minutes)

#### Scenario Selection Screen

**Layout**:
```
┌──────────────────────────────────────────┐
│  📚 Pre-built Scenarios                  │
├──────────────────────────────────────────┤
│  Choose a scenario to explore:           │
│                                          │
│  🗨️  Short Conversation (Beginner)       │
│     See how a simple chat uses tokens    │
│     [Start →]                            │
│                                          │
│  📄 Document Upload (Intermediate)       │
│     Analyze what happens with large text │
│     [Start →]                            │
│                                          │
│  💬 Long Conversation (Intermediate)     │
│     Watch the window fill over time      │
│     [Start →]                            │
│                                          │
│  🛠️  Multi-Tool Workflow (Advanced)      │
│     See complex interactions with tools  │
│     [Start →]                            │
│                                          │
│  [← Back to Tutorial] [Sandbox Mode →]  │
└──────────────────────────────────────────┘
```

---

#### Scenario Execution: "Document Upload"

**Phase 1: Setup**
```
┌──────────────────────────────────────────┐
│  Scenario: Document Upload               │
│  Model: GPT-3.5 (4K context)            │
├──────────────────────────────────────────┤
│  You're analyzing a research paper.      │
│  The document is 3,500 tokens.           │
│                                          │
│  [Load Document →]                       │
└──────────────────────────────────────────┘
```

**Phase 2: Document Loads**
```
┌──────────────────────────────────────────┐
│  Context Window (4000 tokens)            │
│  ████████████████░░░░ 3500/4000 (87%)   │
│  ⚠️  Window is 87% full                  │
│ ┌────────────────────────────────────┐  │
│ │ 📄 Research Paper Content...        │  │
│ │ [Long document text shown]         │  │
│ │ (3500 tokens)                      │  │
│ └────────────────────────────────────┘  │
│                                          │
│  💡 Notice: Document took most of the   │
│     available space!                    │
│                                          │
│  [Ask a question about the document →]  │
└──────────────────────────────────────────┘
```

**Phase 3: User Interaction**
```
┌──────────────────────────────────────────┐
│  Context Window (4000 tokens)            │
│  ████████████████████ 4100/4000 (102%)  │
│  🔴 OVERFLOW! Content removed            │
│ ┌────────────────────────────────────┐  │
│ │ 📄 Research Paper Content...        │  │
│ │ [Top portion removed - greyed]     │  │
│ │ [Remaining content visible]        │  │
│ │                                    │  │
│ │ User: What is the main conclusion? │  │
│ │ (8 tokens)                         │  │
│ │                                    │  │
│ │ Assistant: [Response]              │  │
│ │ (95 tokens)                        │  │
│ └────────────────────────────────────┘  │
│                                          │
│  ⚠️  Part of the document was removed!  │
│     The AI can't see the beginning.     │
│                                          │
│  [Try Next Scenario] [Try with 8K] [Reset]│
└──────────────────────────────────────────┘
```

**Learning Objective**:
- Understand why document size matters
- See truncation in action
- Compare context window sizes

---

### 4. Sandbox Mode (5-15 minutes)

#### Main Sandbox Interface

**Full Interactive Layout**:
```
┌──────────────────────────────────────────────────────────┐
│  🔬 Context Window Sandbox                               │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Model: [GPT-3.5 (4K) ▼] [Compare Mode: Off ▼]         │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │ Context Window Capacity                        │     │
│  │ ████████████░░░░░░░░ 2400/4000 tokens (60%)   │     │
│  │                                                │     │
│  │ Breakdown:                                     │     │
│  │ 🔧 System Prompt: 120 tokens                   │     │
│  │ 💬 Messages: 2280 tokens                       │     │
│  │ ✅ Remaining: 1600 tokens                      │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │ Context Window Contents                        │     │
│  │ ┌────────────────────────────────────────────┐ │     │
│  │ │ 🔧 System                                  │ │     │
│  │ │ You are a helpful AI assistant...          │ │     │
│  │ │ [120 tokens] [−]                           │ │     │
│  │ ├────────────────────────────────────────────┤ │     │
│  │ │ 👤 User                                    │ │     │
│  │ │ Hello! Can you help me?                    │ │     │
│  │ │ [8 tokens] [−]                             │ │     │
│  │ ├────────────────────────────────────────────┤ │     │
│  │ │ 🤖 Assistant                               │ │     │
│  │ │ Of course! I'd be happy to help...         │ │     │
│  │ │ [156 tokens] [−]                           │ │     │
│  │ │ [... more messages ...]                    │ │     │
│  │ └────────────────────────────────────────────┘ │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
│  [+ Add User Message] [+ Add AI Response]               │
│  [+ Add Document] [+ Add Tool Output]                   │
│  [🔄 Reset] [💾 Export] [❓ Help]                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

#### Interactive Elements in Sandbox

**1. Adding a User Message**

**Action**: User clicks "+ Add User Message"

**Modal Appears**:
```
┌──────────────────────────────────┐
│  Add User Message                │
├──────────────────────────────────┤
│  Message:                        │
│  ┌────────────────────────────┐  │
│  │ Type your message...       │  │
│  │                            │  │
│  │                            │  │
│  └────────────────────────────┘  │
│                                  │
│  Estimated tokens: ~0            │
│  (Updates as you type)           │
│                                  │
│  [Cancel] [Add Message]          │
└──────────────────────────────────┘
```

**Real-time Feedback**:
- Token estimate updates as user types
- Warning if adding would exceed limit
- Preview of what will be removed if overflow

---

**2. Switching Models (Comparison Mode)**

**Action**: User selects "Compare Mode: On"

**Split-Screen View**:
```
┌──────────────────────────────────────────────────────────┐
│  Model Comparison                                        │
├────────────────────────┬─────────────────────────────────┤
│  GPT-3.5 (4K)          │  GPT-4 (128K)                   │
│  ██████████ 100% FULL  │  ██░░░░░░░░ 12% used            │
│  4000/4000 tokens      │  15360/128000 tokens            │
│                        │                                 │
│  [Conversation truncated]│ [Full conversation visible]  │
│  Only recent 4-5 msgs  │  All 50+ messages included      │
│                        │                                 │
│  ⚠️  Lost context!     │  ✅ Complete memory             │
└────────────────────────┴─────────────────────────────────┘
```

**Learning Objective**:
- Viscerally see the difference between model sizes
- Understand when to choose larger context windows

---

**3. Document Upload Simulation**

**Action**: User clicks "+ Add Document"

**Options**:
```
┌──────────────────────────────────┐
│  Add Document                    │
├──────────────────────────────────┤
│  Choose document size:           │
│                                  │
│  ○ Small (500 tokens)            │
│    ~ 1 page summary              │
│                                  │
│  ○ Medium (2000 tokens)          │
│    ~ 5 page article              │
│                                  │
│  ○ Large (5000 tokens)           │
│    ~ 15 page research paper      │
│                                  │
│  ○ Very Large (20000 tokens)     │
│    ~ entire book chapter         │
│                                  │
│  [Cancel] [Add Document]         │
└──────────────────────────────────┘
```

**Result**:
- Document appears in context window
- Capacity bar jumps
- Visual indication of space consumed
- Warning if it causes overflow

---

### 5. Educational Tooltips & Help System

#### Contextual Tooltips

**Trigger**: Hover or click (?) icons

**Examples**:

**On "Token"**:
```
┌──────────────────────────────┐
│  💡 What is a token?         │
├──────────────────────────────┤
│  A token is a piece of text  │
│  the AI processes.           │
│                              │
│  Rough estimate:             │
│  • 1 token ≈ 4 characters    │
│  • 1 token ≈ 0.75 words      │
│                              │
│  Example:                    │
│  "Hello world" = 2 tokens    │
│                              │
│  [Learn more]                │
└──────────────────────────────┘
```

**On Progress Bar (when 85%)**:
```
┌──────────────────────────────┐
│  ⚠️  Window Nearly Full!     │
├──────────────────────────────┤
│  You're at 85% capacity.     │
│                              │
│  What happens next:          │
│  • New messages will cause   │
│    old ones to be removed    │
│  • The AI will "forget"      │
│    earlier conversation      │
│                              │
│  💡 In real apps, you might: │
│  • Summarize old messages    │
│  • Start a new conversation  │
│  • Use a larger model        │
└──────────────────────────────┘
```

---

### 6. Export & Share (Optional Feature)

**Action**: User clicks "💾 Export"

**Options**:
```
┌──────────────────────────────────┐
│  Export Simulation               │
├──────────────────────────────────┤
│  Save your learning:             │
│                                  │
│  □ Current conversation state    │
│  □ Token breakdown chart         │
│  □ Learning summary              │
│                                  │
│  Format:                         │
│  ○ PDF Report                    │
│  ○ JSON Data                     │
│  ○ Share Link (7-day expiry)     │
│                                  │
│  [Cancel] [Export]               │
└──────────────────────────────────┘
```

---

## User Flow Diagrams

### High-Level Journey

```
Landing Page
    │
    ├─→ First-time user → Welcome Modal
    │                        │
    │                        ├─→ Take Tour → Tutorial (Steps 1-4)
    │                        │                   │
    │                        │                   └─→ Scenarios
    │                        │
    │                        └─→ Skip → Sandbox
    │
    └─→ Returning user → Last visited mode
                            (Tutorial/Scenarios/Sandbox)
```

### Decision Tree

```
User arrives
    │
    ├─→ "I want to learn" → Tutorial Mode
    │       │
    │       └─→ Complete → Scenarios
    │               │
    │               └─→ Explore → Sandbox
    │
    ├─→ "I want to experiment" → Sandbox Mode
    │       │
    │       └─→ Confused → "?" Help → Tutorial
    │
    └─→ "I want specific examples" → Scenarios
            │
            └─→ Understand → Sandbox for exploration
```

---

## Interaction Patterns

### 1. Progressive Disclosure

- Start with simplest concept (empty window)
- Gradually introduce complexity (tokens, limits, truncation)
- Advanced features hidden until basics understood

### 2. Immediate Feedback

- Every action has visual response
- Token counts update in real-time
- Progress bar reflects current state
- Color changes signal status

### 3. Undo/Reset Safety

- Easy to reset and start over
- No fear of "breaking" anything
- Encourage experimentation

### 4. Contextual Help

- Help always accessible via (?) icons
- Tooltips appear on hover
- Explanations appear when relevant (e.g., warning on 85% full)

---

## Accessibility Considerations

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys to navigate message list

### Screen Readers
- ARIA labels on all controls
- Progress bar announces percentage
- Messages announce when added/removed
- Alerts for important state changes

### Visual Accessibility
- High contrast mode support
- Color is not the only indicator (icons + text)
- Resizable text
- Focus indicators clearly visible

---

## Success Milestones

### Beginner Success (5 minutes)
✅ Completed tutorial
✅ Added at least one message
✅ Saw progress bar fill
✅ Experienced overflow once

### Intermediate Success (10 minutes)
✅ Completed 2+ scenarios
✅ Used sandbox mode
✅ Compared two model sizes
✅ Understood token estimation

### Advanced Success (15+ minutes)
✅ Explored all scenarios
✅ Experimented extensively in sandbox
✅ Exported results
✅ Can explain concept to others

---

## Exit Points

Users may leave after:
1. **Quick understanding** (5 min) - Got basic concept, satisfied
2. **Scenario completion** (10 min) - Explored examples, feel confident
3. **Deep exploration** (15+ min) - Exhausted all features, complete mastery

**Goal**: At any exit point, user can explain what a context window is.
