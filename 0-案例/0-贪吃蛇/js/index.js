window.addEventListener('load', function() {
    let sw = 20,
        sh = 20,
        tr = 30,
        th = 30;


    let snake = null,
        food = null,
        game = null;

    let speed = 200; //速度

    function Square(x, y, classNAME) {
        this.x = x * sw;
        this.y = y * sh;
        this.class = classNAME;

        this.box = document.createElement('div');
        this.box.className = this.class;
        this.parentBox = document.querySelector('.snakeBox');
    }

    Square.prototype.create = function() {
        this.box.style.position = 'absolute';
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
        this.box.style.width = sw + 'px';
        this.box.style.height = sh + 'px';

        this.parentBox.appendChild(this.box);
    }

    Square.prototype.remove = function() {
        this.parentBox.removeChild(this.box);
    }

    function Snake() {
        this.head = null;
        this.tail = null;
        this.pos = [];
        this.directionNum = { //运动的方向
            left: {
                x: -1,
                y: 0,
                rotate: 180
            },
            right: {
                x: 1,
                y: 0,
                rotate: 0
            },
            up: {
                x: 0,
                y: -1,
                rotate: -90
            },
            down: {
                x: 0,
                y: 1,
                rotate: 90
            }
        };
    }

    Snake.prototype.init = function() {
        let snakeHead = new Square(2, 0, 'snake');
        snakeHead.create();
        this.head = snakeHead;
        this.pos.push([2, 0]);

        let snakeBody1 = new Square(1, 0, 'body');
        snakeBody1.create();
        this.pos.push([1, 0]);

        let snakeBody2 = new Square(0, 0, 'body');
        snakeBody2.create();
        this.tail = snakeBody2;
        this.pos.push([0, 0]);


        //蛇 链表关系
        snakeHead.next = null;
        snakeHead.pre = snakeBody1;

        snakeBody1.next = snakeHead;
        snakeBody1.pre = snakeBody2;

        snakeBody2.next = snakeBody1;
        snakeBody2.pre = null;

        //默认方向
        this.direction = this.directionNum.right;
    }

    Snake.prototype.getNextPos = function() {
        let nextPos = [ //蛇头下一个点的坐标
            this.head.x / sw + this.direction.x,
            this.head.y / sh + this.direction.y
        ];

        //下一个点是自己
        let flag = false;
        this.pos.forEach(function(value) {
            if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
                flag = true;
            }
        });

        if (flag) {
            console.log('撞到自己了！');
            this.things.die.call(this);
            return;
        }

        //下一个点是墙
        if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > (tr - 1) || nextPos[1] > (th - 1)) {
            console.log('撞墙了！');
            this.things.die.call(this);
            return;
        }

        //下一个点是食物
        if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {
            this.things.eat.call(this);
            return;
        }


        //下一个点什么都没有
        this.things.move.call(this);
    }

    Snake.prototype.things = {
        move: function(format) {
            let newBody = new Square(this.head.x / sw, this.head.y / sh, 'body');
            //删除之前找链表关系
            newBody.pre = this.head.pre;
            newBody.pre.next = newBody;
            newBody.next = null;

            this.head.remove();
            newBody.create();

            let newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snake');
            //再次更新链表关系
            newHead.pre = newBody;
            newHead.next = null;
            newBody.next = newHead;
            newHead.box.style.transform = 'rotate(' + this.direction.rotate + 'deg)'
            newHead.create();

            this.pos.unshift([this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y]);
            this.head = newHead;

            if (!format) {
                this.tail.remove();
                this.tail = this.tail.next;
                this.pos.pop();
            }
        },
        die: function() {
            game.over();
        },
        eat: function() {
            this.things.move.call(this, true);
            food.remove();
            createFood();
            game.fraction++;
        },
    }

    snake = new Snake();

    function createFood() {
        let x = null;
        let y = null;
        let whl = true;

        while (whl) {
            x = Math.floor(Math.random() * (tr - 1)) + 1;
            y = Math.floor(Math.random() * (th - 1)) + 1;
            snake.pos.forEach(function(item) {
                if (item[0] !== x && item[1] !== y) {
                    whl = false;
                }
            });
        }

        food = new Square(x, y, 'food');
        food.pos = [x, y];
        food.create();
    }

    function Game() {
        this.timer = null;
        this.fraction = 0;
    }

    Game.prototype.init = function() {
        snake.init();
        createFood();

        document.onkeydown = function(e) {
            if (e.which == 37 && snake.direction != snake.directionNum.right) {
                snake.direction = snake.directionNum.left;
            } else if (e.which == 38 && snake.direction != snake.directionNum.down) {
                snake.direction = snake.directionNum.up;
            } else if (e.which == 39 && snake.direction != snake.directionNum.left) {
                snake.direction = snake.directionNum.right;
            } else if (e.which == 40 && snake.direction != snake.directionNum.up) {
                snake.direction = snake.directionNum.down;
            }
        }

        this.start();
    }

    Game.prototype.start = function() {
        this.timer = setInterval(function() {
            snake.getNextPos();
        }, speed);
    }

    Game.prototype.over = function() {
        clearInterval(this.timer);
        alert('得分为' + game.fraction);

        let box = document.querySelector('.snakeBox');
        box.innerHTML = '';
        snake = new Snake();
        game = new Game();

        let startBox = document.querySelector('.start');
        startBox.style.display = 'block';
    }

    Game.prototype.timeOut = function() {
        clearInterval(this.timer);
    }

    game = new Game();

    let btn1 = document.querySelector('.start .img');

    btn1.onclick = function() {
        this.parentNode.style.display = 'none';
        game.init();
    }

    let box = document.querySelector('.snakeBox');
    let btn2 = document.querySelector('.enter .img');

    box.onclick = function() {
        game.timeOut();
        btn2.parentNode.style.display = 'block';
    }

    btn2.onclick = function() {
        game.start();
        this.parentNode.style.display = 'none';
    }
});