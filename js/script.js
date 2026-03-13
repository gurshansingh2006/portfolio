console.log("Portfolio Ready");

window.onload = function() {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');
  const typingEl = document.querySelector('.typing');
  const roles = ['B.Tech IT Student', 'Cybersecurity Enthusiast', 'Python Learner', 'C++ Programmer', 'Linux User'];
  const terminalLines = [
    '> initializing system...',
    '> loading profile...',
    '> name: Gurshan Singh',
    '> role: Cybersecurity Enthusiast',
    '> role: B.Tech IT Student',
    '> role: Python Learner',
    '> role: C++ Programmer',
    '> role: Linux User',
    '> system ready.'
  ];
  const terminalOutput = document.querySelector('#terminal-output');
  const terminalCursor = document.querySelector('.terminal-cursor');
  const matrixCanvas = document.querySelector('#matrix-canvas');
  const terminalForm = document.querySelector('#terminal-form');
  const terminalInput = document.querySelector('#terminal-input');
  const terminalScreen = document.querySelector('#terminal-screen');
  const progressFills = document.querySelectorAll('.progress-fill');
  const scanButton = document.querySelector('#run-scan');
  const scanOutput = document.querySelector('#scan-output');

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        navLinks?.classList.remove('open');
      }
    });
  });

  // Mobile nav toggle
  toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Typing animation
  if (typingEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let erasing = false;
    const typingSpeed = 90;
    const pause = 1200;

    const type = () => {
      const current = roles[roleIndex];
      if (!erasing) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          erasing = true;
          setTimeout(type, pause);
          return;
        }
      } else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          erasing = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(type, typingSpeed);
    };
    type();
  }

  // Terminal intro lines
  if (terminalOutput) {
    let lineIndex = 0;
    const delay = 650;
    const addLine = () => {
      if (lineIndex >= terminalLines.length) {
        terminalCursor?.classList.add('idle');
        return;
      }
      const lineEl = document.createElement('div');
      lineEl.textContent = terminalLines[lineIndex];
      terminalOutput.appendChild(lineEl);
      lineIndex += 1;
      setTimeout(addLine, delay);
    };
    setTimeout(addLine, 400);
  }

  // Scroll reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
  );

  const observeReveals = (root = document) => {
    root.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
  };

  observeReveals();
  window.observeReveals = observeReveals;

  // Animate skill progress bars on reveal
  if (progressFills.length) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target.dataset.target;
            entry.target.style.width = `${target}%`;
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    progressFills.forEach((bar) => barObserver.observe(bar));
  }

  // Network scanner demo
  if (scanButton && scanOutput) {
    const scanLines = [
      'Scanning network...',
      '192.168.1.1 open',
      '192.168.1.3 closed',
      '192.168.1.7 open',
      '192.168.1.9 filtered'
    ];

    const runScan = () => {
      scanOutput.textContent = '';
      scanButton.disabled = true;
      scanButton.textContent = 'Scanning...';

      scanLines.forEach((line, idx) => {
        setTimeout(() => {
          scanOutput.textContent += `${line}\\n`;
          scanOutput.scrollTop = scanOutput.scrollHeight;
          if (idx === scanLines.length - 1) {
            scanButton.disabled = false;
            scanButton.textContent = 'Run Network Scan';
          }
        }, idx * 600);
      });
    };

    scanButton.addEventListener('click', runScan);
  }

  // Interactive cyber terminal
  if (terminalForm && terminalInput && terminalScreen) {
    const commands = {
      help: [
        'Available commands:',
        'help, whoami, skills, projects, tools, journey, github, contact, about, education, linkedin, experience, clear'
      ],
      whoami: ['Gurshan Singh — B.Tech IT student and cybersecurity enthusiast.'],
      about: [
        'Gurshan Singh — B.Tech IT student at GNDEC Ludhiana and cybersecurity enthusiast. I enjoy learning Linux, programming, and exploring security concepts.'
      ],
      education: [
        '2023 – Matriculation',
        '2025 – 12th',
        '2025–2029 – B.Tech IT at GNDEC Ludhiana'
      ],
      linkedin: ['Visit my LinkedIn profile.'],
      experience: ['Currently building projects and learning cybersecurity tools.'],
      skills: ['Python', 'C++', 'Linux', 'Git', 'Cybersecurity fundamentals'],
      projects: ['Projects are automatically loaded from my GitHub repositories.']
    };

    const printLine = (text, isCommand = false) => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.textContent = isCommand ? `visitor@portfolio:~$ ${text}` : text;
      terminalScreen.appendChild(line);
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    };

    const scrollToSection = (selector) => {
      const target = document.querySelector(selector);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    const navActions = {
      projects: () => scrollToSection('#projects'),
      tools: () => scrollToSection('#tools-technologies'),
      journey: () => scrollToSection('#learning-journey'),
      contact: () => scrollToSection('#contact'),
      github: () => window.open('https://github.com/gurshansingh2006', '_blank', 'noopener')
    };

    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = terminalInput.value.trim();
      if (!input) return;

      printLine(input, true);

      if (input === 'clear') {
        terminalScreen.innerHTML = '';
        terminalInput.value = '';
        return;
      }

      if (navActions[input]) {
        if (input === 'github') {
          printLine('Opening GitHub profile...');
        } else {
          printLine(`Navigating to ${input}...`);
        }
        navActions[input]();
        terminalInput.value = '';
        return;
      }

      const output = commands[input];
      if (output) {
        output.forEach((line) => printLine(line));
      } else {
        printLine(`Command not found: ${input}. Type "help" for options.`);
      }

      terminalInput.value = '';
    });
  }

  // Matrix rain background
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    let width = matrixCanvas.clientWidth;
    let height = matrixCanvas.clientHeight;
    matrixCanvas.width = width;
    matrixCanvas.height = height;

    const fontSize = 16;
    const columns = () => Math.floor(width / fontSize);
    let drops = Array(columns()).fill(1);
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const resize = () => {
      width = matrixCanvas.clientWidth;
      height = matrixCanvas.clientHeight;
      matrixCanvas.width = width;
      matrixCanvas.height = height;
      drops = Array(columns()).fill(1);
    };

    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00ff9c';
      ctx.font = `${fontSize}px 'SFMono-Regular', monospace`;

      drops.forEach((y, i) => {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1;
      });
      requestAnimationFrame(draw);
    };

    draw();
  }

});
