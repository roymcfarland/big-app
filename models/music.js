var mongoose = require('mongoose');

// What will a music document look like?
var musicSchema = mongoose.Schema({
	title: String,
	artist: String,
	numberOfCharactersInLyrics: Number,
	bandMembers: [{
		name: String,
		instrument: String
	}]
});

// Export the model
module.exports = mongoose.model('music', musicSchema);