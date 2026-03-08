// ==============
// Validate Login
// ==============

// set DOM Elements
const username= document.getElementById("username");
const password= document.getElementById("pass");
const warning = document.getElementById("error");
let json;
fetch("res/accounts.json").then((res) => {
	res.json().then((j) => {
		json = j;
	});
});

// notify user when the login fails
function submitFail(reason) {
	warning.innerHTML = "<h2>" + reason +"</h2>";
	warning.style.display = "block";
}

// submit form and redirect
document.getElementById("btnSubmit").addEventListener("click", (e) => {
	try {
		// see if username and password are valid
		if (json[username.value][0] === password.value) {
			sessionStorage.setItem("loggedIn", "true")
			window.location.href = "blog.html";
		}
		else {
			submitFail("Invalid Password");
		}
	}
	catch (error) {
		submitFail("Invalid Username");
	}
});

// do not reload page
document.getElementById("form").addEventListener("submit", function(e) {
	e.preventDefault();
});
