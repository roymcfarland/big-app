// API needs access to the Music model
var Music = require('../models/music.js');

// Define our API controller
var apiController = {

	// Return a JSON object that
	// represents all music items
	// from the database to the client
	getMusic: function(req, res){
		// 1. Find all music items
		Music.find({}, function(err, results){
			// 2. Send back the results
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
	// to our collection. Assume that the
	// body of our request has the proper
	// fields to create a new Music() item.
	addMusic: function(req, res){
		// This came from the $.post on the client-side
		var trackData = req.body;
		console.log('trackData:', trackData);

		// Use the body of the post to build a
		// new Music document
		var newMusic = new Music(trackData);
		console.log('newMusic:', newMusic);

		// Save the new Music document to the
		// collection
		newMusic.save(function(err, result){
			// When the save is completed,
			// send() back to the client the
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

		// Attempt to delete the requested item
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

// Make sure we export the controller
module.exports = apiController;