// // {
// //   const likeBtn = document.querySelector('.like-btn');
// //   // console.log('in like-script.js')
// //   let createLike = function () {
// //     let newLikeForm = $("likeForm");
// //     newLikeForm.submit(function (e) {
// //       e.preventDefault();
// //       console.log('in like-script.js')
// //     })
// //   }
// //   createLike();
// // }
// // implement like toggle via AJAX
// {
//   let toggleLike = function (likeLink) {
//     $(likeLink).click(function (e) {
//       e.preventDefault();
//       $.ajax({
//         type: "POST",
//         url: $(likeLink).prop("href"),
//         success: function (data) {
//           let likesCount = parseInt(
//             $(likeLink)
//               .children("span")
//               .text()
//           );
//           if (data.data.deleted == true) {
//             likesCount -= 1;
//           } else {
//             likesCount += 1;
//           }
//           $(likeLink).html(

//             `${likesCount} <img src="./images/like.png" alt="" id="like" />`
//           );
//         },
//         error: function (error) {
//           console.log(error.responseText);
//         },
//       });
//     });
//   };

//   let convertPostsToAjax = function () {
//     $("#posts-list-container>ul>li").each(function () {
//       let self = $(this);
//       let deleteButton = $(" .delete-post-button", self);
//       deletePost(deleteButton);

//       let postId = self.prop("id").split("-")[1];
//       let likesContainer = $(`#post-${postId}-likes-container`);
//       let likeLink = $(`#post-${postId}-toggle-like`);
//       toggleLike(likeLink);
//     });
//   };


//   convertPostsToAjax();
// }


class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      // this is a new way of writing ajax which you might've studied, it looks like the same as promises
      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          let likesCount = parseInt($(self).attr("data-likes"));
          console.log(likesCount);
          if (data.data.deleted == true) {
            likesCount -= 1;
          } else {
            likesCount += 1;
          }

          $(self).attr("data-likes", likesCount);
          $(self).html(`${likesCount} Likes`);
        })
        .fail(function (errData) {
          console.log("error in completing the request");
        });
    });
  }
}