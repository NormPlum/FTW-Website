import Comb from "./comb/comb.js";

$(document).ready(function() {
  var comb = new Comb({
    items: "section",
    empty: "#empty",
    pager: "#pager",
    pagerItemsPerPage: 5,
  });
});
