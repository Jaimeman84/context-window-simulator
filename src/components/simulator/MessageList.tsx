'use client';

import { useEffect, useRef } from 'react';
import { Message, SystemPrompt } from '@/types';
import { MessageCard } from './MessageCard';
import { formatTokenCount } from '@/lib/tokenCalculator';

interface MessageListProps {
  messages: Message[];
  systemPrompt: SystemPrompt;
  onRemove?: (id: string) => void;
  showControls?: boolean;
}

export function MessageList({
  messages,
  systemPrompt,
  onRemove,
  showControls = false,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages.length]);

  return (
    <div ref={containerRef} className="context-window__messages">
      {/* System Prompt */}
      <div className="message-card mb-3 bg-neutral/10">
        <div className="message-card__header">
          <span className="text-xl">🔧</span>
          <span className="text-neutral font-semibold">System</span>
          <span className="ml-auto text-xs opacity-60 font-mono">
            {formatTokenCount(systemPrompt.tokenCount)} tokens
          </span>
        </div>
        <div className="message-card__content text-sm opacity-80">
          {systemPrompt.content}
        </div>
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <div className="text-center py-8 text-base-content/50">
          <p className="text-sm">No messages yet</p>
          <p className="text-xs mt-1">Add a message to get started</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onRemove={onRemove}
            showControls={showControls}
          />
        ))
      )}

      {/* Invisible element at the end for auto-scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
}
