class Sort {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;

    // Add and save sort links.
    let sortLinks = $('<ul class="comb-sort"></ul>');
    for (let field in this.comb.settings.sortFields) {
      sortLinks.append('<li><a href="#" data-field="' + field + '" data-type="' + this.comb.settings.sortFields[field].type + '">' + this.comb.settings.sortFields[field].text + '</a></li>');
    }
    $(this.comb.elements.sort).append(sortLinks);
    this.sortLinks = $(this.comb.elements.sort).find("ul.comb-sort a").get();

    // Handle click events.
    $(this.sortLinks).on("click", (event) => {
      this.clickLink(event.currentTarget);
    });

    // Set the initial sort if there's a default.
    for (let field in this.comb.settings.sortFields) {
      if (this.comb.settings.sortFields[field].default) {
        $(this.comb.elements.sort).find('ul.comb-sort a[data-field="' + field + '"]').trigger("click");
        break;
      }
    }
  }

  // Click on a sort link.
  clickLink(link) {
    let defaultOrder = this.comb.settings.sortFields[$(link).attr("data-field")].order;

    // Reset non-clicked links.
    let otherLinks = $(this.sortLinks).not(link).get();
    for (let i in otherLinks) {
      $(otherLinks[i]).removeAttr("data-order");
      $(otherLinks[i]).children("span").remove();
    }

    // Toggle/set the sort order.
    if ($(link).attr("data-order")) {
      $(link).attr("data-order", this.toggleOrder($(link).attr("data-order")));
    }
    else {
      $(link).attr("data-order", defaultOrder);
    }

    // Add/update the sort indicator.
    if ($(link).children("span").length) {
      let current = Object.keys(this.comb.settings.sortIndicators).find((key) => this.comb.settings.sortIndicators[key] === $(link).children("span").text().trim());
      $(link).children("span").text(" " + this.comb.settings.sortIndicators[this.toggleOrder(current)]);
    }
    else {
      $(link).append("<span> " + this.comb.settings.sortIndicators[defaultOrder] + "</span>");
    }

    // Sort the items.
    this.sortItems($(link).attr("data-field"), $(link).attr("data-type"), $(link).attr("data-order"));
  }

  // Toggle the sort order.
  toggleOrder(current) {
    return (current == "asc") ? "desc" : "asc";
  }

  // Sort items using the quicksort algorithm (https://en.wikipedia.org/wiki/Quicksort).
  sortItems(field, type, order, start = null, end = null) {
    let items = $(this.comb.elements.items);
    if (start == null) start = 0;
    if (end == null) end = items.length - 1;

    if (start >= end) return;

    let i = start - 1;
    let j = end + 1;
    let p = Math.floor((end - start) / 2) + start; // Pivot from the middle for the best performance.
    let pivot = this.getValue(items[p], field, type);

    // Functions to allow sorting ascending or descending.
    let compare = {
      "asc": function(i, j) {return i < j},
      "desc": function(i, j) {return i > j},
    };

    while (true) {
      do {
        i += 1;
      }
      while (compare[order](this.getValue(items[i], field, type), pivot));

      do {
        j -= 1;
      }
      while (compare[this.toggleOrder(order)](this.getValue(items[j], field, type), pivot));

      if (i >= j) {
        p = j;
        break;
      }

      items = this.swapItems(items[i], items[j]);
    }

    // Recursively sort all items on either side of the pivot.
    this.sortItems(field, type, order, start, p);
    this.sortItems(field, type, order, p + 1, end);
  }

  // Get the value to sort by.
  getValue(item, field, type) {
    let value = $(item).find("[data-" + field + "]").attr("data-" + field);

    // Sort by numerical value or case-insensitive string.
    if (type == "number") {
      value = Number(value);
    }
    else {
      value = value.toLowerCase();
    }

    return value;
  }

  // Swap two items.
  swapItems(itemI, itemJ) {
    itemJ = $(itemJ).replaceWith($(itemI).clone());
    $(itemI).replaceWith(itemJ);

    // Update and return the items list.
    this.comb.updateSelector("items");
    return $(this.comb.elements.items);
  }

}

export default Sort;
