const form = document.querySelector('#member');
const btnSubmit = document.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	console.log(e);
	if (!isTxt()) e.preventDefault();
	if (!isPwd()) e.preventDefault();
});

//텍스트 인증 함수
function isTxt() {
	const input = document.querySelector('input[name=userid]');
	const input_val = input.value.trim();

	if (input_val.length < 5) {
		alert('5글자 이상 입력하세요.');
		return false;
	} else {
		return true;
	}
}

//비밀번호 인증 함수
function isPwd() {
	const pwd1_val = document.querySelector('input[name=pwd1]').value.trim();
	const pwd2_val = document.querySelector('input[name=pwd2]').value.trim();

	if (pwd1_val < 5 || pwd1_val !== pwd2_val) {
		alert('비밀번호 2개 항목을 동일하게 입력하고 5글자 이상 입력하세요.');
		return false;
	} else {
		return true;
	}
}

//이메일 인증 함수
function isEmail() {
	return true;
}

//셀렉트 인증 함수
function isSelect() {
	return true;
}

//라디오, 체크 박스 인증 함수
function isCheck() {
	return true;
}
