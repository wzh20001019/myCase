var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var box = document.querySelector("div");
var span = document.querySelector('span');

btn1.addEventListener("click", function() {
    animation(span, 700);
    animation(box, 400, function() {
        box.style.backgroundColor = 'red';
    });
});
btn2.addEventListener('click', function() {
    animation(box, 800, function() {
        box.style.backgroundColor = 'pink';
    });
})