'use strict';

const bookmarkList = (function() {
  const renderRating = function(rating) {
    let str = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        str += '<span class="fa fa-star checked"></span>';
      } else {
        str += '<span class="fa fa-star"></span>';
      }
    }
    return str;
  };

  const renderBookmark = function(bookmark) {
    let bookmarkClass;
    let htmlStr;
    if (bookmark.rating < store.filter) {
      bookmarkClass= 'bookmark hidden';
    } else {
      bookmarkClass = 'bookmark';
    }
    let rating = renderRating(bookmark.rating);
    if (bookmark.expanded) {
      htmlStr = `
      <div class="${bookmarkClass} expanded" id="${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <button class="close">X</button>
        <p>${renderRating(bookmark.rating)}</p>
        <p>${bookmark.desc}</p>
        <a href="${bookmark.url}">Visit Site</a>
        <button class="delete">Delete</button>
      </div>
    `;
    } else {
      htmlStr = `<div class="${bookmarkClass}" id="${bookmark.id}">
      <h3>${bookmark.title}</h3>
      <p>${rating}</p>
      <button class="details">Details</button>
      </div>`;
    }
    return htmlStr;
  };

  const renderList = function() {
    let htmlStr = '';
    let strings = [];
    strings = store.bookmarks.map(bookmark => {
      return renderBookmark(bookmark);
    });
    strings.map(str => htmlStr += str);
    $('.bookmark-container').html(htmlStr);
  };

  const renderDropDown = function() {
    const options = ['none', 1, 2, 3, 4, 5];
    let str = '';
    let subStr = '';
    let star = ' star';
    options.map((option) => {
      if (option === 'none') {
        star = '';
      } else if (option === 1) {
        star = ' star';
      } else {
        star = ' stars';
      }
      if (option === store.filter) {
        subStr = `<option value="${option}" selected>${option}${star}</option>`;
      } else {
        subStr = `<option value="${option}">${option}${star}</option>`;
      }
      str += subStr;
    });
    return str;
  };

  const renderForm = function() {
    let htmlStr = '';
    if (store.adding) {
      htmlStr = `
      <div class="add-bookmark-container">
        <form class="add-bookmark-form" action="">
          <label for="title">Title</label>
          <input type="text" id="title" name="title">
          <label for="url">URL</label>
          <input type="text" id="url" name="url">
          <label for="desc">Description</label>
          <input type="textfield" id="desc" name="desc">
          <label for="rating">Rating</label>
          <input class="radio-button" type="radio" name="rating" value="1">1</input>
          <input class="radio-button" type="radio" name="rating" value="2">2</input>
          <input class="radio-button" type="radio" name="rating" value="3">3</input>
          <input class="radio-button" type="radio" name="rating" value="4">4</input>
          <input class="radio-button" type="radio" name="rating" value="5">5</input>
        </form>
        <button class="submit-button">Submit</button>
        <button class="cancel-button">Cancel</button>
      </div>`;
    } else {
      htmlStr = `
      <button class="add-button">Add Bookmark</button>
      <label for="rating-filter">Rating Filter</label>
      <select name="rating-filter" id="rating-filter">
        ${renderDropDown()}
      </select>
      `;
    }
    $('.form-container').html(htmlStr);
  };

  const renderError = function() {
    if (store.error) {
      $('.error-container').html(`<p>${store.error}</p>`).removeClass('hidden');
    } else {
      $('.error-container').addClass('hidden');
    }
  };

  const clearForm = function() {
    $('#title').val('');
    $('#url').val('');
    $('#description').val('');
    $('input[name="rating"]').prop('checked', false);
    renderError();
    if (!store.error) {
      store.setAdding();
    }
    store.setError('');
  };

  const handleAddButtonClick = function() {
    $('.form-container').on('click', '.add-button',function(e) {
      store.setAdding();
      renderForm();
    });
  };

  const handleSubmitButtonClick = function() {
    $('.form-container').on('click', '.submit-button', function(e) {
      const form = $('.add-bookmark-form')[0];
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((val, field) => {
        obj[field] = val;
      });
      let error;
      if (!obj.title) {
        store.setError('Empty title input');
      }
      obj.rating = parseInt(obj.rating);
      api.createBookMark(obj)
        .then(res => {
          if (!res.ok) {
            error = {code: res.status};
          }
          return res.json();
        }).then(res => {
          if (error) {
            error.message = res.message;
            return Promise.reject(error);
          }
          store.addBookmark(res);
          store.setError('');
          clearForm();
          renderForm();
          renderList();
        })
        .catch(e => {
          store.setError(e.message);
          renderError();
        });
    });
    store.setError('');
  };
  
  const handleCancelButtonClick = function() {
    $('.form-container').on('click', '.cancel-button', function(e) {
      store.setError('');
      clearForm();
      renderForm();
    });
  };


  const handleDetailsButtonClick = function() {
    $('.bookmark-container').on('click', '.details', (e) => {
      const id = $(e.target).parent().attr('id');
      store.setExpanded(id);
      renderList();
    });
  };

  const handleCloseButtonClick = function() {
    $('.bookmark-container').on('click', '.close', (e) => {
      const id = $(e.target).parent().attr('id');
      store.setExpanded(id);
      renderList();
    });
  };

  const handleDeleteButtonClick = function() {
    $('.bookmark-container').on('click', '.delete', (e) => {
      const id = $(e.target).parent().attr('id');
      api.deleteBookmark(id);
      store.deleteBookmarkWithId(id);
      renderList();
    });
  };

  const handleFilterClick = function() {
    $('.form-container').on('change', 'select', (e) => {
      let filter = parseInt($(e.target).val());
      store.setFilter(filter);
      renderList();
    });
  }

  return {
    renderList,
    renderForm,
    renderError,
    handleSubmitButtonClick,
    handleAddButtonClick,
    handleCancelButtonClick,
    handleDetailsButtonClick,
    handleCloseButtonClick,
    handleDeleteButtonClick,
    handleFilterClick
  };
}());