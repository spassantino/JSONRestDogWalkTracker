var calculateTotals= function(data){
	 distance = 0;
	 time = 0;
	 locations = [];
	data.forEach(function(data){
		locations.push(data.location);			
		distance = data.walkDistance + distance;
		time = data.lengthTime + time;
	});
}
var makeForm= function(){
	var dropForm=$('<form>');
	var editedName= $('<input type="text" id="dogName">');
	var editedDistance= $('<input type="text" id="walkDistance">');
	var editedLength=$('<input type="text" id="lengthTime">');
	var editedLocation= $('<input type="text" id="location">');
	var submitButton= $('<input type="submit" value="Submit" id="addedButton">');
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
	var td4 = $('<td id="td4">');
	td4.html(submitButton);
	var td5 = $('<td>');
	td5.html(deleteButton);
	var tr = $('<tr>');
	tr.append(td0);
	tr.append(td1);
	tr.append(td2);
	tr.append(td3);
	tr.append(td4);
	tr.append(td5);
	$('#walkTable').append(tr);
}
var addWalk= function(addWalkButton){
	addWalkButton.click( function (e){
		e.preventDefault;
		var addedButton= $('<input type="submit" value="Submit" id="addedButton">');
		makeForm();
		$('#td4').html(addedButton);
		$('#addedButton').click(function(e){
			e.preventDefault();
			var addedWalk = {
					dogName: $('#dogName').val(),
					walkDistance: $('#walkDistance').val(),
					lengthTime: $('#lengthTime').val(),
					location: $('#location').val()
			};
			var myReq = $.ajax({
				type : "POST",
				url : "api/walk",
				dataType : "json",
				contentType: 'application/json',
				data: JSON.stringify(addedWalk),
			});
			myReq.done(function(data) {
				$('#addWalkButton').remove();
				$('#greets').remove();
				$("#walkTable").remove();
				displayDogTracker();
			});
			myReq.fail(function() {
				console.log('It blew up again');
			});
		});
	});
}
var editWalk= function(editButton, id){
	editButton.click(function (e){
		e.preventDefault;
		makeForm();
		$('#addedButton').click(function(e){
			$('#addWalkButton').remove();
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
			$('#greets').remove();
			$("#walkTable").remove();
			displayDogTracker();

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
		var myReq = $.ajax({
			type : "DELETE",
			url : "api/walk/" + id,
			dataType : "json"
		});
		myReq.done(function(data) {
			$('#addWalkButton').remove();
			$('#greets').remove();
			$("#walkTable").remove();
			displayDogTracker();
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
	var addWalkButton= $('<input type="submit" value="Add" id="addWalkButton">');
	addWalk(addWalkButton);
	var totals = $('<tr>');
	var totalLabel = $('<td>').text("Totals");
	var totalDistance = $('<td>').text(distance);
	var totalTime = $('<td>').text(time);
	var numOfLocations = $('<td id=locations>').text(locations.length);
	totals.append(totalLabel,totalDistance,totalTime,numOfLocations);
	table.append(totals);
	tracker.append(addWalkButton);
}
var displayDogTracker = function(e) {
	var myReq = $.ajax({
		type : "GET",
		url : "api/walk/",
		dataType : "json"
	});
	myReq.done(function(data) {
		calculateTotals(data);
		buildTable(data);
		
	});
	myReq.fail(function() {
		console.log('It blew up again');
	});
}

$(document).ready(function(e) {
	displayDogTracker();
});