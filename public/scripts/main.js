// This is client-side JS

/**
 * Render the given track data as a list item
 * @param  {object} trackData Given track data
 * @return {jQuery}           DOM Element
 */
var renderTrack = function(trackData){

	// Generate a new List Item via jQuery
	var el = $('<li>');

	// Set an attribute on the main containing
	// li that will let us access the track's
	// specific database ID
	el.attr('data-id', trackData._id);

	// Append elements to the LI that will help
	// display the basics of a track
	el.append('<h4>' + trackData.title + '</h4>');
	el.append('<p><em>' + trackData.artist + '</em></p>');

	// Append some action items to this track
	el.append('<button class="btn btn-danger delete">Delete</button>');
	// <a href="/view/myidhere">View</a>
	el.append('<a class="btn btn-info" href="/view/' + trackData._id + '">View</a>');
	// Add an edit button too
	el.append('<button class="btn btn-success edit">Edit</button>');

	// Give the new element back to the caller
	return el;
};

$(function(){

	// On Page Load:
	// 		Pull down the list of music
	// 		using AJAX and render it
	// 		to the page.
	$.get('/api/getMusic', {}, function(responseData){
		// We've got a dataset back from the server,
		// so let's build out the display in the DOM
		console.log('getMusic Response:', responseData);

		// Loop through the responseData array...
		for (var i = 0; i < responseData.length; i++) {

			// And render each track to the DOM
			var trackEl = renderTrack(responseData[i]);
			$('#music-list').append(trackEl);
		};
	});

	// Hijack the new-music form
	$('#new-music').on('submit', function(e){
		// Don't let the browser submit the form;
		// we want to handle it internally
		e.preventDefault();

		// Pull out the values from the form fields manually
		var trackTitle  = $(this).find('[name=title]').val();
		var trackArtist = $(this).find('[name=artist]').val();
		
		// Build an object out of that data
		var trackData = {
			title: trackTitle,
			artist: trackArtist
		};

		// Print the trackData object to browser
		// console for debugging purposes
		console.log(trackData);

		// Make a POST request to the server and send
		// it the trackData object
		$.post('/api/addMusic', trackData, function(responseData){
			// When the server is done saving the track,
			// it'll send us back the track information
			// that it saved into the database, so
			// we just need to append it to the view
			var trackEl = renderTrack(responseData);
			$('#music-list').append(trackEl);
		});

	});

	// Delegated event for our delete buttons
	$(document).on('click', '.delete', function(){
		// Cache this selector so that we can
		// use it within the scope of our callback
		// from the post to api/delete
		var container = $(this).closest('li');

		// Traverse to the parent LI element
		// and retrieve the data-id attribute value
		var musicId = container.attr('data-id');

		// Print out the data to console
		console.log('delete:', musicId);

		$.post('/api/delete', {id: musicId}, function(responseData){
			console.log('responseData:', responseData);
			if(responseData.success === true){
				
				// successful delete, so remove from DOM
				container.remove();
			}
		});
	});


	// Handle the edit button
	$(document).on('click', '.edit', function(){
		var container = $(this).closest('li');
		var modal = $('#edit-modal');

		var musicId = container.attr('data-id');

		var requestUrl = '/api/getSingle/' + musicId;

		$.get(requestUrl, {}, function(responseData){
			console.log(responseData);

			// Set the values of the inputs in our modal
			// to be the values of the response data
			modal.find('[name=id]').val(responseData._id);
			modal.find('[name=title]').val(responseData.title);
			modal.find('[name=artist]').val(responseData.artist);

			// Finally, after all the data is retrieved and
			// we've updated the values in the form,
			// let's show the modal
			modal.modal('show');
		});

	});

	// Since the edit modal is already created,
	// we can just listen for submission of the form
	// without delegating it
	$('#edit-modal').on('submit', function(e){
		e.preventDefault();

		var modal = $('#edit-modal');

		// We'll use the data from the edit form
		// to build a request to the server
		var musicId = modal.find('[name=id]').val();
		var musicTitle = modal.find('[name=title]').val();
		var musicArtist = modal.find('[name=artist]').val();
		var requestData = {
			id: musicId,
			title: musicTitle,
			artist: musicArtist
		};

		$.post('/api/update', requestData, function(responseData){
			// now that the update is complete, let's "refresh" the
			// existing item in the DOM
			console.log(responseData);

			// re-render the track and replace it
			var updatedTrack = renderTrack(responseData);
			$('[data-id=' + responseData._id + ']').replaceWith(updatedTrack);

			// hide the modal
			modal.modal('hide');
		});
	});

});