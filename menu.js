// Menu Section JavaScript - Tab Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Menu tab functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    function switchMenuTab(targetMenu) {
        // Remove active class from all tabs and contents
        menuTabs.forEach(tab => tab.classList.remove('active'));
        menuContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-menu="${targetMenu}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Show corresponding content
        const activeContent = document.getElementById(targetMenu);
        if (activeContent) {
            activeContent.style.display = 'block';
            activeContent.classList.add('active');
            
            // Add fade-in animation
            activeContent.style.opacity = '0';
            setTimeout(() => {
                activeContent.style.opacity = '1';
            }, 50);
        }
    }

    // Add click event listeners to menu tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetMenu = this.getAttribute('data-menu');
            switchMenuTab(targetMenu);
            
            // Show notification for tab switch
            if (window.CorporateWebsite && window.CorporateWebsite.showNotification) {
                const tabName = this.textContent;
                window.CorporateWebsite.showNotification(`Switched to ${tabName}`, 'info');
            }
        });
    });

    // Package selection functionality
    const selectButtons = document.querySelectorAll('.select-package');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = this.closest('.menu-package');
            const packageName = packageCard.querySelector('h3').textContent;
            const packagePrice = packageCard.querySelector('.price').textContent;
            
            // Add selected state
            packageCard.classList.add('selected');
            
            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Selected!';
            this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            // Show success notification
            if (window.CorporateWebsite && window.CorporateWebsite.showNotification) {
                window.CorporateWebsite.showNotification(
                    `${packageName} (${packagePrice}) added to your selection!`, 
                    'success'
                );
            }
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                packageCard.classList.remove('selected');
            }, 2000);
        });
    });

    // Custom menu request functionality
    const customMenuBtn = document.querySelector('.menu-customization .btn-primary');
    
    if (customMenuBtn) {
        customMenuBtn.addEventListener('click', function() {
            // Create and show custom menu modal
            showCustomMenuModal();
        });
    }

    // Initialize with wedding tab active
    switchMenuTab('wedding');
});

// Custom Menu Modal
function showCustomMenuModal() {
    // Remove existing modal if any
    const existingModal = document.querySelector('.custom-menu-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'custom-menu-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-utensils"></i> Request Custom Menu</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="customMenuForm">
                        <div class="form-group">
                            <label>Event Type</label>
                            <select name="eventType" required>
                                <option value="">Select Event Type</option>
                                <option value="wedding">Wedding</option>
                                <option value="corporate">Corporate Event</option>
                                <option value="birthday">Birthday Party</option>
                                <option value="anniversary">Anniversary</option>
                                <option value="festival">Festival</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Number of Guests</label>
                            <input type="number" name="guests" placeholder="Enter number of guests" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Budget Range (per person)</label>
                            <select name="budget" required>
                                <option value="">Select Budget Range</option>
                                <option value="300-500">₹300 - ₹500</option>
                                <option value="500-800">₹500 - ₹800</option>
                                <option value="800-1200">₹800 - ₹1,200</option>
                                <option value="1200+">₹1,200+</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Dietary Preferences</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="dietary" value="vegetarian"> Vegetarian Only</label>
                                <label><input type="checkbox" name="dietary" value="vegan"> Vegan Options</label>
                                <label><input type="checkbox" name="dietary" value="jain"> Jain Food</label>
                                <label><input type="checkbox" name="dietary" value="gluten-free"> Gluten-Free</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Special Requirements</label>
                            <textarea name="requirements" placeholder="Tell us about any special dishes, allergies, or specific requirements..." rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Contact Information</label>
                            <input type="text" name="name" placeholder="Your Name" required>
                            <input type="tel" name="phone" placeholder="Phone Number" required>
                        </div>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-paper-plane"></i> Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    // Add to body
    document.body.appendChild(modal);

    // Modal functionality
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('#customMenuForm');

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            if (window.CorporateWebsite && window.CorporateWebsite.showNotification) {
                window.CorporateWebsite.showNotification(
                    'Custom menu request submitted! Our chef will contact you within 24 hours.', 
                    'success'
                );
            }
            closeModal();
        }, 2000);
    });

    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

// Add modal CSS
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .custom-menu-modal .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .custom-menu-modal .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .custom-menu-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #eee;
        background: linear-gradient(135deg, #2c3e50, #34495e);
        color: white;
        border-radius: 15px 15px 0 0;
    }

    .custom-menu-modal .modal-header h3 {
        margin: 0;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .custom-menu-modal .modal-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }

    .custom-menu-modal .modal-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .custom-menu-modal .modal-body {
        padding: 2rem;
    }

    .custom-menu-modal .form-group {
        margin-bottom: 1.5rem;
    }

    .custom-menu-modal label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #2c3e50;
    }

    .custom-menu-modal input,
    .custom-menu-modal select,
    .custom-menu-modal textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
        box-sizing: border-box;
    }

    .custom-menu-modal input:focus,
    .custom-menu-modal select:focus,
    .custom-menu-modal textarea:focus {
        outline: none;
        border-color: #3498db;
    }

    .custom-menu-modal .checkbox-group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
    }

    .custom-menu-modal .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: normal;
        margin-bottom: 0;
    }

    .custom-menu-modal .checkbox-group input[type="checkbox"] {
        width: auto;
        margin: 0;
    }

    .custom-menu-modal .btn-primary {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .custom-menu-modal .btn-primary:hover {
        background: linear-gradient(135deg, #2980b9, #3498db);
        transform: translateY(-2px);
    }

    .custom-menu-modal .btn-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    /* Package selection styles */
    .menu-package.selected {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(52, 152, 219, 0.2);
        border: 2px solid #3498db;
    }

    @media (max-width: 768px) {
        .custom-menu-modal .modal-content {
            margin: 10px;
            max-height: 95vh;
        }
        
        .custom-menu-modal .modal-header,
        .custom-menu-modal .modal-body {
            padding: 1rem;
        }
        
        .custom-menu-modal .checkbox-group {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(modalStyles);