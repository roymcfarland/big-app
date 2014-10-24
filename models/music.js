var mongoose = require('mongoose');

var musicSchema = mongoose.Schema({
	title: String,
	artist: String,
	numberOfCharactersInLyrics: Number,
	bandMembers: [{
		name: String,
		instrument: String
	}]
});

module.exports = mongoose.model('music', musicSchema);