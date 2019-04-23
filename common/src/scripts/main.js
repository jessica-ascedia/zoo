(function ($, sr, ss) {

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    // smartresize
    jQuery.fn[sr] = function (fn, time) { return fn ? this.bind('resize', debounce(fn, time)) : this.trigger(sr); };
    jQuery.fn[ss] = function (fn, name, time) { return fn ? this.bind('scroll.' + name, debounce(fn, time)) : this.trigger(sr); };


})(jQuery, 'smartresize', 'smartscroll');

$(function() {
    $(window).smartscroll(function() {
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