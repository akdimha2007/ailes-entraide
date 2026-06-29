// ===========================
// Ailes d'Entraide - Script principal
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menu mobile ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Ferme le menu au clic sur un lien (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Sélection des montants de don ---
  const donateAmounts = document.querySelectorAll('.donate-amount');
  const customAmountInput = document.getElementById('custom-amount');

  donateAmounts.forEach(item => {
    item.addEventListener('click', () => {
      donateAmounts.forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      if (customAmountInput) {
        const amount = item.getAttribute('data-amount');
        if (amount) {
          customAmountInput.value = amount;
        }
      }
    });
  });

  // --- Soumission du formulaire de contact ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('contact-success');
      if (successMsg) {
        successMsg.classList.add('show');
      }
      contactForm.reset();
      if (successMsg) {
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // --- Animations au scroll ---
  const animateElements = document.querySelectorAll(
    '.section-title, .card, .value-card, .stat-item, .timeline-item, .mission-grid, .contact-info, .contact-form, .method-card, .podcast-card, .cta-banner .container, .cards-grid img'
  );

  animateElements.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => observer.observe(el));

  // --- Compteur animé pour les statistiques ---
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent.replace(/\D/g, ''));
        const suffix = el.textContent.replace(/[\d]/g, '');
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  // --- Header scroll effect ---
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // --- Soumission du formulaire de don ---
  const donateForm = document.getElementById('donate-form');
  if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('donate-success');
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      donateForm.reset();
      donateAmounts.forEach(el => el.classList.remove('selected'));
    });
  }

});
