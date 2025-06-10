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
        // Initialize animations in a controlled sequence with delays
        setTimeout(() => {
            initHeroAnimations();
            
            // Delay other animations to prevent layout shifts
            setTimeout(() => {
                initScrollAnimations();
                initFloatingElements();
                initServiceCardAnimations();
                
                // Final wave of animations
                setTimeout(() => {
                    initHoverAnimations();
                    initScrollProgressIndicator();
                    setupAnimationAccessibility();
                }, 300);
            }, 200);
        }, 100);
    });

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

        // Apply animations via CSS classes instead of inline styles
        if (heroTitle) heroTitle.classList.add('animate-fade-up', 'delay-200');
        if (heroDescription) heroDescription.classList.add('animate-fade-up', 'delay-400');
        if (heroButtons) heroButtons.classList.add('animate-fade-up', 'delay-600');
        if (heroStats) heroStats.classList.add('animate-fade-up', 'delay-800');
        if (heroVisual) heroVisual.classList.add('animate-scale-in', 'delay-400');
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
            // Apply delay based on index
            element.style.animationDelay = `${index * 0.5}s`;
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
     * Scroll Progress Indicator
     * Shows a progress bar indicating how far the user has scrolled down the page
     */
    function initScrollProgressIndicator() {
        // Check if progress bar already exists
        let progressBar = document.querySelector('.scroll-progress-bar');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress-bar';
            document.body.appendChild(progressBar);
            createdElements.push({ element: progressBar, parent: document.body });
        }

        // Update progress bar on scroll with throttling
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
            if (scrollPercentage > 0.1 && scrollPercentage < 99.9) {
                progressBar.classList.add('active');
            } else {
                progressBar.classList.remove('active');
            }
        }

        // Initial call to set progress bar state
        setTimeout(updateProgressBar, 100);
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
     * Fix issues with smooth scrolling by improving scroll compatibility
     */
    function fixScrollIssues() {
        // Find and fix any scrolling issues
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
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
                    
                    // Use requestAnimationFrame for smoother scrolling
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Fix scroll issues - call immediately for best performance
    fixScrollIssues();

    // Cleanup function to prevent memory leaks
    function cleanupAnimations() {
        // Remove created DOM elements
        createdElements.forEach(item => {
            if (item.element && item.parent && item.parent.contains(item.element)) {
                item.parent.removeChild(item.element);
            }
        });
    }

    // Clean up on page unload
    window.addEventListener('beforeunload', cleanupAnimations);

})();