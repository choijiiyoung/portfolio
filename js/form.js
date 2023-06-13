const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
});

//텍스트항목 인증
function isTxt(name, len) {
	const input = document.querySelector(`[name=${name}]`);
	const value = input.value.trim();

	if (value.length < len) {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `텍스트는 ${len}글자 이상 입력하세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

//비밀번호 인증
function isPwd(pwd1, pwd2, len) {
	const inputPwd1 = document.querySelector(`[name=${pwd1}]`).value.trim();
	const inputPwd2 = document.querySelector(`[name=${pwd2}]`).value.trim();

	if (inputPwd1.length < len || inputPwd1 !== inputPwd2) {
		alert(`비밀번호 항목 2개를 동일하게 입력하고 ${len}글자 이상 입력하세요.`);
		return false;
	} else {
		return true;
	}
}

//이메일 인증
function isEmail(name, len) {
	const input = document.querySelector(`[name=${name}]`).value.trim();
	console.log(input.indexOf('@'));

	if (input.indexOf('@') < 0) {
		alert(`이메일에 @를 포함하고 ${len}글자 이상 입력하세요.`);
		return false;
	} else {
		return true;
	}
}

//체크박스 인증
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;

	for (const input of inputs) input.checked && (isChecked = true);
	console.log(isChecked);
	if (!isChecked) {
		resetErr(inputs);

		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 선택사항을 하나이상 체크하세요.`;
		inputs[0].closest('td').append(errMsg);
		return false;
	} else {
		resetErr(inputs);
		return true;
	}
}

//셀렉트박스 인증
function isSelect(name) {
	const input = document.querySelector(`[name=${name}]`);
	console.log(input);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;

	if (value === '') {
		resetErr(input);

		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 선택사항을 하나이상 체크하세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

//에러메세지 제거
function resetErr(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const errMsg = el.closest('td').querySelector('p');
	if (errMsg) el.closest('td').querySelector('p').remove();
}
