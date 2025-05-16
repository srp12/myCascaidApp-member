/**
 * Set New Goals JavaScript
 * Handles goal selection, displaying related goals, and saving functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Element selectors
    const allGoalsContainer = document.querySelector('.all-goals-container');
    
    // Old selectors commented out as they are replaced by side tab specific ones
    // const selectedGoalsList_OLD = document.querySelector('.selected-goals-list'); 
    // const emptyState_OLD = document.querySelector('.empty-state'); 
    // const saveGoalsButton_OLD = document.querySelector('.save-goals-button'); 

    // New Side Tab Element Selectors
    const sideTab = document.getElementById('selected-goals-side-tab');
    const sideTabToggleButton = document.getElementById('side-tab-toggle-button');
    const sideTabCountBadge = document.getElementById('side-tab-count-badge');
    const sideTabContent = document.getElementById('side-tab-content');
    const sideTabSelectedGoalsList = sideTabContent.querySelector('.selected-goals-list'); 
    const sideTabEmptyState = sideTabContent.querySelector('.empty-state'); 
    const sideTabSaveGoalsButton = sideTabContent.querySelector('.save-goals-button'); 

    const searchInput = document.getElementById('search-goals-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const addNewGoalBtn = document.querySelector('.add-new-goal-btn');
    const addGoalModal = document.getElementById('add-goal-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelModalBtn = document.querySelector('.cancel-button');
    const addGoalForm = document.getElementById('add-goal-form');
    const newGoalTypeSelect = document.getElementById('new-goal-type');
    const primaryGoalSelectGroup = document.getElementById('primary-goal-select-group');
    const primaryGoalSelect = document.getElementById('primary-goal-select');
    const newGoalLabelInput = document.getElementById('new-goal-label');
    
    // Inline create elements
    const inlineCreateContainer = document.getElementById('inline-create-container');
    const createGoalText = document.getElementById('create-goal-text');
    const inlineCreatePrimaryBtn = document.getElementById('inline-create-primary');
    const inlineCreateSecondaryBtn = document.getElementById('inline-create-secondary');

    // Complete goal data with 30 primary goals and related secondary goals
    const goalsData = {
        // Weight Management Category
        'weightLoss': {
            label: 'Weight Loss',
            secondaries: [
                { id: 'healthyEating', label: 'Healthy Eating', 
                  related: [{ id: 'mealPlanning', label: 'Meal Planning' }, { id: 'nutritionTracking', label: 'Nutrition Tracking' }] },
                { id: 'reduceSugar', label: 'Reduce Sugar Intake', 
                  related: [{ id: 'sugarFreeSnacks', label: 'Sugar-Free Snacks' }, { id: 'readLabels', label: 'Read Food Labels' }] },
                { id: 'portionControl', label: 'Portion Control', 
                  related: [{ id: 'smallerPlates', label: 'Use Smaller Plates' }, { id: 'mindfulEating', label: 'Mindful Eating' }] }
            ]
        },
        'weightGain': {
            label: 'Weight Gain',
            secondaries: [
                { id: 'calorieIncrease', label: 'Calorie Increase', 
                  related: [{ id: 'proteinShakes', label: 'Protein Shakes' }, { id: 'nutrientDense', label: 'Nutrient-Dense Foods' }] },
                { id: 'muscleBuilding', label: 'Muscle Building', 
                  related: [{ id: 'resistanceTraining', label: 'Resistance Training' }, { id: 'proteinTiming', label: 'Protein Timing' }] },
                { id: 'healthySnacking', label: 'Healthy Snacking', 
                  related: [{ id: 'nutsMix', label: 'Nuts & Seeds Mix' }, { id: 'avocadoToast', label: 'Avocado Toast' }] }
            ]
        },
        'weightMaintenance': {
            label: 'Weight Maintenance',
            secondaries: [
                { id: 'balancedDiet', label: 'Balanced Diet', 
                  related: [{ id: 'macroBalance', label: 'Macro Balance' }, { id: 'mealFrequency', label: 'Meal Frequency' }] },
                { id: 'regularWeighing', label: 'Regular Weighing', 
                  related: [{ id: 'weeklyChecks', label: 'Weekly Check-ins' }, { id: 'bodyMeasurements', label: 'Body Measurements' }] },
                { id: 'activeLifestyle', label: 'Active Lifestyle', 
                  related: [{ id: 'dailySteps', label: 'Daily Steps Goal' }, { id: 'weeklyActivity', label: 'Weekly Activity Plan' }] }
            ]
        },
        
        // Fitness Category
        'cardioFitness': {
            label: 'Cardio Fitness',
            secondaries: [
                { id: 'running', label: 'Running', 
                  related: [{ id: 'c25k', label: 'Couch to 5K' }, { id: 'intervalRunning', label: 'Interval Running' }] },
                { id: 'cycling', label: 'Cycling', 
                  related: [{ id: 'indoorCycling', label: 'Indoor Cycling' }, { id: 'outdoorRides', label: 'Outdoor Rides' }] },
                { id: 'swimming', label: 'Swimming', 
                  related: [{ id: 'lapSwimming', label: 'Lap Swimming' }, { id: 'waterAerobics', label: 'Water Aerobics' }] }
            ]
        },
        'strengthTraining': {
            label: 'Strength Training',
            secondaries: [
                { id: 'weightLifting', label: 'Weight Lifting', 
                  related: [{ id: 'freeWeights', label: 'Free Weights' }, { id: 'machines', label: 'Machine Workouts' }] },
                { id: 'bodyweight', label: 'Bodyweight Exercises', 
                  related: [{ id: 'pushups', label: 'Push-up Progression' }, { id: 'coreStrength', label: 'Core Strength' }] },
                { id: 'functionalTraining', label: 'Functional Training', 
                  related: [{ id: 'kettlebells', label: 'Kettlebell Workouts' }, { id: 'circuitTraining', label: 'Circuit Training' }] }
            ]
        },
        'flexibility': {
            label: 'Flexibility',
            secondaries: [
                { id: 'yoga', label: 'Yoga Practice', 
                  related: [{ id: 'morningYoga', label: 'Morning Yoga' }, { id: 'restorative', label: 'Restorative Yoga' }] },
                { id: 'stretching', label: 'Daily Stretching', 
                  related: [{ id: 'dynamicStretches', label: 'Dynamic Stretches' }, { id: 'staticStretches', label: 'Static Stretches' }] },
                { id: 'mobility', label: 'Joint Mobility', 
                  related: [{ id: 'hipMobility', label: 'Hip Mobility' }, { id: 'shoulderMobility', label: 'Shoulder Mobility' }] }
            ]
        },
        
        // Diabetes Management
        'diabetesManagement': {
            label: 'Diabetes Management',
            secondaries: [
                { id: 'bloodSugarMonitoring', label: 'Blood Sugar Monitoring', 
                  related: [{ id: 'glucoseLogs', label: 'Glucose Logs' }, { id: 'testingSchedule', label: 'Testing Schedule' }] },
                { id: 'insulinAdherence', label: 'Insulin Adherence', 
                  related: [{ id: 'timingReminders', label: 'Timing Reminders' }, { id: 'doseTracking', label: 'Dose Tracking' }] },
                { id: 'diabeticDiet', label: 'Diabetic Diet Plan', 
                  related: [{ id: 'lowGIFoods', label: 'Low GI Foods' }, { id: 'carbohydrateCounting', label: 'Carb Counting' }] }
            ]
        },
        
        // Blood Pressure
        'bloodPressure': {
            label: 'Blood Pressure',
            secondaries: [
                { id: 'regularMonitoring', label: 'Regular BP Monitoring', 
                  related: [{ id: 'morningReadings', label: 'Morning Readings' }, { id: 'eveningReadings', label: 'Evening Readings' }] },
                { id: 'lowSodiumDiet', label: 'Low Sodium Diet', 
                  related: [{ id: 'noAddedSalt', label: 'No Added Salt' }, { id: 'freshIngredients', label: 'Fresh Ingredients' }] },
                { id: 'stressReduction', label: 'Stress Reduction', 
                  related: [{ id: 'breathingExercises', label: 'Breathing Exercises' }, { id: 'relaxationTechniques', label: 'Relaxation Techniques' }] }
            ]
        },
        
        // Mental Health
        'mentalHealth': {
            label: 'Mental Health',
            secondaries: [
                { id: 'anxietyReduction', label: 'Anxiety Reduction', 
                  related: [{ id: 'cognitiveTechniques', label: 'Cognitive Techniques' }, { id: 'journaling', label: 'Anxiety Journaling' }] },
                { id: 'depressionManagement', label: 'Depression Management', 
                  related: [{ id: 'behavioralActivation', label: 'Behavioral Activation' }, { id: 'supportGroups', label: 'Support Groups' }] },
                { id: 'mindfulness', label: 'Mindfulness Practice', 
                  related: [{ id: 'meditationSessions', label: 'Meditation Sessions' }, { id: 'presentAwareness', label: 'Present Awareness' }] }
            ]
        },
        
        // Stress Management
        'stressManagement': {
            label: 'Stress Management',
            secondaries: [
                { id: 'meditation', label: 'Meditation', 
                  related: [{ id: 'guidedMeditation', label: 'Guided Meditation' }, { id: 'silentMeditation', label: 'Silent Meditation' }] },
                { id: 'deepBreathing', label: 'Deep Breathing', 
                  related: [{ id: 'boxBreathing', label: 'Box Breathing' }, { id: 'diaphragmaticBreathing', label: 'Diaphragmatic Breathing' }] },
                { id: 'timeManagement', label: 'Time Management', 
                  related: [{ id: 'prioritization', label: 'Prioritization' }, { id: 'boundaries', label: 'Setting Boundaries' }] }
            ]
        },
        
        // Sleep Health
        'sleepQuality': {
            label: 'Sleep Quality',
            secondaries: [
                { id: 'sleepSchedule', label: 'Consistent Sleep Schedule', 
                  related: [{ id: 'bedtimeRoutine', label: 'Bedtime Routine' }, { id: 'wakeupTime', label: 'Consistent Wake Time' }] },
                { id: 'sleepEnvironment', label: 'Optimize Sleep Environment', 
                  related: [{ id: 'darkRoom', label: 'Dark Room' }, { id: 'temperatureControl', label: 'Temperature Control' }] },
                { id: 'reducingScreenTime', label: 'Reducing Screen Time', 
                  related: [{ id: 'blueLight', label: 'Blue Light Filters' }, { id: 'electronicCurfew', label: 'Electronic Curfew' }] }
            ]
        },
        
        // Nutrition
        'nutritionOptimization': {
            label: 'Nutrition Optimization',
            secondaries: [
                { id: 'mealPrepping', label: 'Meal Prepping', 
                  related: [{ id: 'batchCooking', label: 'Batch Cooking' }, { id: 'groceryPlanning', label: 'Grocery Planning' }] },
                { id: 'plantBasedFoods', label: 'Plant-Based Foods', 
                  related: [{ id: 'vegetableVariety', label: 'Vegetable Variety' }, { id: 'legumesIntake', label: 'Legumes Intake' }] },
                { id: 'proteinOptimization', label: 'Protein Optimization', 
                  related: [{ id: 'leanSources', label: 'Lean Protein Sources' }, { id: 'postWorkoutProtein', label: 'Post-Workout Protein' }] }
            ]
        },
        
        // Hydration
        'hydration': {
            label: 'Hydration',
            secondaries: [
                { id: 'dailyWaterIntake', label: 'Daily Water Intake', 
                  related: [{ id: 'morningHydration', label: 'Morning Hydration' }, { id: 'waterReminders', label: 'Water Reminders' }] },
                { id: 'electrolytesBalance', label: 'Electrolytes Balance', 
                  related: [{ id: 'homemadeDrinks', label: 'Homemade Electrolyte Drinks' }, { id: 'saltIntake', label: 'Salt Intake Monitoring' }] },
                { id: 'reducingSugaryDrinks', label: 'Reducing Sugary Drinks', 
                  related: [{ id: 'herbTeas', label: 'Herbal Teas' }, { id: 'infusedWater', label: 'Infused Water Recipes' }] }
            ]
        },
        
        // Heart Health
        'heartHealth': {
            label: 'Heart Health',
            secondaries: [
                { id: 'cardiovascularExercise', label: 'Cardiovascular Exercise', 
                  related: [{ id: 'moderateIntensity', label: 'Moderate Intensity Training' }, { id: 'zoneTraining', label: 'Heart Rate Zone Training' }] },
                { id: 'cholesterolManagement', label: 'Cholesterol Management', 
                  related: [{ id: 'healthyFats', label: 'Healthy Fats' }, { id: 'fiberIntake', label: 'Fiber Intake' }] },
                { id: 'stressReductionHeart', label: 'Stress Reduction for Heart', 
                  related: [{ id: 'relaxationBreaks', label: 'Relaxation Breaks' }, { id: 'heartRateVariability', label: 'Heart Rate Variability Training' }] }
            ]
        },
        
        // Joint Health
        'jointHealth': {
            label: 'Joint Health',
            secondaries: [
                { id: 'lowImpactExercise', label: 'Low-Impact Exercise', 
                  related: [{ id: 'swimming', label: 'Swimming' }, { id: 'ellipticalTraining', label: 'Elliptical Training' }] },
                { id: 'nutritionForJoints', label: 'Nutrition for Joints', 
                  related: [{ id: 'omega3', label: 'Omega-3 Fatty Acids' }, { id: 'antiInflammatoryFoods', label: 'Anti-Inflammatory Foods' }] },
                { id: 'jointMobility', label: 'Joint Mobility Exercises', 
                  related: [{ id: 'gentleStretching', label: 'Gentle Stretching' }, { id: 'rangeOfMotion', label: 'Range of Motion Exercises' }] }
            ]
        },
        
        // Bone Health
        'boneHealth': {
            label: 'Bone Health',
            secondaries: [
                { id: 'weightBearingExercise', label: 'Weight-Bearing Exercise', 
                  related: [{ id: 'walking', label: 'Regular Walking' }, { id: 'stairClimbing', label: 'Stair Climbing' }] },
                { id: 'calciumIntake', label: 'Calcium Intake', 
                  related: [{ id: 'dairySources', label: 'Dairy Sources' }, { id: 'nonDairySources', label: 'Non-Dairy Sources' }] },
                { id: 'vitaminD', label: 'Vitamin D Optimization', 
                  related: [{ id: 'sunExposure', label: 'Safe Sun Exposure' }, { id: 'supplements', label: 'Vitamin D Supplements' }] }
            ]
        },
        
        // Digestive Health
        'digestiveHealth': {
            label: 'Digestive Health',
            secondaries: [
                { id: 'fiberIntake', label: 'Fiber Intake', 
                  related: [{ id: 'solubleFiber', label: 'Soluble Fiber Foods' }, { id: 'insolubleFiber', label: 'Insoluble Fiber Foods' }] },
                { id: 'probiotics', label: 'Probiotics Consumption', 
                  related: [{ id: 'fermentedFoods', label: 'Fermented Foods' }, { id: 'probiotic', label: 'Probiotic Supplements' }] },
                { id: 'hydrationForDigestion', label: 'Hydration for Digestion', 
                  related: [{ id: 'warmWater', label: 'Warm Water with Lemon' }, { id: 'herbalTeas', label: 'Digestive Herbal Teas' }] }
            ]
        },
        
        // Immune System Support
        'immuneSupport': {
            label: 'Immune System Support',
            secondaries: [
                { id: 'vitaminC', label: 'Vitamin C Intake', 
                  related: [{ id: 'citrousFruits', label: 'Citrous Fruits' }, { id: 'vitaminCSupplements', label: 'Vitamin C Supplements' }] },
                { id: 'adequateSleep', label: 'Adequate Sleep', 
                  related: [{ id: 'sleepDuration', label: '7-9 Hours Sleep' }, { id: 'sleepQuality', label: 'Deep Sleep Quality' }] },
                { id: 'stressManagementImmune', label: 'Stress Management', 
                  related: [{ id: 'adaptogenHerbs', label: 'Adaptogen Herbs' }, { id: 'relaxationPractices', label: 'Daily Relaxation Practices' }] }
            ]
        },
        
        // Brain Health
        'brainHealth': {
            label: 'Brain Health',
            secondaries: [
                { id: 'cognitiveExercises', label: 'Cognitive Exercises', 
                  related: [{ id: 'puzzles', label: 'Puzzles & Games' }, { id: 'learningNewSkills', label: 'Learning New Skills' }] },
                { id: 'brainFoods', label: 'Brain-Boosting Foods', 
                  related: [{ id: 'omega3Foods', label: 'Omega-3 Rich Foods' }, { id: 'antioxidants', label: 'Antioxidant Foods' }] },
                { id: 'qualitySleep', label: 'Quality Sleep', 
                  related: [{ id: 'remSleep', label: 'REM Sleep Optimization' }, { id: 'sleepContinuity', label: 'Sleep Continuity' }] }
            ]
        },
        
        // Energy Levels
        'energyLevels': {
            label: 'Energy Levels',
            secondaries: [
                { id: 'steadyBloodSugar', label: 'Steady Blood Sugar', 
                  related: [{ id: 'balancedMeals', label: 'Balanced Meals' }, { id: 'regularEating', label: 'Regular Eating Schedule' }] },
                { id: 'ironIntake', label: 'Iron Intake', 
                  related: [{ id: 'ironRichFoods', label: 'Iron-Rich Foods' }, { id: 'vitaminCCombination', label: 'Vitamin C Combination' }] },
                { id: 'hydrationForEnergy', label: 'Hydration for Energy', 
                  related: [{ id: 'morningWater', label: 'Morning Water Ritual' }, { id: 'dehydrationPrevention', label: 'Dehydration Prevention' }] }
            ]
        },
        
        // Vision Health
        'visionHealth': {
            label: 'Vision Health',
            secondaries: [
                { id: 'eyeExercises', label: 'Eye Exercises', 
                  related: [{ id: '2020Rule', label: '20-20-20 Rule' }, { id: 'focusChanges', label: 'Focus Change Exercises' }] },
                { id: 'nutritionForEyes', label: 'Nutrition for Eyes', 
                  related: [{ id: 'luteinFoods', label: 'Lutein-Rich Foods' }, { id: 'vitaminAFoods', label: 'Vitamin A Foods' }] },
                { id: 'screenTimeManagement', label: 'Screen Time Management', 
                  related: [{ id: 'bluelightFilters', label: 'Blue Light Filters' }, { id: 'properLighting', label: 'Proper Lighting' }] }
            ]
        },
        
        // Oral Health
        'oralHealth': {
            label: 'Oral Health',
            secondaries: [
                { id: 'thoroughBrushing', label: 'Thorough Brushing', 
                  related: [{ id: 'properTechnique', label: 'Proper Technique' }, { id: 'tongueClean', label: 'Tongue Cleaning' }] },
                { id: 'flossing', label: 'Daily Flossing', 
                  related: [{ id: 'flossPicks', label: 'Floss Picks' }, { id: 'waterFlossers', label: 'Water Flossers' }] },
                { id: 'reducingSugaryFoods', label: 'Reducing Sugary Foods', 
                  related: [{ id: 'xylitolGum', label: 'Xylitol Gum' }, { id: 'waterAfterMeals', label: 'Water After Meals' }] }
            ]
        },
        
        // Respiratory Health
        'respiratoryHealth': {
            label: 'Respiratory Health',
            secondaries: [
                { id: 'deepBreathingExercises', label: 'Deep Breathing Exercises', 
                  related: [{ id: 'pranayama', label: 'Pranayama Practice' }, { id: 'pursedLipBreathing', label: 'Pursed Lip Breathing' }] },
                { id: 'allergenControl', label: 'Allergen Control', 
                  related: [{ id: 'airPurifiers', label: 'Air Purifiers' }, { id: 'dustMiteCovers', label: 'Dust Mite Covers' }] },
                { id: 'cardioForLungs', label: 'Cardio for Lung Health', 
                  related: [{ id: 'gradualIntensity', label: 'Gradual Intensity Increase' }, { id: 'outdoorExercise', label: 'Outdoor Exercise' }] }
            ]
        },
        
        // Skin Health
        'skinHealth': {
            label: 'Skin Health',
            secondaries: [
                { id: 'skinHydration', label: 'Skin Hydration', 
                  related: [{ id: 'drinkingWater', label: 'Adequate Water Intake' }, { id: 'moisturizing', label: 'Daily Moisturizing' }] },
                { id: 'sunProtection', label: 'Sun Protection', 
                  related: [{ id: 'dailySunscreen', label: 'Daily Sunscreen' }, { id: 'protectiveClothing', label: 'Protective Clothing' }] },
                { id: 'antioxidantRichDiet', label: 'Antioxidant-Rich Diet', 
                  related: [{ id: 'colorfulVegetables', label: 'Colorful Vegetables' }, { id: 'berries', label: 'Berry Consumption' }] }
            ]
        },
        
        // Posture Improvement
        'postureImprovement': {
            label: 'Posture Improvement',
            secondaries: [
                { id: 'coreStrengthening', label: 'Core Strengthening', 
                  related: [{ id: 'plankExercises', label: 'Plank Exercises' }, { id: 'pilates', label: 'Pilates Practice' }] },
                { id: 'deskErgonomics', label: 'Desk Ergonomics', 
                  related: [{ id: 'chairHeight', label: 'Proper Chair Height' }, { id: 'monitorPosition', label: 'Monitor Position' }] },
                { id: 'postureAwareness', label: 'Posture Awareness', 
                  related: [{ id: 'postureCues', label: 'Posture Reminder Cues' }, { id: 'postureApps', label: 'Posture Apps' }] }
            ]
        },
        
        // Chronic Pain Management
        'painManagement': {
            label: 'Pain Management',
            secondaries: [
                { id: 'stretching', label: 'Regular Stretching', 
                  related: [{ id: 'gentleYoga', label: 'Gentle Yoga' }, { id: 'fasciaRelease', label: 'Fascia Release' }] },
                { id: 'heatAndCold', label: 'Heat and Cold Therapy', 
                  related: [{ id: 'heatPads', label: 'Heat Pads' }, { id: 'icePacks', label: 'Ice Pack Application' }] },
                { id: 'stressReductionForPain', label: 'Stress Reduction', 
                  related: [{ id: 'relaxationForPain', label: 'Relaxation Techniques' }, { id: 'mindfulnessForPain', label: 'Mindfulness for Pain' }] }
            ]
        },
        
        // Physical Recovery
        'physicalRecovery': {
            label: 'Physical Recovery',
            secondaries: [
                { id: 'adequateRest', label: 'Adequate Rest Periods', 
                  related: [{ id: 'deloadWeeks', label: 'Deload Weeks' }, { id: 'activeSleep', label: 'Active Sleep Prioritization' }] },
                { id: 'nutrition', label: 'Recovery Nutrition', 
                  related: [{ id: 'proteinTiming', label: 'Protein Timing' }, { id: 'antiInflammatoryDiet', label: 'Anti-Inflammatory Diet' }] },
                { id: 'mobilityWork', label: 'Mobility Work', 
                  related: [{ id: 'foamRolling', label: 'Foam Rolling' }, { id: 'dynamicStretching', label: 'Dynamic Stretching' }] }
            ]
        },
        
        // Balance & Coordination
        'balance': {
            label: 'Balance & Coordination',
            secondaries: [
                { id: 'balanceExercises', label: 'Balance Exercises', 
                  related: [{ id: 'singleLegStands', label: 'Single Leg Stands' }, { id: 'stabilityBall', label: 'Stability Ball Work' }] },
                { id: 'proprioceptionTraining', label: 'Proprioception Training', 
                  related: [{ id: 'unstableSurfaces', label: 'Unstable Surface Training' }, { id: 'eyesClosed', label: 'Eyes-Closed Exercises' }] },
                { id: 'taichi', label: 'Tai Chi Practice', 
                  related: [{ id: 'slowMovements', label: 'Slow Movement Practice' }, { id: 'flowSequences', label: 'Flow Sequences' }] }
            ]
        },
        
        // Habit Formation
        'habitFormation': {
            label: 'Habit Formation',
            secondaries: [
                { id: 'habitStacking', label: 'Habit Stacking', 
                  related: [{ id: 'existingRoutines', label: 'Link to Existing Routines' }, { id: 'tinyHabits', label: 'Tiny Habits Method' }] },
                { id: 'environmentalCues', label: 'Environmental Cues', 
                  related: [{ id: 'visualReminders', label: 'Visual Reminders' }, { id: 'triggerPlanning', label: 'Trigger Planning' }] },
                { id: 'habitTracking', label: 'Habit Tracking', 
                  related: [{ id: 'journalTracking', label: 'Journal Tracking' }, { id: 'appTracking', label: 'App-Based Tracking' }] }
            ]
        },
        
        // Social Connection
        'socialConnection': {
            label: 'Social Connection',
            secondaries: [
                { id: 'regularCalls', label: 'Regular Calls with Loved Ones', 
                  related: [{ id: 'weeklySchedule', label: 'Weekly Call Schedule' }, { id: 'videoChats', label: 'Video Chat Setup' }] },
                { id: 'communityGroups', label: 'Community Groups', 
                  related: [{ id: 'interestGroups', label: 'Shared Interest Groups' }, { id: 'volunteerWork', label: 'Volunteer Opportunities' }] },
                { id: 'meaningfulConversations', label: 'Meaningful Conversations', 
                  related: [{ id: 'deepQuestions', label: 'Deep Question Prompts' }, { id: 'activeListening', label: 'Active Listening Practice' }] }
            ]
        }
    };
    
    // Selected goals tracking
    let selectedGoals = [];
    
    // Check if we can load goals from a previous session
    // Try to get the latest goal set from the myGoals object if it exists
    let latestGoals = null;
    if (window.myGoals && typeof window.myGoals.getLatestGoals === 'function') {
        latestGoals = window.myGoals.getLatestGoals();
        
        if (latestGoals) {
            // Pre-populate with the goals from the latest set (May 2025)
            latestGoals.selectedGoals.forEach(goalGroup => {
                // Add primary goal
                const primaryGoal = {
                    id: goalGroup.primary,
                    label: goalsData[goalGroup.primary]?.label || goalGroup.primary,
                    type: 'primary'
                };
                
                // Add secondary goals
                if (goalGroup.secondaries && goalGroup.secondaries.length > 0) {
                    goalGroup.secondaries.forEach(secondaryId => {
                        // Find the secondary goal details 
                        const secondaryGoal = goalsData[goalGroup.primary]?.secondaries
                            .find(sg => sg.id === secondaryId);
                        
                        if (secondaryGoal) {
                            selectedGoals.push({
                                id: secondaryId,
                                label: secondaryGoal.label,
                                type: 'secondary',
                                primaryId: goalGroup.primary
                            });
                        }
                    });
                }
                
                // Add the primary goal after all secondaries have been added
                selectedGoals.push(primaryGoal);
            });
        }
    }
    
    // Initialize the goals display
    initializeGoals();
    setupSearchFunctionality();
    setupModalHandlers();
    setupInlineCreateFunctionality();
    setupSideTabInteractions();
    
    // Function to initialize the goals display
    function initializeGoals() {
        if (!allGoalsContainer) return;
        
        // Create and append all primary goals
        const primaryGoalsWrapper = document.createElement('div');
        primaryGoalsWrapper.className = 'goal-bubbles primary-goals';
        
        // Sort alphabetically for better organization
        const sortedGoalKeys = Object.keys(goalsData).sort((a, b) => 
            goalsData[a].label.localeCompare(goalsData[b].label)
        );
        
        sortedGoalKeys.forEach(goalId => {
            const goalData = goalsData[goalId];
            
            // Create a wrapper for the primary goal and its secondary goals
            const primaryWithSecondaries = document.createElement('div');
            primaryWithSecondaries.className = 'primary-with-secondaries';
            primaryWithSecondaries.setAttribute('data-primary-id', goalId);
            
            const goalBubble = document.createElement('div');
            goalBubble.className = 'goal-bubble primary';
            goalBubble.setAttribute('data-goal-id', goalId);
            goalBubble.textContent = goalData.label;
            
            // Check if this goal is pre-selected
            if (selectedGoals.some(g => g.id === goalId && g.type === 'primary')) {
                goalBubble.classList.add('selected');
            }
            
            // Add click event
            goalBubble.addEventListener('click', function() {
                toggleGoalSelection(this, 'primary');
            });
            
            primaryWithSecondaries.appendChild(goalBubble);
            
            // If this goal is pre-selected, create its related goals section
            if (goalBubble.classList.contains('selected')) {
                createRelatedGoalsSection(goalId, goalData, primaryWithSecondaries);
            }
            
            primaryGoalsWrapper.appendChild(primaryWithSecondaries);
        });
        
        allGoalsContainer.appendChild(primaryGoalsWrapper);
        
        // Update the selected goals display
        updateSelectedGoalsDisplay();
        
        // Populate primary goal select for the add new goal modal
        populatePrimaryGoalSelect();
    }
    
    // Function to create and display related goals section dynamically
    function createRelatedGoalsSection(primaryGoalId, primaryGoalData, container) {
        // Remove any existing related section
        const existingSection = container.querySelector('.related-goals-section');
        if (existingSection) existingSection.remove();
        
        if (!primaryGoalData.secondaries || primaryGoalData.secondaries.length === 0) return;
        
        // Create related goals section that will appear next to or below the primary goal
        const relatedSection = document.createElement('div');
        relatedSection.className = 'related-goals-section';
        relatedSection.setAttribute('data-primary', primaryGoalId);
        
        // Get the color class based on the index
        const colorIndex = (Array.from(document.querySelectorAll('.goal-bubble.primary')).findIndex(el => 
            el.getAttribute('data-goal-id') === primaryGoalId
        ) % 5) + 1;
        
        const colorClass = `primary-color-${colorIndex}`;
        
        primaryGoalData.secondaries.forEach(secondaryGoal => {
            const goalBubble = document.createElement('div');
            goalBubble.className = `goal-bubble secondary ${colorClass}`;
            goalBubble.setAttribute('data-goal-id', secondaryGoal.id);
            goalBubble.setAttribute('data-primary-id', primaryGoalId);
            goalBubble.textContent = secondaryGoal.label;
            
            // Check if this secondary goal is pre-selected
            if (selectedGoals.some(g => g.id === secondaryGoal.id && g.type === 'secondary' && g.primaryId === primaryGoalId)) {
                goalBubble.classList.add('selected');
            }
            
            // Add click event
            goalBubble.addEventListener('click', function() {
                toggleGoalSelection(this, 'secondary');
            });
            
            relatedSection.appendChild(goalBubble);
        });
        
        container.appendChild(relatedSection);
    }
    
    // Function to toggle goal selection
    function toggleGoalSelection(goalElement, goalType) {
        const goalId = goalElement.getAttribute('data-goal-id');
        const isSelected = goalElement.classList.toggle('selected');
        
        if (goalType === 'primary') {
            const primaryGoalData = goalsData[goalId];
            const container = goalElement.closest('.primary-with-secondaries');
            
            if (isSelected) {
                selectedGoals.push({
                    id: goalId,
                    label: primaryGoalData.label,
                    type: 'primary'
                });
                createRelatedGoalsSection(goalId, primaryGoalData, container);
            } else { // Primary goal is being deselected
                // Remove this primary goal from selected goals
                selectedGoals = selectedGoals.filter(g => !(g.id === goalId && g.type === 'primary'));
                
                // Check if any of its secondary goals are still selected
                const hasSelectedSecondaries = selectedGoals.some(g => g.type === 'secondary' && g.primaryId === goalId);
                
                if (!hasSelectedSecondaries) {
                    // Only remove related goals section if no secondaries of this primary are selected
                    const relatedSection = container.querySelector('.related-goals-section');
                    if (relatedSection) relatedSection.remove();
                }
                // Secondary goals of this primary are NOT automatically deselected from the 'selectedGoals' array.
                // Their visual state (selected class on bubble) is also preserved.
            }
        } else if (goalType === 'secondary') {
            const primaryId = goalElement.getAttribute('data-primary-id');
            const secondaryId = goalId;
            
            // Find this secondary goal in the goalsData to get the label
            const primaryGoalData = goalsData[primaryId];
            const secondaryGoal = primaryGoalData?.secondaries.find(sg => sg.id === secondaryId);
            
            if (!secondaryGoal) return;
            
            if (isSelected) {
                // Add secondary goal to selected goals
                selectedGoals.push({
                    id: secondaryId,
                    label: secondaryGoal.label,
                    type: 'secondary',
                    primaryId: primaryId
                });
            } else {
                // Remove this secondary goal from selected goals
                selectedGoals = selectedGoals.filter(g => 
                    !(g.id === secondaryId && g.type === 'secondary' && g.primaryId === primaryId)
                );
            }
        }
        
        // Update the selected goals display
        updateSelectedGoalsDisplay();
    }
    
    // Update the selected goals display
    function updateSelectedGoalsDisplay() {
        if (!sideTabSelectedGoalsList || !sideTabEmptyState || !sideTabSaveGoalsButton || !sideTabCountBadge) return;
        
        sideTabSelectedGoalsList.innerHTML = ''; // Clear the current list in the side tab
        
        sideTabCountBadge.textContent = selectedGoals.length;
        sideTabCountBadge.classList.toggle('hidden', selectedGoals.length === 0);

        if (selectedGoals.length === 0) {
            sideTabEmptyState.style.display = 'block';
            sideTabSaveGoalsButton.disabled = true;
        } else {
            sideTabEmptyState.style.display = 'none';
            sideTabSaveGoalsButton.disabled = false;
            
            // Get all unique primary IDs from the selectedGoals (either directly or from secondary goals' primaryId)
            const allPrimaryIdsInvolved = [...new Set(selectedGoals.map(g => g.type === 'primary' ? g.id : g.primaryId))];

            // Sort these primary IDs based on their label in goalsData for consistent ordering
            allPrimaryIdsInvolved.sort((idA, idB) => {
                const labelA = goalsData[idA]?.label || idA; // Use ID as fallback for custom goals not yet in goalsData
                const labelB = goalsData[idB]?.label || idB;
                return labelA.localeCompare(labelB);
            });

            allPrimaryIdsInvolved.forEach(primaryId => {
                // Check if the primary goal itself is selected
                const primaryGoalIsSelected = selectedGoals.find(g => g.id === primaryId && g.type === 'primary');
                
                if (primaryGoalIsSelected) {
                    const primaryItem = createSelectedGoalItem(primaryGoalIsSelected);
                    sideTabSelectedGoalsList.appendChild(primaryItem);
                }
                
                // Find and add all selected secondary goals for this primary concept
                const secondaryGoalsForThisPrimary = selectedGoals.filter(g => 
                    g.type === 'secondary' && g.primaryId === primaryId
                );
                
                secondaryGoalsForThisPrimary.sort((a, b) => a.label.localeCompare(b.label));
                
                secondaryGoalsForThisPrimary.forEach(secondaryGoal => {
                    const secondaryItem = createSelectedGoalItem(secondaryGoal);
                    sideTabSelectedGoalsList.appendChild(secondaryItem);
                });
            });
        }
    }
    
    // Create a selected goal display item
    function createSelectedGoalItem(goal) {
        const item = document.createElement('div');
        item.className = 'selected-goal-item';
        
        // Add color class based on primary goal
        let colorClass = '';
        if (goal.type === 'primary') {
            // Get the index of the primary goal
            const primaryIndex = Object.keys(goalsData).indexOf(goal.id);
            colorClass = `primary-color-${(primaryIndex % 5) + 1}`;
        } else if (goal.type === 'secondary') {
            // Get the index of the parent primary goal
            const primaryIndex = Object.keys(goalsData).indexOf(goal.primaryId);
            colorClass = `primary-color-${(primaryIndex % 5) + 1}`;
        }
        
        if (colorClass) {
            item.classList.add(colorClass);
        }
        
        // Create goal text
        let goalText = '';
        if (goal.type === 'secondary') {
            // For secondary, show primary > secondary
            const primaryLabel = goalsData[goal.primaryId]?.label || goal.primaryId;
            goalText = `${primaryLabel} > ${goal.label}`;
        } else {
            // Just show the primary goal name
            goalText = goal.label;
        }
        
        const span = document.createElement('span');
        span.textContent = goalText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-goal-btn';
        removeButton.innerHTML = '×';
        removeButton.setAttribute('aria-label', 'Remove goal');
        
        // Set button attributes for identifying the goal to remove
        removeButton.setAttribute('data-goal-id', goal.id);
        removeButton.setAttribute('data-goal-type', goal.type);
        if (goal.primaryId) {
            removeButton.setAttribute('data-primary-id', goal.primaryId);
        }
        
        // Add click event
        removeButton.addEventListener('click', function() {
            removeGoal(this);
        });
        
        // Append elements to the item
        item.appendChild(span);
        item.appendChild(removeButton);
        
        return item;
    }
    
    // Remove a goal
    function removeGoal(removeButton) {
        const goalId = removeButton.getAttribute('data-goal-id');
        const goalType = removeButton.getAttribute('data-goal-type');
        const primaryId = removeButton.getAttribute('data-primary-id');
        
        // Find and update UI elements 
        if (goalType === 'primary') {
            // Deselect the primary goal bubble
            const primaryBubble = document.querySelector(`.goal-bubble.primary[data-goal-id="${goalId}"]`);
            if (primaryBubble && primaryBubble.classList.contains('selected')) {
                // Use the click handler to ensure related UI is updated
                primaryBubble.click();
            }
        } else if (goalType === 'secondary') {
            // Deselect the secondary goal bubble
            const secondaryBubble = document.querySelector(`.goal-bubble.secondary[data-goal-id="${goalId}"][data-primary-id="${primaryId}"]`);
            if (secondaryBubble && secondaryBubble.classList.contains('selected')) {
                // Use the click handler
                secondaryBubble.click();
            }
        }
        
        // Filter this goal out of selectedGoals
        if (goalType === 'primary') {
            // Remove primary goal and all its secondaries 
            selectedGoals = selectedGoals.filter(g => !(g.id === goalId && g.type === 'primary'));
            selectedGoals = selectedGoals.filter(g => !(g.type === 'secondary' && g.primaryId === goalId));
            
            // Also deselect related secondary bubbles if any were selected directly
            const primaryGoalData = goalsData[goalId];
            if (primaryGoalData && primaryGoalData.secondaries) {
                primaryGoalData.secondaries.forEach(secGoal => {
                    const secondaryBubble = document.querySelector(`.goal-bubble.secondary[data-goal-id="${secGoal.id}"][data-primary-id="${goalId}"]`);
                    if (secondaryBubble && secondaryBubble.classList.contains('selected')) {
                        secondaryBubble.classList.remove('selected');
                    }
                });
            }
        } else if (goalType === 'secondary') {
            // Only remove the specific secondary goal
            selectedGoals = selectedGoals.filter(g => 
                !(g.id === goalId && g.type === 'secondary' && g.primaryId === primaryId)
            );
        }
        
        // Update the displayed goals 
        updateSelectedGoalsDisplay();
    }
    
    // Setup search functionality
    function setupSearchFunctionality() {
        if (!searchInput || !clearSearchBtn) return;
        
        // Show clear button when there's text
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                clearSearchBtn.style.display = 'block';
                performSearch(this.value);
            } else {
                clearSearchBtn.style.display = 'none';
                clearSearch();
                hideInlineCreateOption();
            }
        });
        
        // Clear search when the clear button is clicked
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            clearSearch();
            hideInlineCreateOption();
            searchInput.focus();
        });
        
        // Hide inline create when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-goals-bar') && !event.target.closest('.inline-create-container')) {
                hideInlineCreateOption();
            }
        });
    }
    
    // Setup inline create functionality
    function setupInlineCreateFunctionality() {
        if (!inlineCreateContainer || !inlineCreatePrimaryBtn || !inlineCreateSecondaryBtn) return;
        
        // Create as primary goal
        inlineCreatePrimaryBtn.addEventListener('click', function() {
            const goalName = createGoalText.textContent.trim();
            if (goalName) {
                createInlineGoal(goalName, 'primary');
            }
        });
        
        // Create as secondary goal
        inlineCreateSecondaryBtn.addEventListener('click', function() {
            const goalName = createGoalText.textContent.trim();
            if (goalName) {
                // Open the modal for creating a secondary goal
                openSecondaryGoalModal(goalName);
            }
        });
    }
    
    // Create a goal directly from the inline search
    function createInlineGoal(goalName, goalType) {
        if (goalType === 'primary') {
            // Generate a unique ID for the new primary goal
            const goalId = 'custom-' + Date.now();
            
            // Add to goalsData
            goalsData[goalId] = {
                label: goalName,
                secondaries: []
            };
            
            // Create a new primary goal bubble
            const primaryWithSecondaries = document.createElement('div');
            primaryWithSecondaries.className = 'primary-with-secondaries';
            primaryWithSecondaries.setAttribute('data-primary-id', goalId);
            
            const goalBubble = document.createElement('div');
            goalBubble.className = 'goal-bubble primary';
            goalBubble.setAttribute('data-goal-id', goalId);
            goalBubble.textContent = goalName;
            
            // Add click event
            goalBubble.addEventListener('click', function() {
                toggleGoalSelection(this, 'primary');
            });
            
            primaryWithSecondaries.appendChild(goalBubble);
            
            // Append to the container
            const primaryGoalsWrapper = document.querySelector('.goal-bubbles.primary-goals');
            if (primaryGoalsWrapper) {
                primaryGoalsWrapper.appendChild(primaryWithSecondaries);
            }
            
            // Auto-select the new goal
            goalBubble.click();
            
            // Update primary goal select in the modal
            populatePrimaryGoalSelect();
            
            // Clear search and hide inline create
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            clearSearch();
            hideInlineCreateOption();
        }
    }
    
    // Open the modal specifically for creating a secondary goal
    function openSecondaryGoalModal(goalName) {
        if (!addGoalModal || !newGoalTypeSelect || !newGoalLabelInput) return;
        
        // Set up the modal for secondary goal creation
        addGoalModal.style.display = 'block';
        newGoalTypeSelect.value = 'secondary';
        primaryGoalSelectGroup.style.display = 'block';
        newGoalLabelInput.value = goalName;
        
        // Clear search and hide inline create
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        clearSearch();
        hideInlineCreateOption();
    }
    
    // Perform search on goals
    function performSearch(query) {
        query = query.toLowerCase().trim();
        
        // If empty query, clear search results
        if (!query) {
            clearSearch();
            hideInlineCreateOption();
            return;
        }
        
        let hasResults = false;
        
        // Search in primary goals
        const primaryBubbles = document.querySelectorAll('.goal-bubble.primary');
        primaryBubbles.forEach(bubble => {
            const goalId = bubble.getAttribute('data-goal-id');
            const goalLabel = bubble.textContent.toLowerCase();
            const matchesSearch = goalLabel.includes(query);
            
            if (matchesSearch) {
                hasResults = true;
                bubble.classList.remove('hidden-search');
                highlightMatchText(bubble, query);
                
                // Also show the parent container
                const container = bubble.closest('.primary-with-secondaries');
                if (container) container.style.display = 'flex';
            } else {
                // Check if any of its secondary goals match
                const secondaryMatches = goalsData[goalId]?.secondaries.some(sg => 
                    sg.label.toLowerCase().includes(query)
                );
                
                if (secondaryMatches) {
                    hasResults = true;
                    bubble.classList.remove('hidden-search');
                    
                    // Also show the parent container
                    const container = bubble.closest('.primary-with-secondaries');
                    if (container) container.style.display = 'flex';
                    
                    // If not already selected, select it to show secondary goals
                    if (!bubble.classList.contains('selected')) {
                        bubble.click();
                    }
                } else {
                    bubble.classList.add('hidden-search');
                    
                    // Hide the parent container if primary doesn't match and has no matching secondaries
                    const container = bubble.closest('.primary-with-secondaries');
                    if (container) container.style.display = 'none';
                }
            }
        });
        
        // Search in secondary goals
        const secondaryBubbles = document.querySelectorAll('.goal-bubble.secondary');
        secondaryBubbles.forEach(bubble => {
            const goalLabel = bubble.textContent.toLowerCase();
            const matchesSearch = goalLabel.includes(query);
            
            if (matchesSearch) {
                hasResults = true;
                bubble.classList.remove('hidden-search');
                highlightMatchText(bubble, query);
                
                // Make sure the parent primary is visible
                const primaryId = bubble.getAttribute('data-primary-id');
                const primaryBubble = document.querySelector(`.goal-bubble.primary[data-goal-id="${primaryId}"]`);
                if (primaryBubble) {
                    primaryBubble.classList.remove('hidden-search');
                    const container = primaryBubble.closest('.primary-with-secondaries');
                    if (container) container.style.display = 'flex';
                }
            } else {
                bubble.classList.add('hidden-search');
            }
        });
        
        // Show no results message if needed
        const noResultsMessage = document.querySelector('.no-results-message');
        if (!hasResults) {
            // Create no results message if it doesn't exist
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.textContent = `No goals found for "${query}". Try a different search term or use the options below to create a new goal.`;
                allGoalsContainer.appendChild(message);
            }
            
            // Show inline creation option since we have no results
            showInlineCreateOption(query);
        } else {
            // Remove no results message if it exists
            if (noResultsMessage) noResultsMessage.remove();
            
            // Hide inline creation option if we have results
            hideInlineCreateOption();
        }
    }
    
    // Show the inline create option with the search term
    function showInlineCreateOption(searchTerm) {
        if (!inlineCreateContainer || !createGoalText) return;
        
        createGoalText.textContent = searchTerm;
        inlineCreateContainer.style.display = 'block';
    }
    
    // Hide the inline create option
    function hideInlineCreateOption() {
        if (inlineCreateContainer) {
            inlineCreateContainer.style.display = 'none';
        }
    }
    
    // Clear search results and restore original display
    function clearSearch() {
        // Remove any no-results message
        const noResultsMessage = document.querySelector('.no-results-message');
        if (noResultsMessage) noResultsMessage.remove();
        
        // Show all primary goals again
        const primaryBubbles = document.querySelectorAll('.goal-bubble.primary');
        primaryBubbles.forEach(bubble => {
            bubble.classList.remove('hidden-search');
            removeHighlighting(bubble);
            
            // Show the parent container
            const container = bubble.closest('.primary-with-secondaries');
            if (container) container.style.display = 'flex';
        });
        
        // Show all visible secondary goals
        const secondaryBubbles = document.querySelectorAll('.goal-bubble.secondary');
        secondaryBubbles.forEach(bubble => {
            bubble.classList.remove('hidden-search');
            removeHighlighting(bubble);
        });
    }
    
    // Highlight the matching text in an element
    function highlightMatchText(element, query) {
        const originalText = element.textContent;
        const lowerText = originalText.toLowerCase();
        const index = lowerText.indexOf(query.toLowerCase());
        
        if (index >= 0) {
            const before = originalText.substring(0, index);
            const match = originalText.substring(index, index + query.length);
            const after = originalText.substring(index + query.length);
            
            element.innerHTML = `${before}<span class="search-highlight">${match}</span>${after}`;
        }
    }
    
    // Remove highlighting from an element
    function removeHighlighting(element) {
        const originalText = element.textContent;
        element.innerHTML = originalText;
    }
    
    // Setup modal handlers for adding new goals
    function setupModalHandlers() {
        if (!addNewGoalBtn || !addGoalModal || !closeModalBtn || !addGoalForm || !newGoalTypeSelect) return;
        
        // Show modal when add button is clicked
        addNewGoalBtn.addEventListener('click', function() {
            addGoalModal.style.display = 'block';
            // Reset the form
            addGoalForm.reset();
            primaryGoalSelectGroup.style.display = 'none';
            newGoalLabelInput.focus();
        });
        
        // Close modal when close button is clicked
        closeModalBtn.addEventListener('click', function() {
            closeAddGoalModal();
        });
        
        // Close modal when cancel button is clicked
        if (cancelModalBtn) {
            cancelModalBtn.addEventListener('click', function() {
                closeAddGoalModal();
            });
        }
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === addGoalModal) {
                closeAddGoalModal();
            }
        });
        
        // Show/hide primary goal select based on goal type
        newGoalTypeSelect.addEventListener('change', function() {
            if (this.value === 'secondary') {
                primaryGoalSelectGroup.style.display = 'block';
            } else {
                primaryGoalSelectGroup.style.display = 'none';
            }
        });
        
        // Handle form submission
        addGoalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addCustomGoal();
        });
    }
    
    // Close the add goal modal
    function closeAddGoalModal() {
        if (addGoalModal) {
            addGoalModal.style.display = 'none';
            
            // Reset the form
            if (addGoalForm) {
                addGoalForm.reset();
            }
            
            // Hide the primary goal select
            if (primaryGoalSelectGroup) {
                primaryGoalSelectGroup.style.display = 'none';
            }
        }
    }
    
    // Populate the primary goal select in the add new goal modal
    function populatePrimaryGoalSelect() {
        if (!primaryGoalSelect) return;
        
        // Clear existing options
        primaryGoalSelect.innerHTML = '';
        
        // Sort primary goals alphabetically
        const sortedGoalKeys = Object.keys(goalsData).sort((a, b) => 
            goalsData[a].label.localeCompare(goalsData[b].label)
        );
        
        // Add options for each primary goal
        sortedGoalKeys.forEach(goalId => {
            const option = document.createElement('option');
            option.value = goalId;
            option.textContent = goalsData[goalId].label;
            primaryGoalSelect.appendChild(option);
        });
    }
    
    // Add a custom goal from the modal
    function addCustomGoal() {
        const goalType = newGoalTypeSelect.value;
        const goalLabel = newGoalLabelInput.value.trim();
        
        if (!goalLabel) return;
        
        if (goalType === 'primary') {
            // Generate a unique ID for the new primary goal
            const goalId = 'custom-' + Date.now();
            
            // Add to goalsData
            goalsData[goalId] = {
                label: goalLabel,
                secondaries: []
            };
            
            // Create a new primary goal bubble
            const primaryWithSecondaries = document.createElement('div');
            primaryWithSecondaries.className = 'primary-with-secondaries';
            primaryWithSecondaries.setAttribute('data-primary-id', goalId);
            
            const goalBubble = document.createElement('div');
            goalBubble.className = 'goal-bubble primary';
            goalBubble.setAttribute('data-goal-id', goalId);
            goalBubble.textContent = goalLabel;
            
            // Add click event
            goalBubble.addEventListener('click', function() {
                toggleGoalSelection(this, 'primary');
            });
            
            primaryWithSecondaries.appendChild(goalBubble);
            
            // Append to the container
            const primaryGoalsWrapper = document.querySelector('.goal-bubbles.primary-goals');
            if (primaryGoalsWrapper) {
                primaryGoalsWrapper.appendChild(primaryWithSecondaries);
            }
            
            // Auto-select the new goal
            goalBubble.click();
            
            // Update primary goal select in the modal
            populatePrimaryGoalSelect();
        } else if (goalType === 'secondary') {
            const primaryId = primaryGoalSelect.value;
            
            if (!primaryId || !goalsData[primaryId]) return;
            
            // Generate a unique ID for the new secondary goal
            const goalId = 'custom-' + Date.now();
            
            // Add to goalsData
            goalsData[primaryId].secondaries.push({
                id: goalId,
                label: goalLabel,
                related: []
            });
            
            // Find or select the primary goal
            const primaryBubble = document.querySelector(`.goal-bubble.primary[data-goal-id="${primaryId}"]`);
            if (primaryBubble) {
                // Make sure the primary goal is selected to show secondaries
                if (!primaryBubble.classList.contains('selected')) {
                    primaryBubble.click();
                }
                
                // Find the related goals section
                const container = primaryBubble.closest('.primary-with-secondaries');
                const relatedSection = container.querySelector('.related-goals-section');
                
                if (relatedSection) {
                    // Get the color class
                    const colorIndex = (Array.from(document.querySelectorAll('.goal-bubble.primary')).findIndex(el => 
                        el.getAttribute('data-goal-id') === primaryId
                    ) % 5) + 1;
                    
                    const colorClass = `primary-color-${colorIndex}`;
                    
                    // Create a new secondary goal bubble
                    const secondaryBubble = document.createElement('div');
                    secondaryBubble.className = `goal-bubble secondary ${colorClass}`;
                    secondaryBubble.setAttribute('data-goal-id', goalId);
                    secondaryBubble.setAttribute('data-primary-id', primaryId);
                    secondaryBubble.textContent = goalLabel;
                    
                    // Add click event
                    secondaryBubble.addEventListener('click', function() {
                        toggleGoalSelection(this, 'secondary');
                    });
                    
                    relatedSection.appendChild(secondaryBubble);
                    
                    // Auto-select the new goal
                    secondaryBubble.click();
                }
            }
        }
        
        // Close the modal
        closeAddGoalModal();
    }
    
    // Save Goals button functionality
    if (sideTabSaveGoalsButton) {
        sideTabSaveGoalsButton.addEventListener('click', function() {
            // Organize goals in the format needed for saving
            const organizedGoals = [];
            
            // Get all primary goals
            const primaryGoals = selectedGoals.filter(g => g.type === 'primary');
            
            primaryGoals.forEach(primaryGoal => {
                // Find all secondary goals for this primary
                const secondaries = selectedGoals
                    .filter(g => g.type === 'secondary' && g.primaryId === primaryGoal.id)
                    .map(g => g.id);
                
                organizedGoals.push({
                    primary: primaryGoal.id,
                    secondaries: secondaries
                });
            });
            
            // In a real app, this would call an API to save the goals
            console.log('Saving goals:', organizedGoals);
            
            // Create a new entry for user goals history
            const newGoalEntry = {
                id: 'goal-set-' + (new Date().getTime()),
                date: new Date().toISOString(),
                selectedGoals: organizedGoals
            };
            
            // Show confirmation to the user
            alert('Your health goals have been saved successfully!');
            
            // Redirect back to profile.html My Goals tab
            window.location.href = 'profile.html#my-goals';
        });
    }

    // Function to setup side tab interactions
    function setupSideTabInteractions() {
        if (!sideTab || !sideTabToggleButton) return;

        sideTabToggleButton.addEventListener('click', function() {
            sideTab.classList.toggle('open');
        });

        // Optional: Close tab if clicking outside of it (and not on the toggle button)
        // document.addEventListener('click', function(event) {
        //     if (sideTab.classList.contains('open') && 
        //         !sideTab.contains(event.target) && 
        //         event.target !== sideTabToggleButton && 
        //         !sideTabToggleButton.contains(event.target)) {
        //         sideTab.classList.remove('open');
        //     }
        // });
    }
}); 