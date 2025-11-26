const WHATSAPP_NUMBER = "917905702664";
const whatsappText = encodeURIComponent("Hi SunOrbit Solutions, I'd like to discuss a solar project.");

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const heroWhatsApp = document.getElementById('hero-whatsapp');
const contactWhatsApp = document.getElementById('contact-whatsapp');
const floatWhatsApp = document.getElementById('float-whatsapp');
const floatTop = document.getElementById('float-top');
const yearEl = document.getElementById('year');
const form = document.getElementById('enquiry-form');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.querySelector('.success-msg');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryItems = document.querySelectorAll('.gallery-item');

yearEl.textContent = new Date().getFullYear();

const openWhatsApp = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;
  window.open(url, '_blank');
};

[heroWhatsApp, contactWhatsApp, floatWhatsApp].forEach(btn => {
  if (btn) btn.addEventListener('click', openWhatsApp);
});

if (floatTop) {
  floatTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

if (navToggle) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
    nav.classList.remove('open');
  });
});

const revealItems = document.querySelectorAll('.section, .service-card, .project-card, .team-card, .gallery-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(item => {
  item.classList.add('reveal');
  observer.observe(item);
});

function validateEmail(email) {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

function showError(field, message) {
  const errorEl = form.querySelector(`.error[data-for="${field}"]`);
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  form.querySelectorAll('.error').forEach(el => (el.textContent = ''));
  successMsg.textContent = '';
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    const data = {
      name: form.name.value.trim(),
      company: form.company.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      project: form.project.value,
      message: form.message.value.trim(),
    };

    let valid = true;
    if (!data.name) { showError('name', 'Name is required'); valid = false; }
    if (!data.email || !validateEmail(data.email)) { showError('email', 'Enter a valid email'); valid = false; }
    if (!data.phone) { showError('phone', 'Phone is required'); valid = false; }
    if (!data.message) { showError('message', 'Message is required'); valid = false; }

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Preparing email...';

    const body = encodeURIComponent(
      `New enquiry from SunOrbit website:\n\nName: ${data.name}\nCompany: ${data.company || '-'}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject Type: ${data.project}\nMessage:\n${data.message}\n\nSubmitted on: ${new Date().toLocaleString()}`
    );
    const subject = encodeURIComponent(`New SunOrbit website enquiry – ${data.name}`);
    const mailto = `mailto:saurabh.maurya999@gmail.com?subject=${subject}&body=${body}`;

    const tempLink = document.createElement('a');
    tempLink.href = mailto;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    successMsg.textContent = 'Your email client has opened. Please review and send your enquiry.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send enquiry';
  });
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const full = item.getAttribute('data-full');
    lightboxImg.src = full;
    lightbox.classList.add('active');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});
