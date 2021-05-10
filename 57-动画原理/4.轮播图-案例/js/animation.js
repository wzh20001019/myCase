function animation(obj, target, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        if (step > 0) {
            step = Math.ceil(step);
        } else {
            step = Math.floor(step);
        }
        obj.style.left = obj.offsetLeft + step + "px";

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}