const gallery = document.querySelector('.gallery .gallery_wrap');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn_search');
const api_key = 'db5673d91b2fb6704d13f6b0181efd99';
const num = 20;
const myId = '198483448@N02';

fetchData(setURL('interest'));

btnSearch.addEventListener('click', getSearch);

//input 키보드 이벤트
input.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());

//이벤트 위임
document.body.addEventListener('click', (e) => {
	console.log(e.target);
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
	if (e.target.className === 'userid') fetchData(setURL('user', e.target.innerText));
});

//인수값에 따른 데이터 호출 URL반환 함수
function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

function getSearch() {
	const value = input.value.trim();
	input.value = '';
	if (value === '') alert('검색어를 입력해주세요.');
	fetchData(setURL('search', value));
}

async function fetchData(url) {
	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;

	console.log(items);
	createList(items);
}

//갤러리 동적 생성 함수
function createList(arr) {
	let tags = '';
	arr.forEach((item) => {
		tags += `
			<li class='item'>
				<div>
          <div class='pic'> 
            <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'/>
          </div>
					
					<article class='profile'>
						<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />
						<p>${item.title === '' ? 'Have a good day!!' : item.title}</p> 
						<span class='userid'>${item.owner}</span>
					</article>
				</div>
			</li>
		`;
	});
	gallery.innerHTML = tags;
}

//팝업 동적 생성 함수
function createPop(url) {
	const aside = document.createElement('aside');
	aside.className = 'pop';
	const tags = `
		<div class='con'>
			<img src='${url}'/>
		</div>

		<span class='close'>close</span>
	`;
	aside.innerHTML = tags;
	document.body.append(aside);
	setTimeout(() => aside.classList.add('on'), 0);
	document.body.style.overflow = 'hidden';
}

//팝업 제거 함수
function removePop() {
	const pop = document.querySelector('.pop');
	pop.classList.remove('on');
	setTimeout(() => pop.remove(), 1000);
	document.body.style.overflow = 'auto';
}
