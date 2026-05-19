import Sort from "./sort.js";
import Pager from "./pager.js";

class Comb {

  // Initial setup.
  constructor(settings) {
    this.elements = {}
    this.settings = this.validateSettings(settings);
    this.hiddenClass = "comb-hidden";

    // Empty.
    if (this.elements.empty) {
      $(this.elements.empty).hide();
    }

    // Sort.
    if (this.elements.sort) {
      this.sort = new Sort(this);

      $(this.sort).on("sorted", (event) => {
        if (this.pager) {
          this.pager.paginate();
        }
      });
    }

    // Pager.
    if (this.elements.pager) {
      this.pager = new Pager(this);
    }

    // console.log(this.settings);
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
            settings[setting][field].text = field.replace(/\b\w/, char => char.toUpperCase());
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

  // Update a selector.
  updateSelector(selector) {
    this.elements[selector] = $(this.settings[selector]).get();
  }

  // Get a list of visible items.
  visibleItems() {
    return $(this.elements.items).not("." + this.hiddenClass).get();
  }

  // Hide an item.
  hideItem(item) {
    $(item).addClass(this.hiddenClass).hide();
  }

  // Show an item.
  showItem(item) {
    $(item).removeClass(this.hiddenClass).show();
  }

}

export default Comb;
