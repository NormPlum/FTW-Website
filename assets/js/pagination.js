var search_delay = 250;
var items_per_page = 30;


// Channels pagination.
var channels = new List("channels", {
  valueNames: [
    "title",
    "count",
    {name: "date", attr: "data-date"},
  ],
  searchColumns: ["title"],
  searchDelay: search_delay,
  pagination: true,
  page: items_per_page
});


// Movies pagination.
var movies = new List("movies", {
  valueNames: [
    "title",
    "runtime",
    "count",
    {name: "date", attr: "data-date"},
    {name: "genres", attr: "data-genres"},
  ],
  searchColumns: ["title"],
  searchDelay: search_delay,
  pagination: true,
  page: items_per_page
});


// TV Series pagination.
var tvSeries = new List("tv-series", {
  valueNames: [
    "title",
    "seasons",
    "count",
    {name: "date", attr: "data-date"},
    {name: "genres", attr: "data-genres"},
  ],
  searchColumns: ["title"],
  searchDelay: search_delay,
  pagination: true,
  page: items_per_page
});


// Genre filtering.
var genreFilter = document.getElementById("genre-filter");
genreFilter.onchange = updateList;

function updateList() {
  if (movies.items.length) {
    movies.filter(genreMatch);
    movies.update();
  }

  if (tvSeries.items.length) {
    tvSeries.filter(genreMatch);
    tvSeries.update();
  }
}

function genreMatch(item) {
  var genre = genreFilter.value;

  if (genre == "") {
    return true;
  } else {
    return item.values().genres.indexOf(genre) >= 0;
  }
}
