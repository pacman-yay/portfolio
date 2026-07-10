import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import './index.css';

const accents = ['#00ffcc', '#ff00ff', '#ffff00', '#ff3333'];

const missionsData = [
  {
    id: 'case-mgmt',
    meta: 'REACT.JS / PYTHON',
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
    meta: 'PYTHON / NETWORKING',
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
      link: '#'
    }
  },
  {
    id: 'hive',
    meta: 'PYTHON / MONITORING',
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
      link: '#'
    }
  },
  {
    id: 'moosik',
    meta: 'ANDROID / KOTLIN',
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
    meta: 'OSINT / PRIVACY',
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
    id: 'pngtree-vapt',
    meta: 'PENETRATION TESTING',
    year: '2026',
    title: 'PNGTREE VAPT ASSESSMENT',
    shortDesc: 'Comprehensive Vulnerability Assessment and Penetration Testing on pngtree.com infrastructure.',
    buttonText: 'VIEW FULL REPORT',
    details: {
      findings: [
        'Discovered Critical Broken Object-Level Authorization (IDOR) leading to cross-account read/write.',
        'Identified high-severity CSRF token bypass enabling cross-session request forgery.',
        'Uncovered insufficient authentication attack protections missing rate-limiting on login endpoints.',
        'Disclosed origin server infrastructure bypassing Cloudflare\'s WAF and DDoS protections.'
      ],
      techStack: 'Burp Suite, subfinder, amass, dnsrecon, httpx, nmap, ffuf, nuclei, sqlmap',
      link: '/pngtree-vapt.pdf'
    }
  },
  {
    id: 'home-lab',
    meta: 'HOMELAB / REACT',
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
      link: '#'
    }
  },
  {
    id: 'recon-it',
    meta: 'BASH / RECON',
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
      link: '#'
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
          <a href={mission.details.link} target="_blank" rel="noopener noreferrer" className="modal-pill-btn">
            [ {btnText} ] <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TypewriterText = ({ text, speed = 20, delay = 0 }) => {
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
          if(index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        
        if(iteration >= text.length){
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
        if(index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if(iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2; 
    }, 30);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setDisplay(text);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{display: 'inline-block'}}>
      {display}
    </span>
  );
};

const ThreatRating = () => {
  return (
    <div className="card reveal-up is-visible" style={{ background: 'rgba(20,20,20,0.95)', border: '1px solid var(--accent)' }}>
      <div className="card-meta">
        <span className="text-accent blink">LIVE FEED</span>
        <span>THREAT RATING</span>
      </div>
      <h2 className="card-title" style={{ fontSize: '20px', marginBottom: '24px' }}>TRAINING & CLEARANCE</h2>
      
      {/* PortSwigger */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <span className="hud-label" style={{ color: '#ff6600', display: 'block', marginBottom: '4px' }}>PORTSWIGGER ACADEMY</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>akshayavardhan20061418...</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="hud-label" style={{ color: '#fff', fontSize: '18px' }}>APPRENTICE</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '4px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>LABS SOLVED</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)' }}>50+</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '4px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>VULN CLASSES</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)' }}>12</div>
          </div>
        </div>
      </div>

      {/* HackTheBox */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <span className="hud-label" style={{ color: '#9fef00', display: 'block', marginBottom: '4px' }}>HACKTHEBOX</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>@kira1402</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="hud-label" style={{ color: '#fff', fontSize: '18px' }}>NOOB</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '4px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>MACHINES OWNED</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)' }}>05</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '4px' }}>
            <div className="hud-label" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>RESPECT</div>
            <div style={{ fontSize: '16px', fontFamily: 'var(--font-mono)' }}>0</div>
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
        <div className="card reveal-up is-visible" style={{ background: 'rgba(20,20,20,0.95)' }}>
          <div className="card-meta">
            <span>CLEARANCE: TOP SECRET</span>
            <span className="text-accent">ACTIVE</span>
          </div>
          <h2 className="card-title" style={{ fontSize: '24px', marginBottom: '24px' }}>OPERATIVE PROFILE</h2>
          <p className="card-desc" style={{ marginBottom: '16px' }}>
            Undergraduate Cyber Security researcher and Full-Stack Engineer based in Chennai, India. Specializing in bridging the gap between offensive security testing and secure software development.
          </p>
          <p className="card-desc" style={{ marginBottom: '16px' }}>
            Passionate about building things from scratch—whether it's writing custom Python firewalls, developing high-performance Android streaming apps with Kotlin, or tearing down infrastructure in Homelab environments over Tailscale tunnels.
          </p>
          <ul className="card-bullets" style={{ marginTop: '32px' }}>
            <li>B.E Cyber Security Undergraduate</li>
            <li>Full-Stack Development (React, Python, Kotlin)</li>
            <li>Vulnerability Assessment & Penetration Testing</li>
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

const SystemStatus = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="island sysop-btn hud-label text-muted" 
        style={{ gap: '12px', cursor: 'pointer', border: 'none', padding: '0 24px', height: '48px', display: 'flex', alignItems: 'center' }}
      >
        <span className="blink sysop-desktop-only" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'inline-block', boxShadow: '0 0 8px var(--accent)' }}></span>
        <span className="sysop-text">SYS.OP NORMAL</span>
        <span className="sysop-text" style={{ opacity: 0.5 }}>|</span>
        <span className="sysop-text" style={{ color: 'var(--accent)' }}>{time}</span>
        
        <span className="sysop-mobile-only" style={{ display: 'none', fontSize: '18px', letterSpacing: '2px', marginLeft: '2px', transform: 'translateY(-2px)' }}>•••</span>
      </button>

      {isOpen && (
        <div className="island animate-dropdown" style={{ position: 'absolute', top: '60px', right: 0, width: '280px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', height: 'auto', borderRadius: '16px', background: 'rgba(14, 14, 14, 0.9)' }}>
          
          <div className="mobile-nav-links" style={{ width: '100%', display: 'none', flexDirection: 'column', gap: '16px', marginBottom: '8px' }}>
            <span className="hud-label text-accent" style={{ fontSize: '12px' }}>NAVIGATION</span>
            <a href="#work" className="nav-link hud-label" style={{ padding: 0, border: 'none', background: 'transparent' }}><HoverScrambleText text="MISSIONS" /></a>
            <a href="#experience" className="nav-link hud-label" style={{ padding: 0, border: 'none', background: 'transparent' }}><HoverScrambleText text="EXPERIENCE" /></a>
            <a href="#skills" className="nav-link hud-label" style={{ padding: 0, border: 'none', background: 'transparent' }}><HoverScrambleText text="SKILLS" /></a>
            <a href="#contact" className="nav-link hud-label" style={{ padding: 0, border: 'none', background: 'transparent' }}><HoverScrambleText text="CONTACT" /></a>
            <div className="dash" style={{ width: '100%', margin: '8px 0', opacity: 0.5 }}></div>
          </div>

          <span className="hud-label text-accent" style={{ fontSize: '12px' }}>SYSTEM SPECS</span>
          <div className="dash" style={{ width: '100%', margin: '8px 0', opacity: 0.5 }}></div>
          
          <div className="sysop-mobile-time" style={{ display: 'none', width: '100%', marginBottom: '8px', alignItems: 'center', gap: '8px' }}>
             <span className="blink" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'inline-block', boxShadow: '0 0 8px var(--accent)' }}></span>
             <span className="hud-label" style={{ color: 'var(--accent)' }}>SYS.OP NORMAL | {time}</span>
          </div>

          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', textTransform: 'none' }}>
            Developed and designed by<br/><strong style={{color: '#fff'}}>Akshaya Vardhan S.</strong>
          </p>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', textTransform: 'none' }}>
            Built with React & Vite. Custom CSS architecture with dynamic glassmorphism and CRT terminal effects.
          </p>
          <span className="hud-label text-muted-75" style={{ marginTop: '8px' }}>V 1.0.0 // ONLINE</span>
        </div>
      )}
    </div>
  );
};

const TerminalSkills = () => {
  const skills = ['Python', 'React.js', 'Android Dev', 'Burp Suite', 'Nmap', 'Wireshark', 'SQL', 'Linux', 'OWASP'];
  const [lines, setLines] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const terminalRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (terminalRef.current) observer.observe(terminalRef.current);
    
    return () => {
      if (terminalRef.current) observer.unobserve(terminalRef.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const bootSequence = [
      'INITIATING SECURE CONNECTION...',
      'BYPASSING FIREWALL... SUCCESS',
      'ESTABLISHING SSH TUNNEL @ 192.168.1.42',
      'ACCESS GRANTED. ROOT PRIVILEGES ACQUIRED.',
      'EXTRACTING ARSENAL PAYLOADS...',
      '=========================================='
    ];
    
    let currentLines = [];
    let delay = 0;

    bootSequence.forEach((line) => {
      setTimeout(() => {
        currentLines = [...currentLines, { text: line, type: 'boot' }];
        setLines(currentLines);
      }, delay);
      delay += 400 + Math.random() * 300;
    });

    skills.forEach((skill) => {
      setTimeout(() => {
        currentLines = [...currentLines, { text: skill, type: 'skill' }];
        setLines(currentLines);
      }, delay);
      delay += 800;
    });

    setTimeout(() => {
        currentLines = [...currentLines, { text: '==========================================', type: 'boot' }];
        currentLines = [...currentLines, { text: 'ALL PAYLOADS DEPLOYED.', type: 'boot' }];
        currentLines = [...currentLines, { text: 'CONNECTION TERMINATED.', type: 'boot' }];
        setLines(currentLines);
    }, delay + 500);

  }, [hasStarted]);

  return (
    <div className="terminal-container hacker-terminal reveal-up" ref={terminalRef}>
      <div className="terminal-body hacker-text">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line" style={{marginBottom: '4px'}}>
            {line.type === 'skill' ? (
              <>
                 <span style={{color: 'var(--accent)', fontWeight: 'bold'}}><ScrambleText text={`> ${line.text}`} /></span>
              </>
            ) : (
              <span style={{color: line.text.includes('SUCCESS') || line.text.includes('GRANTED') ? 'var(--accent)' : 'inherit'}}>
                <TypewriterText text={line.text} speed={15} />
              </span>
            )}
          </div>
        ))}
        {lines.length > 0 && <span className="blink" style={{background: 'var(--accent)', color: '#000', display: 'inline-block', width: '8px', height: '14px', marginTop: '4px'}}></span>}
      </div>
    </div>
  );
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { text: 'INITIATING SECURE CONNECTION...', type: 'boot' },
    { text: 'ACCESS GRANTED. ROOT PRIVILEGES ACQUIRED.', type: 'boot' },
    { text: 'Type "help" for a list of available commands.', type: 'boot' }
  ]);
  const [input, setInput] = useState('');
  const containerRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { text: `> ${trimmed}`, type: 'input' }];
    
    const args = trimmed.toLowerCase().split(' ');
    const base = args[0];

    switch(base) {
      case 'help':
        newHistory.push({ text: 'AVAILABLE COMMANDS: help, whoami, ls, clear, cat, sudo, date', type: 'output' });
        break;
      case 'whoami':
        newHistory.push({ text: 'akshaya_vardhan - Undergraduate Cyber Security Researcher & Full-Stack Engineer', type: 'output' });
        break;
      case 'ls':
        newHistory.push({ text: 'MISSIONS: case-mgmt firewall hive moosik zepto-osint pngtree-vapt home-lab recon-it', type: 'output' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'cat':
        if (args[1] === 'resume.pdf') {
          newHistory.push({ text: 'INITIATING DOWNLOAD: resume.pdf...', type: 'output' });
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (args[1]) {
          newHistory.push({ text: `cat: ${args[1]}: No such file or directory`, type: 'output' });
        } else {
          newHistory.push({ text: 'Usage: cat [filename]', type: 'output' });
        }
        break;
      case 'sudo':
        newHistory.push({ text: 'akshaya is not in the sudoers file. This incident will be reported.', type: 'output' });
        break;
      case 'date':
        newHistory.push({ text: new Date().toString(), type: 'output' });
        break;
      default:
        newHistory.push({ text: `Command not found: ${base}`, type: 'output' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="terminal-container hacker-terminal reveal-up is-visible" style={{ minHeight: '350px' }} onClick={() => inputRef.current?.focus()}>
      <div ref={containerRef} className="terminal-body hacker-text" style={{ padding: '24px', overflowY: 'auto', maxHeight: '450px', display: 'flex', flexDirection: 'column' }}>
        {history.map((line, i) => (
          <div key={i} className="terminal-line" style={{ marginBottom: '8px', color: line.type === 'input' ? '#fff' : 'inherit' }}>
            {line.type === 'boot' ? <TypewriterText text={line.text} speed={10} /> : line.text}
          </div>
        ))}
        
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ color: 'var(--accent)', marginRight: '8px' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand(input);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              outline: 'none',
              flex: 1,
              textShadow: '0 0 8px var(--accent)'
            }}
          />
        </div>
      </div>
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
        <button type="submit" className="btn-primary hud-label" style={{ border: 'none', cursor: 'pointer', padding: '12px 24px', letterSpacing: '2px', background: 'var(--accent)', color: '#000' }}>
          [ SEND PAYLOAD ]
        </button>
        {status && <span className="hud-label" style={{ color: status.includes('SUCCESS') ? '#00ffaa' : status.includes('TRANSMITTING') ? 'var(--accent)' : '#ff0055' }}>{status}</span>}
      </div>
    </form>
  );
};

const App = () => {
  const [accentIdx, setAccentIdx] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null);
  const accents = ['#00f0ff', '#0070ff', '#7000ff', '#ff0055'];

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
      <div className="noise" aria-hidden="true"></div>
      
      {/* HEADER */}
      <header>
        <a href="#top" className="island island-logo hud-label text-muted" style={{ gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '18px', fontWeight: 900 }}>AKSHAY</span>
          <span>PORTFOLIO</span>
        </a>
        
        <nav className="island nav-links">
          <a href="#work" className="nav-link hud-label"><HoverScrambleText text="MISSIONS" /></a>
          <a href="#experience" className="nav-link hud-label"><HoverScrambleText text="EXPERIENCE" /></a>
          <a href="#skills" className="nav-link hud-label"><HoverScrambleText text="SKILLS" /></a>
          <a href="#contact" className="nav-link hud-label"><HoverScrambleText text="CONTACT" /></a>
        </nav>
        
        <div className="header-right" style={{ position: 'absolute', right: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/resume.pdf" download="resume.pdf" className="island hud-label" style={{ color: 'var(--accent)', borderColor: 'var(--accent)', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' }}>
            [ EXTRACT DOSSIER ]
          </a>
          <SystemStatus />
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div style={{ paddingTop: '20px', zIndex: 2 }}>
          <p className="hero-subtitle reveal-up is-visible">CYBER SECURITY UNDERGRADUATE</p>
          <p className="hud-label text-muted-75 reveal-up delay-100 is-visible">VAPT · ANDROID APP DEV · ETHICAL HACKING · NETWORK ANALYSIS</p>
        </div>

        <div className="hero-content">
          <div className="hero-title-container">
            <h1 className="hero-name">
              <span className="hero-name-line"><span className="hero-first-name glitch" data-text="AKSHAYA">AKSHAYA</span></span>
              <span className="hero-name-line" style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                <span className="hero-last-name glitch" data-text="VARDHAN S.">VARDHAN S.</span>
                <CyberDecal size="hero" className="glitch" />
              </span>
            </h1>
            <div className="hero-tags reveal-up delay-300 is-visible">
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="CHENNAI, INDIA" delay={500} /></span>
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="B.E CYBER SECURITY" delay={900} /></span>
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="AVAILABLE FOR HIRE" delay={1300} /></span>
              <span className="hud-label hero-tag"><span className="dot"></span><ScrambleText text="13.0827° N, 80.2707° E" delay={1700} /></span>
            </div>
          </div>
        </div>

        <div className="hud-label text-muted-75 reveal-up delay-300 is-visible" style={{ position: 'relative', marginTop: '40px', alignSelf: 'flex-end' }}>
          <span className="blink text-accent">▼</span> SCROLL
        </div>
      </section>

      <ProfileSection />

      {/* SKILLS TERMINAL */}
      <section id="skills-terminal" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">TECHNICAL ARSENAL // BOOT SEQUENCE</span>
          <CyberDecal size="small" />
        </div>
        <TerminalSkills />
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
              <span>TAMIL NADU POLICE</span>
              <span>01/06/2026 — 31/07/2026</span>
            </div>
            <h3 className="card-title" style={{ fontSize: '24px' }}>CYBER CRIME WING INTERN</h3>
            <ul className="card-bullets">
              <li>Developed a real-time crime case handling dashboard used to manage the full case flow.</li>
              <li>Built with React.js for the frontend and Python for automation.</li>
              <li>Implemented Role-Based Access Control (RBAC) to manage permissions.</li>
              <li>Added security features including Multi-Factor Authentication (MFA) and rate-limiting.</li>
              <li>Gained hands-on experience with how real cybercrime cases are handled.</li>
            </ul>
          </div>

          {/* Exp 2 */}
          <div className="card reveal-up delay-100">
            <div className="card-meta">
              <span>ASCIZEN ACADEMY</span>
              <span>01/03/2026 — 31/05/2026</span>
            </div>
            <h3 className="card-title" style={{ fontSize: '24px' }}>VAPT INTERN</h3>
            <ul className="card-bullets">
              <li>Applied OWASP Top 10 methodology across real-world web targets.</li>
              <li>Practiced network enumeration, Linux-based tooling, and CTF-driven exploit techniques.</li>
              <li>Documented findings using professional VAPT reporting standards.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TERMINAL */}
      <section id="interactive-terminal" className="section-container">
        <div className="section-header reveal-up">
          <span className="hud-label text-accent">ROOT SHELL // INTERACTIVE UPLINK</span>
          <CyberDecal size="small" />
        </div>
        <InteractiveTerminal />
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
              Currently open for new opportunities. Whether you have a question, a project proposal, or just want to network, my inbox is always open.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://github.com/akshaya14-byte" target="_blank" rel="noreferrer" className="btn-primary hud-label" style={{ clipPath: 'none', borderRadius: '4px', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}>GITHUB <ArrowUpRight size={16} /></a>
              <a href="https://www.linkedin.com/in/akshayavardhan-s" target="_blank" rel="noreferrer" className="btn-primary hud-label" style={{ clipPath: 'none', borderRadius: '4px', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}>LINKEDIN <ArrowUpRight size={16} /></a>
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
    </>
  );
};

export default App;
