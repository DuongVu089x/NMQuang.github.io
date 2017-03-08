var submit = document.getElementById("button-submit");
var refresh = document.getElementById("button-reset");

var usernameError = document.getElementById("username-error");
var passwordError = document.getElementById("password-error");
var emailError = document.getElementById("email-error");

submit.addEventListener("click", function(event) {
	event.preventDefault();
	
	//Get value in form input as username, password, email, birthday
	
	var password = document.forms["form"]["password"].value;
	var email = document.forms["form"]["email"].value;
	var birthday = document.forms["form"]["birthday"].value;
	var username = document.forms["form"]["username"].value;

	//Declare variable to check form
	var usernameCheck = checkUsername(username, usernameError);
	var passwordCheck = checkPassword(password, passwordError);
	var emailCheck = checkEmail(email, emailError);
	
	if( usernameCheck == true && passwordCheck  == true && emailCheck  == true) {
		var http = new XMLHttpRequest();
		http.open('POST','http://minhquang.hol.es/server/server.php', true);
		http.onreadystatechange = function() {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				alert(this.responseText);
			}
		}
		var form = document.forms["form"];
		data = new FormData(form);
		http.send(data);
	}
		
});

refresh.addEventListener("click", function(event) {
	event.preventDefault();
	document.forms["form"]["password"].value = null;
	document.forms["form"]["email"].value = null;
	document.forms["form"]["username"].value = null;
	usernameError.innerHTML = "";
	passwordError.innerHTML = "";
	emailError.innerHTML = "";
	
});
/*
Check username
@param {string} username
@param {string }usernameError
*/
function checkUsername(username, usernameError) {
	if( username == "") {
		usernameError.innerHTML = "Please enter your username"
		return false;
	} else {
		if( username.length < 8) {
			usernameError.innerHTML = "Username length must be longer 8 characters"
		return false;
		} else {
			usernameError.innerHTML ="";
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
		passwordError.innerHTML = "Please enter your password"
		return false;
	} else {
		if( password.length < 8) {
			passwordError.innerHTML = "Password length must be longer 8 characters"
		return false;
		} else {
			passwordError.innerHTML ="";
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
 
            if (domArr[domArr.length-1].length<2 ||
                domArr[domArr.length-1].length>3) {
               return false
            }
 
            // Make sure there's a host name preceding the domain.
            if (len<2) 
            {
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
		emailError.innerHTML = "Please enter your email"
	} else {
		if( !isEmail(email)) {
			emailError.innerHTML = "Email wrong format"
			return false;
		} else {
			emailError.innerHTML ="";
			return true;
		}
	}
	
}