'use strict';

const main = function() {
  console.log('App running');
  bookmarkList.renderForm();
  bookmarkList.handleSubmitButtonClick();
  bookmarkList.handleCancelButtonClick();
  bookmarkList.handleAddButtonClick();
  bookmarkList.renderError();
  api.getBookmarks()
    .then(res => res.json())
    .then(bookmarks => {
      console.log(bookmarks);
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarkList.renderList();
    });
  // api.createBookMark()
  //   .then(res => {
  //     return res.json();
  //   }).then(res => {
  //     console.log(res);
  //   });
};

$(main);