// =========
// Variables
// =========

// DOM Elements
const counter = document.getElementById("num-accounts");
let intervalId = window.setInterval(updateAccounts, 5000);


// =========
// Functions
// =========

// every interval update number of accounts
function updateAccounts() {
	let innerHTML = "";
	let oldNum = counter.innerText;

	try {
		if (Math.random() > 0.5) {
			innerHTML += (Math.round(parseInt(oldNum) + (Math.random() * 10))).toString();
		}
		else {
			innerHTML += (Math.round(parseInt(oldNum) - (Math.random() * 2))).toString();
		}
	}
	catch(error) {
		window.clearInterval(intervalId);
	}
	counter.innerHTML = innerHTML;
}