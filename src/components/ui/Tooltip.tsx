'use client';

import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  children,
  content,
  position = 'top',
}: TooltipProps) {
  return (
    <div className={`tooltip tooltip-${position}`} data-tip={content}>
      {children}
    </div>
  );
}
