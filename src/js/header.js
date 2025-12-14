let menuOpen = false;

document.getElementById("navLink").addEventListener("click", function() {
	if (!menuOpen) {
		document.getElementById("quickLinks").style.display = "block";
	}
	else {
		document.getElementById("quickLinks").style.display = "none";
	}
	menuOpen = !menuOpen
	return false;
});

