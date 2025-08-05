// Form validation
function validateForm(event) {
    event.preventDefault();
    
    // Get form elements
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value.trim();
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    
    // Validate name (at least 2 words)
    if (!name.includes(' ') || name.split(' ')[1].length === 0) {
        alert('Please enter your full name (first and last name)');
        return false;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Check password strength
    if (!checkPasswordStrength(password)) {
        return false;
    }
    
    // Check if gender is selected
    let genderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) genderSelected = true;
    });
    
    if (!genderSelected) {
        alert('Please select your gender');
        return false;
    }
    
    // Check if address is provided
    if (address.length < 10) {
        alert('Please enter a complete address (at least 10 characters)');
        return false;
    }
    
    // If all validations pass, show success message
    showSuccessMessage();
    return true;
}

// Password strength checker
function checkPasswordStrength(password) {
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
        alert('Password must contain at least:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character');
        return false;
    }
    
    return true;
}

// Show success message and share data
function showSuccessMessage() {
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        country: document.getElementById('country').value,
        address: document.getElementById('address').value
    };

    // Convert to JSON for sharing
    const jsonData = JSON.stringify(formData, null, 2);
    
    // Display success message with data
    const form = document.querySelector('form');
    form.innerHTML = `
        <div class="success-message" style="text-align: center; color: green;">
            <h2>Registration Successful!</h2>
            <p>Thank you for registering with us.</p>
            <div style="margin: 20px; padding: 10px; background: #f5f5f5; text-align: left; white-space: pre; overflow: auto;">
                <strong>Form Data:</strong>
                <pre>${jsonData}</pre>
            </div>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px;">Register Another</button>
        </div>
    `;

    // Also log to console for debugging
    console.log('Form Data:', formData);
}

// Real-time password strength indicator
function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthIndicator = document.getElementById('password-strength');
    
    // Check individual criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLength = password.length >= 8;
    
    // Update criteria indicators
    updateCriteriaStatus('length-check', hasLength);
    updateCriteriaStatus('uppercase-check', hasUpperCase);
    updateCriteriaStatus('lowercase-check', hasLowerCase);
    updateCriteriaStatus('number-check', hasNumbers);
    updateCriteriaStatus('special-check', hasSpecialChar);
    
    if (password.length === 0) {
        strengthIndicator.textContent = '';
        strengthIndicator.className = '';
        return;
    }
    
    const strength = 
        (hasUpperCase ? 1 : 0) +
        (hasLowerCase ? 1 : 0) +
        (hasNumbers ? 1 : 0) +
        (hasSpecialChar ? 1 : 0) +
        (hasLength ? 1 : 0);
    
    let strengthText = '';
    let strengthClass = '';
    
    switch (strength) {
        case 0:
        case 1:
            strengthText = '😟 Weak';
            strengthClass = 'weak';
            break;
        case 2:
        case 3:
            strengthText = '🤔 Moderate';
            strengthClass = 'moderate';
            break;
        case 4:
            strengthText = '😊 Strong';
            strengthClass = 'strong';
            break;
        case 5:
            strengthText = '💪 Very Strong';
            strengthClass = 'very-strong';
            break;
    }
    
    strengthIndicator.textContent = `Password Strength: ${strengthText}`;
    strengthIndicator.className = strengthClass;
}

function updateCriteriaStatus(criteriaId, isValid) {
    const element = document.getElementById(criteriaId);
    if (isValid) {
        element.className = 'criteria valid';
        element.textContent = element.textContent.replace('✗', '✓');
    } else {
        element.className = 'criteria invalid';
        element.textContent = element.textContent.replace('✓', '✗');
    }
}
