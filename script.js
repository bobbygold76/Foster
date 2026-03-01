// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinksArray = Array.from(navLinks);

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on load

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');

    // Add click event to all images
    const clickableImages = document.querySelectorAll('.hero-image, .gallery-image-large');
    
    clickableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.innerHTML = this.alt || 'Foster Etonam Akoto';
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking the X
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Touch gestures for mobile gallery
    const galleryContainer = document.querySelector('.gallery-grid-horizontal');
    if (galleryContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        galleryContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - galleryContainer.offsetLeft;
            scrollLeft = galleryContainer.scrollLeft;
        });

        galleryContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        galleryContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        galleryContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryContainer.offsetLeft;
            const walk = (x - startX) * 2;
            galleryContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Image loading verification
    console.log('=== IMAGE LOADING VERIFICATION ===');
    
    const heroImage = document.querySelector('.hero-image');
    const galleryImages = document.querySelectorAll('.gallery-image-large');
    
    console.log('Hero image found:', !!heroImage);
    console.log('Gallery images found:', galleryImages.length);
    
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            console.log('✅ Hero image loaded successfully:', this.src);
        });
        
        heroImage.addEventListener('error', function() {
            console.log('❌ Hero image failed to load:', this.src);
            // Fallback to placeholder
            this.style.display = 'none';
            const parent = this.parentElement;
            parent.innerHTML = '<div class="avatar-placeholder"><span class="avatar-initials">FEA</span></div>';
        });
    }
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('load', function() {
            console.log(`✅ Gallery image ${index + 1} loaded successfully:`, this.src);
        });
        
        img.addEventListener('error', function() {
            console.log(`❌ Gallery image ${index + 1} failed to load:`, this.src);
            // Fallback to placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'gallery-placeholder';
            placeholder.innerHTML = `<span class="gallery-icon">📸</span><span class="gallery-text">Photo ${index + 1}</span>`;
            this.parentNode.insertBefore(placeholder, this);
        });
    });

    // Scroll reveal animation - DISABLED
    // const revealElements = document.querySelectorAll('.reveal');
    
    // function revealOnScroll() {
    //     revealElements.forEach(element => {
    //         const elementTop = element.getBoundingClientRect().top;
    //         const windowHeight = window.innerHeight;
    //         
    //         if (elementTop < windowHeight - 100) {
    //             element.classList.add('active');
    //         }
    //     });
    // }

    // Add reveal class to elements that should animate - DISABLED
    function addRevealClasses() {
        // DISABLED - Don't add reveal classes that hide content
        return;
        
        // const elementsToReveal = [
        //     '.about-text',
        //     '.about-sidebar',
        //     '.skill-card',
        //     '.blog-card',
        //     '.testimonial-card',
        //     '.resume-content',
        //     '.contact-content'
        // ];

        // elementsToReveal.forEach(selector => {
        //     const elements = document.querySelectorAll(selector);
        //     elements.forEach(element => {
        //         element.classList.add('reveal');
        //     });
        // });
    }

    addRevealClasses();
    // window.addEventListener('scroll', revealOnScroll);
    // revealOnScroll(); // Call once on load

    // Typing effect for hero tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                tagline.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 1000); // Start typing after 1 second
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = hero.querySelectorAll('.hero-avatar');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill cards for staggered animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe blog cards for staggered animation
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe testimonial cards for staggered animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Form validation (if contact form is added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Copy email to clipboard functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary success message
                const originalText = this.querySelector('.contact-value').textContent;
                this.querySelector('.contact-value').textContent = 'Email copied!';
                this.style.background = 'var(--accent-primary)';
                
                setTimeout(() => {
                    this.querySelector('.contact-value').textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                // Fallback: open email client
                window.location.href = `mailto:${email}`;
            });
        });
    }

    // Add hover effect to cards with mouse tracking
    const cards = document.querySelectorAll('.skill-card, .blog-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedUpdateParallax = debounce(updateParallax, 16);
    const debouncedRevealOnScroll = debounce(revealOnScroll, 16);
    const debouncedUpdateActiveLink = debounce(updateActiveLink, 16);

    window.removeEventListener('scroll', updateParallax);
    window.removeEventListener('scroll', revealOnScroll);
    window.removeEventListener('scroll', updateActiveLink);
    
    window.addEventListener('scroll', debouncedUpdateParallax);
    window.addEventListener('scroll', debouncedRevealOnScroll);
    window.addEventListener('scroll', debouncedUpdateActiveLink);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press Escape to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
        
        // Press '/' to focus search (if search functionality is added)
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            // Future: focus search input
        }
    });

    // Loading animation removal
    window.addEventListener('load', function() {
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
    });

    // Console Easter egg
    console.log('%c🚀 Foster Etonam Akoto Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cLearning today, building trust and skills for tomorrow', 'color: #8b5cf6; font-size: 14px;');
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Future: Register service worker for offline functionality
        console.log('Service Worker support detected');
    });
}

// Analytics placeholder (optional)
function trackPageView() {
    // Future: Add analytics tracking
    console.log('Page view tracked');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});
