'use client';

import { useState } from 'react';
import { MessageRole } from '@/types';
import { estimateTokensRealtime } from '@/lib/tokenCalculator';

interface AddMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (role: MessageRole, content: string) => void;
}

export function AddMessageModal({
  isOpen,
  onClose,
  onAdd,
}: AddMessageModalProps) {
  const [role, setRole] = useState<MessageRole>('user');
  const [content, setContent] = useState('');

  const estimate = estimateTokensRealtime(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(role, content);
      setContent('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Add Message</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Message Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value as MessageRole)}
            >
              <option value="user">👤 User</option>
              <option value="assistant">🤖 Assistant</option>
              <option value="tool">🛠️ Tool Output</option>
            </select>
          </div>

          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32"
              placeholder="Type your message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Token Estimate */}
          {content && (
            <div className="bg-base-200 p-3 rounded-lg">
              <p className="text-sm font-semibold mb-2">Estimated Tokens:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="opacity-60">Tokens</p>
                  <p className="font-mono font-bold">{estimate.tokens}</p>
                </div>
                <div>
                  <p className="opacity-60">Characters</p>
                  <p className="font-mono">{estimate.characters}</p>
                </div>
                <div>
                  <p className="opacity-60">Words</p>
                  <p className="font-mono">{estimate.words}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!content.trim()}
            >
              Add Message
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
