// Load Navigation Component
function loadNavigation() {
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            // Find all nav elements and replace them
            const navElements = document.querySelectorAll('nav.navbar');
            navElements.forEach(nav => {
                nav.outerHTML = data;
            });
        })
        .catch(error => {
            console.log('Navigation component not found, using existing navigation');
        });
}

// Mobile Navigation Functions
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNavMenu');
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        toggleButton.innerHTML = '☰';
    } else {
        mobileNav.classList.add('active');
        toggleButton.innerHTML = '✕';
    }
}

function closeMobileNav() {
    const mobileNav = document.getElementById('mobileNavMenu');
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    
    mobileNav.classList.remove('active');
    toggleButton.innerHTML = '☰';
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNavMenu');
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    
    if (!mobileNav.contains(event.target) && !toggleButton.contains(event.target)) {
        mobileNav.classList.remove('active');
        toggleButton.innerHTML = '☰';
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation component
    loadNavigation();
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
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
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#FFFFFF';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const frequency = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !frequency) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your interest! We\'ll contact you within 24 hours to schedule your free cleanup.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Add animation classes when elements come into view
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .faq-item, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click-to-call functionality for phone numbers
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.textContent.trim();
            if (confirm(`Call ${phoneNumber}?`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    });
    
    // Add email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent.trim();
            if (confirm(`Send email to ${email}?`)) {
                window.location.href = `mailto:${email}`;
            }
        });
    });
    
    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add loading state for CTA buttons that don't have href
            if (!this.hasAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--primary-mint) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize simple estimator
    initializeSimpleEstimator();
});

// Simple estimator functionality
function initializeSimpleEstimator() {
    const inputs = document.querySelectorAll('.simple-estimator select, .simple-estimator input[type="checkbox"]');
    
    inputs.forEach(input => {
        input.addEventListener('change', calculateSimplePrice);
    });
    
    // Calculate initial price
    calculateSimplePrice();
}

function calculateSimplePrice() {
    const frequency = document.getElementById('frequency').value;
    const dogs = parseInt(document.getElementById('dogs').value) || 1;
    const yardSize = document.getElementById('yard-size').value;
    const deodorizing = document.getElementById('deodorizing').checked;
    const hoseDown = document.getElementById('hose-down').checked;
    const priceValue = document.getElementById('priceValue');
    
    if (!frequency) {
        priceValue.textContent = '$0';
        return;
    }
    
    // Pricing based on main pricing page
    let basePrice = 0;
    if (frequency === 'weekly') basePrice = 15;
    else if (frequency === 'twice-weekly') basePrice = 15; // Same as weekly
    else if (frequency === 'bi-weekly') basePrice = 18;
    else if (frequency === 'monthly') basePrice = 18; // Same as bi-weekly
    else if (frequency === 'one-time') basePrice = 25;
    
    // Add for additional dogs
    if (dogs > 1) {
        basePrice += (dogs - 1) * 3; // Reduced from $6 to $3 per additional dog
    }
    
    // Add for yard size
    if (yardSize === 'medium') basePrice += 5; // Reduced from $8 to $5
    else if (yardSize === 'large') basePrice += 10; // Reduced from $15 to $10
    
    // Add for services (matching main pricing page)
    if (deodorizing) basePrice += 5; // Reduced from $15 to $5
    if (hoseDown) basePrice += 8; // Reduced from $15 to $8
    
    priceValue.textContent = '$' + Math.round(basePrice);
}

// Utility function for smooth animations
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-mint);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
addScrollToTop();

// Simple modal functionality
function openEstimateModal() {
    const modal = document.getElementById('estimateModal');
    const frequency = document.getElementById('frequency').value;
    const dogs = document.getElementById('dogs').value;
    const yardSize = document.getElementById('yard-size').value;
    const deodorizing = document.getElementById('deodorizing').checked;
    const hoseDown = document.getElementById('hose-down').checked;
    const price = document.getElementById('priceValue').textContent;
    
    // Update summary
    document.getElementById('summaryFrequency').textContent = getFrequencyLabel(frequency);
    document.getElementById('summaryDogs').textContent = dogs + ' Dog' + (dogs > 1 ? 's' : '');
    document.getElementById('summaryYardSize').textContent = getYardSizeLabel(yardSize);
    
    // Update add-ons
    const addons = [];
    if (deodorizing) addons.push('Deodorizing');
    if (hoseDown) addons.push('Hose Down Service');
    document.getElementById('summaryAddons').textContent = addons.length > 0 ? addons.join(', ') : 'None';
    
    document.getElementById('summaryPrice').textContent = price;
    
    // Populate form
    document.getElementById('formFrequency').value = frequency;
    document.getElementById('formDogs').value = dogs;
    document.getElementById('formYardSize').value = yardSize;
    document.getElementById('formDeodorizing').value = deodorizing ? 'Yes' : 'No';
    document.getElementById('formHoseDown').value = hoseDown ? 'Yes' : 'No';
    document.getElementById('formPrice').value = price;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeEstimateModal() {
    const modal = document.getElementById('estimateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Helper functions
function getFrequencyLabel(value) {
    const labels = {
        'weekly': 'Weekly',
        'twice-weekly': 'Twice Weekly',
        'bi-weekly': 'Bi-weekly',
        'monthly': 'Monthly',
        'one-time': 'One-time'
    };
    return labels[value] || '-';
}

function getYardSizeLabel(value) {
    const labels = {
        'small': 'Small (under 1/4 acre)',
        'medium': 'Medium (1/4 - 1/2 acre)',
        'large': 'Large (over 1/2 acre)'
    };
    return labels[value] || '-';
}
