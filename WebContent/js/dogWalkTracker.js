var makeForm= function(){
	var dropForm=$('<form>');
	var editedName= $('<input type="text" id="dogName">');
	var editedDistance= $('<input type="text" id="walkDistance">');
	var editedLength=$('<input type="text" id="lengthTime">');
	var editedLocation= $('<input type="text" id="location">');
	var submitButton= $('<input type="submit" value="Submit" id="submitButton">');
	var deleteButton= $('<input type="submit" value="Delete" id="deleteButton">');
	deleteButton.click(function(e){
		tr.remove();
	});
	var td0 = $('<td>');
	td0.html(editedName);
	var td1 = $('<td>');
	td1.html(editedDistance);
	var td2 = $('<td>');
	td2.html(editedLength);
	var td3 = $('<td>');
	td3.html(editedLocation);
	var td4 = $('<td>');
	td4.html(submitButton);
	var td5 = $('<td>');
	td5.html(deleteButton);
//	dropForm.append(td0);
//	dropForm.append(td1);
//	dropForm.append(td2);
//	dropForm.append(td3);
//	dropForm.append(td4);
	var tr = $('<tr>');
	tr.append(td0);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(td4);
	tr.append(td5);
	$('#walkTable').append(tr);
}

var editWalk= function(editButton, id){
	editButton.click(function (e){
		e.preventDefault;

		makeForm();
		$('#submitButton').click(function(e){
			e.preventDefault;

		var editedWalk = {
				dogName: $('#dogName').val(),
				walkDistance: $('#walkDistance').val(),
				lengthTime: $('#lengthTime').val(),
				location: $('#location').val()
		};
		console.log("clicked");
		var myReq = $.ajax({
			type : "PUT",
			url : "api/walk/" + id,
			dataType : "json",
			contentType: 'application/json',
			data: JSON.stringify(editedWalk),
		});
		myReq.done(function(data) {
			console.log(data);

//			buildTable(data);

		});
		myReq.fail(function() {
			console.log('It blew up again');
		});
	});
	});
}
var deleteWalk= function(deleteButton, id){
	deleteButton.click(function (e){
		e.preventDefault;
		console.log("clicked");
		var myReq = $.ajax({
			type : "DELETE",
			url : "api/walk/" + id,
			dataType : "json"
		});
		myReq.done(function(data) {
			console.log(data);
			$('#greets').remove();
			$("#walkTable").remove();
			buildTable(data);

		});
		myReq.fail(function() {
			console.log('It blew up again');
		});
	});
}

var buildTable = function(data) {
	var h1 = $('<h1 id="greets">').text("Dog Walking Tracker");
	var tracker = $('#tracker');
	var table = $('<table id="walkTable">');
	var thead = $('<thead>');
	var tr0 = $('<tr>');
	var th0 = $('<th>');
	var th1 = $('<th>');
	var th2 = $('<th>');
	var th3 = $('<th>');
	var th4 = $('<th>');
	var th5 = $('<th>');
	thead.append(tr0);
	tr0.append(th0);
	tr0.append(th1);
	tr0.append(th2);
	tr0.append(th3);
	tr0.append(th4);
	tr0.append(th5);
	table.append(thead);
	th0.text("Dog Name");
	th1.text("Walk Distance");
	th2.text("Length Time");
	th3.text("Location");
	th4.text("Edit");
	th5.text("Delete");
	tracker.append(h1);
	data.forEach(function(data) {
		var tr = $('<tr>');
		var editButton = $('<input type="button" value="Edit" id="' + data.id
				+ '">');
		editWalk(editButton, data.id);
		var deleteButton = $('<input type="button" value="Delete" id="' + data.id
				+ '">');
		deleteWalk(deleteButton, data.id);

		console.log(data);
		var dogNameCell = $('<td>');
		dogNameCell.text(data.dogName);
		var distanceCell = $('<td>');
		distanceCell.text(data.walkDistance);
		var lengthTimeCell = $('<td>');
		lengthTimeCell.text(data.lengthTime);
		var locationCell = $('<td>');
		locationCell.text(data.location);
		var editWalkCell = $('<td>');
		editWalkCell.html(editButton);
		var deleteWalkCell = $('<td>');
		deleteWalkCell.html(deleteButton);
		tr.append(dogNameCell);
		tr.append(distanceCell);
		tr.append(lengthTimeCell);
		tr.append(locationCell);
		tr.append(editWalkCell);
		tr.append(deleteWalkCell);
		table.append(tr);
		tracker.append(table);
	});
}

var displayDogTracker = function(e) {
	var myReq = $.ajax({
		type : "GET",
		url : "api/walk/",
		dataType : "json"
	});
	myReq.done(function(data) {
		console.log(data);
		console.log("test")

		buildTable(data);

	});
	myReq.fail(function() {
		console.log('It blew up again');
	});
}
// var displayDogById = function(id){
// var myReq = $.ajax({
// type: "GET",
// url: "api/walk/" + id,
// dataType: "json"
// });
// myReq.done(function( data ) {
// console.log('This is what was returned ' + data);
//
// });
// myReq.fail(function() {
// console.log('It blew up again');
// });
// }

$(document).ready(function(e) {
	console.log("loaded");
	displayDogTracker();

});