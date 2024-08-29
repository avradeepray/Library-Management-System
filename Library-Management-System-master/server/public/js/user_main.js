//----client
$(document).ready(function() {
    const fetchBooks = () => {
        $.ajax({
            url: '/books', // Endpoint to fetch books data from the server
            method: 'GET',
            success: function(books) {
                books.forEach(book => {
                    $('#books').append(
                        `<div>
                            <h2>${book.bookcode}-${book.bookname}</h2>
                            <h3>${book.author1}, ${book.author2}</h3>
                            <h3>${book.subject}</h3>
                            <p>${book.tags}</p>
                        </div><hr>`
                    );
                });
            },
            error: function(error) {
                console.log('Error fetching books:', error);
            }
        });
    };

    const fetchUserData = (email) => {
        $.ajax({
            url: `/user/${email}`, // Endpoint to fetch user data by email
            method: 'GET',
            success: function(userData) {
                $('#about_me').empty().append(
                    `<div>
                        <h1>Name: ${userData.name}</h1>
                        <h2>Roll Number: ${userData.Roll_Number}</h2>
                        <h2>Date of Birth: ${userData.DOB}</h2>
                        <h2>Email Id: ${userData.Email}</h2><hr>
                        <h2>Books</h2>
                        <ul>${userData.books.map(book => `<li>${book}</li>`).join('')}</ul>
                    </div>`
                );
            },
            error: function(error) {
                console.log('Error fetching user data:', error);
            }
        });
    };

    // Assume you have the user's email
    const userEmail = 'user@example.com';

    fetchBooks();
    fetchUserData(userEmail);

    $('#log_button').click(function() {
        logout();
    });
});

function logout() {
    $.ajax({
        url: '/logout', // Endpoint to handle logout in the server
        method: 'GET',
        success: function() {
            console.log('Logout done');
            window.location = 'admin_login.html';
        },
        error: function(error) {
            console.log('Error during logout:', error);
        }
    });
}

