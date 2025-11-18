// Testimonials Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Testimonials data
    const testimonialsData = [
        {
            name: "Chef Sanjeev Kapoor",
            role: "Celebrity Chef & TV Host",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
            text: "Spice Heritage maintains the authentic taste of Indian cuisine. Their attention to traditional cooking methods is commendable. I've personally witnessed their dedication to preserving our culinary heritage.",
            rating: 5,
            date: "2 weeks ago",
            featured: true
        },
        {
            name: "Priya Sharma",
            role: "Wedding Planner",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
            text: "Best Indian catering in the city! They catered my client's 500-guest wedding and every single dish was perfect. The presentation was stunning and guests are still talking about the food.",
            rating: 5,
            date: "1 month ago"
        },
        {
            name: "Rajesh Kumar",
            role: "Corporate Event Manager",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
            text: "Outstanding service for our annual corporate event. The variety of dishes was impressive and everything was fresh and delicious. The staff was very professional and courteous throughout.",
            rating: 5,
            date: "3 weeks ago"
        },
        {
            name: "Meera Reddy",
            role: "Bride",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            text: "Spice Heritage made our daughter's wedding absolutely perfect! The food quality was exceptional and the presentation was beautiful. Every guest complimented the authentic taste.",
            rating: 5,
            date: "2 months ago"
        },
        {
            name: "Amit Patel",
            role: "IT Director",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
            text: "We've been using Spice Heritage for our office events for 3 years now. Consistent quality, timely delivery, and excellent customer service. Highly recommended for corporate catering.",
            rating: 5,
            date: "1 week ago"
        },
        {
            name: "Kavya Nair",
            role: "Festival Organizer",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
            text: "Amazing South Indian breakfast catering for our cultural festival. The dosas were crispy, sambhar was perfect, and the chutneys were authentic. Served 1000+ people flawlessly!",
            rating: 5,
            date: "1 month ago"
        }
    ];

    let currentSlide = 0;
    const slidesPerView = 3;
    
    // Initialize testimonials
    initTestimonials();
    
    function initTestimonials() {
        setupCarousel();
        setupIntersectionObserver();
        setupVideoTestimonials();
        setupModal();
        startAutoSlide();
    }
    
    function setupCarousel() {
        const grid = document.querySelector('.testimonials-grid');
        if (!grid) return;
        
        // Create carousel structure
        const carousel = document.createElement('div');
        carousel.className = 'testimonials-carousel';
        
        const carouselTrack = document.createElement('div');
        carouselTrack.className = 'carousel-track';
        
        // Generate testimonial cards
        testimonialsData.forEach((testimonial, index) => {
            const card = createTestimonialCard(testimonial, index);
            carouselTrack.appendChild(card);
        });
        
        carousel.appendChild(carouselTrack);
        
        // Add controls
        const controls = createCarouselControls();
        carousel.appendChild(controls);
        
        // Replace existing grid
        grid.parentNode.replaceChild(carousel, grid);
        
        updateCarouselView();
    }
    
    function createTestimonialCard(testimonial, index) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        if (testimonial.featured) card.classList.add('featured');
        
        card.innerHTML = `
            <div class="testimonial-avatar">
                <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
            </div>
            <h4>${testimonial.name}</h4>
            <div class="testimonial-role">${testimonial.role}</div>
            <div class="testimonial-rating">
                ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-date">${testimonial.date}</div>
        `;
        
        card.addEventListener('click', () => openTestimonialModal(testimonial));
        
        return card;
    }
    
    function createCarouselControls() {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => changeSlide(-1));
        
        const dots = document.createElement('div');
        dots.className = 'carousel-dots';
        
        const totalSlides = Math.ceil(testimonialsData.length / slidesPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dots.appendChild(dot);
        }
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => changeSlide(1));
        
        controls.appendChild(prevBtn);
        controls.appendChild(dots);
        controls.appendChild(nextBtn);
        
        return controls;
    }
    
    function changeSlide(direction) {
        const totalSlides = Math.ceil(testimonialsData.length / slidesPerView);
        currentSlide += direction;
        
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        
        updateCarouselView();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarouselView();
    }
    
    function updateCarouselView() {
        const track = document.querySelector('.carousel-track');
        const dots = document.querySelectorAll('.carousel-dot');
        
        if (!track) return;
        
        // Update track position
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function startAutoSlide() {
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
    
    function setupVideoTestimonials() {
        const videoSection = document.createElement('div');
        videoSection.className = 'video-testimonials';
        videoSection.innerHTML = `
            <h3>Watch Our Customers Share Their Experience</h3>
            <div class="video-grid">
                <div class="video-testimonial" data-video="wedding">
                    <div class="video-thumbnail">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="video-info">
                        <h4>Wedding Success Story</h4>
                        <p>Hear from the Sharma family about their dream wedding catering experience</p>
                    </div>
                </div>
                <div class="video-testimonial" data-video="corporate">
                    <div class="video-thumbnail">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="video-info">
                        <h4>Corporate Event Excellence</h4>
                        <p>TechCorp's annual conference catering testimonial</p>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.testimonials .container').appendChild(videoSection);
        
        // Add video click handlers
        document.querySelectorAll('.video-testimonial').forEach(video => {
            video.addEventListener('click', function() {
                const videoType = this.getAttribute('data-video');
                playVideoTestimonial(videoType);
            });
        });
    }
    
    function playVideoTestimonial(type) {
        showNotification(`Playing ${type} testimonial video...`, 'info');
        // In a real implementation, you would open a video modal or redirect to video
    }
    
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-testimonial');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe testimonial cards when they're created
        setTimeout(() => {
            document.querySelectorAll('.testimonial-card').forEach(card => {
                observer.observe(card);
            });
        }, 100);
    }
    
    function setupModal() {
        const modal = document.createElement('div');
        modal.className = 'testimonial-modal';
        modal.id = 'testimonialModal';
        modal.innerHTML = `
            <div class="testimonial-modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-testimonial-content"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeTestimonialModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTestimonialModal();
            }
        });
    }
    
    function openTestimonialModal(testimonial) {
        const modal = document.getElementById('testimonialModal');
        const content = modal.querySelector('.modal-testimonial-content');
        
        content.innerHTML = `
            <div class="testimonial-avatar" style="margin: 0 auto 20px;">
                <img src="${testimonial.image}" alt="${testimonial.name}">
            </div>
            <h3>${testimonial.name}</h3>
            <div class="testimonial-role" style="margin-bottom: 20px;">${testimonial.role}</div>
            <div class="testimonial-rating" style="margin-bottom: 20px;">
                ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
            </div>
            <p class="testimonial-text" style="font-size: 1.1rem; line-height: 1.8;">${testimonial.text}</p>
            <div class="testimonial-date" style="margin-top: 20px;">${testimonial.date}</div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeTestimonialModal() {
        const modal = document.getElementById('testimonialModal');
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
            closeTestimonialModal();
        }
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        }
        if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});

// Export for external use
window.TestimonialsModule = {
    goToSlide: function(index) {
        goToSlide(index);
    }
};