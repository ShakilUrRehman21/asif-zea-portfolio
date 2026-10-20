import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KeyRound, Lock, User, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('asif');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStepMessage, setAuthStepMessage] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAuthenticating) return;

    sound.playEnterBeep();
    setIsAuthenticating(true);
    setAuthStepMessage('Verifying credentials against local shadow database...');

    setTimeout(() => {
      sound.playKeyClick();
      setAuthStepMessage(`[ OK ] PAM: session opened for user ${username} (uid=1000)`);
      setTimeout(() => {
        sound.playChirp();
        onLoginSuccess();
      }, 500);
    }, 450);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 11, 10, 0.72)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 100000
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 'min(440px, 94vw)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-green-dim)',
          borderRadius: '10px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(163, 255, 111, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em' }}>
              AZ-SECURE WORKSTATION
            </span>
          </div>
          <span className="badge-status" style={{ fontSize: '9px' }}>
            READY
          </span>
        </div>

        {/* Content */}
        <form onSubmit={handleLogin} style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              TARGET HOST: az-secure.internal (6.11.4-hardened)
            </div>
            <div style={{ fontSize: '13px', color: 'var(--accent-green)', fontWeight: 600 }}>
              {PERSONAL_INFO.name} // Security Workstation
            </div>
          </div>

          {/* Username Field */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <User size={13} /> Username
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '8px 12px'
              }}
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isAuthenticating}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--accent-green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <KeyRound size={13} /> Authentication Key
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '8px 12px'
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Press Enter or type anything..."
                autoFocus
                disabled={isAuthenticating}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          {/* Demo Notice */}
          <div
            style={{
              padding: '8px 12px',
              background: 'rgba(229, 181, 103, 0.08)',
              border: '1px solid var(--border-amber-dim)',
              borderRadius: '4px',
              fontSize: '11px',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lock size={12} />
            <span>Click Authenticate or press Enter to unlock.</span>
          </div>

          {/* Feedback message */}
          {authStepMessage && (
            <div
              style={{
                fontSize: '11px',
                color: authStepMessage.startsWith('[ OK ]') ? 'var(--accent-green)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {authStepMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="btn-terminal btn-terminal-primary"
            style={{ width: '100%', padding: '10px', fontSize: '13px', marginTop: '4px' }}
          >
            {isAuthenticating ? (
              <span>Authenticating...</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Authenticate & Enter Workstation <ArrowRight size={14} />
              </span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
