window.addEventListener('resize', function(e) {
    if (window.innerWidth <= 600) {
        document.body.style.backgroundColor = 'red';
    } else if (window.innerWidth <= 800) {
        document.body.style.backgroundColor = 'blue';
    } else if (window.innerWidth <= 1000) {
        document.body.style.backgroundColor = 'aqua';
    } else if (window.innerWidth <= 1200) {
        document.body.style.backgroundColor = 'orange';
    }
})