window.addEventListener('load', function () {
	let section = document.querySelector('section')

	function createSpan() {
		let span = document.createElement('span')
		let size = parseInt(Math.random() * 60)

		span.style.width = size + 'px'
		span.style.height = size + 'px'

		span.style.left = Math.random() * (innerWidth - 60) + 'px'
		span.style.bottom = -60 + 'px'

		section.appendChild(span)

		if (size <= 30) {
			setTimeout(function () {
				span.remove()
			}, 10000)
		} else {
			setTimeout(function () {
				span.remove()
			}, 5000)
		}
	}

	setInterval(createSpan, 20)
})
