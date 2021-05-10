window.addEventListener('load', function() {
    var that;

    class Tab {
        constructor(id) {
            that = this;
            this.wrap = document.querySelector(id);
            this.ul = this.wrap.querySelector('ul');
            this.box2 = this.wrap.querySelector('.box2');
            this.btn = this.wrap.querySelector('.jia');
            this.init();
        }

        init() { //初始化
            this.updateNode();
            this.btn.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.a[i].onclick = this.removeTab;
                this.span[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }

        updateNode() {
            this.lis = this.wrap.querySelectorAll('ul li');
            this.sections = this.wrap.querySelectorAll('.box2 section');
            this.a = this.ul.querySelectorAll('li a');
            this.span = this.ul.querySelectorAll('li .sp1');
        }

        toggleTab() { //切换
            for (var j = 0; j < that.lis.length; j++) {
                that.lis[j].className = '';
                that.sections[j].className = '';
            }
            this.className = 'rem';
            that.sections[this.index].className = 'bk';
        }

        addTab() { //添加
            var r = Math.random(); //定义一个随机数变量
            var li = '<li><span class="sp1">新选项卡</span><a href="javascript:;"><span class="ico">×</span></a></li>';
            var section = '<section>测试' + r + '</section>';
            that.ul.insertAdjacentHTML('beforeEnd', li); //添加元素  支持追加字符串
            that.box2.insertAdjacentHTML('beforeEnd', section);
            that.init();
        }

        removeTab(e) { //删除
            e.stopPropagation(); //阻止冒泡
            var index = this.parentNode.index; //获取li的索引号
            that.lis[index].remove(); //删除当前li标签
            that.sections[index].remove(); //删除当前section标签
            that.init();

            index--;
            if (document.querySelector('.rem')) { //判断是否有这个类
                return;
            }
            that.lis[index] && that.lis[index].click(); //判断前面的语句是否为真
        }

        editTab() { //修改
            var str = this.innerHTML;
            window.getSelection() ? window.getSelection().removeAllRanges() : document.Selection.empty(); //双击不会选中文字
            this.innerHTML = '<input type="text" value="' + str + '"/>'; //创建元素 input
            var input = this.querySelector('input'); //获取元素
            input.select(); //文本框文字处于选中状态

            input.onblur = function() { //失去焦点事件
                this.parentNode.innerHTML = this.value;
            }

            input.onkeyup = function(e) { //键盘弹起事件
                if (e.keyCode === 13) { //判断按下的是否为 回车键
                    this.blur(); //失去焦点
                }
            }
        }
    }

    var tab = new Tab('.wrap');
})