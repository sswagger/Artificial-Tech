// =========
// Variables
// =========
let numSections = 0;
let currSection = 0;
let bodyContent = document.getElementById("webBody");
let numButtons = 0;
let numTexts = 0;

// =========
// Functions
// =========

// create li's for navigation
function buildNavList(hotLinkIds) {
	let list = "";

	// loop through hotLinkIds and add li if id has text
	for (let i in hotLinkIds) {
		if (document.getElementById(i).value) {
			list += "<li><a href='"+document.getElementById(i).value+"'>"+document.getElementById(hotLinkIds[i]).value+"</a></li>"
		}
	}
	return list;
}

// Change Current Section
function changeSect(newSection, delSection) {
	// save currently selected section
	if (!delSection) {
		saveSection();
	}

	// if this is not a new section get HTML from storage
	if (localStorage.getItem("sect" + newSection)) {
		bodyContent.innerHTML = localStorage.getItem("sect" + newSection);
	}
	else if (newSection) {
		bodyContent.innerHTML = "<section id='sect"+newSection+"'></section>";
	}

	// update curr section
	document.getElementById(newSection).checked = "true";
	currSection = newSection;
}

// Save Section
function saveSection() {
	localStorage.setItem("sect"+currSection, bodyContent.innerHTML);
}

// Create new section
function newSect() {
	numSections += 1;

	// create new section navigation
	let newSectNav = document.createElement("li");
	let newSectBtn = document.createElement("input");
	newSectBtn.type = "radio";
	newSectBtn.id = numSections;
	newSectBtn.name = "sections";
	newSectBtn.addEventListener("change", (e) => {
		changeSect(e.target.id);
	});
	let newSectLabel = document.createElement("label");
	newSectLabel.innerText = " Section " + numSections;

	newSectNav.id = "sectNav" + numSections;
	newSectLabel.prepend(newSectBtn);
	newSectNav.appendChild(newSectLabel);
	document.getElementById("sectionSelector").appendChild(newSectNav);

	newSectBtn.dispatchEvent(new MouseEvent("click"));

	return newSectNav;
}

// ==============
// Event Handlers
// ==============

// Add new section
document.getElementById("newSection").addEventListener("click", function () {
	newSect();

	return false;
});

// Add new button
document.getElementById("newBtn").addEventListener("click", function () {
	let newBtn = document.createElement("button");
	newBtn.innerText = "Button " + ++numButtons;
	newBtn.addEventListener("click", (e) => {
		e.preventDefault();
	});

	document.getElementById("sect" + currSection).appendChild(newBtn);
	return false;
});

// Add new text section
document.getElementById("newText").addEventListener("click", function () {
	let newText = document.createElement("div");
	newText.innerHTML =
		"<h1>Text Box " + ++numTexts + "</h1>" +
		"<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
		"Curabitur mollis lacus nulla cras dictumst gravida nullam tincidunt. " +
		"Placerat malesuada curae varius diam duis lacus cursus per inceptos suspendisse lacus. " +
		"Lorem magna ad aenean vivamus eget consectetur libero hac ex placerat tincidunt eget netus. " +
		"Dui magna ultricies diam lacinia taciti aenean curae odio maecenas. " +
		"Lobortis neque nisi risus mattis cras dui sed placerat donec mauris lobortis quisque proin tincidunt. " +
		"Ante accumsan potenti etiam curae suspendisse pharetra sollicitudin scelerisque aptent lectus. " +
		"Auctor est neque metus fames lacinia aliquam euismod lacinia.</p>";

	document.getElementById("sect" + currSection).appendChild(newText);
	return false;
});

// Delete current section
document.getElementById("delete").addEventListener("click", function () {
	if (numSections > 1) {
		// clear storage item
		localStorage.removeItem("sect"+numSections)

		// remove old nav button
		document.getElementById("sectionSelector").removeChild(document.getElementById("sectNav" + numSections));

		// change to new section
		numSections -= 1;
		changeSect(numSections, true);
	}
	else {
		bodyContent.innerHTML = "<section id='sect"+numSections+"'></section>"
		changeSect(numSections);
	}

	return false;
});

// Create Initial Section
window.addEventListener("load", function () {
	currSection = 1;
	newSect();
});

// build HTML page
document.getElementById("view").addEventListener("click", function () {
	let title = document.getElementById("title");
	let subtitle = document.getElementById("subtitle");
	let description = document.getElementById("desc");
	let header =
		"<header>" +
		"<h1>"+title.value+"</h1>" +
		"<h3>"+subtitle.value+"</h3>" +
		"<p>"+description.value+"</p>" +
		"<nav><ul>" +
		buildNavList({"link1":"link1btn", "link2":"link2btn", "link3":"link3btn"}) +
		"</ul></nav>" +
		"</header>";

	let body = "";
	for (let i = 1; i <= numSections; i++) {
		body += localStorage.getItem("sect" + i)
	}

	let image = document.getElementById("iconFooter");
	let companyName = document.getElementById("logoFooter");
	let rights = document.getElementById("rightsFooter");
	let footer =
		"<footer>"+
		"<nav><ul>" +
		buildNavList({"link1Footer":"link1btnFooter", "link2Footer":"link2btnFooter", "link3Footer":"link3btnFooter"}) +
		"</ul></nav>" +
		"<img  alt='' src='"+image.value+"' />" +
		"<h2>"+companyName.value+"</h2>" +
		"<p>"+rights.value+"</p>" +
		"</footer>"
	document.getElementById("userCode").innerText = header + body + footer;

	let userWebsite =
		"<html lang='en-us'><head>" +
		"<meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'>" +
		"<title>Document</title>" +
		"</head><body>" +
		header + body + footer +
		"</body></html>";
	const blob = new Blob([userWebsite], { type: 'text/html'});
	const url = URL.createObjectURL(blob);
	window.open(url, '_blank');
});

document.getElementById("clear").addEventListener("click", function () {
	localStorage.clear();
	let sectionSelector = document.getElementById("sectionSelector");
	window.alert("Data cleared successfully!")
	for (let i = numSections - 1; i > 0; i--) {
		sectionSelector.removeChild(sectionSelector.children[i]);
	}
	numSections = 1;
	currSection = 1;
	localStorage.setItem("numSect", "1")
	document.getElementById("userCode").innerText = "";
	changeSect(currSection, true);
});
