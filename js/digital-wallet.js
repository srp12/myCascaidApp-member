// js/digital-wallet.js

document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('animated-circle');
    const header = document.getElementById('simple-top-nav');
    const swipeContainer = document.getElementById('swipe-container');
    const swipeHandle = document.getElementById('swipe-handle');
    const swipeTrack = document.querySelector('.swipe-track');
    const walletContent = document.getElementById('wallet-content');
    
    // Calculate the precise vertical centering offset
    function calculatePerfectCentering() {
        if (header && circle) {
            // Get the header height
            const headerHeight = header.offsetHeight;
            
            // Calculate the offset to adjust the circle position
            // We need to offset by half the header height to move the center point up
            const offset = -(headerHeight / 2);
            
            // Set a CSS variable that we can use in our CSS
            document.documentElement.style.setProperty('--header-offset', `${offset}px`);
            
            // Additional adjustment if the circle doesn't appear perfectly centered
            const viewportHeight = window.innerHeight;
            const circleHeight = circle.classList.contains('expanded') ? parseInt(getComputedStyle(circle).height) : 0;
            
            // Log values for debugging
            console.log(`Header height: ${headerHeight}px, Offset: ${offset}px`);
            console.log(`Viewport height: ${viewportHeight}px, Circle height: ${circleHeight}px`);
        }
    }
    
    // Initialize the wallet intro sequence
    function initWalletIntro() {
        // Calculate centering
        calculatePerfectCentering();
        
        // Add pulse effect to circle
        circle.classList.add('pulse');
        
        // Start the initial expansion after a short delay
        setTimeout(() => {
            circle.classList.add('expanded');
            
            // Show swipe container after circle expansion
            setTimeout(() => {
                swipeContainer.classList.add('visible');
            }, 600);
        }, 800);
    }
    
    // Set up swipe to unlock functionality
    function setupSwipeToUnlock() {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        
        // Calculate dimensions
        const trackWidth = swipeTrack.offsetWidth;
        const handleWidth = swipeHandle.offsetWidth;
        const maxSwipeDistance = trackWidth - handleWidth - 12; // 12px is the padding (6px on each side)
        
        // Threshold for successful swipe (80% of max distance)
        const successThreshold = maxSwipeDistance * 0.8;
        
        // Touch events
        swipeHandle.addEventListener('touchstart', startSwipe);
        document.addEventListener('touchmove', moveSwipe);
        document.addEventListener('touchend', endSwipe);
        
        // Mouse events
        swipeHandle.addEventListener('mousedown', startSwipe);
        document.addEventListener('mousemove', moveSwipe);
        document.addEventListener('mouseup', endSwipe);
        
        function startSwipe(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            currentX = swipeHandle.offsetLeft;
            
            // Prevent default behavior to avoid scrolling on mobile
            e.preventDefault();
        }
        
        function moveSwipe(e) {
            if (!isDragging) return;
            
            // Calculate new position
            const pointerX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const deltaX = pointerX - startX;
            let newLeft = currentX + deltaX;
            
            // Constrain to track bounds
            newLeft = Math.max(6, Math.min(maxSwipeDistance, newLeft));
            
            // Update handle position
            swipeHandle.style.left = `${newLeft}px`;
            
            // Prevent default to avoid scrolling
            e.preventDefault();
        }
        
        function endSwipe() {
            if (!isDragging) return;
            isDragging = false;
            
            // Check if swipe was successful
            const finalPosition = swipeHandle.offsetLeft;
            
            if (finalPosition >= successThreshold) {
                // Successful swipe - complete the animation
                completeUnlock();
            } else {
                // Reset to starting position with animation
                swipeHandle.style.transition = 'left 0.3s ease-out';
                swipeHandle.style.left = '6px';
                
                // Remove transition after animation completes
                setTimeout(() => {
                    swipeHandle.style.transition = '';
                }, 300);
            }
        }
        
        function completeUnlock() {
            // Animate handle to end position
            swipeHandle.style.transition = 'left 0.2s ease-out';
            swipeHandle.style.left = `${maxSwipeDistance}px`;
            
            // Hide swipe container
            setTimeout(() => {
                swipeContainer.style.opacity = 0;
                
                // Fully expand the circle to reveal wallet
                circle.classList.add('fully-expanded');
                
                // Show wallet content
                setTimeout(() => {
                    walletContent.classList.remove('hidden');
                    setTimeout(() => {
                        walletContent.classList.add('visible');
                    }, 50);
                }, 400);
            }, 300);
        }
    }
    
    // Initialize everything
    initWalletIntro();
    setupSwipeToUnlock();
    
    // Recalculate on resize
    window.addEventListener('resize', calculatePerfectCentering);

    // The active state for the bottom navigation button is set directly in
    // digital-wallet.html for simplicity. If your navigation.js handles active
    // states dynamically based on page URL, that script should ideally manage it.
    // If navigation.js also handles switching the icon to its filled version, ensure it
    // correctly identifies the current page as 'wallet' to apply the active state and icon.
}); 