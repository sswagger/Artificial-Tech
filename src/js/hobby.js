// DOM Elements
const fileNavigation = document.getElementById("fileNav");
const code = document.getElementById("userCode");
// Variables
let fileCount = 0;
let fileIndex = 1;

// Add new Files
document.getElementById("newFile").addEventListener("click", () => {
	if (fileCount <= 100) {
		let tabString = "<a href=\"#\" id=\"" + ++fileCount + "\">File " + fileCount + "</a>";
		const newFileTab = document.createElement('li');
		newFileTab.innerHTML = tabString;
		newFileTab.addEventListener('click', (e) => {
			if (e.target.id !== "newFile") {
				saveData(e.target.id);
				retrieveData(e.target.id);
			}
		})

		fileNavigation.insertBefore(newFileTab, fileNavigation.childNodes[fileCount]);
	}
});

// save data from files when user switches files
function saveData(liIndex) {
	// save from old index, then switch to new index
	localStorage.setItem(fileIndex, code.innerText);
	fileIndex = liIndex;
}

// retrieve data from files when user switches files
function retrieveData(liIndex) {
	code.innerText = localStorage.getItem(liIndex);
	document.getElementById("currFile").innerText = "File " + liIndex;
}

// clear local storage
document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
	window.alert("Data cleared successfully!")
});