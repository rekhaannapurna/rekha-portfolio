/**
 * Resume Content Render & Interaction Logic
 * Ravipati Rekha Annapurna - Space Portfolio
 * Single Source of Truth: REKHA RESUME.pdf
 */

// Universal portfolio data loader
function getPortfolioData() {
  if (typeof window !== 'undefined' && window.portfolioData) {
    return window.portfolioData;
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const data = getPortfolioData();
  if (!data) {
    console.error("Portfolio data not found on window object.");
    return;
  }

  // 1. Initialize Canvas Starfield Engine
  if (typeof window.initStarfield === 'function') {
    try {
      window.initStarfield('starfield-canvas');
    } catch (err) {
      console.warn('Starfield canvas could not initialize:', err);
    }
  }

  // 2. Render all sections from single source of truth
  renderHero(data);
  renderSummary(data);
  renderTechnicalSkills(data);
  renderProjects(data);
  renderAchievementsAndHonors(data);
  renderCertifications(data);
  renderEducation(data);
  renderLeadership(data);
  renderContactSection(data);

  // 3. Initialize Interactive Features
  initNavigation();
  initMobileMenu();
  initSoundToggle();
  initProjectModal(data);
  initCopyEmailFeature(data);
});

/**
 * 1. Hero Section
 */
function renderHero(data) {
  try {
    // Typewriter effect in Hero
    const targetEl = document.getElementById('typewriter-target');
    if (targetEl) {
      const phrases = [
        "IT Undergraduate (9.29 CGPA)",
        "Multi-Hackathon Winner (4 Awards)",
        "Full-Stack & IoT Developer",
        "Java, Python & Supabase Specialist"
      ];
      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function type() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
          targetEl.textContent = current.substring(0, charIdx - 1);
          charIdx--;
        } else {
          targetEl.textContent = current.substring(0, charIdx + 1);
          charIdx++;
        }

        let speed = isDeleting ? 35 : 75;

        if (!isDeleting && charIdx === current.length) {
          isDeleting = true;
          speed = 2200;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          speed = 400;
        }

        setTimeout(type, speed);
      }
      type();
    }

    // Dynamic stats bar
    const statsContainer = document.getElementById('hero-stats-container');
    if (statsContainer && data.personal.stats) {
      statsContainer.innerHTML = data.personal.stats.map(s => `
        <div class="stat-item">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    }

    // Avatar image sync
    const avatarEl = document.querySelector('.hero-avatar-img');
    if (avatarEl && data.personal.avatar) {
      avatarEl.src = data.personal.avatar;
      avatarEl.alt = data.personal.name;
    }
  } catch (e) {
    console.error('Error rendering hero section:', e);
  }
}

/**
 * 2. Summary Section
 */
function renderSummary(data) {
  try {
    const summaryEl = document.getElementById('summary-content-text');
    if (summaryEl) {
      summaryEl.textContent = data.summary;
    }
  } catch (e) {
    console.error('Error rendering summary section:', e);
  }
}

/**
 * 3. Technical Skills Section
 */
function renderTechnicalSkills(data) {
  try {
    const container = document.getElementById('skills-grid-container');
    if (!container) return;

    const entries = Object.entries(data.skills);
    container.innerHTML = entries.map(([category, items]) => {
      let icon = '✦';
      if (category.includes('Languages')) icon = '⚡';
      else if (category.includes('Web')) icon = '🌐';
      else if (category.includes('Databases')) icon = '🗄️';
      else if (category.includes('Tools')) icon = '🛠️';
      else if (category.includes('Core')) icon = '🧠';

      return `
        <div class="glass-card skill-category-card">
          <h3 class="skill-category-title">
            <span class="category-icon">${icon}</span> ${category}
          </h3>
          <div class="skill-pills">
            ${items.map(item => `
              <span class="skill-pill" tabindex="0">
                <span class="pill-dot"></span>${item}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Error rendering skills section:', e);
  }
}

/**
 * 4. Projects Section
 */
function renderProjects(data) {
  try {
    const container = document.getElementById('projects-grid-container');
    if (!container) return;

    container.innerHTML = data.projects.map(proj => `
      <article class="glass-card project-card" data-project-id="${proj.id}">
        <div class="project-img-wrapper">
          <img src="${proj.image}" alt="${proj.title} Screenshot/Diagram" class="project-img" loading="lazy" />
          <div class="project-badge-overlay">${proj.type}</div>
        </div>
        <div class="project-body">
          <div class="project-meta">
            <span class="project-date">📅 ${proj.date}</span>
            <span class="project-status-tag">⭐ Hackathon Built</span>
          </div>
          <h3 class="project-title">${proj.title}</h3>
          
          <div class="tech-tags" aria-label="Technologies used">
            ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          
          <ul class="project-bullet-list">
            ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>

          <div class="project-actions">
            <button type="button" class="btn btn-outline-project open-project-modal-btn" data-project-id="${proj.id}">
              <span>📋 Details on Request</span>
            </button>
            <a href="mailto:${data.personal.email}?subject=Inquiry regarding ${encodeURIComponent(proj.title)}" class="btn btn-icon-inquire" title="Inquire about ${proj.title}">
              <span>✉ Inquire</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  } catch (e) {
    console.error('Error rendering projects section:', e);
  }
}

/**
 * 5. Achievements & Honors Section
 */
function renderAchievementsAndHonors(data) {
  try {
    const container = document.getElementById('achievements-grid-container');
    if (!container) return;

    container.innerHTML = data.achievements.map(item => `
      <div class="glass-card achievement-card">
        <div class="achievement-header-row">
          <div class="achievement-icon-wrapper">🏆</div>
          <span class="achievement-badge-tag">${item.badge}</span>
        </div>
        <div class="achievement-track">${item.track || 'Hackathon Honor'}</div>
        <h3 class="achievement-title">${item.title}</h3>
        <p class="achievement-desc">${item.description}</p>
      </div>
    `).join('');
  } catch (e) {
    console.error('Error rendering achievements section:', e);
  }
}

/**
 * 6. Certifications Section
 */
function renderCertifications(data) {
  try {
    const container = document.getElementById('certs-grid-container');
    if (!container) return;

    container.innerHTML = data.certifications.map(cert => `
      <div class="glass-card cert-card">
        <div class="cert-header">
          <span class="cert-issuer">Verified • ${cert.organization}</span>
          <span class="cert-badge">${cert.domain || 'Certified'}</span>
        </div>
        <h3 class="cert-title">${cert.title}</h3>
        <p class="cert-desc">${cert.description}</p>
        <div class="cert-status-footer">
          <span class="status-check">✓</span> Curriculum Verified via Resume
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Error rendering certifications section:', e);
  }
}

/**
 * 7. Education Section
 */
function renderEducation(data) {
  try {
    const container = document.getElementById('edu-timeline-container');
    if (!container) return;

    container.innerHTML = data.education.map(edu => `
      <div class="glass-card edu-card">
        <div class="edu-header">
          <div>
            <span class="edu-level-badge">${edu.badge || 'Academic'}</span>
            <h3 class="edu-institution">${edu.institution}</h3>
            <div class="edu-location">📍 ${edu.location}</div>
          </div>
          <div class="edu-period">${edu.period}</div>
        </div>
        <div class="edu-body">
          <div class="edu-degree">${edu.degree}</div>
          <div class="edu-score-pill">${edu.score}</div>
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Error rendering education section:', e);
  }
}

/**
 * 8. Leadership & Activities Section
 */
function renderLeadership(data) {
  try {
    const container = document.getElementById('leadership-grid-container');
    if (!container) return;

    container.innerHTML = data.leadership.map(lead => `
      <div class="glass-card leadership-card">
        <div class="leadership-top">
          <span class="leadership-badge">✦ ${lead.badge || 'Leadership'}</span>
        </div>
        <h3 class="leadership-role">${lead.role}</h3>
        <p class="leadership-desc">${lead.description}</p>
      </div>
    `).join('');
  } catch (e) {
    console.error('Error rendering leadership section:', e);
  }
}

/**
 * 9. Contact / Recruiter Section
 */
function renderContactSection(data) {
  try {
    const container = document.getElementById('contact-cards-container');
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card contact-card">
        <div class="contact-icon">✉️</div>
        <h3>Email Me</h3>
        <p class="contact-card-sub">Best for opportunities, hackathons, and collaborations</p>
        <a href="mailto:${data.personal.email}" class="contact-card-link">${data.personal.email}</a>
        <button type="button" id="copy-email-btn" class="btn btn-secondary btn-sm copy-btn" style="margin-top:12px;">
          <span>📋 Copy Email Address</span>
        </button>
      </div>

      <div class="glass-card contact-card">
        <div class="contact-icon">📞</div>
        <h3>Phone</h3>
        <p class="contact-card-sub">Direct telephone contact</p>
        <a href="tel:${data.personal.phone}" class="contact-card-link">+91 ${data.personal.phone}</a>
        <a href="tel:${data.personal.phone}" class="btn btn-secondary btn-sm" style="margin-top:12px;">
          <span>📞 Call Now</span>
        </a>
      </div>

      <div class="glass-card contact-card">
        <div class="contact-icon">🔗</div>
        <h3>Professional Profiles</h3>
        <p class="contact-card-sub">Connect and explore open source code</p>
        <div class="profile-links-row">
          <a href="${data.personal.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <span>LinkedIn Profile</span> ➔
          </a>
          <a href="${data.personal.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            <span>GitHub Profile</span> ➔
          </a>
        </div>
      </div>
    `;
  } catch (e) {
    console.error('Error rendering contact section:', e);
  }
}

/**
 * Navigation Scroll Spy
 */
function initNavigation() {
  const header = document.querySelector('.header-navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    let currentSec = '';

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 150;
      if (window.scrollY >= secTop) {
        currentSec = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSec}`) {
        link.classList.add('active');
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.playCosmicSound === 'function') {
        window.playCosmicSound('click');
      }
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-drawer');
      const hamburger = document.getElementById('mobile-menu-toggle');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Mobile Hamburger Menu Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (typeof window.playCosmicSound === 'function') {
      window.playCosmicSound('modal');
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);
  closeBtn?.addEventListener('click', toggleMenu);

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Audio FX Toggle
 */
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (typeof window.toggleCosmicSound === 'function') {
      const isEnabled = window.toggleCosmicSound();
      soundBtn.innerHTML = isEnabled ? '🔊 <span class="sr-only">Sound On</span>' : '🔇 <span class="sr-only">Sound Off</span>';
      soundBtn.title = isEnabled ? 'Mute Cosmic Sound FX' : 'Enable Cosmic Sound FX';
      if (isEnabled && typeof window.playCosmicSound === 'function') {
        window.playCosmicSound('click');
      }
    }
  });
}

/**
 * Copy Email Interactive Feature
 */
function initCopyEmailFeature(data) {
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('#copy-email-btn') || e.target.closest('.copy-email-action');
    if (copyBtn) {
      e.preventDefault();
      navigator.clipboard.writeText(data.personal.email).then(() => {
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✓ Email Copied!</span>';
        copyBtn.classList.add('copied');
        if (typeof window.playCosmicSound === 'function') {
          window.playCosmicSound('click');
        }
        setTimeout(() => {
          copyBtn.innerHTML = originalContent;
          copyBtn.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.warn('Clipboard write failed:', err);
      });
    }
  });
}

/**
 * Project Details Accessible Modal
 */
function initProjectModal(data) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-details');
  const modalClose = document.getElementById('modal-close-btn');

  if (!modal || !modalContent) return;

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-project-modal-btn');
    if (btn) {
      const projId = btn.getAttribute('data-project-id');
      const project = data.projects.find(p => p.id === projId);
      if (!project) return;

      modalContent.innerHTML = `
        <div class="modal-project-header">
          <span class="project-badge-overlay" style="position:static; display:inline-block; margin-bottom:8px;">${project.type}</span>
          <h2 style="font-size:1.8rem; margin-bottom:6px;">${project.title}</h2>
          <div style="color:var(--accent-cyan); font-size:0.9rem; font-weight:600;">Completed: ${project.date}</div>
        </div>

        <div style="margin:20px 0; border-radius:12px; overflow:hidden; border:1px solid var(--glass-border);">
          <img src="${project.image}" alt="${project.title}" style="width:100%; height:240px; object-fit:cover;" />
        </div>

        <div style="margin-bottom:20px;">
          <h4 style="color:var(--text-primary); margin-bottom:8px;">Technology Stack</h4>
          <div class="tech-tags">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h4 style="color:var(--text-primary); margin-bottom:8px;">Engineering Details</h4>
          <ul class="project-bullet-list">
            ${project.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <div class="glass-card" style="padding:16px; background:rgba(56, 189, 248, 0.08); border-color:rgba(56, 189, 248, 0.3); margin-bottom:20px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:1.4rem;">🔒</span>
            <div>
              <div style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">Availability Notice</div>
              <div style="font-size:0.85rem; color:var(--text-secondary);">
                Project repositories and live demonstrations are protected/restricted. Complete architecture, codebase, or live demo access is readily available upon direct inquiry.
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:flex-end;">
          <a href="mailto:${data.personal.email}?subject=Requesting details for ${encodeURIComponent(project.title)}" class="btn btn-primary">
            <span>✉ Request Details via Email</span>
          </a>
          <button type="button" class="btn btn-secondary modal-cancel-btn">Close</button>
        </div>
      `;

      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const cancelBtn = modalContent.querySelector('.modal-cancel-btn');
      cancelBtn?.addEventListener('click', closeModal);

      if (typeof window.playCosmicSound === 'function') {
        window.playCosmicSound('modal');
      }
    }
  });
}
