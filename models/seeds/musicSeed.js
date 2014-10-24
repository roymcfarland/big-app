var mongoose = require('mongoose');
var Music = require('../music.js');

// Prefill the database with information
Music.find({}, function(err, results){
	// If results has a length, then there are
	// documents already...
	if(results.length === 0){
		// If the collection is empty, we'll fill in
		// some preset music items
		var backInBlack = new Music({
			title: 'Back in Black',
			artist: 'AC DC',
			numberOfCharactersInLyrics: 101,
			bandMembers: [
				{
					name: 'Angus Young',
					instrument: 'Guitar'
				},
				{
					name: 'Malcolm Young',
					instrument: 'Guitar'
				},
				{
					name: 'Brian Johnson',
					instrument: 'Voice'
				}
			]
		});
		// Save the track to the collection
		backInBlack.save();

		var menahMenah = new Music({
			title: 'Menah Menah',
			artist: 'Muppets',
			numberOfCharactersInLyrics: 30,
			bandMembers: [
				{
					name: 'Animal',
					instrument: 'DRUMS!!'
				},
				{
					name: 'Swedish Chef',
					instrument: 'Bork Bork Bork!'
				},
				{
					name: 'Beaker',
					instrument: 'MEEP MEEP'
				}
			]
		});

		// Save to the collection
		menahMenah.save();
	}
});