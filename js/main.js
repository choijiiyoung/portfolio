const secs = document.querySelectorAll('.sec');
const nav = document.querySelector('.navigation');
const navBtns = nav.querySelectorAll('li');
const baseline = -window.innerHeight / 2;
console.log(baseline);

window.addEventListener('scroll', () => {
	const scroll = window.scrollY;
	console.log(scroll);

	secs.forEach((_, idx) => {
		if (scroll > secs[idx].offsetTop + baseline) {
			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');

			for (const el of navBtns) el.classList.remove('on');
			navBtns[idx].classList.add('on');
		}
	});
});
