'use strict';

const main = function() {
  console.log('App running');
  bookmarkList.renderList();
  bookmarkList.renderForm();
  bookmarkList.handleFormSubmitClick();
  bookmarkList.handleAddButtonClick();
};

$(main);