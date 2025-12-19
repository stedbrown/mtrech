import './style.css'

// Mobile Menu Toggle
const setupMobileMenu = () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .action-item');

  if (!menuToggle || !mobileOverlay) {
    console.error('Mobile menu elements not found');
    return;
  }

  const toggleMenu = () => {
    const isOpen = menuToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
};

// Scroll Reveal Observer
const setupScrollReveal = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Targets for reveal
  const revealTargets = [
    ...document.querySelectorAll('.about-content'),
    ...document.querySelectorAll('.about-image-card'),
    ...document.querySelectorAll('.about-highlights'),
    ...document.querySelectorAll('.signature'),
    ...document.querySelectorAll('.areas-grid'),
    ...document.querySelectorAll('.value-card'),
    ...document.querySelectorAll('.bento-item'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.contact-wrapper')
  ];

  revealTargets.forEach(target => {
    target.style.opacity = '0';
    observer.observe(target);
  });
}

// Nav Background on Scroll
const setupNavScroll = () => {
  const header = document.querySelector('.glass-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.top = '0';
      header.style.width = '100%';
      header.style.borderRadius = '0';
    } else {
      header.style.top = '1.5rem';
      header.style.width = '90%';
      header.style.borderRadius = '100px';
    }
  });
}

// Contact Form Handling
const handleFormSubmit = () => {
  const form = document.getElementById('contactForm');
  const successDiv = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable button to prevent double submit
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Hide form and show success
        form.style.display = 'none';
        successDiv.style.display = 'flex';
        // Trigger Lucide icons to render the checkmark
        if (window.lucide) {
          window.lucide.createIcons();
        }
      } else {
        alert("Si è verificato un errore durante l'invio. Riprova più tardi.");
        submitBtn.disabled = false;
        submitBtn.textContent = 'Invia Messaggio';
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Si è verificato un errore di connessione. Riprova.");
      submitBtn.disabled = false;
      submitBtn.textContent = 'Invia Messaggio';
    }
  });

  // Reset function global reference
  window.resetForm = () => {
    form.reset();
    successDiv.style.display = 'none';
    form.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Invia Messaggio';
  };
};

// Initialize on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupScrollReveal();
  setupNavScroll();
  handleFormSubmit();
});

// For Lucide icons if using via CDN in script tag, no need to import here.
// But if you want to use them properly via npm, you'd do:
// import { createIcons, MessageCircle, Menu, Sprout, Palette, Construction, Wrench, ShieldCheck, Target, Heart, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide';
// createIcons({ icons: { MessageCircle, Menu, Sprout, Palette, Construction, Wrench, ShieldCheck, Target, Heart, Phone, Mail, MapPin, Facebook, Instagram } });
