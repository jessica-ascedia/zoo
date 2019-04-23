$(function() {
    $(window).scroll(function() {
        $(".js-do-animate").each(function() {
            var thisPosition = $(this).offset().top;
            var windowPosition = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (thisPosition + 100 < (windowPosition + windowHeight)) {
                $(this).addClass('animate');
            }
        });
    })
});