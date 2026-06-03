class Filter {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;
    this.hiddenClass = "comb-hidden-filter";

    // Create custom "filtered" event.
    this.filteredEvent = jQuery.Event("filtered");

    // Add and save filter fields.
    for (let field in this.comb.settings.filterFields) {
      let filter = $('<select class="comb-filter comb-filter-' + field + '" data-field="' + field + '"></select>');
      filter.append('<option value="comb-all">- ' + this.comb.settings.filterFields[field].text + ' -</option>');
      $(this.comb.elements.items).each((i, item) => {
        let value = $(item).find("[data-" + field + "]").attr("data-" + field);
        filter.append('<option value="' + value + '">' + value + '</option>');
      });
      $(this.comb.elements.filter).append(filter);
    }
    this.filterFields = $(this.comb.elements.filter).find("select").get();

    // Handle change events.
    $(this.filterFields).on("change", (event) => {
      this.changeFilter(event.currentTarget);
    });
  }

  // Get the chosen select list option.
  changeFilter(select) {
    let field = $(select).attr("data-field");
    let option = $(select).children("option:selected")[0];
    let value = $(option).attr("value");

    // Filter items.
    this.filter(field, value);

    $(this).trigger("filtered");
  }

  // Filter items for the given field and value.
  filter(field, value) {
    this.comb.reset(this.hiddenClass);

    if (value != "comb-all") {
      $(this.comb.elements.items).each((i, item) => {
        if ($(item).find("[data-" + field + "]").attr("data-" + field) == value) {
          $(item).removeClass(this.hiddenClass);
        }
        else {
          $(item).addClass(this.hiddenClass);
        }
        this.comb.updateVisibility(item);
      });
    }
  }

}

export default Filter;
