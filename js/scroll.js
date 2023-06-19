const secs = document.querySelectorAll('.my_scroll');
const nav = document.querySelector('#scroll_navi');
const navBtns = nav.querySelectorAll('li');
const speed = 500;
const baseline = -300;
let enableEvent = true;
let autoScroll = true;
let eventBlocker = null;

window.addEventListener('load', () => {
	console.log('load');
	const visual = document.querySelector('#visualWrap');

	setTimeout(() => {
		visual.classList.add('active');
	}, 500);
});

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
	btn.addEventListener('click', () => enableEvent && moveScroll(idx));
});

function activation() {
	const scroll = window.scrollY;

	secs.forEach((_, idx) => {
		if (scroll > secs[idx].offsetTop + baseline) {
			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');

			for (const el of navBtns) el.classList.remove('on');
			navBtns[idx].classList.add('on');
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
	const active_index = Array.from(navBtns).indexOf(active);
	window.scrollTo({ top: secs[active_index].offsetTop, behavior: 'smooth' });
}

function moveAuto(e) {
	e.preventDefault();
	const active = nav.querySelector('li.on');
	const active_index = Array.from(navBtns).indexOf(active);

	if (e.deltaY > 0) {
		console.log('wheel down');
		if (active_index === navBtns.length - 1) return;
		moveScroll(active_index + 1);
	} else {
		console.log('wheel up');
		if (active_index === 0) return;
		moveScroll(active_index - 1);
	}
}
