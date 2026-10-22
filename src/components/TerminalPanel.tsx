import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Command, CornerDownLeft, Sparkles, Trash } from 'lucide-react';
import type { TerminalLogEntry } from '../types/portfolio';
import { COMMANDS } from '../commands/commandRegistry';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface TerminalPanelProps {
  logs: TerminalLogEntry[];
  onExecuteCommand: (rawInput: string) => void;
  onClear: () => void;
  onOpenCommandPalette: () => void;
  isExecuting: boolean;
}

const QUICK_COMMANDS = ['whoami', 'neofetch', 'experience', 'certs', 'skills', 'theme', 'help'];

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  logs,
  onExecuteCommand,
  onClear,
  onOpenCommandPalette,
  isExecuting
}) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return [];
    return COMMANDS.filter(
      (command) =>
        command.name.toLowerCase().startsWith(trimmed) ||
        command.aliases?.some((alias) => alias.toLowerCase().startsWith(trimmed))
    )
      .map((command) => command.name)
      .slice(0, 5);
  }, [inputVal]);

  useEffect(() => {
    const node = outputRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [logs]);

  useEffect(() => {
    if (window.matchMedia('(hover: hover) and (min-width: 761px)').matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const submit = (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    const command = inputVal.trim();
    if (!command || isExecuting) return;

    sound.playEnterBeep();
    setCommandHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);
    setInputVal('');
    onExecuteCommand(command);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyClick();

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) return;
      const next = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInputVal(commandHistory[next]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(next);
        setInputVal(commandHistory[next]);
      }
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (suggestions.length) {
        setInputVal(suggestions[0]);
      }
    } else if (event.key === 'l' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      onClear();
    }
  };

  const renderOutputLine = (line: string, index: number) => {
    if (line.startsWith('[ OK ]')) {
      return (
        <div key={index} className="term__line term__line--ok">
          <span className="term__tag">[ OK ]</span>
          <span>{line.replace('[ OK ] ', '')}</span>
        </div>
      );
    }

    if (line.startsWith('[ .. ]') || line.startsWith('Notice:') || line.includes('WARNING')) {
      return (
        <div key={index} className="term__line term__line--warn">
          {line}
        </div>
      );
    }

    if (line.startsWith('az-secure: command not found')) {
      return (
        <div key={index} className="term__line term__line--error">
          {line}
        </div>
      );
    }

    if (/^[═─=]{3,}/.test(line.trim())) {
      return (
        <div key={index} className="term__line term__line--rule">
          {line}
        </div>
      );
    }

    if (line.startsWith('•')) {
      return (
        <div key={index} className="term__line term__line--bullet">
          {line}
        </div>
      );
    }

    // Perfectly aligned neofetch ascii + spec rows
    if (
      line.length >= 24 &&
      (line.includes('▄') || line.includes('▀') || line.includes('█') || line.startsWith('                        '))
    ) {
      const art = line.slice(0, 24);
      const text = line.slice(24);
      return (
        <div key={index} className="term__line term__line--art-row">
          <span className="term__art-col">{art}</span>
          <span className="term__text-col">{text}</span>
        </div>
      );
    }

    return (
      <div key={index} className="term__line">
        {line || '\u00A0'}
      </div>
    );
  };

  return (
    <div className="term">
      <div className="term__toolbar">
        <span className="term__toolbar-title">
          <span className="live-dot" /> asif@az-secure
          <span className="term__toolbar-dim">/bin/bash 5.2.26</span>
        </span>
        {isExecuting && <span className="term__running">RUNNING</span>}
        <span className="term__toolbar-hint">
          <span className="kbd">Tab</span> complete
        </span>
        <div className="term__tools">
          <button
            type="button"
            className="term__tool"
            onClick={onOpenCommandPalette}
            title="Open command palette (Ctrl+K)"
          >
            <Command size={12} />
            <span className="desktop-only">Palette</span>
          </button>
          <button type="button" className="term__tool" onClick={onClear} title="Clear terminal (Ctrl+L)">
            <Trash size={12} />
            <span className="desktop-only">Clear</span>
          </button>
        </div>
      </div>

      <div className="term__quick">
        {QUICK_COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            className="term__chip"
            disabled={isExecuting}
            onClick={() => {
              sound.playEnterBeep();
              onExecuteCommand(command);
            }}
          >
            ${command}
          </button>
        ))}
        <button
          type="button"
          className="term__chip term__chip--accent"
          onClick={onOpenCommandPalette}
        >
          <Sparkles size={9} /> all commands
        </button>
      </div>

      <div
        className="term__output"
        ref={outputRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <div className="term__welcome">
          <div className="term__welcome-top">
            <span className="term__badge">AZ-SECURE</span>
            <span className="term__welcome-dim">Linux 6.11.4-az-hardened · x86_64</span>
          </div>
          <p className="term__welcome-name">
            {PERSONAL_INFO.name} <span>— {PERSONAL_INFO.role}</span>
          </p>
          <p className="term__welcome-dim">
            {PERSONAL_INFO.location} · Tata Consultancy Services · CPTS · CPENT · AWS SAA
          </p>
          <p className="term__welcome-hint">
            Type <b>help</b> for the command reference. <span className="kbd">Ctrl K</span> opens the
            palette, <span className="kbd">Ctrl `</span> toggles this console.
          </p>
        </div>

        {logs.map((log, logIndex) => (
          <div className="term__entry" key={log.id}>
            {log.command && (
              <div className="term__cmdline">
                <span className="term__prompt">asif@az-secure:~$</span>
                <span className="term__cmd">{log.command}</span>
              </div>
            )}
            {log.output &&
              (Array.isArray(log.output)
                ? log.output.map((line, index) => renderOutputLine(line, index))
                : renderOutputLine(log.output, 0))}
            {isExecuting && logIndex === logs.length - 1 && (
              <div className="term__line">
                <span className="console__cursor" />
              </div>
            )}
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="term__suggest">
          <span className="term__suggest-label">Suggestions</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="term__suggest-item"
              onClick={() => {
                setInputVal(suggestion);
                inputRef.current?.focus({ preventScroll: true });
              }}
            >
              {suggestion}
            </button>
          ))}
          <span className="term__suggest-hint">Tab to complete</span>
        </div>
      )}

      <form className="term__form" onSubmit={submit}>
        <span className="term__prompt">asif@az-secure:~$</span>
        <input
          ref={inputRef}
          className="term__input"
          type="text"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command — help, whoami…"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command input"
        />
        <button type="submit" className="btn btn--primary term__run" disabled={isExecuting}>
          Run <CornerDownLeft size={12} />
        </button>
      </form>

      <div className="term__status">
        <span>bash 5.2.26 · UTF-8 · secure channel</span>
        <span>
          {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>
    </div>
  );
};
