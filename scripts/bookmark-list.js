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

  const renderList = function() {
    console.log('Rendering bookmarks');
    let htmlStr = '';
    store.bookmarks.map(bookmark => {
      let rating = renderRating(bookmark.rating);
      htmlStr += `<div class="bookmark" id="${bookmark.id}">
      <h3>${bookmark.title}</h3>
      <p>${rating}</p>
      <button class="details">View</button>
    </div>`;
    });
    $('.bookmark-container').html(htmlStr);
  };

  const renderForm = function() {
    let htmlStr = '';
    if (store.adding) {
      console.log('Let\'s add a bookmark');
      htmlStr = `<form class="add-bookmark-form" action="">
        <label for="title">Title</label>
        <input type="text" id="title" name="title">
        <label for="url">URL</label>
        <input type="text" id="url" name="url">
        <label for="desc">Description</label>
        <input type="text" id="desc" name="desc">
        <label for="rating">Rating</label>
        <input type="radio" name="rating" value="1">1</input>
        <input type="radio" name="rating" value="2">2</input>
        <input type="radio" name="rating" value="3">3</input>
        <input type="radio" name="rating" value="4">4</input>
        <input type="radio" name="rating" value="5">5</input>
      </form>
      <button class="submit-button">Submit</button>
      <button class="cancel-button">Cancel</button>`;
    } else {
      console.log('Let\'s render the filter dropdown');
      htmlStr = '<button class="add-button">Add Bookmark</button>';
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
      const bookmark = store.findBookmarkById(id);
      $(`#${id}`).html(`
        <h3>${bookmark.title}</h3>
        <button class="close">X</button>
        <p>${renderRating(bookmark.rating)}</p>
        <p>${bookmark.desc}</p>
        <a href="${bookmark.url}">VISIT</a>
        <button class="delete">Delete</button>
      `).addClass('expanded');
    });
  };

  const handleCloseButtonClick = function() {
    $('.bookmark-container').on('click', '.close', (e) => {
      const id = $(e.target).parent().attr('id');
      const bookmark = store.findBookmarkById(id);
      $(`#${id}`).html(`
        <h3>${bookmark.title}</h3>
        <p>${renderRating(bookmark.rating)}</p>
        <button class="details">View</button>
      `).removeClass('expanded');
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

  return {
    renderList,
    renderForm,
    renderError,
    handleSubmitButtonClick,
    handleAddButtonClick,
    handleCancelButtonClick,
    handleDetailsButtonClick,
    handleCloseButtonClick,
    handleDeleteButtonClick
  };
}());