//----------------------------Client-Side
$(document).ready(function() {
    $('#submit').click(function() {
        addBook();
    });
});

function addBook() {
    const bookData = {
        bookcode: $("#book_code").val(),
        bookname: $("#book_name").val(),
        author1: $("#author1").val(),
        author2: $("#author2").val(),
        subject: $("#Subject").val(),
        tags: $("#tags").val()
    };

    fetch('/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Book added successfully');
            window.alert('Successfully Book Added');
            window.location = 'admin_portal.html'; // Redirect after successful addition
        } else {
            console.error('Error adding book');
            window.alert('Error adding book');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.alert('Error:', error);
    });
}
