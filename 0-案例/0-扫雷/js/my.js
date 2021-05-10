document.addEventListener('selectstart', function(e) { //禁止选中文字
    e.preventDefault();
});

function Mine(tr, td, mineNum) {
    this.tr = tr; //行数
    this.td = td; //每行的个数
    this.mineNum = mineNum; //剩余的雷数

    this.squares = []; //存放每个小方块的信息
    this.tds = []; //储存所有单元格的dom
    this.surplusMine = mineNum; //剩余雷数
    this.allRight = false; //右击的小红旗是否全是雷
    this.parent = document.querySelector('.game');
}
Mine.prototype.randomNum = function() {
    let square = new Array(this.tr * this.td); //生成一个空数组  但有长度
    for (let i = 0; i < square.length; i++) {
        square[i] = i;
    }
    square.sort(function() { //数组排序
        return 0.5 - Math.random(); //随机排序
    });

    return square.slice(0, this.mineNum);
}

Mine.prototype.init = function() {
    let rn = this.randomNum(); //雷在格子的位置
    let n = 0; //用来找格子的索引

    for (let i = 0; i < this.tr; i++) {
        this.squares[i] = [];
        for (let j = 0; j < this.td; j++) {
            // n++;
            if (rn.indexOf(++n) != -1) {
                this.squares[i][j] = {
                    type: 'mine',
                    x: j,
                    y: i
                }
            } else {
                this.squares[i][j] = {
                    type: 'number',
                    x: j,
                    y: i,
                    value: 0
                }
            }
        }
    }
    this.parent.oncontextmenu = function() { //阻止鼠标右击出现菜单
        return false;
    }

    this.upDataNum();
    this.createDom();

    this.mineNumDom = document.querySelector('.mineNum');
    this.mineNumDom.innerHTML = this.surplusMine;
}

//创建表格
Mine.prototype.createDom = function() {
    let This = this;
    let table = document.createElement('table');

    for (let i = 0; i < this.tr; i++) { //行
        let domTr = document.createElement('tr'); //创建行
        this.tds[i] = []; //赋值行信息

        for (let j = 0; j < this.td; j++) { //列
            let domTd = document.createElement('td'); //创建列
            this.tds[i][j] = domTd; //将信息储存给每个单元格

            domTd.pos = [i, j];
            domTd.onmousedown = function() {
                This.play(event, this);
            }

            // if (this.squares[i][j].type == 'mine') {
            //     domTd.className = 'mine';
            // } else if (this.squares[i][j].type == 'number') {
            //     domTd.innerHTML = this.squares[i][j].value;
            // }

            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }

    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}


//找某个方格周围8个方格
Mine.prototype.getAround = function(squares) {
    let x = squares.x;
    let y = squares.y;
    let result = [];

    /*  九宫格坐标
            x-1, y-1    x, y-1     x+1, y-1
            x-1, y      x, y       x+1, y
            x-1, y+1    x, y+1     x+1, y+1
    */

    for (let i = (x - 1); i <= (x + 1); i++) {
        for (let j = (y - 1); j <= (y + 1); j++) {
            if (
                i < 0 || //格子超出左边的范围
                i > (this.td - 1) || //格子超出右边的范围
                j < 0 || //格子超出上边的范围
                j > (this.tr - 1) || //格子超出下边的范围
                (i == x && j == y) || //自身
                this.squares[j][i].type == 'mine' //存在雷
            ) {
                continue; //跳出循环
            } else {
                result.push([j, i]);
            }
        }
    }
    return result;
}


//更新数字
Mine.prototype.upDataNum = function() {
    for (let i = 0; i < this.tr; i++) {
        for (let j = 0; j < this.td; j++) {
            if (this.squares[i][j].type == 'number') {
                continue;
            }
            let num = this.getAround(this.squares[i][j]);

            for (let k = 0; k < num.length; k++) {
                this.squares[num[k][0]][num[k][1]].value += 1;
            }
        }
    }
}

Mine.prototype.play = function(e, obj) {
    let This = this;
    if (e.which == 1 && obj.className != 'flag') {
        let curSquare = this.squares[obj.pos[0]][obj.pos[1]];
        let arrColor = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

        if (curSquare.type == 'number') {
            obj.innerHTML = curSquare.value;
            obj.className = arrColor[curSquare.value];

            if (curSquare.value == 0) {
                obj.innerHTML = '';


                //查找周围所有的0
                function getAllZero(square) {
                    let around = This.getAround(square);

                    for (let i = 0; i < around.length; i++) {
                        let x = around[i][0];
                        let y = around[i][1];

                        This.tds[x][y].className = arrColor[This.squares[x][y].value];

                        if (This.squares[x][y].value == 0) {
                            if (!This.tds[x][y].check) {
                                This.tds[x][y].check = true;
                                getAllZero(This.squares[x][y]);
                            }
                        } else {
                            This.tds[x][y].innerHTML = This.squares[x][y].value;
                        }
                    }

                }

                getAllZero(curSquare);
            }
        } else {
            this.gameOver(obj);
        }
    }

    if (e.which == 3) {
        if (obj.className && obj.className != 'flag') {
            return;
        }

        if (obj.className == 'flag') {
            obj.className = '';
        } else {
            obj.className = 'flag';
        }

        if (this.squares[obj.pos[0]][obj.pos[1]].type == 'mine') {
            this.allRight = true;
        } else {
            this.allRight = false;
        }

        if (obj.className == 'flag') {
            this.mineNumDom.innerHTML = --this.surplusMine;
        } else {
            this.mineNumDom.innerHTML = ++this.surplusMine;
        }

        if (this.surplusMine == 0) {
            if (this.allRight) {
                alert('游戏通过！');
            } else {
                alert('游戏失败！');
            }
            this.gameOver();
        }
    }
}


//游戏结束
Mine.prototype.gameOver = function(clickTd) {
    for (let i = 0; i < this.tr; i++) {
        for (let j = 0; j < this.td; j++) {
            if (this.squares[i][j].type == 'mine') {
                this.tds[i][j].className = 'mine';
            }
            this.tds[i][j].onmousedown = null;
        }
    }

    if (clickTd) {
        clickTd.style.backgroundColor = '#f00';
    }
}

//button功能
let btnS = document.querySelectorAll('.btn button');
let mine = null;
let ln = 0;
let arr = [
    [9, 9, 10],
    [16, 16, 40],
    [28, 28, 99]
];

for (let i = 0; i < btnS.length - 1; i++) {
    btnS[i].onclick = function() {
        btnS[ln].className = '';
        this.className = 'current';

        mine = new Mine(...arr[i]);
        mine.init();
        ln = i;
    }
}

btnS[0].onclick();
btnS[3].onclick = function() {
    let trNum = document.querySelectorAll('table tr').length;
    if (trNum == 9) {
        btnS[0].onclick();
    } else if (trNum == 16) {
        btnS[1].onclick();
    } else if (trNum == 28) {
        btnS[2].onclick();
    }
}