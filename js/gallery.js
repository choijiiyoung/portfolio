const gallery = document.querySelector('.gallery .gallery_wrap');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn_search');
const api_key = 'db5673d91b2fb6704d13f6b0181efd99';
const num = 10;
const myId = '198483448@N02';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const method_search = 'flickr.photos.search';
const interest_url = `${baseURL}${method_interest}`;
const user_url = `${baseURL}${method_user}&user_id=${myId}`;

fetchData(interest_url);

btnSearch.addEventListener('click', () => {
	const inputVal = input.value.trim();
	if (inputVal === '') alert('검색어를 입력해주세요.');
	const url_search = `${baseURL}${method_search}&tags=${inputVal}`;
	fetchData(url_search);
});

document.body.addEventListener('click', (e) => {
	console.log(e.target.className);
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

async function fetchData(url) {
	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;

	console.log(items);

	createList(items);
}

function createList(arr) {
	let tags = '';
	arr.forEach((item, idx) => {
		tags += `
			<li class='item'>
				<div>
          <div class='pic'> 
            <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'/>
          </div>
					
					<article class='profile'>
						<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />
						<p>${item.title === '' ? 'Have a good day!!' : item.title}</p> 
						<span>${item.owner}</span>
					</article>
				</div>
			</li>
		`;
	});
	gallery.innerHTML = tags;
}

//팝업 동적 생성 함수
function createPop(url) {
	const tags = `
		<div class='con'>
			<img src='${url}'/>
		</div>

		<span class='close'>close</span>
	`;

	const aside = document.createElement('aside');
	aside.className = 'pop';
	aside.innerHTML = tags;

	setTimeout(() => aside.classList.add('on'), 0);
	document.body.append(aside);
	document.body.style.overflow = 'hidden';
}

//팝업 제거 함수
function removePop() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => {
		document.querySelector('.pop').remove();
	}, 1000);
	document.body.style.overflow = 'auto';
}
