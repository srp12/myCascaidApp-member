// Navigation animation logic

document.addEventListener('DOMContentLoaded', () => {
    const topNav = document.getElementById('top-nav');
    const bottomNav = document.getElementById('bottom-nav');

    if (!topNav || !bottomNav) {
        // Only run if nav bars exist on the page
        return;
    }

    let ticking = false;
    let lastScrollY = window.scrollY;
    
    let topNavHeight = 0;
    let bottomNavHeight = 0;
    let currentTopTranslateY = 0;
    let currentBottomTranslateY = 0;

    function initializeNavDimensions() {
        topNavHeight = topNav.offsetHeight;
        bottomNavHeight = bottomNav.offsetHeight;
        topNav.style.transform = `translateY(${currentTopTranslateY}px)`;
        bottomNav.style.transform = `translateY(${currentBottomTranslateY}px)`;
    }

    setTimeout(initializeNavDimensions, 0); // Initialize after layout

    function handleScroll() {
        if (topNavHeight === 0 || bottomNavHeight === 0) {
            ticking = false;
            return; 
        }

        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        const hideThreshold = topNavHeight; 

        // Apply 1:1 translation based on scrollDelta, clamping immediately
        currentTopTranslateY = Math.max(-topNavHeight, Math.min(0, currentTopTranslateY - scrollDelta));
        currentBottomTranslateY = Math.max(0, Math.min(bottomNavHeight, currentBottomTranslateY + scrollDelta));
        
        // Directly apply transform, disable CSS transition during scroll
        topNav.style.transition = 'none'; 
        bottomNav.style.transition = 'none';
        topNav.style.transform = `translateY(${currentTopTranslateY}px)`;
        bottomNav.style.transform = `translateY(${currentBottomTranslateY}px)`;

        // --- Snap-to-end logic --- 
        clearTimeout(topNav.scrollEndTimer);
        clearTimeout(bottomNav.scrollEndTimer);

        const snapTimeout = 150; 
        topNav.scrollEndTimer = setTimeout(() => {
            const snapToTop = (currentScrollY <= hideThreshold || currentTopTranslateY > -topNavHeight / 2) ? 0 : -topNavHeight;
            if (currentTopTranslateY !== snapToTop) {
                topNav.style.transition = 'transform 0.2s ease-out'; 
                topNav.style.transform = `translateY(${snapToTop}px)`;
                currentTopTranslateY = snapToTop; 
            }
        }, snapTimeout);
        
        bottomNav.scrollEndTimer = setTimeout(() => {
            const snapToBottom = (currentScrollY <= hideThreshold || currentBottomTranslateY < bottomNavHeight / 2) ? 0 : bottomNavHeight;
            if (currentBottomTranslateY !== snapToBottom) {
                bottomNav.style.transition = 'transform 0.2s ease-out'; 
                bottomNav.style.transform = `translateY(${snapToBottom}px)`;
                currentBottomTranslateY = snapToBottom; 
            }
        }, snapTimeout);
        // --- End Snap-to-end logic --- 

        lastScrollY = Math.max(0, currentScrollY); 
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
         setTimeout(initializeNavDimensions, 50);
    });

    // --- Feed Tabs Logic ---
    const feedTabs = document.querySelectorAll('.feed-tab');
    const feeds = document.querySelectorAll('.feed');
    
    // Feed tab click handling
    if (feedTabs.length > 0 && feeds.length > 0) {
        feedTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                feedTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all feeds
                feeds.forEach(feed => feed.classList.remove('active'));
                
                // Show the corresponding feed
                const feedId = `${tab.dataset.feed}-feed`;
                const targetFeed = document.getElementById(feedId);
                if (targetFeed) {
                    targetFeed.classList.add('active');
                }
            });
        });
    }

    // --- Side Menu Logic ---
    const profileButton = document.querySelector('#top-nav .profile-button');
    const profileIcon = profileButton ? profileButton.querySelector('img.nav-icon') : null;
    const notificationsButton = document.querySelector('#top-nav .notifications-button');
    const notificationsIcon = notificationsButton ? notificationsButton.querySelector('img.nav-icon') : null;
    const profileSideMenu = document.getElementById('profile-side-menu');
    const settingsSideMenu = document.getElementById('settings-side-menu');
    const sideMenuOverlay = document.getElementById('side-menu-overlay');

    const openSideMenu = (menuElement) => {
        if (!menuElement) return;
        // Close other menus first
        if (profileSideMenu) profileSideMenu.classList.remove('active');
        if (settingsSideMenu) settingsSideMenu.classList.remove('active');
        
        menuElement.classList.add('active');
        document.body.classList.add('side-menu-active');

        // Update icon for opened menu
        if (menuElement === profileSideMenu && profileIcon && profileIcon.dataset.filledIcon) {
            profileIcon.src = profileIcon.dataset.filledIcon;
        }
        if (menuElement === settingsSideMenu && notificationsIcon && notificationsIcon.dataset.filledIcon) {
            notificationsIcon.src = notificationsIcon.dataset.filledIcon;
        }
    };

    const closeSideMenus = () => {
        if (profileSideMenu) profileSideMenu.classList.remove('active');
        if (settingsSideMenu) settingsSideMenu.classList.remove('active');
        document.body.classList.remove('side-menu-active');

        // Reset icons for closed menus
        if (profileIcon && profileIcon.dataset.defaultIcon) {
            profileIcon.src = profileIcon.dataset.defaultIcon;
        }
        if (notificationsIcon && notificationsIcon.dataset.defaultIcon) {
            notificationsIcon.src = notificationsIcon.dataset.defaultIcon;
        }
    };

    if (profileButton && profileSideMenu) {
        profileButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from bubbling to overlay if it's already open
            if (profileSideMenu.classList.contains('active')) {
                closeSideMenus();
            } else {
                openSideMenu(profileSideMenu);
            }
        });
    }

    if (notificationsButton && settingsSideMenu) {
        notificationsButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (settingsSideMenu.classList.contains('active')) {
                closeSideMenus();
            } else {
                openSideMenu(settingsSideMenu);
            }
        });
    }

    if (sideMenuOverlay) {
        sideMenuOverlay.addEventListener('click', () => {
            closeSideMenus();
        });
    }

    // Optional: Close side menu with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && document.body.classList.contains('side-menu-active')) {
            closeSideMenus();
        }
    });

    // --- Bottom Nav Icon Click Logic with Page Navigation ---
    const navButtons = document.querySelectorAll('#bottom-nav .nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Remove active class from all buttons and reset icons
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                const icon = btn.querySelector('.nav-icon');
                if (icon && icon.dataset.defaultIcon) {
                    icon.src = icon.dataset.defaultIcon;
                }
            });
            
            // Add active class to clicked button and set filled icon
            this.classList.add('active');
            const icon = this.querySelector('.nav-icon');
            if (icon && icon.dataset.filledIcon) {
                icon.src = icon.dataset.filledIcon;
            }
            
            // Handle page navigation
            switch(page) {
                case 'home':
                    window.location.href = 'index.html';
                    break;
                case 'messages':
                    window.location.href = 'chat.html';
                    break;
                case 'engine':
                    window.location.href = 'engine.html';
                    break;
                case 'wallet':
                    window.location.href = 'wallet.html';
                    break;
                case 'ai':
                    window.location.href = 'ai.html';
                    break;
            }
        });
    });
}); 