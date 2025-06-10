/**
 * Main JavaScript File
 * Digital Nexus - Digital Marketing Agency
 * 
 * This file contains all the core functionality for the website including:
 * - Preloader
 * - Navigation
 * - Animations
 * - Sliders
 * - Portfolio Filtering
 * - Scroll Effects
 * - Form Validation
 * - Cookie Consent
 * - And more
 */

(function() {
    'use strict';
    
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all functions
        preloader();
        initNavigation();
        initScrollEffects();
        initCounters();
        initPortfolioFilter();
        initTestimonialSlider();
        initVideoModal();
        initContactForm();
        initCookieConsent();
        initAnimations();
    });

    /**
     * Preloader
     * Handles the loading screen before the site is fully loaded
     */
    function preloader() {
        const preloaderElement = document.getElementById('preloader');
        
        if (!preloaderElement) return;
        
        // Hide preloader after the page is fully loaded
        window.addEventListener('load', function() {
            preloaderElement.style.opacity = '0';
            setTimeout(function() {
                preloaderElement.style.display = 'none';
            }, 500);
        });
    }

    /**
     * Navigation
     * Handles the mobile menu, scrolling effects, and active states
     */
    function initNavigation() {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollTopBtn = document.getElementById('scrollToTop');
        
        // Toggle mobile menu
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }
        
        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
        
        // Add scrolled class to header when scrolling down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Show/hide scroll to top button
            if (scrollTopBtn) {
                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('active');
                } else {
                    scrollTopBtn.classList.remove('active');
                }
            }
        });
        
        // Scroll to top when clicking the scroll top button
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Set active nav link based on scroll position
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            let scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    /**
     * Scroll Effects
     * Handles smooth scrolling for anchor links
     */
    function initScrollEffects() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Counters
     * Animates number counters when they come into view
     */
    function initCounters() {
        const statValues = document.querySelectorAll('.stat-value');
        let counted = false;
        
        if (statValues.length === 0) return;
        
        function startCounting() {
            if (counted) return;
            
            const windowHeight = window.innerHeight;
            const statsSection = document.querySelector('.hero-stats');
            
            if (!statsSection) return;
            
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            
            if (statsSectionTop < windowHeight) {
                counted = true;
                
                statValues.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'), 10);
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        
                        if (current >= target) {
                            counter.textContent = target;
                        } else {
                            // Handle decimal values
                            if (target < 10) {
                                counter.textContent = current.toFixed(1);
                            } else {
                                counter.textContent = Math.floor(current);
                            }
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                });
            }
        }
        
        // Start counting when the section comes into view
        window.addEventListener('scroll', startCounting);
        // Also check on page load
        startCounting();
    }

    /**
     * Portfolio Filter
     * Filters portfolio items based on category
     */
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length === 0 || portfolioItems.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /**
     * Testimonial Slider
     * Initializes and controls the testimonial slider
     */
    function initTestimonialSlider() {
        const testimonialTrack = document.querySelector('.testimonial-track');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        const paginationContainer = document.querySelector('.slider-pagination');
        
        if (!testimonialTrack || !prevBtn || !nextBtn || !paginationContainer) return;
        
        const testimonials = testimonialTrack.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        // Create pagination dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            paginationContainer.appendChild(dot);
        });
        
        const paginationDots = paginationContainer.querySelectorAll('.pagination-dot');
        
        // Add event listeners for next and previous buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Add touch events for mobile swipe
        testimonialTrack.addEventListener('touchstart', touchStart);
        testimonialTrack.addEventListener('touchmove', touchMove);
        testimonialTrack.addEventListener('touchend', touchEnd);
        
        // Add mouse events for desktop drag
        testimonialTrack.addEventListener('mousedown', touchStart);
        testimonialTrack.addEventListener('mousemove', touchMove);
        testimonialTrack.addEventListener('mouseup', touchEnd);
        testimonialTrack.addEventListener('mouseleave', touchEnd);
        
        function touchStart(event) {
            const touch = event.type.includes('mouse') ? event : event.touches[0];
            startPos = touch.clientX;
            isDragging = true;
            
            testimonialTrack.style.transition = 'none';
        }
        
        function touchMove(event) {
            if (!isDragging) return;
            
            const touch = event.type.includes('mouse') ? event : event.touches[0];
            const currentPosition = touch.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
            
            // Limit the drag within bounds
            const minTranslate = -(testimonials.length - 1) * testimonialTrack.offsetWidth;
            if (currentTranslate > 0) currentTranslate = 0;
            if (currentTranslate < minTranslate) currentTranslate = minTranslate;
            
            testimonialTrack.style.transform = `translateX(${currentTranslate}px)`;
        }
        
        function touchEnd() {
            isDragging = false;
            
            const movedBy = currentTranslate - prevTranslate;
            
            // If moved enough to register as a swipe
            if (Math.abs(movedBy) > 100) {
                if (movedBy < 0) {
                    // Swiped left - next slide
                    nextSlide();
                } else {
                    // Swiped right - previous slide
                    prevSlide();
                }
            } else {
                // Go back to current slide
                goToSlide(currentIndex);
            }
        }
        
        function nextSlide() {
            if (currentIndex < testimonials.length - 1) {
                currentIndex++;
            } else {
                // Loop back to first slide
                currentIndex = 0;
            }
            
            goToSlide(currentIndex);
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                // Loop to last slide
                currentIndex = testimonials.length - 1;
            }
            
            goToSlide(currentIndex);
        }
        
        function goToSlide(index) {
            // Update current index
            currentIndex = index;
            
            // Calculate the translate value
            const slideWidth = testimonialTrack.offsetWidth;
            currentTranslate = -index * slideWidth;
            prevTranslate = currentTranslate;
            
            // Apply smooth transition
            testimonialTrack.style.transition = 'transform 0.3s ease-in-out';
            testimonialTrack.style.transform = `translateX(${currentTranslate}px)`;
            
            // Update pagination dots
            paginationDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto slide every 5 seconds
        let autoSlideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Recalculate slide positions after resize
            goToSlide(currentIndex);
        });
    }

    /**
     * Video Modal
     * Opens a modal with video player when clicking on video buttons
     */
    function initVideoModal() {
        const videoBtn = document.querySelector('.video-btn');
        
        if (!videoBtn) return;
        
        videoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const videoUrl = this.getAttribute('data-video');
            
            // Create modal elements
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'video-modal-content';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'video-modal-close';
            closeBtn.innerHTML = '&times;';
            
            const iframe = document.createElement('iframe');
            iframe.src = videoUrl;
            iframe.allowFullscreen = true;
            
            // Append elements
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(iframe);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Add no-scroll class to body
            document.body.classList.add('no-scroll');
            
            // Show modal with animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Close modal when clicking close button or outside the content
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Close modal function
            function closeModal() {
                modal.style.opacity = '0';
                document.body.classList.remove('no-scroll');
                
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
            
            // Close modal with escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    }

    /**
     * Contact Form
     * Handles form submission and validation
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call in production)
                setTimeout(() => {
                    // Success state
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.classList.add('success');
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                    
                    contactForm.insertBefore(successMessage, contactForm.firstChild);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                        
                        // Fade out success message
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.remove();
                        }, 300);
                    }, 3000);
                }, 1500);
                
                // In production, replace the setTimeout with actual form submission:
                /*
                fetch('your-form-handler.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Handle success
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    contactForm.reset();
                })
                .catch(error => {
                    // Handle error
                    submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
                    console.error('Error:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
                */
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
                
                // Email validation
                if (this.type === 'email' && this.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                }
            });
        });
    }

    /**
     * Cookie Consent
     * Displays and handles the cookie consent banner
     */
    function initCookieConsent() {
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptBtn = document.getElementById('cookieAccept');
        const settingsBtn = document.getElementById('cookieSettings');
        
        if (!cookieConsent || !acceptBtn) return;
        
                // Check if user has already accepted cookies
                const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
                if (!cookiesAccepted) {
                    // Show cookie consent with a delay
                    setTimeout(() => {
                        cookieConsent.classList.add('active');
                    }, 2000);
                }
                
                // Accept all cookies
                acceptBtn.addEventListener('click', function() {
                    localStorage.setItem('cookiesAccepted', 'true');
                    cookieConsent.classList.remove('active');
                });
                
                // Cookie settings (can be expanded for more detailed cookie management)
                if (settingsBtn) {
                    settingsBtn.addEventListener('click', function() {
                        // This could open a more detailed modal with cookie settings
                        // For now, just simulate opening settings
                        alert('Cookie settings functionality would open here');
                    });
                }
            }
        
            /**
             * Animations
             * Initializes AOS animations and custom animations
             */
            function initAnimations() {
                // Animate elements when they come into view
                const animateElements = document.querySelectorAll('.animate-on-scroll');
                
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1
                };
                
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);
                
                animateElements.forEach(element => {
                    observer.observe(element);
                });
                
                // Animate hero elements on page load
                const heroElements = document.querySelectorAll('.hero .animate-fade-up, .hero .animate-fade-down, .hero .animate-scale-up');
                
                setTimeout(() => {
                    heroElements.forEach(element => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) scale(1)';
                    });
                }, 200);
                
                // Handle floating animations
                const floatingElements = document.querySelectorAll('.floating-element');
                
                floatingElements.forEach((element, index) => {
                    const delay = index * 0.5;
                    element.style.animationDelay = `${delay}s`;
                });
                
                // Logo ticker animation
                const logoTicker = document.querySelector('.logo-ticker');
                
                if (logoTicker) {
                    const logoTrack = logoTicker.querySelector('.logo-track');
                    const logoItems = logoTrack.querySelectorAll('.logo-item');
                    
                    // Clone the logo items to create a seamless loop
                    logoItems.forEach(item => {
                        const clone = item.cloneNode(true);
                        logoTrack.appendChild(clone);
                    });
                }
            }
        
            /**
             * Project Modal
             * Opens a modal with project details when clicking on portfolio items
             */
            function initProjectModals() {
                const projectLinks = document.querySelectorAll('.project-link');
                
                if (projectLinks.length === 0) return;
                
                projectLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const projectId = this.getAttribute('data-modal');
                        
                        // Fetch project data (in a real app, this would come from an API or JSON file)
                        const projectData = getProjectData(projectId);
                        
                        // Create and display the modal
                        createProjectModal(projectData);
                    });
                });
                
                function getProjectData(projectId) {
                    // This is dummy data - in a real app, you would fetch this from a server
                    const projects = {
                        'project-1': {
                            title: 'TechStore Revolution',
                            category: 'SEO & Web Design',
                            client: 'TechCorp Inc.',
                            date: 'January 2023',
                            description: 'A comprehensive e-commerce website redesign and SEO strategy that resulted in a 385% increase in organic traffic and 220% revenue growth within 6 months.',
                            challenge: 'TechStore was struggling with poor website performance, high bounce rates, and low search rankings for high-value keywords.',
                            solution: 'We implemented a complete website overhaul with a focus on user experience, mobile optimization, and technical SEO. Our strategy included in-depth keyword research, content optimization, and a targeted link building campaign.',
                            results: [
                                '385% increase in organic traffic',
                                '220% growth in e-commerce revenue',
                                '65% improvement in page load speed',
                                '45% reduction in bounce rate',
                                '1st page rankings for 75+ target keywords'
                            ],
                            testimonial: {
                                text: 'Digital Nexus transformed our online presence completely. Their team delivered beyond our expectations, and the results speak for themselves.',
                                author: 'Michael Chen, CMO at TechCorp Inc.'
                            },
                            images: [
                                'assets/images/portfolio/project-1-detail-1.jpg',
                                'assets/images/portfolio/project-1-detail-2.jpg',
                                'assets/images/portfolio/project-1-detail-3.jpg'
                            ]
                        },
                        'project-2': {
                            title: 'Fashion Forward Campaign',
                            category: 'PPC & Social Media',
                            client: 'Urban Style Co.',
                            date: 'March 2023',
                            description: 'An integrated digital marketing campaign combining PPC advertising and social media marketing to launch a new fashion collection.',
                            challenge: 'Urban Style needed to create buzz around their new collection launch while driving direct sales in a highly competitive market.',
                            solution: 'We developed a multi-channel strategy with targeted Google and Facebook ads combined with an influencer campaign and engaging social content.',
                            results: [
                                '4.2x return on ad spend (ROAS)',
                                '50K+ new Instagram followers',
                                '28% increase in direct website traffic',
                                '35% higher conversion rate than previous campaigns',
                                'Sold out of 3 product lines within 48 hours'
                            ],
                            testimonial: {
                                text: 'The campaign exceeded all our KPIs and created incredible brand momentum. Digital Nexus understood our aesthetic and audience perfectly.',
                                author: 'Jessica Martinez, Brand Manager at Urban Style Co.'
                            },
                            images: [
                                'assets/images/portfolio/project-2-detail-1.jpg',
                                'assets/images/portfolio/project-2-detail-2.jpg',
                                'assets/images/portfolio/project-2-detail-3.jpg'
                            ]
                        },
                        // Add more projects as needed
                    };
                    
                    return projects[projectId] || {
                        title: 'Project Details',
                        description: 'Project information is not available.'
                    };
                }
                
                function createProjectModal(project) {
                    // Create modal elements
                    const modal = document.createElement('div');
                    modal.className = 'project-modal';
                    
                    const modalContent = document.createElement('div');
                    modalContent.className = 'project-modal-content';
                    
                    // Create close button
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'project-modal-close';
                    closeBtn.innerHTML = '&times;';
                    
                    // Create content
                    const modalInner = document.createElement('div');
                    modalInner.className = 'project-modal-inner';
                    
                    // Create image slider if images exist
                    let imageSlider = '';
                    if (project.images && project.images.length > 0) {
                        imageSlider = `
                            <div class="project-modal-slider">
                                <div class="project-slider-track">
                                    ${project.images.map(image => `
                                        <div class="project-slider-item">
                                            <img src="${image}" alt="${project.title}">
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="project-slider-nav">
                                    <button class="project-slider-prev"><i class="fas fa-arrow-left"></i></button>
                                    <button class="project-slider-next"><i class="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        `;
                    }
                    
                    // Create project details
                    modalInner.innerHTML = `
                        <div class="project-modal-header">
                            <span class="project-modal-category">${project.category || ''}</span>
                            <h2 class="project-modal-title">${project.title}</h2>
                        </div>
                        
                        ${imageSlider}
                        
                        <div class="project-modal-details">
                            <div class="project-modal-info">
                                ${project.client ? `<div class="project-info-item"><span>Client:</span> ${project.client}</div>` : ''}
                                ${project.date ? `<div class="project-info-item"><span>Date:</span> ${project.date}</div>` : ''}
                            </div>
                            
                            <div class="project-modal-description">
                                <p>${project.description || ''}</p>
                                
                                ${project.challenge ? `
                                    <h3>The Challenge</h3>
                                    <p>${project.challenge}</p>
                                ` : ''}
                                
                                ${project.solution ? `
                                    <h3>Our Solution</h3>
                                    <p>${project.solution}</p>
                                ` : ''}
                                
                                ${project.results && project.results.length > 0 ? `
                                    <h3>Results</h3>
                                    <ul class="project-results-list">
                                        ${project.results.map(result => `<li><i class="fas fa-check-circle"></i> ${result}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                
                                ${project.testimonial ? `
                                    <div class="project-testimonial">
                                        <p class="testimonial-text">"${project.testimonial.text}"</p>
                                        <p class="testimonial-author">— ${project.testimonial.author}</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="project-modal-footer">
                            <a href="#contact" class="btn btn-primary">Start Your Project <i class="fas fa-arrow-right"></i></a>
                        </div>
                    `;
                    
                    // Append elements
                    modalContent.appendChild(closeBtn);
                    modalContent.appendChild(modalInner);
                    modal.appendChild(modalContent);
                    document.body.appendChild(modal);
                    
                    // Add no-scroll class to body
                    document.body.classList.add('no-scroll');
                    
                    // Show modal with animation
                    setTimeout(() => {
                        modal.style.opacity = '1';
                    }, 10);
                    
                    // Initialize image slider if exists
                    const sliderTrack = modal.querySelector('.project-slider-track');
                    const prevBtn = modal.querySelector('.project-slider-prev');
                    const nextBtn = modal.querySelector('.project-slider-next');
                    
                    if (sliderTrack && prevBtn && nextBtn) {
                        let currentSlide = 0;
                        const slides = sliderTrack.querySelectorAll('.project-slider-item');
                        const slideWidth = 100; // percentage
                        
                        // Set initial position
                        sliderTrack.style.transform = `translateX(0%)`;
                        
                        // Previous slide button
                        prevBtn.addEventListener('click', () => {
                            if (currentSlide > 0) {
                                currentSlide--;
                                updateSlider();
                            }
                        });
                        
                        // Next slide button
                        nextBtn.addEventListener('click', () => {
                            if (currentSlide < slides.length - 1) {
                                currentSlide++;
                                updateSlider();
                            }
                        });
                        
                        function updateSlider() {
                            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
                        }
                    }
                    
                    // Close modal when clicking close button or outside the content
                    closeBtn.addEventListener('click', closeModal);
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            closeModal();
                        }
                    });
                    
                    // Close modal with escape key
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'Escape') {
                            closeModal();
                        }
                    });
                    
                    // Close modal function
                    function closeModal() {
                        modal.style.opacity = '0';
                        document.body.classList.remove('no-scroll');
                        
                        setTimeout(() => {
                            document.body.removeChild(modal);
                        }, 300);
                    }
                    
                    // Scroll to section when clicking on a link inside the modal
                    const modalLinks = modal.querySelectorAll('a[href^="#"]');
                    
                    modalLinks.forEach(link => {
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            
                            const targetId = this.getAttribute('href');
                            const targetElement = document.querySelector(targetId);
                            
                            // Close the modal
                            closeModal();
                            
                            // Scroll to the target section after modal is closed
                            setTimeout(() => {
                                if (targetElement) {
                                    const headerHeight = document.getElementById('header').offsetHeight;
                                    const targetPosition = targetElement.offsetTop - headerHeight;
                                    
                                    window.scrollTo({
                                        top: targetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                            }, 300);
                        });
                    });
                }
            }
        
            // Initialize project modals
            initProjectModals();
        
            /**
             * Newsletter Form
             * Handles newsletter subscription
             */
            function initNewsletterForm() {
                const newsletterForm = document.querySelector('.newsletter-form');
                
                if (!newsletterForm) return;
                
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const emailInput = this.querySelector('input[type="email"]');
                    const submitBtn = this.querySelector('button[type="submit"]');
                    
                    if (!emailInput || !submitBtn) return;
                    
                    // Validate email
                    const email = emailInput.value.trim();
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    if (!email || !emailPattern.test(email)) {
                        emailInput.classList.add('error');
                        return;
                    }
                    
                    // Remove error class if present
                    emailInput.classList.remove('error');
                    
                    // Show loading state
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission (replace with actual AJAX call in production)
                    setTimeout(() => {
                        // Success state
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                        submitBtn.classList.add('success');
                        
                        // Show success message
                        const formNotice = newsletterForm.querySelector('.form-notice');
                        const originalNotice = formNotice.innerHTML;
                        
                        formNotice.innerHTML = '<span class="success-message">Thank you for subscribing! You\'ll receive our next newsletter soon.</span>';
                        
                        // Reset form
                        emailInput.value = '';
                        
                        // Reset button and notice after 3 seconds
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('success');
                            formNotice.innerHTML = originalNotice;
                        }, 3000);
                    }, 1500);
                    
                    // In production, replace the setTimeout with actual form submission:
                    /*
                    fetch('subscribe.php', {
                        method: 'POST',
                        body: new FormData(newsletterForm),
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle success
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                        emailInput.value = '';
                    })
                    .catch(error => {
                        // Handle error
                        submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
                        console.error('Error:', error);
                    })
                    .finally(() => {
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }, 3000);
                    });
                    */
                });
                
                // Real-time validation
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                
                if (emailInput) {
                    emailInput.addEventListener('blur', function() {
                        const email = this.value.trim();
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        
                        if (!email || !emailPattern.test(email)) {
                            this.classList.add('error');
                        } else {
                            this.classList.remove('error');
                        }
                    });
                    
                    emailInput.addEventListener('input', function() {
                        if (this.classList.contains('error')) {
                            const email = this.value.trim();
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            
                            if (email && emailPattern.test(email)) {
                                this.classList.remove('error');
                            }
                        }
                    });
                }
            }
        
            // Initialize newsletter form
            initNewsletterForm();
        
            /**
             * Lazy Loading
             * Lazy loads images for better performance
             */
            function initLazyLoading() {
                if ('loading' in HTMLImageElement.prototype) {
                    // Browser supports native lazy loading
                    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
                    lazyImages.forEach(img => {
                        img.src = img.dataset.src;
                    });
                } else {
                    // Fallback for browsers that don't support native lazy loading
                    const lazyImages = document.querySelectorAll('.lazy-image');
                    
                    if (lazyImages.length === 0) return;
                    
                    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const lazyImage = entry.target;
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.classList.remove('lazy-image');
                                lazyImageObserver.unobserve(lazyImage);
                            }
                        });
                    });
                    
                    lazyImages.forEach(image => {
                        lazyImageObserver.observe(image);
                    });
                }
            }
        
            // Initialize lazy loading
            initLazyLoading();
        })();