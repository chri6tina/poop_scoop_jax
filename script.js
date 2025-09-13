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

// Mobile Dropdown Functions
function toggleMobileDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const dropdown = event.target.closest('.mobile-nav-dropdown');
    const isActive = dropdown.classList.contains('active');
    
    // Close all other dropdowns
    document.querySelectorAll('.mobile-nav-dropdown').forEach(dd => {
        dd.classList.remove('active');
    });
    
    // Toggle current dropdown
    if (!isActive) {
        dropdown.classList.add('active');
    }
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
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize pricing toggle
    initializePricingToggle();
    
    // Initialize cat pricing calculator
    initializeCatPricing();
});

// Helper function to get visits per month based on frequency
function getVisitsPerMonth(cell) {
    // Find the row this cell belongs to
    const row = cell.closest('tr');
    const frequencyCell = row.querySelector('.frequency-cell');
    const frequencyName = frequencyCell.querySelector('.frequency-name').textContent.toLowerCase();
    
    switch (frequencyName) {
        case 'weekly':
            return 4;
        case '2x weekly':
            return 8;
        case 'bi-weekly':
            return 2;
        case 'monthly':
            return 1;
        default:
            return 1;
    }
}

// Initialize pricing toggle functionality
function initializePricingToggle() {
    const toggleInputs = document.querySelectorAll('input[name="priceDisplay"]');
    const priceCells = document.querySelectorAll('.price-cell');
    
    toggleInputs.forEach(input => {
        input.addEventListener('change', function() {
            const displayType = this.value;
            
            priceCells.forEach(cell => {
                const monthlyPrice = cell.getAttribute('data-monthly');
                const perVisitPrice = cell.getAttribute('data-per-visit');
                const priceAmount = cell.querySelector('.price-amount');
                const pricePeriod = cell.querySelector('.price-period');
                const priceBreakdown = cell.querySelector('.price-breakdown');
                
                if (displayType === 'per-visit') {
                    priceAmount.textContent = '$' + perVisitPrice;
                    pricePeriod.textContent = '/visit';
                    if (priceBreakdown) {
                        // Update breakdown to show per-visit pricing
                        const visits = getVisitsPerMonth(cell);
                        priceBreakdown.textContent = `$${perVisitPrice} per visit`;
                    }
                } else {
                    priceAmount.textContent = '$' + monthlyPrice;
                    pricePeriod.textContent = '/month';
                    if (priceBreakdown) {
                        // Update breakdown to show multiplication
                        const visits = getVisitsPerMonth(cell);
                        priceBreakdown.textContent = `$${perVisitPrice} × ${visits} visits`;
                    }
                }
            });
        });
    });
}

// Simple estimator functionality
function initializeSimpleEstimator() {
    // Handle both estimator forms
    const inputs = document.querySelectorAll('.estimator-form select, .estimator-form input[type="checkbox"], .simple-estimator select, .simple-estimator input[type="checkbox"]');
    
    inputs.forEach(input => {
        input.addEventListener('change', calculateSimplePrice);
    });
    
    // Calculate initial price
    calculateSimplePrice();
}

function calculateSimplePrice() {
    // Find all price value elements and update them
    const priceElements = document.querySelectorAll('.price-value');
    
    // Get values from the first available form (they should be the same)
    const frequencySelect = document.getElementById('frequency');
    const dogsSelect = document.getElementById('dogs');
    const yardSizeSelect = document.getElementById('yard-size');
    const deodorizingCheck = document.getElementById('deodorizing');
    const hoseDownCheck = document.getElementById('hose-down');
    
    if (!frequencySelect || !dogsSelect || !yardSizeSelect || !deodorizingCheck || !hoseDownCheck) {
        return;
    }
    
    const frequency = frequencySelect.value;
    const dogs = parseInt(dogsSelect.value) || 1;
    const yardSize = yardSizeSelect.value;
    const deodorizing = deodorizingCheck.checked;
    const hoseDown = hoseDownCheck.checked;
    
    if (!frequency) {
        priceElements.forEach(priceValue => {
            priceValue.textContent = '$0';
        });
        return;
    }
    
    // New pricing matrix based on frequency and number of dogs
    let basePrice = 0;
    
    // Pricing matrix: [1 dog, 2 dogs, 3 dogs, 4+ dogs]
    const pricingMatrix = {
        'weekly': [100, 110, 120, 130],
        'twice-weekly': [180, 198, 216, 234],
        'bi-weekly': [75, 82.50, 90, 97.50],
        'monthly': [56.25, 61.88, 67.50, 73.13],
        'one-time': [25, 27.50, 30, 32.50] // One-time pricing (per visit)
    };
    
    // Get base price from matrix
    const dogIndex = Math.min(dogs - 1, 3); // Cap at 4+ dogs (index 3)
    basePrice = pricingMatrix[frequency][dogIndex];
    
    // Add for yard size (small adjustments)
    if (yardSize === 'medium') basePrice += 5;
    else if (yardSize === 'large') basePrice += 10;
    
    // Add for services
    if (deodorizing) basePrice += 5;
    if (hoseDown) basePrice += 8;
    
    const finalPrice = '$' + Math.round(basePrice);
    priceElements.forEach(priceValue => {
        priceValue.textContent = finalPrice;
    });
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

// Form submission handlers
function initializeFormHandlers() {
    // Handle main contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showThankYouPopup();
            this.reset();
        });
    }
    
    // Handle estimate submission form
    const estimateForm = document.getElementById('estimateSubmissionForm');
    if (estimateForm) {
        estimateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showThankYouPopup();
            this.reset();
        });
    }
    
    // Handle custom area request form
    const customAreaForm = document.getElementById('customAreaForm');
    if (customAreaForm) {
        customAreaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showThankYouPopup();
            this.reset();
        });
    }
    
    // Handle cat contact form
    const catContactForm = document.getElementById('catContactForm');
    if (catContactForm) {
        catContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showCatThankYouPopup();
            this.reset();
        });
    }
}

// Initialize scroll-to-top button
addScrollToTop();

// Thank you popup functionality
function showThankYouPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    popup.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
        <h2 style="color: var(--primary-mint); margin-bottom: 15px; font-family: var(--font-heading);">Thank You!</h2>
        <p style="color: var(--text-dark); margin-bottom: 25px; line-height: 1.6;">We've received your message and will get back to you within 24 hours.</p>
        <button onclick="closeThankYouPopup()" style="
            background: var(--primary-mint);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='var(--primary-teal)'" onmouseout="this.style.background='var(--primary-mint)'">
            Close
        </button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Add CSS animations
    if (!document.getElementById('popup-styles')) {
        const style = document.createElement('style');
        style.id = 'popup-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeThankYouPopup() {
    const overlay = document.querySelector('div[style*="position: fixed"]');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

// Cat-specific thank you popup functionality
function showCatThankYouPopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Create popup content
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
        position: relative;
    `;
    
    popup.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">🐱</div>
        <h2 style="color: #333; margin-bottom: 20px; font-family: 'Fredoka One', cursive;">Thank You!</h2>
        <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
            Thank you for your interest in our cat litter box cleaning service! 
            We'll contact you within 24 hours to discuss your cat's litter box needs and provide a detailed quote.
        </p>
        <p style="color: #666; margin-bottom: 30px; font-size: 0.9rem;">
            In the meantime, feel free to call us at <strong style="color: #00c5f5;">(904) 203-5012</strong> 
            if you have any questions about our cat services.
        </p>
        <button onclick="closeCatThankYouPopup()" style="
            background: linear-gradient(135deg, #00c5f5, #00a8d4);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            Close
        </button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeCatThankYouPopup();
        }
    });
}

function closeCatThankYouPopup() {
    const overlay = document.querySelector('div[style*="position: fixed"]');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

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

// Cat Pricing Calculator
function calculateCatPrice() {
    const catCount = parseInt(document.getElementById('catCount')?.value) || 1;
    const litterBoxCount = parseInt(document.getElementById('litterBoxCount')?.value) || 1;
    const litterType = document.getElementById('litterType')?.value || 'clay';
    const frequency = document.getElementById('serviceFrequency')?.value || 'weekly';
    const deepClean = document.getElementById('deepClean')?.checked || false;
    const odorControl = document.getElementById('odorControl')?.checked || false;
    
    // Base pricing for cat services
    let perVisitPrice = 0;
    
    // Single box pricing
    if (litterBoxCount === 1) {
        perVisitPrice = 20; // $20 per visit for single box
    } else if (litterBoxCount === 2) {
        perVisitPrice = 30; // $30 per visit for 2 boxes
    } else if (litterBoxCount === 3) {
        perVisitPrice = 45; // $45 per visit for 3 boxes
    } else {
        perVisitPrice = litterBoxCount * 12; // $12 per box for 4+ boxes
    }
    
    // Add litter type premium
    const litterTypePremiums = {
        'clay': 0,        // No premium for clay
        'clumping': 2,    // +$2 for clumping
        'crystal': 3,     // +$3 for crystal
        'natural': 5      // +$5 for natural/biodegradable
    };
    perVisitPrice += litterTypePremiums[litterType] || 0;
    
    // Add deep clean service
    if (deepClean) {
        perVisitPrice += 15; // Additional $15 for deep clean
    }
    
    // Add odor control
    if (odorControl) {
        perVisitPrice += 5; // Additional $5 for odor control
    }
    
    // Apply frequency multipliers
    const frequencyMultipliers = {
        'weekly': 4,      // 4 visits per month
        'bi-weekly': 2,   // 2 visits per month
        'monthly': 1,     // 1 visit per month
        'one-time': 1     // 1 visit
    };
    
    const visitsPerMonth = frequencyMultipliers[frequency] || 1;
    const monthlyPrice = perVisitPrice * visitsPerMonth;
    
    // Update price display
    const priceElement = document.getElementById('catPriceValue');
    const breakdownElement = document.getElementById('catPriceBreakdown');
    
    if (priceElement) {
        priceElement.textContent = '$' + Math.round(monthlyPrice);
    }
    
    if (breakdownElement) {
        if (frequency === 'one-time') {
            breakdownElement.innerHTML = `<small>One-time service: $${Math.round(perVisitPrice)}</small>`;
        } else {
            breakdownElement.innerHTML = `<small>Per visit: $${Math.round(perVisitPrice)} • ${visitsPerMonth} visits/month = $${Math.round(monthlyPrice)}</small>`;
        }
    }
}

// Cat Estimate Modal
function openCatEstimateModal() {
    const catCount = document.getElementById('catCount')?.value || '1';
    const litterBoxCount = document.getElementById('litterBoxCount')?.value || '1';
    const litterType = document.getElementById('litterType')?.value || 'clay';
    const frequency = document.getElementById('serviceFrequency')?.value || 'weekly';
    const deepClean = document.getElementById('deepClean')?.checked || false;
    const odorControl = document.getElementById('odorControl')?.checked || false;
    
    // Calculate pricing
    let perVisitPrice = 0;
    if (litterBoxCount === '1') {
        perVisitPrice = 20;
    } else if (litterBoxCount === '2') {
        perVisitPrice = 30;
    } else if (litterBoxCount === '3') {
        perVisitPrice = 45;
    } else {
        perVisitPrice = parseInt(litterBoxCount) * 12;
    }
    
    const litterTypePremiums = { 'clay': 0, 'clumping': 2, 'crystal': 3, 'natural': 5 };
    perVisitPrice += litterTypePremiums[litterType] || 0;
    
    if (deepClean) perVisitPrice += 15;
    if (odorControl) perVisitPrice += 5;
    
    const frequencyMultipliers = { 'weekly': 4, 'bi-weekly': 2, 'monthly': 1, 'one-time': 1 };
    const visitsPerMonth = frequencyMultipliers[frequency] || 1;
    const monthlyPrice = perVisitPrice * visitsPerMonth;
    
    // Create modal content
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🐱 Your Litter Box Service Quote</h2>
                <span class="close" onclick="closeThankYouPopup()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="quote-summary">
                    <h3>Service Details:</h3>
                    <ul>
                        <li><strong>Cats:</strong> ${catCount} cat${catCount > 1 ? 's' : ''}</li>
                        <li><strong>Litter Boxes:</strong> ${litterBoxCount} box${litterBoxCount > 1 ? 'es' : ''}</li>
                        <li><strong>Litter Type:</strong> ${litterType.charAt(0).toUpperCase() + litterType.slice(1)}</li>
                        <li><strong>Frequency:</strong> ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}</li>
                        ${deepClean ? '<li><strong>Deep Clean:</strong> Included</li>' : ''}
                        ${odorControl ? '<li><strong>Odor Control:</strong> Included</li>' : ''}
                    </ul>
                    <div class="price-summary">
                        <div class="price-item">
                            <span>Per Visit:</span>
                            <span>$${Math.round(perVisitPrice)}</span>
                        </div>
                        ${frequency !== 'one-time' ? `
                        <div class="price-item">
                            <span>Visits per Month:</span>
                            <span>${visitsPerMonth}</span>
                        </div>
                        <div class="price-item total">
                            <span>Monthly Total:</span>
                            <span>$${Math.round(monthlyPrice)}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                <p>Ready to get started? Contact us at <strong>(904) 203-5012</strong> or fill out our contact form below!</p>
            </div>
        </div>
    `;
    
    // Show modal
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.innerHTML = modalContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Initialize cat pricing calculator
function initializeCatPricing() {
    // Add event listeners for cat pricing calculator
    const catInputs = ['catCount', 'litterBoxCount', 'litterType', 'serviceFrequency', 'deepClean', 'odorControl'];
    catInputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.addEventListener('change', calculateCatPrice);
        }
    });
    
    // Initial calculation
    calculateCatPrice();
}
