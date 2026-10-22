import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock, ShieldCheck, Terminal, UserCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const AUTH_LINES = [
  { at: 1, text: '[ OK ] Cryptographic environment verified · PAM uid=1000', tone: 'ok' },
  { at: 2, text: '[ OK ] Hardened Linux kernel 6.11.4 session unlocked', tone: 'ok' },
  { at: 3, text: '[ OK ] Mounting /home/asif workstation workspace...', tone: 'ok' }
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [step, setStep] = useState(0);
  const busyRef = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const timerIds = timers.current;
    return () => {
      timerIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const authenticate = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setIsAuthenticating(true);
    sound.playEnterBeep();

    const push = (delay: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, delay));
    };

    push(50, () => {
      setStep(1);
      sound.playKeyClick();
    });
    push(240, () => {
      setStep(2);
      sound.playKeyClick();
    });
    push(420, () => {
      setStep(3);
      sound.playKeyClick();
    });
    push(680, () => {
      sound.playChirp();
      onLoginSuccess();
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Enter' || event.key === ' ') && !busyRef.current) {
        event.preventDefault();
        authenticate();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login">
      <motion.div
        className="login__card"
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <section className="login__brand">
          <div className="login__mark">
            <span className="login__mark-badge">AZ</span>
            <span className="login__mark-text">
              <b>AZ-SECURE</b>
              <span>secure workstation · node 01</span>
            </span>
          </div>

          <div>
            <h1 className="login__headline">
              Welcome back,
              <br />
              <em>operator.</em>
            </h1>
            <p className="login__brand-lede">
              An interactive offensive security workstation. Explore the profile, engagements,
              labs, credentials and tooling — or drop into the terminal and run real commands.
            </p>

            <div className="login__brand-stats">
              <div className="login__brand-stat">
                <b>03+</b>
                <span>Years in security</span>
              </div>
              <div className="login__brand-stat">
                <b>10+</b>
                <span>Enterprise clients</span>
              </div>
              <div className="login__brand-stat">
                <b>05</b>
                <span>Certifications</span>
              </div>
            </div>
          </div>

          <div className="login__brand-foot">
            <span className="tag tag--acid">HTB CPTS</span>
            <span className="tag tag--acid">CPENT</span>
            <span className="tag tag--acid">AWS SAA</span>
            <span className="tag">CAP</span>
            <span className="tag">CNSP</span>
          </div>
        </section>

        <div className="login__panel">
          <div className="login__eyebrow">
            <span className="eyebrow">
              <span className="dot" /> Access Authorized
            </span>
            <span className="badge">
              <ShieldCheck size={10} /> Clearance L4
            </span>
          </div>

          <div>
            <h2 className="login__title">Launch Workstation</h2>
            <p className="login__lede">
              Pre-authenticated session ready for operator entry. No credentials required.
            </p>
          </div>

          {/* Operator identification profile badge */}
          <div className="login__operator-card">
            <div className="login__operator-avatar">
              <UserCheck size={18} />
            </div>
            <div className="login__operator-meta">
              <div className="login__operator-title">
                <span className="login__operator-name">{PERSONAL_INFO.name}</span>
                <span className="login__operator-badge">uid 1000</span>
              </div>
              <div className="login__operator-sub">
                <span>asif@az-secure</span>
                <span className="sep">·</span>
                <span>Active Session</span>
              </div>
            </div>
          </div>

          <div className="login__steps" aria-live="polite">
            {step === 0 ? (
              <div className="login__step">
                <span className="live-dot" /> Session primed · Ready for operator entry
              </div>
            ) : (
              AUTH_LINES.filter((line) => step >= line.at).map((line) => (
                <div key={line.at} className="login__step login__step--ok">
                  {line.text}
                </div>
              ))
            )}
          </div>

          <button
            type="button"
            className="btn btn--primary btn--wide login__enter-btn"
            disabled={isAuthenticating}
            onClick={authenticate}
            style={{ height: 48, fontSize: 13, fontWeight: 600 }}
            aria-label="Enter workstation"
          >
            {isAuthenticating ? (
              <>
                <Terminal size={14} className="spin-slow" />
                <span>Initializing workstation…</span>
              </>
            ) : (
              <>
                <span>Enter Workstation</span>
                <ArrowRight size={15} className="arrow" />
              </>
            )}
          </button>

          <div className="login__hint">
            <Lock size={10} /> Password not required · Press <span className="kbd">Enter ↵</span> to launch
          </div>

          <div className="login__links">
            <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <button type="button" onClick={authenticate} disabled={isAuthenticating}>
              Direct bypass
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
