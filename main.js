// ══════════════════════════════════════════
// MAIN JS — South Africa Project
// Navigation, Scroll Animations, Counters
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav Toggle ──────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('#navbar')) {
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Active Nav Link on Scroll ─────────
  const sections  = document.querySelectorAll('section[id]');
  const allLinks  = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 80;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        allLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── Scroll Reveal (Intersection Observer) ──
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.querySelectorAll('.reveal')]
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 60, 300);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  // ── Hero Image Ken-Burns ───────────────
  const heroImgs = document.querySelectorAll('.hero-img');
  heroImgs.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

  // ── Animated Counters ─────────────────
  function animateCounter(el) {
    const target  = parseInt(el.dataset.count) || 0;
    const prefix  = el.dataset.prefix  || '';
    const suffix  = el.dataset.suffix  || '';
    const duration = 1800;
    const start   = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('.stat-num[data-count]');

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach(el => counterObserver.observe(el));

  // ── Smooth Scroll for nav links ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 64; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Timeline item stagger ─────────────
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          tlObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  timelineItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 80}ms`;
    tlObserver.observe(item);
  });

  // ── Hero parallax ─────────────────────
  const heroSection = document.querySelector('#home .hero');
  const heroImg     = heroSection ? heroSection.querySelector('.hero-img') : null;

  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.2) {
        heroImg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  // ── Food card hover tilt (subtle 3D) ──
  document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Quiz card hover tilt ───────────────
  document.querySelectorAll('.tech-card, .law-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Closing section word reveal ────────
  const closingThanks = document.querySelector('.closing-thanks');
  if (closingThanks) {
    const closingObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          closingThanks.style.animation = 'none';
          closingThanks.style.opacity = '0';
          closingThanks.style.transform = 'translateY(40px) scale(0.95)';
          
          setTimeout(() => {
            closingThanks.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            closingThanks.style.opacity = '1';
            closingThanks.style.transform = 'none';
          }, 200);

          // Animate team members
          const members = document.querySelectorAll('.team-member');
          members.forEach((m, i) => {
            m.style.opacity = '0';
            m.style.transform = 'translateY(20px)';
            setTimeout(() => {
              m.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              m.style.opacity = '1';
              m.style.transform = 'none';
            }, 800 + i * 150);
          });

          closingObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    closingObserver.observe(closingThanks);
  }

  // ── Proverb cards fade in ──────────────
  const proverbCards = document.querySelectorAll('.proverb-card');
  const proverbObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          }, i * 120);
          proverbObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  proverbCards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    proverbObserver.observe(card);
  });

  // ── Navbar transparency on scroll ──────
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(11,12,14,0.97)';
    } else {
      navbar.style.background = 'rgba(11,12,14,0.88)';
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // ── Page load — reveal hero text ───────
  const heroRevealEls = document.querySelectorAll('.hero-overlay .reveal');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 180);
  });

  console.log(
    '%c🇿🇦 South Africa — The Rainbow Nation',
    'background:#007a4d; color:#fff; padding:8px 16px; border-radius:4px; font-size:14px; font-weight:bold;'
  );
  console.log('%cBuilt for the English Project · 2025', 'color:#ffb612; font-size:12px;');

});