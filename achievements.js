// Achievements Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Achievement data
    const achievementsData = {
        'best-catering': {
            title: 'Best Catering Service 2023',
            organization: 'Indian Hospitality Awards',
            year: '2023',
            description: 'Recognized as the leading catering service in India for exceptional quality, innovative menus, and outstanding customer service. This prestigious award acknowledges our commitment to culinary excellence.',
            details: [
                'Evaluated among 500+ catering companies nationwide',
                'Judged by industry experts and celebrity chefs',
                'Based on quality, innovation, and customer satisfaction',
                'First catering company to win this award twice'
            ]
        },
        'food-quality': {
            title: 'Excellence in Food Quality',
            organization: 'National Food Safety Awards',
            year: '2023',
            description: 'Honored for maintaining the highest standards of food quality and safety. Our rigorous quality control processes and commitment to fresh ingredients earned this recognition.',
            details: [
                'Zero food safety incidents in 5+ years',
                'Highest grade in all health inspections',
                'Advanced food safety management systems',
                'Certified organic ingredient sourcing'
            ]
        },
        'customer-rating': {
            title: '5-Star Customer Rating',
            organization: 'Customer Satisfaction Survey',
            year: '2024',
            description: 'Achieved and maintained a perfect 5-star rating based on comprehensive customer feedback across all service categories including food quality, service, and value.',
            details: [
                '4.9/5 average rating from 2,847+ reviews',
                '98% customer retention rate',
                '95% customers recommend us to others',
                'Consistent excellence across all event types'
            ]
        },
        'iso-certified': {
            title: 'ISO 22000 Certified',
            organization: 'Food Safety Management',
            year: '2022',
            description: 'Achieved ISO 22000 certification for food safety management systems, demonstrating our commitment to international standards in food safety and quality management.',
            details: [
                'International food safety standard compliance',
                'Comprehensive hazard analysis systems',
                'Continuous improvement processes',
                'Regular third-party audits and assessments'
            ]
        }
    };

    const timelineData = [
        { year: '2024', title: '5-Star Rating Achievement', description: 'Maintained perfect customer satisfaction ratings' },
        { year: '2023', title: 'Best Catering Service Award', description: 'Won prestigious Indian Hospitality Award' },
        { year: '2023', title: 'Food Quality Excellence', description: 'Recognized for outstanding food safety standards' },
        { year: '2022', title: 'ISO 22000 Certification', description: 'Achieved international food safety certification' },
        { year: '2021', title: 'Digital Innovation Award', description: 'Pioneered contactless catering solutions' }
    ];

    const statsData = [
        { number: 15, label: 'Awards Won', suffix: '+' },
        { number: 2847, label: 'Happy Customers', suffix: '+' },
        { number: 5, label: 'Star Rating', suffix: '.0' },
        { number: 100, label: 'Success Rate', suffix: '%' }
    ];
    
    // Initialize achievements functionality
    initAchievements();
    
    function initAchievements() {
        enhanceAchievementCards();
        createTimeline();
        createStatsCounter();
        setupIntersectionObserver();
        setupModal();
    }
    
    function enhanceAchievementCards() {
        const cards = document.querySelectorAll('.achievement-card');
        
        cards.forEach((card, index) => {
            // Add year badge
            const year = getAchievementYear(card);
            if (year) {
                const yearBadge = document.createElement('div');
                yearBadge.className = 'achievement-year';
                yearBadge.textContent = year;
                card.appendChild(yearBadge);
            }
            
            // Add click handler
            card.addEventListener('click', function() {
                const cardType = getCardType(card);
                openAchievementModal(cardType);
            });
            
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    function getCardType(card) {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes('best catering')) return 'best-catering';
        if (title.includes('food quality')) return 'food-quality';
        if (title.includes('5-star') || title.includes('rating')) return 'customer-rating';
        if (title.includes('iso')) return 'iso-certified';
        return 'best-catering';
    }
    
    function getAchievementYear(card) {
        const title = card.querySelector('h3').textContent;
        if (title.includes('2023')) return '2023';
        if (title.includes('2022')) return '2022';
        if (title.includes('2024')) return '2024';
        return '2023';
    }
    
    function createTimeline() {
        // Removed timeline for cleaner look
    }
    
    function createStatsCounter() {
        // Removed stats counter for cleaner look
    }
    
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-achievement');
                        

                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe achievement cards
        document.querySelectorAll('.achievement-card').forEach(card => {
            observer.observe(card);
        });
        

    }
    

    
    function setupModal() {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.id = 'achievementModal';
        modal.innerHTML = `
            <div class="achievement-modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-achievement-content"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeAchievementModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAchievementModal();
            }
        });
    }
    
    function openAchievementModal(type) {
        const modal = document.getElementById('achievementModal');
        const data = achievementsData[type];
        
        if (!data) return;
        
        const content = modal.querySelector('.modal-achievement-content');
        content.innerHTML = `
            <div class="achievement-icon" style="font-size: 3.5rem; margin-bottom: 20px; color: #ff6b35;">
                <i class="fas fa-trophy"></i>
            </div>
            <h2 style="color: #2c3e50; margin-bottom: 10px;">${data.title}</h2>
            <h4 style="color: #666; margin: 10px 0 20px; font-weight: 500;">${data.organization} - ${data.year}</h4>
            <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 25px; color: #555;">${data.description}</p>
            <div class="achievement-details">
                <h4 style="margin-bottom: 15px; color: #2c3e50;">Key Highlights:</h4>
                <ul style="text-align: left; max-width: 400px; margin: 0 auto; color: #666;">
                    ${data.details.map(detail => `<li style="margin-bottom: 6px;">${detail}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeAchievementModal() {
        const modal = document.getElementById('achievementModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Removed floating particles for cleaner look
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAchievementModal();
        }
    });
});

// Export for external use
window.AchievementsModule = {
    openModal: function(type) {
        openAchievementModal(type);
    }
};