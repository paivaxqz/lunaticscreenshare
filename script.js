// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorDot.style.opacity = '1';

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
            cursorOutline.style.opacity = '1';
        });

        window.addEventListener('mouseout', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        // Add cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .accordion-header');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseover', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseout', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    } else {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Parallax effect on hero grid
    const heroGridItems = document.querySelectorAll('.hero-grid-item');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        heroGridItems.forEach(item => {
            const speed = item.getAttribute('data-speed');
            const moveX = (x - 0.5) * 50 * speed;
            const moveY = (y - 0.5) * 50 * speed;
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Testimonials slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-nav-dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            startTestimonialInterval();
        });
    });

    startTestimonialInterval();

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
                header.classList.add('active');
                const content = accordionItem.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Toast close button
    const toastClose = document.querySelector('.toast-close');
    const toast = document.querySelector('.toast'); // Select the toast element
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, el.dataset.delay || 0);
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
