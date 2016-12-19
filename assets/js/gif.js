$(document).ready(function() {

  //Create Variables
    // Array for topics
    // URL for API call
    // Variable for clicked button's value to be passed through the API

  var topics = ['Gob Bluth','Ron Swanson','Community','Archer', 'WWE'];
  var url = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=20&q=';
  var queryValue;

  // Create topics from array
  function createTopics() {

    // Start list from scratch to prevent any duplicates
    $(".buttonArea").empty();
    
    // Loops through array
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      // Adds a class of gif to our button
      a.addClass("gifButton btn btn-lg btn-default btn-block");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      a.append(topics[i]);
      $(".buttonArea").append(a);
    }
  };


  // Run this when button is clicked 
    // Clear out previous results
    // Create AJAX call using Giphy api url + value of button clicked
    // Display gifs with that button value and their rating
  function gifDisplay() {

    $('.results').empty();

    // Add name of Gif list on top
    $('.results').append('<h2 class="result_title">Now Playing: <span>' + $(this).data('name') + ' Gifs!</span></h2>' );

    // removes blank spaces in names and puts %20 in url
    url = url + escape($(this).data('name'));
    console.log(url);
    // Creates AJAX call for the specific button being clicked
    $.ajax({
      url: url,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var gif = response.data;
      for (var i = 0; i < 10; i++) {
        
        // Creates a div to hold the gif and appends it to .results class on page (in right-column)
        var gifDiv = $('<div>');
        gifDiv.addClass('gif col-md-4 col-xs-12 col-sm-4');
        gifDiv.append('<img class="gifImg" src='+gif[i].images.fixed_height_still.url + ' data-still=' + gif[i].images.fixed_height_still.url + ' data-animate=' + gif[i].images.fixed_height.url + ' data-state="still"/>');
        gifDiv.append('<span class="label label-default">Rated: '+gif[i].rating + '</span>');
        $('.results').append(gifDiv);
      }

      // Create rows for even height columns
      var row = $('div.results > div');

      for( var j = 0; j < row.length; j+=3 ) {
        row.slice(j, j+3).wrapAll('<div class="row"></div>');
      }

    });
    // Reset URL Value after everything loads
    url = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=20&q=';
  }

  // Form input click
    // Push value of input box into button array
    // Prevent default function from happening (reload)
    // Refresh topics
  $('.submit').on('click',function(event) {
    event.preventDefault();
    

    if ($('#userInput').val() != '') {
      var newButton = $('#userInput').val().trim();
      topics.push(newButton);
      createTopics();
    }
    else {
      alert("You didn't enter anything, dum-dum!");
      createTopics();
    }
    $('#userInput').val("");
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


 createTopics();


});