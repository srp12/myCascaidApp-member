document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const engineLightsPanel = document.getElementById('engineLightsPanel');
    const panelToggle = document.getElementById('panelToggle');
    const engineLights = document.querySelectorAll('.engine-light');
    const detailContent = document.getElementById('detailContent');
    const emptyState = document.querySelector('.empty-state');
    
    // Risk level color mapping
    const riskColors = {
        'high': '#e07a5f',
        'mid': '#f2cc8f',
        'low': '#81b29a',
        'optimal': '#6b98d4'
    };
    
    // Risk level text mapping
    const riskText = {
        'high': 'High Risk',
        'mid': 'Medium Risk',
        'low': 'Low Risk',
        'optimal': 'Optimal'
    };
    
    // Toggle panel visibility
    panelToggle.addEventListener('click', function() {
        engineLightsPanel.classList.toggle('hidden');
        panelToggle.classList.toggle('panel-hidden');
    });
    
    // Handle engine light selection
    engineLights.forEach(light => {
        light.addEventListener('click', function() {
            // Remove active class from all lights
            engineLights.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked light
            this.classList.add('active');
            
            // Get light data
            const risk = this.getAttribute('data-risk');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Hide empty state and show detail content
            emptyState.style.display = 'none';
            detailContent.style.display = 'block';
            
            // Update detail content
            updateDetailContent(risk, title, description);
        });
    });
    
    // Function to update detail content
    function updateDetailContent(risk, title, description) {
        // Update risk indicator
        const riskCircle = document.querySelector('.detail-content .risk-circle');
        const riskLevel = document.querySelector('.detail-content .risk-level');
        
        riskCircle.style.backgroundColor = riskColors[risk];
        riskLevel.textContent = riskText[risk];
        
        // Update title and description
        document.querySelector('.detail-content .detail-title').textContent = title;
        document.querySelector('.detail-content .detail-description').textContent = description;
        
        // Generate recommendations based on risk level
        updateRecommendations(risk, title);
    }
    
    // Function to update recommendations based on risk level and title
    function updateRecommendations(risk, title) {
        const recommendationsList = document.querySelector('.detail-recommendation ul');
        recommendationsList.innerHTML = ''; // Clear existing recommendations
        
        let recommendations = [];
        
        // Generate generic recommendations based on risk level
        if (risk === 'high') {
            recommendations = [
                `Schedule a consultation with your healthcare provider about your ${title.toLowerCase()}.`,
                'Review your recent health data for potential patterns or triggers.',
                'Follow your prescribed treatment plan strictly.',
                'Consider more frequent monitoring of this health parameter.'
            ];
        } else if (risk === 'mid') {
            recommendations = [
                `Continue monitoring your ${title.toLowerCase()} regularly.`,
                'Make small adjustments to your daily habits that might impact this parameter.',
                'Discuss this with your health coach at your next check-in.',
                'Review educational resources related to this health factor.'
            ];
        } else if (risk === 'low') {
            recommendations = [
                `Keep an eye on your ${title.toLowerCase()} during regular check-ups.`,
                'Maintain your current healthy habits.',
                'Consider small improvements to optimize this health parameter.',
                'Share your progress with your support network.'
            ];
        } else if (risk === 'optimal') {
            recommendations = [
                `Great job maintaining optimal ${title.toLowerCase()}!`,
                'Continue your current health practices.',
                'Share your success strategies with your support community.',
                'Schedule your next regular check-up as planned.'
            ];
        }
        
        // Add recommendations to the list
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
    }
}); 