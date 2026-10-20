# Asif Zea — Interactive Linux Workstation Portfolio

[![Security Role](https://img.shields.io/badge/Role-Application%20Security%20Engineer-A3FF6F?style=for-the-badge&logo=shield&logoColor=black)](https://github.com)
[![Company](https://img.shields.io/badge/Company-Tata%20Consultancy%20Services-E5B567?style=for-the-badge)](https://www.tcs.com)
[![Kernel Version](https://img.shields.io/badge/OS-AZ--SECURE%20Linux%206.11.4--hardened-64B5F6?style=for-the-badge&logo=linux&logoColor=white)](https://github.com)
[![Build Status](https://img.shields.io/badge/Build-Passing%20(Vite%20%2B%20TypeScript)-brightgreen?style=for-the-badge)](https://github.com)

> **Live Workstation Simulation**: An interactive, cyber-hardened personal Linux workstation environment for **Asif Zea**, Application Security Engineer and Penetration Tester at Tata Consultancy Services (TCS).

---

## 🖥️ Workstation Experience Overview

This portfolio abandons generic SaaS templates in favor of an **authentic, engineered Linux operating system simulation**. Visitors interact with Asif Zea's real-world cybersecurity background, technical skill matrix, enterprise engagements, certifications, and hands-on lab research through a fully functional Unix desktop environment.

### Core User Journey
1. **Cinematic Boot Sequence**: Kernel hardware initialization, ACPI timer synchronization, encrypted `/home/asif` LUKS volume mounting, and AppArmor policy enforcement (with instant `[ESC]` skip).
2. **PAM Root/User Authentication**: Simulated Pluggable Authentication Module credential verification.
3. **Interactive Terminal Shell**: Authentic bash prompt (`asif@az-secure:~$`) supporting keyboard input, autocomplete (`Tab`), history cycling (`Arrow Up / Down`), and quick command selector chips.
4. **Line-by-Line Execution Engine**: Commands stream terminal responses line-by-line (`[ OK ]`) with realistic delays before launching dedicated application windows.
5. **Managed Window Desktop**: Multi-window manager featuring free desktop dragging, z-index stacking, minimize/maximize/close actions, safe dock margins, and responsive full-screen mobile behavior.
6. **Command Palette (`Ctrl+K`)**: Instant searchable modal overlay for direct command and module execution.

---

## 🛡️ Verified Credentials & Career Profile

All technical details and achievements are verified directly from Asif Zea's professional track record:

### 💼 Professional Experience
* **Application Security Engineer & Penetration Tester** — **Tata Consultancy Services (TCS)** *(Nov 2023 – Present)*
  * Delivers end-to-end vulnerability assessments and penetration testing for **10+ enterprise clients** across global payments, retail banking, insurance, healthcare, and retail sectors.
  * Conducts black-box and grey-box security assessments across web apps, REST APIs, microservices, mobile apps (Android/iOS), Active Directory networks, and AWS cloud infrastructures under strict rules of engagement.
  * Identifies critical business-logic vulnerabilities, Broken Object-Level Authorization (BOLA/IDOR), authentication bypasses, race conditions, and server-side request forgeries (SSRF).
  * Executes red teaming assessments, adversary attack simulations, and internal Active Directory domain privilege escalations.
  * Conducts manual and tool-assisted secure code reviews (Checkmarx + manual source auditing) with remediation consultation for developer teams.

### 📜 Verified Industry Certifications
* **HTB CPTS** — Certified Penetration Testing Specialist *(HackTheBox)*
* **CPENT** — Certified Penetration Testing Professional *(EC-Council)*
* **AWS SAA** — AWS Certified Solutions Architect – Associate *(Amazon Web Services)*
* **CAP** — Certified AppSec Practitioner *(The SecOps Group)*
* **CNSP** — Certified Network Security Practitioner *(The SecOps Group)*

### 🏆 Honors & Competitions
* **TCS On the Spot Award (2026)** — Recognized by TCS project leadership for identifying critical multi-tenant authorization flaws and providing rapid remediation guidance.
* **TCS HackQuest Season 7 National Finalist** — Ranked among the **top 55 finalists out of 40,000+ national participants** in TCS's flagship national ethical hacking competition.

### 🧪 Security Labs & Continuous Research
* **Active Directory Multi-Forest Homelab**: Dedicated hypervisor cluster running simulated Windows Server Domain Controllers, Kerberos delegation attacks, BloodHound path analysis, and NetExec post-exploitation.
* **HackTheBox ProLabs & Machines**: Offensive security engagements focused on Linux privilege escalation, customized buffer overflows, and evasion techniques.
* **PortSwigger Web Security Academy**: Web vulnerability research focusing on HTTP request smuggling, OAuth2 token handling, JWT vulnerabilities, and GraphQL injection.

### 🎓 Academic Background
* **Bachelor of Technology (B.Tech)** — **Jamia Millia Islamia** *(Class of 2023, New Delhi, India)*

---

## ⌨️ Terminal Command Reference

Type any of the following commands into the terminal or press their global hotkey:

| Command | Shortcut | Description | Target Module |
|:---|:---:|:---|:---|
| `whoami` | `Alt+W` | Display operator identity & security clearance | Output Stream |
| `about` | `Alt+A` | Open executive profile & domain summary | `ABOUT.APP` |
| `experience` | `Alt+E` | Open TCS enterprise experience & client spectrum | `EXPERIENCE.APP` |
| `skills` | `Alt+S` | Open offensive & defensive toolmatrix | `SKILLS.APP` |
| `certs` | `Alt+R` | Open verified industry certifications | `CERTS.APP` |
| `achievements` | `Alt+T` | Open awards, honors & HackQuest Season 7 finalist details | `ACHIEVEMENTS.APP` |
| `labs` | `Alt+L` | Open hands-on homelab & research documentation | `LABS.APP` |
| `methodology` | `Alt+M` | Open assessment frameworks (OWASP WSTG, ASVS, MASTG) | `METHODOLOGY.APP` |
| `projects` | `Alt+P` | Client confidentiality notice & research links | `PROJECTS.APP` |
| `education` | `Alt+U` | View B.Tech academic credentials from Jamia Millia Islamia | `EDUCATION.APP` |
| `contact` | `Alt+C` | View secure communications & contact details | `CONTACT.APP` |
| `neofetch` | — | Display system hardware & kernel telemetry banner | Output Stream |
| `help` | — | Print formatted help table of all available commands | Output Stream |
| `history` | — | List previously executed commands in this session | Output Stream |
| `clear` | — | Clear current terminal log buffer | Terminal Buffer |
| `close-all` | — | Close all open application windows | Window Manager |
| `exit` / `lock` | — | Lock workstation and return to login screen | Login Screen |

---

## 🚀 Technical Architecture & Features

```
asif-zea-portfolio/
├── index.html                   # HTML entry point, SEO meta, JetBrains Mono & Inter typography
├── src/
│   ├── App.tsx                  # Master lifecycle controller (Boot -> Login -> Desktop)
│   ├── main.tsx                 # React DOM mount root
│   ├── index.css                # Custom CSS design system, phosphor variables & CRT scanline
│   ├── types/
│   │   └── portfolio.ts         # TypeScript definitions for commands, windows, and CV data
│   ├── data/
│   │   └── portfolioData.ts     # Verified CV data records (experience, certs, skills, honors)
│   ├── utils/
│   │   └── audio.ts             # Web Audio API procedural audio synthesizer (foley effects)
│   ├── commands/
│   │   └── commandRegistry.ts   # Command parser, aliases, and execution dispatch table
│   └── components/
│       ├── CyberBackground.tsx  # Calm phosphor-green hex/opcode matrix rain stream
│       ├── BootSequence.tsx     # Cinematic kernel boot log screen with ESC skip
│       ├── LoginScreen.tsx      # PAM login prompt with credential validation
│       ├── SystemBar.tsx        # Top system bar (host info, live clock, VPN indicator, audio)
│       ├── TerminalPanel.tsx    # Primary bash interactive shell with history & autocomplete
│       ├── CommandPalette.tsx   # Ctrl+K instant modal command palette
│       ├── WindowManager.tsx    # Multi-window coordinator & z-index stack manager
│       ├── ApplicationWindow.tsx# Draggable floating windows with dynamic desktop bounds
│       ├── WindowDock.tsx       # Bottom application switcher dock with active dot indicators
│       └── apps/                # Interactive application modules
│           ├── AboutApp.tsx
│           ├── ExperienceApp.tsx
│           ├── SkillsApp.tsx
│           ├── CertificationsApp.tsx
│           ├── AchievementsApp.tsx
│           ├── LabsApp.tsx
│           ├── ProjectsApp.tsx
│           ├── MethodologyApp.tsx
│           ├── EducationApp.tsx
│           └── ContactApp.tsx
```

### Motion & Audio Design Highlights
* **Calm Hex/Opcode Background (`CyberBackground.tsx`)**: High-performance HTML5 canvas rendering falling hex memory offsets (`0x4A`, `0xDEAD`), binary streams, and x86_64 opcodes without screen strobing or light flickers.
* **Procedural Sound Synthesizer (`audio.ts`)**: Built using native browser `AudioContext` — zero external MP3/WAV dependencies. Generates authentic tactile keyclicks, enter beeps, window action chirps, and provides a persistent mute toggle in the top bar.
* **Free-Form Window Dragging (`ApplicationWindow.tsx`)**: Desktop drag constraints allow users to drag windows anywhere across the desktop, including the far right and bottom corners, with subtle inertia and elastic edge resistance.
* **Mobile-First Responsive Layout**: On touch viewports, windows smoothly pin between the top bar and dock with `-webkit-overflow-scrolling: touch`, compact prompts (`asif:~$`), and a horizontally scrollable dock.

---

## 🛠️ Local Development & Build

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* `npm` or `pnpm`

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/asif-zea-portfolio.git

# Navigate into the project directory
cd asif-zea-portfolio

# Install dependencies
npm install
```

### Run Locally
```bash
# Start local development server (with HMR)
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

### Production Build
```bash
# Typecheck and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📤 Pushing to GitHub

To push this repository to your GitHub account:

1. **Create a new repository on GitHub** (e.g. named `asif-zea-portfolio` or `portfolio`). Do not initialize with a README since this repository already has one.
2. **Run the following commands in your terminal**:

```bash
# Initialize git if not already initialized
git init -b main

# Stage all files
git add .

# Create the initial commit
git commit -m "feat: complete interactive Linux workstation portfolio for Asif Zea"

# Link your GitHub remote repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

---

## 🔒 Confidentiality & Ethical Notice
Client engagement specifics conducted during tenure at Tata Consultancy Services (TCS) are described in accordance with binding Non-Disclosure Agreements (NDAs). Proprietary source code, client infrastructure addresses, and confidential vulnerability reports are strictly omitted.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
