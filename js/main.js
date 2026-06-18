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
