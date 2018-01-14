/* variables str */
var str = "Диалог: '- Привет, как дела?; - Нормально; - Ка'к у тебя?; - Хорошо', Диалог: '- Привет, как дела?; - Нормально; - Ка'к у тебя?; - Хорошо'";

/* variables for form */
var idForm = 'form-feedback';
var idSubmit = 'js-form-submit';
var classErrorInput = 'error';


/* functions */
/**
 * Меняем одинарные ковычки на двойные, исключение слова aren't
 */
function replaceStr (str){
	console.log(str);
	var res = str.replace(/\'+/g, function (char, offset, str) {
            var arStr = str.split('');
            if (typeof arStr[offset+1] === 'undefined'){ // если конец строки
            	return '"';
            } else if (arStr[offset-1].match(/[a-zA-Zа-яА-ЯёЁ]/g) === null && arStr[offset+1].match(/[a-zA-Zа-яА-ЯёЁ]/g) === null){ // если нет вокруг букв (aren't)
            	return '"';
            } else { // иначе не заменяем
            	return "'";
            }
        });
	console.log(res);
}

function validationValue(type, value){
	if (value.length > 1){
		switch(type){
			case 'name':
				var regExp = /[a-zA-Zа-яА-ЯёЁ]|[a-zA-Zа-яА-ЯёЁ]\s/ig;
				return regExp.test(value);
				break;
			case 'email':
				var regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				return regExp.test(value);
				break;
			case 'phone':
				var regExp = /^\+7\(([0-9]{3})+\)([0-9]{3})+\-([0-9]{4})$/;
				return regExp.test(value);
				break;
			default:
				return true;
				break;
		}
	}
	return false;
}

function checkErrorForm(arInputs) {
	var errors = 0;
	if (arInputs.length > 0){
		for (var i = 0; i < arInputs.length; i++) {
			var typeValidation = arInputs[i][0].getAttribute('data-validation');
			var valueValidation = arInputs[i][0].value;

			if (validationValue(typeValidation, valueValidation) === false){
				arInputs[i][0].parentElement.classList.add(classErrorInput);
				errors++;
			} else {
				arInputs[i][0].parentElement.classList.remove(classErrorInput);
			}
		}
	}
	return errors > 0;
}

function validationForm(e){
	e.preventDefault();
	var inputs = [];
	var form = document.getElementById(idForm);

	inputs.push(form.querySelectorAll("input[name=name]"));
	inputs.push(form.querySelectorAll("input[name=email]"));
	inputs.push(form.querySelectorAll("input[name=phone]"));
	inputs.push(form.getElementsByTagName('textarea'));

	checkErrorForm(inputs)
}


window.onload = function () {
	console.log('--- 1 - 2 ---');
	var repRes = replaceStr(str);

	console.log('--- 3 ---');
	document.getElementById(idSubmit).addEventListener('click', validationForm);
};