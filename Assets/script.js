// js for weather dashboard
// written by Letty Bedard

$(function(){
  
  //  DECLARATIONS
  let recentList;
  let apiKey = "e289f98da0cc0e60eb332ebfc1bf33ee";

  //  REFERENCES
  let $search = $("#search");
  let $recent = $("#recent");
  let $current = $("#current");
  let $cards = [
    $("#card1"), 
    $("#card2"), 
    $("#card3"), 
    $("#card4"), 
    $("#card5")];

  //  FUNCTIONS

  //get current weather for location by zip
  //*** to do - pull out the appends as a function
  function getWeatherByZip(zipCode){      
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;

    //current forecast
    $.get(queryUrl).then(function(response){
      console.log(response);
      $current.append($("<h3>")
                      .text(`${response.name} ${moment().format("MM/DD/YYYY")}`));
      $current.append($("<div>")
                      .html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='icon of weather'>"));              
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .html(`Temperature: ${Math.floor(response.main.temp)}&deg;F`));
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .html(`Feels Like: ${Math.floor(response.main.feels_like)}&deg;F`));                
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .text(`Wind speed: ${response.wind.speed} m.p.h.`));
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .text(`Humidity: ${response.main.humidity}%`));    
    });
    
    queryUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=${apiKey}&units=imperial`;

    //5day forecast
    $.get(queryUrl).then(function(response){
      console.log(response);
      for (let i=0; i < 5; i++){
        let theDay = response.list[(8*i+3)];

        console.log(theDay);
        $cards[i].empty();
        $cards[i].append($("<h5>")
                        .html(moment().add((i+1), 'days').format("MM/DD/YYYY")));
        $cards[i].append($("<div>")
                        .addClass("card-body p-2")
                        .html("<img src='http://openweathermap.org/img/w/" + theDay.weather[0].icon + ".png' alt='icon of weather'>"));              
        $cards[i].append($("<div>")
                        .addClass("card-body p-2")
                        .html(`Temp: ${Math.floor(theDay.main.temp)}&deg;F`));              
        $cards[i].append($("<div>")
                        .addClass("card-body p-2")
                        .text(`Humidity: ${theDay.main.humidity}%`));    
      }                
    });
  }

  //get current weather for location by name
  function getWeatherByName(location){
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},us&appid=${apiKey}&units=imperial`;

    $.get(queryUrl).then(function(response){
      console.log(response);
      $current.append($("<h3>")
                      .text(`${response.name} ${moment().format("MM/DD/YYYY")}`));
      $current.append($("<div>")
                      .html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='icon of weather'>"));              
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .html(`Temperature: ${Math.floor(response.main.temp)}&deg;F`));
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .html(`Feels Like: ${Math.floor(response.main.feels_like)}&deg;F`));                
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .text(`Wind speed: ${response.wind.speed} m.p.h.`));
      $current.append($("<div>")
                      .addClass("w-100 p-2")
                      .text(`Humidity: ${response.main.humidity}%`));     
    });

    queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location},us&appid=${apiKey}&units=imperial`;

    //5day forecast
    $.get(queryUrl).then(function(response){
      console.log(response);
      for (let i=0; i < 5; i++){
        let theDay = response.list[(8*i+3)];

        console.log(theDay);
        $cards[i].empty();
        $cards[i].append($("<h5>")
                        .html(moment().add((i+1), 'days').format("MM/DD/YYYY")));
        $cards[i].append($("<div>")
                        .addClass("card-body p-2")
                        .html("<img src='http://openweathermap.org/img/w/" + theDay.weather[0].icon + ".png' alt='icon of weather'>"));              
        $cards[i].append($("<div>")
                        .addClass("card-body p-2")
                        .html(`Temp: ${Math.floor(theDay.main.temp)}&deg;F`));              
        $cards[i].append($("<div>")
                        .addClass("card-body p-2")
                        .text(`Humidity: ${theDay.main.humidity}%`));    
    } 
  });
}

  //displays location forecast in right pane
  function showThePlace(locationObj){
    $current.empty();
    if (locationObj.zip){
      console.log("get weather by zip");
      getWeatherByZip(locationObj.zip);
    }
    else {
      console.log("get weather by name");
      getWeatherByName(encodeURI(locationObj.name));
    }               
  }      
  
  //empty and draw recent, show most recent in results
  function renderAll(){
    $recent.empty();
    recentList = JSON.parse(localStorage.getItem("recentList"));
    //console.log(recentList);
    if (recentList === null){
      $current.text("Try entering your zip to the left to see the local weather!");
    }
    else {
      recentList.forEach(element => {
        //console.log(element);
        //why doesn't this work?
        // let place = element.zip || element.name;       
        if (element.zip){
          //console.log("use zip")
          place = element.zip;
        }
        else {
          //console.log("use name")
          place = element.name;
        }
        //console.log(place);
        $recent.append($("<div>")
                      .attr("data-place", place)
                      .text(place)
                      .addClass("recentPlace"));
      });
      $recent.append($("<div>")
                    .attr("id", "reset")
                    .addClass("mt-3")
                    .css("font-weight", "bold")
                    .text("clear recent"));    
      showThePlace(recentList[0]);
    }
  }
    
  //  EVENT LISTENERS
  
  //search button is pushed, add search term to top of recent list and show this place
  $(document).on("click", "#srchBtn", function(){
    recentList = JSON.parse(localStorage.getItem("recentList"));
    if (recentList === null){
      recentList = [];
    }
    let thisInput = $search.val().trim();
    //assume good input for now
    //console.log(thisInput);
    if ($.isNumeric(thisInput)){
      recentList.unshift({name: null, zip: thisInput});
    }
    else {
      recentList.unshift({name: thisInput, zip: null});
    }
    //console.log(recentList);
    localStorage.setItem("recentList", JSON.stringify(recentList));
    renderAll();
  });

  //when clear recent is clicked, empty that div and clear local
  $(document).on("click", "#reset", function(){
    localStorage.removeItem("recentList");
    renderAll();
  });

  //when one of the recent locations is clicked show that weather
  $(document).on("click", ".recentPlace", function(){
    console.log($(this));
    $current.empty()
    let goHere = this.attr("data-place");
    if ($.isNumeric(goHere)){
      getWeatherByZip(goHere);
    }
    else {
      console.log("get weather by name");
    }
  });

renderAll();
  
});