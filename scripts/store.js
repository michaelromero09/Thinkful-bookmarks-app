'use strict';


const store = (function(){
  // Temporary hardwired store
  const bookmarkObjCreator = function(title, desc, url, rating) {
    return {
      title,
      url,
      desc,
      rating
    };
  };
  
  let gogol = bookmarkObjCreator('TEST Google', 'lipsum orem', 'https://www.google.com/', 3);
  let yoho = bookmarkObjCreator('TEST Yahoo', 'lipsum orem', 'https://www.yahoo.com/', 1);
  let ches = bookmarkObjCreator('TEST Cheese', 'world\'s greatest cheese resource', 'https://www.cheese.com/', 5);
  // Delete after reaching API

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
    bookmarks: [gogol, yoho, ches],
    adding: false,
    error: '',
    filter: undefined,

    addBookmark,
    setAdding,
    setError
  };
})();