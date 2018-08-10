let update = document.getElementById("update");
let del = document.getElementById("delete");

update.addEventListener("click", function(){
	fetch("quotes", {
		method: "put",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			"name": document.getElementById("updName").value,
			"quote": document.getElementById("updQuote").value
		})
	}).then(res => {
		if(res.ok) return res.json();
	}).then(data => {
		console.log(data);
		window.location.reload(true);
	}); 	
});

del.addEventListener("click", function(){
	fetch("quotes", {
		method: "delete",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"name": document.getElementById("delName").value
		})
	}).then(res => {
		if(res.ok) return res.json()
	}).then(data => {
		console.log(data);
		window.location.reload();
	});
});