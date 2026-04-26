### Settings

#### Required

| Setting | Type   | Description                                   |
|---------|--------|-----------------------------------------------|
| `items` | string | CSS selector of the elements to comb through. |

#### Optional

| Setting             | Type    | Default value | Description |
|---------------------|---------|---------------|-------------|
| `empty`             | string  | `null`        | CSS selector of the element to display when there are no items shown. This element will be hidden by default. |
| `pager`             | string  | `null`        | CSS selector of the element to add the pager to. When set, pagination is enabled. |
| `pagerItemsPerPage` | integer | 10            | The number of items to show on each page. |
