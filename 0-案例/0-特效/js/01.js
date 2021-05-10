window.addEventListener('load', function () {
	let btnS = document.querySelectorAll('a')

	btnS.forEach(btn => {
		btn.addEventListener('click', function (e) {
			let x = e.pageX - e.target.offsetLeft
			let y = e.pageY - e.target.offsetTop

			let createSpan = document.createElement('span')

			createSpan.style.left = x + 'px'
			createSpan.style.top = y + 'px'

			this.appendChild(createSpan)

			setTimeout(function () {
				createSpan.remove()
			}, 400)
		})
	})
})
