document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const floatingPostButton = document.getElementById('floating-post-button');
    const postTypeMenu = document.getElementById('post-type-menu');
    
    // Post types
    const postTypes = {
        'regular': {
            title: 'Create Post',
            placeholder: 'What\'s on your mind?'
        },
        'question': {
            title: 'Ask a Question',
            placeholder: 'What would you like to ask?'
        },
        'health-check': {
            title: 'Health Check-in',
            placeholder: 'Share an update about your health...'
        },
        'photo': {
            title: 'Share Photo',
            placeholder: 'Add a caption to your photo...'
        },
        'poll': {
            title: 'Create Poll',
            placeholder: 'Ask a question for your poll...'
        }
    };

    // Improved floating post button click handler
    let isMenuOpen = false;
    let clickCount = 0;
    let clickTimer = null;
    
    if (floatingPostButton) {
        floatingPostButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from propagating to document
            
            clickCount++;
            
            if (clickCount === 1) {
                // First click
                clickTimer = setTimeout(function() {
                    // If it's a single click after timeout
                    if (clickCount === 1) {
                        // Toggle menu visibility
                        isMenuOpen = !isMenuOpen;
                        postTypeMenu.classList.toggle('active', isMenuOpen);
                    }
                    clickCount = 0; // Reset click count
                }, 200); // Shorter timeout for better responsiveness
            } else {
                // Double click detected
                clearTimeout(clickTimer);
                clickCount = 0;
                
                // Get default post type and navigate
                const defaultType = floatingPostButton.getAttribute('data-default-type') || 'regular';
                window.location.href = `create-post.html?type=${defaultType}`;
            }
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', function(event) {
        // Close post type menu if clicking outside
        if (postTypeMenu && 
            postTypeMenu.classList.contains('active') && 
            !postTypeMenu.contains(event.target) && 
            event.target !== floatingPostButton) {
            
            postTypeMenu.classList.remove('active');
            isMenuOpen = false;
        }
    });

    // Handle post type selection
    const postTypeOptions = document.querySelectorAll('.post-type-option');
    if (postTypeOptions) {
        postTypeOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent parent handlers from firing
                const postType = this.getAttribute('data-type');
                // Navigate to create-post.html with the post type as a query parameter
                window.location.href = `create-post.html?type=${postType}`;
            });
        });
    }

    // Update floating post button based on active feed
    function updateFloatingPostButton() {
        if (!floatingPostButton) return;
        
        const activeTab = document.querySelector('.feed-tab.active');
        if (activeTab) {
            const feedType = activeTab.getAttribute('data-feed');
            
            // Change button appearance/functionality based on feed type
            switch (feedType) {
                case 'for-you':
                    floatingPostButton.setAttribute('data-default-type', 'health-check');
                    break;
                case 'news-education':
                    floatingPostButton.setAttribute('data-default-type', 'question');
                    break;
                case 'following':
                    floatingPostButton.setAttribute('data-default-type', 'regular');
                    break;
                default:
                    floatingPostButton.setAttribute('data-default-type', 'regular');
            }
        }
    }

    // Update floating button when feed tab changes
    const feedTabs = document.querySelectorAll('.feed-tab');
    feedTabs.forEach(tab => {
        tab.addEventListener('click', updateFloatingPostButton);
    });

    // Initial update
    updateFloatingPostButton();
}); 