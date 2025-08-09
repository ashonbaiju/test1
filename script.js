// Fade & Slide Animation
const fadeSlides = document.querySelectorAll('.fade-slide');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

fadeSlides.forEach(section => observer.observe(section));

// Navbar & Footer hide/show on scroll
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');
const footer = document.querySelector('footer');
let ticking = false;

function updateUI() {
    const currentY = window.scrollY;

    if (currentY > lastScrollY + 5) {
        // scrolling down
        navbar.style.transform = 'translateY(-100%)';
        footer.style.transform = 'translateY(100%)';
        navbar.style.opacity = '0';
        footer.style.opacity = '0';
    } else if (currentY < lastScrollY - 5) {
        // scrolling up
        navbar.style.transform = 'translateY(0)';
        footer.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        footer.style.opacity = '1';
    }

    lastScrollY = currentY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateUI);
        ticking = true;
    }
});

