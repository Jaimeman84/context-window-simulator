'use client';

import { SimulatorState } from '@/types';
import { ProgressBar } from './ProgressBar';
import { MessageList } from './MessageList';
import { TokenCounter } from './TokenCounter';
import { getTokenBreakdown } from '@/lib/tokenCalculator';

interface ContextWindowProps {
  state: SimulatorState;
  onMessageRemove?: (messageId: string) => void;
  showControls?: boolean;
  title?: string;
}

export function ContextWindow({
  state,
  onMessageRemove,
  showControls = false,
  title = 'Context Window',
}: ContextWindowProps) {
  const breakdown = getTokenBreakdown(
    state.systemPrompt,
    state.messages,
    state.modelConfig.contextWindow
  );

  return (
    <div className="context-window space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="badge badge-primary badge-lg">
          {state.modelConfig.name}
        </div>
      </div>

      {/* Capacity Progress Bar */}
      <ProgressBar
        current={state.totalTokens}
        max={state.modelConfig.contextWindow}
        showLabel={true}
        animated={true}
      />

      {/* Token Breakdown */}
      <TokenCounter breakdown={breakdown} showBreakdown={true} />

      {/* Messages */}
      <div>
        <h3 className="font-semibold mb-3">Messages</h3>
        <MessageList
          messages={state.messages}
          systemPrompt={state.systemPrompt}
          onRemove={onMessageRemove}
          showControls={showControls}
        />
      </div>
    </div>
  );
}
