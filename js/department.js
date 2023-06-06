const section = document.querySelectorAll('section')[1];
const contArea = section.querySelector('.cont_area');
const contLi = section.querySelector('ul');

let tags;

fetch('DB/department.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		//member data
		const memberData = data.members;

		if (memberData.length > 0) {
			tags = '';
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

		//schedule data
		const scheduleData = data.schedule;
		if (scheduleData.length > 0) {
			tags = '';
			scheduleData.map((data) => {
				tags += `
					<li>
						<p class="title">${data.subj}</p>
						<div class="place">
							<p>${data.date}</p>
						</div>
					</li>
				`;
			});
			contLi.innerHTML = tags;
		}
	})
	.catch((err) => {
		console.log(err);
	});
