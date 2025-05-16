// Waze Analogy JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Make sure navigation is initialized properly before our code runs
    if (window.initializeNavigation) {
        setTimeout(window.initializeNavigation, 0);
    }
    
    // DOM elements
    const goalsList = document.getElementById('goalsList');
    const goalCards = document.querySelectorAll('.goal-card');
    const wazeMapSection = document.getElementById('wazeMapSection');
    const emptyState = wazeMapSection.querySelector('.empty-state');
    const programContainer = document.getElementById('programContainer');
    const routeVisualization = document.querySelector('.route-visualization');
    const topNav = document.getElementById('top-nav');
    const goalsSection = document.querySelector('.goals-selection-section');
    
    // Modal elements
    const modificationModal = document.getElementById('modificationModal');
    const requestChangesBtn = document.getElementById('requestChangesBtn');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Detail panel elements
    const checkpointDetail = document.getElementById('checkpointDetail');
    const closeDetailBtn = document.querySelector('.close-detail');
    
    // Coach data for each checkpoint
    const coachData = {
        'pcp': {
            name: 'Dr. Sarah Chen',
            avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            role: 'Primary Care Provider',
            specialty: 'Internal Medicine'
        },
        'nutritionist': {
            name: 'Emma Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
            role: 'Nutritionist',
            specialty: 'Clinical Nutrition'
        },
        'fitness': {
            name: 'Coach Mike',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            role: 'Fitness Coach',
            specialty: 'Strength Training'
        },
        'mental': {
            name: 'Dr. James Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            role: 'Mental Health Coach',
            specialty: 'Behavioral Health'
        }
    };
    
    // Sample program data for each goal
    const programData = {
        '1': { // Weight Loss
            title: 'Weight Loss Program',
            subtitle: 'Customized by Dr. Sarah Chen & Team',
            duration: '3',
            activities: '26',
            checkIns: '7',
            routePoints: [
                { x: 10, y: 80, label: 'Start', status: 'current', type: 'current', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-06-01' },
                { x: 20, y: 70, label: 'Nutrition Plan', status: 'upcoming', type: 'check-in', coach: 'nutritionist', isCheckpoint: true, mandatory: true, date: '2023-06-08' },
                { x: 30, y: 65, label: 'Activity 1', status: 'upcoming', type: 'regular', isCheckpoint: false, mandatory: false },
                { x: 40, y: 55, label: 'Week 2 Check', status: 'upcoming', type: 'assessment', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-06-15' },
                { x: 50, y: 50, label: 'Activity 2', status: 'upcoming', type: 'regular', isCheckpoint: false, mandatory: false },
                { x: 60, y: 40, label: 'Milestone', status: 'upcoming', type: 'milestone', coach: 'fitness', isCheckpoint: true, mandatory: true, date: '2023-06-30' },
                { x: 70, y: 30, label: 'Activity 3', status: 'upcoming', type: 'regular', isCheckpoint: false, mandatory: false },
                { x: 80, y: 25, label: 'Final Assessment', status: 'upcoming', type: 'assessment', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-07-15' },
                { x: 90, y: 20, label: 'Complete', status: 'upcoming', type: 'milestone', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-08-01' }
            ],
            segments: [
                { start: 0, end: 1, type: 'mandatory' },
                { start: 1, end: 2, type: 'flexible' },
                { start: 2, end: 3, type: 'flexible' },
                { start: 3, end: 4, type: 'mandatory' },
                { start: 4, end: 5, type: 'flexible' },
                { start: 5, end: 6, type: 'flexible' },
                { start: 6, end: 7, type: 'mandatory' },
                { start: 7, end: 8, type: 'mandatory' }
            ]
        },
        '2': { // Blood Pressure
            title: 'Blood Pressure Management',
            subtitle: 'Customized by Dr. Sarah Chen & Team',
            duration: '4',
            activities: '32',
            checkIns: '8',
            routePoints: [
                { x: 10, y: 80, label: 'Start', status: 'current', type: 'current', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-06-01' },
                { x: 20, y: 70, label: 'Medication Plan', status: 'upcoming', type: 'check-in', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-06-08' },
                { x: 30, y: 65, label: 'Diet Review', status: 'upcoming', type: 'check-in', coach: 'nutritionist', isCheckpoint: true, mandatory: true, date: '2023-06-15' },
                { x: 40, y: 55, label: 'BP Monitoring', status: 'upcoming', type: 'assessment', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-06-22' },
                { x: 50, y: 45, label: 'Stress Reduction', status: 'upcoming', type: 'check-in', coach: 'mental', isCheckpoint: true, mandatory: false, date: '2023-06-29' },
                { x: 60, y: 40, label: 'Progress Check', status: 'upcoming', type: 'milestone', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-07-15' },
                { x: 70, y: 30, label: 'Activity Plan', status: 'upcoming', type: 'check-in', coach: 'fitness', isCheckpoint: true, mandatory: false, date: '2023-07-29' },
                { x: 80, y: 25, label: 'Final Assessment', status: 'upcoming', type: 'assessment', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-08-15' },
                { x: 90, y: 20, label: 'Complete', status: 'upcoming', type: 'milestone', coach: 'pcp', isCheckpoint: true, mandatory: true, date: '2023-09-01' }
            ],
            segments: [
                { start: 0, end: 1, type: 'mandatory' },
                { start: 1, end: 2, type: 'mandatory' },
                { start: 2, end: 3, type: 'flexible' },
                { start: 3, end: 4, type: 'flexible' },
                { start: 4, end: 5, type: 'flexible' },
                { start: 5, end: 6, type: 'mandatory' },
                { start: 6, end: 7, type: 'flexible' },
                { start: 7, end: 8, type: 'mandatory' }
            ]
        },
        '3': { // Activity
            title: 'Daily Steps Challenge',
            subtitle: 'Your journey to 10,000 steps per day',
            duration: '2',
            activities: '18',
            routePoints: [
                { x: 10, y: 80, label: 'Start', status: 'current' },
                { x: 25, y: 65, label: 'Week 1', status: 'upcoming' },
                { x: 40, y: 50, label: 'Activity Check', status: 'upcoming' },
                { x: 55, y: 40, label: 'Milestone', status: 'upcoming' },
                { x: 70, y: 25, label: 'Endurance Test', status: 'upcoming' },
                { x: 85, y: 20, label: 'Goal Complete', status: 'upcoming' }
            ]
        },
        '4': { // Better Sleep
            title: 'Sleep Improvement Plan',
            subtitle: 'Your path to better sleep quality',
            duration: '2',
            activities: '22',
            routePoints: [
                { x: 10, y: 80, label: 'Start', status: 'current' },
                { x: 25, y: 65, label: 'Sleep Log', status: 'upcoming' },
                { x: 40, y: 55, label: 'Habit Check', status: 'upcoming' },
                { x: 55, y: 45, label: 'Milestone', status: 'upcoming' },
                { x: 70, y: 30, label: 'Sleep Analysis', status: 'upcoming' },
                { x: 85, y: 20, label: 'Goal Complete', status: 'upcoming' }
            ]
        },
        '5': { // Nutrition
            title: 'Balanced Diet Program',
            subtitle: 'Developing healthy eating habits',
            duration: '3',
            activities: '28',
            routePoints: [
                { x: 10, y: 80, label: 'Start', status: 'current' },
                { x: 25, y: 70, label: 'Food Log', status: 'upcoming' },
                { x: 40, y: 55, label: 'Nutrition Check', status: 'upcoming' },
                { x: 55, y: 40, label: 'Milestone', status: 'upcoming' },
                { x: 70, y: 30, label: 'Diet Analysis', status: 'upcoming' },
                { x: 85, y: 20, label: 'Goal Complete', status: 'upcoming' }
            ]
        },
        '6': { // Stress Reduction
            title: 'Stress Management Plan',
            subtitle: 'Techniques for mental wellness',
            duration: '2',
            activities: '24',
            routePoints: [
                { x: 10, y: 80, label: 'Start', status: 'current' },
                { x: 25, y: 60, label: 'Mindfulness', status: 'upcoming' },
                { x: 40, y: 65, label: 'Stress Check', status: 'upcoming' },
                { x: 55, y: 50, label: 'Milestone', status: 'upcoming' },
                { x: 70, y: 35, label: 'Habit Review', status: 'upcoming' },
                { x: 85, y: 20, label: 'Goal Complete', status: 'upcoming' }
            ]
        }
    };
    
    // Initialize the page
    function init() {
        // Add click event listeners to goal cards
        goalCards.forEach(card => {
            card.addEventListener('click', function() {
                const goalId = this.getAttribute('data-goal-id');
                selectGoal(goalId);
            });
        });
        
        // Initialize modal functionality
        requestChangesBtn.addEventListener('click', showModificationModal);
        closeModalBtn.addEventListener('click', hideModificationModal);
        cancelBtn.addEventListener('click', hideModificationModal);
        submitBtn.addEventListener('click', submitModificationRequest);
        
        // Initialize detail panel functionality
        closeDetailBtn.addEventListener('click', hideCheckpointDetail);
        
        // Close modal and details if clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modificationModal) {
                hideModificationModal();
            }
        });
        
        // Initialize navigation
        initNavigation();
    }
    
    // Select a goal and show its program
    function selectGoal(goalId) {
        // Remove selected class from all cards
        goalCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        const selectedCard = document.querySelector(`.goal-card[data-goal-id="${goalId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            
            // Scroll the selected card into view
            selectedCard.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        
        // Show program container, hide empty state
        emptyState.style.display = 'none';
        programContainer.style.display = 'block';
        
        // Load program data
        loadProgramData(goalId);
    }
    
    // Load program data for the selected goal
    function loadProgramData(goalId) {
        const program = programData[goalId];
        if (!program) return;
        
        // Update program header info
        document.querySelector('.program-title').textContent = program.title;
        document.querySelector('.program-subtitle').textContent = program.subtitle;
        document.querySelector('.stat-value:nth-child(1)').textContent = program.duration;
        document.querySelectorAll('.stat-value')[1].textContent = program.activities;
        document.querySelectorAll('.stat-value')[2].textContent = program.checkIns;
        
        // Render route visualization
        renderCoachRouteVisualization(program.routePoints, program.segments);
    }
    
    // Render the route visualization with coach elements
    function renderCoachRouteVisualization(points, segments) {
        // Clear previous visualization
        routeVisualization.innerHTML = '';
        
        // Create SVG container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        
        // Draw path segments with different styles
        segments.forEach(segment => {
            const startPoint = points[segment.start];
            const endPoint = points[segment.end];
            const pathClass = `coach-route-path ${segment.type}`;
            
            // Create path element
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            // Calculate control points for a curved path
            const ctrlX = (startPoint.x + endPoint.x) / 2;
            const pathData = `M ${startPoint.x} ${startPoint.y} C ${ctrlX} ${startPoint.y}, ${ctrlX} ${endPoint.y}, ${endPoint.x} ${endPoint.y}`;
            
            pathElement.setAttribute('d', pathData);
            pathElement.setAttribute('class', pathClass);
            svg.appendChild(pathElement);
        });
        
        // Draw each checkpoint
        points.forEach((point, index) => {
            if (point.isCheckpoint) {
                // Create checkpoint circle marker
                const circleMarker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circleMarker.setAttribute('cx', point.x);
                circleMarker.setAttribute('cy', point.y);
                circleMarker.setAttribute('r', point.type === 'current' ? '4' : '3');
                circleMarker.setAttribute('class', `checkpoint-marker ${point.type}`);
                
                // Add checkpoint click event
                circleMarker.addEventListener('click', () => showCheckpointDetail(point));
                
                svg.appendChild(circleMarker);
                
                // Add coach indicator for checkpoints with coaches
                if (point.coach) {
                    const coachIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    coachIndicator.setAttribute('x', point.x);
                    coachIndicator.setAttribute('y', point.y - 6);
                    coachIndicator.setAttribute('class', `coach-indicator ${point.coach}`);
                    coachIndicator.setAttribute('text-anchor', 'middle');
                    
                    // First letter of coach type
                    let coachInitial = '';
                    switch(point.coach) {
                        case 'pcp': coachInitial = 'P'; break;
                        case 'nutritionist': coachInitial = 'N'; break;
                        case 'fitness': coachInitial = 'F'; break;
                        case 'mental': coachInitial = 'M'; break;
                    }
                    
                    coachIndicator.textContent = coachInitial;
                    svg.appendChild(coachIndicator);
                }
                
                // Add label text
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', point.x);
                text.setAttribute('y', point.y + 8);
                text.setAttribute('class', 'checkpoint-label');
                text.textContent = point.label;
                svg.appendChild(text);
            }
        });
        
        // Append SVG to route visualization
        routeVisualization.appendChild(svg);
        
        // Apply dark theme adjustments if needed
        applyThemeToRoute();
    }
    
    // Apply theme-specific styling to route visualization
    function applyThemeToRoute() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const svg = routeVisualization.querySelector('svg');
        if (!svg) return;
        
        const texts = svg.querySelectorAll('.checkpoint-label');
        if (isDarkTheme) {
            texts.forEach(text => text.setAttribute('fill', '#bbb'));
        } else {
            texts.forEach(text => text.setAttribute('fill', '#666'));
        }
    }
    
    // Show checkpoint detail panel
    function showCheckpointDetail(point) {
        if (!point.coach) return; // Only show details for checkpoints with coaches
        
        // Get coach data
        const coach = coachData[point.coach];
        
        // Update detail panel content
        document.querySelector('.checkpoint-title').textContent = point.label;
        document.querySelector('.coach-avatar').src = coach.avatar;
        document.querySelector('.coach-name').textContent = coach.name;
        
        // Update checkpoint metadata
        const metaValues = document.querySelectorAll('.meta-value');
        if (point.date) {
            metaValues[0].textContent = new Date(point.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
        } else {
            metaValues[0].textContent = 'TBD';
        }
        
        metaValues[1].textContent = `${point.type.charAt(0).toUpperCase() + point.type.slice(1)} with ${coach.role}`;
        metaValues[2].textContent = point.type === 'assessment' ? '45 minutes' : '30 minutes';
        
        // Update checkpoint description
        let description = '';
        switch (point.type) {
            case 'current':
                description = `This is your starting point with ${coach.name}, your ${coach.role}. You'll discuss your health goals and create a personalized plan.`;
                break;
            case 'check-in':
                description = `Regular check-in with ${coach.name} to monitor your progress, answer questions, and make any necessary adjustments to your plan.`;
                break;
            case 'assessment':
                description = `A comprehensive assessment with ${coach.name} to evaluate your progress and adjust your program based on results.`;
                break;
            case 'milestone':
                description = `A significant point in your journey where ${coach.name} will review your overall progress and celebrate achievements.`;
                break;
            default:
                description = `Scheduled appointment with ${coach.name}, your ${coach.role}, to support your health journey.`;
        }
        document.querySelector('.checkpoint-description p').textContent = description;
        
        // Show the detail panel
        checkpointDetail.classList.add('active');
    }
    
    // Hide checkpoint detail panel
    function hideCheckpointDetail() {
        checkpointDetail.classList.remove('active');
    }
    
    // Show modification request modal
    function showModificationModal() {
        modificationModal.classList.add('active');
    }
    
    // Hide modification request modal
    function hideModificationModal() {
        modificationModal.classList.remove('active');
    }
    
    // Handle modification request submission
    function submitModificationRequest() {
        const requestType = document.getElementById('requestType').value;
        const requestDetails = document.getElementById('requestDetails').value;
        const responseMethod = document.querySelector('input[name="responseMethod"]:checked').value;
        
        // In a real app, this would send data to a server
        console.log('Modification request:', {
            type: requestType,
            details: requestDetails,
            responseMethod: responseMethod
        });
        
        // Show confirmation and hide modal
        alert('Your request has been sent to your health coach team. They will review it and respond within 24 hours.');
        hideModificationModal();
    }
    
    // Handle theme changes to update visualization
    function listenForThemeChanges() {
        // Create observer to watch for class changes on body
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    applyThemeToRoute();
                }
            });
        });
        
        // Start observing
        observer.observe(document.body, { attributes: true });
    }
    
    // Initialize navigation
    function initNavigation() {
        // Reuse existing navigation code
        if (window.initializeNavigation) {
            window.initializeNavigation();
        }
        
        // Set the active bottom nav button
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
    
    // Initialize the page
    init();
    
    // Listen for theme changes
    listenForThemeChanges();
}); 