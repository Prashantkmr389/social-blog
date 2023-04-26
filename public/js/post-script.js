{
    // method to submit the form data for new post using AJAX
    // console.log('post-script.js loaded');
    let createPost = function () {
      let newPostForm = $("#add-new-post");

      newPostForm.submit(function (e) {
        console.log("inside create post");
        e.preventDefault();
        $.ajax({
          type: "post",
          url: "/post/create",
          data: newPostForm.serialize(),
          success: function (data) {
            console.log(data.data.post);
            let newPost = newPostDom(data.data.post);
            $(".feed").prepend(newPost);
            // let newPost = newPostDom(data.data.post);
            // $('#posts-list-container>ul').prepend(newPost);
            deletePost($(' .delete-post-button', newPost));
            new Noty({
              theme: "relax",
              text: "Post published!",
              type: "success",
              layout: "topRight",
              timeout: 1000,
            }).show();
          },
          error: function (error) {
            console.log("error in creating post");
          },
        });
      });
    };
    let newPostDom = function (post) {
      return $(`<div class="post" id="post-${post._id}">
                    <div class="post-header">
                        ${
                          post.user.avatar
                            ? `<img src="${post.user.avatar}" alt="Profile Picture" / id="post-icon">`
                            : `<img src="./images/avatar.jpeg" alt="Profile Picture" / id="post-icon">`
                        }
                        <h3>${post.user.name}</h3>
                        
                        <h4><a href="/post/destroy/${post._id}" class ="delete-post-button">Delete</a></h4>
                    </div>
                    <div class="post-body">
                        
                        <p>
                        
                        ${post.content}
                        </p>
                    </div>
                    <div class="post-footer">
                        <div class="left-section">
                        <span>${post.likes.length} Likes</span>
                        <form action="/like/toggle" method="post" id="likeForm">
                            <input type="hidden" name="id" value="${post.id}" />
                            <input type="hidden" name="type" value="Post" />
                            <button type="submit" id="likebtn"><img src="./images/like.png" alt="" id="like" /></button>
                        </form>
                        
                        <span>${post.comments.length} Comment</span>
                        
                        <a href="#"><img src="./images/comment.png" alt="" id="commentshow" /></a>
                        </div>
                        <p id="date-created">${post.createdAt}</p>
                    </div>
                </div>
                

                <div class="comment">

                    <div class="addNewComment">
                        <form action="/comment/create" method="post" id="comment-form">
                            <input type="text" name="content" id="" />
                            <input type="hidden" name="post" value="${
                              post._id
                            }" />
                            <button type="submit" id="addNewComment">Add Comment</button>
                        </form>
                    </div>

                
                </div>

                <script>
                    // to toggle comment box
                    $('.comment').hide();
                    $('#commentshow').click(function(){
                        $('.comment').toggle();
                    })
                    
                    var x = $('#date-created').html();
                    // date manipulation
                    
                    x.split('T');
                    var date = x.split('T')[0];
                    // var time = x.split('T')[1];
                    // var time = time.split('.')[0];
                    // var time = time.split(':');
                    // var time = time[0] + ':' + time[1];
                    var date = date.split('-');
                    var date = date[2] + ' ' + date[1] + ' ' + date[0];
                    $('#date-created').html(date);


                </script>
                `);
    };

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
            type: "get",
            url: $(deleteLink).prop("href"),
            success: function (data) {
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                theme: "relax",
                text: "Post Deleted",
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


    createPost();

}