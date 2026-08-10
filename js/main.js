document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Spy for Navigation Links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Options for the IntersectionObserver
    // Using a negative top margin so it activates slightly before the section hits the top
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    // On mobile, automatically scroll the horizontal nav bar to keep the active link in view
                    const navContainer = document.getElementById('nav-links');
                    if (navContainer && window.innerWidth <= 992) {
                        const linkRect = activeLink.getBoundingClientRect();
                        const containerRect = navContainer.getBoundingClientRect();
                        
                        // If link is out of view (left or right)
                        if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
                            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const heroSyllabusBtn = document.getElementById('hero-syllabus-btn');
    if (heroSyllabusBtn) {
        heroSyllabusBtn.addEventListener('click', (e) => {
            const openBtn = document.getElementById('open-syllabus-btn');
            if (openBtn) {
                openBtn.click();
            }
        });
    }
});

