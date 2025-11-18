// Contact Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize contact functionality
    initContact();
    
    function initContact() {
        setupFormValidation();
        setupContactItems();
        setupQuickContact();
        setupIntersectionObserver();
        createMap();
    }
    
    function setupFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Add real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearErrors(input));
        });
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm(form);
            } else {
                showNotification('Please fill in all required fields correctly', 'error');
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type || field.tagName.toLowerCase();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error states
        clearErrors(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        else if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Number validation
        else if (fieldType === 'number' && value) {
            if (isNaN(value) || parseInt(value) < 1) {
                isValid = false;
                errorMessage = 'Please enter a valid number';
            }
        }
        
        // Date validation
        else if (fieldType === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage = 'Please select a future date';
            }
        }
        
        // Show validation result
        if (isValid) {
            field.classList.add('success');
            field.classList.remove('error');
        } else {
            field.classList.add('error');
            field.classList.remove('success');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function clearErrors(field) {
        field.classList.remove('error', 'success');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    function showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function submitForm(form) {
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            
            // Reset form
            form.reset();
            form.querySelectorAll('.success').forEach(field => {
                field.classList.remove('success');
            });
            
        }, 2000);
    }
    
    function setupContactItems() {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            item.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const text = this.querySelector('p').textContent;
                
                if (icon.classList.contains('fa-phone')) {
                    // Extract phone number and initiate call
                    const phone = text.match(/[\+]?[1-9][\d\s\-\(\)]+/);
                    if (phone) {
                        window.location.href = `tel:${phone[0].replace(/[\s\-\(\)]/g, '')}`;
                    }
                } else if (icon.classList.contains('fa-envelope')) {
                    // Extract email and open email client
                    const email = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
                    if (email) {
                        window.location.href = `mailto:${email[0]}`;
                    }
                } else if (icon.classList.contains('fa-map-marker-alt')) {
                    // Open maps with address
                    const address = encodeURIComponent(text);
                    window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
                }
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    function setupQuickContact() {
        // Create quick contact button
        const quickContact = document.createElement('div');
        quickContact.className = 'quick-contact';
        quickContact.innerHTML = `
            <button class="quick-contact-btn" title="Quick Contact">
                <i class="fas fa-comments"></i>
            </button>
        `;
        
        document.body.appendChild(quickContact);
        
        // Add click handler
        const quickBtn = quickContact.querySelector('.quick-contact-btn');
        quickBtn.addEventListener('click', function() {
            // Scroll to contact form
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth' });
                
                // Focus on first input
                setTimeout(() => {
                    const firstInput = contactForm.querySelector('input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 500);
            }
        });
    }
    
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-contact');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe contact elements
        document.querySelectorAll('.contact-item, .contact-form').forEach(item => {
            observer.observe(item);
        });
    }
    
    function createMap() {
        const mapSection = document.createElement('div');
        mapSection.className = 'contact-map';
        mapSection.innerHTML = `
            <h3>Find Us</h3>
            <div class="map-container">
                <div class="map-placeholder">
                    <i class="fas fa-map-marked-alt"></i>
                    <h4>Our Location</h4>
                    <p>123 Spice Street, Heritage Plaza<br>Mumbai, Maharashtra 400001</p>
                    <button class="btn-primary" onclick="window.open('https://maps.google.com/maps?q=Mumbai+Maharashtra+India', '_blank')" style="margin-top: 15px; width: auto; padding: 10px 20px;">
                        <i class="fas fa-directions"></i> Get Directions
                    </button>
                </div>
            </div>
        `;
        
        document.querySelector('.contact .container').appendChild(mapSection);
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            zIndex: '9999',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '400px'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Auto-fill form from URL parameters (for marketing campaigns)
    function autoFillFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const form = document.getElementById('contactForm');
        
        if (form && urlParams.has('event')) {
            const eventSelect = form.querySelector('select');
            if (eventSelect) {
                eventSelect.value = urlParams.get('event');
            }
        }
    }
    
    autoFillFromURL();
});

// Export for external use
window.ContactModule = {
    showNotification: function(message, type) {
        showNotification(message, type);
    }
};