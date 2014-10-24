var Music = require('../models/music.js');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},

	// Allow the user to view a static item
	viewMusic: function(req, res){
		// Pull the id property out of the URL
		var id = req.params.id;

		// Look in the collection for an item
		// matching our requested ID
		Music.findOne({_id: id}, function(err, result){
			// Render the view with the found document
			// as a context
			res.render('musicItem', result);
		});
	}
};

module.exports = indexController;