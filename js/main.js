const secs = document.querySelectorAll('.sec');
const nav = document.querySelector('.navigation');
const navLi = nav.querySelectorAll('li');
const navBtns = nav.querySelectorAll('a');
const baseline = -window.innerHeight / 2;
const speed = 500;
let enableEvent = true;

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
		enableEvent && moveScroll(idx);
	});
});

function moveScroll(idx) {
	enableEvent = false;
	new Anime(window, {
		prop: 'scroll',
		value: secs[idx].offsetTop,
		duration: speed,
		callback: () => (enableEvent = true),
	});
}
