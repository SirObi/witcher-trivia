//Data
//imported from markers.js


//Model
//Location and Character represent the two categories of markers
//that should appear on the map.
var Location = function(location){
  this.title = ko.observable(location.title);
  this.id = ko.observable(location.id);
  this.wikiURL = ko.observable(location.wikiURL);
  this.realWorld = ko.observable(location.realWorld);
  this.active = ko.observable(true);
};

var Character = function(character){
  this.title = ko.observable(character.title);
  this.id = ko.observable(character.id);
  this.wikiURL = ko.observable(character.wikiURL);
  this.realWorld = ko.observable(character.realWorld);
  this.active = ko.observable(true);
};

//View Model
var ViewModel = function(){
  var self = this;
  this.locationsList = ko.observableArray([]);
  this.charactersList = ko.observableArray([]);
  this.markersList = ko.observableArray([]);

  //Populates observable arrays with data from database
  markers.forEach(function(marker){
    if(marker.type == "place"){
      self.locationsList.push( new Location(marker) );
      self.markersList.push( new Location(marker) );
    } else {
      self.charactersList.push( new Character(marker) );
      self.markersList.push( new Location(marker) );
    }
  });

  //Tracks last marker opened through menu
  this.currentMarker = ko.observable( (this.locationsList()[0]) );
  wiki(self.currentMarker().realWorld());

  //Hides and shows markers by modifying data
  //available to Google Maps API.
  //Markers are also hidden from the menu and cannot be opened
  //unless visible.
  this.toggleMarker = function(toggledMarker){
    markerID = toggledMarker.id() - 1;
    if(mapMarkers[markerID].getMap() === null){
      mapMarkers[markerID].setMap(map);
      toggledMarker.active(true);
    } else {
      mapMarkers[markerID].setMap(null);
      toggledMarker.active(false);
    }
    return true;
  };

  //Handles selecting markers through menu
  //Opens marker on map and makes a call to Wikimedia API
  this.openMarker = function(toggledMarker){
    self.currentMarker(toggledMarker);
    window.wiki(self.currentMarker().realWorld());
    markerID = toggledMarker.id() - 1;
    google.maps.event.trigger(mapMarkers[markerID], 'click');
    return true
  };

  // Hide/show all locations
  this.toggleAllLocations = function(locationsList, mapMarkers){
    if(locationsList[0].active()){
      locationsList.forEach(function(location){
        location.active(false);
        window.mapMarkers[location.id()-1].setMap(null);
      });
    } else {
      locationsList.forEach(function(location){
        location.active(true);
        window.mapMarkers[location.id()-1].setMap(map);
      });
    }
  };

  // Hide/show all characters
  this.toggleAllCharacters = function(charactersList, mapMarkers){
    if(charactersList[0].active()){
      charactersList.forEach(function(location){
        location.active(false);
        window.mapMarkers[location.id()-1].setMap(null);
      });
    } else {
        charactersList.forEach(function(location){
        location.active(true);
        window.mapMarkers[location.id()-1].setMap(map);
      });
    }
  };
};

//Initialize ViewModel, make initial call to Wikimedia
viewModel = new ViewModel()
ko.applyBindings(viewModel);
