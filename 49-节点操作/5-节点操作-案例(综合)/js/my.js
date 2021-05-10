var tbody = document.querySelector('.by');
console.log(tbody);

var obj = [{
    name: '张三',
    lang: 'HTML5',
    difficulty: '零颗星'
}, {
    name: '李四',
    lang: 'CSS3',
    difficulty: '一颗星'
}, {
    name: '小吴',
    lang: 'JavaScript',
    difficulty: '三颗星'
}];

for (var i = 0; i < obj.length; i++) {

    var trs = document.createElement('tr');
    tbody.appendChild(trs);

    for (var k in obj[i]) {
        var td = document.createElement('td');
        trs.appendChild(td);
        td.innerHTML = obj[i][k];
    }

    var a = document.createElement('td');
    a.innerHTML = '<a href="javascript:;">删除</a>';
    trs.appendChild(a);

    a.onclick = function() {
        tbody.removeChild(this.parentNode);
    }
}