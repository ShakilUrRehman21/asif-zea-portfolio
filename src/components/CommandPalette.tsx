import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CornerDownLeft, X } from 'lucide-react';
import { COMMANDS } from '../commands/commandRegistry';
import type { CommandDefinition, CommandCategory } from '../types/portfolio';
import { sound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (cmd: CommandDefinition) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectCommand
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands based on query
  const filteredCommands = COMMANDS.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.name.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.aliases?.some((a) => a.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playKeyClick();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playKeyClick();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        sound.playEnterBeep();
        onSelectCommand(filteredCommands[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const getCategoryColor = (category: CommandCategory) => {
    switch (category) {
      case 'IDENTITY': return 'var(--accent-green)';
      case 'PROFESSIONAL': return 'var(--accent-amber)';
      case 'SECURITY LAB': return 'var(--accent-blue)';
      case 'SYSTEM': return 'var(--text-muted)';
      default: return 'var(--accent-green)';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 'min(6vh, 48px) 8px 16px 8px',
          zIndex: 99999
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(640px, 96vw)',
            maxHeight: '80vh',
            background: 'var(--bg-surface)',
            border: '1px solid var(--accent-green)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-dropdown)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Search Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-elevated)'
            }}
          >
            <Search size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search command (e.g. certs, skills, whoami)..."
              style={{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px'
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="win-ctrl-btn"
                title="Clear Search"
              >
                <X size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              className="win-ctrl-btn close"
              title="Close Palette (Esc)"
              aria-label="Close Command Palette"
            >
              <X size={14} />
            </button>
          </div>

          {/* Results List */}
          <div
            ref={listRef}
            style={{
              maxHeight: '360px',
              overflowY: 'auto',
              padding: '8px'
            }}
          >
            {filteredCommands.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                No commands matching &apos;{query}&apos;. Try &apos;help&apos; or &apos;whoami&apos;.
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={cmd.name}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      sound.playEnterBeep();
                      onSelectCommand(cmd);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      background: isSelected ? 'rgba(163, 255, 111, 0.1)' : 'transparent',
                      border: isSelected ? '1px solid var(--border-green-dim)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        className="hide-mobile"
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          border: `1px solid ${getCategoryColor(cmd.category)}`,
                          color: getCategoryColor(cmd.category),
                          background: 'rgba(0, 0, 0, 0.3)',
                          minWidth: '95px',
                          textAlign: 'center'
                        }}
                      >
                        {cmd.category}
                      </span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: isSelected ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                            {cmd.name}
                          </span>
                          {cmd.aliases && (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              ({cmd.aliases.join(', ')})
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }} className="font-sans">
                          {cmd.description}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cmd.shortcut && (
                        <kbd
                          style={{
                            fontSize: '10px',
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '3px',
                            padding: '2px 6px',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          Alt+{cmd.shortcut}
                        </kbd>
                      )}
                      {isSelected && (
                        <CornerDownLeft size={13} style={{ color: 'var(--accent-green)' }} />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span>↑↓ Navigate · Enter Run · Esc Close</span>
            <span>Type to filter</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
