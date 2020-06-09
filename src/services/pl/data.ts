import { PointlessGame } from '@/types/Pointless'

function fake() {
	return Math.round(Math.random() * 25)
}

export const game: PointlessGame = {
	currentRound: 0,
	currentQuestion: 0,
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
						{ answer: 'Cleveland', score: fake(), extra: 'Grover Cleveland' },
						{ answer: 'Taft', score: fake(), extra: 'William Howard Taft' },
						{ answer: 'Wilson', score: fake(), extra: 'Woodrow Wilson' },
						{ answer: 'Hoover', score: fake(), extra: 'Herbert Hoover' },
						{ answer: 'Roosevelt', score: fake(), extra: 'Franklin D. Roosevelt' },
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
					openAnswers: []
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
		}
	],
	teams: [
		{ name: 'Tom & Miller', googleName: 'Tom' },
		{ name: 'Nick & Tanya', googleName: 'Nick' },
		{ name: 'Guy & Lisa', googleName: 'Guy' },
		{ name: 'Dan & Emily', googleName: 'Dan' }
	]
}