'use client';

import { useState } from 'react';
import { useSimulator } from '@/hooks/useSimulator';
import { ContextWindow } from '@/components/simulator/ContextWindow';
import { AddMessageModal } from '@/components/sandbox/AddMessageModal';
import { MODELS, MessageRole } from '@/types';

export default function SandboxPage() {
  const { state, actions } = useSimulator();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddMessage = (role: MessageRole, content: string) => {
    actions.addMessage(role, content);
  };

  const handleQuickAdd = (role: MessageRole, content: string) => {
    actions.addMessage(role, content);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sandbox Mode</h1>
        <p className="text-base-content/70">
          Experiment freely with different messages and models
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main Simulator */}
        <div>
          <ContextWindow
            state={state}
            onMessageRemove={actions.removeMessage}
            showControls={true}
          />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Message
            </button>

            <button onClick={actions.reset} className="btn btn-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Model Selector */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="font-semibold mb-3">Select Model</h3>
              <div className="space-y-2">
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => actions.changeModel(model)}
                    className={`btn btn-sm w-full justify-start ${
                      state.modelConfig.id === model.id
                        ? 'btn-primary'
                        : 'btn-ghost'
                    }`}
                  >
                    <div className="text-left flex-grow">
                      <div className="font-semibold">{model.name}</div>
                      <div className="text-xs opacity-70">
                        {(model.contextWindow / 1000).toFixed(0)}K tokens
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card bg-info/10">
            <div className="card-body">
              <h3 className="font-semibold mb-2">💡 Tips</h3>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>Try different model sizes</li>
                <li>Add long messages to see overflow</li>
                <li>Remove messages to free up space</li>
                <li>Watch the token counter</li>
              </ul>
            </div>
          </div>

          {/* Quick Add */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="font-semibold mb-3">⚡ Quick Add</h3>
              <div className="flex flex-row flex-wrap gap-2">
                <button
                  onClick={() => handleQuickAdd('user', 'Hello! How are you?')}
                  className="btn btn-xs btn-outline"
                >
                  👤 Greeting
                </button>
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'assistant',
                      "I'm doing well, thank you! How can I help you today?"
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  🤖 Response
                </button>
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'user',
                      'Can you explain what a context window is?'
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  👤 Question
                </button>
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'user',
                      'I\'m working on a web application and need help understanding the difference between server-side rendering and client-side rendering. Can you explain the pros and cons of each approach, and when I should use one over the other? I\'m particularly interested in performance implications and SEO considerations for my e-commerce website. I want to ensure my site loads quickly and ranks well in search engines. What are the trade-offs between these approaches in terms of initial page load time, time to interactive, and crawlability? Should I consider a hybrid approach like Next.js or Remix, or stick with pure client-side or server-side rendering? My application needs to handle dynamic product listings, user authentication, and personalized recommendations.'
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  📄 ~200 tokens
                </button>
                {/* <button
                  onClick={() =>
                    handleQuickAdd(
                      'assistant',
                      'Great question! Let me explain the key differences between server-side rendering (SSR) and client-side rendering (CSR):\n\nServer-Side Rendering (SSR):\n- The HTML is generated on the server for each request\n- Pros: Better initial page load, excellent SEO, works without JavaScript\n- Cons: Higher server load, slower navigation between pages\n- Best for: Content-heavy sites, e-commerce, blogs\n\nClient-Side Rendering (CSR):\n- The browser downloads a minimal HTML page and JavaScript builds the UI\n- Pros: Fast navigation after initial load, reduced server load, rich interactions\n- Cons: Slower initial load, SEO challenges, requires JavaScript\n- Best for: Web applications, dashboards, interactive tools\n\nFor your e-commerce site, I\'d recommend SSR or a hybrid approach (like Next.js) because SEO is critical for product pages and you want fast initial loads to reduce bounce rates.'
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  🤖 ~300 tokens
                </button> */}
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'assistant',
                      'Here\'s a complete example of how to implement authentication in a React application:\n\n```typescript\nimport { useState, useContext, createContext } from \'react\';\n\ninterface User {\n  id: string;\n  email: string;\n  name: string;\n}\n\ninterface AuthContextType {\n  user: User | null;\n  login: (email: string, password: string) => Promise<void>;\n  logout: () => void;\n  isAuthenticated: boolean;\n}\n\nconst AuthContext = createContext<AuthContextType | undefined>(undefined);\n\nexport function AuthProvider({ children }: { children: React.ReactNode }) {\n  const [user, setUser] = useState<User | null>(null);\n\n  const login = async (email: string, password: string) => {\n    try {\n      const response = await fetch(\'/api/login\', {\n        method: \'POST\',\n        headers: { \'Content-Type\': \'application/json\' },\n        body: JSON.stringify({ email, password }),\n      });\n      if (!response.ok) throw new Error(\'Login failed\');\n      const data = await response.json();\n      setUser(data.user);\n      localStorage.setItem(\'token\', data.token);\n    } catch (error) {\n      console.error(\'Login failed:\', error);\n      throw error;\n    }\n  };\n\n  const logout = () => {\n    setUser(null);\n    localStorage.removeItem(\'token\');\n  };\n\n  return (\n    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport function useAuth() {\n  const context = useContext(AuthContext);\n  if (context === undefined) {\n    throw new Error(\'useAuth must be used within an AuthProvider\');\n  }\n  return context;\n}\n```\n\nThis creates a reusable authentication context that you can use throughout your app. The pattern includes proper error handling, TypeScript types, and a custom hook for easy access to the auth state.'
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  💻 ~400 tokens
                </button>
                {/* <button
                  onClick={() =>
                    handleQuickAdd(
                      'user',
                      'I need to upload this product documentation for analysis:\n\nProduct Overview: SmartHome Hub Pro\n\nThe SmartHome Hub Pro is our flagship home automation controller that seamlessly integrates with over 200 smart devices from leading manufacturers. Built with enterprise-grade security and featuring a powerful quad-core processor, it provides lightning-fast response times and supports complex automation scenarios.\n\nKey Features:\n- Voice control via Alexa, Google Assistant, and Siri\n- Advanced scheduling with sunrise/sunset awareness\n- Energy monitoring and optimization\n- Custom scene creation with up to 50 actions per scene\n- Mobile app for iOS and Android\n- Local processing for privacy and reliability\n- Zigbee, Z-Wave, Wi-Fi, and Bluetooth connectivity\n- Automatic firmware updates with rollback capability\n\nTechnical Specifications:\n- Processor: ARM Cortex-A53 Quad-Core 1.4GHz\n- RAM: 2GB DDR4\n- Storage: 16GB eMMC\n- Network: Gigabit Ethernet, Wi-Fi 6 (802.11ax), Bluetooth 5.2\n- Power: 12V DC, 2A (included adapter)\n- Dimensions: 150mm x 150mm x 35mm\n- Operating Temperature: 0°C to 40°C\n\nThe device includes a comprehensive 2-year warranty and lifetime technical support.'
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  📋 ~500 tokens
                </button> */}
                <button
                  onClick={() =>
                    handleQuickAdd(
                      'user',
                      'Please analyze this essay I wrote:\n\nThe Impact of Artificial Intelligence on Modern Education\n\nArtificial Intelligence is revolutionizing the educational landscape in unprecedented ways, transforming how students learn, how teachers instruct, and how educational institutions operate. This transformation extends far beyond simple automation, touching every aspect of the educational experience from personalized learning paths to administrative efficiency.\n\nPersonalized Learning Experiences\n\nOne of the most significant contributions of AI to education is the ability to create truly personalized learning experiences. Traditional classroom settings often struggle to accommodate the diverse learning speeds, styles, and preferences of individual students. AI-powered adaptive learning systems can analyze a student\'s performance in real-time, identifying strengths, weaknesses, and learning patterns. These systems then adjust the difficulty, pace, and presentation of material to match each student\'s needs, ensuring optimal engagement and comprehension.\n\nFor example, if a student consistently struggles with algebraic concepts but excels at geometry, the AI system can provide additional practice problems and alternative explanations for algebra while allowing the student to progress more quickly through geometric topics. This level of individualization was previously impossible in traditional educational settings and represents a fundamental shift in pedagogical approaches.\n\nEnhanced Teacher Capabilities\n\nContrary to fears that AI might replace teachers, the technology actually enhances educators\' capabilities by handling time-consuming administrative tasks. Automated grading systems can evaluate multiple-choice tests, essays, and even coding assignments, freeing teachers to focus on meaningful interactions with students. AI teaching assistants can answer common questions, provide immediate feedback on assignments, and identify students who may be struggling before they fall too far behind.\n\nThis technology empowers teachers to be mentors and facilitators rather than mere information deliverers, allowing them to build stronger relationships with students and provide the emotional support and complex guidance that AI cannot replicate.'
                    )
                  }
                  className="btn btn-xs btn-outline"
                >
                  📝 ~600 tokens
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Message Modal */}
      <AddMessageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMessage}
      />
    </div>
  );
}
