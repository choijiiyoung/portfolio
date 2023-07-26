const defaults = document.querySelector('.defaults');
const mask = document.querySelector('.mask');
let tags = '';
const baseURL = 'https://choijiiyoung.github.io/portfolio';
const imgs = [
	baseURL + '/img/sub/Department.jpg',
	baseURL + '/img/sub/Gallery.jpg',
	baseURL + '/img/sub/Location.jpg',
	baseURL + '/img/sub/Youtube.jpg',
	baseURL + '/img/sub/Members.jpg',
];
const lenImg = imgs.length;

createDOM();

// 동적으로 이미지 돔 생성 함수
function createDOM() {
	imgs.forEach((src) => {
		tags += `<img src= ${src} />`;
		defaults.innerHTML = tags;
	});
}

// 이미지소스 로딩완료 검사 함수
function loadImg() {
	return new Promise((res, rej) => {
		let countImg = 0;
		const imgDOM = defaults.querySelectorAll('img');

		imgDOM.forEach((img) => {
			img.onload = () => {
				countImg++;
				console.log('img loaded..', countImg);

				if (countImg === lenImg) {
					res(true);
				}
			};
		});
	});
}

// 이미지 캐싱 여부 promise.all을 통해서 확인
// promise.all()로 loadImg함수가 모두 프로미스 객체를 반환할때까지 기다린후 동기화 처리
Promise.all([loadImg()]).then((result) => {
	console.log(result);
	mask.classList.add('off');

	setTimeout(() => {
		mask.remove();
		defaults.remove();
	}, 2000);
});
