var Music = require('../models/music.js');

// API controller
var apiController = {

	// Return JSON object that
	// represents all music items
	getMusic: function(req, res){
		// Find all music items
		Music.find({}, function(err, results){
			// Return results
			res.send(results);
		});
	},

	getSingle: function(req, res){
		var id = req.params.id;
		Music.findOne({_id: id}, function(err, result){
			res.send(result);
		});
	},

	// POST Handler for adding new tracks
	addMusic: function(req, res){
		
		// This came from  $.post on client-side
		var trackData = req.body;
		console.log('trackData:', trackData);

		// Use body of post to build a
		// new Music document
		var newMusic = new Music(trackData);
		console.log('newMusic:', newMusic);

		// Save new Music document to the
		// collection
		newMusic.save(function(err, result){
			// When save is completed,
			// send() back to client the
			// object that was saved to the collection.
			console.log('music saved:', result);
			res.send(result);
		});
	},

	// Allow the user to delete music items
	// Should send back a success = true
	// if the delete was successful
	deleteMusic: function(req, res){
		var id = req.body.id;

		// Attempt to delete requested item
		Music.remove({_id: id}, function(err, result){
			res.send({
				err: err,
				result: result,
				success: err === null
			});
		});
	},

	updateMusic: function(req, res){
		var trackData = req.body;

		Music.findById(trackData.id, function(err, result){
			result.title = trackData.title;
			result.artist = trackData.artist;
			result.save(function(err, result){
				res.send(result);
			});
		});
	}
};

module.exports = apiController;