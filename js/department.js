// fetch('DB/department.json')
// 	.then((res) => {
// 		return res.json();
// 	})
// 	.then((data) => {
// 		//member data
// 		const memberData = data.members;

// 		if (memberData.length > 0) {
// 			tags = '';
// 			memberData.map((data) => {
// 				tags += `
// 					<article>
// 						<div class='pic'>
// 							<img src='img/department/${data.pic}' />
// 						</div>
// 						<div class="info">
// 							<p class="name">${data.name}</p>
// 							<p class="pos">${data.position}</p>
// 							<span class="dept">${data.dept}</span>
// 						</div>
// 					</article>
// 				`;
// 			});
// 			contArea.innerHTML = tags;
// 		}

// 		//schedule data
// 		const scheduleData = data.schedule;
// 		if (scheduleData.length > 0) {
// 			tags = '';
// 			scheduleData.map((data) => {
// 				tags += `
// 					<li>
// 						<p class="title">${data.subj}</p>
// 						<div class="place">
// 							<p>${data.date}</p>
// 						</div>
// 					</li>
// 				`;
// 			});
// 			contLi.innerHTML = tags;
// 		}
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const section = document.querySelectorAll('section')[1];
let tags;

fetchData();

//데이터 fetching 함수
async function fetchData() {
	const data = await fetch('DB/department.json');
	const json = await data.json();

	console.log(json, 'json');

	createMember(json);
	createSchedule(json);
}

//member data 동적 생성
function createMember(arr) {
	tags = '';
	const contArea = section.querySelector('.cont_area');
	const memberData = arr.members;

	memberData.map((data) => {
		tags += `
				<article>
					<div class='pic'>
						<img src='img/department/${data.pic}' />
					</div>
					<div class="info">
						<p class="name">${data.name}</p>
						<p class="pos">${data.position}</p>
						<span class="dept">${data.dept}</span>
					</div>
				</article>
			`;
	});
	contArea.innerHTML = tags;
}

//schedule data 동적 생성
function createSchedule(arr) {
	tags = '';
	const ul = document.createElement('ul');
	const listArea = section.querySelector('.list_area');
	const scheduleData = arr.schedule;

	scheduleData.forEach((data) => {
		tags += `
			<li>
				<p class="title">${data.subj}</p>
				<div class="place">
					<p>${data.date}</p>
				</div>
			</li>
		`;
	});
	ul.innerHTML = tags;
	listArea.append(ul);
}
