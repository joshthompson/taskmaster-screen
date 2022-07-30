/*
interface Mode {
	[key: string]: Mode | LogoMode | ScoresMode | VideoMode | SlideMode | PortraitMode | LetterMode;
}

interface BaseMode {
	type: string;
	after?: Mode;
}

interface LogoMode extends BaseMode {
	type: 'logo';
}

interface ScoresMode extends BaseMode {
	type: 'scores';
}

interface VideoMode extends BaseMode {
	type: 'video';
	video: string;
}

interface SlideMode extends BaseMode {
	type: 'slide';
	image: string;
}

interface PortraitMode extends BaseMode {
	type: 'portrait';
	portraits: { name: string, image: string, rotate?: boolean }[];
}

interface LetterMode extends BaseMode {
	type: 'letter';
	letter: string;
}
*/

const modes = {

	logo:			{ type: 'logo' },
	score:			{ type: 'scores' },

	intro:			{ type: 'video', video: '/taskmaster/s02e03/videos/0 - Intro.mp4' },

	banter: 		{ type: 'video', video: '/taskmaster/s02e03/videos/0.1 - Banter.mp4' },

	prize: {
		holly1:		{ type: 'slide', image: '/taskmaster/s02e03/prize/holly.jpg' },
		holly2:		{ type: 'video', video: '/taskmaster/s02e03/prize/holly.mp4' },
		leo1:		{ type: 'slide', image: '/taskmaster/s02e03/prize/leo1.jpg' },
		leo2:		{ type: 'slide', image: '/taskmaster/s02e03/prize/leo2.jpg' },
		leo3:		{ type: 'slide', image: '/taskmaster/s02e03/prize/leo3.jpg' },
		miller:		{ type: 'slide', image: '/taskmaster/s02e03/prize/miller.jpg' },
		dan:		{ type: 'slide', image: '/taskmaster/s02e03/prize/dan.jpg' },
		vicki1:		{ type: 'video', video: '/taskmaster/s02e03/prize/vicki-loud.mp4',
						after: { type: 'slide', image: '/taskmaster/s02e03/prize/vicki.png' },
					},
		vicki2:		{ type: 'slide', image: '/taskmaster/s02e03/prize/vicki.png' },
	},

	sandwich: {
		intro:		{ type: 'video', video: '/taskmaster/s02e03/videos/1.1 - Sandwich - Intro.mp4' },
		vt1:		{ type: 'video', video: '/taskmaster/s02e03/videos/1.2 - Sandwich - Leo.mp4' },
		vt2:		{ type: 'video', video: '/taskmaster/s02e03/videos/1.3 - Sandwich - Dan, Miller, Vicki.mp4' },
		vt3:		{ type: 'video', video: '/taskmaster/s02e03/videos/1.4 - Sandwich - Holly.mp4' },
		
		dan:		{ type: 'portrait', portraits: [{ name: 'dan', image: '/taskmaster/s02e03/sandwich/dan.jpg' }] },
		vicki:		{ type: 'portrait', portraits: [{ name: 'vicki', image: '/taskmaster/s02e03/sandwich/vicki.jpg' }] },
		miller:		{ type: 'portrait', portraits: [{ name: 'miller', image: '/taskmaster/s02e03/sandwich/miller.jpg' }] },
		holly:		{ type: 'portrait', portraits: [{ name: 'holly', image: '/taskmaster/s02e03/sandwich/holly.jpg', rotate: true }] },
		leo:		{ type: 'portrait', portraits: [{ name: 'leo', image: '/taskmaster/s02e03/sandwich/leo.jpg', rotate: true }] },

		text:		{ type: 'slide', image: '/taskmaster/s02e03/sandwich/text.png' },
		
		all:		{ type: 'portrait', portraits: [
			{ name: 'dan', image: '/taskmaster/s02e03/sandwich/dan.jpg' },
			{ name: 'vicki', image: '/taskmaster/s02e03/sandwich/vicki.jpg' },
			{ name: 'miller', image: '/taskmaster/s02e03/sandwich/miller.jpg' },
			{ name: 'holly', image: '/taskmaster/s02e03/sandwich/holly.jpg', rotate: true, },
			{ name: 'leo', image: '/taskmaster/s02e03/sandwich/leo.jpg', rotate: true },
		]},
	},

	chain: {
		intro:		{ type: 'video', video: '/taskmaster/s02e03/videos/2.1 - Challenge Chain - Intro.mp4' },
		image:		{ type: 'slide', image: '/taskmaster/s02e03/chain/chain.png' },
		vt1:		{ type: 'video', video: '/taskmaster/s02e03/videos/2.2 - Challenge Chain - Dan, Holly, Vicki, Leo.mp4' },
		vt2:		{ type: 'video', video: '/taskmaster/s02e03/videos/2.3 - Challenge Chain - Miller.mp4' },
	},

	balloon: {
		intro:		{ type: 'video', video: '/taskmaster/s02e03/videos/3.1 - Balloons - Intro.mp4' },
		vt1:		{ type: 'video', video: '/taskmaster/s02e03/videos/3.2 - Balloons - Dan.mp4' },
	},

	superhero: {
		intro:		{ type: 'video', video: '/taskmaster/s02e03/videos/4.1 - Superheroes - Intro.mp4' },
		dan:		{ type: 'video', video: '/taskmaster/s02e03/videos/4.2 - Superheroes - Dan.mp4' },
		holly:		{ type: 'video', video: '/taskmaster/s02e03/videos/4.3 - Superheroes - Holly.mp4' },
		miller:		{ type: 'video', video: '/taskmaster/s02e03/videos/4.4 - Superheroes - Miller.mp4' },
		vicki:		{ type: 'video', video: '/taskmaster/s02e03/videos/4.5 - Superheroes - Vicki.mp4' },
		leo:		{ type: 'video', video: '/taskmaster/s02e03/videos/4.6 - Superheroes - Leo.mp4' },
		leo2:		{ type: 'slide', image: '/taskmaster/s02e03/superhero/leo.png' },
		all:		{ type: 'slide', image: '/taskmaster/s02e03/superhero/ftmcu.png' },
	},

	trophy:			{ type: 'video', video: '/taskmaster/s02e03/videos/5 - Trophy.mp4' },
	outro:			{ type: 'video', video: '/taskmaster/s02e03/videos/6 - Credits.mp4' },

}

let mode = modes.logo

mode = modes.score
// mode = modes.trophy

module.exports = mode



