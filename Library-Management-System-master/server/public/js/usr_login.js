$(document).ready(function () {
  // When the link is clicked
  $('.message a').click(function(){
    // Animate toggle
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");

    // AJAX request to get data from your backend
    $.ajax({
      url: '/getDataFromMongoDB', // Replace with your endpoint
      method: 'GET',
      success: function(response) {
        // Handle the response here
        console.log(response); // Log the response or update UI accordingly
      },
      error: function(error) {
        console.error(error);
        // Handle errors if any
      }
    });
  });
});

