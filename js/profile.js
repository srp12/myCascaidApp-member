/**
 * Profile Page JavaScript
 * Handles profile tabs, modals, and form submissions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Element selectors for profile functionality
    const profileTabs = document.querySelectorAll('.profile-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const editButtons = document.querySelectorAll('.edit-button');
    const addButtons = document.querySelectorAll('.add-button');
    const upgradeButton = document.getElementById('upgrade-membership');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const cancelButtons = document.querySelectorAll('.cancel-button');
    const editPhotoBtn = document.querySelector('.edit-photo-btn');
    const setPrimaryButtons = document.querySelectorAll('.set-primary-button');
    const deleteButtons = document.querySelectorAll('.delete-button');
    const forms = document.querySelectorAll('form');

    // Modals
    const personalInfoModal = document.getElementById('personal-info-modal');
    const addressModal = document.getElementById('address-modal');
    const paymentModal = document.getElementById('payment-modal');
    const membershipModal = document.getElementById('membership-modal');

    // Goals section elements
    const primaryGoalTags = document.querySelectorAll('.tier-1 .goal-tag');
    const secondaryGoalsContainer = document.querySelector('.tier-2');
    const specificTargetsContainer = document.querySelector('.tier-3');
    const selectedGoalsList = document.querySelector('.selected-goals-list');
    const saveGoalsButton = document.querySelector('.save-goals-button');
    
    // Goal data structure with related subgoals
    const goalData = {
        'weight': {
            label: 'Weight Management',
            subgoals: [
                { id: 'weight-loss', label: 'Weight Loss', targets: [
                    { id: 'weight-loss-5', label: 'Lose 5 pounds' },
                    { id: 'weight-loss-10', label: 'Lose 10 pounds' },
                    { id: 'weight-loss-15', label: 'Lose 15+ pounds' }
                ]},
                { id: 'weight-maintain', label: 'Weight Maintenance', targets: [
                    { id: 'weight-maintain-stable', label: 'Maintain stable weight' },
                    { id: 'weight-maintain-healthy', label: 'Reach healthy BMI' }
                ]},
                { id: 'weight-habits', label: 'Healthy Habits', targets: [
                    { id: 'weight-habits-diet', label: 'Improve dietary habits' },
                    { id: 'weight-habits-meal', label: 'Regular meal planning' }
                ]}
            ]
        },
        'diabetes': {
            label: 'Diabetes Management',
            subgoals: [
                { id: 'diabetes-glucose', label: 'Glucose Control', targets: [
                    { id: 'diabetes-glucose-lower', label: 'Lower A1C levels' },
                    { id: 'diabetes-glucose-monitor', label: 'Regular glucose monitoring' }
                ]},
                { id: 'diabetes-medication', label: 'Medication Adherence', targets: [
                    { id: 'diabetes-medication-daily', label: 'Daily medication routine' },
                    { id: 'diabetes-medication-tracking', label: 'Track medication effects' }
                ]},
                { id: 'diabetes-knowledge', label: 'Diabetes Education', targets: [
                    { id: 'diabetes-knowledge-diet', label: 'Understand diabetic diet' },
                    { id: 'diabetes-knowledge-signs', label: 'Recognize hypo/hyperglycemia signs' }
                ]}
            ]
        },
        'blood-pressure': {
            label: 'Blood Pressure',
            subgoals: [
                { id: 'bp-reduce', label: 'Reduce Blood Pressure', targets: [
                    { id: 'bp-reduce-systolic', label: 'Lower systolic pressure' },
                    { id: 'bp-reduce-diastolic', label: 'Lower diastolic pressure' }
                ]},
                { id: 'bp-monitoring', label: 'Regular Monitoring', targets: [
                    { id: 'bp-monitoring-daily', label: 'Daily BP readings' },
                    { id: 'bp-monitoring-record', label: 'Record and track trends' }
                ]},
                { id: 'bp-lifestyle', label: 'Lifestyle Changes', targets: [
                    { id: 'bp-lifestyle-sodium', label: 'Reduce sodium intake' },
                    { id: 'bp-lifestyle-stress', label: 'Stress management techniques' }
                ]}
            ]
        },
        'fitness': {
            label: 'Fitness',
            subgoals: [
                { id: 'fitness-cardio', label: 'Cardiovascular Health', targets: [
                    { id: 'fitness-cardio-daily', label: '30 min daily activity' },
                    { id: 'fitness-cardio-steps', label: '10,000 steps per day' }
                ]},
                { id: 'fitness-strength', label: 'Strength Training', targets: [
                    { id: 'fitness-strength-weekly', label: '2-3 sessions per week' },
                    { id: 'fitness-strength-muscle', label: 'Increase muscle mass' }
                ]},
                { id: 'fitness-flexibility', label: 'Flexibility & Balance', targets: [
                    { id: 'fitness-flexibility-yoga', label: 'Regular yoga practice' },
                    { id: 'fitness-flexibility-stretching', label: 'Daily stretching routine' }
                ]}
            ]
        },
        'mental': {
            label: 'Mental Wellness',
            subgoals: [
                { id: 'mental-stress', label: 'Stress Reduction', targets: [
                    { id: 'mental-stress-meditation', label: 'Daily meditation' },
                    { id: 'mental-stress-breaks', label: 'Regular mental breaks' }
                ]},
                { id: 'mental-sleep', label: 'Sleep Quality', targets: [
                    { id: 'mental-sleep-hours', label: '7-8 hours nightly' },
                    { id: 'mental-sleep-routine', label: 'Consistent sleep schedule' }
                ]},
                { id: 'mental-support', label: 'Social Connection', targets: [
                    { id: 'mental-support-social', label: 'Regular social activities' },
                    { id: 'mental-support-therapy', label: 'Professional support' }
                ]}
            ]
        }
    };

    // Selected goals tracking
    let selectedGoals = [];
    let activeGoalPath = {
        primary: null,
        secondary: null
    };

    // Tab switching functionality
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            profileTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Goals selection event listeners
    if (primaryGoalTags.length > 0) {
        // Handle primary goal selection
        primaryGoalTags.forEach(goalTag => {
            goalTag.addEventListener('click', () => {
                const goalId = goalTag.getAttribute('data-goal-id');
                
                // Toggle active state for this tag
                const wasActive = goalTag.classList.contains('active');
                
                // Remove active class from all primary goals
                primaryGoalTags.forEach(tag => tag.classList.remove('active'));
                
                // Clear secondary and tertiary goals if we're deselecting or selecting a different primary goal
                if (wasActive || (activeGoalPath.primary && activeGoalPath.primary !== goalId)) {
                    secondaryGoalsContainer.querySelector('.goal-tags').innerHTML = '';
                    specificTargetsContainer.querySelector('.goal-tags').innerHTML = '';
                    
                    // Reset active goal path if we're deselecting
                    if (wasActive) {
                        activeGoalPath.primary = null;
                        activeGoalPath.secondary = null;
                        return;
                    }
                }
                
                // Set active state for selected tag and update active goal path
                goalTag.classList.add('active');
                activeGoalPath.primary = goalId;
                activeGoalPath.secondary = null;
                
                // Populate secondary goals
                const secondaryGoalTags = secondaryGoalsContainer.querySelector('.goal-tags');
                secondaryGoalTags.innerHTML = '';
                
                goalData[goalId].subgoals.forEach(subgoal => {
                    const subgoalTag = document.createElement('span');
                    subgoalTag.classList.add('goal-tag');
                    subgoalTag.setAttribute('data-goal-id', subgoal.id);
                    subgoalTag.textContent = subgoal.label;
                    
                    // Add event listener for secondary goal selection
                    subgoalTag.addEventListener('click', () => handleSecondaryGoalClick(subgoal, goalId));
                    
                    secondaryGoalTags.appendChild(subgoalTag);
                });
            });
        });
        
        // Save goals button event listener
        if (saveGoalsButton) {
            saveGoalsButton.addEventListener('click', saveUserGoals);
        }
    }

    // Handler for secondary goal selection
    function handleSecondaryGoalClick(subgoal, primaryGoalId) {
        const secondaryGoalTags = secondaryGoalsContainer.querySelectorAll('.goal-tag');
        const secondaryGoalId = subgoal.id;
        
        // Find the clicked element
        const clickedTag = Array.from(secondaryGoalTags).find(tag => 
            tag.getAttribute('data-goal-id') === secondaryGoalId
        );
        
        if (!clickedTag) return;
        
        // Toggle active state for this tag
        const wasActive = clickedTag.classList.contains('active');
        
        // Remove active class from all secondary goals
        secondaryGoalTags.forEach(tag => tag.classList.remove('active'));
        
        // Clear tertiary goals if we're deselecting or selecting a different secondary goal
        if (wasActive || (activeGoalPath.secondary && activeGoalPath.secondary !== secondaryGoalId)) {
            specificTargetsContainer.querySelector('.goal-tags').innerHTML = '';
            
            // Reset secondary path if we're deselecting
            if (wasActive) {
                activeGoalPath.secondary = null;
                return;
            }
        }
        
        // Set active state for selected tag and update active goal path
        clickedTag.classList.add('active');
        activeGoalPath.secondary = secondaryGoalId;
        
        // Populate specific targets
        const specificTargetTags = specificTargetsContainer.querySelector('.goal-tags');
        specificTargetTags.innerHTML = '';
        
        // Find the subgoal in our data structure
        const targetSubgoal = goalData[primaryGoalId].subgoals.find(sg => sg.id === secondaryGoalId);
        
        if (targetSubgoal && targetSubgoal.targets) {
            targetSubgoal.targets.forEach(target => {
                const targetTag = document.createElement('span');
                targetTag.classList.add('goal-tag');
                targetTag.setAttribute('data-goal-id', target.id);
                targetTag.textContent = target.label;
                
                // Add event listener for target selection
                targetTag.addEventListener('click', () => {
                    addGoalToSelectedList(primaryGoalId, secondaryGoalId, target.id);
                });
                
                specificTargetTags.appendChild(targetTag);
            });
        }
    }

    // Add a goal to the selected goals list
    function addGoalToSelectedList(primaryId, secondaryId, targetId) {
        // Check if this goal is already selected
        const existingGoal = selectedGoals.find(goal => 
            goal.primary === primaryId && 
            goal.secondary === secondaryId && 
            goal.target === targetId
        );
        
        if (existingGoal) return; // Don't add duplicates
        
        // Create a new goal object with path and date
        const goalObject = {
            primary: primaryId,
            secondary: secondaryId,
            target: targetId,
            date: new Date().toISOString(),
            path: [
                goalData[primaryId].label,
                goalData[primaryId].subgoals.find(sg => sg.id === secondaryId).label,
                goalData[primaryId].subgoals.find(sg => sg.id === secondaryId)
                    .targets.find(t => t.id === targetId).label
            ]
        };
        
        // Add to our selected goals array
        selectedGoals.push(goalObject);
        
        // Update the UI
        updateSelectedGoalsList();
        
        // Enable save button if we have goals
        if (saveGoalsButton) {
            saveGoalsButton.disabled = selectedGoals.length === 0;
        }
    }

    // Update the selected goals list in the UI
    function updateSelectedGoalsList() {
        // Remove empty state if we have goals
        if (selectedGoals.length > 0) {
            const emptyState = selectedGoalsList.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
        }
        
        // Clear and rebuild the list
        selectedGoalsList.innerHTML = selectedGoals.length === 0 
            ? '<div class="empty-state"><p>No goals selected yet. Click on the tags above to set your health goals.</p></div>'
            : '';
        
        // Add each goal to the list
        selectedGoals.forEach((goal, index) => {
            const goalItem = document.createElement('div');
            goalItem.classList.add('selected-goal-item');
            
            const formattedDate = new Date(goal.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            goalItem.innerHTML = `
                <div class="goal-info">
                    <div class="goal-path">
                        <span>${goal.path[0]}</span>
                        <span class="separator">›</span>
                        <span>${goal.path[1]}</span>
                        <span class="separator">›</span>
                        <span>${goal.path[2]}</span>
                    </div>
                    <div class="goal-date">Added on ${formattedDate}</div>
                </div>
                <div class="goal-actions">
                    <button class="remove-goal" data-index="${index}">×</button>
                </div>
            `;
            
            selectedGoalsList.appendChild(goalItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-goal').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeSelectedGoal(index);
            });
        });
    }

    // Remove a goal from the selected list
    function removeSelectedGoal(index) {
        // Remove from the array
        selectedGoals.splice(index, 1);
        
        // Update the UI
        updateSelectedGoalsList();
        
        // Disable save button if no goals
        if (saveGoalsButton) {
            saveGoalsButton.disabled = selectedGoals.length === 0;
        }
    }

    // Save the selected goals (would connect to backend in a real app)
    function saveUserGoals() {
        // Simulate saving to server
        setTimeout(() => {
            // Create a confirmation message
            const confirmMessage = document.createElement('div');
            confirmMessage.classList.add('save-confirmation');
            confirmMessage.textContent = 'Your health goals have been saved!';
            confirmMessage.style.position = 'fixed';
            confirmMessage.style.top = '20px';
            confirmMessage.style.left = '50%';
            confirmMessage.style.transform = 'translateX(-50%)';
            confirmMessage.style.backgroundColor = '#00a67d';
            confirmMessage.style.color = 'white';
            confirmMessage.style.padding = '10px 20px';
            confirmMessage.style.borderRadius = '4px';
            confirmMessage.style.zIndex = '1000';
            confirmMessage.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            
            // Add to document and remove after delay
            document.body.appendChild(confirmMessage);
            
            // Remove the message after 3 seconds
            setTimeout(() => {
                confirmMessage.style.opacity = '0';
                confirmMessage.style.transition = 'opacity 0.5s';
                
                // Remove from DOM after fade effect
                setTimeout(() => {
                    document.body.removeChild(confirmMessage);
                }, 500);
            }, 3000);
            
            // Disable the save button
            saveGoalsButton.disabled = true;
            saveGoalsButton.textContent = 'Goals Saved';
            
            // In a real app, we would persist these goals to a server/database
            console.log('Goals saved:', selectedGoals);
        }, 1000);
    }

    // Open modals for editing
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            
            if (section === 'personal-info') {
                openModal(personalInfoModal);
            } else if (button.hasAttribute('data-address-id')) {
                const addressId = button.getAttribute('data-address-id');
                prepareAddressEdit(addressId);
                openModal(addressModal);
            } else if (button.hasAttribute('data-payment-id')) {
                const paymentId = button.getAttribute('data-payment-id');
                preparePaymentEdit(paymentId);
                openModal(paymentModal);
            }
        });
    });

    // Open modals for adding
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            
            if (section === 'address') {
                clearAddressForm();
                openModal(addressModal);
            } else if (section === 'payment') {
                clearPaymentForm();
                openModal(paymentModal);
            }
        });
    });

    // Open membership upgrade modal
    if (upgradeButton) {
        upgradeButton.addEventListener('click', () => {
            openModal(membershipModal);
        });
    }

    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Cancel buttons also close modals
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Click outside modal to close
    document.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Profile photo edit handling
    if (editPhotoBtn) {
        editPhotoBtn.addEventListener('click', () => {
            // Simulate file upload dialog (in a real app, this would open a file picker)
            alert('File upload dialog would open here. This is a placeholder for demonstration.');
        });
    }

    // Set primary address functionality
    setPrimaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = button.getAttribute('data-address-id');
            if (addressId) {
                setAddressAsPrimary(addressId);
            } else {
                const paymentId = button.getAttribute('data-payment-id');
                if (paymentId) {
                    setPaymentAsPrimary(paymentId);
                }
            }
        });
    });

    // Delete buttons functionality
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = button.getAttribute('data-address-id');
            if (addressId) {
                confirmDelete('address', addressId);
            } else {
                const paymentId = button.getAttribute('data-payment-id');
                if (paymentId) {
                    confirmDelete('payment', paymentId);
                }
            }
        });
    });

    // Membership plan selection
    const planButtons = document.querySelectorAll('.select-plan-button');
    planButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', () => {
                const plan = button.getAttribute('data-plan');
                selectMembershipPlan(plan);
            });
        }
    });

    // Form submissions
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formId = form.id;
            if (formId === 'personal-info-form') {
                savePersonalInfo(form);
            } else if (formId === 'address-form') {
                saveAddress(form);
            } else if (formId === 'payment-form') {
                savePaymentMethod(form);
            }
        });
    });

    // Helper functions
    function openModal(modal) {
        if (modal) {
            modal.classList.add('show');
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
        }
    }

    function prepareAddressEdit(addressId) {
        // In a real app, this would fetch the address data and populate the form
        // For demo purposes, we'll just update the modal title
        const modalTitle = addressModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Edit Address';

        // Simulate populating the form with existing data
        const addressForm = document.getElementById('address-form');
        if (addressId === 'addr1') {
            addressForm.querySelector('#address-name').value = 'Home Address';
            addressForm.querySelector('#address-line1').value = '123 Main Street';
            addressForm.querySelector('#address-line2').value = 'Apt 4B';
            addressForm.querySelector('#city').value = 'Seattle';
            addressForm.querySelector('#state').value = 'WA';
            addressForm.querySelector('#zip').value = '98101';
            addressForm.querySelector('#country').value = 'US';
            addressForm.querySelector('#set-primary-address').checked = true;
        } else if (addressId === 'addr2') {
            addressForm.querySelector('#address-name').value = 'Work Address';
            addressForm.querySelector('#address-line1').value = '456 Business Ave';
            addressForm.querySelector('#address-line2').value = 'Suite 300';
            addressForm.querySelector('#city').value = 'Seattle';
            addressForm.querySelector('#state').value = 'WA';
            addressForm.querySelector('#zip').value = '98104';
            addressForm.querySelector('#country').value = 'US';
            addressForm.querySelector('#set-primary-address').checked = false;
        }
    }

    function preparePaymentEdit(paymentId) {
        // In a real app, this would fetch the payment data and populate the form
        // For demo purposes, we'll just update the modal title
        const modalTitle = paymentModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Edit Payment Method';

        // Simulate populating the form with masked data
        const paymentForm = document.getElementById('payment-form');
        if (paymentId === 'pm1') {
            paymentForm.querySelector('#card-number').value = '•••• •••• •••• 4242';
            paymentForm.querySelector('#expiry-date').value = '05/25';
            paymentForm.querySelector('#card-name').value = 'Saawan Patel';
            paymentForm.querySelector('#set-primary-payment').checked = true;
        } else if (paymentId === 'pm2') {
            paymentForm.querySelector('#card-number').value = '•••• •••• •••• 8888';
            paymentForm.querySelector('#expiry-date').value = '12/24';
            paymentForm.querySelector('#card-name').value = 'Saawan Patel';
            paymentForm.querySelector('#set-primary-payment').checked = false;
        }
    }

    function clearAddressForm() {
        const modalTitle = addressModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Add Address';
        
        const addressForm = document.getElementById('address-form');
        addressForm.reset();
    }

    function clearPaymentForm() {
        const modalTitle = paymentModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Add Payment Method';
        
        const paymentForm = document.getElementById('payment-form');
        paymentForm.reset();
    }

    function setAddressAsPrimary(addressId) {
        // In a real app, this would update the database
        // For demo purposes, we'll just update the UI
        const addresses = document.querySelectorAll('.address-card');
        addresses.forEach(address => {
            address.classList.remove('active');
            const badge = address.querySelector('.address-badge');
            if (badge) badge.remove();
        });

        // Add active class and badge to selected address
        const selectedAddress = document.querySelector(`[data-address-id="${addressId}"]`).closest('.address-card');
        selectedAddress.classList.add('active');
        
        // Add badge if it doesn't exist
        if (!selectedAddress.querySelector('.address-badge')) {
            const badge = document.createElement('div');
            badge.classList.add('address-badge');
            badge.textContent = 'Primary';
            selectedAddress.prepend(badge);
        }

        // Update buttons - hide "Set as Primary" on the new primary address
        selectedAddress.querySelector('.set-primary-button')?.remove();

        // Add "Set as Primary" button to other addresses that don't have it
        addresses.forEach(address => {
            if (!address.classList.contains('active') && !address.querySelector('.set-primary-button')) {
                const addressId = address.querySelector('.edit-button').getAttribute('data-address-id');
                const actionsDiv = address.querySelector('.address-actions');
                
                const setPrimaryBtn = document.createElement('button');
                setPrimaryBtn.classList.add('set-primary-button');
                setPrimaryBtn.setAttribute('data-address-id', addressId);
                setPrimaryBtn.textContent = 'Set as Primary';
                setPrimaryBtn.addEventListener('click', () => setAddressAsPrimary(addressId));
                
                actionsDiv.prepend(setPrimaryBtn);
            }
        });
    }

    function setPaymentAsPrimary(paymentId) {
        // Similar logic as setAddressAsPrimary but for payment methods
        const payments = document.querySelectorAll('.payment-card');
        payments.forEach(payment => {
            payment.classList.remove('active');
            const badge = payment.querySelector('.payment-badge');
            if (badge) badge.remove();
        });

        const selectedPayment = document.querySelector(`[data-payment-id="${paymentId}"]`).closest('.payment-card');
        selectedPayment.classList.add('active');
        
        if (!selectedPayment.querySelector('.payment-badge')) {
            const badge = document.createElement('div');
            badge.classList.add('payment-badge');
            badge.textContent = 'Primary';
            selectedPayment.prepend(badge);
        }

        selectedPayment.querySelector('.set-primary-button')?.remove();

        payments.forEach(payment => {
            if (!payment.classList.contains('active') && !payment.querySelector('.set-primary-button')) {
                const paymentId = payment.querySelector('.edit-button').getAttribute('data-payment-id');
                const actionsDiv = payment.querySelector('.payment-actions');
                
                const setPrimaryBtn = document.createElement('button');
                setPrimaryBtn.classList.add('set-primary-button');
                setPrimaryBtn.setAttribute('data-payment-id', paymentId);
                setPrimaryBtn.textContent = 'Set as Primary';
                setPrimaryBtn.addEventListener('click', () => setPaymentAsPrimary(paymentId));
                
                actionsDiv.prepend(setPrimaryBtn);
            }
        });
    }

    function confirmDelete(type, id) {
        // In a real app, this might use a custom confirm dialog
        const message = type === 'address' 
            ? 'Are you sure you want to delete this address?' 
            : 'Are you sure you want to delete this payment method?';
            
        if (confirm(message)) {
            if (type === 'address') {
                deleteAddress(id);
            } else {
                deletePaymentMethod(id);
            }
        }
    }

    function deleteAddress(addressId) {
        // In a real app, this would call an API to delete the address
        // For demo purposes, we'll just remove it from the DOM
        const addressCard = document.querySelector(`[data-address-id="${addressId}"]`).closest('.address-card');
        addressCard.remove();
    }

    function deletePaymentMethod(paymentId) {
        // Similar to deleteAddress but for payment methods
        const paymentCard = document.querySelector(`[data-payment-id="${paymentId}"]`).closest('.payment-card');
        paymentCard.remove();
    }

    function savePersonalInfo(form) {
        // In a real app, this would submit the form data to an API
        // For demo purposes, we'll just update the displayed information and close the modal
        
        const firstName = form.querySelector('#first-name').value;
        const lastName = form.querySelector('#last-name').value;
        const birthday = form.querySelector('#birthday').value;
        const sex = form.querySelector('#sex').value;
        const email = form.querySelector('#email').value;
        const phone = form.querySelector('#phone').value;
        
        // Format the date for display
        const formattedDate = new Date(birthday).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update the displayed information in the main content
        document.querySelector('.profile-name').textContent = `${firstName} ${lastName}`;
        document.querySelectorAll('.info-value').forEach(el => {
            if (el.previousElementSibling.textContent === 'First Name') {
                el.textContent = firstName;
            } else if (el.previousElementSibling.textContent === 'Last Name') {
                el.textContent = lastName;
            } else if (el.previousElementSibling.textContent === 'Birthday') {
                el.textContent = formattedDate;
            } else if (el.previousElementSibling.textContent === 'Sex at Birth') {
                el.textContent = sex.charAt(0).toUpperCase() + sex.slice(1);
            } else if (el.previousElementSibling.textContent === 'Email') {
                el.textContent = email;
            } else if (el.previousElementSibling.textContent === 'Phone Number') {
                el.textContent = phone;
            }
        });
        
        // Also update the name in the side menu if it exists
        const sideMenuProfileName = document.querySelector('#profile-side-menu .profile-name');
        if (sideMenuProfileName) {
            sideMenuProfileName.textContent = `${firstName} ${lastName}`;
        }
        
        // Close the modal
        closeModal(personalInfoModal);
    }

    function saveAddress(form) {
        // In a real app, this would submit to an API
        // For demo, let's create or update an address card
        
        const addressName = form.querySelector('#address-name').value;
        const addressLine1 = form.querySelector('#address-line1').value;
        const addressLine2 = form.querySelector('#address-line2').value;
        const city = form.querySelector('#city').value;
        const state = form.querySelector('#state').value;
        const zip = form.querySelector('#zip').value;
        const country = form.querySelector('#country').value;
        const isPrimary = form.querySelector('#set-primary-address').checked;
        
        // Get the country name from the select option
        const countryName = form.querySelector('#country option:checked').textContent;
        
        // Check if we're editing (modal title contains "Edit")
        const isEditing = addressModal.querySelector('.modal-header h2').textContent.includes('Edit');
        
        if (isEditing) {
            // Find which address we're editing
            const addressId = document.querySelector('.edit-button[data-address-id]').getAttribute('data-address-id');
            const addressCard = document.querySelector(`[data-address-id="${addressId}"]`).closest('.address-card');
            
            // Update the address content
            const addressContent = addressCard.querySelector('.address-content');
            addressContent.querySelector('.address-name').textContent = addressName;
            
            // Update or create address lines
            let addressLines = addressContent.querySelectorAll('.address-line');
            if (addressLines.length >= 1) {
                addressLines[0].textContent = addressLine1 + (addressLine2 ? `, ${addressLine2}` : '');
            }
            if (addressLines.length >= 2) {
                addressLines[1].textContent = `${city}, ${state} ${zip}`;
            }
            if (addressLines.length >= 3) {
                addressLines[2].textContent = countryName;
            }
            
            // If primary is checked, make this the primary address
            if (isPrimary) {
                setAddressAsPrimary(addressId);
            }
        } else {
            // Create a new address card
            const addressesContainer = document.querySelector('.addresses-container');
            
            // Generate a unique ID for the new address
            const newAddressId = 'addr' + (addressesContainer.children.length + 1);
            
            // Create the address card HTML
            const addressCard = document.createElement('div');
            addressCard.classList.add('address-card');
            if (isPrimary) addressCard.classList.add('active');
            
            addressCard.innerHTML = `
                ${isPrimary ? '<div class="address-badge">Primary</div>' : ''}
                <div class="address-content">
                    <p class="address-name">${addressName}</p>
                    <p class="address-line">${addressLine1}${addressLine2 ? `, ${addressLine2}` : ''}</p>
                    <p class="address-line">${city}, ${state} ${zip}</p>
                    <p class="address-line">${countryName}</p>
                </div>
                <div class="address-actions">
                    ${!isPrimary ? `<button class="set-primary-button" data-address-id="${newAddressId}">Set as Primary</button>` : ''}
                    <button class="edit-button" data-address-id="${newAddressId}">
                        <img src="assets/icons/icons8-edit.svg" alt="Edit">
                    </button>
                    <button class="delete-button" data-address-id="${newAddressId}">
                        <img src="assets/icons/icons8-trash.svg" alt="Delete">
                    </button>
                </div>
            `;
            
            // Append the new address card to the container
            addressesContainer.appendChild(addressCard);
            
            // Add event listeners to the new buttons
            const newEditBtn = addressCard.querySelector('.edit-button');
            newEditBtn.addEventListener('click', () => {
                prepareAddressEdit(newAddressId);
                openModal(addressModal);
            });
            
            const newDeleteBtn = addressCard.querySelector('.delete-button');
            newDeleteBtn.addEventListener('click', () => {
                confirmDelete('address', newAddressId);
            });
            
            const newSetPrimaryBtn = addressCard.querySelector('.set-primary-button');
            if (newSetPrimaryBtn) {
                newSetPrimaryBtn.addEventListener('click', () => {
                    setAddressAsPrimary(newAddressId);
                });
            }
            
            // If this is primary, update other addresses
            if (isPrimary) {
                const otherAddresses = addressesContainer.querySelectorAll('.address-card:not(:last-child)');
                otherAddresses.forEach(addr => {
                    addr.classList.remove('active');
                    const badge = addr.querySelector('.address-badge');
                    if (badge) badge.remove();
                    
                    // Add "Set as Primary" button if it doesn't exist
                    if (!addr.querySelector('.set-primary-button')) {
                        const addrId = addr.querySelector('.edit-button').getAttribute('data-address-id');
                        const actionsDiv = addr.querySelector('.address-actions');
                        
                        const setPrimaryBtn = document.createElement('button');
                        setPrimaryBtn.classList.add('set-primary-button');
                        setPrimaryBtn.setAttribute('data-address-id', addrId);
                        setPrimaryBtn.textContent = 'Set as Primary';
                        setPrimaryBtn.addEventListener('click', () => setAddressAsPrimary(addrId));
                        
                        actionsDiv.prepend(setPrimaryBtn);
                    }
                });
            }
        }
        
        // Close the modal and reset the form
        closeModal(addressModal);
        form.reset();
    }

    function savePaymentMethod(form) {
        // Similar to saveAddress but for payment methods
        // In a real app, this would submit to an API with proper validation and security
        
        const cardNumber = form.querySelector('#card-number').value;
        const expiryDate = form.querySelector('#expiry-date').value;
        const cardName = form.querySelector('#card-name').value;
        const isPrimary = form.querySelector('#set-primary-payment').checked;
        
        // Format card number for display - show only last 4 digits
        let displayNumber;
        if (cardNumber.includes('•')) {
            // If editing, keep the masked format
            displayNumber = cardNumber;
        } else {
            // For new cards, mask all but last 4
            const last4 = cardNumber.replace(/\s+/g, '').slice(-4);
            displayNumber = `ending in ${last4}`;
        }
        
        // Determine card type (very basic check)
        let cardType = 'visa'; // Default
        if (cardNumber.startsWith('5') || cardNumber.startsWith('2')) {
            cardType = 'mastercard';
        }
        
        // Check if we're editing
        const isEditing = paymentModal.querySelector('.modal-header h2').textContent.includes('Edit');
        
        if (isEditing) {
            // Find which payment we're editing
            const paymentId = document.querySelector('.edit-button[data-payment-id]').getAttribute('data-payment-id');
            const paymentCard = document.querySelector(`[data-payment-id="${paymentId}"]`).closest('.payment-card');
            
            // Update the payment card content
            const paymentContent = paymentCard.querySelector('.payment-content');
            
            // Update card icon if needed
            const paymentIcon = paymentCard.querySelector('.payment-icon');
            paymentIcon.className = `payment-icon ${cardType}`;
            
            // Update payment details
            paymentContent.querySelector('.payment-name').textContent = `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} ${displayNumber}`;
            paymentContent.querySelector('.payment-expiry').textContent = `Expires ${expiryDate}`;
            
            // If primary is checked, make this the primary payment
            if (isPrimary) {
                setPaymentAsPrimary(paymentId);
            }
        } else {
            // Create a new payment card
            const paymentsContainer = document.querySelector('.payment-methods-container');
            
            // Generate a unique ID for the new payment
            const newPaymentId = 'pm' + (paymentsContainer.children.length + 1);
            
            // Create the payment card HTML
            const paymentCard = document.createElement('div');
            paymentCard.classList.add('payment-card');
            if (isPrimary) paymentCard.classList.add('active');
            
            paymentCard.innerHTML = `
                ${isPrimary ? '<div class="payment-badge">Primary</div>' : ''}
                <div class="payment-icon ${cardType}"></div>
                <div class="payment-content">
                    <p class="payment-name">${cardType.charAt(0).toUpperCase() + cardType.slice(1)} ${displayNumber}</p>
                    <p class="payment-expiry">Expires ${expiryDate}</p>
                </div>
                <div class="payment-actions">
                    ${!isPrimary ? `<button class="set-primary-button" data-payment-id="${newPaymentId}">Set as Primary</button>` : ''}
                    <button class="edit-button" data-payment-id="${newPaymentId}">
                        <img src="assets/icons/icons8-edit.svg" alt="Edit">
                    </button>
                    <button class="delete-button" data-payment-id="${newPaymentId}">
                        <img src="assets/icons/icons8-trash.svg" alt="Delete">
                    </button>
                </div>
            `;
            
            // Append the new payment card to the container
            paymentsContainer.appendChild(paymentCard);
            
            // Add event listeners to the new buttons
            const newEditBtn = paymentCard.querySelector('.edit-button');
            newEditBtn.addEventListener('click', () => {
                preparePaymentEdit(newPaymentId);
                openModal(paymentModal);
            });
            
            const newDeleteBtn = paymentCard.querySelector('.delete-button');
            newDeleteBtn.addEventListener('click', () => {
                confirmDelete('payment', newPaymentId);
            });
            
            const newSetPrimaryBtn = paymentCard.querySelector('.set-primary-button');
            if (newSetPrimaryBtn) {
                newSetPrimaryBtn.addEventListener('click', () => {
                    setPaymentAsPrimary(newPaymentId);
                });
            }
            
            // If this is primary, update other payments
            if (isPrimary) {
                setPaymentAsPrimary(newPaymentId);
            }
        }
        
        // Close the modal and reset the form
        closeModal(paymentModal);
        form.reset();
    }

    function selectMembershipPlan(plan) {
        // In a real app, this would submit to an API to change the plan
        // For demo purposes, just show a confirmation
        alert(`You've selected the ${plan.charAt(0).toUpperCase() + plan.slice(1)} membership plan. In a real application, this would take you to a confirmation page or payment flow.`);
        closeModal(membershipModal);
    }
}); 