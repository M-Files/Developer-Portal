window.executeSearch = (function(){
    function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
  
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
  
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }
  
  var searchTerm = getQueryVariable('query');

  if (!searchTerm)
    return;
    document.getElementById('query').setAttribute("value", searchTerm);
    document.getElementById('query-2').setAttribute("value", searchTerm);

  // Initalize lunr with the fields it will be searching on.
  var idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('content');

    for (var key in window.searchData) { // Add the data to lunr
            this.add({
            'id': key,
            'title': window.searchData[key].title,
            'category': window.searchData[key].category
            });
        }
    });

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.searchData); // We'll write this in the next section

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
  
    if (results.length) { // Are there any results?
      var appendString = '';
  
      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<li><h3><a href="' + item.url + '">' + item.title + '</a></h3>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
      }
  
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  });