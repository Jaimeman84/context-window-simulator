# 🧠 Context Window Simulator

An interactive educational web application to help students and developers visualize and understand how AI context windows work.

## 📚 What You'll Learn

- **Visualize Context Windows**: See how AI models manage limited "working memory" with real-time token counting
- **Understand Tokens**: Learn what tokens are, how they're counted, and why they matter
- **Experience Overflow**: See what happens when context windows fill up and understand truncation behavior
- **Compare Models**: Explore different AI models with varying context window sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or navigate to the repository:
```bash
cd context-window-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Features

### 📖 Tutorial Mode
A 4-step guided introduction to context windows:
1. What is a Context Window?
2. Filling the Window
3. Reaching Limits
4. Why It Matters

### 🎬 Pre-Built Scenarios
- **Short Conversation** (Beginner): See basic token usage
- **Document Upload** (Intermediate): Understand document capacity impact
- **Long Conversation** (Intermediate): Watch gradual window filling

### 🔬 Sandbox Mode
- Add custom messages (user, assistant, tool outputs)
- Remove messages individually
- Switch between different AI models
- See real-time token counting
- Experience overflow behavior
- Quick Add buttons for common message templates
- Compact multi-column layout for efficient exploration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Animations**: Framer Motion
- **State Management**: React Hooks (useReducer)

## 📁 Project Structure

```
context-window-simulator/
├── docs/                      # Documentation
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── tutorial/          # Tutorial mode
│   │   ├── scenarios/         # Pre-built scenarios
│   │   └── sandbox/           # Sandbox mode
│   ├── components/            # React components
│   │   ├── layout/            # Header, Footer
│   │   ├── simulator/         # Core simulator components
│   │   ├── sandbox/           # Sandbox-specific components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript types
│   └── reducers/              # State reducers
└── public/                    # Static assets
```

## 🎓 Learning Objectives

After using this simulator, students will be able to:

✅ Define what a context window is
✅ Explain how tokens are counted
✅ Understand capacity limits and overflow behavior
✅ Choose appropriate models based on context needs
✅ Design better AI applications with context awareness

## 🔑 Key Concepts

### Context Window
The maximum amount of text (measured in tokens) that an AI model can process at once. Everything counts toward this limit:
- System instructions
- Conversation history
- User messages
- AI responses

### Tokens
Units of text that AI models process. Rough approximation:
- 1 token ≈ 4 characters
- 1 token ≈ 0.75 words

### Overflow/Truncation
When content exceeds the context window limit, older messages are automatically removed to make room for new ones. The simulator visually demonstrates this by:
- Marking removed messages as "not visible" (greyed out)
- Showing warning indicators when capacity reaches 85%
- Displaying overflow alerts at 100%+ capacity

## 🌟 Educational Design

The simulator uses:
- **Progressive Learning**: Tutorial → Scenarios → Sandbox
- **Visual Feedback**: Color-coded capacity indicators (green → yellow → red)
- **Immediate Interaction**: Real-time token counting with detailed breakdowns
- **Hands-On Experience**: Interactive message adding and removal
- **Smart UI**: Compact, multi-column layouts for efficient experimentation
- **Template Messages**: Quick Add buttons for common scenarios (greetings, questions, long documents)

## ✨ Recent Improvements

### UI/UX Enhancements
- **Optimized Message Window**: Reduced height to `max-h-64` for better screen utilization
- **Token Counter Visibility**: Improved text contrast with `text-base-content/70` for better readability
- **Accurate Percentage Display**: Changed from `toFixed(0)` to `Math.floor()` for precise capacity percentages
- **Quick Add Buttons**: Multi-column layout in sidebar for faster message template selection
- **Compact Controls**: All Quick Add buttons use uniform styling for cleaner interface

### Accuracy Improvements
- **Document Scenario Fix**: Expanded document content to accurately represent 84% capacity (~3,439 tokens)
- **Overflow Triggering**: Extended assistant responses to reliably trigger overflow demonstration
- **Token Calculations**: Precise token counting for all message types with real-time updates

## 🤝 Contributing

This is an educational project. Suggestions and improvements are welcome!

## 📄 License

MIT License - feel free to use this for educational purposes.

## 🙏 Acknowledgments

Built to help students understand AI context windows through interactive visualization.

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Happy Learning! 🎉**
