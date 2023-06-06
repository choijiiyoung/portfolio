const section = document.querySelectorAll('section')[1];
const contArea = section.querySelector('.cont_area');
const contLi = section.querySelector('ul');

let tags = '';
let tags2 = '';

fetch('DB/department.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		const memberData = data.members;
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

		const scheduleData = data.schedule;
		scheduleData.map((data) => {
			tags2 += `
				<li>
					<p class="title">${data.subj}</p>
					<div class="place">
						<p>${data.date}</p>
					</div>
				</li>
			`;
		});
		contLi.innerHTML = tags2;
	})

	.catch((err) => {
		console.log(err);
	});
