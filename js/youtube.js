const ytbWrap = document.querySelector('.youtube');
const elSlide = ytbWrap.querySelector('.slide_area');
const elTxt = ytbWrap.querySelector('.info_wrap .txt_wrap');
const elList = ytbWrap.querySelector('.ytb_list');
const prev = ytbWrap.querySelector('.prev');
const next = ytbWrap.querySelector('.next');
const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`;
const key = 'AIzaSyAuF0TpI6-3VX54rC1jnTjptdGcBXybDGU';
let tags;
let num = 0;
let activeNum = 0;

fetchSlide();
fetchList();

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

//슬라이드 fetching함수
async function fetchSlide() {
	num = 5;
	const list = 'PLFAS7kFpzjoPZEvZ5LcpGZkgyn_FOx9Qg';
	const url = `${baseURL}&playlistId=${list}&key=${key}&maxResults=${num}`;
	const data = await fetch(url);
	const json = await data.json();
	createSlide(json.items);
	createTxt(json.items);

	elSlide.append(elSlide.firstElementChild);
	elSlide.append(elSlide.firstElementChild);
	slideNext();
	slidePrev();
}

//리스트 fetching함수
async function fetchList() {
	num = 4;
	const list = 'PLFAS7kFpzjoOzH0K-VNLbCyY2fnoyMYh8';
	const url = `${baseURL}&playlistId=${list}&key=${key}&maxResults=${num}`;
	const data = await fetch(url);
	const json = await data.json();
	createList(json.items);
}

//슬라이드 영역 생성 함수
function createSlide(arr) {
	tags = '';
	arr.forEach((item, idx) => {
		let thumb = item.snippet.thumbnails.standard.url;
		let videoId = item.snippet.resourceId.videoId;
		let date = item.snippet.publishedAt;

		tags += `
				<article>
					<div class='pic'>
						<img class="thumb" src="${thumb}" alt=${videoId} />
						<span class='num'>0${idx + 1}</span>
					</div>

					<div class='txt'>
						<p>${date.split('T')[0].split('-').join('.')}</p>
					</div>
				</article>
			`;
	});
	elSlide.innerHTML = tags;
	elSlide.querySelectorAll('article')[0].classList.add('on');
}

//텍스트 영역 생성 함수
function createTxt(arr) {
	tags = '';
	arr.forEach((item, idx) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;

		tags += `
				<div class='panel'>
					<div class='num'>
						<span>0${idx + 1}</span>
					</div>
					<div class='txt'>
						<h2>${tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h2>
						<p>${desc.length > 80 ? desc.substr(0, 80) + '...' : desc}</p>
					</div>
				</div>
			`;
	});
	elTxt.innerHTML = tags;
	elTxt.querySelectorAll('.panel')[0].classList.add('on');
}

//리스트 영역 생성 함수
function createList(arr) {
	tags = '';
	arr.forEach((item) => {
		let thumb = item.snippet.thumbnails.standard.url;
		let tit = item.snippet.title;
		let date = item.snippet.publishedAt;
		let desc = item.snippet.description;
		let videoId = item.snippet.resourceId.videoId;

		tags += `
			<li>
				<article>
					<div class='pic'>
						<img class="thumb" src="${thumb}" alt=${videoId} />
					</div>

					<div class='title'>
						<h3>${tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h3>
						<p>${date.split('T')[0].split('-').join('.')}</p>
					</div>
					<p class='txt'>${desc.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
				</article>
			</li>
		`;
	});
	elList.innerHTML = tags;
}

//팝업 생성 함수
function createPop(id) {
	tags = `
		<div class='con'>
			<iframe src='https://www.youtube.com/embed/${id}'></iframe>
		</div>
		<span class='close'>close</span>
	`;

	const pop = document.createElement('aside');
	pop.className = 'pop';
	pop.innerHTML = tags;
	document.body.append(pop);

	setTimeout(() => document.querySelector('.pop').classList.add('on'), 0);
	document.body.style.overflow = 'hidden';
}

//팝업 제거 함수
function removePop() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => document.querySelector('.pop').remove(), 500);
	document.body.style.overflow = 'auto';
}

//슬라이드 Next 버튼
function slideNext() {
	const panels = Array.from(elTxt.querySelectorAll('.panel'));
	const slideItem = elSlide.querySelectorAll('article');
	const slideArr = Array.from(slideItem);

	next.addEventListener('click', () => {
		elSlide.append(elSlide.firstElementChild);
		activeNum === slideArr.length - 1 ? (activeNum = 0) : activeNum++;
		activation(panels, activeNum);
	});
}

//슬라이드 Prev 버튼
function slidePrev() {
	const panels = Array.from(elTxt.querySelectorAll('.panel'));
	const slideItem = elSlide.querySelectorAll('article');
	const slideArr = Array.from(slideItem);

	prev.addEventListener('click', () => {
		elSlide.prepend(elSlide.lastElementChild);
		activeNum === 0 ? (activeNum = slideArr.length - 1) : activeNum--;
		activation(panels, activeNum);
	});
}

function activation(arr, index) {
	for (const el of arr) el.classList.remove('on');
	arr[index].classList.add('on');
	console.log(index);
}
