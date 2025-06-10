/**
 * Animations.js
 * Digital Nexus - Digital Marketing Agency
 *
 * This file contains custom animations and initializes animation libraries
 * for creating engaging visual effects throughout the website.
 */

(function() {
    'use strict';

    // Store references to created DOM elements for cleanup
    const createdElements = [];

    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize animations in a controlled sequence to prevent layout shifts
        initializeAnimationsSequentially();
    });

    /**
     * Initialize animations in a controlled sequence to prevent layout shifts
     */
    function initializeAnimationsSequentially() {
        // First wave - essential animations that don't affect layout
        initHeroAnimations();
        
        // Second wave - animations with slight delay
        setTimeout(() => {
            initScrollAnimations();
            initCounterAnimations();
            
            // Third wave - less critical animations
            setTimeout(() => {
                initServiceCardAnimations();
                initHoverAnimations();
                
                // Fourth wave - final animations
                setTimeout(() => {
                    initFloatingElements();
                    initProcessStepAnimations();
                    initCarouselAnimations();
                    initScrollProgressIndicator();
                    initTextAnimations();
                    initSmoothScrolling();
                    setupAnimationAccessibility();
                }, 400);
            }, 300);
        }, 200);
    }

    /**
     * Scroll-based animations using Intersection Observer
     * Detects when elements enter the viewport and applies animations
     */
    function initScrollAnimations() {
        // Select all elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.animate-fade-up, .animate-fade-down, .animate-fade-left, ' +
            '.animate-fade-right, .animate-scale-in, .animate-on-scroll'
        );

        if (animatedElements.length === 0) return;

        // Configure the intersection observer
        const observerOptions = {
            root: null, // viewport is the root
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% of the element is visible
        };

        // Create an observer instance
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the visible class to trigger the animation
                    entry.target.classList.add('animated', 'visible');
                    
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Start observing all elements with animation classes
        animatedElements.forEach(element => {
            // Set initial state
            element.classList.add('will-animate');
            observer.observe(element);
        });
    }

    /**
     * Hero section animations
     * Animates elements in the hero section when the page loads
     */
    function initHeroAnimations() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Get all hero elements that need to be animated
        const heroTitle = heroSection.querySelector('.hero-title');
        const heroDescription = heroSection.querySelector('.hero-description');
        const heroButtons = heroSection.querySelector('.hero-buttons');
        const heroStats = heroSection.querySelector('.hero-stats');
        const heroVisual = heroSection.querySelector('.hero-visual');

        // Use CSS classes for animations instead of inline styles
        if (heroTitle) heroTitle.classList.add('animate-fade-up', 'delay-200');
        if (heroDescription) heroDescription.classList.add('animate-fade-up', 'delay-400');
        if (heroButtons) heroButtons.classList.add('animate-fade-up', 'delay-600');
        if (heroStats) heroStats.classList.add('animate-fade-up', 'delay-800');
        if (heroVisual) heroVisual.classList.add('animate-scale-in', 'delay-400');
    }

    /**
     * Counter animations for statistics
     * Animates number counters when they become visible in the viewport
     */
    function initCounterAnimations() {
        const statValues = document.querySelectorAll('.stat-value, .stat-number');
        if (statValues.length === 0) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    
                    // Parse as float and handle possible NaN values
                    const targetText = counter.dataset.count || counter.textContent || '0';
                    const target = parseFloat(targetText.replace(/,/g, '')) || 0;
                    const hasSuffix = counter.dataset.suffix || '';
                    
                    // Check for decimal places in the original value
                    const isDecimal = targetText.includes('.'); 
                    const decimalPlaces = isDecimal ? 
                        targetText.split('.')[1].length : 0;
                    
                    const duration = 2000; // 2 seconds duration

                    let startTime;
                    let currentCount = 0;

                    function updateCounter(timestamp) {
                        if (!startTime) startTime = timestamp;

                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        currentCount = progress * target;

                        // Format the display value based on decimals in original value
                        if (isDecimal) {
                            counter.textContent = currentCount.toFixed(decimalPlaces) + hasSuffix;
                        } else {
                            counter.textContent = Math.floor(currentCount) + hasSuffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            // Ensure final value is exact
                            counter.textContent = isDecimal ? 
                                target.toFixed(decimalPlaces) + hasSuffix : 
                                Math.floor(target) + hasSuffix;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, options);

        statValues.forEach(stat => {
            observer.observe(stat);
        });
    }

    /**
     * Text animations for headings and content
     */
    function initTextAnimations() {
        // Typing text effect for certain headings
        const typingElements = document.querySelectorAll('.typing-animation');

        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeText(element, text);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });

        function typeText(element, text, index = 0) {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(() => typeText(element, text, index), 50);
            } else {
                element.classList.add('typing-complete');
            }
        }

        // Split text animation
        const splitTextElements = document.querySelectorAll('.split-text');
        
        splitTextElements.forEach(element => {
            // Only process if not already processed
            if (!element.classList.contains('split-processed')) {
                element.classList.add('split-processed');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            element.classList.add('animate');
                            observer.unobserve(element);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(element);
            }
        });
    }

    /**
     * Hover animations
     * Enhances interactive elements with hover effects
     */
    function initHoverAnimations() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('btn-hover');
            });

            button.addEventListener('mouseleave', function() {
                this.classList.remove('btn-hover');
            });
        });

        // Service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('card-hover');
            });

            card.addEventListener('mouseleave', function() {
                this.classList.remove('card-hover');
            });
        });

        // Team member hover effects
        const teamCards = document.querySelectorAll('.team-card');

        teamCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const socialLinks = this.querySelectorAll('.social-icon');
                socialLinks.forEach(link => link.classList.add('icon-animated'));
            });

            card.addEventListener('mouseleave', function() {
                const socialLinks = this.querySelectorAll('.social-icon');
                socialLinks.forEach(link => link.classList.remove('icon-animated'));
            });
        });
    }

    /**
     * Service card animations
     * Special effects for service cards section
     */
    function initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length === 0) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = Array.from(serviceCards).indexOf(card);
                    
                    setTimeout(() => {
                        card.classList.add('service-card-visible', 'animated');
                    }, index * 100);
                    
                    observer.unobserve(card);
                }
            });
        }, options);

        serviceCards.forEach(card => {
            observer.observe(card);
        });

        // Service icon animation
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon');
            const iconBg = card.querySelector('.service-icon-bg');

            if (icon && iconBg) {
                card.addEventListener('mouseenter', () => {
                    icon.classList.add('icon-hover');
                    iconBg.classList.add('icon-bg-hover');
                });

                card.addEventListener('mouseleave', () => {
                    icon.classList.remove('icon-hover');
                    iconBg.classList.remove('icon-bg-hover');
                });
            }
        });
    }

    /**
     * Floating elements animation
     * Controls the floating animations for decorative elements
     */
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element, .element-1, .element-2, .element-3');
        if (floatingElements.length === 0) return;

        floatingElements.forEach((element, index) => {
            // Add animation classes instead of inline styles
            element.classList.add('animate-float');
            
            // Add delay based on index
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    /**
     * Process step animations
     * Animates the process/timeline sections
     */
    function initProcessStepAnimations() {
        const processSteps = document.querySelectorAll('.process-step');
        if (processSteps.length === 0) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    const stepNumber = step.querySelector('.step-number');
                    const stepContent = step.querySelector('.step-content');

                    // Add animated class to trigger animations
                    step.classList.add('step-animated');

                    if (stepNumber) stepNumber.classList.add('number-animated');
                    if (stepContent) stepContent.classList.add('content-animated');

                    observer.unobserve(step);
                }
            });
        }, options);

        processSteps.forEach(step => {
            observer.observe(step);
        });

        // Process flow line animation
        const processFlow = document.querySelector('.process-flow');
        if (processFlow && !processFlow.querySelector('.process-flow-line')) {
            const flowLine = document.createElement('div');
            flowLine.classList.add('process-flow-line');
            processFlow.appendChild(flowLine);
            createdElements.push({ element: flowLine, parent: processFlow });
            
            // Animation function
            function animateProcessLine() {
                if (!document.body.contains(processFlow) || !document.body.contains(flowLine)) return;
                
                const scrollPosition = window.scrollY;
                const flowTop = processFlow.getBoundingClientRect().top + window.pageYOffset;
                const flowHeight = processFlow.offsetHeight;
                const windowHeight = window.innerHeight;
                
                if (scrollPosition + windowHeight > flowTop && scrollPosition < flowTop + flowHeight) {
                    const scrolled = (scrollPosition + windowHeight - flowTop) / (flowHeight + windowHeight / 2);
                    const height = Math.max(0, Math.min(100, scrolled * 100));
                    flowLine.style.height = `${height}%`;
                }
            }
            
            // Add to global scroll handler
            addScrollHandler(animateProcessLine);
            
            // Initial call
            setTimeout(animateProcessLine, 500);
        }
    }

    /**
     * Carousel/Slider animations
     * Enhances testimonial sliders and other carousel elements
     */
    function initCarouselAnimations() {
        // Testimonial slider animations
        const testimonialTracks = document.querySelectorAll('.testimonial-track');

        testimonialTracks.forEach(track => {
            const testimonials = track.querySelectorAll('.testimonial-card');
            if (testimonials.length === 0) return;

            // Add animation classes to testimonial cards
            testimonials.forEach((testimonial, index) => {
                testimonial.classList.add('testimonial-animated');
                testimonial.style.animationDelay = `${index * 0.2}s`;
            });

            // Create observer to animate testimonials when they come into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        track.classList.add('track-visible');
                        observer.unobserve(track);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(track);
        });

        // Logo ticker animations
        const logoTracks = document.querySelectorAll('.logo-track');

        logoTracks.forEach(track => {
            // Add logo clones for seamless looping if not already done
            if (!track.dataset.cloningDone) {
                const logos = track.querySelectorAll('.logo-item');
                if (logos.length === 0) return;
                
                logos.forEach(logo => {
                    const clone = logo.cloneNode(true);
                    track.appendChild(clone);
                });
                
                track.dataset.cloningDone = 'true';
            }
        });
    }

    /**
     * Scroll Progress Indicator
     * Shows a progress bar indicating how far the user has scrolled down the page
     */
    function initScrollProgressIndicator() {
        // Create progress bar if it doesn't already exist
        let progressBar = document.querySelector('.scroll-progress-bar');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress-bar';
            document.body.appendChild(progressBar);
            createdElements.push({ element: progressBar, parent: document.body });
        }

        function updateProgressBar() {
            if (!document.body.contains(progressBar)) return;
            
            const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (totalHeight <= 0) return; // Prevent division by zero
            
            const scrollPercentage = Math.min(100, Math.max(0, (windowScroll / totalHeight) * 100));
            progressBar.style.width = `${scrollPercentage}%`;
            
            if (scrollPercentage > 0.1 && scrollPercentage < 99.9) {
                progressBar.classList.add('active');
            } else {
                progressBar.classList.remove('active');
            }
        }

        // Add to global scroll handler
        addScrollHandler(updateProgressBar);
        
        // Initial call
        setTimeout(updateProgressBar, 100);
    }

    /**
     * Unified scroll handler to improve performance
     * Uses a single requestAnimationFrame for all scroll-based animations
     */
    const scrollHandlers = [];
    let isScrolling = false;

    function addScrollHandler(handler) {
        if (typeof handler === 'function') {
            scrollHandlers.push(handler);
            
            // Set up the scroll listener if this is the first handler
            if (scrollHandlers.length === 1) {
                window.addEventListener('scroll', handleScroll);
            }
        }
    }

    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Run all registered scroll handlers
                scrollHandlers.forEach(handler => {
                    try {
                        handler();
                    } catch (error) {
                        console.error('Error in scroll handler:', error);
                    }
                });
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    /**
     * Smooth Scrolling
     * Provides smooth scrolling to anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Get header height for proper offset
                    const header = document.querySelector('header') || document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const additionalOffset = 20; // Extra space for better positioning
                    
                    // Calculate position accounting for fixed header
                    const targetPosition = targetElement.getBoundingClientRect().top + 
                                          window.pageYOffset - 
                                          headerHeight - 
                                          additionalOffset;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Animation accessibility controls
     * Respects user preferences for reduced motion
     */
    function setupAnimationAccessibility() {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        function handleReducedMotion(event) {
            if (event.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        }

        // Initial check
        handleReducedMotion(motionQuery);

        // Listen for changes
        try {
            motionQuery.addEventListener('change', handleReducedMotion);
        } catch (e) {
            // Fallback for older browsers
            motionQuery.addListener(handleReducedMotion);
        }
    }

    /**
     * Fix common modal issues that affect scrolling
     * Ensures body scroll is restored when modals close
     */
    function fixModalScrollIssues() {
        // Observe DOM for modal elements being added/removed
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        // Check if added node is a modal
                        if (node.nodeType === 1 && 
                           (node.classList.contains('video-modal') || 
                            node.classList.contains('project-modal'))) {
                            
                            // Ensure modal has proper close behavior
                            fixModalClose(node);
                        }
                    });
                }
                
                // Check for removed modals
                if (mutation.removedNodes.length) {
                    // Ensure body scroll is restored if all modals are closed
                    const activeModals = document.querySelectorAll('.video-modal.active, .project-modal.active');
                    if (activeModals.length === 0 && document.body.classList.contains('no-scroll')) {
                        document.body.classList.remove('no-scroll');
                    }
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Add proper close behavior to existing modals
        document.querySelectorAll('.video-modal, .project-modal').forEach(fixModalClose);
    }
    
    function fixModalClose(modal) {
        // Ensure close button properly removes no-scroll class
        const closeBtn = modal.querySelector('.video-modal-close, .project-modal-close');
        if (closeBtn) {
            // Replace existing click handler with a safer one
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            newCloseBtn.addEventListener('click', () => {
                modal.style.opacity = '0';
                document.body.classList.remove('no-scroll');
                
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            });
        }
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.opacity = '0';
                document.body.classList.remove('no-scroll');
                
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            }
        });
        
        // Add escape key handler
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape' && document.body.contains(modal)) {
                modal.style.opacity = '0';
                document.body.classList.remove('no-scroll');
                
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
                
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    /**
     * Fix testimonial slider touch events to prevent scroll blocking
     */
    function fixTestimonialSliders() {
        const testimonialTracks = document.querySelectorAll('.testimonial-track');
        
        testimonialTracks.forEach(track => {
            // Store starting touch coordinates to determine direction
            let startX = 0;
            let startY = 0;
            let isHorizontalSwipe = false;
            
            // Replace problematic touch handlers
            const replaceTouchHandlers = () => {
                // Create new track element to replace the old one with clean handlers
                const newTrack = track.cloneNode(true);
                track.parentNode.replaceChild(newTrack, track);
                
                // Add proper touch handlers
                newTrack.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                    isHorizontalSwipe = false;
                }, { passive: true });
                
                newTrack.addEventListener('touchmove', function(e) {
                    if (!startX || !startY) return;
                    
                    const moveX = e.touches[0].clientX - startX;
                    const moveY = e.touches[0].clientY - startY;
                    
                    // Determine if swipe is primarily horizontal
                    if (!isHorizontalSwipe) {
                        isHorizontalSwipe = Math.abs(moveX) > Math.abs(moveY);
                    }
                    
                    // Only prevent default for horizontal swipes
                    if (isHorizontalSwipe) {
                        e.preventDefault();
                    }
                }, { passive: false });
            };
            
            // Replace handlers with a small delay to ensure DOM is ready
            setTimeout(replaceTouchHandlers, 500);
        });
    }

    /**
     * Fix potential overflow issues that cause horizontal scrollbars
     */
    function fixOverflowIssues() {
        // Find and fix any elements causing horizontal overflow
        const findOverflowingElements = () => {
            const docWidth = document.documentElement.clientWidth;
            
            // Check specific problematic container types first
            const containers = document.querySelectorAll('section, .container, .hero-content, .services-grid');
            
            containers.forEach(container => {
                if (container.scrollWidth > docWidth) {
                    // Fix the container width without setting overflow hidden
                    container.style.maxWidth = '100%';
                    container.style.boxSizing = 'border-box';
                    
                    // Look for problem children within this container
                    Array.from(container.children).forEach(child => {
                        if (child.scrollWidth > container.clientWidth) {
                            child.style.maxWidth = '100%';
                            child.style.boxSizing = 'border-box';
                        }
                    });
                }
            });
            
            // Only set overflow hidden on specific elements, not globally
            const fixWidth = (el) => {
                if (el.scrollWidth > docWidth + 5) { // Add small buffer
                    el.style.maxWidth = '100%';
                    // Avoid using overflow-x: hidden globally
                }
            };
            
            // Fix the most common overflow culprits
            fixWidth(document.querySelector('.hero-content'));
            fixWidth(document.querySelector('.services-grid'));
            fixWidth(document.querySelector('.portfolio-grid'));
            fixWidth(document.querySelector('.testimonials-slider'));
        };
        
        // Run on load and resize
        setTimeout(findOverflowingElements, 1000);
        window.addEventListener('resize', findOverflowingElements);
    }

    /**
     * Cleanup function to prevent memory leaks
     */
    function cleanupAnimations() {
        // Remove created DOM elements
        createdElements.forEach(item => {
            if (item.element && item.parent && item.parent.contains(item.element)) {
                item.parent.removeChild(item.element);
            }
        });
        
        // Remove scroll event listener
        window.removeEventListener('scroll', handleScroll);
        
        // Ensure body scroll is restored
        if (document.body.classList.contains('no-scroll')) {
            document.body.classList.remove('no-scroll');
        }
    }

    // Initialize modal and slider fixes
    fixModalScrollIssues();
    fixTestimonialSliders();
    fixOverflowIssues();

    // Clean up on page unload to prevent memory leaks
    window.addEventListener('beforeunload', cleanupAnimations);
})();