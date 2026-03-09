// DOM Elements
const fileNavigation = document.getElementById("fileNav");
const code = document.getElementById("userCode");
// Variables
let fileCount = 0;
let fileIndex = 1;

// New Tab
function newTab() {
	const newFileButton = document.createElement('a');
	newFileButton.id = (++fileCount).toString();
	newFileButton.innerText = "File " + fileCount;
	const newFileTab = document.createElement('li');
	newFileTab.insertBefore(newFileButton, newFileTab.childNodes[-1]);
	newFileButton.addEventListener('click', (e) => {
		if (e.target.id !== "newFile") {
			saveData(e.target.id);
			retrieveData(e.target.id);
		}
		return false;
	});
	newFileButton.dispatchEvent(new MouseEvent('click'));
	return newFileTab;
}

// create starter tabs
function loadTabs() {
	console.log(localStorage.getItem("numFiles"));
	if (localStorage.getItem("numFiles") !== undefined) {
		for (let i = 1; i <= Number(localStorage.getItem("numFiles")); i++) {
			fileNavigation.insertBefore(newTab(), fileNavigation.childNodes[fileCount]);
			fileCount = i;
		}
	}
	else {
		fileNavigation.insertBefore(newTab(), fileNavigation.childNodes[fileCount]);
		fileCount = 1;
	}
}

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
	let numRemove = fileNavigation.childElementCount;
	for (let i = numRemove - 2; i >= 0; i--) {
		fileNavigation.removeChild(fileNavigation.children[i]);
	}
	fileCount = 0;
	fileIndex = 1;
	localStorage.setItem("numFiles", "1")
	loadTabs();
});

// save number of tabs
window.addEventListener("beforeunload", function () {
	localStorage.setItem("numFiles", fileCount);
});

// Add new Files
document.getElementById("newFile").addEventListener("click", () => {
	if (fileCount <= 100) {
		fileNavigation.insertBefore(newTab(), fileNavigation.childNodes[fileCount]);
	}
});

// load tabs for the first time
window.addEventListener("load", function () {
	loadTabs();
});
