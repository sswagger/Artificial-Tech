// =============
// Basic Scripts
// =============

// find and return text files
async function getResources(path) {
	return fetch(path).then((res) => res.text()).then((text) => {
		return text;
	});
}

// ==============
// Header Scripts
// ==============

// when the page is loaded, get the header and add nav scripts
window.addEventListener("load", async function () {
	// get the header
	document.getElementById("header").innerHTML = await getResources("res/header.html");

	// navigation scripts for small screens
	let menuOpen = false;
	document.getElementById("navLink").addEventListener("click", function () {
		if (!menuOpen) {
			document.getElementById("quickLinks").style.display = "block";
		} else {
			document.getElementById("quickLinks").style.display = "none";
		}
		menuOpen = !menuOpen
		return false;
	});

	if (sessionStorage.getItem("loggedIn") === "true") {
		let login = document.getElementById("login");
		let signup = document.getElementById("signup");
		login.innerText = "Log out";
		signup.innerText = "New Account";

		login.addEventListener("click", function() {
			sessionStorage.setItem("loggedIn", "false")
		});
	}
});

// ==============
// Footer Scripts
// ==============

// when the page is loaded, retrieve the footer
window.addEventListener("load", async function () {
	// get the header
	document.getElementById("footer").innerHTML = await getResources("res/footer.html");
});