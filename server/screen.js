const modes = {

	logo:			{ type: 'logo' },
	score:			{ type: 'scores' },

	intro:			{ type: 'video', video: '0 - Intro.mp4' },

	banter:	[
					{ type: 'slide', image: '/images/banter/0.png' },
					{ type: 'slide', image: '/images/banter/1.png' },
					{ type: 'slide', image: '/images/banter/2.png' },
					{ type: 'slide', image: '/images/banter/3.png' },
					{ type: 'slide', image: '/images/banter/4.png' }
	],

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
		food:		{ type: 'video', video: '/videos/4.6 - Swede - Food.mp4' },
		holiday:	{ type: 'video', video: '/videos/4.7 - Swede - Holiday.mp4' },
	},

	rainbow: {
		intro:		{ type: 'video', video: '/videos/5.1 - Rainbow - Intro.mp4' },
		clips1:		{ type: 'video', video: '/videos/5.2 - Rainbow - All The E\'s (Vick-e, Holl-e).mp4' },
		clips2:		{ type: 'video', video: '/videos/5.3 - Rainbow - Chaps.mp4' },
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

	outro:			{ type: 'video', video: '7 - Outro.mp4' },

}

let mode = modes.logo
mode = modes.score
mode = modes.lava.leo2

module.exports = mode
