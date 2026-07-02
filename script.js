/* ==========================================================================
   ENGETRONIC — LANDING PAGE
   JavaScript puro (vanilla), sem dependências.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initSmoothAnchors();
  initRevealOnScroll();
  initCounters();
  initAccordion();
  initTestimonialSlider();
  initHeroParallax();
});

/* --------------------------------------------------------------------- */
/* Ano dinâmico no rodapé                                                */
/* --------------------------------------------------------------------- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------- */
/* Navbar: glassmorphism dinâmico ao rolar                               */
/* --------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggleScrolled = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };

  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

/* --------------------------------------------------------------------- */
/* Menu mobile                                                           */
/* --------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

/* --------------------------------------------------------------------- */
/* Scroll spy: destaca o link ativo no menu conforme a seção visível     */
/* --------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.navbar__link');
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------- */
/* Scroll suave para links internos (fallback além do CSS)               */
/* --------------------------------------------------------------------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* --------------------------------------------------------------------- */
/* Reveal ao rolar a página (fade + translateY via IntersectionObserver) */
/* --------------------------------------------------------------------- */
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Pequeno atraso escalonado para elementos próximos entrarem em cascata
          const delay = (index % 4) * 70;
          setTimeout(() => entry.target.classList.add('in-view'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------- */
/* Contadores animados (indicadores)                                     */
/* --------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stats__number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo para uma desaceleração suave e "premium"
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('pt-BR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('pt-BR') + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* --------------------------------------------------------------------- */
/* FAQ — Accordion animado                                               */
/* --------------------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Fecha todos os outros itens (comportamento de accordion exclusivo)
      items.forEach((otherItem) => {
        const otherTrigger = otherItem.querySelector('.accordion__trigger');
        const otherPanel = otherItem.querySelector('.accordion__panel');
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherPanel.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------- */
/* Depoimentos — Slider automático                                       */
/* --------------------------------------------------------------------- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.querySelectorAll('.testimonial-card'));
  if (!slides.length) return;

  let current = 0;
  let autoplayId = null;
  const AUTOPLAY_MS = 5500;

  // Cria os dots dinamicamente
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ver depoimento ${index + 1}`);
    dot.addEventListener('click', () => goTo(index, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    slides.forEach((slide, index) => slide.classList.toggle('is-active', index === current));
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === current));
  }

  function goTo(index, userTriggered) {
    current = (index + slides.length) % slides.length;
    render();
    if (userTriggered) restartAutoplay();
  }

  function next() { goTo(current + 1); }

  function startAutoplay() {
    autoplayId = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pausa a rotação automática ao passar o mouse (melhor UX de leitura)
  const sliderWrap = document.getElementById('testimonialSlider');
  if (sliderWrap) {
    sliderWrap.addEventListener('mouseenter', stopAutoplay);
    sliderWrap.addEventListener('mouseleave', startAutoplay);
  }

  render();
  startAutoplay();
}

/* --------------------------------------------------------------------- */
/* Parallax leve no grid do hero, conforme o scroll                      */
/* --------------------------------------------------------------------- */
function initHeroParallax() {
  const grid = document.querySelector('.hero__grid');
  const hero = document.querySelector('.hero');
  if (!grid || !hero) return;

  // Respeita usuários que preferem menos movimento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const heroHeight = hero.offsetHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      grid.style.transform = `translateY(${progress * 40}px)`;
      ticking = false;
    });
  }, { passive: true });
}