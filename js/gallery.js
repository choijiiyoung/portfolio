const gallery = document.querySelector('.gallery .gallery_wrap');
const api_key = 'db5673d91b2fb6704d13f6b0181efd99';
const num = 20;
const myId = '198483448@N02';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList';
const url_interest = `${baseURL}${method_interest}`;

fetchData(url_interest);

async function fetchData(url) {
	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;

	console.log(items);

	let tags = '';
	items.forEach((item, idx) => {
		tags += `
			<li class='item'>
				<div>
					<p>${item.title === '' ? 'Have a good day!!' : item.title}</p> 
          <a> 
            <img class='pic' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'/>
          </a>
					
					<article class='profile'>
						<span>${item.owner}</span>
						<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />
					</article>
				</div>
			</li>
		`;
	});
	gallery.innerHTML = tags;
}

// function createList(){

// }
