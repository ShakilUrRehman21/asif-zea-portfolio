import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Briefcase,
  CornerDownLeft,
  Cpu,
  Search,
  Shield,
  Terminal,
  X
} from 'lucide-react';
import { COMMANDS } from '../commands/commandRegistry';
import type { CommandCategory, CommandDefinition } from '../types/portfolio';
import { sound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (command: CommandDefinition) => void;
}

const CATEGORY_ORDER: CommandCategory[] = ['IDENTITY', 'PROFESSIONAL', 'SECURITY LAB', 'SYSTEM'];

const CATEGORY_ICON: Record<CommandCategory, React.ReactNode> = {
  IDENTITY: <Shield size={13} />,
  PROFESSIONAL: <Briefcase size={13} />,
  'SECURITY LAB': <Terminal size={13} />,
  SYSTEM: <Cpu size={13} />
};

const highlight = (text: string, query: string): React.ReactNode => {
  const value = query.trim();
  if (!value) return text;
  const index = text.toLowerCase().indexOf(value.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="palette__mark">{text.slice(index, index + value.length)}</mark>
      {text.slice(index + value.length)}
    </>
  );
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectCommand
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim();
    const matches = COMMANDS.filter((command) => {
      if (!search) return true;
      return (
        command.name.toLowerCase().includes(search) ||
        command.description.toLowerCase().includes(search) ||
        command.category.toLowerCase().includes(search) ||
        command.aliases?.some((alias) => alias.toLowerCase().includes(search))
      );
    });

    return [...matches].sort(
      (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: { category: CommandCategory; commands: CommandDefinition[] }[] = [];
    for (const command of filtered) {
      const last = groups[groups.length - 1];
      if (last && last.category === command.category) {
        last.commands.push(command);
      } else {
        groups.push({ category: command.category, commands: [command] });
      }
    }
    return groups;
  }, [filtered]);

  const indexOf = (command: CommandDefinition) => filtered.findIndex((item) => item.name === command.name);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setSelectedIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>('[data-selected="true"]');
    node?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      sound.playKeyClick();
      setSelectedIndex((current) => (current + 1) % (filtered.length || 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      sound.playKeyClick();
      setSelectedIndex(
        (current) => (current - 1 + (filtered.length || 1)) % (filtered.length || 1)
      );
    } else if (event.key === 'Home') {
      event.preventDefault();
      setSelectedIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setSelectedIndex(Math.max(0, filtered.length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const command = filtered[selectedIndex];
      if (command) {
        sound.playEnterBeep();
        onSelectCommand(command);
        onClose();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="palette"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            <div className="palette__search">
              <Search size={16} />
              <input
                ref={inputRef}
                className="palette__input"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search commands — certs, labs, whoami…"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close palette">
                <X size={14} />
              </button>
            </div>

            <div className="palette__list" ref={listRef}>
              {filtered.length === 0 ? (
                <div className="palette__empty">
                  No commands match “{query}”.
                  <br />
                  Try <span style={{ color: 'var(--acid)' }}>help</span>,{' '}
                  <span style={{ color: 'var(--acid)' }}>labs</span> or{' '}
                  <span style={{ color: 'var(--acid)' }}>whoami</span>.
                </div>
              ) : (
                grouped.map((group) => (
                  <div key={group.category}>
                    <div className="palette__group-label">{group.category}</div>
                    {group.commands.map((command) => {
                      const index = indexOf(command);
                      const selected = index === selectedIndex;
                      return (
                        <button
                          key={command.name}
                          type="button"
                          className="palette__item"
                          data-selected={selected}
                          onMouseEnter={() => setSelectedIndex(index)}
                          onClick={() => {
                            sound.playEnterBeep();
                            onSelectCommand(command);
                            onClose();
                          }}
                          data-command={command.name}
                        >
                          <span className="palette__item-icon">{CATEGORY_ICON[command.category]}</span>
                          <span className="palette__item-main">
                            <span className="palette__item-name">
                              {highlight(command.name, query)}
                              {command.aliases ? (
                                <span className="palette__item-alias">{command.aliases[0]}</span>
                              ) : null}
                            </span>
                            <span className="palette__item-desc">{command.description}</span>
                          </span>
                          <span className="palette__item-meta">
                            {command.shortcut ? (
                              <span className="kbd">Alt {command.shortcut}</span>
                            ) : null}
                            <CornerDownLeft size={12} className="palette__item-enter" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="palette__foot">
              <span className="palette__hints">
                <span className="palette__hint">
                  <span className="kbd">↑</span>
                  <span className="kbd">↓</span> navigate
                </span>
                <span className="palette__hint">
                  <span className="kbd">↵</span> run
                </span>
                <span className="palette__hint">
                  <span className="kbd">esc</span> close
                </span>
              </span>
              <span>{filtered.length} commands</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
