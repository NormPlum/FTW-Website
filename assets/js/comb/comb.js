import Sort from "./sort.js";
import Search from "./search.js";
import Filter from "./filter.js";
import Pager from "./pager.js";

class Comb {

  // Initial setup.
  constructor(settings) {
    this.elements = {}
    this.settings = this.validateSettings(settings);
    this.hiddenClass = "comb-hidden";

    // Empty.
    this.toggleEmpty();

    // Sort.
    if (this.elements.sort) {
      this.sort = new Sort(this);

      $(this.sort).on("sorted", (event) => {
        this.updatePagination();
      });
    }

    // Search.
    if (this.elements.search) {
      this.search = new Search(this);

      $(this.search).on("searched", (event) => {
        this.updatePagination();
        this.toggleEmpty();
      });
    }

    // Filter.
    if (this.elements.filter) {
      this.filter = new Filter(this);

      $(this.filter).on("filtered", (event) => {
        this.updatePagination();
        this.toggleEmpty();
      });
    }

    // Pager.
    if (this.elements.pager) {
      this.pager = new Pager(this);
    }
  }

  // Validate the settings.
  validateSettings(settings) {
    // All possible settings and their validation tests.
    const allSettings = {
      "items": {
        required: true,
        type: "string",
        default: null,
        selector: true,
      },
      "empty": {
        required: false,
        type: "string",
        default: null,
        selector: true,
      },
      "sort": {
        required: false,
        type: "string",
        default: null,
        selector: true,
      },
      "sortFields": {
        required: false,
        type: "object",
        default: {},
        selector: false,
      },
      "sortIndicators": {
        required: false,
        type: "object",
        default: ["▴", "▾"],
        selector: false,
      },
      "search": {
        required: false,
        type: "string",
        default: null,
        selector: true,
      },
      "searchFields": {
        required: false,
        type: "object",
        default: [],
        selector: false,
      },
      "filter": {
        required: false,
        type: "string",
        default: null,
        selector: true,
      },
      "filterFields": {
        required: false,
        type: "object",
        default: {},
        selector: false,
      },
      "pager": {
        required: false,
        type: "string",
        default: null,
        selector: true,
      },
      "pagerItemsPerPage": {
        required: false,
        type: "number",
        default: 10,
        selector: false,
      },
    };

    for (let setting in allSettings) {
      try {
        // Required settings.
        if (allSettings[setting].required) {
          if (!(setting in settings)) {
            throw `'${setting}' is required.`;
            continue;
          }
        }

        if (setting in settings) {
          // Check type.
          if (typeof settings[setting] !== allSettings[setting].type) {
            throw `'${setting}' must be of type ${allSettings[setting].type}`;
          }

          // Selectors.
          if (allSettings[setting].selector) {
            if (!$(settings[setting]).length) {
              throw `Element(s) '${settings[setting]}' cannot be found.`;
            }
          }
        }
      }
      catch(error) {
        console.error(error);
      }

      // Set default values.
      if (!(setting in settings)) {
        settings[setting] = allSettings[setting].default;
      }
      else if (setting == "sortFields") {
        for (let field in settings[setting]) {
          if (!settings[setting][field].text) {
            settings[setting][field].text = field.replace(/\b\w/, (char) => {
              return char.toUpperCase();
            });
          }
          if (!settings[setting][field].type) {
            settings[setting][field].type = "string";
          }
          if (!settings[setting][field].order) {
            settings[setting][field].order = "asc";
          }
          if (!settings[setting][field].default) {
            settings[setting][field].default = false;
          }
        }
      }
      else if (setting == "filterFields") {
        for (let field in settings[setting]) {
          if (!settings[setting][field].text) {
            settings[setting][field].text = field.replace(/\b\w/, (char) => {
              return char.toUpperCase();
            });
          }
        }
      }
      if (setting == "sortIndicators") {
        settings[setting] = {
          "asc": settings[setting][0],
          "desc": settings[setting][1],
        }
      }

      // Get selector element(s).
      if (allSettings[setting].selector) {
        this.elements[setting] = $(settings[setting]).get();
      }
    }

    return settings;
  }

  // Show/hide 'empty' element.
  toggleEmpty() {
    if (this.elements.empty) {
      if (this.visibleItems().length == 0) {
        $(this.elements.empty).show();
      }
      else {
        $(this.elements.empty).hide();
      }
    }
  }

  // Update the pagination.
  updatePagination() {
    if (this.pager) {
      this.pager.paginate();
    }
  }

  // Update a selector.
  updateSelector(selector) {
    this.elements[selector] = $(this.settings[selector]).get();
  }

  // Get a list of visible items.
  visibleItems() {
    return $(this.elements.items).not("." + this.hiddenClass).get();
  }

  // Update an item's visibility based on its classes.
  updateVisibility(item) {
    if ($(item).filter('[class*="comb-hidden-"]').length == 0) {
      $(item).removeClass(this.hiddenClass).show();
    }
    else {
      $(item).addClass(this.hiddenClass).hide();
    }
  }

  // Reset visibility back to the default.
  reset(hiddenClass) {
    $(this.elements.items).each((i, item) => {
      if ($(item).hasClass(hiddenClass)) {
        $(item).removeClass(hiddenClass);
        this.updateVisibility(item);
      }
    });
  }

}

export default Comb;
