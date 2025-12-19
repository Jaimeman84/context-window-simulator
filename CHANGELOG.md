# Changelog

All notable changes to the Context Window Simulator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial release of Context Window Simulator
- Interactive tutorial mode with 4 guided steps
- Pre-built scenarios: Short Conversation, Document Upload, Long Conversation
- Sandbox mode for free-form experimentation
- Real-time token counting with detailed breakdowns
- Visual context window display with scrollable message list
- Overflow behavior demonstration
- Model selection with multiple context window sizes
- Educational tooltips throughout the application
- Responsive design for mobile, tablet, and desktop
- Progress bar with color-coded capacity indicators (green → yellow → red)
- Quick Add buttons for common message templates
- Multi-column layout in sidebar for efficient experimentation
- Custom favicon with context window visualization (blue circular icon with stacked bars)

### UI/UX Improvements
- Optimized message window height to `max-h-64` for better screen utilization
- Improved token counter text contrast with `text-base-content/70`
- Changed percentage display from `toFixed(0)` to `Math.floor()` for accuracy
- Implemented multi-column Quick Add button layout in sidebar
- Applied uniform button styling across all Quick Add templates
- Removed individual button colors for cleaner, consistent interface

### Bug Fixes
- Fixed Document scenario to accurately represent 84% capacity (~3,439 tokens)
- Extended assistant responses to reliably trigger overflow demonstration
- Corrected token calculations to match expected percentages

### Technical Details
- Built with Next.js 14 (App Router)
- TypeScript for type safety
- Tailwind CSS + DaisyUI for styling
- Framer Motion for animations
- Client-side only (no backend required)
- Token approximation: 1 token ≈ 4 characters

### Documentation
- Comprehensive README with features and setup instructions
- Detailed folder structure documentation
- Architecture Design Document (ADD)
- Business Requirements Document (BRD)
- Ideal Customer Profile (ICP)
- User Workflow & Journey documentation
- Implementation status tracking

## [Unreleased]

### Planned Features
- Model comparison mode (side-by-side view)
- Advanced scenario: Multi-tool workflow
- Export simulation functionality (JSON, shareable links)
- Custom system prompt editing
- Token visualization breakdown chart
- Dark mode theme toggle
- Enhanced capacity warnings with actionable suggestions
- Historical context tracking
- Gamification elements (badges, achievements)

### Under Consideration
- Localization (Spanish, Mandarin)
- Real tiktoken integration for precise token counting
- Mobile app version
- Collaboration features
- API integration examples

---

## Version History Legend

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes
