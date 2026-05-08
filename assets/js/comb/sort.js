class Sort {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;

    // Add sort links.
    let sortLinks = $('<ul class="comb-sort"></ul>');
    for (let field in this.comb.settings.sortFields) {
      sortLinks.append('<li><a href="#" data-field="' + field + '">' + this.comb.settings.sortFields[field].text + '</a></li>');
    }
    $(this.comb.elements.sort).append(sortLinks);

    this.sortLinks = $(this.comb.elements.sort).find("ul.comb-sort a").get();

    // Handle click events.
    $(this.sortLinks).on("click", (event) => {
      let order = this.toggleOrder(event.currentTarget);
      this.sort($(event.currentTarget).attr("data-field"), order);
    });

    // Set the initial sort if there's a default.
    for (let field in this.comb.settings.sortFields) {
      if (this.comb.settings.sortFields[field].default) {
        this.sort(field, this.comb.settings.sortFields[field].order);
        break;
      }
    }
  }

  // Toggle the order on a sort link.
  toggleOrder(link) {
    // Remove order values from other sort links.
    let otherLinks = $(this.sortLinks).not(link).get();
    for (let i in otherLinks) {
      $(otherLinks[i]).removeAttr("data-order");
    }

    // Toggle the order.
    if ($(link).attr("data-order") == "asc") {
      $(link).attr("data-order", "desc");
    }
    else if ($(link).attr("data-order") == "desc") {
      $(link).attr("data-order", "asc");
    }
    else {
      let defaultOrder = this.comb.settings.sortFields[$(link).attr("data-field")].order;
      $(link).attr("data-order", defaultOrder);
    }

    return $(link).attr("data-order");
  }

  // Sort items.
  sort(field, order) {
    console.log(field, order);
  }

}

export default Sort;
