// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize product filtering
    initProductFilter();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize progress bars
    initProgressBars();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize animations on cards
    initCardAnimations();
    
    // Initialize loading messages
    initLoadingMessages();
    
    // Initialize client logos
    initClientLogos();
}

// Loading Screen - Updated
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.querySelector('.progress-fill-loading');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loading screen after progress completes
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                
                // Show main content
                document.body.style.overflow = 'auto';
                
                // Trigger initial animations
                triggerInitialAnimations();
                
                // Start loading messages animation
                startLoadingMessages();
                
                // Start client logos animation
                startClientLogosAnimation();
            }, 500);
        }
        
        // Update progress bar width
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }, 100);
}

// Navigation
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.getElementById('mainHeader');
    const quoteCalculatorBtn = document.getElementById('quoteCalculatorBtn');
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Toggle dropdown on mobile
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                
                // Close all dropdowns
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });
    
    // Quote calculator button click - redirect to calculator page
    if (quoteCalculatorBtn) {
        quoteCalculatorBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'calculator.html';
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                
                // Close all dropdowns
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }
    
    // Update CTA buttons to link to calculator.html
    const ctaButtons = document.querySelectorAll('.btn-primary.btn-large.pulse-animation');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Get Free Quote') || button.textContent.includes('Get Quote')) {
            button.href = 'calculator.html';
            // Update icon to calculator
            const icon = button.querySelector('i');
            if (icon && icon.classList.contains('fa-quote-left')) {
                icon.className = 'fas fa-calculator';
            }
        }
    });
    
    // Update "Enquire Now" buttons in product cards
    const enquireButtons = document.querySelectorAll('.product-card .btn-outline.hover-grow');
    enquireButtons.forEach(button => {
        if (button.textContent.includes('Enquire Now') || button.textContent.includes('Get Quote')) {
            button.href = 'calculator.html';
        }
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = mobileToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            
            // Close all dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            
            // Close all dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

// Initialize dropdowns
function initDropdowns() {
    const specToggles = document.querySelectorAll('.spec-toggle');
    const featuresToggles = document.querySelectorAll('.features-toggle');
    
    // Specification dropdowns
    specToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Features dropdowns
    featuresToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Product filtering - Updated
function initProductFilter() {
    const categoryBtns = document.querySelectorAll('.category-filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!categoryBtns.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'flex';
                    // Add animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'cardAppear 0.6s ease forwards';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip external links
        if (anchor.getAttribute('href').includes('.html')) return;
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const header = document.getElementById('mainHeader');
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.getElementById('mainHeader').offsetHeight;
        
        if (window.scrollY >= sectionTop - headerHeight - 100 &&
            window.scrollY < sectionTop + sectionHeight - headerHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .service-card, .industry-card, .tech-item, .trust-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Trigger initial animations after loading
function triggerInitialAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
    
    // Trigger scroll animations immediately for elements in viewport
    const event = new Event('scroll');
    window.dispatchEvent(event);
}

// Initialize card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.product-card, .feature-card, .service-card, .industry-card, .trust-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Progress Bars
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(progress => {
        const width = progress.getAttribute('data-width');
        
        // Animate progress bars when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progress.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(progress);
    });
}

// Loading Messages
function initLoadingMessages() {
    const messages = [
        { text: "🛗 Preparing a smooth ride for you…", icon: "fas fa-elevator" },
        { text: "🔼 Elevating your experience…", icon: "fas fa-arrow-up" },
        { text: "⚡ Loading smart elevator solutions…", icon: "fas fa-bolt" },
        { text: "🏢 Taking you to the next level…", icon: "fas fa-building" },
        { text: "🛠️ Engineering comfort & safety…", icon: "fas fa-tools" },
        { text: "🚀 Almost there… hold tight!", icon: "fas fa-rocket" },
        { text: "🔐 Safety checks in progress…", icon: "fas fa-shield-alt" },
        { text: "📊 Optimizing performance…", icon: "fas fa-chart-line" },
        { text: "✨ Designing seamless vertical travel…", icon: "fas fa-magic" }
    ];
    
    const messagesTrack = document.getElementById('loadingMessagesTrack');
    
    if (!messagesTrack) return;
    
    // Duplicate messages for seamless animation
    const duplicatedMessages = [...messages, ...messages];
    
    duplicatedMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'loading-message';
        messageElement.innerHTML = `
            <i class="${message.icon}"></i>
            <span>${message.text}</span>
        `;
        messagesTrack.appendChild(messageElement);
    });
}

// Start loading messages animation
function startLoadingMessages() {
    const messagesTrack = document.getElementById('loadingMessagesTrack');
    if (messagesTrack) {
        messagesTrack.style.animation = 'slideMessages 30s linear infinite';
    }
}

// Initialize Client Logos
function initClientLogos() {
    const bangaloreCompanies = [
        "Prestige Group", "Brigade Group", "Sobha Limited", "Godrej Properties",
        "DLF Limited", "Mantri Developers", "Salarpuria Sattva", "Total Environment",
        "Puravankara", "Shriram Properties", "RMZ Corp", "Embassy Group",
        "Manyata Tech Park", "Bagmane Tech Park", "K Raheja Corp", "Phoenix Marketcity",
        "L&T Realty", "Tata Housing", "Ashiana Housing", "Vaishnavi Group",
        "Confident Group", "Purvankara", "SNN Raj Corp", "Hiranandani",
        "Kolkata", "Bangalore", "Mysore", "Hubli", "Belagavi", "Mangalore"
    ];
    
    const logosTrack = document.getElementById('clientLogosTrack');
    
    if (!logosTrack) return;
    
    // Duplicate logos for seamless animation
    const duplicatedLogos = [...bangaloreCompanies, ...bangaloreCompanies];
    
    duplicatedLogos.forEach(company => {
        const logoElement = document.createElement('div');
        logoElement.className = 'client-logo-item';
        logoElement.innerHTML = `
            <div class="client-logo-icon">
                <i class="fas fa-building"></i>
            </div>
            <div class="client-logo-name">${company}</div>
        `;
        logosTrack.appendChild(logoElement);
    });
}

// Start client logos animation
function startClientLogosAnimation() {
    const logosTrack = document.getElementById('clientLogosTrack');
    if (logosTrack) {
        logosTrack.style.animation = 'slideLogos 40s linear infinite';
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const location = document.getElementById('location').value.trim();
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !phone || !location || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showFormMessage('Please enter a valid phone number.', 'error');
            return;
        }
        
        // In a real application, you would send the data to a server here
        // For this demo, we'll simulate a successful submission
        showFormMessage('Thank you for your message! Our elevator expert in Bangalore will contact you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Scroll to form message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation helper
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }
    
    // Show form message
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.opacity = '1';
                formMessage.style.display = 'none';
            }, 500);
        }, 5000);
    }
}

// Add phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('91')) {
                value = value.substring(2);
            }
            
            if (value.length > 0) {
                value = '+91 ' + value;
            }
            
            e.target.value = value;
        });
    }
});