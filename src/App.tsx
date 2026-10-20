import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BootSequence } from './components/BootSequence';
import { LoginScreen } from './components/LoginScreen';
import { DesktopShell } from './components/DesktopShell';
import { CyberBackground } from './components/CyberBackground';

type AppState = 'BOOT' | 'LOGIN' | 'DESKTOP';

export function App() {
  const [appState, setAppState] = useState<AppState>('BOOT');

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Subtle background hex/binary data stream */}
      <CyberBackground />

      {/* Subtle CRT scanline overlay */}
      <div className="scanlines-overlay" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {appState === 'BOOT' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{ width: '100%', height: '100%' }}
          >
            <BootSequence onComplete={() => setAppState('LOGIN')} />
          </motion.div>
        )}

        {appState === 'LOGIN' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            style={{ width: '100%', height: '100%' }}
          >
            <LoginScreen onLoginSuccess={() => setAppState('DESKTOP')} />
          </motion.div>
        )}

        {appState === 'DESKTOP' && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
            <DesktopShell onLockWorkstation={() => setAppState('LOGIN')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
