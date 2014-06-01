var Validator = {};

var validError = {
	requiredMsg: 'required field',
	emailMsg: 'email incorrect',
	invalidMsg: 'contains invalid characters',
	rangeMsg: function(size){
		return size[0] + '-' + size[1] + 'characters required';
	},
	passwordMsg: 'start with a letter, 8-16 characters'
};


Validator.check = function(which, value){
	var check = {
		email : function(value){
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		nickname : function(value){
	    return /^[0-9a-zA-Z_\u4e00-\u9fa5]{2,12}$/i.test(value);
		},
		invalid: function(value){
			return /[,\.;\:#"'!@\$%\^\&\*\(\)\-\_+=]/i.test(value);
		},
		password: function(value){
			return /^[a-zA-Z]\w*$/i.test(value);
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
	return length >= size[0] && length <= size[1];
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
						 && Validator.sizeFit(passwordVal, [8,16]);
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

	$form.find("input").on("input", function(){
		if (validEmail() && validPassword() && validNickname()) {
			$(":submit").removeClass("disabled");
		}else{
			$(":submit").addClass("disabled");
		}
	}).on("focus", function(){
		$(this).siblings("span.errorMsg").fadeOut(500);
	});

	$form.find(".required").on("blur", function(){

		if (!Validator.required($(this).val())) {
			Validator.errorDisplay($(this), validError.requiredMsg);
		}else{
			switch($(this).attr("name")){
				case "email":
					if (!Validator.check("email", $(this).val())) {
						Validator.errorDisplay($(this), validError.emailMsg);
					}
					break;
				case "password":
					if (Validator.check("invalid", $(this).val())) {
						Validator.errorDisplay($(this), validError.invalidMsg);
					}else{
						if (!Validator.sizeFit($(this).val(), [8, 16])) {
							Validator.errorDisplay($(this), validError.rangeMsg([8, 16]));
						}else{
							if (!Validator.check("password", $(this).val())) {
								Validator.errorDisplay($(this), validError.passwordMsg);
							}
						}
					}
					break;
				case "nickname":
					if (!Validator.sizeFit($(this).val(), [2, 20])) {
						Validator.errorDisplay($(this), validError.rangeMsg([2,20]));
					}else{
						if (!Validator.check("nickname", $(this).val())) {
							Validator.errorDisplay($(this), validError.invalidMsg);
						}
					}
					break;
			}

		}
	});
}

$(document).ready(function(){
	ValidForm($("form"));		
});
