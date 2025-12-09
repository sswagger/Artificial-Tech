let counter = document.getElementById("num-accounts")

let intervalId = window.setInterval(updateAccounts, 5000)

function updateAccounts() {
	let innerHTML = ""
	let oldNum = counter.innerText

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
	counter.innerHTML = innerHTML
}