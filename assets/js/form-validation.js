/**
 * form-validation.js
 * Digital Nexus - Digital Marketing Agency
 *
 * This file contains validation and submission logic for all forms.
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initContactForm();
        initNewsletterForm();
    });

    /**
     * Contact Form
     * Handles form submission and validation
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const isChecked = field.type === 'checkbox' ? field.checked : !!field.value.trim();
                if (!isChecked) {
                    isValid = false;
                    field.classList.add('error');
                    // For select and checkbox, find the parent to show the error state
                    if(field.parentElement.classList.contains('checkbox-wrapper') || field.tagName === 'SELECT') {
                        field.parentElement.classList.add('error');
                    }
                } else {
                    field.classList.remove('error');
                     if(field.parentElement.classList.contains('checkbox-wrapper') || field.tagName === 'SELECT') {
                        field.parentElement.classList.remove('error');
                    }
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
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.classList.add('success');
                    contactForm.reset();

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                    }, 3000);
                }, 1500);
            }
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (this.hasAttribute('required')) {
                    const isChecked = this.type === 'checkbox' ? this.checked : !!this.value.trim();
                    if (!isChecked) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                }
            });
        });
    }

    /**
     * Newsletter Form
     * Handles newsletter subscription
     */
    function initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (!emailInput || !submitBtn) return;

            const email = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || !emailPattern.test(email)) {
                emailInput.classList.add('error');
                return;
            }

            emailInput.classList.remove('error');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.classList.add('success');
                emailInput.value = '';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

})();