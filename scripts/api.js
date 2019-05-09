'use strict';

const api = (function() {
  console.log('API MODULE READY');

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/michaelr/bookmarks';

  const getBookmarks = function() {
    return fetch(BASE_URL);
  };

  const createBookMark = function() {
    const newBookmark = JSON.stringify(store.bookmarks[2]);
    const options = {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark
    };
    console.log(newBookmark);
    return fetch(BASE_URL, options);
  };
  
  return {
    getBookmarks,
    createBookMark
  };
})();