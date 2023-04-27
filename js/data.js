/* exported data */

var data = {
  view: 'search-page',
  entries: [],
  nextEntryId: 0,
  saved: [],
  nextSavedId: 0
};

window.addEventListener('beforeunload', function (event) {
  const jSon = JSON.stringify(data);
  this.localStorage.setItem('javascript-local-storage', jSon);
}
);

const previousNotes = localStorage.getItem('javascript-local-storage');
if (previousNotes !== null) {
  data = JSON.parse(previousNotes);
}
