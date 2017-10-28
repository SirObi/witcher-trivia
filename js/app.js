//the below array of data is something you could request from a server and wait for it to be delivered to you (AJAX!!)

//data
var markers = [
  {id: 1, title: "Birka", type: "place", location: {lat: 59.3352163, lng: 17.5425896}},
  {id: 2, title: "Cintra", type: "place", location: {lat: 38.8356907, lng: -9.5007252}},
  {id: 3, title: "..., elle'a?", type: "place", location: {lat: 64.7555353, lng: 16.9006833}},
  {id: 4, title: "Maribor", type: "place", location: {lat: 46.5536366, lng: 15.5745097}},
  {id: 5, title: "Yennefer", type: "character", location: {lat: 51.6121678, lng: -3.0224666}},
  {id: 6, title: "Francesca Findabair", type: "character", location: {lat: 53.6256191, lng: -8.2031646}},
  {id: 7, title: "Bronibor", type: "character", location: {lat: 52.4268039, lng: 12.4034553}},
  {id: 8, title: "Dijkstra", type: "character", location: {lat: 51.9280573, lng: 4.4203664}},
  {id: 9, title: "Esterad Thyssen", type: "character", location: {lat: 51.4111465, lng: 6.8130815}}
];


//model
var Location = function(location){
  this.title = ko.observable(location.title);
  this.id = ko.observable(location.id);
  this.active = ko.observable(true);
  //this.active = ko.observable(data.active);
};

var Character = function(character){
  this.title = ko.observable(character.title);
  this.id = ko.observable(character.id);
  this.active = ko.observable(true);
  //this.active = ko.observable(data.active);
};

//octopus
var ViewModel = function(){
  var self = this;

  this.locationsList = ko.observableArray([]);
  this.charactersList = ko.observableArray([]);
  this.showLocations = ko.observable(true);
  this.showCharacters = ko.observable(true);

  markers.forEach(function(marker){
    if(marker.type == "place"){
      self.locationsList.push( new Location(marker) )
    } else {
      self.charactersList.push( new Character(marker) )
    }
  });


  this.selectLocation = function(selectedLocation){
    self.currentMarker(selectedLocation)
  };

  this.toggleMarker = function(toggledMarker){
    markerID = toggledMarker.id() - 1;
    if(mapMarkers[markerID].getMap() == null){
      mapMarkers[markerID].setMap(map);
      toggledMarker.active(true);
    } else {
      mapMarkers[markerID].setMap(null);
      toggledMarker.active(false);
    }
    return true;
  };

  this.openMarker = function(toggledMarker){
    markerID = toggledMarker.id() - 1;
    console.log(markerID);
    google.maps.event.trigger(mapMarkers[markerID], 'click');
    return true;
  };

  this.currentMarker = ko.observable( this.locationsList()[0] );
}

//view
ko.applyBindings(new ViewModel());
