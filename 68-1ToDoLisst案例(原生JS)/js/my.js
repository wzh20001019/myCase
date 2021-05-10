window.addEventListener('load', function() {

    let search = document.querySelector('#title'),
        tos = document.querySelector('.to'),
        dos = document.querySelector('.do'),
        sp1 = document.querySelector('.sp1'),
        sp2 = document.querySelector('.sp2');

    create(); //打开页面就渲染页面

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
            if (search.value.trim() == '') {
                alert('请输入内容');
                search.select();
            } else {
                let val = search.value.trim();
                search.value = '';
                let val_arr = getData();

                val_arr.push({
                    title: val,
                    flag: false
                });
                setData(val_arr);
                create();
            }
        }
    });

    //存数据
    function setData(data) {
        localStorage.setItem('todo', JSON.stringify(data));
    }

    //获取数据
    function getData() {
        let data = localStorage.getItem('todo');

        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 创建元素
    function create() {
        let data = getData();
        tos.innerHTML = '';
        dos.innerHTML = '';

        data.forEach(function(item, index) {
            if (item.flag == false) {
                let li = '<li><input type="checkbox" id=' + index + '><p>' + item.title + '</p><a href="javascript:;" id=' + index + '></a></li>';
                tos.insertAdjacentHTML('beforeend', li);
            } else {
                let li = '<li><input type="checkbox" id=' + index + ' checked="checked"><p>' + item.title + '</p><a href="javascript:;" id=' + index + '></a></li>';
                dos.insertAdjacentHTML('beforeend', li);
            }
        });
        getElement();
    }

    function getElement() {
        let a = document.querySelectorAll('li a');
        let ipt = document.querySelectorAll('li input');
        let num1 = tos.children.length;
        let num2 = dos.children.length;
        sp1.innerText = num1;
        sp2.innerText = num2;
        a.forEach(function(item) {
            item.onclick = function() {
                let data = getData();
                data.splice(this.id, 1);
                setData(data);
                create();
            }
        });

        ipt.forEach(function(item) {
            item.onclick = function() {
                let data = getData();
                data[this.id].flag = this.checked;
                setData(data);
                create();
            }
        });
    }
});