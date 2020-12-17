const theList = {
	"gitlab-accessor": {
		"title": "Gitlab File Accessor",
		"desc": "Converts a project file url into something useable for remote applications using access tokens!"
	}
}

function buildElement(loc, title, desc) {
	var section = document.createElement("div");
	var header = document.createElement("h1");
	header.textContent = title;
	var body = document.createElement("p");
	body.textContent = desc;

	var link = document.createElement("a");
	link.href = loc + "/";
	link.appendChild(header);

	section.appendChild(link);
	section.appendChild(body);

	console.log(title);
	console.log(desc);

	document.getElementById("entrylist").appendChild(section);
}

function parseData() {
	Object.keys(theList).forEach(index => {
		var entry = theList[index];
		buildElement(index, entry.title, entry.desc);
	})
}