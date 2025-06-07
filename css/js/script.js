document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links (if any internal to a page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Global Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navItems = document.querySelectorAll('#main-nav .nav-item'); // Get all nav items

    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('visible');
        this.classList.toggle('open'); // For hamburger animation

        // Animate nav items sequentially (simple version)
        if (mainNav.classList.contains('visible')) {
            navItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            });
        } else {
            navItems.forEach(item => {
                item.style.transitionDelay = '0s'; // Reset delay on close
                item.style.transform = 'translateY(20px)'; // Reset to initial state
                item.style.opacity = '0';
            });
        }
    });

    // Close nav when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mainNav.classList.remove('visible');
            navToggle.classList.remove('open');
        });
    });


    // --- Intersection Observer for Content Reveals & Title Underline ---
    const contentRevealSections = document.querySelectorAll('.content-reveal');
    const heroContentElements = document.querySelectorAll('.hero-content .fade-in');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it's a one-time animation, you can uncomment to stop observing
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove 'active' class if you want animations to replay on scroll up
                // entry.target.classList.remove('active');
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    contentRevealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Special observer for hero content (usually visible immediately or very soon)
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroContentElements.forEach(el => el.classList.add('active'));
                heroObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(document.getElementById('hero'));


    // --- Parallax Effect for .section-layer elements (Subtle Depth) ---
    // This is a simplified parallax. More complex ones might involve requestAnimationFrame
    // and adjusting transformY based on scroll position more directly.
    const sectionLayers = document.querySelectorAll('.section-layer');

    window.addEventListener('scroll', function() {
        sectionLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed); // Get speed from data-speed attribute
            const offset = window.pageYOffset;
            const yPos = -(offset * (1 - speed)); // Adjust calculation for layered effect

            layer.style.transform = `translateY(${yPos * 0.1}px)`; // Apply subtle movement
            layer.style.transition = 'transform 0.1s linear'; // Smooth transition for scroll
        });
    });

    // Initial check for elements already in view on page load
    sectionLayers.forEach(section => {
        sectionObserver.observe(section);
    });
    contentRevealSections.forEach(section => {
        sectionObserver.observe(section);
    });
});
