//-----------------client-side
$(document).ready(function() {
    // Function to fetch books data from the backend
    function getBooksData() {
        fetch('/books')
            .then(response => response.json())
            .then(books => {
                // Update the UI with books data
                displayBooks(books);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                // Handle error if needed
            });
    }

    // Function to fetch users data from the backend
    function getUsersData() {
        fetch('/users')
            .then(response => response.json())
            .then(users => {
                // Update the UI with users data
                displayUsers(users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                // Handle error if needed
            });
    }

    // Function to display books in the UI
    function displayBooks(books) {
        const booksContainer = document.getElementById('books-container');
        booksContainer.innerHTML = ''; // Clear previous content
        books.forEach(book => {
            // Create HTML elements for each book and append to the container
            const bookDiv = document.createElement('div');
            // Populate bookDiv with book data (title, author, etc.)
            bookDiv.innerHTML = `
                <h2>${book.bookcode}-${book.bookname}</h2>
                <h3>${book.author1}, ${book.author2}</h3>
                <h3>${book.subject}</h3>
                <p>${book.tags}</p>
                <hr>
            `;
            booksContainer.appendChild(bookDiv);
        });
    }

    // Function to display users in the UI
    function displayUsers(users) {
        const usersContainer = document.getElementById('users-container');
        usersContainer.innerHTML = ''; // Clear previous content
        users.forEach(user => {
            // Create HTML elements for each user and append to the container
            const userDiv = document.createElement('div');
            // Populate userDiv with user data (name, roll number, etc.)
            userDiv.innerHTML = `
                <h2>${user.name}</h2>
                <h3>Roll Number: ${user.Roll_Number}</h3>
                <h3>Date of Birth: ${user.DOB}</h3>
                <h3>Email: ${user.Email}</h3>
                <!-- Add logic to display books associated with users -->
                <hr>
            `;
            usersContainer.appendChild(userDiv);
        });
    }

    // Trigger fetching data and updating UI
    getBooksData();
    getUsersData();
});
