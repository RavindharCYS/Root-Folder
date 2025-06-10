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
        // Initialize all animation functions
        initScrollAnimations();
        initHeroAnimations();
        initCounterAnimations();
        initParallaxEffects();
        initTextAnimations();
        initSectionTransitions();
        initHoverAnimations();
        initServiceCardAnimations();
        initFloatingElements();
        initProcessStepAnimations();
        initCarouselAnimations();
        initPreloaderAnimation();
        initScrollProgressIndicator();
        initSmoothScrolling();
        initPageTransitions();
        initSpecialSectionAnimations();
        initAurisegAnimations();
        setupAnimationAccessibility();

        // Initialize cursor effects with a small delay to ensure DOM is ready
        setTimeout(initCursorEffects, 1000);
        
        // Check for any elements causing overflow
        setTimeout(findOverflowingElements, 1500);
    });

    /**
     * Debug function to find elements causing overflow
     */
    function findOverflowingElements() {
        const docWidth = document.documentElement.offsetWidth;
        
        document.querySelectorAll('*').forEach(element => {
            const elementWidth = element.offsetWidth;
            if (elementWidth > docWidth) {
                console.log('Overflowing element:', element, 'Width:', elementWidth, 'Document width:', docWidth);
                // Optionally fix the overflowing element
                element.style.maxWidth = '100%';
                element.style.overflowX = 'hidden';
            }
        });
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
                    // Get animation type from class names
                    const element = entry.target;

                    // Add the visible class to trigger the animation
                    element.classList.add('animated', 'visible');

                    // Stop observing after animation is triggered
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Start observing all elements with animation classes
        animatedElements.forEach(element => {
            // Set initial state - hidden and translated
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
        const heroElements = [heroTitle, heroDescription, heroButtons, heroStats, heroVisual];

        // Create a sequence of animations with delays
        let delay = 0.2;

        heroElements.forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = element === heroVisual ? 'scale(0.95)' : 'translateY(30px)';

                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    element.style.opacity = '1';
                    element.style.transform = element === heroVisual ? 'scale(1)' : 'translateY(0)';
                }, delay * 1000);

                delay += 0.2;
            }
        });

        // Animate floating elements in the hero section
        const floatingElements = heroSection.querySelectorAll('.floating-element');

        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (delay + index * 0.2) * 1000);
        });
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
                    const target = parseFloat(targetText) || 0;
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
     * Parallax effects for background elements
     * Creates subtle movement on scroll for depth and visual interest
     */
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        if (parallaxElements.length === 0) return;

        // Initial calculation for all elements
        updateParallaxPositions();

        // Update on scroll with throttling for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateParallaxPositions();
                    ticking = false;
                });
                ticking = true;
            }
        });

        function updateParallaxPositions() {
            const scrollPosition = window.pageYOffset;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            const windowHeight = window.innerHeight;
            const isNearBottom = scrollPosition > documentHeight - windowHeight - 100;

            parallaxElements.forEach(element => {
                // Only process if element is still in the DOM
                if (!document.body.contains(element)) return;
                
                const speed = parseFloat(element.dataset.speed) || 0.2;
                const offset = element.offsetTop;
                
                // Only apply parallax if element is in or near viewport
                // AND we're not at the bottom of the page
                if (isInViewport(element, 300) && !isNearBottom) {
                    const yPos = (scrollPosition - offset) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                } else if (isNearBottom) {
                    // Reset transform when at the bottom to prevent whitespace
                    element.style.transform = '';
                }
            });
        }

        function isInViewport(element, buffer = 0) {
            const rect = element.getBoundingClientRect();
            return (
                rect.bottom + buffer >= 0 &&
                rect.top - buffer <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
    }

    /**
     * Text animations for headings and content
     * Applies various text animation effects like typing, fading, etc.
     */
    function initTextAnimations() {
        // Typing text effect for certain headings
        const typingElements = document.querySelectorAll('.typing-animation');

        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible'; // Make visible before typing

            // Create observer to start typing when element is in view
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

        // Split text for letter-by-letter animations
        const splitTextElements = document.querySelectorAll('.split-text');

        splitTextElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = ''; // Use innerHTML to clear and add spans
            element.style.visibility = 'visible';

            // Create spans for each letter
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Handle spaces
                span.style.animationDelay = `${i * 0.05}s`;
                span.style.display = 'inline-block'; // Important for transforms
                element.appendChild(span);
            }

            // Create observer to start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.classList.add('animate');
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    /**
     * Section transitions
     * Handles the animations between different sections as user scrolls
     */
    function initSectionTransitions() {
        const sections = document.querySelectorAll('section');
        if (sections.length === 0) return;

        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0 // Trigger as soon as any part enters the margin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');

                    // Animate section header elements
                    const header = entry.target.querySelector('.section-header');
                    if (header) {
                        const elements = header.querySelectorAll('.section-tag, .section-title, .section-description');
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('animated', 'visible'); // Add visible class
                            }, index * 200);
                        });
                    }
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
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

                // Add a ripple effect on mouseleave if class is present
                if (this.classList.contains('btn-ripple')) {
                    const ripple = document.createElement('span');
                    ripple.classList.add('btn-ripple-effect'); // Ensure this class has styles in CSS
                    this.appendChild(ripple);

                    // Remove ripple element after animation completes
                    setTimeout(() => {
                        if (ripple.parentNode === this) {
                            this.removeChild(ripple);
                        }
                    }, 600); // Match CSS animation duration
                }
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

                socialLinks.forEach((link, index) => {
                    link.style.transitionDelay = `${index * 0.05}s`;
                    link.classList.add('icon-animated');
                });
            });

            card.addEventListener('mouseleave', function() {
                const socialLinks = this.querySelectorAll('.social-icon');

                socialLinks.forEach(link => {
                    link.style.transitionDelay = '0s';
                    link.classList.remove('icon-animated');
                });
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

        // Staggered animation for service cards
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;

            // Set initial state for cards
            card.classList.add('service-card-hidden'); // Needs CSS for this initial state

            // Create observer to animate cards when they come into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.remove('service-card-hidden');
                            entry.target.classList.add('service-card-visible', 'animated'); // Add animated class
                        }, index * 100);

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

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
            // Set different animation delays for each element
            element.style.animationDelay = `${index * 0.5}s`;

            // Randomly set animation duration between 4-6s for variety
            const duration = 4 + Math.random() * 2;
            element.style.animationDuration = `${duration}s`;
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

        // Connect the steps with animated line
        const processFlow = document.querySelector('.process-flow');

        if (processFlow) {
            const flowLine = document.createElement('div');
            flowLine.classList.add('process-flow-line');
            processFlow.appendChild(flowLine);
            createdElements.push({ element: flowLine, parent: processFlow }); // Track for cleanup

            // Animate the line as user scrolls
            const animateLine = () => {
                if (!document.body.contains(processFlow)) return; // Check if element still exists
                
                const scrollPosition = window.scrollY;
                const flowTop = processFlow.offsetTop;
                const flowHeight = processFlow.offsetHeight;
                const windowHeight = window.innerHeight;

                // Only calculate if flowHeight is > 0 to avoid division by zero
                if (flowHeight > 0 && (scrollPosition + windowHeight > flowTop)) {
                    const scrollPercentage = Math.min(
                        1,
                        (scrollPosition + windowHeight - flowTop) / (flowHeight + windowHeight / 2)
                    );

                    flowLine.style.height = `${Math.max(0, scrollPercentage * 100)}%`; // Ensure height is not negative
                } else if (scrollPosition + windowHeight <= flowTop) {
                    flowLine.style.height = '0%'; // Reset if above the element
                }
            };

            // Use throttled scroll event for better performance
            let isScrolling = false;
            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    window.requestAnimationFrame(() => {
                        animateLine();
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            });
            
            // Initial call to set the line height on page load
            setTimeout(animateLine, 500);
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
            // Clone logo items to create a seamless loop
            const logos = track.querySelectorAll('.logo-item');
            if (logos.length === 0) return;

            // Only clone if not already done (check for data attribute)
            if (!track.dataset.cloningDone) {
                logos.forEach(logo => {
                    const clone = logo.cloneNode(true);
                    track.appendChild(clone);
                });
                track.dataset.cloningDone = 'true'; // Mark as done to prevent duplicate cloning
            }

            // Adjust animation duration based on the number of logos
            const duration = Math.max(20, logos.length * 2); // Ensure minimum duration
            track.style.animationDuration = `${duration}s`;

            // Pause animation on hover
            const logoTicker = track.closest('.logo-ticker');
            if (logoTicker) {
                logoTicker.addEventListener('mouseenter', () => {
                    track.style.animationPlayState = 'paused';
                });

                logoTicker.addEventListener('mouseleave', () => {
                    track.style.animationPlayState = 'running';
                });
            }
        });
    }

    /**
     * Preloader Animation
     * Controls the loading animation before the page is fully loaded
     */
    function initPreloaderAnimation() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Hide preloader and show content when page is loaded
        window.addEventListener('load', () => {
            // First fade out the preloader
            preloader.style.opacity = '0';

            // Then add a class to the body to trigger page animations
            document.body.classList.add('page-loaded');

            // Finally remove the preloader from DOM after transition
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500); // Match CSS transition duration
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
            // Make sure the progress bar is fixed and doesn't affect document flow
            progressBar.style.position = 'fixed';
            progressBar.style.top = '0';
            progressBar.style.left = '0';
            progressBar.style.width = '0';
            progressBar.style.height = '3px';
            progressBar.style.backgroundColor = '#007bff'; // Change to match your theme
            progressBar.style.zIndex = '1000';
            progressBar.style.pointerEvents = 'none';
            progressBar.style.transition = 'opacity 0.3s ease';
            
            document.body.appendChild(progressBar);
            createdElements.push({ element: progressBar, parent: document.body }); // Track for cleanup
        }

        // Throttled scroll handler for better performance
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    updateProgressBar();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        function updateProgressBar() {
            const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const totalScrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            // Prevent division by zero and negative values
            const scrollPercentage = totalScrollableHeight > 0 ? 
                Math.min(100, Math.max(0, (windowScroll / totalScrollableHeight) * 100)) : 0;

            progressBar.style.width = `${scrollPercentage}%`;

            // Add/remove active class for opacity transition
            if (scrollPercentage > 0.1 && scrollPercentage < 99.9) { // Show only when actively scrolling within content
                progressBar.style.opacity = '1';
            } else {
                progressBar.style.opacity = '0';
            }
        }

        // Initial call to set progress bar state
        setTimeout(updateProgressBar, 100);
    }

    /**
     * Cursor Effects (Optional)
     * Creates custom cursor effects on hover of specific elements
     */
    function initCursorEffects() {
        // Only initialize on desktop devices
        if (window.innerWidth < 992 || 'ontouchstart' in window) return;

        // Check if cursor elements already exist
        let cursor = document.querySelector('.custom-cursor');
        if (cursor) return; // Exit if already initialized

        // Create custom cursor elements
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        // Ensure cursor doesn't affect document flow
        cursor.style.position = 'fixed';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.visibility = 'hidden';
        cursor.style.transform = 'translate(-50%, -50%)';

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';

        const cursorCircle = document.createElement('div');
        cursorCircle.className = 'cursor-circle';

        // Append dot and circle to the main cursor parent
        cursor.appendChild(cursorDot);
        cursor.appendChild(cursorCircle);
        document.body.appendChild(cursor); // Append the main parent to the body
        createdElements.push({ element: cursor, parent: document.body }); // Track for cleanup

        // Use throttled mousemove for better performance
        let isMoving = false;
        document.addEventListener('mousemove', (e) => {
            cursor.style.visibility = 'visible'; // Show the parent

            if (!isMoving) {
                window.requestAnimationFrame(() => {
                    // Move the parent .custom-cursor element to the mouse position
                    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                    isMoving = false;
                });
                isMoving = true;
            }
        });

        document.addEventListener('mouseenter', () => { // Ensure cursor is visible when mouse enters window
            cursor.style.visibility = 'visible';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.visibility = 'hidden';
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item, .team-card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorCircle.classList.add('cursor-hover');
            });

            element.addEventListener('mouseleave', () => {
                cursorCircle.classList.remove('cursor-hover');
            });
        });
    }

    /**
     * Scroll To Anchor Links
     * Provides smooth scrolling to anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Get header height for offset
                    const header = document.querySelector('header.header'); // More specific selector
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    // Add a small additional offset to prevent sticking exactly at the edge
                    const additionalOffset = 20;

                    // Calculate target position with offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - additionalOffset;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Focus on target for accessibility
                    setTimeout(() => {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus({ preventScroll: true });
                    }, 1000);
                }
            });
        });
    }

    /**
     * Page Transition Effects
     * Adds transition effects when navigating between pages
     */
    function initPageTransitions() {
        // Check if transition overlay already exists
        let transitionOverlay = document.querySelector('.page-transition-overlay');
        if (!transitionOverlay) {
            // Create page transition overlay
            transitionOverlay = document.createElement('div');
            transitionOverlay.className = 'page-transition-overlay';
            
            // Fixed positioning to ensure it doesn't affect document flow
            transitionOverlay.style.position = 'fixed';
            transitionOverlay.style.top = '0';
            transitionOverlay.style.left = '0';
            transitionOverlay.style.width = '100%';
            transitionOverlay.style.height = '100%';
            transitionOverlay.style.backgroundColor = '#1a1a1a'; // Change as needed
            transitionOverlay.style.zIndex = '9999';
            transitionOverlay.style.pointerEvents = 'none';
            transitionOverlay.style.transform = 'translateX(100%)';
            transitionOverlay.style.transition = 'transform 0.4s ease';
            
            document.body.appendChild(transitionOverlay);
            createdElements.push({ element: transitionOverlay, parent: document.body }); // Track for cleanup
        }

        // Set initial state to be off-screen
        transitionOverlay.style.transform = 'translateX(100%)';

        // Get all links to internal pages
        const internalLinks = document.querySelectorAll(
            'a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"]):not([data-no-transition])'
        );

        internalLinks.forEach(link => {
            // Check if the link is to the same origin
            if (link.hostname === window.location.hostname) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    const targetHref = this.getAttribute('href');

                    // Show transition overlay
                    transitionOverlay.style.transform = 'translateX(0)'; // Slide in from right

                    // Navigate to the new page after transition completes
                    setTimeout(() => {
                        window.location.href = targetHref;
                    }, 400); // Match CSS transition duration
                });
            }
        });

        // Animate page entrance
        window.addEventListener('pageshow', (event) => { // Use pageshow for back/forward nav
            document.body.classList.add('page-entered');

            // Hide transition overlay when returning with back button or on initial load
            // Ensure this runs after the overlay is potentially shown
            if (event.persisted || (window.performance && performance.navigation.type === 2)) {
                transitionOverlay.style.transform = 'translateX(-100%)'; // Slide out to left
            } else {
                 // For initial page load, slide out after a brief moment if needed
                setTimeout(() => {
                    transitionOverlay.style.transform = 'translateX(-100%)'; // Slide out to left
                }, 50); // Small delay to ensure it's rendered first
            }
        });
    }

    /**
     * Special Section Animations
     * Custom animations for specific sections
     */
    function initSpecialSectionAnimations() {
        // Process Section Line Drawing
        const processSection = document.querySelector('.process');
        if (processSection) {
            const processSvg = processSection.querySelector('.process-svg'); // Assuming an SVG with paths exists

            if (processSvg) {
                const pathElements = processSvg.querySelectorAll('path');

                // Set initial state of paths
                pathElements.forEach(path => {
                    // Safety check for getTotalLength
                    if (path.getTotalLength) {
                        const length = path.getTotalLength();

                        // Set up the starting position
                        path.style.strokeDasharray = length;
                        path.style.strokeDashoffset = length;
                    }
                });

                // Create observer to animate paths when section is in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            pathElements.forEach((path, index) => {
                                setTimeout(() => {
                                    path.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                                    path.style.strokeDashoffset = '0';
                                }, index * 300);
                            });

                            observer.unobserve(processSvg);
                        }
                    });
                }, { threshold: 0.3 });

                observer.observe(processSvg);
            }
        }

        // CTA Section Parallax
        const ctaSection = document.querySelector('.cta');
        if (ctaSection) {
            const ctaImage = ctaSection.querySelector('.cta-image');

            if (ctaImage) {
                // Use throttled scroll for better performance
                let isScrolling = false;
                window.addEventListener('scroll', () => {
                    if (!isScrolling) {
                        window.requestAnimationFrame(() => {
                            if (document.body.contains(ctaSection) && document.body.contains(ctaImage)) {
                                const scrollPosition = window.pageYOffset;
                                const sectionTop = ctaSection.offsetTop;
                                const sectionHeight = ctaSection.offsetHeight;
                                const windowHeight = window.innerHeight;
                                const documentHeight = Math.max(
                                    document.body.scrollHeight,
                                    document.body.offsetHeight,
                                    document.documentElement.clientHeight,
                                    document.documentElement.scrollHeight,
                                    document.documentElement.offsetHeight
                                );
                                
                                // Check if we're at the bottom of the page to prevent issues
                                const isNearBottom = scrollPosition > documentHeight - windowHeight - 100;

                                if (scrollPosition + windowHeight > sectionTop && 
                                    scrollPosition < sectionTop + sectionHeight &&
                                    !isNearBottom)
                                    {
                                        const parallaxValue = (scrollPosition - sectionTop) * 0.15;
                                        ctaImage.style.transform = `translateY(${parallaxValue}px)`;
                                    } else if (isNearBottom) {
                                        // Reset transform to prevent whitespace at bottom
                                        ctaImage.style.transform = '';
                                    }
                                }
                                isScrolling = false;
                            });
                            isScrolling = true;
                        }
                    });
                }
            }
    
            // Hero Background Animation (mousemove)
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroBg = hero.querySelector('.hero-bg'); // Assuming a .hero-bg element exists
    
                if (heroBg && window.innerWidth > 991) { // Only on larger screens
                    // Use throttled mousemove for better performance
                    let isMoving = false;
                    window.addEventListener('mousemove', (e) => {
                        if (!isMoving) {
                            window.requestAnimationFrame(() => {
                                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
                                heroBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
                                isMoving = false;
                            });
                            isMoving = true;
                        }
                    });
                }
            }
        }
    
        /**
         * Auriseg-specific animations
         * Custom animations styled after the Auriseg design
         */
        function initAurisegAnimations() {
            // Add circuit board pattern animations if an element with class .auriseg-circuit exists
            const circuitElements = document.querySelectorAll('.auriseg-circuit'); // Assume this element contains SVG paths
    
            circuitElements.forEach(element => {
                const pathElements = element.querySelectorAll('path');
    
                pathElements.forEach((path, index) => {
                    // Set animation properties - these classes need to be defined in CSS
                    path.classList.add('circuit-path'); // Add class for base styles
                    path.style.animationDelay = `${index * 0.2}s`; // Stagger animation
                });
            });
    
            // Data node animations
            const dataNodes = document.querySelectorAll('.data-node');
            
            dataNodes.forEach((node, index) => {
                // Set different animation delays for each node
                node.style.animationDelay = `${index * 0.3}s`;
            });
            
            // Shield animation for cybersecurity theme
            const shieldElements = document.querySelectorAll('.shield-animation');
            
            // CSS already handles the shield animation through ::before pseudo-element
            shieldElements.forEach(element => {
                // Add event listeners for interactive shield elements if needed
                element.addEventListener('mouseenter', () => {
                    element.classList.add('shield-active');
                });
                
                element.addEventListener('mouseleave', () => {
                    element.classList.remove('shield-active');
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
                    
                    // Stop any ongoing animations that might be controlled by JS
                    const animatedElements = document.querySelectorAll('[class*="animate-"]');
                    animatedElements.forEach(element => {
                        element.style.animation = 'none';
                        element.style.transition = 'none';
                        element.style.transform = 'none'; // Reset any transforms
                    });
                } else {
                    document.body.classList.remove('reduced-motion');
                    // Don't automatically restart animations as it could be jarring
                    // Let them trigger again on scroll/interaction naturally
                }
            }
    
            // Initial check
            handleReducedMotion(motionQuery);
    
            // Listen for changes
            try {
                // Modern approach
                motionQuery.addEventListener('change', handleReducedMotion);
            } catch (e) {
                // Fallback for older browsers
                motionQuery.addListener(handleReducedMotion);
            }
        }
    
        /**
         * Fixes footer whitespace issue
         * Ensures proper behavior at bottom of page
         */
        function fixFooterWhitespace() {
            const footer = document.querySelector('footer');
            if (!footer) return;
            
            const checkFooterPosition = () => {
                const documentHeight = Math.max(
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight
                );
                
                const windowHeight = window.innerHeight;
                const scrollPosition = window.pageYOffset;
                
                // Check if we're near the bottom of the page
                if (scrollPosition + windowHeight >= documentHeight - 100) {
                    // Reset any transforms on parallax elements
                    document.querySelectorAll('.parallax').forEach(el => {
                        el.style.transform = '';
                    });
                    
                    // Reset any elements that might extend beyond the footer
                    document.querySelectorAll('.animated, .visible').forEach(el => {
                        if (el.getBoundingClientRect().bottom > footer.getBoundingClientRect().top) {
                            el.style.transform = '';
                        }
                    });
                    
                    // Apply a slight negative margin to the footer if needed
                    if (documentHeight > windowHeight && 
                        document.body.clientHeight > documentHeight) {
                        footer.style.marginTop = '-1px';
                    }
                }
            };
            
            // Check on scroll
            let isChecking = false;
            window.addEventListener('scroll', () => {
                if (!isChecking) {
                    window.requestAnimationFrame(() => {
                        checkFooterPosition();
                        isChecking = false;
                    });
                    isChecking = true;
                }
            });
            
            // Initial check
            setTimeout(checkFooterPosition, 500);
        }
    
        // Clean up function to prevent memory leaks and remove created elements
        function cleanupAnimations() {
            // Remove event listeners if necessary
            
            // Remove created DOM elements
            createdElements.forEach(item => {
                if (item.element && item.parent && item.parent.contains(item.element)) {
                    item.parent.removeChild(item.element);
                }
            });
            
            // Reset any potentially problematic styles
            document.querySelectorAll('.parallax').forEach(el => {
                el.style.transform = '';
            });
            
            // Clean up any animations that might be causing issues
            document.querySelectorAll('.animated, .visible, .will-animate').forEach(el => {
                el.style.transform = '';
            });
        }
    
        // Clean up on page unload
        window.addEventListener('beforeunload', cleanupAnimations);
        
        // Fix common overflow issues that might cause whitespace
        window.addEventListener('load', function() {
            fixFooterWhitespace();
            
            // Ensure the document doesn't have horizontal overflow
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflowX = 'hidden';
            
            // Set all sections to not exceed viewport width
            document.querySelectorAll('section, footer, header, .container, .container-fluid').forEach(el => {
                el.style.maxWidth = '100%';
            });
        });
    
    })();