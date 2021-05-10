function animate(obj, target, callback) {
    clearInterval(obj.timer); //清除之前的定时器

    obj.timer = setInterval(function() {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);

            callback && callback();
        }

        var num = (target - obj.offsetLeft) / 10;
        if (num > 0) {
            num = Math.ceil(num);
        } else if (num < 0) {
            num = Math.floor(num);
        }

        obj.style.left = obj.offsetLeft + num + "px";
    }, 20);
}