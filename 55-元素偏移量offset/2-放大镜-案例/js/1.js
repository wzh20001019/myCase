let minBox = document.querySelector('.minBox'),
    maxBox = document.querySelector('.maxBox'),
    move = document.querySelector('.move'),
    img = maxBox.querySelector('img');

let minBoxWidth = minBox.offsetWidth,
    minBoxHeight = minBox.offsetHeight;


let minBox_left = minBox.offsetLeft,
    minBox_top = minBox.offsetTop,
    maxBox_left = maxBox.offsetLeft,
    maxBox_top = maxBox.offsetTop;

minBox.addEventListener('mousedown', function(e) {

    document.addEventListener('mousemove', fn);

    function fn(e) {
        move.style.display = 'block';
        maxBox.style.display = 'block';

        let x = e.pageX - minBox_left;
        let y = e.pageY - minBox_top;
        let moveWidth = move.offsetWidth;
        let moveHeight = move.offsetHeight;


        if (x < (moveWidth / 2)) {
            x = 0;
        } else if (x > (minBoxWidth - (moveWidth / 2))) {
            x = minBoxWidth - moveWidth
        } else {
            x = x - (moveWidth / 2);
        }

        if (y < (moveHeight / 2)) {
            y = 0;
        } else if (y > (minBoxHeight - (moveHeight / 2))) {
            y = minBoxHeight - moveHeight;
        } else {
            y = y - (moveHeight / 2);
        }
        move.style.left = x + 'px';
        move.style.top = y + 'px';

        let imgMaxX = img.offsetWidth - maxBox.offsetWidth;
        let imgMaxY = img.offsetHeight - maxBox.offsetHeight;

        let imgX = x * imgMaxX / (minBoxWidth - moveWidth);
        let imgY = y * imgMaxY / (minBoxHeight - moveHeight);

        img.style.left = -imgX + 'px';
        img.style.top = -imgY + 'px';

    }

    document.addEventListener('mouseup', function() {
        this.removeEventListener('mousemove', fn);
        move.style.display = 'none';
        maxBox.style.display = 'none';
    });
});