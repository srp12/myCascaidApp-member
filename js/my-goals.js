/**
 * My Goals JavaScript
 * Handles timeline display, goal selection, and saving functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Element selectors for goals functionality
    const addNewGoalsButton = document.querySelector('.add-new-goals-button');
    const timelineContainer = document.querySelector('.timeline-container');
    
    // Sample user goals history - in a real app, this would come from a database
    const userGoalsHistory = [
        {
            id: 'goal-set-3',
            date: '2025-05-15T10:30:00Z',
            selectedGoals: [
                {
                    primary: 'weightLoss',
                    secondaries: ['healthyEating', 'reduceSugar', 'portionControl']
                },
                {
                    primary: 'stressManagement',
                    secondaries: ['meditation', 'deepBreathing']
                },
                {
                    primary: 'diabetesManagement',
                    secondaries: ['bloodSugarMonitoring', 'insulinAdherence']
                }
            ]
        },
        {
            id: 'goal-set-2',
            date: '2024-04-10T09:15:00Z',
            selectedGoals: [
                {
                    primary: 'fitness',
                    secondaries: ['cardiovascular', 'strengthTraining']
                },
                {
                    primary: 'mentalHealth',
                    secondaries: ['anxietyReduction', 'mindfulness']
                }
            ]
        },
        {
            id: 'goal-set-1',
            date: '2023-03-22T11:10:00Z',
            selectedGoals: [
                {
                    primary: 'bloodPressure',
                    secondaries: ['lowSodiumDiet', 'regularMonitoring']
                },
                {
                    primary: 'sleepQuality',
                    secondaries: ['sleepSchedule', 'sleepEnvironment']
                }
            ]
        }
    ];
    
    // Mapping of goal IDs to display names and descriptions
    const goalLabels = {
        // Primary goals
        'weightLoss': 'Weight Loss',
        'stressManagement': 'Stress Management',
        'diabetesManagement': 'Diabetes Management',
        'fitness': 'Fitness',
        'mentalHealth': 'Mental Health',
        'bloodPressure': 'Blood Pressure',
        'sleepQuality': 'Sleep Quality',
        
        // Secondary goals
        'healthyEating': 'Healthy Eating',
        'reduceSugar': 'Reduce Sugar Intake',
        'portionControl': 'Portion Control',
        'meditation': 'Meditation',
        'deepBreathing': 'Deep Breathing',
        'bloodSugarMonitoring': 'Blood Sugar Monitoring',
        'insulinAdherence': 'Insulin Adherence',
        'cardiovascular': 'Cardiovascular Exercise',
        'strengthTraining': 'Strength Training',
        'anxietyReduction': 'Anxiety Reduction',
        'mindfulness': 'Mindfulness',
        'lowSodiumDiet': 'Low Sodium Diet',
        'regularMonitoring': 'Regular BP Monitoring',
        'sleepSchedule': 'Consistent Sleep Schedule',
        'sleepEnvironment': 'Optimize Sleep Environment'
    };
    
    // Add event listeners for goals functionality
    if (addNewGoalsButton) {
        addNewGoalsButton.addEventListener('click', () => {
            // Navigate to the set-new-goals.html page
            window.location.href = 'set-new-goals.html';
        });
    }
    
    // Initialize the timeline view when the page loads
    initGoalsTimeline();
    
    // Function to initialize the goals timeline with historical data
    function initGoalsTimeline() {
        if (!timelineContainer) return;
        
        // Clear any existing content
        timelineContainer.innerHTML = '';
        
        // Check if we have any goals to display
        if (!userGoalsHistory || userGoalsHistory.length === 0) {
            timelineContainer.innerHTML = '<div class="empty-timeline-message">No health goals have been set yet. Click on "Set New Goals" to get started.</div>';
            return;
        }
        
        // Sort goals by date, newest first
        const sortedGoals = [...userGoalsHistory].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        // Group goals by month and year
        const goalsByPeriod = {};
        sortedGoals.forEach(goalEntry => {
            const date = new Date(goalEntry.date);
            const period = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            
            if (!goalsByPeriod[period]) {
                goalsByPeriod[period] = [];
            }
            goalsByPeriod[period].push(goalEntry);
        });
        
        // Generate HTML for each period
        Object.keys(goalsByPeriod).forEach(period => {
            const periodSection = document.createElement('div');
            periodSection.className = 'timeline-period';
            
            const periodHeader = document.createElement('div');
            periodHeader.className = 'period-header';
            
            const periodTitle = document.createElement('h4');
            periodTitle.textContent = period;
            periodHeader.appendChild(periodTitle);
            
            periodSection.appendChild(periodHeader);
            
            const periodGoals = document.createElement('div');
            periodGoals.className = 'period-goals';
            
            // Add each goal card to this period
            goalsByPeriod[period].forEach(goalEntry => {
                const goalCard = createGoalCard(goalEntry);
                periodGoals.appendChild(goalCard);
            });
            
            periodSection.appendChild(periodGoals);
            timelineContainer.appendChild(periodSection);
        });
    }
    
    // Create a goal card element for the timeline
    function createGoalCard(goalEntry) {
        const card = document.createElement('div');
        card.className = 'goal-card';
        card.setAttribute('data-goal-id', goalEntry.id);
        
        const date = new Date(goalEntry.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Create card header with date
        const cardHeader = document.createElement('div');
        cardHeader.className = 'goal-card-header';
        cardHeader.innerHTML = `<span class="goal-date">Set on ${formattedDate}</span>`;
        card.appendChild(cardHeader);
        
        // Create goal tags container
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'goal-tags-container';
        
        // Group goals by primary category
        goalEntry.selectedGoals.forEach(goalGroup => {
            const primaryCategory = document.createElement('div');
            primaryCategory.className = 'goal-category';
            
            const primaryLabel = document.createElement('div');
            primaryLabel.className = 'category-label';
            primaryLabel.textContent = goalLabels[goalGroup.primary] || goalGroup.primary;
            primaryCategory.appendChild(primaryLabel);
            
            // Create secondary goals section
            if (goalGroup.secondaries && goalGroup.secondaries.length > 0) {
                const secondaryContainer = document.createElement('div');
                secondaryContainer.className = 'goal-subcategory';
                
                const secondaryTags = document.createElement('div');
                secondaryTags.className = 'goal-tags';
                
                goalGroup.secondaries.forEach(secondaryGoal => {
                    const tag = document.createElement('span');
                    tag.className = 'goal-tag-small';
                    tag.setAttribute('data-primary', goalGroup.primary);
                    tag.textContent = goalLabels[secondaryGoal] || secondaryGoal;
                    secondaryTags.appendChild(tag);
                });
                
                secondaryContainer.appendChild(secondaryTags);
                primaryCategory.appendChild(secondaryContainer);
            }
            
            tagsContainer.appendChild(primaryCategory);
        });
        
        card.appendChild(tagsContainer);
        
        return card;
    }
    
    // Export functions that might be needed by other scripts
    window.myGoals = {
        userGoalsHistory,
        goalLabels,
        getLatestGoals: function() {
            if (userGoalsHistory && userGoalsHistory.length > 0) {
                // Sort by date and return the most recent
                const sortedGoals = [...userGoalsHistory].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                return sortedGoals[0];
            }
            return null;
        }
    };
}); 