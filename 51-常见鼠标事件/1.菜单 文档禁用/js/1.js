// 1.禁止鼠标右键
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
})

// 2.禁止选中文本文档
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
})