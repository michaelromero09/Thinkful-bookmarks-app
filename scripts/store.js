'use strict';

const bookmarkObjCreator = function(id, title, description, url, rating) {
  return {
    id,
    title,
    description,
    url,
    rating
  };
};

let gogol = bookmarkObjCreator('1', 'Google', 'lipsum orem', 'https://www.google.com/', 3);
let yoho = bookmarkObjCreator('2', 'Yahoo', 'lipsum orem', 'https://www.yahoo.com/', 1);
let ches = bookmarkObjCreator('3', 'Cheese', 'world\'s greatest cheese resource', 'https://www.cheese.com/', 5);

const store = (function(){
  const setAdding = function() {
    console.log('Set Adding');
    console.log(`BEFORE: ${store.adding}`);
    store.adding = !store.adding;
    console.log(`After: ${store.adding}`);
  };


  return {
    bookmarks: [gogol, yoho, ches],
    adding: false,
    error: '',
    filter: undefined,

    setAdding
  };
})();