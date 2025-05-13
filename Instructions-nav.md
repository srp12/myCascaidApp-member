# myCascaid Web Application Development Specifications

## Overview
Develop a mobile-first web application called "myCascaid" that serves both regular members and think tank members. The application should feature a modern, sleek UI with both light and dark mode support.

## Project Structure Requirements
1. Implement a modular code architecture:
   - Create separate JavaScript files for different functionalities (authentication, navigation, UI components, etc.)
   - Organize files in a logical folder structure:
     - `/js` - For JavaScript files
     - `/css` - For stylesheets
     - `/components` - For reusable UI components
     - `/services` - For API and data services
     - `/assets` - For images and icons

## Authentication System
1. Design a login screen with:
   - Username field
   - Password field
   - Toggle switch to alternate between "Member" and "Think Tank Member" login modes
   - Each mode should have appropriate validation rules and authentication endpoints

## Navigation Requirements
1. Bottom Navigation Bar:
   - Implement a persistent navigation bar at the bottom with the following icons (from left to right):
     - Home icon - Links to the homepage
     - Engine light icon - Links to "Check Engine Lights" section
     - Cascaid logo (AI) - Represented by two dark green half circles where the left one is positioned halfway down the right side
     - Mail icon - Links to "Direct Messages" section
     - DNA icon - Links to "Digital Health Wallet" section

2. Top Navigation Bar:
   - Implement a persistent navigation bar at the top with:
     - User's profile image (top left corner)
     - Settings icon (top right corner)

## Responsive Design
1. Ensure the application is fully responsive with mobile-first approach
2. Implement both light and dark mode with smooth transitions between them
3. Create touch-friendly UI elements with appropriate sizing for mobile interactions

When the user scrolls down on the page (or swipes down with finger), the top and bottom navigation menus should smoothly hide themselves - the bottom navigation sliding down out of view while the top navigation slides up out of view. The hiding/showing animation should match the scroll speed 1:1. When the user begins scrolling up again, both navigation menus should smoothly reappear at the same rate as the scroll movement.

now, add a profile section that opens by clicking the icon. the side menu should open from the left 75% of the way. same thing with the settings icon, except it opens from the right.  if clicked the 25% the side menu should go away

