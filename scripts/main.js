$(document).ready(function() {
    $("#buttonUk").click(function() {
        $("#mapNav li a").removeClass("active");
        $(this).addClass("active");
        /*$(".Section-World .section").css("background-image", "url(../images/Section-World--London.jpg)");*/
        $("#mapUK").css("display", "block");
        $("#mapRU").css("display", "none");
    });
    $("#buttonRu").click(function() {
        $("#mapNav li a").removeClass("active");
        $(this).addClass("active");
        /*$(".Section-World .section").css("background-image", "url(../images/Section-World--Ufa.jpg)");*/
        $("#mapUK").css("display", "none");
        $("#mapRU").css("display", "block");
    });
    //
    $("#buttonHire").click(function() {
        $("#formNav li a").removeClass("active");
        $(this).addClass("active");
        $("#formHire").css("display", "block");
        $("#formResume").css("display", "none");
    });
    $("#buttonResume").click(function() {
        $("#formNav li a").removeClass("active");
        $(this).addClass("active");
        $("#formHire").css("display", "none");
        $("#formResume").css("display", "block");
    });
});