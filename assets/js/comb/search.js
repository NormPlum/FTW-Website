class Search {

  // Initial setup.
  constructor(comb) {
    this.comb = comb;
    this.delay = 300;
    this.hiddenClass = "comb-hidden-search";
    this.searchFields = this.comb.settings.searchFields;

    // Create custom "searched" event.
    this.searchedEvent = jQuery.Event("searched");

    // Add and save search field.
    let field = $('<input type="search" placeholder="Search">');
    $(this.comb.elements.search).append(field);
    this.searchField = field[0];

    // Handle keyup events.
    $(this.searchField).on("keyup", this.debounce(this.searchEvent, this.delay));
  }

  // Perform a search after user types in search field.
  searchEvent(event) {
    let searchTerm = event.currentTarget.value;
    searchTerm = searchTerm.toLowerCase().trim();

    // Do the search.
    this.search(searchTerm);

    $(this).trigger("searched");
  }

  // Perform a search for the given term.
  search(term) {
    if (term.length == 0) {
      $(this.comb.elements.items).each((i, item) => {
        if ($(item).hasClass(this.hiddenClass)) {
          $(item).removeClass(this.hiddenClass);
          this.comb.showItem(item);
        }
      });
      return;
    }

    $(this.comb.visibleItems()).each((i, item) => {
      let text = "";
      if (this.searchFields.length == 0) {
        text = $(item).text();
      }
      else {
        for (let i in this.searchFields) {
          text += $(item).find("[data-" + this.searchFields[i] + "]").attr("data-" + this.searchFields[i]);
        }
      }
      text = text.toLowerCase().trim();

      if (text.includes(term)) {
        $(item).removeClass(this.hiddenClass);
        this.comb.showItem(item);
      }
      else {
        $(item).addClass(this.hiddenClass);
        this.comb.hideItem(item);
      }
    });
  }

  // Delay calling a function until after a set time.
  // https://chrisboakes.com/how-a-javascript-debounce-function-works
  debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

}

export default Search;
