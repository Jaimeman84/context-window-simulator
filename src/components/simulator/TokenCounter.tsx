'use client';

import { TokenBreakdown } from '@/types';
import { formatTokenCount } from '@/lib/tokenCalculator';
import { Tooltip } from '@/components/ui/Tooltip';

interface TokenCounterProps {
  breakdown: TokenBreakdown;
  showBreakdown?: boolean;
}

export function TokenCounter({
  breakdown,
  showBreakdown = true,
}: TokenCounterProps) {
  return (
    <div className="bg-base-200 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-sm flex items-center gap-2">
        Token Breakdown
        <Tooltip content="Tokens are units of text that AI models process. Roughly 1 token = 4 characters.">
          <button className="btn btn-circle btn-ghost btn-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </Tooltip>
      </h3>

      {showBreakdown && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-base-content/70 flex items-center gap-2">
              <span className="text-lg">🔧</span>
              System Prompt
            </span>
            <span className="font-mono font-semibold">
              {formatTokenCount(breakdown.systemPrompt)}
            </span>
          </div>

          {breakdown.userMessages > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-base-content/70 flex items-center gap-2">
                <span className="text-lg">👤</span>
                User Messages
              </span>
              <span className="font-mono font-semibold">
                {formatTokenCount(breakdown.userMessages)}
              </span>
            </div>
          )}

          {breakdown.assistantMessages > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-base-content/70 flex items-center gap-2">
                <span className="text-lg">🤖</span>
                Assistant Messages
              </span>
              <span className="font-mono font-semibold">
                {formatTokenCount(breakdown.assistantMessages)}
              </span>
            </div>
          )}

          {breakdown.toolMessages > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-base-content/70 flex items-center gap-2">
                <span className="text-lg">🛠️</span>
                Tool Outputs
              </span>
              <span className="font-mono font-semibold">
                {formatTokenCount(breakdown.toolMessages)}
              </span>
            </div>
          )}

          <div className="divider my-1"></div>

          <div className="flex justify-between items-center font-semibold">
            <span>Total Used</span>
            <span className="font-mono text-primary">
              {formatTokenCount(breakdown.total)}
            </span>
          </div>

          <div className="flex justify-between items-center text-success">
            <span>Remaining</span>
            <span className="font-mono font-semibold">
              {formatTokenCount(breakdown.remaining)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
