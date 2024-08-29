// ------------------------------client-side
$(document).ready(function(){    
    // ...

    $('#submit_data').click(function() {
      login();
    });

    // ...

    function login(){
        var email = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                console.log('Login successful');
                window.location = 'admin_portal.html'; 
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data && data.message) {
                window.alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('Error:', error);
        });
    }
});
