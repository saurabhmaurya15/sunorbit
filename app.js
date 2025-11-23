const WHATSAPP_NUMBER = "917905702664";
const WHATSAPP_MESSAGE = "Hi%20SunOrbit%20Solutions,%20I%27d%20like%20to%20discuss%20a%20solar%20project.";

const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const feedbackEl = document.getElementById('formFeedback');
const whatsappBtns = [
  document.getElementById('heroWhatsapp'),
  document.getElementById('contactWhatsapp'),
  document.getElementById('floatingWhatsapp')
];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryImages = document.querySelectorAll('.gallery-img');

// Set year
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Nav toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      navMenu.classList.remove('open');
    }
  });
});

// WhatsApp handlers
const openWhatsapp = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  window.open(url, '_blank');
};

whatsappBtns.forEach(btn => {
  if (btn) btn.addEventListener('click', openWhatsapp);
});

// Contact form handling
const errors = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

const setError = (field, message) => {
  errors[field] = message;
  const errorEl = document.querySelector(`[data-error-for="${field}"]`);
  if (errorEl) errorEl.textContent = message;
};

const validateEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

const clearErrors = () => {
  Object.keys(errors).forEach(key => setError(key, ''));
};

const setLoading = (state) => {
  submitBtn.disabled = state;
  submitBtn.textContent = state ? 'Sending…' : 'Submit';
};

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    feedbackEl.textContent = '';

    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const company = formData.get('company').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const projectType = formData.get('projectType');
    const message = formData.get('message').trim();

    let valid = true;
    if (!name) { setError('name', 'Name is required.'); valid = false; }
    if (!email || !validateEmail(email)) { setError('email', 'Enter a valid email.'); valid = false; }
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

    feedbackEl.textContent = 'Your email client has opened. Please review and send your enquiry.';
    setLoading(false);
    contactForm.reset();
  });
}

// Lightbox
if (lightbox && lightboxImage && lightboxClose) {
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
