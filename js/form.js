const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck('name')) e.preventDefault();
	// if (!isSelect()) e.preventDefault();
});

//id 인증
function isTxt(name, len) {
	const input = document.querySelector(`[name=${name}]`);
	const value = input.value.trim();

	if (value.length < len) {
		alert(`id는 ${len}글자 이상 입력하세요.`);
		return false;
	} else {
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
	const isChk = false;

	console.log(inputs.input);

	for (const input of inputs) input.cheked;
}

//셀렉트박스 인증
function isSelect() {
	return true;
}
