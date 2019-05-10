'use strict';

const main = function() {
  bookmarkList.renderForm();
  bookmarkList.handleSubmitButtonClick();
  bookmarkList.handleCancelButtonClick();
  bookmarkList.handleAddButtonClick();
  bookmarkList.handleDetailsButtonClick();
  bookmarkList.handleCloseButtonClick();
  bookmarkList.handleDeleteButtonClick();
  bookmarkList.handleFilterClick();
  bookmarkList.renderError();
  api.getBookmarks()
    .then(res => res.json())
    .then(bookmarks => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarkList.renderList();
    });
};

$(main);