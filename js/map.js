var map;

var mapMarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: {lat: 54.675605, lng: -4.4455836},
    zoom: 4,
    styles: [
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
      }
    ]
});
google.maps.event.trigger(map, "resize");

var largeInfoWindow = new google.maps.InfoWindow({
  maxwidth: 350
});
var bounds = new google.maps.LatLngBounds();

var image = {
  url: 'witcher.png'
};

for (var i = 0; i<markers.length; i++){
  var position = markers[i].location;
  var title = markers[i].title;
  var authorsNote = markers[i].authorsNote;
  var inspiredBy = markers[i].realWorld;
  var imageURL = markers[i].imageURL;
  console.log(imageURL);

  var marker = new google.maps.Marker({
    map: map,
    position: position,
    icon: image,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i,
    imageURL: imageURL,
    realWorld: inspiredBy,
    inspiredBy: "Real world inspiration: " + inspiredBy,
    authorsNote: authorsNote
  });
  mapMarkers.push(marker);
  bounds.extend(marker.position);
  marker.addListener('click', function(){
    populateInfoWindow(this, largeInfoWindow)
    currentMkr = this;
    wiki(currentMkr.realWorld);
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ currentMkr.setAnimation(null); }, 750);
  });
}
map.fitBounds(bounds);

function populateInfoWindow(marker, infowindow){
  if(infowindow.marker != marker){
    infowindow.marker = marker;
    html = '<div><h2>' + marker.title + '</h2>'
    html += '<p>' + marker.inspiredBy + '</p>'
    html += marker.imageURL + '<br /><br />'
    html += '<p>' + marker.authorsNote + '</p>'
    html += '</div>'
    infowindow.getContent(html);
    infowindow.setContent(html);
    infowindow.open(map, marker);
    infowindow.addListener('closeclick', function(){
      infowindow.setMarker = null;
    });
  }
}
}
