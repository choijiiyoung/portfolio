const section = document.querySelectorAll('section')[1];
const contArea = section.querySelector('.cont_area');
console.log(contArea);

let tags = '';

fetch('DB/department.json')
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		const memberData = data.members;
		// const scheduleData = data.schedule;

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
	})
	.catch((err) => {
		console.log(err);
	});
