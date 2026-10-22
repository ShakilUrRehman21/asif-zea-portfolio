import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  GraduationCap,
  Lock,
  Mail,
  Shield,
  Terminal,
  Trophy
} from 'lucide-react';
import type { WindowId } from '../types/portfolio';

export type AppTone = 'acid' | 'amber' | 'cyan';

export interface AppMeta {
  id: WindowId;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
  tone: AppTone;
  width: number;
  shortcut?: string;
}

export const APP_LIST: AppMeta[] = [
  {
    id: 'about',
    label: 'Profile',
    short: 'Profile',
    description: 'Identity, focus areas and operating principles',
    icon: Shield,
    tone: 'acid',
    width: 900,
    shortcut: 'A'
  },
  {
    id: 'experience',
    label: 'Experience',
    short: 'Experience',
    description: 'TCS engagements and ten security domains',
    icon: Briefcase,
    tone: 'amber',
    width: 960,
    shortcut: 'E'
  },
  {
    id: 'skills',
    label: 'Capabilities',
    short: 'Skills',
    description: 'Offensive tooling and technical skill matrix',
    icon: Cpu,
    tone: 'acid',
    width: 960,
    shortcut: 'S'
  },
  {
    id: 'certs',
    label: 'Credentials',
    short: 'Certs',
    description: 'Verified certifications and practical exams',
    icon: Award,
    tone: 'acid',
    width: 960,
    shortcut: 'R'
  },
  {
    id: 'achievements',
    label: 'Recognition',
    short: 'Honors',
    description: 'Awards and competitive CTF results',
    icon: Trophy,
    tone: 'amber',
    width: 900,
    shortcut: 'H'
  },
  {
    id: 'labs',
    label: 'Labs',
    short: 'Labs',
    description: 'HTB path, AD homelab and PortSwigger research',
    icon: Terminal,
    tone: 'acid',
    width: 960,
    shortcut: 'L'
  },
  {
    id: 'projects',
    label: 'Engagements',
    short: 'Projects',
    description: 'NDA-protected client work and engagement archetypes',
    icon: Lock,
    tone: 'amber',
    width: 960,
    shortcut: 'P'
  },
  {
    id: 'methodology',
    label: 'Method',
    short: 'Method',
    description: 'Frameworks and the end-to-end engagement lifecycle',
    icon: BookOpen,
    tone: 'acid',
    width: 960,
    shortcut: 'M'
  },
  {
    id: 'education',
    label: 'Education',
    short: 'Education',
    description: 'Academic foundation and continuous learning',
    icon: GraduationCap,
    tone: 'cyan',
    width: 880,
    shortcut: 'U'
  },
  {
    id: 'contact',
    label: 'Contact',
    short: 'Contact',
    description: 'Direct channels, secure comms and PGP fingerprint',
    icon: Mail,
    tone: 'acid',
    width: 920,
    shortcut: 'C'
  },
  {
    id: 'terminal',
    label: 'Terminal',
    short: 'Terminal',
    description: 'Command-line interface to the whole workstation',
    icon: Terminal,
    tone: 'acid',
    width: 1000,
    shortcut: 'T'
  }
];

export const APP_MAP: Record<WindowId, AppMeta> = APP_LIST.reduce(
  (acc, app) => {
    acc[app.id] = app;
    return acc;
  },
  {} as Record<WindowId, AppMeta>
);

/** Apps shown in the bottom dock / quick navigation, in curated order. */
export const DOCK_IDS: WindowId[] = [
  'about',
  'experience',
  'skills',
  'certs',
  'labs',
  'projects',
  'methodology',
  'contact'
];

export const TILE_IDS: WindowId[] = [
  'about',
  'experience',
  'skills',
  'certs',
  'achievements',
  'labs',
  'projects',
  'methodology',
  'education',
  'contact'
];
