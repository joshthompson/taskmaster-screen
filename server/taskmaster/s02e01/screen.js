const modes = {

	logo:			{ type: 'logo' },
	score:			{ type: 'scores' },

	intro:			{ type: 'video', video: '/taskmaster/s02e01/videos/0 - Intro.mp4' },

	banter:	[
	],

	prize: {
		words3:		{ type: 'slide', image: '/taskmaster/s02e01/song/words3.png' },

		dan:		{ type: 'slide', image: '/taskmaster/s02e01/prize/dan.jpeg' },
		eddie:		{ type: 'slide', image: '/taskmaster/s02e01/prize/eddie.jpeg' },
		miller:		{ type: 'slide', image: '/taskmaster/s02e01/prize/miller.jpeg' },
		saba:		{ type: 'slide', image: '/taskmaster/s02e01/prize/saba.jpeg' },
		tom:		{ type: 'slide', image: '/taskmaster/s02e01/prize/tom.jpeg' },
	},

	alphabet: {
		intro:		{ type: 'video', video: '/taskmaster/s02e01/videos/1.1 - Alphabet - Intro.mp4' },
		clip1:		{ type: 'video', video: '/taskmaster/s02e01/videos/1.2 - Alphabet - Dan & Tom.mp4' }, // It's Dan and Tom
		clip2:		{ type: 'video', video: '/taskmaster/s02e01/videos/1.3 - Alphabet - Miller & Saba.mp4' }, // It's M&S time! Here's Miller and Saba
		clip3:		{ type: 'video', video: '/taskmaster/s02e01/videos/1.4 - Alphabet - Eddie.mp4' } // Which means it's finally it's Eddie Eddie...
	},

	multitasking: {
		intro:		{ type: 'video', video: '/taskmaster/s02e01/videos/3.1 - Multitask - Intro.mp4' },
		clip1:		{ type: 'video', video: '/taskmaster/s02e01/videos/3.2 - Multitask - Eddie & Miller.mp4' }, // Next up they’d be my favourite band - it’s The Ed, Miller Band - Eddie and Miller
		clip2:		{ type: 'video', video: '/taskmaster/s02e01/videos/3.3 - Multitask - Dan & Saba.mp4' }, // Two P’s in a pod. Two Poursaeedi’s that is. It’s brothers Dan and Saba
		twerk:		{ type: 'video', video: '/taskmaster/s02e01/videos/3.3.1 - Multitask - Saba Twerk.mp4' }, // Saba's clip is very different when set to some music
		clip3:		{ type: 'video', video: '/taskmaster/s02e01/videos/3.4 - Multitask - Tom.mp4' }, // Uptonogood and all by himself, here is Tom
	},

	tower: {
		intro:		{ type: 'video', video: '/taskmaster/s02e01/videos/2.1 - Tower - Intro.mp4' },
		all:		{ type: 'video', video: '/taskmaster/s02e01/videos/2.2 - Tower - All.mp4' }, // Let’s watch a montage all four university friend’s and one failed local politician


		dan:		{ type: 'portrait', portraits: [{ name: 'dan', image: '/taskmaster/s02e01/tower/dan.png' }]},
		eddie:		{ type: 'portrait', portraits: [{ name: 'eddie', image: '/taskmaster/s02e01/tower/eddie.png' }]},
		miller:		{ type: 'portrait', portraits: [{ name: 'miller', image: '/taskmaster/s02e01/tower/miller.png' }]},
		saba:		{ type: 'portrait', portraits: [{ name: 'saba', image: '/taskmaster/s02e01/tower/saba.png' }]},
		tom:		{ type: 'portrait', portraits: [{ name: 'tom', image: '/taskmaster/s02e01/tower/tom.png' }]},
		all:		{ type: 'portrait', portraits: [
						{ name: 'dan', image: '/taskmaster/s02e01/tower/dan.png' },
						{ name: 'eddie', image: '/taskmaster/s02e01/tower/eddie.png' },
						{ name: 'miller', image: '/taskmaster/s02e01/tower/miller.png' },
						{ name: 'saba', image: '/taskmaster/s02e01/tower/saba.png' },
						{ name: 'tom', image: '/taskmaster/s02e01/tower/tom.png' }
					]},
	},

	song: {
		intro:		{ type: 'video', video: '/taskmaster/s02e01/videos/4.1 - Song - Intro.mp4' },
		all:		{ type: 'video', video: '/taskmaster/s02e01/videos/4.2 - Song - All (Words).mp4' },

		words1:		{ type: 'slide', image: '/taskmaster/s02e01/song/words1.png' },
		words2:		{ type: 'slide', image: '/taskmaster/s02e01/song/words2.png' },
		words3:		{ type: 'slide', image: '/taskmaster/s02e01/song/words3.png' },

		tom:		{ type: 'video', video: '/taskmaster/s02e01/videos/4.4 - Song - Tom - Sweet Saba P.mp4' },
		miller:		{ type: 'video', video: '/taskmaster/s02e01/videos/4.5 - Song - Miller - Mills Better Know.mp4' },
		dan:		{ type: 'video', video: '/taskmaster/s02e01/videos/4.8 - Song - Dan - Eddie Love.mp4' },
	},

	outro:			{ type: 'video', video: '/taskmaster/s02e01/videos/5 - Credits.mp4' },

}

let mode = modes.logo
mode = modes.score
// mode = modes.prize.dan

// mode = { type: 'letter', letter: '( . )( . )' }

module.exports = mode



