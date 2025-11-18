// Reviews Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    let currentRating = 0;
    let reviews = [];
    
    // Initialize reviews functionality
    initReviews();
    
    function initReviews() {
        setupStarRating();
        setupReviewForm();
        setupReviewFilters();
        setupIntersectionObserver();
        animateRatingBars();
        loadExistingReviews();
    }
    
    function setupStarRating() {
        const stars = document.querySelectorAll('.star-rating i');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', function() {
                highlightStars(index + 1);
            });
            
            star.addEventListener('click', function() {
                currentRating = index + 1;
                setRating(currentRating);
            });
        });
        
        const starContainer = document.querySelector('.star-rating');
        if (starContainer) {
            starContainer.addEventListener('mouseleave', function() {
                setRating(currentRating);
            });
        }
    }
    
    function highlightStars(rating) {
        const stars = document.querySelectorAll('.star-rating i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    function setRating(rating) {
        const stars = document.querySelectorAll('.star-rating i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('active');
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
    
    function setupReviewForm() {
        const form = document.getElementById('reviewForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (currentRating === 0) {
                showNotification('Please select a rating', 'error');
                return;
            }
            
            const formData = new FormData(form);
            const name = formData.get('name') || form.querySelector('input[type="text"]').value;
            const email = formData.get('email') || form.querySelector('input[type="email"]').value;
            const reviewText = form.querySelector('textarea').value;
            
            if (!name || !email || !reviewText) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            const newReview = {
                id: Date.now(),
                name: name,
                email: email,
                rating: currentRating,
                text: reviewText,
                date: 'Just now',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff6b35&color=fff&size=60`
            };
            
            addReview(newReview);
            form.reset();
            currentRating = 0;
            setRating(0);
            
            showNotification('Thank you for your review!', 'success');
        });
    }
    
    function addReview(review) {
        reviews.unshift(review);
        
        const reviewsGrid = document.querySelector('.reviews-grid');
        const reviewCard = createReviewCard(review);
        
        // Add animation class
        reviewCard.classList.add('fade-in-review');
        
        // Insert at the beginning
        reviewsGrid.insertBefore(reviewCard, reviewsGrid.firstChild);
        
        // Update statistics
        updateRatingStatistics();
        
        // Save to localStorage
        localStorage.setItem('spiceHeritageReviews', JSON.stringify(reviews));
    }
    
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.setAttribute('data-rating', review.rating);
        
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="${review.avatar}" alt="${review.name}">
                    <div>
                        <h4>${review.name}</h4>
                        <div class="stars">
                            ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                            ${Array(5 - review.rating).fill('<i class="far fa-star"></i>').join('')}
                        </div>
                    </div>
                </div>
                <span class="date">${review.date}</span>
            </div>
            <p>"${review.text}"</p>
        `;
        
        // Add click handler for modal
        card.addEventListener('click', () => openReviewModal(review));
        
        return card;
    }
    
    function setupReviewFilters() {
        // Create filter buttons
        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'review-filters';
        filtersContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">All Reviews</button>
            <button class="filter-btn" data-filter="5">5 Stars</button>
            <button class="filter-btn" data-filter="4">4 Stars</button>
            <button class="filter-btn" data-filter="3">3 Stars</button>
            <button class="filter-btn" data-filter="recent">Recent</button>
        `;
        
        // Insert before reviews grid
        const reviewsGrid = document.querySelector('.reviews-grid');
        reviewsGrid.parentNode.insertBefore(filtersContainer, reviewsGrid);
        
        // Add event listeners
        const filterBtns = filtersContainer.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter reviews
                const filter = this.getAttribute('data-filter');
                filterReviews(filter);
            });
        });
    }
    
    function filterReviews(filter) {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach(card => {
            let show = true;
            
            if (filter === 'all') {
                show = true;
            } else if (filter === 'recent') {
                // Show reviews from last 30 days (for demo, show first 3)
                const index = Array.from(reviewCards).indexOf(card);
                show = index < 3;
            } else {
                const rating = card.getAttribute('data-rating');
                show = rating === filter;
            }
            
            if (show) {
                card.style.display = 'block';
                card.classList.add('fade-in-review');
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-review');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe review cards
        document.querySelectorAll('.review-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe rating summary
        const ratingSummary = document.querySelector('.rating-summary');
        if (ratingSummary) {
            observer.observe(ratingSummary);
        }
    }
    
    function animateRatingBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.fill');
                    fills.forEach((fill, index) => {
                        setTimeout(() => {
                            fill.style.animation = 'fillBar 1.5s ease forwards';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        const ratingBreakdown = document.querySelector('.rating-breakdown');
        if (ratingBreakdown) {
            observer.observe(ratingBreakdown);
        }
    }
    
    function loadExistingReviews() {
        // Load from localStorage if available
        const savedReviews = localStorage.getItem('spiceHeritageReviews');
        if (savedReviews) {
            reviews = JSON.parse(savedReviews);
            
            // Add saved reviews to the grid
            const reviewsGrid = document.querySelector('.reviews-grid');
            reviews.forEach(review => {
                const reviewCard = createReviewCard(review);
                reviewsGrid.appendChild(reviewCard);
            });
        }
        
        // Add rating attributes to existing cards
        const existingCards = document.querySelectorAll('.review-card:not([data-rating])');
        existingCards.forEach((card, index) => {
            card.setAttribute('data-rating', '5'); // Default to 5 stars for existing reviews
            
            // Add click handler
            card.addEventListener('click', () => {
                const reviewData = {
                    name: card.querySelector('h4').textContent,
                    text: card.querySelector('p').textContent.replace(/"/g, ''),
                    rating: 5,
                    date: card.querySelector('.date').textContent,
                    avatar: card.querySelector('img').src
                };
                openReviewModal(reviewData);
            });
        });
    }
    
    function updateRatingStatistics() {
        if (reviews.length === 0) return;
        
        const totalReviews = reviews.length;
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
        
        // Update overall rating
        const overallRatingElement = document.querySelector('.overall-rating h3');
        if (overallRatingElement) {
            overallRatingElement.textContent = averageRating.toFixed(1);
        }
        
        // Update review count
        const reviewCountElement = document.querySelector('.overall-rating p');
        if (reviewCountElement) {
            reviewCountElement.textContent = `Based on ${totalReviews + 2847} reviews`;
        }
        
        // Update rating breakdown
        const ratingCounts = [0, 0, 0, 0, 0];
        reviews.forEach(review => {
            ratingCounts[review.rating - 1]++;
        });
        
        const ratingBars = document.querySelectorAll('.rating-bar');
        ratingBars.forEach((bar, index) => {
            const percentage = totalReviews > 0 ? (ratingCounts[4 - index] / totalReviews) * 100 : 0;
            const fill = bar.querySelector('.fill');
            const percentageSpan = bar.querySelector('span:last-child');
            
            if (fill && percentageSpan) {
                fill.style.width = `${percentage}%`;
                percentageSpan.textContent = `${Math.round(percentage)}%`;
            }
        });
    }
    
    function openReviewModal(review) {
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.innerHTML = `
            <div class="review-modal-content">
                <span class="modal-close">&times;</span>
                <img src="${review.avatar}" alt="${review.name}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;">
                <h3>${review.name}</h3>
                <div class="stars" style="margin: 15px 0; display: flex; justify-content: center; gap: 5px;">
                    ${Array(review.rating).fill('<i class="fas fa-star" style="color: #ffd700; font-size: 1.2rem;"></i>').join('')}
                    ${Array(5 - review.rating).fill('<i class="far fa-star" style="color: #ddd; font-size: 1.2rem;"></i>').join('')}
                </div>
                <p style="font-style: italic; line-height: 1.6; color: #555; margin: 20px 0;">"${review.text}"</p>
                <div style="color: #999; font-size: 0.9rem;">${review.date}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => closeReviewModal(modal));
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeReviewModal(modal);
            }
        });
    }
    
    function closeReviewModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.removeChild(modal);
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
            const modal = document.querySelector('.review-modal');
            if (modal) {
                closeReviewModal(modal);
            }
        }
    });
});

// Export for external use
window.ReviewsModule = {
    addReview: function(reviewData) {
        addReview(reviewData);
    }
};