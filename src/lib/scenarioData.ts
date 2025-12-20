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
            'Neural networks are inspired by the human brain. They consist of layers of interconnected nodes (neurons). Each connection has a weight that gets adjusted during training. Data flows through the network: input layer receives data, hidden layers process it through mathematical transformations, and the output layer produces predictions. Deep learning refers to neural networks with many hidden layers. These are powerful for complex tasks like image recognition, natural language processing, and game playing.\n\nLet me provide a comprehensive explanation of how neural networks actually work:\n\n**Architecture and Structure**\n\nA neural network is organized into distinct layers. The input layer receives raw data - this could be pixel values from an image, word embeddings from text, or numerical features from a dataset. Each neuron in this layer represents one feature of your input data.\n\nBetween the input and output layers are hidden layers where the actual "learning" happens. Modern deep learning networks can have dozens or even hundreds of these hidden layers. Each layer transforms the data in increasingly abstract ways. For image recognition, early layers might detect edges and simple shapes, middle layers might recognize parts like eyes or wheels, and deeper layers might identify complete objects like faces or cars.\n\nThe output layer produces the final prediction. For classification tasks, each neuron might represent the probability of a different class. For regression tasks, the output might be a single continuous value.\n\n**The Mathematics Behind Neural Networks**\n\nEach neuron performs a simple mathematical operation. It takes all its inputs, multiplies each by a weight (a number that represents the connection strength), adds them together, adds a bias term, and then applies an activation function.\n\nThe activation function is crucial - it introduces non-linearity into the network. Without activation functions, no matter how many layers you stack, the network would only be able to learn linear relationships. Common activation functions include:\n\n- ReLU (Rectified Linear Unit): outputs the input if positive, otherwise zero. Simple and effective.\n- Sigmoid: squashes values between 0 and 1. Useful for probabilities.\n- Tanh: squashes values between -1 and 1. Centered around zero.\n- Softmax: used in the output layer for multi-class classification, converts scores into probabilities that sum to 1.\n\n**Training Process: Backpropagation**\n\nTraining a neural network involves showing it many examples and adjusting the weights to minimize prediction errors. This happens through an algorithm called backpropagation:\n\n1. **Forward Pass**: Input data flows through the network, layer by layer, producing a prediction.\n\n2. **Loss Calculation**: We compare the prediction to the actual correct answer using a loss function. Common loss functions include mean squared error for regression and cross-entropy for classification.\n\n3. **Backward Pass**: This is where the magic happens. The algorithm calculates how much each weight contributed to the error by computing gradients using the chain rule from calculus. These gradients tell us which direction to adjust each weight to reduce the error.\n\n4. **Weight Update**: We update all weights by moving them in the direction that reduces the loss. The learning rate controls how big these steps are - too large and the network might overshoot the optimal solution, too small and training takes forever.\n\n5. **Iteration**: We repeat this process thousands or millions of times with different batches of training data until the network\'s predictions become accurate.\n\n**Optimization Techniques**\n\nModern neural networks use sophisticated optimization algorithms beyond simple gradient descent:\n\n- **Stochastic Gradient Descent (SGD)**: Updates weights using small batches of data rather than the entire dataset, making training much faster.\n\n- **Momentum**: Helps the optimizer move faster through flat regions and escape local minima by accumulating a velocity vector in directions of persistent gradient.\n\n- **Adam**: Combines momentum with adaptive learning rates for each parameter. Currently one of the most popular optimizers.\n\n- **Learning Rate Scheduling**: Starts with a larger learning rate and gradually decreases it, allowing the network to make big improvements early and fine-tune later.\n\n**Regularization: Preventing Overfitting**\n\nA major challenge in machine learning is overfitting - when a model memorizes the training data instead of learning generalizable patterns. Several techniques combat this:\n\n- **Dropout**: Randomly "turns off" a percentage of neurons during each training step, forcing the network to learn redundant representations that are more robust.\n\n- **L1/L2 Regularization**: Adds a penalty term to the loss function based on the magnitude of weights, encouraging the network to keep weights small and avoid over-relying on any single feature.\n\n- **Batch Normalization**: Normalizes the inputs to each layer, which stabilizes training and allows for higher learning rates. Also provides some regularization effect.\n\n- **Early Stopping**: Monitors performance on a validation set during training and stops when performance stops improving, preventing the model from over-optimizing on training data.\n\n- **Data Augmentation**: For images, this might include random rotations, crops, or color adjustments. For text, it might include synonym replacement or back-translation. This artificially expands the training dataset.\n\n**Different Types of Neural Networks**\n\nWhile the basic architecture I\'ve described applies broadly, several specialized architectures excel at specific tasks:\n\n- **Convolutional Neural Networks (CNNs)**: Designed for image processing. They use convolutional layers that slide filters across the image, detecting local patterns while being translation-invariant. Each filter learns to recognize a specific feature like an edge, texture, or pattern.\n\n- **Recurrent Neural Networks (RNNs)**: Process sequential data like text or time series. They maintain hidden states that carry information from previous steps, allowing them to recognize patterns across time. However, they struggle with very long sequences due to vanishing gradients.\n\n- **Long Short-Term Memory (LSTM)**: A special type of RNN with gating mechanisms that help maintain information over longer sequences. They can learn what information to remember, forget, and output at each step.\n\n- **Transformers**: The architecture behind modern language models like GPT and BERT. They use self-attention mechanisms to weigh the importance of different parts of the input when processing each element, allowing them to capture long-range dependencies much better than RNNs.\n\n- **Generative Adversarial Networks (GANs)**: Consist of two networks - a generator that creates fake data and a discriminator that tries to distinguish real from fake. They compete in a game where the generator gets better at fooling the discriminator, producing remarkably realistic images, videos, and audio.\n\n**Practical Considerations**\n\nWhen implementing neural networks in real applications, several practical factors matter:\n\n- **Hardware Requirements**: Training deep networks requires significant computational power. GPUs are essential for practical training times because they can perform thousands of mathematical operations in parallel. Modern frameworks like PyTorch and TensorFlow handle the GPU acceleration automatically.\n\n- **Dataset Size**: Neural networks are data-hungry. While traditional machine learning might work with hundreds of examples, deep learning typically needs thousands to millions of examples to reach peak performance. Transfer learning helps mitigate this by starting with a pre-trained model.\n\n- **Hyperparameter Tuning**: Choosing the right architecture (number of layers, neurons per layer), learning rate, batch size, and other hyperparameters significantly impacts performance. This often requires experimentation and can be automated with techniques like grid search, random search, or Bayesian optimization.\n\n- **Interpretability**: Neural networks are often criticized as "black boxes" because it\'s difficult to understand why they make specific predictions. Techniques like attention visualization, saliency maps, and LIME help provide some interpretability, but this remains an active research area.\n\nThe power of neural networks comes from their ability to automatically learn hierarchical representations of data. Instead of manually engineering features, we let the network discover the most useful representations through training. This has led to breakthrough performance in computer vision, natural language processing, speech recognition, game playing, and many other domains.',
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
