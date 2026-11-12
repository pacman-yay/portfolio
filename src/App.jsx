import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import './index.css';

const accents = ['#ffffff'];

const missionsData = [
  {
    id: 'case-mgmt',
    meta: '01 // RBAC & CASE MGMT',
    year: '2026',
    title: 'CASE MANAGEMENT DASHBOARD',
    shortDesc: 'A real-time crime case management dashboard with RBAC and MFA.',
    details: {
      features: [
        'Role-Based Access Control (RBAC) for secure case tracking.',
        'Multi-Factor Authentication (MFA) implementation.',
        'Automated status updates and rate-limiting.',
      ],
      techStack: 'React.js, Python, PostgreSQL',
      link: '#'
    }
  },
  {
    id: 'firewall',
    meta: '02 // PYTHON FIREWALL',
    year: '2025',
    title: 'PYTHON-BASED FIREWALL',
    shortDesc: 'A custom firewall using Python with rule-based IP/port filtering.',
    details: {
      features: [
        'Rule-based filtering (IP, port, protocol).',
        'Secure network traffic management.',
        'Real-time traffic logging and analysis.'
      ],
      techStack: 'Python, Socket Programming',
      link: 'https://github.com/pacman-yay/project.git'
    }
  },
  {
    id: 'hive',
    meta: '03 // DDOS MONITORING',
    year: '2025',
    title: 'HIVE SECURITY DASHBOARD',
    shortDesc: 'Python dashboard with real-time traffic monitoring & DDoS detection.',
    details: {
      features: [
        'Real-time traffic monitoring.',
        'DDoS detection capabilities.',
        'Deep packet analysis.'
      ],
      techStack: 'Python, Scapy, Matplotlib',
      link: 'https://github.com/pacman-yay/HIVE.git'
    }
  },
  {
    id: 'moosik',
    meta: '04 // ANDROID STREAMING',
    year: '2026',
    title: 'MOOSIK STREAMING APP',
    shortDesc: 'High-performance music streaming & local player for Android.',
    details: {
      features: [
        'Visually stunning glassmorphic UI using Jetpack Compose.',
        'Multi-Source Integration (YouTube Music, Spotify, etc).',
        'Real-time, synchronized lyrics (LRCLIB, Genius, YouTube).',
        'Offline mode with smart caching and configurable download quality.',
        'Artist Mixes powered by recommendation models & sleep timer.',
        'High-fidelity audio engine using Media3/ExoPlayer.',
      ],
      techStack: 'Kotlin, Jetpack Compose, Material 3, Media3, Room, Hilt, Retrofit',
      link: 'https://github.com/pacman-yay/moosik-app'
    }
  },
  {
    id: 'zepto-osint',
    meta: '05 // OSINT & PRIVACY',
    year: '2026',
    title: 'ZEPTO OSINT ASSESSMENT',
    shortDesc: 'Open-Source Intelligence investigation mapping digital footprint and regulatory risks.',
    buttonText: 'VIEW FULL REPORT',
    details: {
      findings: [
        'Mapped public digital footprint including subdomains, DNS records, and SSL/TLS certificates.',
        'Analyzed data privacy and consumer profiling mechanisms including emotional/mood-based targeting.',
        'Identified significant privacy risks and regulatory exposure under India\'s DPDP Act 2023.',
        'Conducted cross-domain pattern analysis correlating aggressive data collection with business strategy.'
      ],
      techStack: 'OSINT Tools (dnsdumpster, Subfinder, urlscan.io, Wappalyzer), Manual Analysis',
      link: '/zepto-osint.pdf'
    }
  },
  {
    id: 'apkphage',
    meta: '06 // MALWARE SANDBOX',
    year: '2026',
    title: 'APKPHAGE MALWARE SANDBOX',
    shortDesc: 'Containerized Android malware detonation sandbox with a secure dynamic analysis pipeline and DevSecOps CI/CD.',
    details: {
      features: [
        'Zero-dependency sandbox using Redroid, QEMU, Frida, and Mitmproxy for dynamic analysis.',
        'Static analysis utilizing Jadx, Apktool, and Yara rules with Shannon entropy scanning.',
        'DevSecOps CI/CD in GitHub Actions enforcing SAST, secrets scanning, and Dockerfile linting.',
        'Trivy container CVE scanning configured as a hard gate failing on critical vulnerabilities.'
      ],
      techStack: 'Python, Docker, Frida, Mitmproxy, Tor, GitHub Actions',
      link: '#'
    }
  },
  {
    id: 'vapt-assessment',
    meta: '07 // INDEPENDENT VAPT',
    year: '2026',
    title: 'INDEPENDENT VAPT ASSESSMENT',
    shortDesc: 'Black-box VAPT engagement on a high-traffic public web platform following OWASP WSTG methodology.',
    buttonText: 'VIEW FULL REPORT',
    details: {
      findings: [
        'Discovered Critical Broken Object-Level Authorization (IDOR) leading to cross-account read/write and account takeover.',
        'Identified high-severity CSRF token bypass enabling cross-session request forgery.',
        'Found missing brute-force protections on the login endpoint (no lockout, CAPTCHA, or rate-limiting).',
        'Uncovered origin server exposure behind a CDN/WAF and direct IP reachability.'
      ],
      techStack: 'Burp Suite, subfinder, amass, dnsrecon, httpx, nmap, ffuf, nuclei',
      link: '/pngtree-vapt.pdf'
    }
  },
  {
    id: 'home-lab',
    meta: '08 // HOMELAB INFRA',
    year: '2026',
    title: 'HOME LAB SETUP',
    shortDesc: 'A home lab server repurposed from an old Lenovo laptop, managed via a custom React dashboard and connected securely via Tailscale and SSH.',
    buttonText: 'VIEW REPO',
    details: {
      findings: [
        'Secure Authentication System guarding the dashboard interface.',
        'Real-time System Analytics featuring live CPU/RAM metrics and a streaming log console.',
        'Advanced File Browser with nested directories, context menus, and a drag-and-drop upload zone.',
        'Custom Advanced Video Player with media queues, 10-second skips, and aspect ratio controls.',
        'Simulated Terminal Tab for interacting with basic command-line utilities.',
        'Optimized Mobile UX featuring solid dark floating islands and custom webkit scrollbars.'
      ],
      techStack: 'Lenovo Hardware, Tailscale, SSH, React (v19), Vite (v8), Vanilla CSS',
      link: 'https://github.com/pacman-yay/home-lab.git'
    }
  },
  {
    id: 'recon-it',
    meta: '09 // RECON AUTOMATION',
    year: '2026',
    title: 'RECON-IT',
    shortDesc: 'A unified bash tool combining powerful reconnaissance utilities like whois, subfinder, dnsrecon, dnsdumpster, and httpx into a single automated workflow.',
    buttonText: 'VIEW SCRIPT',
    details: {
      findings: [
        'Automated sub-domain enumeration using Subfinder.',
        'Integrated comprehensive DNS enumeration with dnsrecon and DNSDumpster.',
        'Fast HTTP probing via httpx to rapidly identify live targets.',
        'Streamlined WHOIS lookup automation to instantly pull domain registration records.',
        'Consolidated multiple CLI tool outputs into a single, cohesive analysis workflow.'
      ],
      techStack: 'Bash Scripting, whois, subfinder, dnsrecon, dnsdumpster, httpx',
      link: 'https://github.com/pacman-yay/Recon-it.git'
    }
  }
];

const MissionModal = ({ mission, onClose }) => {
  if (!mission) return null;

  const btnText = mission.buttonText || "VIEW REPO";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <span className="hud-label text-accent">{mission.meta} // {mission.year}</span>
        <h2>{mission.title}</h2>

        <p style={{ fontSize: '16px', color: '#fff', marginBottom: '32px' }}>
          {mission.shortDesc}
        </p>

        <div className="dash" style={{ opacity: 0.2, margin: '24px 0' }}></div>

        {mission.details.features && (
          <>
            <h3>FEATURES & CAPABILITIES</h3>
            <ul>
              {mission.details.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {mission.details.findings && (
          <>
            <h3>KEY FINDINGS</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              {mission.details.findings.map((finding, i) => (
                <li
                  key={i}
                  className="text-accent hacker-text"
                  style={{
                    marginBottom: '16px',
                    lineHeight: '1.6'
                  }}
                >
                  <TypewriterText text={`> ${finding}`} speed={10} delay={(i * 300) + 100} />
                </li>
              ))}
            </ul>
          </>
        )}

        <h3>TECHNICAL ARCHITECTURE</h3>
        <p>{mission.details.techStack}</p>

        <div style={{ marginTop: '40px' }}>
          {mission.id === 'case-mgmt' ? (
            <div className="modal-pill-btn confidential-btn" style={{ display: 'inline-flex' }}>
              [ RESTRICTED ACCESS ] <ArrowUpRight size={14} />
            </div>
          ) : (
            <a href={mission.details.link} target="_blank" rel="noopener noreferrer" className="modal-pill-btn">
              [ {btnText} ] <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const researchData = [
  {
    id: 'paper-1',
    meta: 'RESEARCH / SECURITY',
    year: '2026',
    title: 'Active Cryptographic Tissue-Impedance Watermarking for Hardware-Root-of-Trust Biometric Authentication',
    shortDesc: 'A comprehensive study on advanced biometric authentication techniques leveraging tissue-impedance watermarking for secure hardware-root-of-trust systems.',
    link: '/Tissue Impedance watermarking_abstract.pdf'
  }
];

const CustomPDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#0a0a0a' }}>
      {/* TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)' }}>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer', opacity: pageNumber <= 1 ? 0.3 : 0.8, display: 'flex', alignItems: 'center' }}
            title="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="hud-label" style={{ minWidth: '60px', textAlign: 'center' }}>
            <span style={{ color: 'var(--accent)' }}>{pageNumber}</span> / {numPages || '--'}
          </span>

          <button
            onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer', opacity: pageNumber >= numPages ? 0.3 : 0.8, display: 'flex', alignItems: 'center' }}
            title="Next Page"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }} title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <span className="hud-label" style={{ minWidth: '50px', textAlign: 'center' }}>{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(3, s + 0.25))} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }} title="Zoom In">
              <ZoomIn size={18} />
            </button>
          </div>

          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }}></div>

          <a href={url} download style={{ color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', opacity: 0.9 }} title="Download Original PDF">
            <Download size={18} />
          </a>
        </div>
      </div>

      {/* VIEWER AREA */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '24px', backgroundColor: 'transparent' }}>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="hud-label blink text-accent" style={{ marginTop: '40px' }}>DECRYPTING PAYLOAD...</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="pdf-page-shadow"
          />
        </Document>
      </div>
    </div>
  );
};

const PaperModal = ({ paper, onClose }) => {
  if (!paper) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1200px', height: '90vh', padding: 0, display: 'flex', flexDirection: 'column', background: 'rgba(10,10,10,0.98)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
          <span className="hud-label text-accent">{paper.meta} // {paper.year}</span>
          <h2 className="card-title" style={{ marginTop: '12px', fontSize: '24px', paddingRight: '40px' }}>{paper.title}</h2>
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          {paper.link && paper.link !== '#' ? (
            <CustomPDFViewer url={paper.link} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.5)' }} className="hud-label">
              [ PAYLOAD UNAVAILABLE ]
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TypewriterText = ({ text, speed = 30, delay = 0 }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);
  return <span>{display}</span>;
}

const ScrambleText = ({ text, delay = 0 }) => {
  const [display, setDisplay] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\\\/[]{}—=+*^?#________';

  useEffect(() => {
    let iteration = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(text.split('').map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{display}</span>;
}

const HoverScrambleText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\\\/[]{}—=+*^?#';
  const intervalRef = React.useRef(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(text.split('').map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2;
    }, 30);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setDisplay(text);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: 'inline-block' }}>
      {display}
    </span>
  );
};

const ThreatRating = () => {
  return (
    <div className="card reveal-up is-visible">
      <div className="card-meta">
        <span className="text-accent blink">LIVE FEED</span>
        <span>THREAT RATING</span>
      </div>
      <h2 className="card-title" style={{ fontSize: '20px', marginBottom: '24px' }}>TRAINING & CLEARANCE</h2>

      {/* PortSwigger */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <div>
            <span className="hud-label" style={{ color: '#ffffff', display: 'block', marginBottom: '4px', letterSpacing: '1.2px' }}>PORTSWIGGER ACADEMY</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>akshayavardhan20061418...</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="hud-label" style={{ color: '#fff', fontSize: '16px', letterSpacing: '1px' }}>APPRENTICE</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '2px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>LABS SOLVED</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)', color: '#ffffff' }}>50+</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '2px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>VULN CLASSES</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)', color: '#ffffff' }}>12</div>
          </div>
        </div>
      </div>

      {/* HackTheBox */}
      <div style={{ paddingBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <div>
            <span className="hud-label" style={{ color: '#ffffff', display: 'block', marginBottom: '4px', letterSpacing: '1.2px' }}>HACKTHEBOX</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>@kira1402</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="hud-label" style={{ color: '#fff', fontSize: '16px', letterSpacing: '1px' }}>NOOB</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '2px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>MACHINES OWNED</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)', color: '#ffffff' }}>05</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px', borderRadius: '2px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>RESPECT</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)', color: '#ffffff' }}>0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSection = () => {
  return (
    <section id="skills" className="section-container" style={{ paddingTop: '40px' }}>
      <div className="section-header reveal-up is-visible">
        <span className="hud-label text-accent">01 // DOSSIER</span>
        <div className="dash"></div>
      </div>

      <div className="grid-layout">
        {/* DOSSIER */}
        <div className="card reveal-up is-visible">
          <div className="card-meta">
            <span>CLEARANCE: TOP SECRET</span>
            <span className="text-accent">ACTIVE</span>
          </div>
          <h2 className="card-title" style={{ fontSize: '24px', marginBottom: '24px' }}>OPERATIVE PROFILE</h2>
          <p className="card-desc" style={{ marginBottom: '16px' }}>
            Pre-final year Cybersecurity undergraduate transitioning into DevSecOps, with a strong offensive-security foundation in Vulnerability Assessment & Penetration Testing (VAPT).
          </p>
          <p className="card-desc" style={{ marginBottom: '16px' }}>
            Experienced in independently discovering high-severity vulnerabilities (IDOR, CSRF) on live production targets, and building multi-stage security pipelines with hard fail-on-finding gates to secure the software delivery lifecycle.
          </p>
          <ul className="card-bullets" style={{ marginTop: '32px' }}>
            <li>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Offensive Security</span>: Vulnerability Assessment & Pentesting (VAPT), OWASP Top 10, Web & API Exploitation
            </li>
            <li>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Defensive & DevSecOps</span>: Automated Security CI/CD, Container Sandboxing, Vulnerability Scanning
            </li>
            <li>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Full-Stack Systems Engineering</span>: React.js, Python Sockets, Kotlin & Native Android
            </li>
          </ul>
        </div>

        {/* THREAT RATING */}
        <ThreatRating />
      </div>
    </section>
  );
};

const CyberDecal = ({ size = 'small', className = '' }) => {
  return (
    <div className={`cyber-decal size-${size} ${className}`}>
      <div className="cyber-bar"></div>
      <div className="cyber-bar"></div>
      <div className="cyber-bar"></div>
      <div className="cyber-bar"></div>
    </div>
  );
};

const SkillsStrip = () => {
  const tacticalArsenal = [
    {
      sector: '01 // OFFENSIVE OPS',
      status: 'OPERATIONAL',
      title: 'OFFENSIVE OPS & VAPT',
      desc: 'Web & API penetration testing, binary reverse engineering, vulnerability research, and active target reconnaissance.',
      skills: [
        { name: 'Burp Suite', role: 'Web & API VAPT' },
        { name: 'Frida & Jadx', role: 'Dynamic APK Hooking' },
        { name: 'OWASP Top 10', role: 'WSTG Methodology' },
        { name: 'Nmap & Wireshark', role: 'Network Recon' },
        { name: 'Subfinder & Httpx', role: 'Attack Surface Mapping' },
        { name: 'Metasploit', role: 'Exploit Simulation' },
      ]
    },
    {
      sector: '02 // DEVSECOPS & DEFENSE',
      status: 'HARDENED',
      title: 'DEVSECOPS & DEFENSE',
      desc: 'Container sandboxing, automated pipeline security gates, vulnerability scanning, and zero-trust mesh networking.',
      skills: [
        { name: 'Docker', role: 'Isolated Sandboxing' },
        { name: 'GitHub Actions', role: 'CI/CD Security Gates' },
        { name: 'Trivy & SAST', role: 'CVE & Secrets Scanning' },
        { name: 'Linux Hardening', role: 'Kernel & Access Control' },
        { name: 'Tailscale & VPN', role: 'Zero-Trust Mesh Net' },
        { name: 'Scapy', role: 'Packet & DDoS Analysis' },
      ]
    },
    {
      sector: '03 // SYSTEMS & CODE',
      status: 'PRODUCTION',
      title: 'ENGINEERING & CODE',
      desc: 'Full-stack mission dashboards, low-level network programming, and high-performance native Android applications.',
      skills: [
        { name: 'Python', role: 'Automation & Sockets' },
        { name: 'Kotlin & Android', role: 'Jetpack Compose & Media3' },
        { name: 'React.js', role: 'Mission Dashboards' },
        { name: 'Bash Scripting', role: 'POSIX Automation' },
        { name: 'PostgreSQL', role: 'Relational Data Stores' },
        { name: 'REST APIs & RBAC', role: 'Secure Architecture' },
      ]
    }
  ];

  return (
    <div className="arsenal-grid">
      {tacticalArsenal.map((category, idx) => (
        <div key={category.sector} className={`arsenal-card reveal-up ${idx > 0 ? `delay-${idx * 100}` : ''}`}>
          <div className="card-meta">
            <span>{category.sector}</span>
            <span className="arsenal-badge-status">
              <span className="blink arsenal-badge-dot"></span>
              {category.status}
            </span>
          </div>

          <h3 className="card-title" style={{ fontSize: '20px', letterSpacing: '1px', marginBottom: '12px' }}>
            {category.title}
          </h3>

          <p className="card-desc" style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.6', minHeight: '42px' }}>
            {category.desc}
          </p>

          <div className="arsenal-list">
            {category.skills.map((skill) => (
              <div key={skill.name} className="arsenal-item">
                <div className="arsenal-item-name">
                  <span className="arsenal-item-arrow">&gt;</span>
                  <span>{skill.name}</span>
                </div>
                <span className="arsenal-item-role">{skill.role}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


const ContactForm = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    setStatus('TRANSMITTING...');

    try {
      const response = await fetch('https://formspree.io/f/xaqgggre', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('TRANSMISSION SUCCESSFUL');
        form.reset();
      } else {
        setStatus('TRANSMISSION FAILED');
      }
    } catch (error) {
      setStatus('CONNECTION ERROR');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="name"
          required
          placeholder="IDENTIFICATION (NAME)"
          style={{ flex: '1 1 200px', padding: '12px 16px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)' }}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="COMM LINK (EMAIL)"
          style={{ flex: '1 1 200px', padding: '12px 16px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)' }}
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="ENCRYPTED PAYLOAD (MESSAGE)"
        rows="4"
        style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)', resize: 'vertical' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button type="submit" className="btn-nothing-white" style={{ border: 'none', cursor: 'pointer', padding: '12px 24px', letterSpacing: '2px' }}>
          [ SEND PAYLOAD ]
        </button>
        {status && <span className="hud-label" style={{ color: '#ffffff' }}>{status}</span>}
      </div>
    </form>
  );
};

const App = () => {
  const [accentIdx, setAccentIdx] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const accents = ['#5b8def'];

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accents[accentIdx]);
  }, [accentIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    setAccentIdx((prev) => (prev + 1) % accents.length);
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <a href="#top" className="island island-logo hud-label text-muted" style={{ gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '18px', fontWeight: 900 }}>AKSHAY</span>
          <span className="hide-mobile">PORTFOLIO</span>
        </a>

        <nav className="island nav-links">
          <a href="#skills" className="nav-link hud-label"><HoverScrambleText text="SKILLS" /></a>
          <a href="#work" className="nav-link hud-label"><HoverScrambleText text="MISSIONS" /></a>
          <a href="#experience" className="nav-link hud-label"><HoverScrambleText text="EXPERIENCE" /></a>
          <a href="#contact" className="nav-link hud-label"><HoverScrambleText text="CONTACT" /></a>
        </nav>

        <div className="header-right" style={{ position: 'absolute', right: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/resume.pdf" download="resume.pdf" className="island hud-label hide-mobile" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' }}>
            EXTRACT DOSSIER
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div style={{ paddingTop: '20px', zIndex: 2 }}>
          <p className="hero-subtitle reveal-up is-visible">CYBER SECURITY UNDERGRADUATE</p>
          <p className="hud-label text-muted-75 reveal-up delay-100 is-visible" style={{ letterSpacing: '2px' }}>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>OFFENSIVE (VAPT)</span>
            <span style={{ opacity: 0.4, margin: '0 8px' }}>·</span>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>DEFENSIVE (DEVSECOPS)</span>
            <span style={{ opacity: 0.4, margin: '0 8px' }}>·</span>
            <span>SYSTEMS ENGINEERING</span>
          </p>
        </div>

        <div className="hero-content">
          <div className="hero-title-container">
            <h1 className="hero-name">
              <span className="hero-name-line"><span className="hero-first-name">AKSHAYA</span></span>
              <span className="hero-name-line" style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                <span><span className="hero-last-name">VARDHAN</span>&nbsp;<span className="hero-last-name">S.</span></span>
                <CyberDecal size="hero" />
              </span>
            </h1>
            <div className="hero-tags reveal-up delay-300 is-visible">
              <span className="hud-label hero-tag">
                <span className="dot" style={{ background: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
                <span style={{ color: '#ffffff' }}>OFFENSIVE SECURITY</span>
              </span>
              <span className="hud-label hero-tag">
                <span className="dot" style={{ background: 'rgba(255, 255, 255, 0.6)', boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}></span>
                <span style={{ color: '#ffffff' }}>DEVSECOPS & INFRA</span>
              </span>
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="CHENNAI, INDIA" delay={500} /></span>
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="B.E CYBER SECURITY" delay={900} /></span>
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="AVAILABLE FOR HIRE" delay={1300} /></span>
            </div>
          </div>
        </div>

        <div className="hud-label text-muted-75 reveal-up delay-300 is-visible" style={{ position: 'relative', marginTop: '40px', alignSelf: 'flex-end' }}>
          <span className="blink text-accent">▼</span> SCROLL
        </div>
      </section>

      <ProfileSection />

      <section id="skills" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">TECHNICAL ARSENAL</span>
          <CyberDecal size="small" />
        </div>
        <SkillsStrip />
      </section>

      {/* WORK / PROJECTS */}
      <section id="work" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">FEATURED MISSIONS</span>
          <CyberDecal size="small" />
        </div>

        <div className="grid-layout">
          {missionsData.map((mission, idx) => (
            <div key={mission.id} className={`card reveal-up ${idx > 0 ? 'delay-' + (idx * 100) : ''}`}>
              <div className="card-meta">
                <span>{mission.meta}</span>
                <span>{mission.year}</span>
              </div>
              <h3 className="card-title">{mission.title}</h3>
              <p className="card-desc">
                {mission.shortDesc}
              </p>
              <button onClick={() => setSelectedMission(mission)} className="modal-pill-btn">
                [ MORE DETAILS ]
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">PRACTICAL EXPERIENCE</span>
          <CyberDecal size="small" />
        </div>

        <div className="grid-layout">
          {/* Exp 1 */}
          <div className="card reveal-up">
            <div className="card-meta">
              <span>01 // TAMIL NADU CYBER CRIME WING</span>
              <span>JUN 2026 — JUL 2026</span>
            </div>
            <h3 className="card-title" style={{ fontSize: '24px' }}>CYBERSECURITY INTERN</h3>
            <ul className="card-bullets">
              <li>Developed a real-time case management dashboard used by investigating officers to create, update, and track cybercrime case records end-to-end.</li>
              <li>Built the frontend in React.js with Python-driven backend automation, enabling timely status updates across the case lifecycle.</li>
              <li>Implemented Role-Based Access Control (RBAC) to enforce permission boundaries across distinct user roles (officers, supervisors, admins).</li>
              <li>Hardened the application with Multi-Factor Authentication (MFA) and endpoint rate-limiting to mitigate credential-based attacks.</li>
              <li>Gained direct exposure to how real cybercrime cases are triaged, documented, and escalated within a law-enforcement workflow.</li>
            </ul>
          </div>

          {/* Exp 2 */}
          <div className="card reveal-up delay-100">
            <div className="card-meta">
              <span>02 // ASCIZEN ACADEMY</span>
              <span>MAR 2026 — MAY 2026</span>
            </div>
            <h3 className="card-title" style={{ fontSize: '24px' }}>VAPT INTERN</h3>
            <ul className="card-bullets">
              <li>Applied OWASP Top 10 methodology across live web application targets to identify and validate security flaws.</li>
              <li>Practiced network enumeration and Linux-based offensive tooling through structured, CTF-driven exploit exercises.</li>
              <li>Authored findings using professional VAPT reporting standards suitable for client and audit review.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">RESEARCH PAPERS</span>
          <CyberDecal size="small" />
        </div>

        <div className="grid-layout">
          {researchData.map((paper, idx) => (
            <div key={paper.id} className={`card reveal-up ${idx > 0 ? 'delay-' + (idx * 100) : ''}`}>
              <div className="card-meta">
                <span>01 // ACTIVE BIOMETRIC AUTHENTICATION</span>
                <span>{paper.year}</span>
              </div>
              <h3 className="card-title">{paper.title}</h3>
              <p className="card-desc">
                {paper.shortDesc}
              </p>
              <button onClick={() => setSelectedPaper(paper)} className="modal-pill-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                [ READ PAPER ] <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">SECURE COMM CHANNEL</span>
          <CyberDecal size="small" />
        </div>

        <div className="grid-layout">
          <div className="card reveal-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="card-title" style={{ fontSize: '24px', marginBottom: '16px' }}>INITIATE TRANSMISSION</h3>
            <p className="card-desc" style={{ marginBottom: '32px' }}>
              Currently open for new opportunities across Offensive Security (VAPT) and Defensive DevSecOps. Whether you have an engagement, project proposal, or want to collaborate, my inbox is open.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://github.com/akshaya14-byte" target="_blank" rel="noreferrer" className="btn-nothing-outline hud-label" style={{ padding: '10px 20px', borderRadius: '2px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>GITHUB <ArrowUpRight size={16} /></a>
              <a href="https://www.linkedin.com/in/akshayavardhan-s" target="_blank" rel="noreferrer" className="btn-nothing-outline hud-label" style={{ padding: '10px 20px', borderRadius: '2px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>LINKEDIN <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="card reveal-up delay-100">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <span className="hud-label text-muted-75">AKSHAYAVARDHAN S. &copy; 2026</span>


        <span className="hud-label text-muted-75 social-links" style={{ display: 'flex', gap: '16px' }}>
          <a href="mailto:akshayavardhan20061418@gmail.com">EMAIL</a>
          <a href="https://github.com/akshaya14-byte" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="https://www.linkedin.com/in/akshayavardhan-s" target="_blank" rel="noreferrer">LINKEDIN</a>
        </span>
      </div>


      <MissionModal mission={selectedMission} onClose={() => setSelectedMission(null)} />
      <PaperModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </>
  );
};

export default App;
