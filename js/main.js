const accoList = document.querySelector('.acco_wrap ul');
const acco_li = accoList.querySelectorAll('li');
const prodList = document.querySelector('.prod_list');
const prod_li = prodList.querySelectorAll('li');
const collaboList = document.querySelector('.collabo_list');
const collabo_li = collaboList.querySelectorAll('li');

acco_li.forEach((el, idx) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		activation(acco_li, idx);
	});
});

prod_li.forEach((el, idx) => {
	el.addEventListener('mouseover', () => {
		activation(prod_li, idx);
	});
});

collabo_li.forEach((el, idx) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		activation(collabo_li, idx);
	});
});

function activation(arr, idx) {
	for (const el of arr) el.classList.remove('on');
	arr[idx].classList.add('on');
}
