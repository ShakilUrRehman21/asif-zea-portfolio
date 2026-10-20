import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, VolumeX, Power, Search } from 'lucide-react';
import { sound } from '../utils/audio';

interface SystemBarProps {
  onOpenCommandPalette: () => void;
  onLockWorkstation: () => void;
}

export const SystemBar: React.FC<SystemBarProps> = ({
  onOpenCommandPalette,
  onLockWorkstation
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString([], { month: 'short', day: 'numeric', weekday: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--topbar-height)',
        padding: '0 14px',
        background: 'rgba(12, 16, 13, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9900,
        userSelect: 'none'
      }}
    >
      {/* Left: Branding & Host Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span 
            style={{ 
              color: 'var(--accent-green)', 
              fontWeight: 800, 
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em'
            }}
          >
            AZ//SEC
          </span>
          <span className="hide-mobile" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>|</span>
          <span className="hide-mobile" style={{ color: 'var(--text-primary)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            asif@az-secure
          </span>
        </div>
      </div>

      {/* Center: Command Palette Trigger Button */}
      <button
        onClick={() => {
          sound.playWindowAction();
          onOpenCommandPalette();
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          borderRadius: '4px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-green)';
          e.currentTarget.style.color = 'var(--accent-green)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
        title="Open Command Palette (Ctrl+K)"
        aria-label="Open Command Palette"
      >
        <Search size={12} style={{ color: 'var(--accent-green)' }} />
        <span className="hide-mobile">Command Palette</span>
        <kbd 
          className="hide-mobile"
          style={{ 
            fontSize: '9px', 
            background: 'rgba(0, 0, 0, 0.4)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '3px', 
            padding: '1px 5px',
            color: 'var(--text-muted)'
          }}
        >
          Ctrl+K
        </kbd>
      </button>

      {/* Right: VPN Status, Audio, Clock & Lock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Network & VPN simulated status */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            color: 'var(--text-secondary)', 
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}
          title="Virtual Private Network: Active Secure Tunnel (tun0 10.10.14.88)"
        >
          <Wifi size={12} style={{ color: 'var(--accent-green)' }} />
          <span className="hide-mobile" style={{ display: 'inline' }}>tun0 10.10.14.88</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleAudio}
          className="win-ctrl-btn"
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX size={14} style={{ color: 'var(--text-muted)' }} /> : <Volume2 size={14} style={{ color: 'var(--accent-green)' }} />}
        </button>

        {/* Clock & Date */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'var(--text-primary)', 
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span className="hide-mobile">{dateStr}</span>
          <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{timeStr}</span>
        </div>

        {/* Workstation Lock */}
        <button
          onClick={() => {
            sound.playWindowAction();
            onLockWorkstation();
          }}
          className="win-ctrl-btn close"
          title="Lock Workstation (exit)"
          aria-label="Lock Workstation"
        >
          <Power size={13} />
        </button>
      </div>
    </header>
  );
};
