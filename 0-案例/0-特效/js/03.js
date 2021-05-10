window.addEventListener('load', function () {
	let text = document.querySelector('.text')

	text.innerHTML = text.textContent.replace(/\S/g, '<span>$&</span>')

	let spans = document.querySelectorAll('.text span')

	spans.forEach(span => {
		span.addEventListener('mouseenter', function () {
			let that = this
			this.classList.add('active')

			setTimeout(function () {
				that.classList.remove('active')
			}, 30000)
		})
	})
})
