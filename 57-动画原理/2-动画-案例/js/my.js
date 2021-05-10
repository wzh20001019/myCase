var fatherBox = document.querySelector('.father');
var a = fatherBox.children[0];
var sonBox = document.querySelector('.son');

fatherBox.addEventListener('mouseover', function() {
    a.innerHTML = '←';
    animation(sonBox, 0);
})
fatherBox.addEventListener('mouseout', function() {
    a.innerHTML = '→';
    animation(sonBox, 150);
})