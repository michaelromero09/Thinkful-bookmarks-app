'use strict';


const store = (function(){
  const addBookmark = function(bookmark) {
    bookmark.hidden = false;
    store.bookmarks.push(bookmark);
  };

  const setAdding = function() {
    store.adding = !store.adding;
  };

  const setError = function(error) {
    store.error = error;
  };

  const findBookmarkById = function(id) {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  };

  const deleteBookmarkWithId = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const setFilter = function(filter) {
    this.filter = filter;
  };

  return {
    bookmarks: [],
    adding: false,
    error: '',
    filter: 'none',

    addBookmark,
    setAdding,
    setError,
    findBookmarkById,
    deleteBookmarkWithId,
    setFilter
  };
})();