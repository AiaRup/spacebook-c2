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
  var removeButton = '<button>Remove</button>';
  for (var i = 0; i < arr.length; i++) {
    $postSection.append('<p>' + removeButton + ' ' + arr[i].text + ' id: ' + arr[i].id + '</p>');
    $postSection.find('p:last').addClass('post').attr('data-id', arr[i].id);
    $postSection.find('p:last button').attr('type', 'button').addClass('remove btn btn-danger').on('click', function () {
      $(this).closest('p').remove();
    });
  }
};





