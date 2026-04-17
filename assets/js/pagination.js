// Channels pagination.
var channels = new List('channels', {
  listClass: 'sections',
  valueNames: ['title', 'date', 'count'],
  searchColumns: ['title'],
  pagination: true,
  page: 30
});
