//Fetches link to related content on Wikipedia
//based on the marker selected through the menu
function wiki(phrase){
  phrase = phrase
  var witcherURL =
  'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + phrase + '&callback=callback';

  $.ajax({
    url: witcherURL,
    dataType: "jsonp",
    success: function(response) {
      $('#inspiration').append(
        '<a href="'+ response[3][0] + '"> Link</a>')},
    error: function(){
      result = "Sorry, Wikipedia content not found"}
    });
  }
