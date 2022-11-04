//dom elements
const inputValue = $("#input")
const bg = $("section");
const title = $(".movie-title h1");
const poster = $(".poster-container img");
const searchBtn = $(".search-icon");
const loadingScreen = $(".loading-screen");
const bar = $(".bar");
const menu = $(".menu");
const siteName = $("title");
const alertBg = $(".alert-bg");
const alertBox = $(".alert-box");
const timer = $(".timer span");
const alertBtn = $(".alert-btn button");
const posterContainer = $(".poster-container");
const movieDetails = $(".movie-details");


//global variables
let movieData;
let btnClickData = false;
let countDown;


//fetching movie data
let fetchMovieData = async (input) => {
    let URL = `https://www.omdbapi.com/?i=tt3896198&apikey=447a190d&t=${input}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        movieData = data;
        //console.log(movieData)
        if(movieData.Response != "False"){
            posterContainer.addClass("show-poster")
            loadingScreen.addClass("data-loaded");
            if(btnClickData){
                domDataUpdate(movieData);
            }else{
                defaultData(movieData)
            }
        }else{
            console.log("Movie not found")
            let seconds = 5;
            timer.text(seconds);
            alertBox.addClass("show-alert-box");
            alertBg.addClass("show-alert-box");
            countDown = setInterval( () => {
                seconds--;
                timer.text(`${seconds}`)
            },1000)
            setTimeout( () => {
                removeAlertBox();
            },5000)
        }
        
    } catch (error) {
        
    }
}

//for removing alert box class
let removeAlertBox = () => {
    alertBox.removeClass("show-alert-box");
    alertBg.removeClass("show-alert-box");
    clearInterval(countDown);
}

//alert pop up click event
alertBtn.click( () => {
    removeAlertBox();
})

//default data
let movieList = ["Captain America", "antman", "aquaman", "doctor strange", "avenger", "black panther", "batman", "black widow","asur","sacred games", "jumanji", "martian", "source code", "dhoom", "the batman", "joker", "kota factory" , "immature", "aspirants", "winter soldier", "Interstellar", "Titanic"];


//data change in every 3.5 sec
let movieslideShow = setInterval( () => {
    let randomMovie = Math.random();
    fetchMovieData(`${movieList[Math.floor(randomMovie * movieList.length)]}`)

}, 3500)

//click event
searchBtn.click(() => {
    if(inputValue.val() != ""){
        fetchMovieData(inputValue.val().trim());
        clearInterval(movieslideShow);
        btnClickData = true;
    }
})


//change dom data on click 
let domDataUpdate = (data) => {
    let firstElm = data;
    bg.css('backgroundImage',`url(${firstElm.Poster})`);
    title.text(`${firstElm.Title}`);
    poster.attr("src", `${firstElm.Poster}`);
    siteName.text(`${firstElm.Title}`);

   //empteing the movie details div
   movieDetails.html(null);
    
   //append all details here
   for (let key in data) {
       // console.log(key, data[key]);
       if(key === "Director" || key === "Actors" || key === "Released" || key === "Genre" || key === "imdbRating" || key === "Language" || key === "Runtime" || key === "Country" || key === "imdbVotes") {
           let div = document.createElement("div");
           div.append(`${key} : ${data[key]}`);
           //console.log(div)
           movieDetails.append(div)
       }
   }
}



//default data change on interval
let defaultData = (data) => {
    let randomNumber = Math.random();
    let firstElm = data;
    bg.css('backgroundImage',`url(${firstElm.Poster})`);
    title.text(`${firstElm.Title}`);
    poster.attr("src", `${firstElm.Poster}`);
    siteName.text(`${firstElm.Title}`);
    
    //empteing the movie details div
    movieDetails.html(null);
    
    //append all details here
    for (let key in data) {
        // console.log(key, data[key]);
        if(key === "Director" || key === "Actors" || key === "Released" || key === "Genre" || key === "imdbRating" || key === "Language" || key === "Runtime" || key === "Country" || key === "imdbVotes") {
            let div = document.createElement("div");
            div.append(`${key} : ${data[key]}`);
            //console.log(div)
            movieDetails.append(div)
        }
    }
}

//responsive js
//showing menubar for mobile;
bar.click( () => {
    menu.toggleClass("active")
})

