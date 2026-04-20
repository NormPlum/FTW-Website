const search_delay = 250;
const items_per_page = 30;

var searchFilter = document.getElementById("search");
var genreFilter = document.getElementById("genre-filter");
var resetButton = document.getElementById("reset");
var emptyElement = document.getElementById("empty");

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
channels.on("updated", listUpdated);

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
movies.on("updated", listUpdated);

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
tvSeries.on("updated", listUpdated);

// Genre filtering.
if (genreFilter) {
  genreFilter.onchange = updateList;
}

// Reset.
if (resetButton) {
  resetButton.onclick = resetList;
}


// ---------------------------------------------------------------------------------------------- //


function listUpdated(list) {
  if (list.matchingItems.length > 0) {
    emptyElement.style.display = "none";
  } else {
    emptyElement.style.display = "block";
  }
}

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

function resetList() {
  if (channels.items.length) {
    channels.search();
    channels.filter();
    channels.update();
    channels.sort("count", {order: "desc"});
  }

  if (movies.items.length) {
    movies.search();
    movies.filter();
    movies.sort("count", {order: "desc"});
    movies.update();
  }

  if (tvSeries.items.length) {
    tvSeries.search();
    tvSeries.filter();
    tvSeries.sort("count", {order: "desc"});
    tvSeries.update();
  }

  if (searchFilter) {
    searchFilter.value = "";
  }
  if (genreFilter) {
    genreFilter.value = "";
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
