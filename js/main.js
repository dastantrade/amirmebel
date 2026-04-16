// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('mobileOverlay');

function toggleMenu(open) {
  burger.classList.toggle('active', open);
  nav.classList.toggle('open', open);
  overlay.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
overlay.addEventListener('click', () => toggleMenu(false));

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .feature, .step, .portfolio__item, .contact-item').forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// Contact form
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Отправляем...';
  btn.disabled = true;

  // Simulate sending (replace with real backend/telegram bot later)
  setTimeout(() => {
    btn.textContent = 'Заявка отправлена!';
    btn.style.background = '#4caf50';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Отправить заявку';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }, 1000);
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
