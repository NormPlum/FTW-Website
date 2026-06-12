import Comb from "./comb/comb.js";

$(document).ready(function() {
  var channels = new Comb({
    items: "#channels article",
    empty: "#empty",
    search: "#search",
    searchFields: [
      "name",
    ],
    pager: "#pager",
    pagerItemsPerPage: 30,
  });

  var movies = new Comb({
    items: "#movies article",
    empty: "#empty",
    search: "#search",
    searchFields: [
      "name",
    ],
    filter: "#filters",
    filterFields: {
      "genre": {},
    },
    pager: "#pager",
    pagerItemsPerPage: 30,
  });

  var tvSeries = new Comb({
    items: "#tv-series article",
    empty: "#empty",
    search: "#search",
    searchFields: [
      "name",
    ],
    filter: "#filters",
    filterFields: {
      "genre": {},
    },
    pager: "#pager",
    pagerItemsPerPage: 30,
  });

  var channelVideos = new Comb({
    items: "#channel-videos article",
    empty: "#empty",
    search: "#search",
    searchFields: [
      "title",
      "name",
    ],
    filter: "#filters",
    filterFields: {
      "type": {},
      "genre": {},
    },
    pager: "#pager",
    pagerItemsPerPage: 30,
  });

  var tmdbVideos = new Comb({
    items: "#tmdb-videos article",
    empty: "#empty",
    search: "#search",
    searchFields: [
      "title",
      "name",
    ],
    filter: "#filters",
    filterFields: {
      "channel": {},
    },
    pager: "#pager",
    pagerItemsPerPage: 30,
  });
});
