import type { 
  ExperienceItem, 
  CertificationItem, 
  AchievementItem, 
  LabItem, 
  SkillCategory 
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Asif Zea',
  handle: 'asif',
  hostname: 'az-secure',
  kernel: 'Linux 6.11.4-az-hardened x86_64',
  shell: '/bin/bash (v5.2.26)',
  uptime: '47 days, 13 hours, 37 mins',
  role: 'Application Security Engineer | Penetration Tester',
  location: 'New Delhi, India',
  email: 'asifzea7@gmail.com',
  phone: '+91 8750685781',
  linkedin: 'https://linkedin.com/in/asifzea',
  linkedinDisplay: 'linkedin.com/in/asifzea',
  medium: 'https://medium.com/@asifzea7',
  mediumDisplay: 'medium.com/@asifzea7',
  status: 'ONLINE // SECURE WORKSTATION',
  summary: `Application security engineer and penetration tester with 3 years of experience at Tata Consultancy Services, testing web applications, APIs, mobile apps, networks, Active Directory and AWS for global payments, banking, insurance, healthcare and retail clients. Delivers each engagement end to end, from scoping and rules of engagement to risk-rated reporting and retesting with client engineering teams. Experience extends to red teaming, including an objective-based engagement against a client's Entra ID / Azure estate and in-house AI agents.`
};

export const EXPERIENCE_DATA: ExperienceItem = {
  company: 'Tata Consultancy Services (TCS)',
  role: 'Application Security Engineer',
  location: 'New Delhi, India',
  period: 'Nov 2023 – Present',
  summary: 'Delivers full end-to-end security assessments from scoping and rules of engagement to technical remediation and retesting across global enterprise infrastructures.',
  clientContext: 'Conducted engagements for 10+ clients across global payments, banking, insurance, healthcare, and retail sectors under agreed rules of engagement without disruption to production systems.',
  responsibilities: [
    {
      domain: 'Release Security Testing',
      description: 'Tested new features and changes before production releases across web, API, mobile, and cloud environments for 10+ clients in global payments, banking, insurance, healthcare, and retail. Followed agreed rules of engagement and testing scope while minimizing disruption to live services.',
      toolsOrStandards: ['Agreed RoE', 'Scoped Production Verification', 'Change Gate Assessment']
    },
    {
      domain: 'Web & API Security Testing',
      description: 'Tested web applications and APIs using OWASP WSTG, ASVS, and the API Security Top 10, covering authentication, authorization, session/JWT handling, business logic, injection, mass assignment, and race conditions. Identified vulnerabilities such as IDOR/BOLA, cross-tenant data access, privilege escalation, SSRF, and authentication bypass.',
      toolsOrStandards: ['OWASP WSTG', 'OWASP ASVS', 'OWASP API Top 10', 'Burp Suite', 'Postman']
    },
    {
      domain: 'Mobile Security Testing',
      description: 'Performed static and dynamic analysis of mobile applications using JADX, Frida, and Objection to identify client-side vulnerabilities, insecure data storage and handling, runtime security weaknesses, and issues in backend API interactions, referencing OWASP MASTG for testing coverage.',
      toolsOrStandards: ['JADX', 'Frida', 'Objection', 'OWASP MASTG']
    },
    {
      domain: 'Network & Active Directory Security',
      description: 'Conducted internal and external network penetration tests covering exposed services, misconfigurations, and potential privilege escalation paths. Assessed Active Directory attack paths, Kerberos weaknesses, and credential exposure using BloodHound, NetExec, and Impacket, validating findings to confirm exploitability and reduce false positives.',
      toolsOrStandards: ['BloodHound', 'NetExec', 'Impacket', 'Kerberos Assessment', 'Nmap']
    },
    {
      domain: 'AWS Cloud Security',
      description: 'Assessed client AWS environments for overly permissive IAM policies, exposed S3 storage, EC2/VPC misconfigurations, and privileged accounts without MFA.',
      toolsOrStandards: ['AWS IAM', 'S3', 'EC2', 'VPC', 'ScoutSuite', 'Prowler']
    },
    {
      domain: 'Red Teaming (Entra ID / Azure)',
      description: 'Developed a phased execution plan for a client red-team assessment, covering identity attack paths, Azure security testing, and AI-agent security, mapped to MITRE ATT&CK.',
      toolsOrStandards: ['Entra ID / Azure', 'Identity Attack Paths', 'MITRE ATT&CK Mapping']
    },
    {
      domain: 'AI-Agent & LLM Security',
      description: 'Developed test scenarios for in-house AI agents covering prompt injection, cross-user data exposure, excessive agency, and API authorization, aligned with the OWASP Top 10 for LLM Applications and MITRE ATLAS.',
      toolsOrStandards: ['OWASP Top 10 for LLM', 'MITRE ATLAS', 'Prompt Injection', 'Excessive Agency']
    },
    {
      domain: 'Secure Code Review & Design',
      description: 'Analysed source code using Checkmarx and manual source-to-sink tracing, triaged SAST/SCA findings with developers, and supported secure design discussions to identify potential security weaknesses early in the SDLC.',
      toolsOrStandards: ['Checkmarx', 'Manual Source-to-Sink', 'SAST / SCA Triage', 'Secure SDLC']
    },
    {
      domain: 'Reporting & Stakeholder Collaboration',
      description: 'Prepared risk-rated security reports documenting proof-of-concept evidence, business impact, and remediation recommendations. Collaborated with client teams to communicate findings, validate fixes, and track remediation.',
      toolsOrStandards: ['CVSS v3.1', 'Executive Summaries', 'Remediation Retesting']
    },
    {
      domain: 'Testing Automation',
      description: 'Used scripting and reusable test cases to support repetitive security testing tasks and improve assessment efficiency.',
      toolsOrStandards: ['Python', 'Bash', 'Custom Automation']
    }
  ]
};

export const EDUCATION_DATA = {
  degree: 'Bachelor of Technology (B.Tech)',
  institution: 'Jamia Millia Islamia',
  location: 'New Delhi, India',
  gradYear: '2023',
  description: 'Undergraduate engineering curriculum emphasizing computer science foundations, networking fundamentals, distributed systems, and core security principles.'
};

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cpts',
    title: 'Certified Penetration Testing Specialist (HTB CPTS)',
    issuer: 'Hack The Box',
    category: 'Offensive Security',
    description: 'Practical offensive security certification assessing real-world enterprise infrastructure penetration testing: advanced pivoting, multi-forest Active Directory exploitation, privilege escalation, and thorough technical vulnerability reporting.',
    verifiedStatus: 'VERIFIED // HIGH RIGOR',
    skillsCovered: [
      'Active Directory Attacks',
      'Lateral Movement & Pivoting',
      'Linux & Windows Privilege Escalation',
      'Enterprise Network Penetration Testing',
      'Professional Pentest Reporting'
    ]
  },
  {
    id: 'cpent',
    title: 'Certified Penetration Testing Professional (CPENT)',
    issuer: 'EC-Council',
    category: 'Offensive Security',
    description: 'Comprehensive practical penetration testing certification testing the ability to perform penetration tests across multi-layered networks, circumvent defenses, exploit IoT/OT firmwares, and assess enterprise perimeters.',
    verifiedStatus: 'VERIFIED // INDUSTRY STANDARD',
    skillsCovered: [
      'Multi-Zone Pivoting',
      'Advanced Exploitation',
      'Network Perimeter Assessment',
      'Evasion Techniques',
      'Penetration Testing Methodology'
    ]
  },
  {
    id: 'aws-saa',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    category: 'Cloud Security',
    description: 'Validates comprehensive knowledge of AWS architectures, IAM least privilege principles, multi-tier VPC design, encryption mechanisms (KMS), and high availability infrastructure design.',
    verifiedStatus: 'VERIFIED // CLOUD INFRASTRUCTURE',
    skillsCovered: [
      'AWS IAM & Least Privilege',
      'VPC Security & Network Isolation',
      'S3 Security & Encryption Policies',
      'Resilient Architecture Design',
      'Cloud Auditing & Compliance'
    ]
  },
  {
    id: 'cap',
    title: 'Certified AppSec Practitioner (CAP)',
    issuer: 'The SecOps Group',
    category: 'Application Security',
    description: 'Practical validation of modern web application security principles, vulnerability identification, secure authentication/authorization, and remediation in accordance with OWASP standards.',
    verifiedStatus: 'VERIFIED // APPLICATION SECURITY',
    skillsCovered: [
      'Web Application Vulnerability Analysis',
      'OWASP Top 10 Exploitation & Remediation',
      'Session & Authentication Security',
      'Secure SDLC Integration'
    ]
  },
  {
    id: 'cnsp',
    title: 'Certified Network Security Practitioner (CNSP)',
    issuer: 'The SecOps Group',
    category: 'Network Security',
    description: 'Practical credential assessing network security architecture, vulnerability scanning, perimeter defense, firewall configuration auditing, and network layer risk mitigation.',
    verifiedStatus: 'VERIFIED // NETWORK DEFENSE',
    skillsCovered: [
      'Network Vulnerability Assessment',
      'Perimeter & Service Hardening',
      'Network Architecture Review',
      'Protocol Analysis'
    ]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    title: 'On the Spot (Team) Award',
    organization: 'Tata Consultancy Services',
    year: '2026',
    description: 'Recognised for strong performance and high-impact delivery during a critical client security engagement, ensuring deep vulnerability discovery and zero-disruption execution.',
    type: 'Award'
  },
  {
    title: 'Top 100 Finalist — TCS HackQuest Season 7',
    organization: 'Tata Consultancy Services',
    year: 'Season 7',
    description: "Ranked among the top 100 finalists nationwide in TCS's premier ethical hacking, reverse engineering, web exploitation, and capture-the-flag (CTF) competition.",
    type: 'CTF Finalist'
  }
];

export const LABS_DATA: LabItem[] = [
  {
    platform: 'Hack The Box & Active Directory Homelab',
    focus: 'Offensive Enterprise Lab & Exploitation',
    description: 'Completed the extensive CPTS curriculum path and constructed an isolated multi-host Active Directory laboratory to replicate real-world enterprise infrastructure attacks.',
    topics: [
      'Multi-Host AD Domain Architecture',
      'Kerberos Attacks (Kerberoasting, AS-REP Roasting, Pass-the-Ticket)',
      'BloodHound & NetExec Attack-Path Graphing',
      'Pivoting with Chisel & Proxychains',
      'Domain Privilege Escalation & Delegation Abuse',
      'Post-Exploitation & Credential Extraction'
    ],
    keyHighlights: [
      'Completed CPTS Path on Hack The Box',
      'Custom Multi-Host AD Environment',
      'Kerberos & Credential Dumping Simulation'
    ]
  },
  {
    platform: 'PortSwigger Web Security Academy',
    focus: 'Web Application & API Security Research',
    description: 'In-depth laboratory experimentation across modern web security threat vectors, advanced business logic flaws, and emerging LLM application vulnerabilities.',
    topics: [
      'Access Control & Multi-Tenant IDOR/BOLA',
      'Authentication & JWT Signature / Claim Attacks',
      'Business Logic & State Confusion Flaws',
      'SQL, NoSQL, and Server-Side Template Injection',
      'Cross-Site Scripting (XSS) & Contextual Escapes',
      'Server-Side Request Forgery (SSRF) & Cloud Metadata Access',
      'Cross-Site Request Forgery (CSRF)',
      'Web LLM & AI Agent Injection Vulnerabilities'
    ],
    keyHighlights: [
      'Advanced Access Control & BOLA Exploits',
      'Cloud Metadata SSRF Scenarios',
      'Hands-on Web LLM & Prompt Injection Labs'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Penetration Testing',
    description: 'End-to-end vulnerability assessment across web, network, and cloud boundaries.',
    skills: [
      { name: 'Web Application Security', highlight: true },
      { name: 'API Security Testing', highlight: true },
      { name: 'Mobile App Penetration Testing', highlight: true },
      { name: 'Internal Network Testing' },
      { name: 'External Network Testing' },
      { name: 'Active Directory Security', highlight: true },
      { name: 'Entra ID (Azure AD)' },
      { name: 'AWS Security Testing', highlight: true }
    ]
  },
  {
    name: 'Red Teaming',
    description: 'Adversary emulation, attack paths, and objective-driven scenario planning.',
    skills: [
      { name: 'Engagement Planning & Rules of Engagement (RoE)', highlight: true },
      { name: 'Attack-Path Analysis' },
      { name: 'Phishing Simulation Planning' },
      { name: 'MITRE ATT&CK Mapping', highlight: true }
    ]
  },
  {
    name: 'Core Security Tools',
    description: 'Industry-standard penetration testing, enumeration, and interception suites.',
    skills: [
      { name: 'Burp Suite Professional', highlight: true },
      { name: 'Nmap', highlight: true },
      { name: 'Metasploit Framework' },
      { name: 'BloodHound', highlight: true },
      { name: 'NetExec (CrackMapExec)' },
      { name: 'Impacket Suite', highlight: true },
      { name: 'Nessus Vulnerability Scanner' },
      { name: 'OWASP ZAP' },
      { name: 'Postman' },
      { name: 'Kali Linux' }
    ]
  },
  {
    name: 'Mobile & Cloud Security',
    description: 'Dynamic instrumentation, reverse engineering, and cloud posture auditing.',
    skills: [
      { name: 'Frida (Dynamic Instrumentation)', highlight: true },
      { name: 'Objection (Runtime Exploration)' },
      { name: 'JADX (Decompiler)' },
      { name: 'AWS IAM Policy Auditing', highlight: true },
      { name: 'AWS S3 Bucket Security' },
      { name: 'AWS EC2 & VPC Configuration' },
      { name: 'ScoutSuite' },
      { name: 'Prowler' }
    ]
  },
  {
    name: 'Application Security (AppSec)',
    description: 'Secure development lifecycle, code analysis, and threat prevention.',
    skills: [
      { name: 'Secure Code Review (Checkmarx + Manual)', highlight: true },
      { name: 'Static Application Security Testing (SAST)', highlight: true },
      { name: 'Dynamic Application Security Testing (DAST)' },
      { name: 'Software Composition Analysis (SCA)' },
      { name: 'Threat Modelling' },
      { name: 'Secure SDLC Integration', highlight: true },
      { name: 'DevSecOps Practices' }
    ]
  },
  {
    name: 'AI & LLM Security',
    description: 'Emerging threat testing for generative AI models and autonomous agent integrations.',
    skills: [
      { name: 'AI-Agent & LLM Application Testing', highlight: true },
      { name: 'Prompt Injection Assessment', highlight: true },
      { name: 'Excessive Agency Analysis' },
      { name: 'OWASP Top 10 for LLM Applications', highlight: true },
      { name: 'MITRE ATLAS Framework' }
    ]
  },
  {
    name: 'Methodologies & Frameworks',
    description: 'Recognized industry standards guiding scoped assessments and vulnerability taxonomy.',
    skills: [
      { name: 'OWASP WSTG (Web Security Testing Guide)', highlight: true },
      { name: 'OWASP ASVS (Application Security Verification)', highlight: true },
      { name: 'OWASP MASTG (Mobile App Security)', highlight: true },
      { name: 'OWASP API Security Top 10', highlight: true },
      { name: 'PTES (Penetration Testing Execution Standard)' },
      { name: 'MITRE ATT&CK Matrix' },
      { name: 'CVSS v3.1 Scoring' },
      { name: 'PCI DSS Standards' }
    ]
  },
  {
    name: 'Scripting & Infrastructure',
    description: 'Automation, payload delivery, scripting, and container fundamentals.',
    skills: [
      { name: 'Python (Custom Exploit & Tool Scripting)', highlight: true },
      { name: 'Bash Scripting' },
      { name: 'JavaScript' },
      { name: 'Docker (Working Knowledge)' },
      { name: 'Kubernetes (Working Knowledge)' }
    ]
  }
];

export const METHODOLOGY_DETAILS = [
  {
    id: 'wstg',
    title: 'OWASP WSTG v4.2',
    category: 'Web Security Testing',
    focus: 'Comprehensive baseline for evaluating web application logic, authorization boundaries, input handling, and session persistence.',
    coverage: ['Information Gathering', 'Identity & Auth Testing', 'Input Validation & Injection', 'Business Logic Flaws', 'Client-Side Controls']
  },
  {
    id: 'api-top10',
    title: 'OWASP API Security Top 10',
    category: 'API Security',
    focus: 'Targeted assessment of REST and microservice endpoints against authorization and tenant isolation failures.',
    coverage: ['BOLA / IDOR Testing', 'Broken Authentication', 'Property Level Authorization', 'Unrestricted Resource Consumption', 'SSRF via Endpoints']
  },
  {
    id: 'mastg',
    title: 'OWASP MASTG',
    category: 'Mobile Security',
    focus: 'Static and dynamic mobile assessment across Android and iOS binaries with runtime hooking and SSL unpinning.',
    coverage: ['Local Data Storage', 'Cryptography Checks', 'Frida Hooking & Objection', 'Reverse Engineering (JADX)', 'Network Communication']
  },
  {
    id: 'att-ck',
    title: 'MITRE ATT&CK & ATLAS',
    category: 'Threat Emulation & AI',
    focus: 'Tactics, techniques, and procedures (TTPs) mapping for adversary emulation in Active Directory, Azure, and LLM applications.',
    coverage: ['Initial Access & Persistence', 'Privilege Escalation', 'Credential Access & Kerberos', 'Lateral Movement', 'LLM Prompt Injection / ATLAS']
  }
];
