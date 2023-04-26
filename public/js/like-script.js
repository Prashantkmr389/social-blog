{
    let createLike = function () {
        var likebtn = $("#ikebtn");
        for(let i = 0; i < likebtn.length; i++){
            likebtn[i].click(function (e) {
              e.preventDefault();
              $.ajax({
                type: "POST",
                url: "/like/toggle",
                data: likebtn[i].serialize(),
                success: function (data) {
                  console.log(data, "success");
                },
                error: function (error) {
                  console.log("error", error.responseText);
                },
              });
            });
        }
        
    }
    createLike();
}