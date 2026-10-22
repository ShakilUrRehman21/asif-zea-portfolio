import { useEffect, useState } from 'react';

export type ThemeId = 'matrix' | 'cyan' | 'amber';

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  codename: string;
  accent: string;
  description: string;
}

export const THEMES: Record<ThemeId, ThemeMeta> = {
  matrix: {
    id: 'matrix',
    label: 'Phosphor Matrix',
    codename: 'PHOSPHOR_01',
    accent: '#b8ff78',
    description: 'Offensive security tactical green'
  },
  cyan: {
    id: 'cyan',
    label: 'Cyber Cyan',
    codename: 'ICE_CYBER_02',
    accent: '#00f0ff',
    description: 'Aerospace neon ice & obsidian'
  },
  amber: {
    id: 'amber',
    label: 'Solar Amber',
    codename: 'MAINFRAME_03',
    accent: '#f6c065',
    description: 'Warm CRT phosphor & light champagne amber'
  }
};

export const THEME_LIST: ThemeMeta[] = Object.values(THEMES);

const THEME_KEY = 'az-workstation-theme';

export function getStoredTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeId;
    if (saved && THEMES[saved]) return saved;
  } catch {
    /* ignore storage access error */
  }
  return 'matrix';
}

export function applyTheme(theme: ThemeId): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute('data-theme', theme);
  window.dispatchEvent(new CustomEvent('az-theme-changed', { detail: { theme } }));
}

export function useTheme(): [ThemeId, (theme: ThemeId) => void] {
  const [theme, setThemeState] = useState<ThemeId>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    const onThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: ThemeId }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };
    window.addEventListener('az-theme-changed', onThemeChange);
    return () => window.removeEventListener('az-theme-changed', onThemeChange);
  }, [theme]);

  const changeTheme = (next: ThemeId) => {
    setThemeState(next);
    applyTheme(next);
  };

  return [theme, changeTheme];
}
