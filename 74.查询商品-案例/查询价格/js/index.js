window.addEventListener('load', function() {
    var arr = [{
        id: 1,
        name: '小米',
        price: 2999
    }, {
        id: 2,
        name: '魅族',
        price: 1999
    }, {
        id: 3,
        name: '华为',
        price: 3999
    }, {
        id: 4,
        name: '荣耀',
        price: 2599
    }];

    var tbody = document.querySelector('tbody');

    fn(arr);

    function fn(arr) {
        tbody.innerHTML = '';
        var trs = document.querySelectorAll('tbody tr');
        if (trs.length > 0) {
            num = 0;
        }

        var num = 0;
        arr.forEach(function(value) {
            num++;
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>' + num + '</td><td>' + value.name + '</td><td>' + value.price + '</td>';
            tbody.appendChild(tr);
        });
    }

    var ipt = document.querySelectorAll('.search input');
    var btn = document.querySelectorAll('.search button');

    btn[0].onclick = function() {
        var val1 = parseInt(ipt[0].value.trim());
        var val2 = parseInt(ipt[1].value.trim());
        if (val1 > val2) {
            ipt[1].value = '';
        }
        if (val1 > 3999) {
            alert('没有找到！');
        }
        if (ipt[0].value == '' || ipt[1].value == '') {
            alert('请输入价格');
        }
        var newArr = arr.filter(function(value) {
            return (value.price > val1 && value.price < val2);
        });
        fn(newArr);
        ipt[0].value = '';
        ipt[1].value = '';
    }

    btn[1].onclick = function() {
        var val = ipt[2].value.trim();
        if (val == '') {
            alert('请输入商品名称');
        }
        var newArr1 = arr.filter(function(value) {
            return value.name == val;
        });
        fn(newArr1);
        ipt[2].value = '';
    }
});