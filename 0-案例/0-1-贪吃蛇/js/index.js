window.addEventListener('load', function() {
    let sw = 20, //每个小方块的宽度
        sh = 20, //每个小方块的高度
        tr = 30, //有30行
        td = 30; //每行有30个小方块

    let snake = null, //蛇的实例
        game = null, //游戏的实例
        food = null; //食物的实例

    let time = 200; //定时器时间   设置蛇移动的速度

    function Square(x, y, className) {
        this.x = x * sw;
        this.y = y * sh;
        this.class = className;
        this.minBox = document.createElement('div');
        this.minBox.className = this.class;
        this.parent = document.querySelector('.snakeBox');
    }

    //创建小方块dom
    Square.prototype.create = function() {
        this.minBox.style.position = 'absolute'; //添加定位
        this.minBox.style.width = sw + 'px'; //小方块宽度
        this.minBox.style.height = sh + 'px'; //小方块高度
        this.minBox.style.left = this.x + 'px'; //小方块与父级的左偏移量
        this.minBox.style.top = this.y + 'px'; //小方块与父级的右偏移量
        this.parent.appendChild(this.minBox); //将小方块添加到父盒子上
    }

    //定义方法 移除指定小方块
    Square.prototype.remove = function() {
        this.parent.removeChild(this.minBox); //将小方块从父盒子中移除
    }

    //储存蛇的信息
    function Snake() {
        this.head = null; //蛇的头部信息
        this.tail = null; //蛇的尾部信息
        this.pos = []; //蛇的身体的每一个方块的信息
        this.directionNum = { //蛇的走向，是一个对象
            left: {
                x: -1,
                y: 0,
                rotate: 180 //蛇头旋转的角度
            },
            right: {
                x: 1,
                y: 0,
                rotate: 0 //蛇头旋转的角度
            },
            top: {
                x: 0,
                y: -1,
                rotate: -90 //蛇头旋转的角度
            },
            bottom: {
                x: 0,
                y: 1,
                rotate: 90 //蛇头旋转的角度
            }
        };
    }

    //初始化
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


        //形成链表关系      next上一个(左)  last下一个(右)
        snakeHead.last = null;
        snakeHead.next = snakeBody1;

        snakeBody1.last = snakeHead;
        snakeBody1.next = snakeBody2;

        snakeBody2.last = snakeBody1;
        snakeBody2.next = null;


        //添加一个属性，得到蛇运动的方向
        this.direction = this.directionNum.right;
    }


    //蛇头下一个点的元素信息，根据信息做不同的事情
    Snake.prototype.getNextPos = function() {
        let nextPos = [ //蛇头下一个坐标位置
            this.head.x / sw + this.direction.x, //蛇头x轴的坐标
            this.head.y / sh + this.direction.y, //蛇头y轴的坐标
        ];

        let flag = false;
        this.pos.forEach(function(value) {
            if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
                flag = true;
            }
        });

        //下一个点是自己，撞到自己了 结束游戏
        if (flag) {
            // console.log('撞到自己了！');
            this.work.die.call(this);
            return;
        }

        //下一个点是墙， 结束游戏
        if (nextPos[0] < 0 || nextPos[0] > (td - 1) || nextPos[1] < 0 || nextPos[1] > (tr - 1)) {
            // console.log('撞墙了！');
            this.work.die.call(this);
            return;
        }

        //下一个点是食物， 吃掉 加长 继续走
        if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {
            // console.log('吃到了！');
            this.work.eat.call(this);
            return;
        }

        //下一个点什么都没有， 继续走
        this.work.move.call(this);
    }


    //处理碰撞后要做的事情
    Snake.prototype.work = {
        move: function(format) { //蛇移动后要做的事
            let newBody = new Square(this.head.x / sw, this.head.y / sh, 'body'); //创建一个新的小方块放在旧蛇头的位置

            //更新链表关系        next上一个(左)  last下一个(右)
            newBody.next = this.head.next;
            newBody.next.last = newBody;
            newBody.last = null;

            this.head.remove(); //移除旧蛇头
            newBody.create(); //添加这个小方块

            let newHead = new Square(this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y, 'snake'); //创建新蛇头

            //更新链表关系           next上一个(左)  last下一个(右)
            newHead.next = newBody;
            newHead.last = null;
            newBody.last = newHead;

            newHead.minBox.style.transform = 'rotate(' + this.direction.rotate + 'deg)';
            newHead.create(); //添加新蛇头 

            //蛇的每一个小方块坐标更新
            this.pos.splice(0, 0, [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y]);
            this.head = newHead; //蛇头更新

            if (!format) {
                this.tail.remove();
                this.tail = this.tail.last;
                this.pos.pop();
            }
        },
        eat: function() { //蛇吃到食物后要做的事
            this.work.move.call(this, true);
            createFood();
            game.score++; //分数
        },
        die: function() { //蛇挂了后要做的事
            game.over();
        }
    }

    snake = new Snake();


    //创建食物
    function createFood() { //随机出现食物
        let x = null; //食物的坐标  x轴
        let y = null; //食物的坐标  y轴
        let include = true;

        while (include) {
            x = Math.round(Math.random() * (td - 1)); //随机坐标
            y = Math.round(Math.random() * (tr - 1)); //随机坐标

            snake.pos.forEach(function(value) {
                if (x != value[0] && y != value[1]) {
                    include = false;
                }
            });
        }

        //生成随机食物
        food = new Square(x, y, 'food');
        food.pos = [x, y]; //储存食物的坐标

        let foodDom = document.querySelector('.food');
        if (foodDom) {
            foodDom.style.left = x * sw + 'px';
            foodDom.style.top = y * sh + 'px';
        } else {
            food.create();
        }
    }


    //创建游戏逻辑
    function Game() {
        this.timer = null; //定时器
        this.score = 0; //得分
    }

    Game.prototype.init = function() {
        snake.init();
        createFood();

        document.addEventListener('keydown', function(e) { //判断按下的键
            if (e.which == 37 && snake.direction != snake.directionNum.right) {
                snake.direction = snake.directionNum.left;
            } else if (e.which == 38 && snake.direction != snake.directionNum.bottom) {
                snake.direction = snake.directionNum.top;
            } else if (e.which == 39 && snake.direction != snake.directionNum.left) {
                snake.direction = snake.directionNum.right;
            } else if (e.which == 40 && snake.direction != snake.directionNum.top) {
                snake.direction = snake.directionNum.bottom;
            }
        });

        this.start(); //使用方法
    }

    //定义定时器方法
    Game.prototype.start = function() {
        this.timer = setInterval(function() {
            snake.getNextPos();
        }, time);
    }

    //定义停止定时器方法
    Game.prototype.pause = function() {
        clearInterval(this.timer); //停止定时器
    }

    //结束游戏
    Game.prototype.over = function() {
        game.pause();
        alert('你的得分为：' + this.score); //弹出得分

        //游戏回到初始化状态
        let snakeBox = document.querySelector('.snakeBox');
        snakeBox.innerHTML = '';

        snake = new Snake();
        game = new Game();

        let startBtnWrap = document.querySelector('.start');
        startBtnWrap.style.display = 'block';
    }


    //开启游戏
    game = new Game();
    let startBtn = document.querySelector('.start .img');
    startBtn.addEventListener('click', function() {
        this.parentNode.style.display = 'none';
        game.init();
    });

    //暂停游戏
    let snakeBox = document.querySelector('.snakeBox');
    let pauseBtn = document.querySelector('.enter .img');

    snakeBox.addEventListener('click', function() {
        game.pause(); //停止定时器  暂停游戏
        pauseBtn.parentNode.style.display = 'block';
    });

    pauseBtn.addEventListener('click', function() {
        game.start(); //开始游戏
        pauseBtn.parentNode.style.display = 'none';
    });
});