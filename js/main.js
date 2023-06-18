const secs = document.querySelectorAll('.sec');
const nav = document.querySelector('.navigation');
const navLi = nav.querySelectorAll('li');
const navBtns = nav.querySelectorAll('a');
const baseline = -window.innerHeight / 2;

window.addEventListener('scroll', () => {
	const scroll = window.scrollY;

	secs.forEach((_, idx) => {
		if (scroll > secs[idx].offsetTop + baseline) {
			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');

			for (const el of navLi) el.classList.remove('on');
			navLi[idx].classList.add('on');
		}
	});
});

navBtns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		const li = e.target.closest('li');
		for (el of navLi) el.classList.remove('on');
		li.classList.add('on');
		window.scrollTo(0, secs[idx].offsetTop);
	});
});

window.addEventListener('mousewheel', () => {
	const scroll = window.scrollY;
	console.log(scroll);
});
