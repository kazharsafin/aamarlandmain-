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
    const passwordInput = document.getElementById('password-input');
    
    // Select all triggers (Log In, Start Investing, etc.)
    const loginTriggers = document.querySelectorAll('.login-trigger');
    
    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModal) {
                loginModal.classList.add('active');
                // Premium UX: auto-focus the email field on open
                setTimeout(() => {
                    const emailInput = document.getElementById('email-input');
                    if (emailInput) emailInput.focus();
                }, 200);
            }
        });
    });

    const closeModal = () => {
        if (loginModal) {
            loginModal.classList.remove('active');
            resetAuthModal();
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

    // Helper function to show auth messages
    const showAuthMessage = (text, type = 'error') => {
        const messageEl = document.getElementById('auth-message');
        if (messageEl) {
            messageEl.textContent = text;
            if (type === 'success') {
                messageEl.style.color = '#27ae60'; // Premium Emerald Green
            } else if (type === 'info') {
                messageEl.style.color = 'var(--accent)'; // Brand Muted Gold
            } else {
                messageEl.style.color = '#e74c3c'; // Premium Crimson Red
            }
        }
    };

    // Helper to reset auth inputs and message
    const resetAuthModal = () => {
        const emailIn = document.getElementById('email-input');
        const passIn = document.getElementById('password-input');
        const messageEl = document.getElementById('auth-message');
        
        if (emailIn) emailIn.value = '';
        if (passIn) passIn.value = '';
        if (messageEl) messageEl.textContent = '';
        
        // Reset password toggle visibility state back to password
        if (passIn && passwordToggleBtn) {
            passIn.setAttribute('type', 'password');
            const icon = passwordToggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    };

    // Define Global Handlers for requested inline onclick attributes
    window.loginWithEmail = () => {
        const email = document.getElementById('email-input')?.value.trim();
        const password = document.getElementById('password-input')?.value;

        if (!email || !password) {
            showAuthMessage('Please enter both email and password.');
            return;
        }

        // Simple format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAuthMessage('Please enter a valid email address.');
            return;
        }

        showAuthMessage('Signing in securely...', 'info');

        // Premium UX: Short simulated delay for realistic server auth roundtrip
        setTimeout(() => {
            alert(`Welcome back to Aamar Land! Signed in successfully as: ${email}`);
            closeModal();
        }, 800);
    };

    window.signUpWithEmail = () => {
        const email = document.getElementById('email-input')?.value.trim();
        const password = document.getElementById('password-input')?.value;

        if (!email || !password) {
            showAuthMessage('Please enter both email and password to sign up.');
            return;
        }

        // Simple format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAuthMessage('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            showAuthMessage('Password must be at least 6 characters long.');
            return;
        }

        showAuthMessage('Creating your investment account...', 'info');

        setTimeout(() => {
            alert(`Congratulations! Your Aamar Land investment account has been created for: ${email}\nWelcome aboard!`);
            closeModal();
        }, 1000);
    };

    window.loginWithGoogle = () => {
        showAuthMessage('Connecting with Google accounts...', 'info');

        setTimeout(() => {
            alert('Successfully authenticated via Google Account!');
            closeModal();
        }, 800);
    };
});

