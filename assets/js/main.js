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

  var videos = new Comb({
    items: "#videos article",
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
});
