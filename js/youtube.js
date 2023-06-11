const ytbWrap = document.querySelector('.youtube .ytb_wrap');
const elSlide = ytbWrap.querySelector('.slide_wrap');
const elTxt = ytbWrap.querySelector('.info_wrap .txt_wrap');
let tags;

fetchData();

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

// fetch(url)
// 	.then((data) => {
// 		return data.json();
// 	})
// 	.then((json) => {
// 		console.log(json.items);

// 		tags = '';
// 		json.items.forEach((item, idx) => {
// 			let thumb = item.snippet.thumbnails.standard.url;
// 			let videId = item.snippet.resourceId.videoId;
// 			let date = item.snippet.publishedAt;

// 			tags += `
// 				<article>
// 					<div class='pic'>
// 						<img class="thumb" src="${thumb}" alt=${videId}/>
// 						<span class='num'>0${idx + 1}</span>
// 					</div>

// 					<div class='txt'>
// 						<p>${date.split('T')[0].split('-').join('.')}</p>
// 					</div>
// 				</article>
// 			`;
// 		});
// 		elSlide.innerHTML = tags;
// 		elSlide.querySelectorAll('article')[2].classList.add('on');

// 		tags = '';
// 		json.items.forEach((item, idx) => {
// 			let tit = item.snippet.title;
// 			let desc = item.snippet.description;

// 			tags += `
// 				<div class='panel'>
// 					<div class='num'>
// 						<span>0${idx + 1}</span>
// 					</div>
// 					<div class='txt'>
// 						<h2>${tit.length > 40 ? tit.substr(0, 40) + '...' : tit}</h2>
// 						<p>${desc.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
// 					</div>
// 				</div>
// 			`;
// 		});
// 		elTxt.innerHTML = tags;
// 		elTxt.querySelectorAll('.panel')[2].classList.add('on');
// 	});

//데이터 fetching함수
async function fetchData() {
	const key = 'AIzaSyAuF0TpI6-3VX54rC1jnTjptdGcBXybDGU';
	const list = 'PLFAS7kFpzjoPZEvZ5LcpGZkgyn_FOx9Qg';
	const num = 3;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();

	console.log(json.items);

	createSlide(json.items);
	createTxt(json.items);
}

//슬라이드 영역 생성 함수
function createSlide(arr) {
	tags = '';
	arr.forEach((item, idx) => {
		let thumb = item.snippet.thumbnails.standard.url;
		let videId = item.snippet.resourceId.videoId;
		let date = item.snippet.publishedAt;

		tags += `
				<article>
					<div class='pic'>
						<img class="thumb" src="${thumb}" alt=${videId}/>
						<span class='num'>0${idx + 1}</span>
					</div>

					<div class='txt'>
						<p>${date.split('T')[0].split('-').join('.')}</p>
					</div>
				</article>
			`;
	});
	elSlide.innerHTML = tags;
	elSlide.querySelectorAll('article')[2].classList.add('on');
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
						<h2>${tit.length > 40 ? tit.substr(0, 40) + '...' : tit}</h2>
						<p>${desc.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
					</div>
				</div>
			`;
	});
	elTxt.innerHTML = tags;
	elTxt.querySelectorAll('.panel')[2].classList.add('on');
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
