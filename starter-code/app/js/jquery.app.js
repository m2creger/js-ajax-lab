var cats;
var catsArray = [];
$(function() {
	event.preventDefault();
	pullCatData();
	$("form").on("submit", function(event) {
		event.preventDefault();
		submitCatData();
	});
});



var newCatData = {
	"image": null,
	"name": "Mr Fluffy",
	"note": "This kitty loves to purr"
}

function pullCatData() {
	var catText = $.get("https://ga-cat-rescue.herokuapp.com/api/cats").done(function(data) {
		//console.log(data);
		parseCats(data);
		
	});
}

function parseCats(data) {
	var parsedObject = JSON.parse(data);
	for (var i = 0; i < parsedObject.length; i++) {
		//console.log(parsedObject[i]);
		catsArray.push(parsedObject[i]);
	}
	console.log(catsArray);
	createCats(catsArray);
}

function createCats(cats) {
	var catArea = $("#cats");
	
	for (var i = 0; i < cats.length; i++) {
		var catText1 = cats[i].name;
		var catText2 = cats[i].note;

		var newCat = document.createElement("li");
		newCat.append(catText1 + " - " + catText2);

		console.log(catText1);
		console.log(catText2);
		// var catText = $('label').create();
		catArea.append(newCat);
	}

}

function submitCatData() {
	newCatData.name = $("#cat-name").val();
	newCatData.note = $("#cat-note").val();
	console.log(newCatData);
	var newCat = $.post("https://ga-cat-rescue.herokuapp.com/api/cats", JSON.stringify(newCatData)).done(function(data) {
		console.log("kitty was added");
		pullCatData();
	})
}