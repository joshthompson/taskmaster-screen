const modes = {

	logo:			{ type: 'logo' },
	score:			{ type: 'scores' },

	intro:			{ type: 'video', video: '/videos/0 - Intro.mp4' },

	banter:	[
		{ type: 'slide', image: '/images/banter/anagram - vicki.png' },
		{ type: 'slide', image: '/images/banter/anagram - vicki.gif' },
		{ type: 'slide', image: '/images/banter/anagram - leo.png' },
		{ type: 'slide', image: '/images/banter/anagram - leo.gif' },
		{ type: 'slide', image: '/images/banter/anagram - paul.png' },
		{ type: 'slide', image: '/images/banter/anagram - paul.gif' },
		{ type: 'slide', image: '/images/banter/anagram - nick.png' },
		{ type: 'slide', image: '/images/banter/anagram - nick.gif' },
		{ type: 'slide', image: '/images/banter/anagram - holly.png' },
		{ type: 'slide', image: '/images/banter/anagram - holly.gif' },
		{ type: 'slide', image: '/images/banter/anagram - craig.png' },
		{ type: 'slide', image: '/images/banter/anagram - craig.gif' }
	],

	showandtell: {
		leo:		{ type: 'slide', image: '/images/showandtell/leo.jpg' },
		nick:		{ type: 'slide', image: '/images/showandtell/nick.jpg' },
		vicki:		{ type: 'slide', image: '/images/showandtell/vicki.jpg' },
		holly:		{ type: 'slide', image: '/images/showandtell/holly.jpg' },
		paul:		{ type: 'slide', image: '/images/showandtell/paul.jpg' }
	},

	water: {
		intro:		{ type: 'video', video: '/videos/1.1 - Water - Intro.mp4' },
		clips1:		{ type: 'video', video: '/videos/1.2 - Water - Holly & Leo.mp4' },
		clips2:		{ type: 'video', video: '/videos/1.3 - Water - Nick.mp4' },
		clips3:		{ type: 'video', video: '/videos/1.4 - Water - Paul & Vicki.mp4' },
	},

	drawing: {
		intro:		{ type: 'video', video: '/videos/2.1 - Drawing - Intro.mp4' },
		clips:		{ type: 'video', video: '/videos/2.2 - Drawing - All.mp4'},
		leo:		{ type: 'slide', image: '/images/drawings/leo.png' },
		nick:		{ type: 'slide', image: '/images/drawings/nick.png' },
		vicki:		{ type: 'slide', image: '/images/drawings/vicki.png' },
		holly:		{ type: 'slide', image: '/images/drawings/holly.png' },
		paul:		{ type: 'slide', image: '/images/drawings/paul.png' },
		all:		{ type: 'slide', image: '/images/drawings/all.png' }
	},

	rice: {
		montage:	{ type: 'video', video: '/videos/3.1 - Rice - Montage.mp4' },
		compliments:{ type: 'video', video: '/videos/3.2 - Rice - Compliments.mp4' }
	},

	swede: {
		intro:		{ type: 'video', video: '/videos/4.1 - Swede - Intro.mp4' },
		name:		{ type: 'video', video: '/videos/4.2 - Swede - Name.mp4' },
		dob:		{ type: 'video', video: '/videos/4.3 - Swede - DOB.mp4' },
		wife:		{ type: 'video', video: '/videos/4.4 - Swede - Wife.mp4' },
		connection:	{ type: 'video', video: '/videos/4.5 - Swede - Connection.mp4' },
		connection2:{ type: 'slide', image: '/images/boss.png' },
		food:		{ type: 'video', video: '/videos/4.6 - Swede - Food.mp4' },
		holiday:	{ type: 'video', video: '/videos/4.7 - Swede - Holiday.mp4' },
	},

	rainbow: {
		intro:		{ type: 'video', video: '/videos/5.1 - Rainbow - Intro.mp4' },
		clips1:		{ type: 'video', video: '/videos/5.2 - Rainbow - Paul & Holly.mp4' },
		clips2:		{ type: 'video', video: '/videos/5.3 - Rainbow - Leo & Nick.mp4' },
		clips3:		{ type: 'video', video: '/videos/5.4 - Rainbow - Vicki.mp4' },
		rainbows:	{ type: 'slide', image: '/images/rainbows.png'}
	},

	lava: {
		intro:		{ type: 'video', video: '/videos/6.1 - Lava - Intro.mp4' },
		nick:		{ type: 'video', video: '/videos/6.2 - Lava - Nick.mp4' },
		paul:		{ type: 'video', video: '/videos/6.3 - Lava - Paul.mp4' },
		vicki:		{ type: 'video', video: '/videos/6.4 - Lava - Vicki.mp4' },
		leo:		{ type: 'video', video: '/videos/6.5 - Lava - Leo.mp4' },
		leo2:		{ type: 'video', video: '/videos/6.5 - Lava - Leo - Original.mp4' },
		holly:		{ type: 'video', video: '/videos/6.6 - Lava - Holly.mp4' }
	},

	outro:			{ type: 'video', video: '/videos/7 - Outro.mp4' },

}

let mode = modes.logo
// mode = modes.score
// mode = modes.lava.holly

// mode = { type: 'letter', letter: 'y' }

module.exports = mode
