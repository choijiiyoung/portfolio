const section = document.querySelectorAll('section.last');
const contArea = document.querySelector('.cont_area');
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
            <img src='img/${data.pic}' />
          </div>
          <p>${data.name}</p>
          <p>${data.position}</p>
          <span>${data.dept}</span>
       </article>
      `;
		});
		contArea.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
