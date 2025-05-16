// Navigation animation logic

document.addEventListener('DOMContentLoaded', () => {
    const topNav = document.getElementById('top-nav');
    const bottomNav = document.getElementById('bottom-nav');

    if (!topNav || !bottomNav) {
        // Only run if nav bars exist on the page
        return;
    }

    // --- Set home icon to filled if on homepage ---
    const setActiveNavIcon = () => {
        const currentPage = window.location.pathname;
        const isHomePage = currentPage.endsWith('index.html') || currentPage.endsWith('/') || currentPage === '';
        
        if (isHomePage) {
            const homeButton = document.querySelector('#bottom-nav .nav-button[data-page="home"]');
            if (homeButton) {
                homeButton.classList.add('active');
                const homeIcon = homeButton.querySelector('.nav-icon');
                if (homeIcon && homeIcon.dataset.filledIcon) {
                    homeIcon.src = homeIcon.dataset.filledIcon;
                }
            }
        }
    };
    
    // Call immediately to set correct icon state
    setActiveNavIcon();

    // --- Handle tooltips for press and hold ---
    const setupTooltips = () => {
        // Get all nav buttons with tooltips
        const navButtons = document.querySelectorAll('.nav-button, .profile-button, .search-button, .notifications-link');
        
        navButtons.forEach(button => {
            let pressTimer;
            const tooltip = button.querySelector('.nav-tooltip');
            
            if (!tooltip) return;
            
            // Style the tooltip for proper display
            tooltip.style.display = 'none';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 8px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            
            // Set up touch/mouse events
            // Press and hold (touchstart)
            button.addEventListener('touchstart', (e) => {
                pressTimer = setTimeout(() => {
                    showTooltip(tooltip, button);
                }, 500); // Show after 500ms press
            });
            
            // Press and hold (mousedown)
            button.addEventListener('mousedown', (e) => {
                pressTimer = setTimeout(() => {
                    showTooltip(tooltip, button);
                }, 500); // Show after 500ms press
            });
            
            // Cancel if release (touchend/mouseup)
            const cancelPress = () => {
                clearTimeout(pressTimer);
                hideTooltip(tooltip);
            };
            
            button.addEventListener('touchend', cancelPress);
            button.addEventListener('touchcancel', cancelPress);
            button.addEventListener('mouseup', cancelPress);
            button.addEventListener('mouseleave', cancelPress);
        });
    };
    
    const showTooltip = (tooltip, button) => {
        // Position the tooltip above the button
        const buttonRect = button.getBoundingClientRect();
        tooltip.style.display = 'block';
        
        // If in bottom nav, position above the button
        if (button.closest('#bottom-nav')) {
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginBottom = '8px';
        } 
        // If in top nav, position below the button
        else if (button.closest('#top-nav')) {
            tooltip.style.top = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginTop = '8px';
        }
    };
    
    const hideTooltip = (tooltip) => {
        tooltip.style.display = 'none';
    };
    
    // Initialize tooltips
    setupTooltips();

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
        
        // Direct navigation to profile page when clicking the top profile button
        profileButton.addEventListener('dblclick', () => {
            window.location.href = 'profile.html';
        });
    }

    // Add event listeners to the profile menu links
    if (profileSideMenu) {
        const profileLink = profileSideMenu.querySelector('a.profile-nav-link');
        if (profileLink) {
            profileLink.addEventListener('click', (event) => {
                // The link now has href="profile.html" so we don't need to prevent default
                closeSideMenus(); // Close the menu after clicking
            });
        }
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
            
            // Check if we're on the AI page and navigating away
            const currentPath = window.location.pathname;
            const isOnAiPage = currentPath.endsWith('ai.html');
            const isNavigatingAway = isOnAiPage && page !== 'ai';
            
            if (isNavigatingAway) {
                // Play reverse animation when leaving AI page
                const cascaidLogo = document.querySelector('.nav-button.cascaid-logo');
                const leftHalf = cascaidLogo.querySelector('.half-circle.left');
                const rightHalf = cascaidLogo.querySelector('.half-circle.right');
                
                if (leftHalf && rightHalf) {
                    // First stage: start moving back toward center
                    leftHalf.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                    rightHalf.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                    
                    leftHalf.style.transform = 'translateX(-3px) rotate(-15deg)';
                    rightHalf.style.transform = 'translateX(3px) rotate(15deg)';
                    
                    // Second stage: back to circle
                    setTimeout(() => {
                        leftHalf.style.transform = 'translateY(0)';
                        rightHalf.style.transform = 'translateY(0)';
                        
                        // Wait for animation to complete before navigating
                        setTimeout(() => {
                            // Remove active class from all buttons and reset icons
                            navButtons.forEach(btn => {
                                btn.classList.remove('active');
                                const icon = btn.querySelector('.nav-icon');
                                if (icon && icon.dataset.defaultIcon) {
                                    icon.src = icon.dataset.defaultIcon;
                                }
                            });
                            
                            // Add active class to clicked button and set filled icon
                            button.classList.add('active');
                            const icon = button.querySelector('.nav-icon');
                            if (icon && icon.dataset.filledIcon) {
                                icon.src = icon.dataset.filledIcon;
                            }
                            
                            // Navigate to the selected page
                            navigateToPage(page);
                        }, 300);
                    }, 300);
                    
                    return; // Prevent default navigation
                }
            } else {
                // Normal navigation behavior for non-AI pages
                
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
                
                // Special handling for Cascaid logo
                if (page === 'ai') {
                    // Manual animation for the logo
                    const leftHalf = this.querySelector('.half-circle.left');
                    const rightHalf = this.querySelector('.half-circle.right');
                    
                    if (leftHalf && rightHalf) {
                        // Reset transitions
                        leftHalf.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                        rightHalf.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                        
                        // First stage: slicing effect
                        leftHalf.style.transform = 'translateX(-3px) rotate(-15deg)';
                        rightHalf.style.transform = 'translateX(3px) rotate(15deg)';
                        
                        // Second stage: final offset position
                        setTimeout(() => {
                            leftHalf.style.transform = 'translateY(12px)';
                            rightHalf.style.transform = 'translateY(-12px)';
                            
                            // Navigate after animation completes
                            setTimeout(() => {
                                window.location.href = 'ai.html';
                            }, 400);
                        }, 300);
                        
                        return; // Prevent immediate navigation
                    }
                    
                    // Fallback if manual animation fails
                    setTimeout(() => {
                        window.location.href = 'ai.html';
                    }, 900);
                    return;
                }
                
                // Handle page navigation for other buttons
                navigateToPage(page);
            }
        });
    });
    
    // Helper function for page navigation
    function navigateToPage(page) {
        switch(page) {
            case 'home':
                window.location.href = 'index.html';
                break;
            case 'messages':
                window.location.href = 'chat.html';
                break;
            case 'engine':
                window.location.href = 'engine-lights.html';
                break;
            case 'programs':
                window.location.href = 'waze-analogy.html';
                break;
        }
    }

    // Check if we're on the AI page and set active state for the logo
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('ai.html')) {
        const cascaidLogo = document.querySelector('.nav-button.cascaid-logo');
        if (cascaidLogo) {
            cascaidLogo.classList.add('active');
            
            // Direct positioning for the logo halves
            const leftHalf = cascaidLogo.querySelector('.half-circle.left');
            const rightHalf = cascaidLogo.querySelector('.half-circle.right');
            
            if (leftHalf && rightHalf) {
                leftHalf.style.transform = 'translateY(12px)';
                rightHalf.style.transform = 'translateY(-12px)';
            }
        }
    }
    
    // Check if we're on the Programs page and set active state
    if (currentPath.endsWith('waze-analogy.html')) {
        const programsButton = document.querySelector('#bottom-nav .nav-button[data-page="programs"]');
        if (programsButton) {
            // Remove active class from all buttons
            document.querySelectorAll('#bottom-nav .nav-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to programs button
            programsButton.classList.add('active');
            
            // Update icon to filled version
            const icon = programsButton.querySelector('.nav-icon');
            if (icon && icon.dataset.filledIcon) {
                icon.src = icon.dataset.filledIcon;
            }
        }
    }
}); 