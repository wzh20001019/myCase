window.addEventListener('load', function() {
    let star = null,
        that,
        timer1 = null,
        timer2 = null,
        w_num = 0,
        s_num = 0;

    let speed = 400; //游戏难度

    class Star {
        constructor() {
            that = this;
            this.start = document.querySelector('button');
            this.t_out = this.start.nextElementSibling;
            this.second = document.querySelector('.second');
            this.schedule = document.querySelector('.schedule');

            this.start.onclick = this.startGame;
            this.t_out.onclick = this.timeOut;
        }
    }

    Star.prototype.createStar = function() {
        this.width = Math.floor(Math.random() * 70) + 30;
        this.x = Math.floor(Math.random() * 1000) + 60;
        this.y = Math.floor(Math.random() * 450) + 40;

        let newStar = document.createElement('img');
        newStar.style.position = 'absolute';
        newStar.style.left = this.x + 'px';
        newStar.style.top = this.y + 'px';
        newStar.style.width = this.width + 'px';
        newStar.src = 'image/1.png';
        document.body.appendChild(newStar);
        newStar.onclick = this.remove;
    }

    Star.prototype.startGame = function() {
        that.timer();
        timer1 = setInterval(function() {
            that.createStar();
            w_num++;
            that.schedule.style.width = w_num * 5 + 'px';
            that.schedule.style.background = 'rgba(0, 255, 10)';
            if (w_num > 20) {
                clearInterval(timer1);
                alert('游戏结束' + '\n' + '耗时' + s_num + '秒');
                location.reload();
            }
        }, speed);
    }

    Star.prototype.timeOut = function() {
        alert('游戏暂停！');
    }

    Star.prototype.timer = function() {
        timer2 = setInterval(function() {
            s_num++;
            that.second.innerHTML = s_num;
        }, 1000);
    }

    Star.prototype.remove = function() {
        w_num--;
        that.schedule.style.width = w_num * 5 + 'px';
        this.remove();
    }

    document.addEventListener('selectstart', function(e) { //不可选中文字
        e.preventDefault();
    });

    star = new Star();
});