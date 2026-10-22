import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { BootSequence } from './components/BootSequence';
import { LoginScreen } from './components/LoginScreen';
import { DesktopShell } from './components/DesktopShell';
import { CyberBackground } from './components/CyberBackground';
import { CursorGlow } from './components/CursorGlow';

type AppState = 'BOOT' | 'LOGIN' | 'DESKTOP';

const SESSION_KEY = 'az-workstation-session';

function readSession(): AppState {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'active' ? 'DESKTOP' : 'BOOT';
  } catch {
    return 'BOOT';
  }
}

const phaseMotion = {
  initial: { opacity: 0, filter: 'blur(10px)', scale: 0.992 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(8px)', scale: 1.008 },
  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const }
};

export function App() {
  const [appState, setAppState] = useState<AppState>(readSession);

  const enterDesktop = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'active');
    } catch {
      /* private mode — session persists for this page only */
    }
    setAppState('DESKTOP');
  };

  const lockWorkstation = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAppState('LOGIN');
  };

  return (
    <MotionConfig reducedMotion="user">
      <CyberBackground />
      <CursorGlow />

      <AnimatePresence mode="wait" initial={false}>
        {appState === 'BOOT' && (
          <motion.div key="boot" className="phase-layer" {...phaseMotion}>
            <BootSequence onComplete={() => setAppState('LOGIN')} />
          </motion.div>
        )}

        {appState === 'LOGIN' && (
          <motion.div key="login" className="phase-layer" {...phaseMotion}>
            <LoginScreen onLoginSuccess={enterDesktop} />
          </motion.div>
        )}

        {appState === 'DESKTOP' && (
          <motion.div key="desktop" className="phase-layer phase-layer--desktop" {...phaseMotion}>
            <DesktopShell onLockWorkstation={lockWorkstation} />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
