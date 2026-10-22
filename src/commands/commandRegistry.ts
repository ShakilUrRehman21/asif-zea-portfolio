import type { CommandDefinition, CommandResult, WindowId } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';
import { applyTheme, THEMES, type ThemeId } from '../utils/theme';

const launch = (id: WindowId, label: string, output: string[]): CommandResult => ({
  output,
  systemLog: `Window opened: ${label}`,
  openWindow: id
});

export const COMMANDS: CommandDefinition[] = [
  // --- IDENTITY ---
  {
    name: 'whoami',
    aliases: ['id'],
    description: 'Print identity, role and current status',
    category: 'IDENTITY',
    shortcut: 'W',
    windowId: 'about',
    execute: () => ({
      output: [
        `uid=1000(${PERSONAL_INFO.handle}) gid=1000(${PERSONAL_INFO.handle}) groups=1000(${PERSONAL_INFO.handle}),27(sudo),4(adm)`,
        `NAME       ${PERSONAL_INFO.name}`,
        `TITLE      ${PERSONAL_INFO.role}`,
        `ORG        Tata Consultancy Services (TCS)`,
        `LOCATION   ${PERSONAL_INFO.location}`,
        `CERTS      HTB CPTS · EC-Council CPENT · AWS SAA · CAP · CNSP`,
        `STATUS     ${PERSONAL_INFO.status}`
      ],
      systemLog: 'Identity authenticated: UID 1000 (asif)',
      openWindow: 'about'
    })
  },
  {
    name: 'about',
    aliases: ['bio', 'profile'],
    description: 'Open the profile and operating principles',
    category: 'IDENTITY',
    shortcut: 'A',
    windowId: 'about',
    execute: () =>
      launch('about', 'ABOUT.APP', [
        'Resolving executive profile manifest...',
        'Mounting /home/asif/profile.app',
        '[ OK ] ABOUT.APP launched in workspace'
      ])
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
        `Email     ${PERSONAL_INFO.email}`,
        `Phone     ${PERSONAL_INFO.phone}`,
        `LinkedIn  ${PERSONAL_INFO.linkedin}`,
        `Medium    ${PERSONAL_INFO.medium}`,
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
    description: 'Open experience: TCS and 10+ client engagements',
    category: 'PROFESSIONAL',
    shortcut: 'E',
    windowId: 'experience',
    execute: () =>
      launch('experience', 'EXPERIENCE.APP', [
        'Resolving professional history records...',
        'Employer  Tata Consultancy Services (Nov 2023 – Present)',
        'Scope     10+ enterprise clients in payments, banking, insurance, healthcare, retail',
        '[ OK ] EXPERIENCE.APP launched'
      ])
  },
  {
    name: 'education',
    aliases: ['edu', 'degree', 'university'],
    description: 'Open academic credentials (Jamia Millia Islamia)',
    category: 'PROFESSIONAL',
    shortcut: 'U',
    windowId: 'education',
    execute: () =>
      launch('education', 'EDUCATION.APP', [
        'Loading academic transcripts...',
        'Degree    B.Tech, Bachelor of Technology (2023)',
        'Institute Jamia Millia Islamia, New Delhi, India',
        '[ OK ] EDUCATION.APP launched'
      ])
  },
  {
    name: 'certs',
    aliases: ['certifications', 'certificates', 'cpts', 'cpent'],
    description: 'Open verified certifications (CPTS, CPENT, AWS SAA, CAP, CNSP)',
    category: 'PROFESSIONAL',
    shortcut: 'R',
    windowId: 'certs',
    execute: () =>
      launch('certs', 'CERTS.APP', [
        'Verifying cryptographic credential chain...',
        '• HTB Certified Penetration Testing Specialist (CPTS)',
        '• EC-Council Certified Penetration Testing Professional (CPENT)',
        '• AWS Certified Solutions Architect – Associate',
        '• Certified AppSec Practitioner (CAP)',
        '• Certified Network Security Practitioner (CNSP)',
        '[ OK ] identity verified across 5 credentials'
      ])
  },
  {
    name: 'achievements',
    aliases: ['awards', 'honors', 'ctf'],
    description: 'Open awards and TCS HackQuest Season 7 honors',
    category: 'PROFESSIONAL',
    shortcut: 'H',
    windowId: 'achievements',
    execute: () =>
      launch('achievements', 'ACHIEVEMENTS.APP', [
        'Querying honors ledger...',
        '• On the Spot (Team) Award, 2026 — security engagement excellence',
        '• Top 100 Finalist — TCS HackQuest Season 7',
        '[ OK ] ACHIEVEMENTS.APP launched'
      ])
  },

  // --- SECURITY LAB ---
  {
    name: 'skills',
    aliases: ['stack', 'tools', 'capabilities'],
    description: 'Open the technical skill and tool matrix',
    category: 'SECURITY LAB',
    shortcut: 'S',
    windowId: 'skills',
    execute: () =>
      launch('skills', 'SKILLS.APP', [
        'Compiling offensive and defensive capability matrix...',
        'Categories  pentest · red team · core tools · mobile · cloud · appsec · AI · frameworks',
        '[ OK ] SKILLS.APP launched'
      ])
  },
  {
    name: 'labs',
    aliases: ['homelab', 'htb', 'portswigger', 'lab'],
    description: 'Open hands-on labs: HTB CPTS, AD homelab, PortSwigger',
    category: 'SECURITY LAB',
    shortcut: 'L',
    windowId: 'labs',
    execute: () =>
      launch('labs', 'LABS.APP', [
        'Mounting virtual research environment...',
        '• Multi-host Active Directory homelab (Kerberos and lateral movement)',
        '• PortSwigger Web Security Academy (BOLA, SSRF, Web LLM)',
        '[ OK ] LABS.APP launched'
      ])
  },
  {
    name: 'methodology',
    aliases: ['methodologies', 'frameworks', 'standards', 'owasp', 'mitre'],
    description: 'Open testing standards (WSTG, ASVS, MASTG, ATT&CK, ATLAS)',
    category: 'SECURITY LAB',
    shortcut: 'M',
    windowId: 'methodology',
    execute: () =>
      launch('methodology', 'METHODOLOGY.APP', [
        'Loading assessment standards and engagement lifecycle...',
        'Standards  OWASP WSTG · ASVS · MASTG · API Top 10 · PTES · ATT&CK · ATLAS',
        '[ OK ] METHODOLOGY.APP launched'
      ])
  },
  {
    name: 'projects',
    aliases: ['proj', 'repos', 'engagements'],
    description: 'Open NDA-protected engagements and work archetypes',
    category: 'SECURITY LAB',
    shortcut: 'P',
    windowId: 'projects',
    execute: () =>
      launch('projects', 'PROJECTS.APP', [
        'Querying engagement dossier...',
        'Notice: client engagements are governed by strict NDAs.',
        'Archetypes: release gates, API authorization, AD paths, cloud, identity red team, AI agents',
        '[ OK ] PROJECTS.APP launched'
      ])
  },

  // --- SYSTEM ---
  {
    name: 'terminal',
    aliases: ['term', 'shell', 'console'],
    description: 'Open the interactive terminal window',
    category: 'SYSTEM',
    shortcut: 'T',
    windowId: 'terminal',
    execute: () =>
      launch('terminal', 'TERMINAL.APP', [
        'Spawning pseudo-terminal /dev/pts/0...',
        'Loading shell profile /home/asif/.bashrc',
        '[ OK ] TERMINAL.APP ready'
      ])
  },
  {
    name: 'home',
    aliases: ['desktop', 'start'],
    description: 'Return to the workstation home view',
    category: 'SYSTEM',
    execute: () => ({
      output: ['Returning to workstation home...'],
      goHome: true,
      systemLog: 'Workspace reset to home'
    })
  },
  {
    name: 'neofetch',
    aliases: ['fetch', 'sysinfo'],
    description: 'Display workstation and operator specifications',
    category: 'SYSTEM',
    shortcut: 'N',
    execute: () => ({
      output: [
        '        ▄▄▄▄▄▄▄▄        asif@az-secure',
        '      ▄████████████▄    --------------',
        '     ███▀  ▄▄▄▄  ▀███   OS         AZ-Secure Linux x86_64',
        '    ███   ██████    ███ Kernel     6.11.4-az-hardened',
        '    ███   ▀▀▀▀▀▀    ███ Uptime     47 days, 13 hours',
        '     ███▄        ▄███   Shell      bash 5.2.26',
        '      ▀████████████▀    Role       Application Security Engineer',
        '        ▀▀▀▀▀▀▀▀        Employer   Tata Consultancy Services',
        '                        Focus      Web · API · Mobile · AD · Cloud · AI',
        '                        Certs      CPTS · CPENT · AWS SAA · CAP · CNSP',
        '                        Memory     3.4 GiB / 32.0 GiB (11%)',
        '                        Network    tun0 (10.10.14.88) [SECURE VPN]',
        '                        Status     Ready for assessment'
      ],
      systemLog: 'System specifications retrieved'
    })
  },
  {
    name: 'theme',
    aliases: ['colors', 'color'],
    description: 'Switch workstation theme (matrix, cyan, amber)',
    category: 'SYSTEM',
    execute: (args) => {
      const target = args[0]?.toLowerCase() as ThemeId | undefined;
      if (!target) {
        return {
          output: [
            'WORKSTATION THEME ENGINE',
            '═════════════════════════════════════════════════════════════',
            'Available theme variants:',
            '  • matrix  — Phosphor Matrix (Tactical Green)',
            '  • cyan    — Cyber Cyan (Electric Neon Ice)',
            '  • amber   — Solar Amber (Warm Mainframe CRT)',
            '─────────────────────────────────────────────────────────────',
            'Usage: theme matrix | theme cyan | theme amber'
          ]
        };
      }
      if (['matrix', 'cyan', 'amber'].includes(target)) {
        applyTheme(target);
        return {
          output: [
            `[ OK ] Switched theme to: ${THEMES[target]?.label || target.toUpperCase()}`,
            'Workstation styling tokens and phosphor colors updated.'
          ],
          systemLog: `Theme switched to ${target}`
        };
      }
      return {
        output: [
          `Unknown theme: "${target}". Available: matrix, cyan, amber`,
          'Usage: theme <matrix|cyan|amber>'
        ]
      };
    }
  },
  {
    name: 'theme:matrix',
    aliases: ['matrix'],
    description: 'Switch to Phosphor Matrix theme (tactical green)',
    category: 'SYSTEM',
    execute: () => {
      applyTheme('matrix');
      return {
        output: ['[ OK ] Theme set to Phosphor Matrix (Green)'],
        systemLog: 'Theme switched to matrix'
      };
    }
  },
  {
    name: 'theme:cyan',
    aliases: ['cyan', 'neon'],
    description: 'Switch to Cyber Cyan theme (neon ice)',
    category: 'SYSTEM',
    execute: () => {
      applyTheme('cyan');
      return {
        output: ['[ OK ] Theme set to Cyber Cyan (Neon Ice)'],
        systemLog: 'Theme switched to cyan'
      };
    }
  },
  {
    name: 'theme:amber',
    aliases: ['amber', 'crt'],
    description: 'Switch to Solar Amber theme (warm mainframe)',
    category: 'SYSTEM',
    execute: () => {
      applyTheme('amber');
      return {
        output: ['[ OK ] Theme set to Solar Amber (Mainframe CRT)'],
        systemLog: 'Theme switched to amber'
      };
    }
  },
  {
    name: 'help',
    aliases: ['?', 'man', 'commands'],
    description: 'Display every command and keyboard shortcut',
    category: 'SYSTEM',
    shortcut: '?',
    execute: () => {
      const lines = [
        'AZ-SECURE COMMAND SYSTEM // REFERENCE',
        '═══════════════════════════════════════════════════════════════════',
        'COMMAND        CATEGORY          SHORTCUT   DESCRIPTION',
        '───────────────────────────────────────────────────────────────────'
      ];

      COMMANDS.forEach((cmd) => {
        const namePad = cmd.name.padEnd(15, ' ');
        const catPad = cmd.category.padEnd(18, ' ');
        const scPad = (cmd.shortcut ? `Alt+${cmd.shortcut}` : '—').padEnd(11, ' ');
        lines.push(`${namePad}${catPad}${scPad}${cmd.description}`);
      });

      lines.push('───────────────────────────────────────────────────────────────────');
      lines.push('TIP  Tab autocompletes · ↑/↓ walks history · Ctrl+K opens the palette');
      lines.push('TIP  Ctrl+` toggles the terminal · Esc closes the palette or active window');

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
    aliases: ['cls'],
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
    description: 'Close every open application window',
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
    description: 'Lock the workstation and return to login',
    category: 'SYSTEM',
    execute: () => ({
      exitToLogin: true,
      systemLog: 'Session terminated. Workstation locked.'
    })
  },
  {
    name: 'sudo',
    aliases: ['root'],
    description: 'Attempt privilege escalation (good luck)',
    category: 'SYSTEM',
    execute: () => ({
      output: [
        "asif is not in the sudoers file. This incident will be reported.",
        "→ Reported to: /dev/null (nobody reads it anyway)"
      ],
      systemLog: 'Privilege escalation denied'
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
    description: 'List the simulated home directory',
    category: 'SYSTEM',
    execute: () => ({
      output: [
        'total 52',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 about.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 experience.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 skills.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 certs.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 achievements.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 labs.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 projects.app/',
        'drwxr-xr-x 2 asif asif 4096 Oct 20 12:00 contact.app/',
        '-rw-r--r-- 1 asif asif 1337 Oct 20 12:00 notes_active_directory.md',
        '-rw-r--r-- 1 asif asif  842 Oct 20 12:00 prompt_injection_poc.py'
      ]
    })
  },
  {
    name: 'date',
    description: 'Print the current system date and time',
    category: 'SYSTEM',
    execute: () => ({
      output: new Date().toUTCString()
    })
  }
];

export function findCommand(query: string): CommandDefinition | undefined {
  const clean = query.trim().toLowerCase();
  return COMMANDS.find(
    (cmd) =>
      cmd.name.toLowerCase() === clean || cmd.aliases?.some((a) => a.toLowerCase() === clean)
  );
}

export function parseAndExecuteCommand(rawInput: string, history: string[]): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) return {};

  const parts = trimmed.split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (cmdName === 'history' || cmdName === 'hist') {
    return {
      output: history.length
        ? history.map((cmd, idx) => `  ${String(idx + 1).padStart(4, ' ')}  ${cmd}`)
        : ['No commands in history yet.']
    };
  }

  const matched = findCommand(cmdName);
  if (matched) {
    if (matched.execute) return matched.execute(args);
    if (matched.windowId) {
      return {
        openWindow: matched.windowId,
        output: `[ OK ] ${matched.windowId.toUpperCase()}.APP launched`
      };
    }
    return { output: `Command executed: ${matched.name}` };
  }

  return {
    output: [
      `az-secure: command not found: '${trimmed}'`,
      `Type 'help' to view all commands or press Ctrl+K to open the palette.`
    ],
    systemLog: `Command not found: ${trimmed}`
  };
}
