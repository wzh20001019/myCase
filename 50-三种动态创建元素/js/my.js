var body = document.body;
console.log(body);

// 1.createElement()
// var d1 = +new Date();
// for (var i = 0; i <= 1000; i++) {
//     var a = document.createElement('a');
//     document.body.appendChild(a);
// }
// var d2 = +new Date();
// console.log(d2 - d1);

// var D1 = +new Date();
// var a = document.querySelectorAll('a');
// for (var i = 0; i <= a.length; i++) {
//     var p = document.createElement('p');

//     a[i].appendChild(p);
// }
// var D2 = +new Date();
// console.log(D2 - D1);

var btn = document.querySelector('.btn1');
// console.log(btn);

// 1.传统点击事件
// btn.onclick = function() {
//     alert('123');
// }

// btn.nextElementSibling.onclick = function() {
//     alert('abc');
//     btn.nextElementSibling.onclick = null;
// }

// 2.高级 点击事件
btn.addEventListener('click', function() {
    alert('123');
})

btn.nextElementSibling.addEventListener('click', fn)

function fn() {
    alert('qwerty');
    btn.nextElementSibling.removeEventListener('click', fn)
}