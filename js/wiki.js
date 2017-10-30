function wiki(){
  phrase = $('#inspiration').text();
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
