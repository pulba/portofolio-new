// Set current year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Typing Effect
const titles = [
    'Frontend Developer',
    'Graphic Designer',
    'UI/UX Enthusiast',
    'Creative Problem Solver'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    if (!typingElement) return;

    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ========================================
// GSAP-like Scroll Animations (Vanilla JS)
// ========================================

// Easing functions
const easing = {
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
};

// Animate value helper for smooth scroll
function animateValue(start, end, duration, callback, easingFn = easing.easeOutCubic) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);
        const currentValue = start + (end - start) * easedProgress;
        callback(currentValue);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// Parallax effect on scroll for hero
function parallaxEffect() {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('#hero > div:last-child');

    if (heroContent && scrollY < 800) {
        const translateY = scrollY * 0.4;
        const opacity = Math.max(0, 1 - scrollY / 500);
        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.opacity = opacity;
    }
}

// Intersection Observer for reveal animations (with loop support)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Element entering viewport - animate in
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible', 'revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, parseInt(delay));
        } else {
            // Element leaving viewport - reset for re-animation
            entry.target.classList.remove('visible', 'revealed');
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(40px) scale(0.95)';
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize scroll animations
function initScrollAnimations() {
    // Cards animation
    const cards = document.querySelectorAll('.project-card, .skill-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.dataset.delay = index * 100;
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(card);
    });

    // Glass sections
    const glassSections = document.querySelectorAll('.glass');
    glassSections.forEach((section, index) => {
        section.classList.add('fade-in-up');
        section.dataset.delay = index * 80;
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px) scale(0.95)';
        section.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(section);
    });

    // Section headers
    document.querySelectorAll('section:not(#hero) h2').forEach((title, index) => {
        title.classList.add('fade-in-up');
        title.dataset.delay = 0;
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(title);
    });

    // Paragraphs in sections
    document.querySelectorAll('section:not(#hero) > div > p').forEach((para, index) => {
        para.classList.add('fade-in-up');
        para.dataset.delay = 100;
        para.style.opacity = '0';
        para.style.transform = 'translateY(30px)';
        para.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(para);
    });
}

// Section fade in observer (with loop support)
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            // Reset when leaving viewport
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(40px)';
        }
    });
}, { threshold: 0.1 });

// Initialize section animations
document.querySelectorAll('section:not(#hero)').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = `opacity 0.7s ease, transform 0.7s ease`;
    sectionObserver.observe(section);
});

// Mouse parallax on hero background orbs
const heroSection = document.getElementById('hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        const orbs = heroSection.querySelectorAll('.blur-3xl');
        orbs.forEach((orb, index) => {
            const intensity = 20 + index * 10;
            orb.style.transform = `translate(${moveX * intensity}px, ${moveY * intensity}px)`;
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 50;
            const startPosition = window.scrollY;

            animateValue(startPosition, targetPosition, 800, (value) => {
                window.scrollTo(0, value);
            }, easing.easeInOutCubic);
        }
    });
});

// Initialize everything
initScrollAnimations();

// Scroll event listener with throttle
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            parallaxEffect();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Hero visible immediately
const hero = document.getElementById('hero');
if (hero) {
    hero.style.opacity = '1';
}

console.log('Scroll animations initialized!');
