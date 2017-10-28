//the below array of data is something you could request from a server and wait for it to be delivered to you (AJAX!!)

//data
var locations = [
  {title: "Birka", location: {lat: 59.3352163, lng: 17.5425896}},
  {title: "Cintra", location: {lat: 38.8356907, lng: -9.5007252}},
  {title: "..., elle'a?", location: {lat: 64.7555353, lng: 16.9006833}},
  {title: "Maribor", location: {lat: 46.5536366, lng: 15.5745097}},
];

var characters = [
  {title: "Yennefer", location: {lat: 51.6121678, lng: -3.0224666}},
  {title: "Francesca Findabair", location: {lat: 53.6256191, lng: -8.2031646}},
  {title: "Bronibor", location: {lat: 52.4268039, lng: 12.4034553}},
  {title: "Dijkstra", location: {lat: 51.9280573, lng: 4.4203664}},
  {title: "Esterad Thyssen", location: {lat: 51.4111465, lng: 6.8130815}},
];

//model
var Location = function(location){
  this.title = ko.observable(location.title);
  //this.active = ko.observable(data.active);
};

var Character = function(character){
  this.title = ko.observable(character.title);
  //this.active = ko.observable(data.active);
};

//octopus
var ViewModel = function(){
  var self = this;

  this.locationsList = ko.observableArray([]);
  this.charactersList = ko.observableArray([]);
  this.showLocations = ko.observable(true);
  this.showCharacters = ko.observable(true);

  locations.forEach(function(locationItem){
    self.locationsList.push( new Location(locationItem) )
  });

  characters.forEach(function(characterItem){
    self.charactersList.push( new Character(characterItem) )
  });

  this.selectLocation = function(selectedLocation){
    self.currentMarker(selectedLocation)
  };

  this.currentMarker = ko.observable( this.locationsList()[0] );
}

//view
ko.applyBindings(new ViewModel());
