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

});

