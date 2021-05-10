window.addEventListener('load', function() {
    // 获取页面元素
    var text = document.querySelector('#text'),
        nc = document.querySelector('#nc'),
        yz = document.querySelector('#yz'),
        qq = document.querySelector('#qq'),
        pw1 = document.querySelector('#pw1'),
        pw2 = document.querySelector('#pw2');

    // 正则表达式
    var regText = /^1[3|4|5|6|7|8|9]\d{9}$/,
        regNc = /^[\u4e00-\u9fa5]{1,5}$/,
        regYz = /^\d{6}$/,
        regQQ = /^[1-9]\d{4,10}$/,
        regPw1 = /^[a-zA-Z\d_-]{6,15}/;

    // 调用函数
    regExp(text, regText);
    regExp(nc, regNc);
    regExp(yz, regYz);
    regExp(qq, regQQ);
    regExp(pw1, regPw1);

    // 封装函数
    function regExp(ele, reg) {
        ele.addEventListener('blur', function() {
            if (this.value.trim() != '') {
                if (reg.test(this.value)) {
                    this.nextElementSibling.className = 'green';
                    this.nextElementSibling.innerHTML = '输入格式正确';
                } else {
                    this.nextElementSibling.className = 'red';
                    this.nextElementSibling.innerHTML = '输入格式错误';
                }
            }
        });
    }

    // 绑定事件
    pw2.addEventListener('blur', function() {
        if (this.value === pw1.value) {
            this.nextElementSibling.className = 'green';
            this.nextElementSibling.innerHTML = '输入格式正确';
        } else {
            this.nextElementSibling.className = 'red';
            this.nextElementSibling.innerHTML = '输入格式错误';
        }
    });
});