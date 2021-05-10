window.addEventListener('load', function() {
    // function animate(obj, target, callback) {
    //     clearInterval(obj.timer); //清除之前的定时器

    //     obj.timer = setInterval(function() {
    //         if (window.pageYOffset == target) {
    //             clearInterval(obj.timer);

    //             callback && callback();
    //         }

    //         var num = (target - window.pageYOffset) / 10;
    //         if (num > 0) {
    //             num = Math.ceil(num);
    //         } else if (num < 0) {
    //             num = Math.floor(num);
    //         }

    //         window.scroll(0, window.pageYOffset + num);
    //     }, 20);
    // }


    function animate(obj, target, callback) {
        clearInterval(obj.timer);

        obj.timer = setInterval(function() {
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);

                callback && callback();
            }

            var num = (target - window.pageYOffset) / 10;
            if (num > 0) {
                num = Math.ceil(num);
            } else if (num < 0) {
                num = Math.floor(num);
            }

            window.scroll(0, window.pageYOffset + num);
        }, 20);
    }

    var btn = document.querySelector('.position');
    btn.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    btn.addEventListener('click', function() {
        animate(window, 0);
    });
});