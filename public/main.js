var STORAGE_ID = 'spacebook';
var SpacebookApp = function() {
  var posts = [];
  var currentId = 0; // the current id to assign to a post
  var $posts = $('.posts');

  /****** INTERNAL FUNCTIONS *******/
  var _findPostById = function(id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  };

  var _renderPosts = function() {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer =
        '<div class="comments-container">' +
        '<input type="text" class="comment-name"> ' +
        '<button class="btn btn-success btn-sm add-comment">Post Comment</button>' +
        '<div class="comments-list"></div>' +
        '</div>';

      $posts.append(
        '<div class="post" data-id=' +
        post.id + '>' +
        '<a href="#" class="btn btn-info btn-sm remove" role="button">remove</a> ' +
        '<a href="#" class="btn btn-info btn-sm show-comments" role="button">comments</a> ' +
        post.text + commentsContainer + '</div>'
      );
    }
  };

  var _renderComments = function(currentPost) {
    var $listComments = currentPost.find('.comments-list');
    var id = currentPost.data().id;
    var post = _findPostById(id);

    // empty comments from list-comment on the page
    $listComments.empty();
    // append all comment to the section
    for (var i = 0; i < post.comments.length; i+=1) {
      $listComments.append('<p class="comment">' + post.comments[i].text +  ' <button type="button" class="btn btn-danger btn-sm remove-comment">Remove Comment</button></p>');
    }
  };

  var _saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(posts));
  };

  var _getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  };
  /*******************************/

  /********POST SECTION*******/
  var createPost = function(text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    };

    currentId += 1;
    posts.push(post);
    // update local-storage
    _saveToLocalStorage();
    // render posts and render comments
    _renderPosts();
  };

  var removePost = function(currentPost) {
    // find post by id
    var id = currentPost.data().id;
    var post = _findPostById(id);
    // delete post from posts array
    posts.splice(posts.indexOf(post), 1);
    // update local-storage
    _saveToLocalStorage();
    // delete post from page
    currentPost.remove();
  };

  /********COMMENTS SECTION*******/
  var createComment = function(currentPost, textComment) {
    // find the id of the post to add the comment to
    var id = currentPost.data().id;
    var post = _findPostById(id);
    // add comment to the post array
    post.comments.push({ text: textComment });
    // update local-storage
    _saveToLocalStorage();
    // render comments
    _renderComments(currentPost);
  };

  var removeComment = function(commentInx, currentPost, currentComment) {
    var id = currentPost.data().id;
    var post = _findPostById(id);
    // remove from the comment array of the post property
    post.comments.splice(commentInx, 1);
    // update local-storage
    _saveToLocalStorage();
    // remove the comment from the page
    currentComment.remove();
  };

  var toggleComments = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
    // render the existing comments
    _renderComments($clickedPost);
  };

  // immediately invoke the render post method
  posts = _getFromLocalStorage();
  _renderPosts();
  // _renderComments();

  return {
    createPost: createPost,
    removePost: removePost,
    createComment: createComment,
    removeComment: removeComment,
    toggleComments: toggleComments
  };
};

var app = SpacebookApp();

/******* Events - Post *******/
// add post event
$('.add-post').on('click', function() {
  var text = $('#post-name').val();
  app.createPost(text);
});

// remove post event
$('.posts').on('click', '.remove', function() {
  var $clickedPost = $(this).closest('.post');
  app.removePost($clickedPost);
});

/******* Events - Comments *******/
// toggle comments event
$('.posts').on('click', '.show-comments', function() {
  app.toggleComments(this);
});

// add comment event
$('.posts').on('click', '.add-comment', function() {
  var $clickedPost = $(this).closest('.post');
  var commentText = $(this).siblings('.comment-name').val();

  app.createComment($clickedPost, commentText);
});

// remove comment event
$('.posts').on('click', '.remove-comment', function() {
  var $commentIndex = $(this).closest('.comment').index();
  var $post = $(this).closest('.post');
  var $clickedComment = $(this).closest('.comment');
  app.removeComment($commentIndex, $post, $clickedComment);
});
