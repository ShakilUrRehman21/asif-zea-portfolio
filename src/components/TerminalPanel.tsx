import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Trash2, HelpCircle, ChevronDown, Minus } from 'lucide-react';
import type { TerminalLogEntry } from '../types/portfolio';
import { COMMANDS } from '../commands/commandRegistry';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface TerminalPanelProps {
  onExecuteCommand: (rawInput: string) => void;
  logs: TerminalLogEntry[];
  onClear: () => void;
  onOpenCommandPalette: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
  isExecuting?: boolean;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  onExecuteCommand,
  logs,
  onClear,
  onOpenCommandPalette,
  isMinimized,
  onMinimize,
  isExecuting: isExternalExecuting = false
}) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isBusy = isExternalExecuting;

  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll output to bottom
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Always keep input focused when terminal is clicked
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Autocomplete suggestions on typing
  useEffect(() => {
    const trimmed = inputVal.trim().toLowerCase();
    if (trimmed.length > 0) {
      const matches = COMMANDS.filter(cmd => 
        cmd.name.toLowerCase().startsWith(trimmed) || 
        cmd.aliases?.some(a => a.toLowerCase().startsWith(trimmed))
      ).map(c => c.name);
      setSuggestions(matches.slice(0, 4));
    } else {
      setSuggestions([]);
    }
  }, [inputVal]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd || isBusy) return;

    sound.playEnterBeep();
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');
    setSuggestions([]);

    onExecuteCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyClick();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInputVal(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div
      onClick={handleContainerClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-green-dim)',
        borderRadius: '8px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
        overflow: 'hidden'
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          height: '36px',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} style={{ color: 'var(--accent-green)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span className="hide-mobile">asif@az-secure:~ (bash)</span>
            <span className="show-mobile">bash:~$</span>
          </span>
          {isBusy && (
            <span style={{ fontSize: '10px', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
              [RUNNING]
            </span>
          )}
        </div>

        {/* Quick Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Command Selector Dropdown Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'rgba(163, 255, 111, 0.08)',
                border: '1px solid var(--border-green-dim)',
                color: 'var(--accent-green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer'
              }}
              title="Quick Command Selector"
            >
              <span>Commands</span>
              <ChevronDown size={12} />
            </button>

            {/* Quick dropdown menu */}
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  width: 'min(240px, calc(100vw - 32px))',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--accent-green)',
                  borderRadius: '6px',
                  boxShadow: 'var(--shadow-dropdown)',
                  zIndex: 1000,
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {COMMANDS.slice(0, 10).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setInputVal(c.name);
                      setIsDropdownOpen(false);
                      inputRef.current?.focus();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 8px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--accent-green-dim)';
                      e.currentTarget.style.color = 'var(--accent-green)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{c.category}</span>
                  </button>
                ))}
                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenCommandPalette();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 8px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-green)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles size={12} />
                  <span>Open Full Palette (Ctrl+K)</span>
                </button>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExecuteCommand('help');
            }}
            className="win-ctrl-btn"
            title="Show Help Table"
          >
            <HelpCircle size={14} />
          </button>

          {/* Clear screen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowAction();
              onClear();
            }}
            className="win-ctrl-btn"
            title="Clear Terminal Output"
          >
            <Trash2 size={13} />
          </button>

          {/* Minimize terminal */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playWindowAction();
              onMinimize();
            }}
            className="win-ctrl-btn"
            title="Minimize Terminal"
          >
            <Minus size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={outputContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12.5px',
          lineHeight: 1.6,
          color: 'var(--text-primary)'
        }}
      >
        {/* Startup Welcome Header */}
        <div style={{ marginBottom: '16px', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '12px' }}>
          <div style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
            AZ-SECURE LINUX WORKSTATION // KERNEL 6.11.4-HARDENED (x86_64)
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
            User: {PERSONAL_INFO.name} — {PERSONAL_INFO.role} ({PERSONAL_INFO.location})
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
            Type <span style={{ color: 'var(--accent-green)' }}>&apos;help&apos;</span> to see all commands, or click any command below:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
            {['whoami', 'experience', 'certs', 'skills', 'labs', 'contact', 'neofetch'].map(cmd => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  onExecuteCommand(cmd);
                }}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-green-dim)',
                  borderRadius: '3px',
                  color: 'var(--accent-green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  padding: '2px 8px',
                  cursor: 'pointer'
                }}
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Log Entries */}
        {logs.map((log, lIdx) => (
          <div key={log.id} style={{ marginBottom: '12px' }}>
            {/* Input line */}
            {log.command && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>asif@az-secure:~$</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{log.command}</span>
              </div>
            )}

            {/* Output lines */}
            {log.output && (
              <div style={{ marginTop: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {Array.isArray(log.output) ? (
                  log.output.map((line, idx) => {
                    const isSuccess = line.startsWith('[ OK ]');
                    const isWarning = line.includes('Notice:') || line.includes('WARNING');
                    const isHeader = line.includes('===') || line.includes('---');
                    
                    let color = 'var(--text-primary)';
                    if (isSuccess) color = 'var(--accent-green)';
                    else if (isWarning) color = 'var(--accent-amber)';
                    else if (isHeader) color = 'var(--text-muted)';

                    return (
                      <div key={idx} style={{ color }}>
                        {line}
                      </div>
                    );
                  })
                ) : (
                  <div>{log.output}</div>
                )}
              </div>
            )}

            {/* Active typing cursor */}
            {isBusy && lIdx === logs.length - 1 && (
              <div style={{ marginTop: '4px' }}>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggestion hints bar if tab completion available */}
      {suggestions.length > 0 && (
        <div
          style={{
            padding: '4px 14px',
            background: 'var(--bg-surface-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Suggestions (Tab to fill):</span>
          {suggestions.map((s) => (
            <span
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                setInputVal(s);
                inputRef.current?.focus();
              }}
              style={{
                color: 'var(--accent-green)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Terminal Input Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 10px',
          background: 'var(--bg-input)',
          borderTop: '1px solid var(--border-green-dim)'
        }}
      >
        <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span className="hide-mobile">asif@az-secure:~$</span>
          <span className="show-mobile">asif:~$</span>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
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
          placeholder="Type command ('help', 'experience')..."
        />
        <button
          type="submit"
          className="btn-terminal btn-terminal-primary"
          style={{ padding: '4px 10px', fontSize: '11px', flexShrink: 0 }}
        >
          Run <CornerDownLeft size={11} />
        </button>
      </form>
    </div>
  );
};
