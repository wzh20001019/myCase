var input = document.querySelector('input');
// console.log(input);

document.addEventListener('keyup', function(e) {
    if (e.keyCode === 83) {
        input.focus();
    }
})