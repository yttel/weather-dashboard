// js for weather dashboard
// written by Letty Bedard

$(function(){
  
  //  DECLARATIONS
  let recentList = null;
  let apiKey = "e289f98da0cc0e60eb332ebfc1bf33ee";
  //let zipCode = 0;
  //let queryUrl = `api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`

  //  REFERENCES
  let $search = $("#search");
  let $recent = $("#recent");

  //  FUNCTIONS

  //grabs the weather at location ?with days offset (ie 1 means tomorrow etc)
  function getWeather(location){
    return $.get(`api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${apiKey}`);
  }

  //displays location in right pane
  function showThePlace(location){
    if (location){
      getWeather(location, 0);      
    }
  }
  
  //empty and draw recent, show most recent in results
  function renderAll(){
    $recent.empty();
    recentList = JSON.parse(localStorage.getItem("recentList"));
    
  }

  function addThis(location){
    //unshift this location to local storage and left pane
  }


  
  //  EVENT LISTENERS
  
  //search button is pushed, add search term to top of recent list and show this place
  
  //clear recent is clicked, empty the recent pane
  
  //when recent div is clicked, move that div to the top and show this place
  
  $.get(`api.openweathermap.org/data/2.5/weather?zip=03833,us&appid=${apiKey}`)
    .then(function(response){
      console.log(response);
    }, console.log("get error"));

  
});