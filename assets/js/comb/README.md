### Settings

#### Required

| Setting | Type   | Description                                   |
|---------|--------|-----------------------------------------------|
| `items` | string | CSS selector of the elements to comb through. |

#### Optional

| Setting             | Type    | Default value | Description |
|---------------------|---------|---------------|-------------|
| `empty`             | string  | null          | CSS selector of the element to display when there are no items shown. This element will be hidden by default. |
| `sort`              | string  | null          | CSS selector of the element to add sort links to. When set, sorting is enabled. |
| `sortFields`        | object  | {}            | An object of fields to sort by, where keys are field names (based on the `data-*` attribute) and values are objects with the following key/value pairs: <ul><li>`text`: The text to display in the sort link (defaults to the parent object's key, capitalised)</li><li>`type`: The type of field this is (determines how fields are sorted) - 'string' or 'number' (defaults to 'string')</li><li>`order`: The sort order - 'asc' or 'desc' (defaults to 'asc')</li><li>`default`: Whether or not this is the default sort - 'true' or 'false' (defaults to 'false')</li></ul>
| `sortIndicators`    | object  | ["▴", "▾"]    | An array of values for the ascending and descending indicators (respectively). These are appended onto the active sort link. |
| `search`            | string  | null          | CSS selector of the element to add the search field to. When set, search is enabled. |
| `searchFields`      | object  | []            | An array of fields to search in, where the values are field names (based on the `data-*` attribute). Defaults to all fields in the item. |
| `pager`             | string  | null          | CSS selector of the element to add the pager to. When set, pagination is enabled. |
| `pagerItemsPerPage` | integer | 10            | The number of items to show on each page. |
