import Comb from "./comb/comb.js";

$(document).ready(function() {
  var channels = new Comb({
    items: "#channels section",
    empty: "#empty",
    // sort: "#sort",
    // sortFields: {
    //   "name": {
    //     "order": "asc",
    //   },
    //   "date": {
    //     "order": "desc",
    //   },
    //   "videos": {
    //     "type": "number",
    //     "order": "desc",
    //     "default": true,
    //   },
    // },
    search: "#search",
    searchFields: [
      "name",
    ],
    pager: "#pager",
    pagerItemsPerPage: 30,
  });

  var movies = new Comb({
    items: "#movies section",
    empty: "#empty",
    // sort: "#sort",
    // sortFields: {
    //   "name": {
    //     "order": "asc",
    //   },
    //   "date": {
    //     "order": "desc",
    //   },
    //   "runtime": {
    //     "type": "number",
    //     "order": "desc",
    //   },
    //   "channels": {
    //     "type": "number",
    //     "order": "desc",
    //     "default": true,
    //   },
    // },
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
