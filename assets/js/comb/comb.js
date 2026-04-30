import Pager from "./pager.js";

class Comb {

  // Initial setup.
  constructor(settings) {
    this.settings = this.validateSettings(settings);
    this.hiddenClass = "comb-hidden";

    // Pager.
    if (this.settings.pager) {
      this.pager = new Pager(this);
    }

    console.log(this);
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

      // Get selector element(s).
      if (allSettings[setting].selector) {
        this[setting] = $(settings[setting]);
      }
    }

    return settings;
  }

  // Hide an item.
  hideItem(item) {
    $(item).addClass(this.hiddenClass);
  }

  // Show an item.
  showItem(item) {
    $(item).removeClass(this.hiddenClass);
  }

}

export default Comb;
