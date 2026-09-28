let soundEnabled = true;

function toggleCosmicSound(enable) {
  if (typeof enable === 'boolean') {
    soundEnabled = enable;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
}

function isCosmicSoundEnabled() {
  return soundEnabled;
}

function initStarfield(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  const stars = [];
  const shootingStars = [];
  const numStars = Math.floor((width * height) / 3000); // Dynamic star count based on screen size

  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    radius: 140
  };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  const starColors = ['#ffffff', '#a78bfa', '#38bdf8', '#f472b6', '#fef08a'];

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseRadius = Math.random() * 1.5 + 0.3;
      this.radius = this.baseRadius;
      this.color = starColors[Math.floor(Math.random() * starColors.length)];
      this.alpha = Math.random() * 0.7 + 0.3;
      this.alphaChange = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Twinkle logic
      this.alpha += this.alphaChange;
      if (this.alpha <= 0.2 || this.alpha >= 0.95) {
        this.alphaChange = -this.alphaChange;
      }

      // Mouse proximity interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.radius = this.baseRadius + force * 2.5;
        this.alpha = Math.min(1, this.alpha + force * 0.5);
      } else {
        this.radius = this.baseRadius;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.radius * 4;
      ctx.shadowColor = this.color;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * (height / 2);
      this.len = Math.random() * 120 + 80;
      this.speed = Math.random() * 10 + 6;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 2 + 1;
      this.active = true;
      this.alpha = 1;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.015;
      if (this.alpha <= 0 || this.x > width || this.y > height) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      const tailX = this.x - Math.cos(this.angle) * this.len;
      const tailY = this.y - Math.sin(this.angle) * this.len;

      const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#38bdf8');
      grad.addColorStop(1, 'transparent');

      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.restore();
    }
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }
  }

  initStars();

  // Periodically add shooting stars
  setInterval(() => {
    if (Math.random() < 0.6 && shootingStars.length < 3) {
      shootingStars.push(new ShootingStar());
    }
  }, 2500);

  function drawConstellations() {
    for (let i = 0; i < stars.length; i++) {
      const s1 = stars[i];
      const dx = mouse.x - s1.x;
      const dy = mouse.y - s1.y;
      const distMouse = Math.sqrt(dx * dx + dy * dy);

      if (distMouse < mouse.radius * 1.2) {
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const d2 = Math.sqrt((s1.x - s2.x) ** 2 + (s1.y - s2.y) ** 2);
          if (d2 < 80) {
            ctx.save();
            const alpha = (1 - d2 / 80) * 0.25 * (1 - distMouse / (mouse.radius * 1.2));
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }
  }

  function render() {
    // Smooth mouse inertia
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // Draw Stars
    stars.forEach((star) => {
      star.update();
      star.draw();
    });

    // Draw Constellation Lines near cursor
    drawConstellations();

    // Draw Shooting Stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.update();
      s.draw();
      if (!s.active) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/**
 * Web Audio API Cosmic Synth for Interactive UI Feedback
 */
function playCosmicSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'launch') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'modal') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Silent fail if audio context blocked by browser policy
  }
}

if (typeof window !== 'undefined') {
  window.initStarfield = initStarfield;
  window.playCosmicSound = playCosmicSound;
  window.toggleCosmicSound = toggleCosmicSound;
  window.isCosmicSoundEnabled = isCosmicSoundEnabled;
}

