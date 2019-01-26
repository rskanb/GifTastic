

var animal = ["dog","cat", "rabbit","hamster","skunk", "goldfish", "bird", "ferret", "sugar glider","chinchilla","hedgehoge", "hermit crab", "gerbil","pygmy", "chicken"];

//Function to add animal button
function animalButtons(){
    $("#animal-buttons").empty();
    for(var i =0; i<animal.length; i++){
        var ab = $("<button>");
        ab.addClass("animal");
        ab.attr("data-button", animal[i]);
        ab.text(animal[i]);
        $("#animal-buttons").append(ab);
    }
};

//Adding animal data value on submitting button
$(document).on("click", "#add-animal", function(event){
    event.preventDefault();
    var animalInput = $("#animal-input").val().trim();
    animal.push(animalInput);
    var animalInput = $("#animal-input").val('');
    animalButtons();
});

//Function to display Animal from GIPHY
function displayAnimalGif(){
    var animal = $(this).attr("data-button");
    console.log(animal);
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key={}&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response){
        $("#animal-view").empty();
        console.log(response);
        for(var i =0; i<10; i++){
        var newGifDiv = $("<div>");
        var rating = response.data[i].rating;
        var newRating = $("<p>").text("Rating: " + rating);
        var newImg = $("<img width ='300px'>");
        newImg.addClass("add-images");
        newImg.attr("data-state", "animate")
        newImg.attr("data-still", response.data[i].images.fixed_height_still.url);
        newImg.attr("data-animate", response.data[i].images.fixed_height.url);
        newImg.attr('src', response.data[i].images.fixed_height.url);
        newGifDiv.append(newRating);
        newGifDiv.append(newImg);

        // console.log(newImg);
        // newGifDiv.append(newImg);
        $("#animal-view").append(newGifDiv);
      }
    });
};

$(document).on("click", ".animal", displayAnimalGif);

//Dynamic chaning GIPHY
$(document).on("click", ".add-images", function(){
    var state = $(this).attr('data-state');
    if(state === "animate"){
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', "still")
    }
    else {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', "animate");
    }
    console.log(state);
});


animalButtons();
