// Intersection Observer for forward/back animations
const fadeSlides = document.querySelectorAll('.fade-slide');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); // Reverse when out of view
        }
    });
}, { threshold: 0.2 });

fadeSlides.forEach(section => {
    observer.observe(section);
});
