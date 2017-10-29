//the below array of data is something you could request from a server and wait for it to be delivered to you (AJAX!!)

//data
var markers = [
  {id: 1, title: "Birka", type: "place", location: {lat: 59.3352163, lng: 17.5425896}, realWorld: "Birka", wikiURL: "6 ", imageURL: '<img src="https://c1.staticflickr.com/8/7410/11305501774_7e6f80cf5d_b.jpg" height="115" width="170">', authorsNote: "In our universe, Birka was a very important trade center during the Viking Age. In the world of the Witcher, Birka was a Nilfgardiaan village which burned down as a result of a tragic love affair between an elf and a human girl. Way to keep the flame of the relationship alive."},
  {id: 2, title: "Cintra", type: "place", location: {lat: 38.8356907, lng: -9.5007252}, realWorld: "Sintra", wikiURL: " ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/f/ff/Places_Cintra.png/revision/latest?cb=20090111105820" height="115" width="150">', authorsNote: "Cintra is the birthplace of Ciri, one of the protagonists in the Witcher books and game series. A rich country of knights and seafarers, it draws its inspiration from the pictureaque seaside city of Sintra, Portugal."},
  {id: 3, title: "..., elle'a?", type: "place", location: {lat: 64.7555353, lng: 16.9006833}, realWorld: "Swedish language", wikiURL: " ", imageURL: '<img src="https://img00.deviantart.net/0924/i/2017/002/e/c/jorvet_gvint_by_lubofforever-dau1b0r.jpg" height="115" width="83">', authorsNote: 'The Elves in the Witcher novels love using the word "..., elle\'a?", which roughly translates to "..., isn\'t it?". This catchy little word was very likely inspired by the Swedish "..., eller?", which literally means "..., or?".'},
  {id: 4, title: "Maribor", type: "place", location: {lat: 46.5536366, lng: 15.5745097}, realWorld: "Maribor", wikiURL: " ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/3/33/Places_Maribor.png/revision/latest?cb=20090528100759" height="115" width="150">', authorsNote: "Maribor, Slovenia, is a beautiful city, much like the rich and powerful Maribor in the Witcher-world Redania."},
  {id: 5, title: "Yennefer", type: "character", location: {lat: 51.6121678, lng: -3.0224666}, realWorld: "Guinevere", wikiURL: " ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/f/f0/The_Witcher_3_Wild_Hunt-Yennefer_of_Vengerberg.png/revision/latest?cb=20160326134030" height="150" width="65">', authorsNote: "Andrzej Sapkowski, the author of the Witcher saga, was an avid scholar of the Arthurian legends. As a result, Guinevere, king Arthur\'s wife, gave rise to Yennefer, Geralt of Rivia's love interest and the book series' most badass character."},
  {id: 6, title: "Francesca Findabair", type: "character", location: {lat: 53.6256191, lng: -8.2031646}, realWorld: "Findabair", wikiURL:" ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/0/0a/Francesca_indabair_Gwent.jpg/revision/latest/scale-to-width-down/348?cb=20170206095345" height="115" width="83">', authorsNote: '"Findabair" is the Irish equivalent of the name "Guinevere". Not a bad name for an Elven queen.'},
  {id: 7, title: "Voivode Bronibor", type: "character", location: {lat: 52.4268039, lng: 12.4034553}, realWorld: "Brandenburg an der Havel", wikiURL: " ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/c/c1/Temerian_Reinforcements_Gwent_card_art.jpg/revision/latest?cb=20170906160227" height="115" width="83">', authorsNote: 'Before Berlin was founded, Brandenburg an der Havel was the main point of contact with German culture for the surrounding Slavic tribes. The Czech name for Brandenburg,  "Bronibor", was given to a Temerian voivode and war hero in the books.'},
  {id: 8, title: "Dijkstra", type: "character", location: {lat: 51.9280573, lng: 4.4203664}, realWorld: "Edgar Dijkstra", wikiURL: " ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/c/c7/Tw3_journal_dijkstra.png/revision/latest?cb=20170315181519" height="115" width="83">', authorsNote: "Dijkstra may look like an oaf, but he\'s incredibly intelligent and cunning. He shares his name with Edgar Dijkstra, a Dutch genius and one of the founding fathers of modern computer science."},
  {id: 9, title: "King Esterad Thyssen", type: "character", location: {lat: 51.4111465, lng: 6.8130815}, realWorld: "August Thyssen", wikiURL: " ", imageURL: '<img src="https://vignette.wikia.nocookie.net/witcher/images/8/8b/Tw3_cardart_northernrealms_esterad.png/revision/latest?cb=20170426185826" height="115" width="83">', authorsNote: "August Thyssen was a German industrialist, who founded the German steel company Thyssen. In the Witcher saga, House Thyssen is the ruling dynasty of the industrious Northern country of Kovir."}
];

//model
var Location = function(location){
  this.title = ko.observable(location.title);
  this.id = ko.observable(location.id);
  this.wikiURL = ko.observable(location.wikiURL);
  this.active = ko.observable(true);
  //this.active = ko.observable(data.active);
};

var Character = function(character){
  this.title = ko.observable(character.title);
  this.id = ko.observable(character.id);
  this.wikiURL = ko.observable(character.wikiURL);
  this.active = ko.observable(true);
  //this.active = ko.observable(data.active);
};

//octopus
var ViewModel = function(){
  var self = this;

  this.locationsList = ko.observableArray([]);
  this.charactersList = ko.observableArray([]);
  this.showLocations = ko.observable(true);

  markers.forEach(function(marker){
    if(marker.type == "place"){
      self.locationsList.push( new Location(marker) )
    } else {
      self.charactersList.push( new Character(marker) )
    }
  });

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
    google.maps.event.trigger(mapMarkers[markerID], 'click');
    return true;
  };

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
  }

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
  }

  this.currentMarker = ko.observable( this.locationsList()[0] );
}

//view
ko.applyBindings(new ViewModel());
