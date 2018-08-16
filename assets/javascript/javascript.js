$(document).ready(function() {
    // Characters array
    var topics = ["Michael Scott", "Dwight Schrute", "Jon Snow", "Phoebe Buffay", "Sheldon Cooper", "Meredith Grey", "Joey Tribbiani", "Chandler Bing", "Spock", "Carlton Banks", "Lucy Ricardo", "SpongeBob"];
    
    // Function that displays buttons
    // Empty the div
    function displayGifButtons(){
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("character");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtons").append(gifButton);
        }
    }
    // Add a new character button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var character = $("#character-input").val().trim();
        if (character == ""){
          return false;
        }
        charaters.push(character);
    
        displayGifButtons();
        return false;
        });
    }

    // Display gifs
    function displayGifs(){
        var character = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=9jL6LV3jkF1KIZqpBJmJ6mvXMuzSxabL";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data;
            if (results == ""){
              alert("Sorry! There is not a gif found for that character.");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                // rating
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                // Store still image
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                // Still image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                // Animation
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                // Image state
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });