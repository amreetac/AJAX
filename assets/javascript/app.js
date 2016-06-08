// Initial array of musicians
	var musicians = ['Britney Spears', 'Elton John', 'Ringo', 'Jimmy Hendrix', 'Michael Jackson', 'Justin Timberlake', 'Justin Bieber', 'Selena Gomez', 'Hilary Duff', 'Taylor Swift', 'Janet Jackson', 'Madonna', 'John Lennon', 'Kanye West', 'Celine Dion', 'Queen', 'Linkin Park', 'Mozart', 'Beethoven', 'Tori Amos', 'John Stamos'];
	var move = 0;
	// ========================================================
	// displayMusicianInfo function now re-renders the HTML to display the ratings and images
	function displayMusicianInfo(){
		var p = $(this).attr('data-person');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";


		// Creates AJAX call for the specific movie being
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			$('#musiciansView').empty();
			var results = response.data;
			// Creates a generic div to hold the musician
			for (var i = 0; i < results.length; i++) {
				var musicianDiv = $('<div class="musicartists">');
				// Retrieves the Rating Data
				var rating = results[i].rating;
				// Creates an element to have the rating displayed
				var pOne = $('<p>').text( "Rating: " + rating);
				// Displays the rating
				musicianDiv.append(pOne);

				// Creates an element to hold the image.  Attempting a move function or if statement for 
				// click on picture to get it to move.
				if (move == 1) {
				  var image = $('<img>').attr("src", results[i].images.fixed_height.url);
				  //move = 0;
				} else if (move == 0) {
				  var image = $('<img>').attr("src", results[i].images.fixed_height_still.url);
				  //move = 1;
				}
				//move = 1 - move;
				// Appends the image
				musicianDiv.append(image);
				//musicianDiv.prepend(image);
				// Puts the ten images of one musician above the previous musicians.
				$('#musiciansView').prepend(musicianDiv);
			}
		move = 1 - move;
	});
	}
	// ========================================================
//Create a new function for the picture to move

	function clickOnImage(){
				var moveIt = $('.musicartists').css("height","200px");
	}

	// Generic function for displaying musician data
	function renderButtons(){
		// Deletes the musicians prior to adding new musicians (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();
		// Loops through the array of musicians
		for (var i = 0; i < musicians.length; i++){
			// Then dynamicaly generates buttons for each musician in the array
			// Note the jQUery syntax here...
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('musician'); // Added a class
		    a.attr('data-person', musicians[i]); // Added a data-attribute
		    a.text(musicians[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}
	// ========================================================
	// This function handles events where one button is clicked
	$('#addMusician').on('click', function(){
		// This line of code will grab the input from the textbox
		var musician = $('#musician-input').val().trim();
		// The musician from the textbox is then added to our array
		musicians.push(musician);

		// Our array then runs which handles the processing of our musician array
		renderButtons();
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})
	// ========================================================
	// Generic function for displaying the musician info
	$(document).on('click', '.musician', displayMusicianInfo);
	// We want to make an event handler for the images
	$(document).on('click', '.musicartists', clickOnImage);
	// ========================================================
	// This calls the renderButtons() function
	renderButtons();