import type { CommandDefinition, CommandResult } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';

export const COMMANDS: CommandDefinition[] = [
  // --- IDENTITY ---
  {
    name: 'whoami',
    aliases: ['id'],
    description: 'Print active identity credentials and quick summary',
    category: 'IDENTITY',
    shortcut: 'W',
    windowId: 'about',
    execute: () => ({
      output: [
        `uid=1000(${PERSONAL_INFO.handle}) gid=1000(${PERSONAL_INFO.handle}) groups=1000(${PERSONAL_INFO.handle}),27(sudo),4(adm)`,
        `NAME:       ${PERSONAL_INFO.name}`,
        `TITLE:      ${PERSONAL_INFO.role}`,
        `ORG:        Tata Consultancy Services (TCS)`,
        `LOCATION:   ${PERSONAL_INFO.location}`,
        `CERTS:      HTB CPTS · EC-Council CPENT · AWS Solutions Architect - Associate`,
        `STATUS:     ${PERSONAL_INFO.status}`
      ],
      systemLog: 'Identity authenticated: UID 1000 (asif)',
      openWindow: 'about'
    })
  },
  {
    name: 'about',
    aliases: ['bio', 'profile'],
    description: 'Open the About & Executive Profile window',
    category: 'IDENTITY',
    shortcut: 'A',
    windowId: 'about',
    execute: () => ({
      output: [
        'Resolving executive profile manifest...',
        'Mounting /home/asif/profile.app',
        '[ OK ] ABOUT.APP launched in workspace'
      ],
      systemLog: 'Window opened: ABOUT.APP',
      openWindow: 'about'
    })
  },
  {
    name: 'contact',
    aliases: ['email', 'reach', 'socials'],
    description: 'Open secure communications and verified links',
    category: 'IDENTITY',
    shortcut: 'C',
    windowId: 'contact',
    execute: () => ({
      output: [
        'Accessing comms interface...',
        `Email:    ${PERSONAL_INFO.email}`,
        `Phone:    ${PERSONAL_INFO.phone}`,
        `LinkedIn: ${PERSONAL_INFO.linkedin}`,
        `Medium:   ${PERSONAL_INFO.medium}`,
        '[ OK ] CONTACT.APP opened'
      ],
      systemLog: 'Window opened: CONTACT.APP',
      openWindow: 'contact'
    })
  },

  // --- PROFESSIONAL ---
  {
    name: 'experience',
    aliases: ['exp', 'work', 'tcs'],
    description: 'Open Professional Experience (TCS & 10+ client engagements)',
    category: 'PROFESSIONAL',
    shortcut: 'E',
    windowId: 'experience',
    execute: () => ({
      output: [
        'Resolving professional history records...',
        'Employer: Tata Consultancy Services (Nov 2023 – Present)',
        'Scope:    10+ enterprise clients in payments, banking, insurance, healthcare, retail',
        '[ OK ] EXPERIENCE.APP launched'
      ],
      systemLog: 'Window opened: EXPERIENCE.APP',
      openWindow: 'experience'
    })
  },
  {
    name: 'education',
    aliases: ['edu', 'degree', 'university'],
    description: 'Open verified academic credentials (Jamia Millia Islamia)',
    category: 'PROFESSIONAL',
    shortcut: 'U',
    windowId: 'education',
    execute: () => ({
      output: [
        'Loading academic transcripts...',
        'Degree:   B.Tech (Bachelor of Technology), 2023',
        'Institute: Jamia Millia Islamia, New Delhi, India',
        '[ OK ] EDUCATION.APP launched'
      ],
      systemLog: 'Window opened: EDUCATION.APP',
      openWindow: 'education'
    })
  },
  {
    name: 'certs',
    aliases: ['certifications', 'certificates', 'cpts', 'cpent'],
    description: 'Open verified certifications (HTB CPTS, CPENT, AWS SAA, CAP, CNSP)',
    category: 'PROFESSIONAL',
    shortcut: 'R',
    windowId: 'certs',
    execute: () => ({
      output: [
        'Verifying cryptographic credential chain...',
        '• HTB Certified Penetration Testing Specialist (CPTS)',
        '• EC-Council Certified Penetration Testing Professional (CPENT)',
        '• AWS Certified Solutions Architect – Associate',
        '• Certified AppSec Practitioner (CAP)',
        '• Certified Network Security Practitioner (CNSP)',
        '[ OK ] CERTS.APP launched'
      ],
      systemLog: 'Window opened: CERTS.APP',
      openWindow: 'certs'
    })
  },
  {
    name: 'achievements',
    aliases: ['awards', 'honors', 'ctf'],
    description: 'Open recognized awards & TCS HackQuest Season 7 honors',
    category: 'PROFESSIONAL',
    shortcut: 'H',
    windowId: 'achievements',
    execute: () => ({
      output: [
        'Querying honors ledger...',
        '• On the Spot (Team) Award (2026) — Security Engagement Excellence',
        '• Top 100 Finalist — TCS HackQuest Season 7 (Capture-The-Flag)',
        '[ OK ] ACHIEVEMENTS.APP launched'
      ],
      systemLog: 'Window opened: ACHIEVEMENTS.APP',
      openWindow: 'achievements'
    })
  },

  // --- SECURITY LAB ---
  {
    name: 'skills',
    aliases: ['stack', 'tools', 'capabilities'],
    description: 'Open technical skills & tool matrix (Burp, Frida, AD, AWS, LLM)',
    category: 'SECURITY LAB',
    shortcut: 'S',
    windowId: 'skills',
    execute: () => ({
      output: [
        'Compiling offensive & defensive capability matrix...',
        'Categories: Pentest, Red Teaming, Core Tools, Mobile, Cloud, AppSec, AI Security',
        '[ OK ] SKILLS.APP launched'
      ],
      systemLog: 'Window opened: SKILLS.APP',
      openWindow: 'skills'
    })
  },
  {
    name: 'labs',
    aliases: ['homelab', 'htb', 'portswigger', 'lab'],
    description: 'Open Hands-on Labs (HTB CPTS Path, AD Homelab & PortSwigger)',
    category: 'SECURITY LAB',
    shortcut: 'L',
    windowId: 'labs',
    execute: () => ({
      output: [
        'Mounting virtual research environment...',
        '• Multi-Host Active Directory Homelab (Kerberos & Lateral Movement)',
        '• PortSwigger Web Security Academy (BOLA, SSRF, Web LLM Attacks)',
        '[ OK ] LABS.APP launched'
      ],
      systemLog: 'Window opened: LABS.APP',
      openWindow: 'labs'
    })
  },
  {
    name: 'methodology',
    aliases: ['methodologies', 'frameworks', 'standards', 'owasp', 'mitre'],
    description: 'Open security testing standards (OWASP WSTG, ASVS, MASTG, MITRE)',
    category: 'SECURITY LAB',
    shortcut: 'M',
    windowId: 'methodology',
    execute: () => ({
      output: [
        'Loading assessment standards & frameworks...',
        'Standards: OWASP WSTG, ASVS, MASTG, API Top 10, PTES, MITRE ATT&CK, ATLAS',
        '[ OK ] METHODOLOGY.APP launched'
      ],
      systemLog: 'Window opened: METHODOLOGY.APP',
      openWindow: 'methodology'
    })
  },
  {
    name: 'projects',
    aliases: ['proj', 'repos'],
    description: 'Open Projects & Security Engagements overview (NDA disclosure)',
    category: 'SECURITY LAB',
    shortcut: 'P',
    windowId: 'projects',
    execute: () => ({
      output: [
        'Querying projects database...',
        'Notice: Client engagements governed by strict Non-Disclosure Agreements (NDA).',
        'Technical write-ups & research documented under labs & Medium publications.',
        '[ OK ] PROJECTS.APP launched'
      ],
      systemLog: 'Window opened: PROJECTS.APP',
      openWindow: 'projects'
    })
  },

  // --- SYSTEM ---
  {
    name: 'neofetch',
    aliases: ['fetch', 'sysinfo'],
    description: 'Display custom workstation & security engineer specifications',
    category: 'SYSTEM',
    shortcut: 'N',
    execute: () => ({
      output: [
        '       /\\          asif@az-secure',
        '      /  \\         --------------',
        '     / /\\ \\        OS:       AZ-Secure Linux x86_64',
        '    / /  \\ \\       Kernel:   6.11.4-az-hardened',
        '   / / /\\ \\ \\      Uptime:   47 days, 13 hours, 37 mins',
        '  / / /  \\ \\ \\     Shell:    bash 5.2.26',
        ' / / / /\\ \\ \\ \\    Role:     Application Security Engineer',
        '/ / / /  \\ \\ \\ \\   Employer: Tata Consultancy Services',
        '\\ \\ \\ \\  / / / /   Focus:    Web, API, Mobile, AD, Cloud & AI',
        ' \\ \\ \\ \\/ / / /    Certs:    HTB CPTS, CPENT, AWS SAA, CAP, CNSP',
        '  \\ \\ \\  / / /     Theme:    Graphite Phosphor [Dark]',
        '   \\ \\ \\/ / /      Memory:   3.4 GiB / 32.0 GiB (11%)',
        '    \\ \\  / /       Network:  tun0 (10.10.14.88) [SECURE VPN]',
        '     \\ \\/ /        Status:   Ready for assessment'
      ],
      systemLog: 'System specifications retrieved'
    })
  },
  {
    name: 'help',
    aliases: ['?', 'man', 'commands'],
    description: 'Display all available commands and keyboard shortcuts',
    category: 'SYSTEM',
    shortcut: '?',
    execute: () => {
      const lines = [
        'AZ-SECURE COMMAND SYSTEM // REFERENCE MANUAL',
        '=========================================================================',
        'COMMAND       CATEGORY        SHORTCUT  DESCRIPTION',
        '-------------------------------------------------------------------------'
      ];
      
      COMMANDS.forEach(cmd => {
        const namePad = cmd.name.padEnd(14, ' ');
        const catPad = cmd.category.padEnd(16, ' ');
        const scPad = (cmd.shortcut ? `Alt+${cmd.shortcut}` : '-').padEnd(10, ' ');
        lines.push(`${namePad}${catPad}${scPad}${cmd.description}`);
      });
      
      lines.push('-------------------------------------------------------------------------');
      lines.push('TIP: Use Tab for autocomplete, Up/Down for command history, or Ctrl+K for palette.');
      
      return { output: lines };
    }
  },
  {
    name: 'history',
    aliases: ['hist'],
    description: 'Display recent command history',
    category: 'SYSTEM',
    execute: () => ({
      systemLog: 'Command history requested'
    })
  },
  {
    name: 'clear',
    aliases: ['cls', 'c'],
    description: 'Clear terminal screen history',
    category: 'SYSTEM',
    execute: () => ({
      clearTerminal: true,
      systemLog: 'Terminal screen cleared'
    })
  },
  {
    name: 'close-all',
    aliases: ['close', 'killall'],
    description: 'Close all open application windows',
    category: 'SYSTEM',
    execute: () => ({
      closeAllWindows: true,
      output: 'All application windows closed. Workspace clean.',
      systemLog: 'All windows terminated'
    })
  },
  {
    name: 'exit',
    aliases: ['logout', 'lock', 'shutdown'],
    description: 'Lock workstation and return to login screen',
    category: 'SYSTEM',
    execute: () => ({
      exitToLogin: true,
      systemLog: 'Session terminated. Workstation locked.'
    })
  },
  {
    name: 'uname',
    aliases: ['os'],
    description: 'Print operating system name and architecture',
    category: 'SYSTEM',
    execute: (args) => {
      if (args.includes('-a')) {
        return { output: `${PERSONAL_INFO.kernel} SMP PREEMPT_DYNAMIC #1 SMP az-secure GNU/Linux` };
      }
      return { output: 'Linux az-secure 6.11.4-az-hardened x86_64' };
    }
  },
  {
    name: 'ls',
    aliases: ['dir', 'll'],
    description: 'List simulated home directory contents',
    category: 'SYSTEM',
    execute: () => ({
      output: [
        'total 48',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 about.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 experience.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 skills.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 certs.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 achievements.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 labs.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 contact.app/',
        '-rw-r--r-- 1 asif asif 1337 Oct 20 12:00 notes_active_directory.md',
        '-rw-r--r-- 1 asif asif  842 Oct 20 12:00 prompt_injection_poc.py'
      ]
    })
  },
  {
    name: 'date',
    description: 'Print system date and time',
    category: 'SYSTEM',
    execute: () => ({
      output: new Date().toUTCString()
    })
  }
];

export function findCommand(query: string): CommandDefinition | undefined {
  const clean = query.trim().toLowerCase();
  return COMMANDS.find(cmd => 
    cmd.name.toLowerCase() === clean || 
    cmd.aliases?.some(a => a.toLowerCase() === clean)
  );
}

export function parseAndExecuteCommand(
  rawInput: string,
  history: string[]
): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {};
  }

  const parts = trimmed.split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Special handling for history command to show recent history
  if (cmdName === 'history' || cmdName === 'hist') {
    return {
      output: history.map((cmd, idx) => `  ${String(idx + 1).padStart(4, ' ')}  ${cmd}`)
    };
  }

  const matched = findCommand(cmdName);
  if (matched) {
    if (matched.execute) {
      return matched.execute(args);
    }
    if (matched.windowId) {
      return {
        openWindow: matched.windowId,
        output: `[ OK ] ${matched.windowId.toUpperCase()}.APP launched`
      };
    }
    return { output: `Command executed: ${matched.name}` };
  }

  // Helpful response for unknown commands
  return {
    output: [
      `az-secure: command not found: '${trimmed}'`,
      `Type 'help' to view all available commands or press Ctrl+K to open the command palette.`
    ],
    systemLog: `Command not found: ${trimmed}`
  };
}
