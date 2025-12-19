'use client';

import { motion } from 'framer-motion';
import { getCapacityStatus, formatTokenCount } from '@/lib/tokenCalculator';

interface ProgressBarProps {
  current: number;
  max: number;
  showLabel?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  current,
  max,
  showLabel = true,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const status = getCapacityStatus(percentage);

  console.log('ProgressBar:', { current, max, percentage, color: status.color });

  return (
    <div className="progress-bar">
      {showLabel && (
        <div className="progress-bar__label">
          <span className="text-sm font-semibold">
            {formatTokenCount(current)} / {formatTokenCount(max)} tokens
          </span>
          <span className={`badge badge-${status.color} badge-sm`}>
            {Math.floor(percentage)}%
          </span>
        </div>
      )}

      <progress
        className={`progress w-full ${
          status.color === 'success' ? 'progress-success' :
          status.color === 'warning' ? 'progress-warning' :
          'progress-error'
        }`}
        value={percentage}
        max="100"
      ></progress>

      {status.showWarning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`alert alert-${status.color} mt-3 text-sm`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{status.message}</span>
        </motion.div>
      )}
    </div>
  );
}
