// Language toggle
const langBtn = document.getElementById('langBtn');
let lang = 'ja';

langBtn.addEventListener('click', () => {
  lang = lang === 'ja' ? 'en' : 'ja';
  langBtn.textContent = lang === 'ja' ? 'EN' : 'JA';
  document.querySelectorAll('[data-ja]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section-title, .card, .about-text, .skills, .contact-desc').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
