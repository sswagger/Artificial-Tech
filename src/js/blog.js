// =========
// Variables
// =========

// DOM Elements
let bodyContent = document.getElementById("webBody");
// Variables
let numSections = 0;
let currSection = 0;
let numButtons = 0;
let numTexts = 0;
let numHotLinks = 0;


// =========
// Functions
// =========

// create li's for navigation
function buildNavList(hotLinkIds) {
	numHotLinks = 0;
	let list = "";

	// loop through hotLinkIds and add li if id has text
	for (let i in hotLinkIds) {
		if (document.getElementById(i).value) {
			list += "<li><a href='#sect"+document.getElementById(i).value+"'>"+document.getElementById(hotLinkIds[i]).value+"</a></li>"
			numHotLinks += 1;
		}
	}
	return list;
}

// Change Current Section
function changeSect(newSection) {

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

	// create new button for section navigation
	let newSectBtn = document.createElement("input");
	newSectBtn.type = "radio";
	newSectBtn.id = numSections;
	newSectBtn.name = "sections";
	newSectBtn.addEventListener("change", (e) => {
		saveSection();
		changeSect(e.target.id);
	});
	let newSectLabel = document.createElement("label");
	newSectLabel.innerText = " Section " + numSections;

	// create new li for section navigation
	let newSectNav = document.createElement("li");
	newSectNav.id = "sectNav" + numSections;
	newSectLabel.prepend(newSectBtn);
	newSectNav.appendChild(newSectLabel);
	document.getElementById("sectionSelector").appendChild(newSectNav);

	// go to new section
	changeSect(numSections);
}


// ==============
// Event Handlers
// ==============

// Add new section
document.getElementById("newSection").addEventListener("click", function () {
	newSect();
});

// Add new button
document.getElementById("newBtn").addEventListener("click", function () {
	// create button element
	let newBtn = document.createElement("button");
	newBtn.innerText = "Button " + ++numButtons;
	newBtn.addEventListener("click", (e) => {
		e.preventDefault();
	});

	// add button element to html
	document.getElementById("sect" + currSection).appendChild(newBtn);
});

// Add new text section
document.getElementById("newText").addEventListener("click", function () {
	// create new div element
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

	// add div to html
	document.getElementById("sect" + currSection).appendChild(newText);
});

// Delete current section
document.getElementById("delete").addEventListener("click", function () {
	// if there is only one section left, just clear it
	if (numSections > 1) {
		// clear storage item
		localStorage.removeItem("sect"+numSections)

		// remove old nav button
		document.getElementById("sectionSelector").removeChild(document.getElementById("sectNav" + numSections));

		// change to new section
		numSections -= 1;
		changeSect(numSections);
	}
	else {
		// clear section
		bodyContent.innerHTML = "<section id='sect"+numSections+"'></section>"
		changeSect(numSections);
	}

	return false;
});

// Create Initial Sections
window.addEventListener("load", function () {
	for (let i = 0; i < localStorage.getItem("numSect"); i++) {
		currSection += 1;
		newSect();
	}
});

// Save number of sections
window.addEventListener("beforeunload", function () {
	saveSection();
	localStorage.setItem("numSect", document.getElementById("sectionSelector").childElementCount.toString());
});

// build HTML page
document.getElementById("view").addEventListener("click", function () {
	// save any changes
	saveSection();

	// User's header color styles
	let textColor = document.getElementById("txtColor").value;
	let backgroundColor = document.getElementById("backColor").value;
	let primaryColor = document.getElementById("primaryColor").value;
	let secondaryColor = document.getElementById("secondaryColor").value;
	let buttonColor = document.getElementById("btnColor").value;
	// basic stylesheet
	let styles = "<style>* {font-family: sans-serif; margin: 0; padding: 0; list-style-type: none; box-sizing: border-box; width: 100%}</style>";

	// build the header
	let title = document.getElementById("title");
	let subtitle = document.getElementById("subtitle");
	let description = document.getElementById("desc");
	let header =
		"<header>" +
		"<div>" +
		"<h1>"+title.value+"</h1>" +
		"<h3>"+subtitle.value+"</h3>" +
		"</div>" +
		"<p>"+description.value+"</p>" +
		"<nav><ul>" +
		buildNavList({"link1":"link1btn", "link2":"link2btn", "link3":"link3btn"}) +
		"</ul></nav>" +
		"</header>";

	// add header styles based on templates
	if (document.getElementById("temp1").checked) {
		// Add header styles
		styles +=
			"<style>" +
			"* {text-align: center; border-radius: 20px}" +
			"h1 {color: " + textColor + ";}" +
			"h3 {color: " + secondaryColor + ";}" +
			"p {color: " + secondaryColor + "; margin: 20px 0;}" +
			"header {background-color: " + backgroundColor + ";}" +
			"li {background-color: " + buttonColor + "; padding: 15px}" +
			"a {color: " + textColor + "; text-decoration: none; font-weight: bolder; display: inline-block;}" +
			"</style>";
	}
	else if (document.getElementById("temp2").checked) {
		styles +=
			"<style>" +
			"header div {float: left; width: 70%; padding: 20px;}" +
			"header {background-color: " + backgroundColor + ";}" +
			"header:after {content: ''; clear: both; display: table;}" +
			"header h1 {color: " + textColor + "; padding: 10px 0 0 20%;}" +
			"h3 {color: " + secondaryColor + "; padding: 0 0 10px 20%;}" +
			"header p {color: " + textColor + "; width: 30%; float: right; padding: 40px;}" +
			"nav {clear: both}" +
			"header li {background-color: " + buttonColor + "; padding: 15px; width: "+(100 / numHotLinks)+"%; float: left; text-align: center;}" +
			"a {color: " + textColor + "; text-decoration: none; font-weight: bolder; display: inline-block;}" +
			"</style>"
	}

	// build the body
	let body = "";
	// loop through the sections and add them
	for (let i = 1; i <= numSections; i++) {
		body += localStorage.getItem("sect" + i)
	}
	// Add body styles
	styles +=
		"<style>" +
		"section {width: 80%; margin: 10px auto; background-color: " + backgroundColor + ";}" +
		"div {padding: 3% 10%;}" +
		"section h1 {color: " + primaryColor + ";}" +
		"section p {color: " + textColor + ";}" +
		"section button {width: 70%; padding: 10px; background-color: " + buttonColor + "; border: none; margin: 20px 15%;}" +
		"section button:active {background-color: #808080}" +
		"</style>";

	// build the footer
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
	// add footer styles based on templates
	if (document.getElementById("temp1Footer").checked) {
		styles +=
			"<style>" +
			"footer li {background-color: " + buttonColor + "; padding: 15px; width: "+(100 / numHotLinks)+"%; float: left; text-align: center;}" +
			"footer {padding: 20px; background-color: " + backgroundColor + ";}" +
			"footer h2 {color: " + textColor + "; text-align: center; padding: 20px}" +
			"footer p {color: " + secondaryColor + "; text-align: center; padding: 0 0 20px 0}" +
			"</style>";
	}
	else if (document.getElementById("temp2Footer").checked) {
		styles +=
			"<style>" +
			"footer li {background-color: " + buttonColor + "; padding: 15px}" +
			"footer {padding: 20px; background-color: " + backgroundColor + ";}" +
			"footer:after {content: ''; clear: both; display: table;}" +
			"footer h2 {float: left; width: 70%; text-align: center;}" +
			"footer p {float: left; width: 70%; margin: 0 0 20px 0; text-align: center;}" +
			"footer nav {float: left; width: 30%;}" +
			"</style>";
	}

	// show the user the HTML
	document.getElementById("userCode").innerText = header + body + footer;
	// build the rest of the website
	let userWebsite =
		"<html lang='en-us'><head>" +
		"<meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'>" +
		"<title>Document</title>" +
		styles +
		"</head><body>" +
		header + body + footer +
		"</body></html>";

	// open website in new window
	const blob = new Blob([userWebsite], { type: 'text/html'});
	const url = URL.createObjectURL(blob);
	window.open(url, '_blank');
});

// clear sections
document.getElementById("clear").addEventListener("click", function () {
	// clear storage
	localStorage.clear();
	// clear section navigation
	let sectionSelector = document.getElementById("sectionSelector");
	window.alert("Data cleared successfully!")
	for (let i = numSections - 1; i > 0; i--) {
		sectionSelector.removeChild(sectionSelector.children[i]);
	}

	// reset variables
	numSections = 1;
	currSection = 1;
	localStorage.setItem("numSect", "1")
	document.getElementById("userCode").innerText = "";

	// change to the remaining section
	changeSect(currSection);
});
