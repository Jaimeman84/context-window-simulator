import { Scenario } from '@/types';

/**
 * Pre-built scenarios for educational demonstrations
 */
export const SCENARIOS: Scenario[] = [
  {
    id: 'short-conversation',
    title: 'Short Conversation',
    description: 'See how a simple chat uses tokens',
    difficulty: 'beginner',
    modelId: 'gpt-3.5-turbo',
    estimatedMinutes: 2,
    icon: '💬',
    learningObjectives: [
      'Understand basic token usage',
      'See how messages accumulate',
      'Learn about system prompts',
    ],
    steps: [
      {
        id: 'step-1',
        instruction: 'Let\'s start with a simple greeting',
        action: 'add_message',
        payload: {
          role: 'user',
          content: 'Hello! How are you?',
        },
        expectedOutcome: 'User message added, consuming ~8 tokens',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-2',
        instruction: 'The AI responds to the greeting',
        action: 'add_message',
        payload: {
          role: 'assistant',
          content:
            "I'm doing well, thank you! How can I help you today?",
        },
        expectedOutcome: 'Assistant response added, ~15 tokens',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-3',
        instruction: 'Notice the token count',
        action: 'explain',
        payload: {
          explanation:
            'So far we\'ve only used about 35 tokens total (including the system prompt). This simple conversation fits easily within the 4K context window.',
        },
        expectedOutcome: 'User understands token consumption',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-4',
        instruction: 'Let\'s add one more exchange',
        action: 'add_message',
        payload: {
          role: 'user',
          content: 'Can you tell me a short joke?',
        },
        expectedOutcome: 'Another user message added',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-5',
        instruction: 'AI tells a joke',
        action: 'add_message',
        payload: {
          role: 'assistant',
          content:
            'Why don\'t scientists trust atoms? Because they make up everything!',
        },
        expectedOutcome: 'Joke response added, still plenty of space',
        autoAdvanceDelay: 0,
      },
    ],
  },
  {
    id: 'document-upload',
    title: 'Document Upload',
    description: 'Analyze what happens with large text',
    difficulty: 'intermediate',
    modelId: 'gpt-3.5-turbo',
    estimatedMinutes: 3,
    icon: '📄',
    learningObjectives: [
      'See how documents consume capacity',
      'Understand why document size matters',
      'Experience overflow with questions',
    ],
    steps: [
      {
        id: 'step-1',
        instruction: 'Imagine uploading a research paper',
        action: 'explain',
        payload: {
          explanation:
            'We\'re going to simulate uploading a 3,500 token document. This is roughly equivalent to a 10-page research paper.',
        },
        expectedOutcome: 'User understands the scenario',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-2',
        instruction: 'Loading document...',
        action: 'add_document',
        payload: {
          size: 3500,
          content:
            '[RESEARCH PAPER CONTENT]\n\nAbstract: This paper examines the fundamental role of context windows in modern artificial intelligence systems, with particular emphasis on large language models and their practical applications. We explore the technical constraints, optimization strategies, and architectural considerations that developers must understand when building AI-powered applications. Our research synthesizes current understanding of context window limitations, surveys existing optimization techniques, and proposes best practices for developers working with constrained context environments.\n\nIntroduction\n\nContext windows represent one of the most critical constraints in contemporary AI systems. As large language models have grown in capability and sophistication, understanding how these models process and retain information within their context windows has become essential for effective application development. This research examines the theoretical foundations, practical implications, and emerging solutions to context window limitations that affect both model designers and application developers.\n\nThe exponential growth in model capabilities over recent years has been accompanied by corresponding increases in context window sizes. However, these increases come with significant computational costs and architectural trade-offs that must be carefully considered. Understanding these constraints enables developers to make informed decisions about system design, user experience optimization, and resource allocation.\n\nBackground and Historical Context\n\nThe concept of a context window in AI refers to the maximum amount of information that a model can actively process and reference during a single interaction or inference pass. This limitation stems from the architectural design of transformer-based models, where computational complexity increases quadratically with sequence length. Early models like GPT-2 featured context windows of merely 1,024 tokens, while modern systems have expanded this to 100,000 tokens or more, with some experimental architectures pushing beyond one million tokens.\n\nThis evolution has been driven by advances in both hardware capabilities and algorithmic optimizations. Graphics processing units have become more powerful and memory-efficient, enabling the processing of longer sequences. Simultaneously, researchers have developed novel attention mechanisms and architectural modifications that reduce computational overhead while maintaining model performance.\n\nTechnical Architecture and Computational Complexity\n\nTransformer models utilize self-attention mechanisms that compare every token to every other token in the sequence. This creates an O(n²) computational complexity, where n represents the sequence length. As context windows expand, the memory and processing requirements grow exponentially, presenting significant engineering challenges for both training and inference.\n\nThe attention mechanism computes three matrices for each token: queries, keys, and values. The dot product of queries and keys creates an attention score matrix of size n×n, which must be stored in memory and processed through softmax normalization. For a sequence of 10,000 tokens, this requires storing and computing operations on a matrix with 100 million elements, demanding substantial computational resources.\n\nResearchers have developed various optimization techniques to address these scalability concerns. Sparse attention mechanisms selectively focus on subsets of tokens rather than computing full attention matrices, reducing complexity to O(n√n) or even O(n log n) in some implementations. Sliding window approaches maintain fixed-size contexts that move through longer sequences, enabling processing of arbitrarily long inputs while keeping memory requirements constant. Hierarchical structures compress information at multiple levels of abstraction, creating summary representations that capture essential information while discarding redundant details.\n\nPractical Applications and Implementation Strategies\n\nDevelopers working with AI systems must carefully manage context windows to optimize application performance and user experience. Document analysis applications face particular challenges when processing materials that exceed available context capacity. A single research paper might contain 8,000 tokens, consuming the entire context window of smaller models and leaving little room for analysis, questions, or responses.\n\nConversational AI systems must balance maintaining conversation history against the need to include relevant background information, system instructions, and space for generating responses. Long conversations inevitably exceed context limits, requiring intelligent strategies for managing which information to retain and which to discard or compress.\n\nCommon strategies include intelligent truncation that preserves the most relevant information based on recency, importance scoring, or semantic similarity to current queries. Summarization techniques compress earlier context into condensed representations that capture key information while using fewer tokens. Retrieval-augmented generation selectively includes external information only when needed, storing full documents externally and retrieving relevant passages dynamically based on user queries.\n\nVector databases and semantic search enable efficient retrieval of relevant context from large document collections. Rather than including entire documents in the context window, systems can embed documents as vectors, search for semantically similar passages when users ask questions, and include only the most relevant sections in the prompt. This approach effectively extends the accessible knowledge base far beyond the context window limit.\n\nFuture Directions and Research Opportunities\n\nThe field continues to evolve rapidly, with researchers exploring novel architectures that fundamentally change how models handle long contexts. Recurrent mechanisms that process sequences incrementally, state-space models that maintain compressed representations of long histories, and memory-augmented architectures that explicitly separate short-term and long-term information storage all show promise for transcending current limitations.\n\nConclusions and Recommendations\n\nContext windows are a critical constraint in AI systems that developers must thoroughly understand to build effective applications. As models continue to evolve, we anticipate ongoing innovations in context management strategies, architectural optimizations, and application design patterns that work effectively within these constraints. Developers should carefully consider context requirements during system design, implement appropriate management strategies for their use cases, and stay informed about emerging techniques that may enable new capabilities.\n\n'.repeat(
              2
            ),
        },
        expectedOutcome: 'Document consumes 84% of context window',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-3',
        instruction: 'Notice the capacity',
        action: 'explain',
        payload: {
          explanation:
            'The document alone takes up 84% of the available space! This means we only have ~657 tokens left for questions and answers.',
        },
        expectedOutcome: 'User sees the impact of large documents',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-4',
        instruction: 'Let\'s ask a question about it',
        action: 'add_message',
        payload: {
          role: 'user',
          content: 'What is the main conclusion of this paper?',
        },
        expectedOutcome: 'Question added, capacity at 84%',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-5',
        instruction: 'AI responds based on the document',
        action: 'add_message',
        payload: {
          role: 'assistant',
          content:
            'Based on the research paper, I can provide a comprehensive analysis of the main conclusions:\n\nThe paper\'s primary conclusion is that context windows represent a critical architectural constraint that fundamentally shapes how AI systems must be designed and deployed. This isn\'t merely a technical limitation to work around, but rather a core consideration that should inform every aspect of application architecture.\n\nKey takeaways from the research include:\n\n1. Architectural Understanding: Developers must deeply understand the quadratic computational complexity (O(n²)) inherent in transformer attention mechanisms. This complexity means that doubling the context window requires four times the computational resources, making context size a primary cost driver.\n\n2. Strategic Management: The paper emphasizes that effective context management requires deliberate strategies rather than simply hoping for larger windows. Techniques like intelligent truncation, summarization, and retrieval-augmented generation aren\'t optional optimizations—they\'re essential patterns for production systems.\n\n3. Application Design Impact: Context limitations should influence fundamental design decisions. For document analysis applications, this means choosing between processing documents in chunks, using retrieval systems, or accepting that only smaller documents can be fully analyzed. For conversational AI, it requires deciding which conversation history to preserve and when to summarize or discard earlier exchanges.\n\n4. Future Considerations: While context windows continue to expand, the paper argues that constraints will always exist. Even as we move from 4K to 100K to potentially millions of tokens, there will always be use cases that exceed available capacity. Therefore, learning to work effectively within constraints remains valuable regardless of future hardware improvements.\n\n5. User Experience Implications: The paper highlights that context limitations directly impact user experience. Applications must be designed to gracefully handle situations where important information gets truncated, potentially through explicit warnings, smart summarization, or architectural patterns that prevent critical data loss.\n\n6. Performance Optimization: The research emphasizes the importance of optimizing for token efficiency. Every token counts when working with limited context windows. Developers should carefully consider prompt engineering, using concise language where possible, and avoiding unnecessary verbosity in system instructions or user messages.\n\n7. Monitoring and Observability: Production systems should include robust monitoring of context window utilization. Teams need visibility into how close they are to limits, which conversations or documents cause issues, and patterns in overflow behavior to inform architectural improvements.\n\nIn summary, the research concludes that context windows are not just a temporary technical hurdle, but a fundamental aspect of AI system design that requires thoughtful architectural decisions, strategic implementation patterns, and careful consideration of user experience implications. Understanding these constraints enables developers to build more robust, efficient, and user-friendly AI applications.',
        },
        expectedOutcome: 'Response causes overflow - document is partially truncated!',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-6',
        instruction: 'Overflow occurred!',
        action: 'explain',
        payload: {
          explanation:
            'Notice how the beginning of the document was removed to make room for the response. The AI can no longer see the full document!',
        },
        expectedOutcome: 'User understands document overflow',
        autoAdvanceDelay: 0,
      },
    ],
  },
  {
    id: 'long-conversation',
    title: 'Long Conversation',
    description: 'Watch the window fill over time',
    difficulty: 'intermediate',
    modelId: 'gpt-3.5-turbo',
    estimatedMinutes: 4,
    icon: '💭',
    learningObjectives: [
      'Experience gradual window filling',
      'See early message truncation',
      'Understand conversation limits',
    ],
    steps: [
      {
        id: 'step-1',
        instruction: 'Starting a longer conversation',
        action: 'explain',
        payload: {
          explanation:
            'We\'ll simulate a multi-turn conversation to see how the context window fills up over time.',
        },
        expectedOutcome: 'User understands the scenario',
        autoAdvanceDelay: 0,
      },
      {
        id: 'step-2',
        instruction: 'Adding multiple exchanges...',
        action: 'add_message',
        payload: {
          role: 'user',
          content: 'I need help understanding machine learning basics.',
        },
        expectedOutcome: 'Conversation starts',
        autoAdvanceDelay: 1000,
      },
      {
        id: 'step-3',
        instruction: 'AI explains basics',
        action: 'add_message',
        payload: {
          role: 'assistant',
          content:
            'Machine learning is a subset of AI where systems learn from data. There are three main types: supervised learning (learning from labeled examples), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error with rewards).',
        },
        expectedOutcome: 'Detailed response added',
        autoAdvanceDelay: 1000,
      },
      {
        id: 'step-4',
        instruction: 'User asks follow-up',
        action: 'add_message',
        payload: {
          role: 'user',
          content: 'Can you explain supervised learning in more detail?',
        },
        expectedOutcome: 'Follow-up question',
        autoAdvanceDelay: 1000,
      },
      {
        id: 'step-5',
        instruction: 'AI provides detailed explanation',
        action: 'add_message',
        payload: {
          role: 'assistant',
          content:
            'Supervised learning works by training a model on labeled data - data where we already know the correct answer. For example, if we want to classify emails as spam or not spam, we\'d feed the model thousands of emails that are already labeled. The model learns patterns that distinguish spam from non-spam. Common algorithms include linear regression, decision trees, random forests, and neural networks. The model is then evaluated on new, unseen data to check its accuracy.',
        },
        expectedOutcome: 'Longer response, capacity increasing',
        autoAdvanceDelay: 1000,
      },
      {
        id: 'step-6',
        instruction: 'Continuing the conversation...',
        action: 'add_message',
        payload: {
          role: 'user',
          content:
            'That makes sense! What about neural networks specifically?',
        },
        expectedOutcome: 'More messages added',
        autoAdvanceDelay: 1000,
      },
      {
        id: 'step-7',
        instruction: 'Detailed neural network explanation',
        action: 'add_message',
        payload: {
          role: 'assistant',
          content:
            'Neural networks are inspired by the human brain. They consist of layers of interconnected nodes (neurons). Each connection has a weight that gets adjusted during training. Data flows through the network: input layer receives data, hidden layers process it through mathematical transformations, and the output layer produces predictions. Deep learning refers to neural networks with many hidden layers. These are powerful for complex tasks like image recognition, natural language processing, and game playing.',
        },
        expectedOutcome: 'Capacity reaching 60-70%',
        autoAdvanceDelay: 1000,
      },
      {
        id: 'step-8',
        instruction: 'The conversation continues...',
        action: 'explain',
        payload: {
          explanation:
            'As we keep adding messages, watch how the token count steadily increases. Eventually, the oldest messages will need to be removed.',
        },
        expectedOutcome: 'User watches capacity grow',
        autoAdvanceDelay: 0,
      },
    ],
  },
];

/**
 * Get scenario by ID
 */
export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}

/**
 * Get scenarios by difficulty
 */
export function getScenariosByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Scenario[] {
  return SCENARIOS.filter((scenario) => scenario.difficulty === difficulty);
}
