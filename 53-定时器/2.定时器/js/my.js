// 1.
// setTimeout(function() {
//     console.log('123');
// }, 2000)

// 2.
// function time() {
//     console.log('123');
// }
// var time1 = setTimeout(time, 3000);

var btn = document.querySelector('button');
btn.addEventListener('click', function(e) {
    // clearTimeout(time1);
    clearTimeout(time2);
})

function times() {
    console.log('abc');
}
var time2 = setInterval(times, 200);