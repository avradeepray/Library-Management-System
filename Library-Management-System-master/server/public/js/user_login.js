//-------------client-side
$(document).ready(function() {
    // Function to register a new user
    function registerUser() {
        const name = $("#usr_name").val();
        const email = $("#usr_email").val();
        const password = $("#usr_pass").val();
        const rollNumber = $("#usr_roll").val();
        const dateOfBirth = $("#usr_dob").val();

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                rollNumber,
                dateOfBirth
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('User registered successfully');
                // Handle success (redirect, show message, etc.)
            } else {
                console.error('Error registering user');
                // Handle registration error
            }
        })
        .catch(error => {
            console.error('Error registering user:', error);
            // Handle network error
        });
    }

    // Function to log in a user
    function loginUser() {
        const username = $("#username").val();
        const password = $("#password").val();

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Login successful');
                // Handle successful login (redirect, show message, etc.)
            } else {
                console.error('Invalid email or password');
                // Handle login failure
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            // Handle network error
        });
    }

    $('#log_me_in').click(function() {
        loginUser();
    });

    $('#register_new').click(function() {
        registerUser();
    });

    // ... Other code remains unchanged
});

