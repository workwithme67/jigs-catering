// Enhanced Timeline Animation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Intersection Observer for timeline animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Counter animation for stats
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    };
    
    // Stats counter observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Timeline item click interaction
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const content = this.querySelector('.timeline-content');
            
            // Add pulse animation
            content.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                content.style.animation = '';
            }, 600);
            
            // Show notification
            showTimelineNotification(year);
        });
    });
    
    // Timeline CTA button interaction
    const ctaButton = document.querySelector('.timeline-cta-btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Smooth scroll to contact section
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Add success animation
            this.innerHTML = '<i class="fas fa-check"></i> Let\'s Connect!';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-calendar-plus"></i> Book Your Event Today';
            }, 2000);
        });
    }
    
    // Show timeline notification
    function showTimelineNotification(year) {
        const notification = document.createElement('div');
        notification.className = 'timeline-notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>Milestone ${year} - A significant year in our journey!</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add timeline notification styles
    const style = document.createElement('style');
    style.textContent = `
        .timeline-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1000;
            font-weight: 500;
        }
        
        .timeline-notification.show {
            transform: translateX(0);
        }
        
        .timeline-notification i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});