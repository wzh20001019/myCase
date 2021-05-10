$(function() {
    $(".main>div").each(function(index, dom) {
        $(".nav ul").append("<li><a href='javascript:;'>" + (index + 1) + "</a></li>");
    });

    bk();

    var flag = true;

    function bk() {
        if ($(document).scrollTop() >= $(".block").offset().top) {
            $(".nav").stop().fadeIn(500);
        } else {
            $(".nav").stop().fadeOut(500);
        }

        if ($(document).scrollTop() >= $(".main .box3").offset().top) {
            $(".g-top").stop().fadeIn(300);
        } else {
            $(".g-top").stop().fadeOut(300);
        }
    }

    $(window).scroll(function() {
        bk();
        if (flag) {
            $(".main div").each(function(index, dom) {
                if ($(document).scrollTop() >= $(dom).offset().top) {
                    $(".nav li").eq(index).addClass("current").siblings().removeClass("current");
                }
            })
        }
    });

    $(".nav ul").on("click", "li", function() {
        flag = false;
        var cut = $(".main div").eq($(this).index()).offset().top;
        $("body, html").stop().animate({
            scrollTop: cut
        }, function() {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass("current");
    });

    $(".g-top").click(function() {
        $("body, html").stop().animate({
            scrollTop: 0
        });
    });
})