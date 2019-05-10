'use strict';


const store = (function(){
  const addBookmark = function(bookmark) {
    store.bookmarks.push(bookmark);
  };

  const setAdding = function() {
    store.adding = !store.adding;
  };

  const setError = function(error) {
    console.log('Setting error');
    store.error = error;
    console.log(store.error);
  };

  return {
    bookmarks: [],
    adding: false,
    error: '',
    filter: undefined,

    addBookmark,
    setAdding,
    setError
  };
})();