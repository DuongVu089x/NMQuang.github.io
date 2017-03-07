
$(document).ready( function() {
	$("#button-submit").click(function(event) {
		event.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();
		var email = $("#email").val();
		var usernameError = $("#username-error");
		var passwordError = $("#password-error");
		var emailError = $("#email-error");
		var error = $(".error");

		var usernameCheck = checkUsername(username, usernameError);
		var passwordCheck = checkPassword(password, passwordError);
		var emailCheck = checkEmail(email, emailError);
		if( usernameCheck == true && passwordCheck  == true && emailCheck  == true) {
			$.ajax({
				type: "POST", 
				url: "server/server.php",
				data: {username: username},
				success: function(data){
					alert(data);
				}
			});
		
		}	
	});
	$("#button-reset").click(function(event) {
		var username = $("#username").val();
		var password = $("#password").val();
		var email = $("#email").val();
	});
	
/*
Check username
@param {string} username
@param {string }usernameError
*/
	function checkUsername(username, usernameError) {
	if( username == "") {
		usernameError.html ("Please enter your username");
		return false;
	} else {
		if( username.length < 8) {
			usernameError.html ("Username length must be longer 8 characters");
		return false;
		} else {
			usernameError.html ("");
			return true;
		}
	}
	}

/*
Check password
@param {string} password
@param {string }passwordError
*/
	function checkPassword(password, passwordError) {
	if( password == "") {
		passwordError.html ("Please enter your password");
		return false;
	} else {
		if( password.length < 8) {
			passwordError.html ("Password length must be longer 8 characters");
		return false;
		} else {
			passwordError.html("");
			return true;
		}
	}
	}

/*
Check format email
*/
	function isEmail(emailStr) 
   	{
            		var emailPat=/^(.+)@(.+)$/
            		var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
            		var validChars="\[^\\s" + specialChars + "\]"
           		var quotedUser="(\"[^\"]*\")"
           		var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
            		var atom=validChars + '+'
            		var word="(" + atom + "|" + quotedUser + ")"
            		var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
            		var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
            		var matchArray=emailStr.match(emailPat)
            		if (matchArray==null) {
                    		return false
            		}
            		var user=matchArray[1]
            		var domain=matchArray[2]
 
            		// See if "user" is valid
           		 if (user.match(userPat)==null) {
               			return false
           		}
           		var IPArray=domain.match(ipDomainPat)
            		if (IPArray!=null) {
                	// this is an IP address
                      		for (var i=1;i<=4;i++) {
                        			if (IPArray[i]>255) {
                           		 		return false
                       			}
                		}
               	 		return true
            		}
           		var domainArray=domain.match(domainPat)
            		if (domainArray==null) {
                		return false
            		}
 
            		var atomPat=new RegExp(atom,"g")
            		var domArr=domain.match(atomPat)
            		var len=domArr.length
 
           		if (domArr[domArr.length-1].length<2 ||domArr[domArr.length-1].length>3) {
               			return false
            		}
 
            		// Make sure there's a host name preceding the domain.
            		if (len<2) {
               			return false
            		}
 
            		// If we've gotten this far, everything's valid!
            			return true;
    	}

/*
Check email
@param {string} email
@param {string} emailError
*/
	function checkEmail( email,emailError) {
	if( email == "") {
		emailError.html ("Please enter your email");
	} else {
		if( !isEmail(email)) {
			emailError.html ("Email wrong format");
			return false;
		} else {
			emailError.html("");
			return true;
		}
	}
}
});


