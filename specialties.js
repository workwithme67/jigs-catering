// Specialties Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Specialty data
    const specialtyData = {
        'royal-thali': {
            title: 'Royal Maharaja Thali',
            image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600',
            description: 'Experience the grandeur of Indian royalty with our Royal Maharaja Thali. This elaborate feast features 15+ authentic dishes from different regions of India, carefully curated to represent the diverse culinary heritage of the subcontinent. Each dish is prepared using traditional recipes passed down through generations of royal chefs.',
            details: [
                { icon: 'fas fa-utensils', title: 'Dishes', value: '15+ Items' },
                { icon: 'fas fa-clock', title: 'Prep Time', value: '3-4 Hours' },
                { icon: 'fas fa-users', title: 'Serves', value: '1 Person' },
                { icon: 'fas fa-star', title: 'Rating', value: '4.9/5' }
            ],
            ingredients: ['Basmati Rice', 'Dal Makhani', 'Paneer Makhani', 'Chicken Curry', 'Mutton Rogan Josh', 'Naan & Roti', 'Raita', 'Pickles', 'Papad', 'Gulab Jamun', 'Kulfi'],
            price: '₹899'
        },
        'biryani': {
            title: 'Hyderabadi Dum Biryani',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600',
            description: 'Indulge in the aromatic perfection of our Hyderabadi Dum Biryani. This slow-cooked masterpiece features tender meat and fragrant basmati rice, layered with exotic spices and cooked in a sealed pot to preserve all the flavors. A true celebration of Hyderabadi culinary tradition.',
            details: [
                { icon: 'fas fa-fire', title: 'Cooking Style', value: 'Dum Method' },
                { icon: 'fas fa-clock', title: 'Cook Time', value: '2 Hours' },
                { icon: 'fas fa-pepper-hot', title: 'Spice Level', value: 'Medium' },
                { icon: 'fas fa-award', title: 'Specialty', value: 'Signature' }
            ],
            ingredients: ['Basmati Rice', 'Mutton/Chicken', 'Saffron', 'Fried Onions', 'Mint Leaves', 'Yogurt', 'Ghee', 'Whole Spices'],
            price: '₹599'
        },
        'tandoori': {
            title: 'Tandoori Platter',
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600',
            description: 'Savor the smoky flavors of our Tandoori Platter, featuring an assortment of marinated meats and vegetables cooked in traditional clay ovens. The high heat of the tandoor creates a unique charred exterior while keeping the inside tender and juicy.',
            details: [
                { icon: 'fas fa-fire', title: 'Oven Type', value: 'Clay Tandoor' },
                { icon: 'fas fa-thermometer-half', title: 'Temperature', value: '900°F' },
                { icon: 'fas fa-leaf', title: 'Marinade', value: 'Yogurt Based' },
                { icon: 'fas fa-drumstick-bite', title: 'Varieties', value: '6 Types' }
            ],
            ingredients: ['Chicken Tikka', 'Seekh Kebab', 'Paneer Tikka', 'Fish Tikka', 'Tandoori Chicken', 'Naan'],
            price: '₹749'
        },
        'mithai': {
            title: 'Mithai Collection',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
            description: 'Delight in our exquisite Mithai Collection, featuring handcrafted traditional Indian sweets made with pure ghee, premium dry fruits, and time-honored recipes. Each sweet is a work of art, representing different regions of India.',
            details: [
                { icon: 'fas fa-candy-cane', title: 'Varieties', value: '12+ Types' },
                { icon: 'fas fa-leaf', title: 'Ingredients', value: 'Pure & Natural' },
                { icon: 'fas fa-gift', title: 'Packaging', value: 'Premium Box' },
                { icon: 'fas fa-heart', title: 'Made With', value: 'Love & Care' }
            ],
            ingredients: ['Gulab Jamun', 'Rasgulla', 'Kaju Katli', 'Barfi', 'Laddu', 'Jalebi', 'Rasmalai', 'Sandesh'],
            price: '₹299/kg'
        }
    };

    // Initialize specialties functionality
    initSpecialties();
    
    function initSpecialties() {
        enhanceSpecialtyCards();
        setupIntersectionObserver();
        createFloatingActionButton();
        setupModal();
        setupConsultationButton();
    }
    
    function enhanceSpecialtyCards() {
        const cards = document.querySelectorAll('.specialty-card');
        
        cards.forEach((card, index) => {
            // Add enhanced content
            enhanceCardContent(card, index);
            
            // Add click handler
            card.addEventListener('click', function() {
                const cardType = getCardType(card);
                openSpecialtyModal(cardType);
            });
            
            // Add hover effects
            addHoverEffects(card);
        });
    }
    
    function enhanceCardContent(card, index) {
        // Add rating badge
        const rating = document.createElement('div');
        rating.className = 'rating';
        rating.innerHTML = '<i class="fas fa-star"></i> 4.9';
        card.style.position = 'relative';
        card.appendChild(rating);
        
        // Add special badge for first card
        if (index === 0) {
            const badge = document.createElement('div');
            badge.className = 'badge';
            badge.textContent = 'Most Popular';
            card.appendChild(badge);
        }
        
        // Add action buttons to overlay
        const overlay = card.querySelector('.specialty-overlay');
        if (overlay) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'specialty-actions';
            actionsDiv.innerHTML = `
                <button class="specialty-btn btn-order">Order Now</button>
                <button class="specialty-btn btn-info">View Details</button>
            `;
            overlay.appendChild(actionsDiv);
            
            // Add event listeners for buttons
            const orderBtn = actionsDiv.querySelector('.btn-order');
            const infoBtn = actionsDiv.querySelector('.btn-info');
            
            orderBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleOrder(getCardType(card));
            });
            
            infoBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openSpecialtyModal(getCardType(card));
            });
        }
    }
    
    function getCardType(card) {
        const dataSpecialty = card.getAttribute('data-specialty');
        if (dataSpecialty) return dataSpecialty;
        
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes('thali')) return 'royal-thali';
        if (title.includes('biryani')) return 'biryani';
        if (title.includes('tandoori')) return 'tandoori';
        if (title.includes('mithai')) return 'mithai';
        return 'royal-thali';
    }
    
    function addHoverEffects(card) {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to image
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    }
    
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.specialty-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    function createFloatingActionButton() {
        const fab = document.createElement('div');
        fab.className = 'specialties-fab';
        fab.innerHTML = '<i class="fas fa-utensils"></i>';
        fab.title = 'View All Specialties';
        
        fab.addEventListener('click', function() {
            document.querySelector('.specialties').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        document.body.appendChild(fab);
    }
    
    function setupModal() {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'specialty-modal';
        modal.id = 'specialtyModal';
        modal.innerHTML = `
            <div class="specialty-modal-content">
                <span class="modal-close">&times;</span>
                <img class="modal-image" src="" alt="">
                <h2 class="modal-title"></h2>
                <p class="modal-description"></p>
                <div class="modal-details"></div>
                <div class="ingredients-section">
                    <h4>Key Ingredients:</h4>
                    <div class="ingredients-list"></div>
                </div>
                <div class="modal-actions">
                    <button class="specialty-btn btn-order" style="width: 100%; margin-top: 20px;">Order Now - <span class="modal-price"></span></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Add CSS for ingredients
        const style = document.createElement('style');
        style.textContent = `
            .ingredients-section {
                margin: 25px 0;
            }
            .ingredients-section h4 {
                color: #2c3e50;
                margin-bottom: 15px;
                font-size: 1.2rem;
            }
            .ingredients-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .ingredient-tag {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.9rem;
                color: #495057;
            }
            .modal-actions {
                text-align: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    function openSpecialtyModal(type) {
        const modal = document.getElementById('specialtyModal');
        const data = specialtyData[type];
        
        if (!data) return;
        
        // Populate modal content
        modal.querySelector('.modal-image').src = data.image;
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-description').textContent = data.description;
        modal.querySelector('.modal-price').textContent = data.price;
        
        // Populate details
        const detailsContainer = modal.querySelector('.modal-details');
        detailsContainer.innerHTML = data.details.map(detail => `
            <div class="detail-item">
                <i class="${detail.icon}"></i>
                <h4>${detail.title}</h4>
                <p>${detail.value}</p>
            </div>
        `).join('');
        
        // Populate ingredients
        const ingredientsContainer = modal.querySelector('.ingredients-list');
        ingredientsContainer.innerHTML = data.ingredients.map(ingredient => 
            `<span class="ingredient-tag">${ingredient}</span>`
        ).join('');
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add order button functionality
        const orderBtn = modal.querySelector('.btn-order');
        orderBtn.onclick = () => handleOrder(type);
    }
    
    function closeModal() {
        const modal = document.getElementById('specialtyModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function handleOrder(type) {
        const data = specialtyData[type];
        
        // Create order notification
        showNotification(`Added ${data.title} to cart!`, 'success');
        
        // You can integrate with actual cart/ordering system here
        console.log(`Ordering: ${data.title} - ${data.price}`);
        
        // Close modal if open
        closeModal();
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#28a745' : '#17a2b8',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            zIndex: '9999',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Add smooth scrolling for specialty navigation
    function addSpecialtyNavigation() {
        const specialtyCards = document.querySelectorAll('.specialty-card');
        
        specialtyCards.forEach((card, index) => {
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
                
                if (e.key === 'ArrowRight' && index < specialtyCards.length - 1) {
                    specialtyCards[index + 1].focus();
                }
                
                if (e.key === 'ArrowLeft' && index > 0) {
                    specialtyCards[index - 1].focus();
                }
            });
            
            // Make cards focusable
            card.setAttribute('tabindex', '0');
        });
    }
    
    addSpecialtyNavigation();
    
    // Add loading animation for images
    function addImageLoadingEffects() {
        const images = document.querySelectorAll('.specialty-card img');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 100);
            });
        });
    }
    
    addImageLoadingEffects();
    
    function setupConsultationButton() {
        const consultBtn = document.querySelector('.specialty-consult-btn');
        if (consultBtn) {
            consultBtn.addEventListener('click', function() {
                showConsultationModal();
            });
        }
    }
    
    function showConsultationModal() {
        const consultModal = document.createElement('div');
        consultModal.className = 'specialty-modal';
        consultModal.innerHTML = `
            <div class="specialty-modal-content">
                <span class="modal-close">&times;</span>
                <h2 class="modal-title">Chef's Recommendation</h2>
                <p class="modal-description">Let our expert chefs help you choose the perfect specialty for your event. Please provide some details about your preferences.</p>
                <form class="consultation-form">
                    <div class="form-group">
                        <label>Event Type:</label>
                        <select name="eventType" required>
                            <option value="">Select Event Type</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="festival">Festival Celebration</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Number of Guests:</label>
                        <input type="number" name="guests" placeholder="e.g., 50" required>
                    </div>
                    <div class="form-group">
                        <label>Dietary Preferences:</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="dietary" value="vegetarian"> Vegetarian</label>
                            <label><input type="checkbox" name="dietary" value="vegan"> Vegan</label>
                            <label><input type="checkbox" name="dietary" value="glutenfree"> Gluten-Free</label>
                            <label><input type="checkbox" name="dietary" value="spicy"> Spicy Food Lovers</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Budget Range:</label>
                        <select name="budget" required>
                            <option value="">Select Budget Range</option>
                            <option value="300-500">₹300 - ₹500 per person</option>
                            <option value="500-800">₹500 - ₹800 per person</option>
                            <option value="800-1200">₹800 - ₹1200 per person</option>
                            <option value="1200+">₹1200+ per person</option>
                        </select>
                    </div>
                    <button type="submit" class="specialty-btn btn-order" style="width: 100%; margin-top: 20px;">
                        Get Chef's Recommendation
                    </button>
                </form>
            </div>
        `;
        
        document.body.appendChild(consultModal);
        consultModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add form styles
        const formStyle = document.createElement('style');
        formStyle.textContent = `
            .consultation-form .form-group {
                margin-bottom: 20px;
            }
            .consultation-form label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #2c3e50;
            }
            .consultation-form input, .consultation-form select {
                width: 100%;
                padding: 12px;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            .consultation-form input:focus, .consultation-form select:focus {
                outline: none;
                border-color: #ff6b35;
            }
            .checkbox-group {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 10px;
            }
            .checkbox-group label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: normal;
                margin-bottom: 0;
            }
            .checkbox-group input[type="checkbox"] {
                width: auto;
                margin: 0;
            }
        `;
        document.head.appendChild(formStyle);
        
        // Handle form submission
        const form = consultModal.querySelector('.consultation-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConsultationSubmission(form);
            document.body.removeChild(consultModal);
            document.body.style.overflow = 'auto';
        });
        
        // Handle close
        const closeBtn = consultModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(consultModal);
            document.body.style.overflow = 'auto';
        });
        
        consultModal.addEventListener('click', function(e) {
            if (e.target === consultModal) {
                document.body.removeChild(consultModal);
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    function handleConsultationSubmission(form) {
        const formData = new FormData(form);
        const eventType = formData.get('eventType');
        const guests = formData.get('guests');
        const budget = formData.get('budget');
        const dietary = formData.getAll('dietary');
        
        // Generate recommendation based on inputs
        let recommendation = getRecommendation(eventType, guests, budget, dietary);
        
        // Show recommendation
        showRecommendationResult(recommendation);
    }
    
    function getRecommendation(eventType, guests, budget, dietary) {
        let recommendations = [];
        
        // Logic for recommendations based on inputs
        if (eventType === 'wedding' || guests > 100) {
            recommendations.push({
                name: 'Royal Maharaja Thali',
                reason: 'Perfect for large celebrations with variety for all tastes',
                price: '₹899'
            });
        }
        
        if (budget.includes('300-500') || budget.includes('500-800')) {
            recommendations.push({
                name: 'Hyderabadi Dum Biryani',
                reason: 'Great value with authentic flavors that satisfy everyone',
                price: '₹599'
            });
        }
        
        if (dietary.includes('vegetarian') || eventType === 'festival') {
            recommendations.push({
                name: 'Mithai Collection',
                reason: 'Perfect for vegetarian guests and festival celebrations',
                price: '₹299/kg'
            });
        }
        
        if (eventType === 'corporate' || guests < 50) {
            recommendations.push({
                name: 'Tandoori Platter',
                reason: 'Ideal for smaller gatherings with impressive presentation',
                price: '₹749'
            });
        }
        
        return recommendations.length > 0 ? recommendations : [{
            name: 'Royal Maharaja Thali',
            reason: 'Our most popular choice, suitable for any occasion',
            price: '₹899'
        }];
    }
    
    function showRecommendationResult(recommendations) {
        const resultModal = document.createElement('div');
        resultModal.className = 'specialty-modal';
        resultModal.innerHTML = `
            <div class="specialty-modal-content">
                <span class="modal-close">&times;</span>
                <h2 class="modal-title">Chef's Recommendations</h2>
                <p class="modal-description">Based on your preferences, our chefs recommend the following specialties:</p>
                <div class="recommendations-list">
                    ${recommendations.map(rec => `
                        <div class="recommendation-item">
                            <h4>${rec.name}</h4>
                            <p>${rec.reason}</p>
                            <span class="rec-price">${rec.price}</span>
                            <button class="specialty-btn btn-order" onclick="handleOrder('${rec.name.toLowerCase().replace(/\s+/g, '-')}')">
                                Order ${rec.name}
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="recommendation-cta">
                    <p>Need more personalized recommendations?</p>
                    <button class="specialty-btn btn-info" onclick="window.location.href='#contact'">
                        Contact Our Chefs
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(resultModal);
        resultModal.style.display = 'block';
        
        // Add recommendation styles
        const recStyle = document.createElement('style');
        recStyle.textContent = `
            .recommendations-list {
                margin: 25px 0;
            }
            .recommendation-item {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 15px;
                border-left: 4px solid #ff6b35;
            }
            .recommendation-item h4 {
                color: #2c3e50;
                margin-bottom: 8px;
                font-size: 1.2rem;
            }
            .recommendation-item p {
                color: #666;
                margin-bottom: 12px;
                line-height: 1.5;
            }
            .rec-price {
                display: inline-block;
                background: #ff6b35;
                color: white;
                padding: 4px 12px;
                border-radius: 15px;
                font-weight: 600;
                margin-right: 15px;
                font-size: 0.9rem;
            }
            .recommendation-cta {
                text-align: center;
                padding: 20px;
                background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(243, 156, 18, 0.1));
                border-radius: 12px;
                margin-top: 20px;
            }
            .recommendation-cta p {
                margin-bottom: 15px;
                color: #666;
            }
        `;
        document.head.appendChild(recStyle);
        
        // Handle close
        const closeBtn = resultModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(resultModal);
            document.body.style.overflow = 'auto';
        });
        
        resultModal.addEventListener('click', function(e) {
            if (e.target === resultModal) {
                document.body.removeChild(resultModal);
                document.body.style.overflow = 'auto';
            }
        });
        
        showNotification('Recommendations generated successfully!', 'success');
    }
});

// Export functions for external use
window.SpecialtiesModule = {
    openModal: function(type) {
        // Allow external components to open specialty modals
        const event = new CustomEvent('openSpecialtyModal', { detail: { type } });
        document.dispatchEvent(event);
    }
};