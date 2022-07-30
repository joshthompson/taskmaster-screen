const modes = {

	logo:			{ type: 'logo' },
	score:			{ type: 'scores' },

	intro:			{ type: 'video', video: '/taskmaster/s02e02/videos/0 - Intro.mp4' },

	banter: 		{ type: 'slide', image: '/taskmaster/s02e02/banter/betrayal.png' },

	prize: {
		holly1:		{ type: 'slide', image: '/taskmaster/s02e02/prize/holly1.jpg' },
		holly2:		{ type: 'video', video: '/taskmaster/s02e02/videos/0.1 - Holly - Prize.mp4' },
		holly3:		{ type: 'slide', image: '/taskmaster/s02e02/prize/holly2.jpg' },
		leo:		{ type: 'slide', image: '/taskmaster/s02e02/prize/leo.jpg' },
		nick:		{ type: 'slide', image: '/taskmaster/s02e02/prize/nick.jpg' },
		paul:		{ type: 'slide', image: '/taskmaster/s02e02/prize/paul.jpg' },
		tanya:		{ type: 'slide', image: '/taskmaster/s02e02/prize/tanya.jpg' },
	},

	art: {
		intro:		{ type: 'video', video: '/taskmaster/s02e02/videos/1.1 - Art - Intro.mp4' },
		montage:	{ type: 'video', video: '/taskmaster/s02e02/videos/1.2 - Art - All.mp4' }, // Let's watch Paul first and also Tanya, Nick, Leo and Holly
		
		holly:		{ type: 'portrait', portraits: [{ name: 'holly', image: '/taskmaster/s02e02/art/holly.jpg' }]}, // Sense of calm
		leo:		{ type: 'portrait', portraits: [{ name: 'leo', image: '/taskmaster/s02e02/art/leo.jpg' }]}, // Anxiety and Cabin fever together
		tanya:		{ type: 'portrait', portraits: [{ name: 'tanya', image: '/taskmaster/s02e02/art/tanya.jpg', rotate: true }]},
		paul:		{ type: 'portrait', portraits: [{ name: 'paul', image: '/taskmaster/s02e02/art/paul.jpg' }]},
		nick:		{ type: 'video', video: '/taskmaster/s02e02/videos/1.3 - Art - Nick.mp4' },
		all:		{ type: 'portrait', portraits: [
			{ name: 'holly', image: '/taskmaster/s02e02/art/holly.jpg' },
			{ name: 'leo', image: '/taskmaster/s02e02/art/leo.jpg' },
			{ name: 'tanya', image: '/taskmaster/s02e02/art/tanya.jpg' },
			{ name: 'paul', image: '/taskmaster/s02e02/art/paul.jpg', rotate: true },
			{ name: 'nick', image: '/taskmaster/s02e02/art/nick.jpg', rotate: true }
		]},
	},

	speakerphone: {
		intro:		{ type: 'video', video: '/taskmaster/s02e02/videos/2.1 - Speakerphone - Intro.mp4' },
		clip1:		{ type: 'video', video: '/taskmaster/s02e02/videos/2.2 - Speakerphone - Leo & Holly.mp4' }, //It’s the two Lees - HoLee and Lee-Oh
		clip2:		{ type: 'video', video: '/taskmaster/s02e02/videos/2.3 - Speakerphone - Nick & Tanya.mp4' }, // Dr Pearson and Dr Pearson
		tree1:		{ type: 'slide', image: '/taskmaster/s02e02/speakerphone/tree1.png' },
		tree2:		{ type: 'slide', image: '/taskmaster/s02e02/speakerphone/tree2.png' },
		tree3:		{ type: 'slide', image: '/taskmaster/s02e02/speakerphone/tree3.png' },
		tree4:		{ type: 'slide', image: '/taskmaster/s02e02/speakerphone/tree4.png' },
		tree5:		{ type: 'slide', image: '/taskmaster/s02e02/speakerphone/tree5.png' },
		tree6:		{ type: 'slide', image: '/taskmaster/s02e02/speakerphone/tree6.png' },
		clip3:		{ type: 'video', video: '/taskmaster/s02e02/videos/2.4 - Speakerphone - Paul.mp4' } // Would you like to see how Paul did?
	},

	cry: {
		intro:		{ type: 'video', video: '/taskmaster/s02e02/videos/3.1 - Cry - Intro.mp4' },
		clip1:		{ type: 'video', video: '/taskmaster/s02e02/videos/3.2 - Cry - Nick & Tanya.mp4' },
	},

	dominoes: {
		intro:		{ type: 'video', video: '/taskmaster/s02e02/videos/4.1 - Dominoes - Intro.mp4' },
		holly:		{ type: 'video', video: '/taskmaster/s02e02/videos/4.4 - Dominoes - Holly.mp4' }, // Do you want to see Leo's? ... Uhh okay, then here is Holly's
		tanya:		{ type: 'video', video: '/taskmaster/s02e02/videos/4.6 - Dominoes - Tanya.mp4' }, // So do you want to watch Leo's? ... Okay... uhh
		nick:		{ type: 'video', video: '/taskmaster/s02e02/videos/4.2 - Dominoes - Nick.mp4' },
		paul:		{ type: 'video', video: '/taskmaster/s02e02/videos/4.5 - Dominoes - Paul.mp4' }, 
		leo:		{ type: 'video', video: '/taskmaster/s02e02/videos/4.3 - Dominoes - Leo.mp4' }, // He loves fast food but does that mean he's good with dominoes - it's Leo
	},

	sarcophagus:	{ type: 'audio', audio: '/taskmaster/s02e02/audio/Nick - Sarcophagus.m4a'},
	outro:			{ type: 'video', video: '/taskmaster/s02e02/videos/5 - Credits.mp4' },

}

let mode = modes.logo

mode = modes.score
// mode = modes.art.tanya

// mode = { type: 'letter', letter: 'A' }

module.exports = mode



