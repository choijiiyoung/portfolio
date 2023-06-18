const secs = document.querySelectorAll('.sec');
const nav = document.querySelector('#scroll_navi');
const navLi = nav.querySelectorAll('li');
const navBtns = nav.querySelectorAll('a');
const baseline = -window.innerHeight / 2;
const speed = 500;
let enableEvent = true;
let autoScroll = true;
let eventBlocker = null;

window.addEventListener('scroll', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		activation();
		eventBlocker = null;
	}, speed);
});
window.addEventListener('resize', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		modifyPos();
		eventBlocker = null;
	}, speed);
});

autoScroll & window.addEventListener('mousewheel', moveAuto, { passive: false });

navBtns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		enableEvent && moveScroll(idx);
	});
});

function activation() {
	const scroll = window.scrollY;

	secs.forEach((_, idx) => {
		if (scroll > secs[idx].offsetTop + baseline) {
			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');

			for (const el of navLi) el.classList.remove('on');
			navLi[idx].classList.add('on');
		}
	});
}

function moveScroll(idx) {
	enableEvent = false;
	new Anime(window, {
		prop: 'scroll',
		value: secs[idx].offsetTop,
		duration: speed,
		callback: () => (enableEvent = true),
	});
}

function modifyPos() {
	const active = nav.querySelector('li.on');
	const active_index = Array.from(navLi).indexOf(active);
	window.scrollTo({ top: secs[active_index].offsetTop, behavior: 'smooth' });
}

function moveAuto(e) {
	e.preventDefault();
	const active = nav.querySelector('li.on');
	const active_index = Array.from(navLi).indexOf(active);

	if (e.deltaY > 0) {
		console.log('wheel down');
		if (active_index === navLi.length - 1) return;
		moveScroll(active_index + 1);
	} else {
		console.log('wheel up');
		if (active_index === 0) return;
		moveScroll(active_index - 1);
	}
}
