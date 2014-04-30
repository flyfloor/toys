var Validator = {};

var validError = {
	requiredMsg: '此项必填',
	emailMsg: 'email格式不对',
	invalidMsg: '包含非法字符',
	rangeMsg: '长度不符合'
};


Validator.check = function(which, value){
	var check = {
		email : function(value){
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		nickname : function(value){
	    return /^[0-9a-zA-Z\u4e00-\u9fa5]{2,12}$/i.test(value);
		},
		password: function(value){
			return /^[a-zA-Z]\w{8,16}$/i.test(value);
		},
	};
	return check[which](value);
};


Validator.required = function(value){
	return $.trim(value).length > 0;
};

Validator.errorDisplay = function(element, msg){
	$(element).siblings("span.errorMsg").remove();
	var errSpan = $("<span>"+msg+"</span>").addClass("errorMsg");
	$(element).after(errSpan);
};

Validator.sizeFit = function(value, size){
	var length = $.trim(value).length;
	return length > size[0] && length < size[1];
}

var ValidForm = function($form){

	function findByname(name){
		return $form.find($("input[name="+name+"]"));
	}

	function validEmail(){
		var emailVal = findByname("email").val();
		return Validator.required(emailVal) && Validator.check("email", emailVal);
	}

	function validPassword(){
		var passwordVal = findByname("password").val();
		return Validator.required(passwordVal) && Validator.check("password", passwordVal)
						 && Validator.sizeFit(passwordVal, [8,15]);
	}

	function validNickname(){
		var nicknameVal = findByname("nickname").val();
		return Validator.required(nicknameVal) && Validator.check("nickname", nicknameVal)
						 && Validator.sizeFit(nicknameVal, [2,12]);
	}

	$form.find(":submit").on("click", function(){
		if(validEmail() && validPassword() && validNickname()){
			return true;
		}else{
			return false;
		}
	});

	$form.find(".required").on("blur", function(){
		if (!Validator.required($(this).val())) {
			Validator.errorDisplay($(this), validError.requiredMsg);
		}else{

		}
	});

	$form.find(":input").on("focus", function(){
		$(this).siblings("span.errorMsg").fadeOut(500);
	});

}


$(document).ready(function(){
	// $("#shit").on("click", function(){
		console.log(ValidForm($("form")));		
	// });
});
