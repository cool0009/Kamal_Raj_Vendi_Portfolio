// ==========================================
// INTERACTIVE PORTFOLIO - All Animations
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initProjectModals();
    initProjectFilter();
    initHoverEffects();
    initTimelineExpander();
    initContactForm();
});

// ==========================================
// 1. Typing Animation for Hero Section
// ==========================================
function initTypingAnimation() {
    const heroText = document.querySelector('#about h1');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    heroText.style.borderRight = '3px solid #00d9ff';
    heroText.style.animation = 'blink 0.7s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            heroText.style.animation = 'none';
            heroText.style.borderRight = 'none';
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ==========================================
// 2. Scroll-triggered Animations (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    // Target all sections and cards
    const animatedElements = document.querySelectorAll('.about-card, .timeline-card, .education-card, .interests-card, .card, .project-card, .cert-card, .section-title, .about-stats, .timeline-item, .education-item, .interest-item');
    
    // Add fade-in class to elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered delay for grid items
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('cert-card') ||
                    entry.target.classList.contains('education-item') ||
                    entry.target.classList.contains('interest-item')) {
                    const siblings = entry.target.parentElement.children;
                    let index = 0;
                    for (let i = 0; i < siblings.length; i++) {
                        if (siblings[i] === entry.target) {
                            index = i;
                            break;
                        }
                    }
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// 3. Animated Skill Bars
// ==========================================
function initSkillBars() {
    const skillCards = document.querySelectorAll('#skills .card, section:not(#skills) .card');
    
    skillCards.forEach(card => {
        // Create skill bar container if not exists
        if (!card.querySelector('.skill-bar-container')) {
            const text = card.innerHTML;
            card.innerHTML = `
                <div class="skill-content">${text}</div>
                <div class="skill-bar-container">
                    <div class="skill-bar" style="--width: 0%"></div>
                </div>
            `;
        }
    });
    
    // Animate skill bars on scroll
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    // Extract percentage from card content or set random
                    const cardText = entry.target.querySelector('.skill-content').textContent.toLowerCase();
                    let percentage = 85; // default
                    
                    if (cardText.includes('python') || cardText.includes('ml')) percentage = 90;
                    else if (cardText.includes('sql') || cardText.includes('data')) percentage = 85;
                    else if (cardText.includes('visualization')) percentage = 80;
                    else if (cardText.includes('cloud') || cardText.includes('api')) percentage = 75;
                    else if (cardText.includes('quantum')) percentage = 70;
                    else if (cardText.includes('big data')) percentage = 78;
                    
                    skillBar.style.setProperty('--width', `${percentage}%`);
                    skillBar.style.width = `${percentage}%`;
                }
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => skillObserver.observe(card));
}

// ==========================================
// 4. Counter Animation for Stats
// ==========================================
function initCounterAnimation() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const stats = statsSection.querySelectorAll('.stat');
        
        // Animate counters
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const numberEl = stat.querySelector('.stat-num');
                        const target = parseInt(numberEl.textContent);
                        if (isNaN(target)) return;
                        
                        let current = 0;
                        const increment = target / 50;
                        const duration = 2000;
                        const stepTime = duration / 50;
                        
                        const counter = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                numberEl.textContent = target;
                                clearInterval(counter);
                            } else {
                                numberEl.textContent = Math.floor(current);
                            }
                        }, stepTime);
                    });
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(statsSection);
    }
}

// ==========================================
// 5. Project Modals
// ==========================================
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectDetails = {
        healthcare: {
            title: 'Heart Disease Prediction',
            description: 'A machine learning project that predicts heart disease using various patient health indicators. The model uses ensemble methods and achieves high accuracy in early detection.',
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
            link: 'https://github.com/cool0009/Heart_disease_prediction'
        },
        parkinsons: {
            title: "Parkinson's Disease Detection",
            description: "Predicts Parkinson's disease in patients using speech and biometric data. Utilizes feature engineering and machine learning classifiers for early diagnosis.",
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
            link: 'https://github.com/cool0009/Parkinsons-Disease-Detection'
        },
        h1n1: {
            title: 'H1N1 Vaccination Prediction',
            description: 'A predictive model for H1N1 vaccine uptake based on demographic and health-related factors. Helps public health officials target vaccination campaigns effectively.',
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn'],
            link: 'https://github.com/cool0009/H1N1-Vaccination-Prediction'
        },
        taxi: {
            title: 'NYC Taxi Fare Prediction',
            description: 'Regression model to predict NYC taxi fares using trip data. Includes feature engineering, data cleaning, and visualization of fare distribution and trends.',
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
            link: 'https://cool0009.github.io/New-York-taxi-fare-prediction/'
        },
        finance: {
            title: 'Stock Market Prediction',
            description: 'LSTM-based deep learning model for predicting stock prices using historical data. Includes data preprocessing, model training, and visualization of predictions.',
            technologies: ['Python', 'TensorFlow', 'Keras', 'Pandas'],
            link: 'https://github.com/cool0009/Stock-Market-Predictions-with-LSTM-in-Python'
        },
        'deep-learning': {
            title: 'Handwritten Digit Recognition',
            description: 'Convolutional Neural Network (CNN) model for recognizing handwritten digits from the MNIST dataset. Achieves 99% accuracy with real-time prediction capability.',
            technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
            link: 'https://github.com/cool0009/Deep-Learning-Project-Handwritten-Digit-Recognition-using-Python'
        },
        capstone: {
            title: 'IBM SpaceX Capstone',
            description: 'Comprehensive ML pipeline analyzing Falcon 9 landing success. Includes exploratory data analysis, geospatial analysis, interactive dashboards, and machine learning models.',
            technologies: ['Python', 'IBM Cloud', 'Plotly Dash', 'Scikit-learn'],
            link: 'https://github.com/cool0009/IBM-Data-sciene-Capstone'
        }
    };
    
    projectCards.forEach(card => {
        const category = card.dataset.category;
        const details = projectDetails[category];
        if (!details) return;

        // Save current front content
        const frontContent = card.innerHTML;
        
        // Structure the flip card
        card.innerHTML = `
            <div class="project-card-inner">
                <div class="project-card-front">
                    ${frontContent}
                </div>
                <div class="project-card-back">
                    <h3 style="margin-bottom:15px; font-size: 1.4rem; color: #00d9ff; background: none; -webkit-text-fill-color: initial;">${details.title}</h3>
                    <p style="color: #ccc; font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px;">${details.description}</p>
                    <div class="tags" style="justify-content: center; margin-bottom: 20px;">
                        ${details.technologies.map(tech => `<span class="tag" style="font-size: 0.75rem;">${tech}</span>`).join('')}
                    </div>
                    <a href="${details.link}" target="_blank" class="btn" style="font-size: 0.85rem; padding: 10px 22px;">View GitHub</a>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            // Don't flip if clicking the GitHub button
            if (e.target.closest('.btn')) return;
            card.classList.toggle('flipped');
        });
    });
}

// ==========================================
// 5b. Project Filter
// ==========================================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else if (card.dataset.category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// 6. Enhanced Hover Effects
// ==========================================
function initHoverEffects() {
    // Magnetic effect on buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // Glow effect on cards
    const cards = document.querySelectorAll('.card, .project-card, .cert-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Apply a subtle radial gradient for glow effect
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,217,255,0.1), rgba(255,255,255,0.05))`;
            
            // 3D Tilt Effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 15; // Adjust sensitivity
            const rotateY = (x - centerX) / 15; // Adjust sensitivity
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = ''; // Reset background
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`; // Reset transform
        });
    });
}

// ==========================================
// 7. Timeline Expander for Experience
// ==========================================
function initTimelineExpander() {
    const experienceCards = document.querySelectorAll('section:not(#skills) .card');
    
    experienceCards.forEach((card, index) => {
        // Add timeline connector
        card.style.position = 'relative';
        card.style.paddingLeft = '40px';
        
        // Create timeline dot (ensure this is consistent with CSS styling)
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: absolute;
            left: 10px;
            top: 30px;
            width: 16px;
            height: 16px;
            background: linear-gradient(135deg, #00d9ff, #00ff88);
            border-radius: 50%; /* Consistent with .timeline-dot in CSS */
            border: 4px solid #1a1a2e; /* Consistent with .timeline-dot in CSS */
            z-index: 1; /* Ensure it's above the line */
        `;
        card.insertBefore(dot, card.firstChild);
        
        // Create timeline line
        if (index < experienceCards.length - 1) {
            const line = document.createElement('div');
            line.style.cssText = `
                position: absolute;
                left: 16px;
                top: 46px;
                width: 2px;
                height: calc(100% - 30px); /* Adjust height to connect dots */
                background: linear-gradient(180deg, #00d9ff, transparent);
            `;
            card.appendChild(line);
        }
        
        // Add click to expand
        const content = card.innerHTML;
        card.innerHTML = `<div class="timeline-content">${content}</div>`;
        
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                card.style.paddingLeft = '40px';
            }
        });
    });
}

// ==========================================
// 8. Smooth Scroll for Navigation
// ==========================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// 9. Parallax Effect for Hero
// ==========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#about');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ==========================================
// 10. Contact Form Handler
// ==========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.innerHTML = '⟳ Sending...';
        btn.style.background = 'linear-gradient(90deg, #ff6b6b, #ffd93d)';
        btn.disabled = true;
        
        const formData = new FormData(this);
        const honeypot = formData.get('_honeypot');
        
        // Skip if honeypot is filled (bot submission)
        if (honeypot) {
            btn.innerHTML = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(90deg, #00ff88, #00d9ff)';
            this.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
            return;
        }
        
        // Remove honeypot field before sending
        formData.delete('_honeypot');
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/kamalrajvendi9154@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                const formContainer = this.parentElement;
                formContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                        <h3 style="color: #00ff88; font-size: 1.8rem; margin-bottom: 15px;">Message Sent Successfully!</h3>
                        <p style="color: #ccc; font-size: 1.1rem; margin-bottom: 20px;">Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                        <button onclick="location.reload()" style="display: inline-block; padding: 12px 30px; border-radius: 25px; background: linear-gradient(90deg, #00d9ff, #00ff88); color: #fff; font-weight: bold; border: none; cursor: pointer;">Send Another Message</button>
                    </div>
                `;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            btn.innerHTML = '❌ Try Again';
            btn.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// ==========================================
// 11. Loading Animation
// ==========================================
(function() {
    // Only create loader if it doesn't exist
    if (document.querySelector('.loader')) return;
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <p>Loading Portfolio...</p>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a1a2e;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    // Insert loader before body content
    document.body.insertBefore(loader, document.body.firstChild);
    
    // Hide loader and show content when page is fully loaded
    const hideLoader = () => {
        // Make body visible
        document.body.style.opacity = '1';
        
        // Fade out loader
        loader.style.opacity = '0';
        
        // Remove loader after transition
        setTimeout(() => {
            loader.remove();
            document.body.classList.add('loaded');
        }, 500);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
})();
