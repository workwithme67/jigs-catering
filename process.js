// Process Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Process step details
    const processData = {
        1: {
            title: 'Initial Consultation',
            description: 'We begin with a comprehensive consultation to understand your event requirements, preferences, and budget. Our team discusses your vision and provides expert recommendations.',
            details: [
                'Free initial consultation call or meeting',
                'Event type and guest count assessment',
                'Dietary preferences and restrictions discussion',
                'Budget planning and cost estimation',
                'Venue requirements and logistics review',
                'Timeline planning and coordination'
            ]
        },
        2: {
            title: 'Custom Menu Planning',
            description: 'Our expert chefs create a personalized menu tailored to your event type, guest preferences, and cultural requirements. We ensure every dish meets our quality standards.',
            details: [
                'Customized menu creation based on preferences',
                'Seasonal ingredient selection and sourcing',
                'Nutritional and dietary accommodation',
                'Tasting session arrangement (for large events)',
                'Final menu approval and confirmation',
                'Special presentation and plating options'
            ]
        },
        3: {
            title: 'Fresh Preparation',
            description: 'All dishes are prepared fresh in our certified kitchens using premium ingredients. Our chefs follow strict quality control measures to ensure exceptional taste and safety.',
            details: [
                'Fresh ingredient procurement from trusted suppliers',
                'Preparation in ISO 22000 certified kitchens',
                'Quality control at every stage of cooking',
                'Traditional cooking methods and techniques',
                'Proper food safety and hygiene protocols',
                'Packaging in temperature-controlled containers'
            ]
        },
        4: {
            title: 'Professional Service',
            description: 'Our trained service team ensures seamless delivery and presentation. We handle setup, service, and cleanup so you can focus on enjoying your event.',
            details: [
                'Timely delivery and professional setup',
                'Experienced service staff for events',
                'Elegant presentation and food display',
                'Live cooking stations (when requested)',
                'Continuous service throughout the event',
                'Complete cleanup and post-event service'
            ]
        },
        5: {
            title: 'Quality Follow-up',
            description: 'We believe in continuous improvement. After your event, we collect feedback to ensure complete satisfaction and maintain our high service standards.',
            details: [
                'Post-event feedback collection',
                'Service quality assessment',
                'Customer satisfaction survey',
                'Suggestions for future improvements',
                'Relationship building for future events',
                'Loyalty program enrollment and benefits'
            ]
        }
    };
    
    let currentStep = 0;
    
    // Initialize process functionality
    initProcess();
    
    function initProcess() {
        enhanceProcessSteps();
        createProcessFlow();
        setupIntersectionObserver();
        setupModal();
        startProcessAnimation();
    }
    
    function enhanceProcessSteps() {
        const steps = document.querySelectorAll('.step');
        
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            // Add click handler for modal
            step.addEventListener('click', function() {
                openProcessModal(stepNumber);
            });
            
            // Add hover effects
            step.addEventListener('mouseenter', function() {
                this.classList.add('step-animate');
            });
            
            step.addEventListener('animationend', function() {
                this.classList.remove('step-animate');
            });
        });
    }
    
    function createProcessFlow() {
        const flowSection = document.createElement('div');
        flowSection.className = 'process-flow';
        flowSection.innerHTML = `
            <div class="flow-line"></div>
            <div class="flow-steps">
                ${Array.from({length: 5}, (_, i) => `
                    <div class="flow-step" data-step="${i + 1}">${i + 1}</div>
                `).join('')}
            </div>
        `;
        
        // Insert after process steps
        const processSteps = document.querySelector('.process-steps');
        processSteps.parentNode.insertBefore(flowSection, processSteps.nextSibling);
        
        // Add CTA section
        const ctaSection = document.createElement('div');
        ctaSection.className = 'process-cta';
        ctaSection.innerHTML = `
            <h3>Ready to Start Your Catering Journey?</h3>
            <p>Let us handle every detail of your catering needs with our proven 5-step process</p>
            <button class="process-cta-btn">
                <i class="fas fa-phone"></i> Start Your Consultation
            </button>
        `;
        
        flowSection.parentNode.insertBefore(ctaSection, flowSection.nextSibling);
        
        // Add CTA button functionality
        const ctaBtn = ctaSection.querySelector('.process-cta-btn');
        ctaBtn.addEventListener('click', function() {
            // Scroll to contact section or show contact modal
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            showNotification('Redirecting to consultation booking...', 'info');
        });
    }
    
    function startProcessAnimation() {
        const flowSteps = document.querySelectorAll('.flow-step');
        
        function animateStep(index) {
            if (index < flowSteps.length) {
                flowSteps[index].classList.add('active');
                
                setTimeout(() => {
                    flowSteps[index].classList.remove('active');
                    flowSteps[index].classList.add('completed');
                    animateStep(index + 1);
                }, 1000);
            } else {
                // Reset animation after completion
                setTimeout(() => {
                    flowSteps.forEach(step => {
                        step.classList.remove('completed');
                    });
                    animateStep(0);
                }, 2000);
            }
        }
        
        // Start animation when flow comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStep(0);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        setTimeout(() => {
            const flowSection = document.querySelector('.process-flow');
            if (flowSection) {
                observer.observe(flowSection);
            }
        }, 100);
    }
    
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-process');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe process steps
        document.querySelectorAll('.step').forEach(step => {
            observer.observe(step);
        });
    }
    
    function setupModal() {
        const modal = document.createElement('div');
        modal.className = 'process-modal';
        modal.id = 'processModal';
        modal.innerHTML = `
            <div class="process-modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-process-content"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeProcessModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProcessModal();
            }
        });
    }
    
    function openProcessModal(stepNumber) {
        const modal = document.getElementById('processModal');
        const data = processData[stepNumber];
        
        if (!data) return;
        
        const content = modal.querySelector('.modal-process-content');
        content.innerHTML = `
            <div class="modal-step-number">${stepNumber}</div>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-description">${data.description}</p>
            <div class="modal-details">
                <h4>What's Included:</h4>
                <ul>
                    ${data.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeProcessModal() {
        const modal = document.getElementById('processModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
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
            transition: 'transform 0.3s ease'
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
        }, 3000);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProcessModal();
        }
    });
});

// Export for external use
window.ProcessModule = {
    openStep: function(stepNumber) {
        openProcessModal(stepNumber);
    }
};