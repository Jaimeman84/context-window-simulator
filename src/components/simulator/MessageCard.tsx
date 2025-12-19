'use client';

import { motion } from 'framer-motion';
import { Message, MESSAGE_ROLE_CONFIGS } from '@/types';
import { formatTokenCount } from '@/lib/tokenCalculator';

interface MessageCardProps {
  message: Message;
  onRemove?: (id: string) => void;
  showControls?: boolean;
}

export function MessageCard({
  message,
  onRemove,
  showControls = false,
}: MessageCardProps) {
  const config = MESSAGE_ROLE_CONFIGS[message.role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: message.isVisible ? 1 : 0.4,
        y: 0,
      }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`message-card ${!message.isVisible ? 'message-card--hidden' : ''}`}
    >
      <div className="message-card__header">
        <span className="text-xl">{config.icon}</span>
        <span className={`text-${config.color} font-semibold`}>
          {config.label}
        </span>
        <span className="ml-auto text-xs opacity-60 font-mono">
          {formatTokenCount(message.tokenCount)} tokens
        </span>
        {showControls && message.isVisible && onRemove && (
          <button
            onClick={() => onRemove(message.id)}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Remove message"
          >
            ×
          </button>
        )}
      </div>

      <div className="message-card__content">{message.content}</div>

      {!message.isVisible && (
        <div className="mt-3 flex items-center gap-2 text-xs text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold">Removed (overflow)</span>
        </div>
      )}
    </motion.div>
  );
}
