$(function() {
    $(".box").mouseover(function() {
        $(this).children("ul").show();
        $(this).children("span").css("transform", "rotateZ(-135deg)");
    });
    $(".box").mouseout(function() {
        $(this).children("ul").hide();
        $(this).children("span").css("transform", "rotateZ(45deg)");
    });
})