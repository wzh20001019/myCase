
    let box1 = document.querySelector('.box1'),
        box2 = document.querySelector('.box2');

    let timer1 = null;
    let timer2 = null;

    timer1 = setInterval(function() {
        if (box1.offsetLeft >= 1000) {
            box1.style.left = 10 + 'px';
        }
        box1.style.left = box1.offsetLeft + 5 + 'px';
    }, 50);

    timer2 = setInterval(function() {
        if (box2.offsetLeft >= 1000) {
            box2.style.left = 10 + 'px';
        }
        box2.style.left = box2.offsetLeft + 3 + 'px';
    }, 50);
