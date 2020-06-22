import { PointlessGame, PointlessTeam } from '@/types/Pointless'

function fake() {
	return Math.round(Math.random() * 25)
}

export function scoreToBeat(team: PointlessTeam) {
	if (game.currentPass === 2 && game.currentTeam?.answers === 1) {
		const highest = game.teams
			.filter((t) => t !== team)
			.map((t) => t.score)
			.sort((a, b) => a > b ? -1 : 1)[0]
		return highest - team.score
	}
	return null
}

export function potentialMax(team: PointlessTeam) {
	const currentMax = game.rounds[game.currentRound].questions[game.currentQuestion].max
	const max = game.teams
		.filter((t) => t !== team)
		.map((t) => t.score + (t.answers < 2 ? (2 - t.answers) * currentMax : 0))
		.sort((a, b) => a > b ? -1 : 1)[0]
	return max
}

export const game: PointlessGame = {
	currentRound: 2,
	currentQuestion: 0,
	currentPass: 2,
	currentTeam: null,
	guessedAnswers: [],
	rounds: [
		{
			// Round 1
			questions: [
				{
					max: 25,
					category: 'US Politics',
					question: 'US President Surnames that are 6 letters of fewer',
					detail: `We don't need the first name here - so if there are any presidents that have the same surname - that surname is only included once`,
					openAnswers: [
						{ answer: 'Adams', score: fake(), extra: 'John Adams and John Quincy Adams' },
						{ answer: 'Monroe', score: fake(), extra: 'James Monroe' },
						{ answer: 'Tyler', score: fake(), extra: 'John Tyler' },
						{ answer: 'Polk', score: fake(), extra: 'James K. Polk' },
						{ answer: 'Taylor', score: fake(), extra: 'Zachary Taylor' },
						{ answer: 'Pierce', score: fake(), extra: 'Franklin Pierce' },
						{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
						{ answer: 'Hayes', score: fake(), extra: 'Rutherford B. Hayes' },
						{ answer: 'Arthur', score: fake(), extra: 'Chester A. Arthur' },
						{ answer: 'Taft', score: fake(), extra: 'William Howard Taft' },
						{ answer: 'Wilson', score: fake(), extra: 'Woodrow Wilson' },
						{ answer: 'Hoover', score: fake(), extra: 'Herbert Hoover' },
						{ answer: 'Truman', score: fake(), extra: 'Harry S. Truman' },
						{ answer: 'Nixon', score: fake(), extra: 'Richard Nixon' },
						{ answer: 'Ford', score: fake(), extra: 'Gerald Ford' },
						{ answer: 'Carter', score: fake(), extra: 'Jimmy Carter' },
						{ answer: 'Reagan', score: fake(), extra: 'Ronald Reagan' },
						{ answer: 'Bush', score: fake(), extra: 'George H. W. Bush and George W. Bush' },
						{ answer: 'Obama', score: fake(), extra: 'Barack Obama' },
						{ answer: 'Trump', score: fake(), extra: 'Donald Trump' }
					]
				}
			]
		},
		{
			// Round 2
			questions: [
				{
					max: 25,
					category: 'Music',
					question: 'Queen Songs',
					detail: 'We have top position and year it reached that',
					boards: [
						[
							{ hint: 'HTF (#13 - 1984)', answer: '', score: fake(), extra: '' },
							{ hint: 'FBG (#11 - 1978)', answer: '', score: fake(), extra: '' },
							{ hint: 'IWTBF (#3 - 1984)', answer: '', score: fake(), extra: '' },
							{ hint: 'KQ (#2 - 1974)', answer: '', score: fake(), extra: '' },
							{ hint: 'RGG (#2 - 1984)', answer: '', score: fake(), extra: '' },
							{ hint: 'YMBF (#7 - 1976)', answer: '', score: fake(), extra: '' }
						],
						[
							{ hint: 'AOBTD (#7 - 1980)', answer: 'Another One Bites The Dust', score: fake(), extra: '' },
							{ hint: 'S (#25 - 1989)', answer: 'Scandal', score: fake(), extra: '' },
							{ hint: 'WATC (#2 - 1977)', answer: 'We Are The Champions', score: fake(), extra: '' },
							{ hint: 'F (#10 - 1980)', answer: 'Flash', score: fake(), extra: '' },
							{ hint: 'UP (#1 - 1981)', answer: 'Under Pressure', score: fake(), extra: 'Featuring David Bowie' },
							{ hint: 'BR (#1 - 1975, #1 - 1991)', answer: 'Bohemian Rhapsody', score: fake(), extra: '' }
						]
					]
				}
			]
		},
		{
			// Round 3
			questions: [
				{
					max: 25,
					category: 'Television',
					question: 'What are the Netflix original series',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					boards: [
						[
							{ hint: 'H_U_E _F _A_D_', answer: 'HOUSE OF CARDS', score: fake(), extra: '' },
							{ hint: 'O_A_G_ I_ T_E _E_ B_A_K', answer: 'ORANGE IS THE NEW BLACK', score: fake(), extra: '' },
							{ hint: 'B_J_C_ H_R_E_A_', answer: 'BOJACK HORSEMAN', score: fake(), extra: '' },
							{ hint: 'U_B_E_K_B_E _I_M_ S_H_I_T', answer: 'UNBREAKABLE KIMMY SCHMIDT', score: fake(), extra: '' },
							{ hint: 'S_X _D_C_T_O_', answer: 'SEX EDUCATION', score: fake(), extra: '' },
							{ hint: 'R_V_R_A_E', answer: 'RIVERDALE', score: fake(), extra: '' }
						]
					]
				},
				{
					max: 25,
					category: 'Geography',
					question: 'What are these Red, White and Blue Flags',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					boards: [
						[
							{ image: '/pointless/questions/flags/france.svg', answer: 'France', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/cambodia.svg', answer: 'Cambodia', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/new-zealand.svg', answer: 'New Zealand', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/czech-republic.svg', answer: 'Czech Republic', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/iceland.svg', answer: 'Iceland', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/cuba.svg', answer: 'Cuba', score: fake(), extra: '' }
						]
					]
				},
				{
					max: 25,
					category: 'Chemistry',
					question: 'Identify the common names for these chemical compounds',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					boards: [
						[
							{ hint: 'CO', answer: 'Carbon monoxide', score: fake(), extra: '' },
							{ hint: 'H<sub>2</sub>O', answer: 'Water', score: fake(), extra: '' },
							{ hint: 'NaCl', answer: 'Salt', score: fake(), extra: 'Sodium Chloride' },
							{ hint: 'KNO<sub>3</sub>', answer: 'Potassium Nitrate', score: fake(), extra: '' },
							{ hint: 'O<sub>3</sub>', answer: 'Ozone', score: fake(), extra: 'Hole in the contestants knowledge' },
							{ hint: 'CH<sub>4</sub>', answer: 'Methane', score: fake(), extra: '' },
							{ hint: 'CO<sub>2</sub>', answer: 'Carbon Dioxide', score: fake(), extra: '' }
						]
					]
				}
			]
		},
		{
			// Round 4
			questions: [
				{
					max: 25,
					category: 'Movie Actors and Actresses',
					question: [
						'Movies starring Sharon Stone',
						'Movies starring Alan Rickman',
						'Movies starring Jack Nicholson'
					],
					detail: 'Any movie on their IMDB page',
					openAnswers: []
				},
				{
					max: 25,
					category: 'Sporting Winners',
					question: [
						'Winners of NBA Finals<br />since 2000',
						'Winners of Tour de France<br />since 2000',
						'Winners of UEFA Champions League<br />since 1980'
					],
					detail: `
						For UEFA Champions League we also mean European Cup before it was renamed -
						We're not including winner that has been stripped of their win -
						but we will include replacement winners
					`,
					openAnswers: []
				},
				{
					max: 25,
					category: 'European Cities',
					question: [
						'German town/city with a population of over 250,000',
						'French town/city with a population of over 150,000',
						'Greek town/city with a population of over 100,000'
					],
					detail: `Germany and Greece is based off 2011 cencus data. France is based of 2017 data from their National Institute of Statistics and Economic Studies`,
					openAnswers: []
				}
			]
		}
	],
	teams: [
		{
			name: 'Tom & Miller',
			googleName: 'Tom',
			credits: [ 'Tom Upton', 'James Miller' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
		},
		{
			name: 'Nick & Tanya',
			googleName: 'Nick',
			credits: [ 'Nick Pearson', 'Tanya Alam' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: true
		},
		{
			name: 'Guy & Lisa',
			googleName: 'Guy',
			credits: [ 'Guy Stephens', 'Lisa Reinfelder' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: true
		},
		{
			name: 'Lara & Dana',
			googleName: 'Lara',
			credits: [ 'Lara Elble', 'Dana Hempel' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
		}
	]
}
