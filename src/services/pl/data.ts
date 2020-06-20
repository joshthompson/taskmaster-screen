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
	currentRound: 0,
	currentQuestion: 0,
	currentPass: 2,
	currentTeam: null,
	guessedAnswers: [],
	rounds: [
		{
			questions: [
				{
					max: 25,
					category: 'US Politics',
					type: 'open',
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
				},
				{
					max: 25,
					category: 'Science',
					type: 'open',
					question: 'What is a nice city in USA?',
					detail: 'Any city in the USA',
					openAnswers: []
				}
			]
		},
		{
			questions: [
				{
					max: 50,
					category: 'History',
					type: 'open',
					question: 'Cool question 2',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					boards: [
						[
							{ hint: `He wasn't a fan of Dexter from Dexters Lab asjdia sdja sdj asd (JC)`, answer: 'Jimmy Carter', score: fake(), extra: 'Jimmy Carter' },
							{ hint: `He was a head in Futurama (RR)`, answer: 'Ronald Reagan', score: fake(), extra: 'Ronald Reagan' },
							{ hint: `Both Junior and Senior for this name (GHWB/GWB)`, answer: 'George Bush', score: fake(), extra: 'George H. W. Bush and George W. Bush' },
							{ hint: `Yes he can (BO)`, answer: 'Barack Obama', score: fake(), extra: 'Barack Obama' },
							{ hint: `No he can't (DT)`, answer: 'Donald Trump', score: fake(), extra: 'Donald Trump' }
						],
						[
							{ hint: `Haskdopaskdoasd)`, answer: 'Jimmy Carter', score: fake(), extra: 'Jimmy Carter' },
							{ hint: `Heasodkaosd (RR)`, answer: 'Ronald Reagan', score: fake(), extra: 'Ronald Reagan' },
							{ hint: `Baskdoasd (GHWB/GWB)`, answer: 'George Bush', score: fake(), extra: 'George H. W. Bush and George W. Bush' },
							{ hint: `asdasd (BO)`, answer: 'Barack Obama', score: fake(), extra: 'Barack Obama' },
							{ hint: `asdasdasd (DT)`, answer: 'Donald Trump', score: fake(), extra: 'Donald Trump' }
						]
					]
				}
			]
		},
		{
			questions: [
				{
					max: 50,
					category: 'History',
					type: 'open',
					question: 'Cool question 2',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					openAnswers: [
						{ answer: 'Adams', score: fake(), extra: 'John Adams and John Quincy Adams' },
						{ answer: 'Monroe', score: fake(), extra: 'James Monroe' },
						{ answer: 'Tyler', score: fake(), extra: 'John Tyler' }
					]
				},
				{
					max: 50,
					category: 'History',
					type: 'open',
					question: 'Cool question 2',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					openAnswers: []
				},
				{
					max: 50,
					category: 'History',
					type: 'open',
					question: 'Cool question 2',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					openAnswers: []
				}
			]
		},
		{
			questions: [
				{
					max: 50,
					category: 'History',
					type: 'open',
					question: 'Cool question 2',
					detail: 'asopdkasd askdnapsdnaps dpa sdoas',
					openAnswers: [
						{ answer: 'Adams', score: fake(), extra: 'John Adams and John Quincy Adams' },
						{ answer: 'Monroe', score: fake(), extra: 'James Monroe' },
						{ answer: 'Tyler', score: fake(), extra: 'John Tyler' }
					]
				}
			]
		}
	],
	teams: [
		{ name: 'Tom & Miller', googleName: 'Tom', score: 3, answers: 1 },
		{ name: 'Nick & Tanya', googleName: 'Nick', score: 16, answers: 1 },
		{ name: 'Guy & Lisa', googleName: 'Guy', score: 132, answers: 1 },
		{ name: 'Dan & Emily', googleName: 'Dan', score: 4, answers: 1 }
	]
}
