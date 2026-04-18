var search_delay = 250;
var items_per_page = 30;


// Channels pagination.
var channels = new List('channels', {
  valueNames: ['title', 'date', 'count'],
  searchColumns: ['title'],
  searchDelay: search_delay,
  pagination: true,
  page: items_per_page
});


// Movies pagination.
var movies = new List('movies', {
  valueNames: ['title', 'date', 'runtime', 'count', {name: 'genres', attr: 'data-genres'}],
  searchColumns: ['title'],
  searchDelay: search_delay,
  pagination: true,
  page: items_per_page
});

// Movies filtering.
var genreFilter = document.getElementById("genre-filter");
genreFilter.onchange = updateList;

function updateList() {
  var genre = genreFilter.value;

  movies.filter(function(item) {
    if (genre == "") {
      return true;
    } else {
      return item.values().genres.indexOf(String(genre)) >= 0;
    }
  });

  movies.update();
}
