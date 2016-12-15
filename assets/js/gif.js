$(document).ready(function() {

  //Create Variables
    // Array for buttons
    // URL for API call
    // Variable for clicked button's value to be passed through the API

  var buttons = ['Gob Bluth','Ron Swanson','Community','Aqua Teen Hunger Force'];
  var url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=';
  var queryValue;

  // Create buttons from array
  function createButtons() {

    // Start list from scratch to prevent any duplicates
    $(".buttonArea").empty();
    
    // Loops through array
    for (var i = 0; i < buttons.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("gifButton btn btn-lg btn-default");
      // Added a data-attribute
      a.attr("data-name", buttons[i]);
      // Provided the initial button text
      a.text(buttons[i]);
      // Added the button to the buttons-view div
      $(".buttonArea").append(a);
    }
  };


  // Run this when button is clicked 
    // Clear out previous results
    // Create AJAX call using Giphy api url + value of button clicked
    // Display gifs with that button value and their rating
  function gifDisplay() {

    $('.results').empty();
    url = url + $(this).data('name');

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: url,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var gif = response.data;
      for (var i = 0; i < 10; i++) {
        
        // Creates a div to hold the gif
        var gifDiv = $('<div>');
        gifDiv.addClass('gif col-md-6 col-xs-12 col-sm-6');
        // Retrieves the Rating Data
        // Creates an element to have the rating displayed
        gifDiv.append('<h4>Rated: '+gif[i].rating + '</h4>');

        // Displays the rating
        // Retrieves the release year
        // Creates an element to hold the release year
        gifDiv.append('<img class="gifImg" src='+gif[i].images.original_still.url + ' data-still=' + gif[i].images.original_still.url + ' data-animate=' + gif[i].images.original.url + ' data-state="still"/>');
        // Displays the release year
        // Retrieves the plot
        // Creates an element to hold the plot

        // Puts the entire Movie above the previous movies.
        $('.results').prepend(gifDiv);

      }
      var a = $('div.results > div');

      for( var j = 0; j < a.length; j+=2 ) {
        a.slice(j, j+2).wrapAll('<div class="row"></div>');
      }

    });


    url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=';
  }

  // Form input click
    // Push value of input box into button array
    // Prevent default function from happening (reload)
    // Refresh buttons
  $('.submit').on('click',function(event) {
    event.preventDefault();
    var newButton = $('#userInput').val().trim();
    buttons.push(newButton);
    createButtons();
  });


  // Click a button


  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".gifButton", gifDisplay);

  // When gif is clicked it'll toggle between animated and still

  $(document).on('click','.gifImg', function(){
    var state = $(this).data('state')
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).data('state', 'animate');
      }
      if (state === 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).data('state', 'still');
      }
  });


 createButtons();


});