function getApiUrl(urlLoc, token){
	var splitUrl = urlLoc.split("/");

	var domain = splitUrl[2]
	var org = splitUrl[3];
	var projectName = splitUrl[4];
	var branch = splitUrl[7];
	var filePath = "";
	for (var i = 8; i < splitUrl.length; i++) {
		if (filePath == "") {
			filePath = splitUrl[i];
		} else {
			filePath = filePath + "%2f" + splitUrl[i];
		}
	}

	/*
	console.log(domain);
	console.log(org);
	console.log(projectName);
	console.log(branch);
	console.log(filePath);
	*/

	if (domain == undefined ||
		org == undefined ||
		projectName == undefined ||
		branch == undefined ||
		filePath == ""
	) {
		setResult("Invalid URL!");
		return false;
	}

	var requestUrl = "https://" + domain + "/api/v4/projects?private_token=" + token;
	$.ajax({
		url: requestUrl,
		type: "GET",
		success: function(result) {
			try {
				for (var i = 0; i < result.length; i++) {
					var project = result[i];
					if (project.path == projectName) { // We got a match bois!
						var projectId = project.id

						var finalUrl = "https://" + domain + "/api/v4/projects/" + projectId + "/repository/files/" + filePath + "/raw?ref=" + branch + "&private_token=" + token;
						setResult(finalUrl);
						return;
					}
				}
			} catch(e) {
				console.log(e);
			}
			setResult("Couldn't access that file with the token!");
			document.getElementById("submit").textContent = "Click to Convert Your Religion";
		},
		error: function(xhr, status, error) {
			console.log("error! " + error);
			if (error == "Unauthorized") {
				setResult("The token you provided couldn't access the file!");
				return;
			}
			setResult("Something went wrong while connecting to that URL!")
			document.getElementById("submit").textContent = "Click to Convert Your Religion";
		}
	})
}

function setResult(txt) {
	document.getElementById("finalresult").value = txt;
}

function convertUrl() {
	var rawUrl = document.getElementById("rawfile").value;
	var token = document.getElementById("token").value;
	getApiUrl(rawUrl, token);
	return true;
}

$( document ).ready(function() {
	$("#submit").click(function() {
		document.getElementById("submit").textContent = "Converting...";

		convertUrl();
	});

	$("#copythatfloppy").click(function() {
		var textField = document.getElementById("finalresult");

		textField.select();
		document.execCommand("copy");

		document.getElementById("copythatfloppy").textContent = "Copied!";
	});
	
	$("#copythatfloppy").mouseout(function() {
		document.getElementById("copythatfloppy").textContent = "Click to copy";
	});
});