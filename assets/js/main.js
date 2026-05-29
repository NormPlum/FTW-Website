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
        "type": "number",
        "order": "desc",
        "default": true,
      },
    },
    search: "#search",
    searchData: ".searchable",
    pager: "#pager",
    pagerItemsPerPage: 30,
  });
});
