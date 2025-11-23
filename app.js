const WHATSAPP_NUMBER = "917905702664";
const WHATSAPP_MESSAGE = "Hi%20SunOrbit%20Solutions,%20I%27d%20like%20to%20discuss%20a%20solar%20project.";

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('a[href^="#"]');
const whatsappButtons = [
  document.getElementById('heroWhatsapp'),
  document.getElementById('contactWhatsapp'),
  document.getElementById('floatingWhatsapp')
];
const contactForm = document.getElementById('contactForm');
const contactSubmit = document.getElementById('contactSubmit');
const formStatus = document.getElementById('formStatus');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

// Mobile nav toggle
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scroll and close mobile menu
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });
});

// WhatsApp actions
const openWhatsapp = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  window.open(url, '_blank');
};

whatsappButtons.forEach(btn => btn && btn.addEventListener('click', openWhatsapp));

// Form validation helpers
const errors = { name: '', email: '', phone: '', message: '' };
const setError = (field, message) => {
  errors[field] = message;
  const el = document.querySelector(`[data-error-for="${field}"]`);
  if (el) el.textContent = message;
};
const clearErrors = () => Object.keys(errors).forEach(key => setError(key, ''));
const isEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

const setLoading = (state) => {
  if (contactSubmit) {
    contactSubmit.disabled = state;
    contactSubmit.textContent = state ? 'Sending…' : 'Send enquiry';
  }
};

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    if (formStatus) {
      formStatus.classList.add('hidden');
    }

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').trim();
    const company = (formData.get('company') || '').trim();
    const email = (formData.get('email') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const projectType = formData.get('projectType') || 'Rooftop';
    const message = (formData.get('message') || '').trim();

    let valid = true;
    if (!name) { setError('name', 'Name is required.'); valid = false; }
    if (!email || !isEmail(email)) { setError('email', 'Enter a valid email.'); valid = false; }
    if (!phone) { setError('phone', 'Phone is required.'); valid = false; }
    if (!message) { setError('message', 'Message is required.'); valid = false; }
    if (!valid) return;

    setLoading(true);

    const subject = encodeURIComponent(`New SunOrbit website enquiry – ${name}`);
    const body = `New enquiry from SunOrbit website:%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0ACompany: ${encodeURIComponent(company || '-')}` +
      `%0D%0AEmail: ${encodeURIComponent(email)}%0D%0APhone: ${encodeURIComponent(phone)}%0D%0AProject Type: ${encodeURIComponent(projectType)}` +
      `%0D%0AMessage:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ASubmitted on: ${encodeURIComponent(new Date().toLocaleString())}`;
    const mailto = `mailto:saurabh.maurya999@gmail.com?subject=${subject}&body=${body}`;

    const tempLink = document.createElement('a');
    tempLink.href = mailto;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    if (formStatus) {
      formStatus.classList.remove('hidden');
    }
    contactForm.reset();
    setLoading(false);
  });
}

// Gallery lightbox
if (lightbox && lightboxImage && lightboxClose) {
  const openLightbox = (src, alt) => {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.image;
      const img = item.querySelector('img');
      openLightbox(src, img ? img.alt : 'Project image');
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
