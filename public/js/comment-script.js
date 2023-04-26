{
    let createComment = function(){
        $('#comment-form').submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $('#comment-form').serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $('.commentFeed').prepend(newComment);
                    $("#commentNumb").html(function(i, h){
                        return parseInt(h)+1 + " Comment";
                    })
                    console.log(data.data.comment);
                    new Noty({
                        theme: 'relax',
                        text: 'Comment published! yes',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1000
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);

                }
            })
        }) 
    }
    let newCommentDom = function(comment){
        return $(`<div class="comment-header">
                    ${
                      comment.user.avatar
                        ? `<img src="${comment.user.avatar}" alt="Profile Picture" / id="post-icon">`
                        : `<img src="./images/avatar.jpeg" alt="Profile Picture" / id="post-icon">`
                    }
                    <h3>${comment.user.name}</h3>
                    <h4><a href="/comment/destroy/${
                      comment._id
                    }">Delete</a></h4>
                </div>
                <div class="comment-body">
                    <p>
                        ${comment.content}
                    </p>
                </div>
                <div class="comment-footer">
                    <div class="left-section">
                        <span>${comment.likes.length} Likes</span>
                        <form action="/like/toggle" method="post" id="likeForm">
                            <input type="hidden" name="id" value="${
                              comment.id
                            }" />
                            <input type="hidden" name="type" value="Comment" />
                            <button type="submit" id="likebtn"><img src="./images/like.png" alt="" id="like" /></button>
                        </form>
                    </div>
                </div>`);
    }
    createComment();
}