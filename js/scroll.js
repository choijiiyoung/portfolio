const secs = document.querySelectorAll('.my_scroll');
const nav = document.querySelector('#scroll_navi');
const navBtns = nav.querySelectorAll('li');
const visual = document.querySelector('#visualWrap');
// const baseline = -300;
const baseline = -window.innerHeight / 3;
const speed = 500;
let enableEvent = true;
let eventBlocker = null;

window.addEventListener('load', () => {
	setTimeout(() => {
		console.log('load');
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

navBtns.forEach((btn, idx) => {
	btn.addEventListener('click', () => enableEvent && moveScroll(idx));
});

function activation() {
	const scroll = window.scrollY;

	if (scroll <= 500) {
		for (const el of secs) el.classList.remove('on');
	}

	secs.forEach((_, idx) => {
		if (scroll > secs[idx].offsetTop + baseline) {
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
