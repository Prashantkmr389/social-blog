{
    console.log('this is script.js');

    // method to submit the form data for new post using AJAX
    

//    var comments =  $("#commentShow");
    var comments = $("[id='commentShow']");
    var showcomment = $("[class ='comment']")
    let l = comments.length;
    for (let i = 0; i < l; i++) {
        $(comments[i]).click(function () {
            $(showcomment[i]).toggle();
        })
    }

    $("#messageslider").click(function () {

        // to hide the message slider

        $("#messagebox").css({"display":"block"});
        this.style.display = "none";

        // to show the message slider

        $("#messageslider2").css("display", "block");
    });

    $("#messageslider2").click(function () {
            
            // to hide the message slider
    
            $("#messagebox").toggle();
    
            this.style.display = "none";
    
            // to show the message slider
    
            $("#messageslider").css("display", "block");
    })


    $("[id ='date-created']").html(function (i, h) {
      var words = h.split(" ");
      words.splice(0, 1);
      words.splice(3);
      words = words.join(" ");
      return words;
    });


}
