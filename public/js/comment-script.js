// {
//     let createComment = function(){
//         $('#comment-form').submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type: 'post',
//                 url: '/comment/create',
//                 data: $('#comment-form').serialize(),
//                 success: function(data){
//                     let newComment = newCommentDom(data.data.comment);
//                     $('.commentFeed').prepend(newComment);
//                     $("#commentNumb").html(function(i, h){
//                         return parseInt(h)+1 + " Comment";
//                     })
//                     console.log(data.data.comment);
//                     new Noty({
//                         theme: 'relax',
//                         text: 'Comment published! yes',
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1000

//                     }).show();
//                 },
//                 error: function(error){
//                     console.log(error.responseText);

//                 }
//             })
//         })
//     }
//     let newCommentDom = function(comment){
//         return $(`<div class="comment-header">
//                     ${
//                       comment.user.avatar
//                         ? `<img src="${comment.user.avatar}" alt="Profile Picture" / id="post-icon">`
//                         : `<img src="./images/avatar.jpeg" alt="Profile Picture" / id="post-icon">`
//                     }
//                     <h3>${comment.user.name}</h3>
//                     <h4><a href="/comment/destroy/${
//                       comment._id
//                     }">Delete</a></h4>
//                 </div>
//                 <div class="comment-body">
//                     <p>
//                         ${comment.content}
//                     </p>
//                 </div>
//                 <div class="comment-footer">
//                     <div class="left-section">
//                         <span>${comment.likes.length} Likes</span>
//                         <form action="/like/toggle" method="post" id="likeForm">
//                             <input type="hidden" name="id" value="${
//                               comment.id
//                             }" />
//                             <input type="hidden" name="type" value="Comment" />
//                             <button type="submit" id="likebtn"><img src="./images/like.png" alt="" id="like" /></button>
//                         </form>
//                     </div>
//                 </div>`);
//     }
//     createComment();
// }

// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;
    // call for all the existing comments
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comment/create",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));

          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
    return $(`<div class="comment-header" id="comment-${comment._id}>
    <div class="comment-name">
      ${
        comment.user.avatar
          ? `<img src="${comment.user.avatar}" alt="Profile Picture" / id="post-icon">`
          : `<img src="./images/avatar.jpeg" alt="Profile Picture" / id="post-icon">`
      }
      
      <h4>${comment.user.name}</h4>
      <h5><a href="/comment/destroy/${
        comment._id
      }">Delete</a class = "delete-comment-button"></h5>
    </div>
    <p>
      ${comment.content}
    </p>
  </div>
  <div class="comment-footer">
    <div class="left-section">
      <span>${comment.likes.length} Likes</span>
      <form action="/like/toggle" method="post" id="likeForm">
        <input type="hidden" name="id" value="${comment.id}" />
        <input type="hidden" name="type" value="Comment" />
        <button type="submit" id="likebtn"><img src="./images/like.png" alt="" id="like" /></button>
      </form>
     
    </div>
    <p id="date-created-comment">${comment.createdAt}</p>
  </div>
  <script>      
        

    </script>
  `);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1000,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}