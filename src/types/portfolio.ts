export type CommandCategory = 'IDENTITY' | 'PROFESSIONAL' | 'SECURITY LAB' | 'SYSTEM';

export type WindowId = 
  | 'about' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'certs' 
  | 'achievements' 
  | 'labs' 
  | 'projects' 
  | 'methodology' 
  | 'contact';

export interface CommandDefinition {
  name: string;
  aliases?: string[];
  description: string;
  category: CommandCategory;
  shortcut?: string;
  windowId?: WindowId;
  execute?: (args: string[]) => CommandResult;
}

export interface CommandResult {
  output?: string | string[];
  systemLog?: string;
  openWindow?: WindowId;
  clearTerminal?: boolean;
  exitToLogin?: boolean;
  closeAllWindows?: boolean;
}

export interface TerminalLogEntry {
  id: string;
  timestamp: string;
  command?: string;
  output?: string | string[];
  type?: 'input' | 'output' | 'system' | 'error' | 'success';
}

export interface WindowState {
  id: WindowId;
  title: string;
  subtitle: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  clientContext: string;
  responsibilities: {
    domain: string;
    description: string;
    toolsOrStandards?: string[];
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  code?: string;
  description: string;
  verifiedStatus: string;
  category: 'Offensive Security' | 'Cloud Security' | 'Application Security' | 'Network Security';
  skillsCovered: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  type: 'Award' | 'CTF Finalist';
}

export interface LabItem {
  platform: string;
  focus: string;
  description: string;
  topics: string[];
  keyHighlights: string[];
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
    note?: string;
  }[];
}
