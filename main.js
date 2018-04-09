var SpacebookApp = function() {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function(id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  };

  var createPost = function(text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    };

    currentId += 1;

    posts.push(post);
  };

  var renderPosts = function() {
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
          post.id +
          '>' +
          '<a href="#" class="btn btn-info btn-sm remove" role="button">remove</a> ' +
          '<a href="#" class="btn btn-info btn-sm show-comments" role="button">comments</a> ' +
          post.text +
          commentsContainer +
          '</div>'
      );
    }
  };

  var removePost = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  };

  /********COMMENTS SECTION*******/

  var toggleComments = function(currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  };

  var createComment = function(currentPost, commentText) {
    var id = currentPost.data().id;
    var post = _findPostById(id);

    post.comments.push({ text: commentText });
  };

  var renderComments = function(currentPost) {
    var $commentList = currentPost.find('div.comments-list');
    $commentList.empty();
    
    var id = currentPost.data().id;
    var post = _findPostById(id);

    for (var i = 0; i < post.comments.length; i+=1) {
      $commentList.append('<p>' + post.comments[i].text +  '  <button class="btn btn-danger btn-sm remove-comment">Remove Comment</button></p>');
    }
  };

  // TODO: Implement
  // removeComment: removeComment,

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    // removeComment: removeComment,
    toggleComments: toggleComments
  };
};

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function() {
  var text = $('#post-name').val();
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function() {
  app.removePost(this);
});

// Events - Comments
$('.posts').on('click', '.show-comments', function() {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function() {
  var $clickedPost = $(this).closest('.post');
  var commentText = $(this).prev().val();
  app.createComment($clickedPost, commentText);
  app.renderComments($clickedPost);
});
