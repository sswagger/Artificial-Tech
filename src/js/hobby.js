// =========
// Variables
// =========

// DOM Elements
const fileNavigation = document.getElementById("fileNav");
const code = document.getElementById("userCode");
// Variables
let fileCount = 0;
let fileIndex = 1;

// New Tab
function newTab() {
	// create new button
	const newFileButton = document.createElement('a');
	newFileButton.id = (++fileCount).toString();
	newFileButton.innerText = "File " + fileCount;

	// create new list item
	const newFileTab = document.createElement('li');
	newFileTab.insertBefore(newFileButton, newFileTab.childNodes[-1]);
	// scripts for when user clicks li
	newFileButton.addEventListener('click', (e) => {
		if (e.target.id !== "newFile") {
			saveData(e.target.id);
			retrieveData(e.target.id);
		}
		return false;
	});

	// select the newest tab
	newFileButton.dispatchEvent(new MouseEvent('click'));
	return newFileTab;
}

// create starter tabs
function loadTabs() {
	// load the tabs from storage
	if (localStorage.getItem("numFiles") !== undefined) {
		for (let i = 1; i <= Number(localStorage.getItem("numFiles")); i++) {
			fileNavigation.insertBefore(newTab(), fileNavigation.childNodes[fileCount]);
			fileCount = i;
		}
	}
	// load one tab
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
	// clear storage and alert user
	localStorage.clear();
	window.alert("Data cleared successfully!")

	// remove li's
	let numRemove = fileNavigation.childElementCount;
	for (let i = numRemove - 2; i >= 0; i--) {
		fileNavigation.removeChild(fileNavigation.children[i]);
	}

	// reset variables
	fileCount = 0;
	fileIndex = 1;
	localStorage.setItem("numFiles", "1");
	// reload tabs
	loadTabs();
});

// save number of tabs
window.addEventListener("beforeunload", function () {
	localStorage.setItem("numFiles", fileCount);
});

// Add new Files
document.getElementById("newFile").addEventListener("click", () => {
	// if user is not past maximum, add a new tab
	if (fileCount <= 100) {
		fileNavigation.insertBefore(newTab(), fileNavigation.childNodes[fileCount]);
	}
});

// load tabs for the first time
window.addEventListener("load", function () {
	loadTabs();
});
