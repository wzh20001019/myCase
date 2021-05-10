var box = document.querySelector('.box');
var input = document.querySelector('input');

input.addEventListener('keyup', function(e) {
    box.innerHTML = this.value;
    if (this.value === '') {
        box.style.display = 'none';
    } else {
        box.style.display = 'block';
    }
})

input.addEventListener('focus', function(e) {
    box.style.display = 'block';
})

input.addEventListener('blur', function(e) {
    box.style.display = 'none'
})