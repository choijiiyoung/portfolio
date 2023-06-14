const form = document.querySelector('#member');
const btnSubmit = document.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	if (!isEmail('email', 5)) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
});

//텍스트 인증 함수
function isTxt(name, len) {
	const input = document.querySelector(`[name=${name}]`);
	const value = input.value.trim();

	if (value.length < len) {
		resetErr(input);

		const errMsg = document.createElement('p');
		errMsg.innerText = `텍스트를 ${len}글자 이상 입력하세요.`;
		input.closest('td').append(errMsg);

		return false;
	} else {
		resetErr(input);
		return true;
	}
}

//비밀번호 인증 함수
function isPwd(pwd1, pwd2, len) {
	const pwdEl1 = document.querySelector(`[name=${pwd1}]`);
	const pwd1_val = pwdEl1.value.trim();
	const pwd2_val = document.querySelector(`[name=${pwd2}]`).value.trim();

	if (pwd1_val < 5 || pwd1_val !== pwd2_val) {
		resetErr(pwdEl1);

		const errMsg = document.createElement('p');
		errMsg.innerText = `비밀번호 2개 항목을 동일하게 입력하고 ${len}글자 이상 입력하세요.`;
		pwdEl1.closest('td').append(errMsg);

		return false;
	} else {
		resetErr(pwdEl1);
		return true;
	}
}

//이메일 인증 함수
function isEmail(name, len) {
	const email = document.querySelector(`[name=${name}]`);
	const email_val = email.value;
	if (email_val.indexOf('@') < 0 || email_val.length < len) {
		resetErr(email);

		const errMsg = document.createElement('p');
		errMsg.innerText = `이메일 주소에 @를 포함고 ${len}글자 이상 입력하세요.`;
		email.closest('td').append(errMsg);

		return false;
	} else {
		resetErr(email);
		return true;
	}
}

//셀렉트 인증 함수
function isSelect(name) {
	const select = document.querySelector(`[name=${name}]`);
	const selected_index = select.options.selectedIndex;
	console.dir(selected_index);
	const value = select.options[selected_index].value;
	console.log(value, 'value');

	if (value === '') {
		resetErr(select);

		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 요소중 하나를 선택해주세요.`;
		select.closest('td').append(errMsg);

		return false;
	} else {
		resetErr(select);
		return true;
	}
}

//라디오, 체크 박스 인증 함수
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;

	for (const input of inputs) input.checked && (isChecked = true);
	if (!isChecked) {
		resetErr(inputs);

		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 요소중 하나를 선택해주세요.`;
		inputs[0].closest('td').append(errMsg);

		return false;
	} else {
		resetErr(inputs);
		return true;
	}
}

//에러 메세지 제거 함수
function resetErr(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const errMsg = el.closest('td').querySelector('p');
	if (errMsg) el.closest('td').querySelector('p').remove();
}
