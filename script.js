document.addEventListener('DOMContentLoaded', function() {
    // Unified animation observer
    const animateElements = (selector, options = {}) => {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: options.threshold || 0.15,
            rootMargin: options.rootMargin || '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    // Set up all animations
    animateElements('.fade-slide');
    animateElements('.image-box, .text-box');
    animateElements('.contact-left, .contact-center, .contact-right');

    // Scroll-based navbar behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
            navbar.classList.remove('hide');
        } else if (currentScrollY > lastScrollY + 100) {
            navbar.classList.add('hide');
        } else if (currentScrollY < lastScrollY - 10) {
            navbar.classList.remove('hide');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
        });
    }

    // Contact form handling
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            if (emailInput.checkValidity()) {
                button.disabled = true;
                button.textContent = "Subscribing...";
                
                // Simulate async submission
                setTimeout(() => {
                    button.textContent = "Subscribed!";
                    button.style.backgroundColor = "#4CAF50";
                    
                    setTimeout(() => {
                        button.textContent = "Subscribe";
                        button.style.backgroundColor = "#005f99";
                        button.disabled = false;
                        emailInput.value = "";
                    }, 2000);
                }, 800);
            }
        });
    }
});
