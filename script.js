document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Investment Calculator
    const amountInput = document.getElementById('investment-amount');
    const rateInput = document.getElementById('investment-rate');
    const projectedValueDisplay = document.getElementById('projected-value');
    
    const calculateReturn = () => {
        const principal = parseFloat(amountInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        
        // Simple ROI calculation: Amount + (Amount * (Rate / 100))
        const futureValue = principal + (principal * (rate / 100));
        
        // Format to BDT currency
        const formattedValue = new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(futureValue);
        
        projectedValueDisplay.textContent = `৳${formattedValue}`;
    };
    
    amountInput.addEventListener('input', calculateReturn);
    rateInput.addEventListener('input', calculateReturn);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Login Modal Popup Logic
    const loginModal = document.getElementById('login-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const passwordToggleBtn = document.getElementById('password-toggle-btn');
    const passwordInput = document.getElementById('login-password');
    const loginForm = document.getElementById('login-form');
    
    // Select all triggers (Log In, Start Investing, etc.)
    const loginTriggers = document.querySelectorAll('.login-trigger');
    
    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModal) {
                loginModal.classList.add('active');
                // Premium UX: auto-focus the email field on open
                setTimeout(() => {
                    const emailInput = document.getElementById('login-email');
                    if (emailInput) emailInput.focus();
                }, 200);
            }
        });
    });

    const closeModal = () => {
        if (loginModal) {
            loginModal.classList.remove('active');
        }
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            // Close modal only if clicking outside the card (on the backdrop overlay)
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    // WCAG Accessibility: Close modal on pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Password Show/Hide Toggle
    if (passwordToggleBtn && passwordInput) {
        passwordToggleBtn.addEventListener('click', () => {
            const currentType = passwordInput.getAttribute('type');
            const newType = currentType === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', newType);
            
            const icon = passwordToggleBtn.querySelector('i');
            if (icon) {
                if (newType === 'text') {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    }

    // Mock Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            alert(`Welcome back to Aamar Land! Signed in successfully as: ${email}`);
            closeModal();
            loginForm.reset();
        });
    }
});

