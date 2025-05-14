/**
 * Profile Page JavaScript
 * Handles profile tabs, modals, and form submissions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Element selectors for general profile functionality
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

    // Modals (ensure these are defined if used by my-goals.js, or pass them as params, for now kept here)
    const personalInfoModal = document.getElementById('personal-info-modal');
    const addressModal = document.getElementById('address-modal');
    const paymentModal = document.getElementById('payment-modal');
    const membershipModal = document.getElementById('membership-modal');
    // const progressUpdateModal = document.getElementById('progress-update-modal'); // Removed as per previous step


    // Tab switching functionality
    if (profileTabs.length > 0 && tabPanes.length > 0) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                profileTabs.forEach(t => t.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                const activePane = document.getElementById(tabId);
                if (activePane) {
                    activePane.classList.add('active');
                }
            });
        });
    }

    // Open modals for editing
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            if (section === 'personal-info') openModal(personalInfoModal);
            // Address and Payment edit modals might have specific data-ids
            else if (button.hasAttribute('data-address-id')) {
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
        upgradeButton.addEventListener('click', () => openModal(membershipModal));
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
        button.addEventListener('click', (e) => {
            // Prevent form submission if cancel is inside a form
            e.preventDefault(); 
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
            alert('File upload dialog would open here. This is a placeholder for demonstration.');
        });
    }

    // Set primary address/payment functionality
    setPrimaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = button.getAttribute('data-address-id');
            const paymentId = button.getAttribute('data-payment-id');
            if (addressId) setAddressAsPrimary(addressId);
            else if (paymentId) setPaymentAsPrimary(paymentId);
        });
    });

    // Delete buttons functionality
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const addressId = button.getAttribute('data-address-id');
            const paymentId = button.getAttribute('data-payment-id');
            if (addressId) confirmDelete('address', addressId);
            else if (paymentId) confirmDelete('payment', paymentId);
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
            // Check if the submit event is triggered by a save button, not cancel
            const submitter = e.submitter;
            if (submitter && submitter.classList.contains('cancel-button')) {
                return; // Do nothing if cancel was clicked
            }
            e.preventDefault();
            const formId = form.id;
            if (formId === 'personal-info-form') savePersonalInfo(form);
            else if (formId === 'address-form') saveAddress(form);
            else if (formId === 'payment-form') savePaymentMethod(form);
        });
    });

    // Helper functions (global to this script, accessible by my-goals.js if loaded after)
    window.openModal = function(modal) { // Expose to global scope or pass to my-goals.js
        if (modal) modal.classList.add('show');
    }

    window.closeModal = function(modal) { // Expose to global scope
        if (modal) modal.classList.remove('show');
    }

    function prepareAddressEdit(addressId) {
        const modalTitle = addressModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Edit Address';
        const addressForm = document.getElementById('address-form');
        // Dummy data for demo - replace with actual data fetching in a real app
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
            // ... (populate other fields for addr2)
        }
    }

    function preparePaymentEdit(paymentId) {
        const modalTitle = paymentModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Edit Payment Method';
        const paymentForm = document.getElementById('payment-form');
         // Dummy data for demo
        if (paymentId === 'pm1') {
            paymentForm.querySelector('#card-number').value = '•••• •••• •••• 4242';
            paymentForm.querySelector('#expiry-date').value = '05/25';
            paymentForm.querySelector('#card-name').value = 'Saawan Patel';
            paymentForm.querySelector('#set-primary-payment').checked = true;
        } else if (paymentId === 'pm2') {
            // ... (populate for pm2)
        }
    }

    function clearAddressForm() {
        const modalTitle = addressModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Add Address';
        document.getElementById('address-form').reset();
    }

    function clearPaymentForm() {
        const modalTitle = paymentModal.querySelector('.modal-header h2');
        modalTitle.textContent = 'Add Payment Method';
        document.getElementById('payment-form').reset();
    }

    function setAddressAsPrimary(addressIdToMakePrimary) {
        const addressesContainer = document.querySelector('.addresses-container');
        if (!addressesContainer) return;

        addressesContainer.querySelectorAll('.address-card').forEach(card => {
            const currentAddressId = card.querySelector('.edit-button')?.getAttribute('data-address-id');
            const isPrimary = currentAddressId === addressIdToMakePrimary;
            card.classList.toggle('active', isPrimary);
            
            let badge = card.querySelector('.address-badge');
            if (isPrimary) {
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'address-badge';
                    badge.textContent = 'Primary';
                    card.insertBefore(badge, card.firstChild);
                }
            } else {
                if (badge) badge.remove();
            }

            let setPrimaryBtn = card.querySelector('.set-primary-button');
            if (isPrimary && setPrimaryBtn) {
                setPrimaryBtn.remove();
            } else if (!isPrimary && !setPrimaryBtn && currentAddressId) {
                setPrimaryBtn = document.createElement('button');
                setPrimaryBtn.className = 'set-primary-button';
                setPrimaryBtn.setAttribute('data-address-id', currentAddressId);
                setPrimaryBtn.textContent = 'Set as Primary';
                setPrimaryBtn.onclick = () => setAddressAsPrimary(currentAddressId);
                card.querySelector('.address-actions')?.insertBefore(setPrimaryBtn, card.querySelector('.edit-button'));
            }
        });
    }

    function setPaymentAsPrimary(paymentIdToMakePrimary) {
        const paymentsContainer = document.querySelector('.payment-methods-container');
        if (!paymentsContainer) return;

        paymentsContainer.querySelectorAll('.payment-card').forEach(card => {
            const currentPaymentId = card.querySelector('.edit-button')?.getAttribute('data-payment-id');
            const isPrimary = currentPaymentId === paymentIdToMakePrimary;
            card.classList.toggle('active', isPrimary);

            let badge = card.querySelector('.payment-badge');
            if (isPrimary) {
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'payment-badge';
                    badge.textContent = 'Primary';
                    card.insertBefore(badge, card.firstChild);
                }
            } else {
                if (badge) badge.remove();
            }

            let setPrimaryBtn = card.querySelector('.set-primary-button');
            if (isPrimary && setPrimaryBtn) {
                setPrimaryBtn.remove();
            } else if (!isPrimary && !setPrimaryBtn && currentPaymentId) {
                setPrimaryBtn = document.createElement('button');
                setPrimaryBtn.className = 'set-primary-button';
                setPrimaryBtn.setAttribute('data-payment-id', currentPaymentId);
                setPrimaryBtn.textContent = 'Set as Primary';
                setPrimaryBtn.onclick = () => setPaymentAsPrimary(currentPaymentId);
                card.querySelector('.payment-actions')?.insertBefore(setPrimaryBtn, card.querySelector('.edit-button'));
            }
        });
    }

    function confirmDelete(type, id) {
        const message = type === 'address' ? 'Are you sure you want to delete this address?' : 'Are you sure you want to delete this payment method?';
        if (confirm(message)) {
            if (type === 'address') deleteAddress(id);
            else deletePaymentMethod(id);
        }
    }

    function deleteAddress(addressId) {
        document.querySelector(`.address-card .delete-button[data-address-id="${addressId}"]`)?.closest('.address-card')?.remove();
    }

    function deletePaymentMethod(paymentId) {
        document.querySelector(`.payment-card .delete-button[data-payment-id="${paymentId}"]`)?.closest('.payment-card')?.remove();
    }

    function savePersonalInfo(form) {
        const firstName = form.querySelector('#first-name').value;
        const lastName = form.querySelector('#last-name').value;
        // ... (rest of the values)
        // Update UI (example for name)
        const profileNameEl = document.querySelector('.profile-header-section .profile-name');
        if (profileNameEl) profileNameEl.textContent = `${firstName} ${lastName}`;
        // Update other fields...
        closeModal(personalInfoModal);
    }

    function saveAddress(form) {
        // Simplified: In a real app, create/update address card in DOM + API call
        console.log('Address form submitted');
        closeModal(addressModal);
        form.reset();
    }

    function savePaymentMethod(form) {
        // Simplified: In a real app, create/update payment card in DOM + API call
        console.log('Payment form submitted');
        closeModal(paymentModal);
        form.reset();
    }

    function selectMembershipPlan(plan) {
        alert(`You've selected the ${plan.charAt(0).toUpperCase() + plan.slice(1)} membership plan.`);
        closeModal(membershipModal);
    }
}); 