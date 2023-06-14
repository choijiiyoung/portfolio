const form = document.querySelector('#member');
const btnSubmit = document.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	console.log(e);
	// if (!isTxt('userid', 5)) e.preventDefault();
	// if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	// if (!isEmail('email', 5)) e.preventDefault();
	// if (!isSelect('edu')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	// if (!isTxt('comments', 10)) e.preventDefault();
});

//텍스트 인증 함수
function isTxt(name, len) {
	const input = document.querySelector(`[name=${name}]`);
	const value = input.value.trim();

	if (value.length < len) {
		alert(`${len}글자 이상 입력하세요.`);
		return false;
	} else {
		return true;
	}
}

//비밀번호 인증 함수
function isPwd(pwd1, pwd2, len) {
	const pwd1_val = document.querySelector(`[name=${pwd1}]`).value.trim();
	const pwd2_val = document.querySelector(`[name=${pwd2}]`).value.trim();

	if (pwd1_val < 5 || pwd1_val !== pwd2_val) {
		alert(`비밀번호 2개 항목을 동일하게 입력하고 ${len}글자 이상 입력하세요.`);
		return false;
	} else {
		return true;
	}
}

//이메일 인증 함수
function isEmail(name, len) {
	const email = document.querySelector(`[name=${name}]`).value;
	if (email.indexOf('@') < 0 || email.length < len) {
		alert(`이메일 주소에 @를 포함고 ${len}글자 이상 입력하세요.`);
		return false;
	} else {
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
		alert('해당 요소중 하나를 선택해주세요.');
		return false;
	} else {
		return true;
	}
}

//라디오, 체크 박스 인증 함수
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;

	for (const input of inputs) input.checked && (isChecked = true);
	if (!isChecked) {
		alert('해당 요소중 하나를 선택해주세요.');
		return false;
	} else {
		return true;
	}
}
