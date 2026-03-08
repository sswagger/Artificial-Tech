const username= document.getElementById("username");
const password= document.getElementById("pass");
let json;
fetch("res/accounts.json").then((res) => {
	res.json().then((j) => {
		json = j;
	});
});

function submitFail(reason) {

}

document.getElementById("btnSubmit").addEventListener("click", (e) => {
	try {
		if (json[username.value][0] === password.value) {
			window.location.href = "blog.html";
		}
		else {
			throw new Error();
		}
	}
	catch (error) {
		submitFail();
	}
});

document.getElementById("form").addEventListener("submit", function(e) {
	e.preventDefault();
});
