/*
  1. submit버튼에 폼전송 이벤트 연결
  2. 각 폼 항목마다의 인증함수 정의
  3. 각 함수마다 인증여부에 따라 true, false값 리턴
  4. 전송 버튼 클릭시 각 함수에서 하나라도 false값을 리턴시 기본전송기능 막음
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt()) e.preventDefault();
	if (!isPwd()) e.preventDefault();
	if (!isEmail()) e.preventDefault();
	// if (!isCheck()) e.preventDefault();
	// if (!isSelect()) e.preventDefault();
});

//id 인증
function isTxt() {
	const input = document.querySelector('[name=userid]');
	const value = input.value.trim();
	if (value.length < 5) {
		alert('5글자 이상 입력하세요');
		return false;
	} else {
		return true;
	}
}

//비밀번호 인증
function isPwd() {
	const inputPwd1 = document.querySelector('[name=pwd1]').value.trim();
	const inputPwd2 = document.querySelector('[name=pwd2]').value.trim();

	if (inputPwd1.length < 4 || inputPwd1 !== inputPwd2) {
		alert(`비밀번호 항목 2개를 동일하게 입력하고 4글자 이상 입력하세요.`);
		return false;
	} else {
		return true;
	}
}

//이메일 인증
function isEmail() {
	const input = document.querySelector('[name=email]').value.trim();
	console.log(input.indexOf('@'));
	if (input.indexOf('@') < 0) {
		alert('이메일에 @를 포함하세요');
		return false;
	} else {
		return true;
	}
}

//체크박스 인증
function isCheck() {
	return true;
}

//셀렉트박스 인증
function isSelect() {
	return true;
}
