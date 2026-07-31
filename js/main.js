// ===========================
// Ailes d'Entraide - Script principal
// ===========================

const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY'; // Remplace par ta clé web3forms.com

document.addEventListener('DOMContentLoaded', () => {

  // --- Menu mobile ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

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
        if (amount) customAmountInput.value = amount;
      }
    });
  });

  // --- Soumission du formulaire de contact ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('contact-success');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      const data = new FormData(contactForm);
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: 'Nouveau message de ' + data.get('prenom') + ' ' + data.get('nom'),
        from_name: data.get('prenom') + ' ' + data.get('nom'),
        email: data.get('email'),
        telephone: data.get('telephone') || 'Non renseigné',
        sujet: data.get('sujet'),
        message: data.get('message'),
      };

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          if (successMsg) {
            successMsg.classList.add('show');
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          contactForm.reset();
        } else {
          throw new Error(json.message);
        }
      } catch (err) {
        alert('Une erreur est survenue. Veuillez réessayer ou nous écrire directement à lesailesdelentraide59@gmail.com');
        console.error('Web3Forms error:', err);
      }

      btn.textContent = 'Envoyer le message';
      btn.disabled = false;
    });
  }

  // --- Soumission du formulaire de don ---
  const donateForm = document.getElementById('donate-form');
  if (donateForm) {
    donateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = donateForm.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('donate-success');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      const data = new FormData(donateForm);
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: 'Nouvelle demande de don — ' + data.get('prenom') + ' ' + data.get('nom'),
        from_name: data.get('prenom') + ' ' + data.get('nom'),
        email: data.get('email'),
        telephone: data.get('telephone') || 'Non renseigné',
        montant: data.get('montant') + ' €',
        frequence: data.get('frequence'),
        paiement: data.get('paiement'),
        message: data.get('message') || 'Aucun message',
      };

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          if (successMsg) {
            successMsg.classList.add('show');
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          donateForm.reset();
          donateAmounts.forEach(el => el.classList.remove('selected'));
        } else {
          throw new Error(json.message);
        }
      } catch (err) {
        alert('Une erreur est survenue. Veuillez réessayer ou nous écrire directement à lesailesdelentraide59@gmail.com');
        console.error('Web3Forms error:', err);
      }

      btn.textContent = 'Confirmer mon don';
      btn.disabled = false;
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
        setTimeout(() => entry.target.classList.add('animated'), index * 80);
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
          if (current >= target) { current = target; clearInterval(timer); }
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
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  });

});
