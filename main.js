// INDIVIDUAL PROJECT EXERCISE 1,2,3
// declaring some variables
var posts = [];
var idNumber = 1;
var $postSection = $('div.posts');

// function to add new post to the posts array
$(document).ready(function() {
  $('button.add-post').on('click', function() {
    var newText = $('#post-name').val();
    var newPost = {
      text: newText,
      id: idNumber
    };
    posts.push(newPost);
    displayPost(posts);
    idNumber++;
  });
});

var displayPost = function (arr) {
  $postSection.find('p').remove();
  var removeButton = '<button class="remove btn btn-danger" type="button">Remove</button>';
  for (var i = 0; i < arr.length; i++) {
    $postSection.append('<p class="post" data-id="' + arr[i].id + '">' + removeButton + ' ' + arr[i].text + '</p>');
    // $postSection.find('p:last').addClass('post').attr('data-id', arr[i].id);
    // $postSection.find('p:last button').attr('type', 'button').addClass('remove btn btn-danger');
  }
};

$postSection.on('click', 'button.remove', function () {
  var $post = $(this).closest('p');
  var id = $post.data().id;

  for (var i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts.splice(i, 1);
    }
  }

  $post.remove();
});





