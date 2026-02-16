// Navbar scroll effect and mobile menu functionality

// Add padding to body for fixed navbar
document.body.style.paddingTop = '64px';

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const icons = mobileMenuBtn.querySelectorAll('svg');

mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

    // Toggle menu
    mobileMenu.classList.toggle('hidden');

    // Toggle button state
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

    // Toggle icons
    icons.forEach(icon => icon.classList.toggle('hidden'));
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        icons.forEach(icon => icon.classList.toggle('hidden'));
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        formStatus.textContent = 'Sending...';
        formStatus.className = 'text-center text-sm text-teal-400';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'text-center text-sm text-teal-400';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again or email me directly.';
            formStatus.className = 'text-center text-sm text-red-400';
        }
    });
}

console.log('Navbar and form scripts initialized!');
