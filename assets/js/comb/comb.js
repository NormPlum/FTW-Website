class Comb {

  // Validate the settings.
  constructor(settings) {
    // Expected settings and validation tests.
    const expected = {
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
      "pager_per_page": {
        required: false,
        type: "number",
        default: 10,
        selector: false,
      },
    };

    // Validate settings.
    for (let setting in expected) {
      try {
        // Required settings.
        if (expected[setting].required) {
          if (!(setting in settings)) {
            throw `'${setting}' is required.`;
            continue;
          }
        }

        if (setting in settings) {
          // Check type.
          if (typeof settings[setting] !== expected[setting].type) {
            throw `'${setting}' must be of type ${expected[setting].type}`;
          }

          // Selectors.
          if (expected[setting].selector) {
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
        settings[setting] = expected[setting].default;
      }
    }

    this.settings = settings;
    console.log(this.settings);
  }

}
