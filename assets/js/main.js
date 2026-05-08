import Comb from "./comb/comb.js";

$(document).ready(function() {
  var comb = new Comb({
    items: "section",
    empty: "#empty",
    sort: "#sort",
    sortFields: {
      "name": {
        "order": "asc",
      },
      "date": {
        "order": "desc",
      },
      "videos": {
        "order": "desc",
        "default": true,
      },
    },
    pager: "#pager",
    pagerItemsPerPage: 30,
  });
});
