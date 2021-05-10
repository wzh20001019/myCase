window.addEventListener('load', function() {
    var that;

    class Tab {
        constructor() {
            that = this;
            this.tab = document.querySelector('.tab');
            this.ul = this.tab.querySelector('ul');
            this.btn = this.tab.querySelector('.btn span');
            this.sectionBox = this.tab.querySelector('.tab-bottom')
            this.init();
        }

        getElement() {
            this.lis = this.ul.querySelectorAll('li');
            this.sections = this.sectionBox.querySelectorAll('section');
            this.as = this.ul.querySelectorAll('li a');
            this.spans = this.ul.querySelectorAll('li span');
        }

        init() {
            this.getElement();

            this.btn.onclick = this.addTab;
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.as[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }

        }

        clearClass() {
            for (let i = 0; i < that.lis.length; i++) {
                that.lis[i].className = '';
                that.sections[i].className = '';
            }
        }

        toggleTab() {
            that.clearClass();
            this.className = 'current';
            that.sections[this.index].className = 'different';
        }

        addTab() {
            that.clearClass();
            var li = '<li class="current"><span>Tab</span><a href="javascript:;">×</a></li>';
            var section = '<section class="different">Tab</section>';

            that.ul.insertAdjacentHTML('beforeend', li);
            that.sectionBox.insertAdjacentHTML('beforeend', section);
            that.init();
        }

        removeTab(e) {
            e.stopPropagation();
            var index = this.parentNode.index;
            this.parentNode.remove();
            that.sections[index].remove();
            that.init();

            if (this.parentNode.className == '') {
                return;
            }
            that.lis[index - 1] && that.lis[index - 1].onclick();
        }

        editTab() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); //禁止双击选中文字
            var val = this.innerHTML;
            this.innerHTML = '<input type="text" />';
            var input = this.children[0];
            input.select();
            input.value = val;

            input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }

            input.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
    }

    var tab = new Tab();
});