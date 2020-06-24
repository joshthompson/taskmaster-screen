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

export function potentialMax() {
	const questionMax = game.rounds[game.currentRound].questions[game.currentQuestion].max
	const max = game.teams
		.map((t) => t.score + (2 - t.answers) * questionMax)
		.sort((a, b) => a > b ? -1 : 1)[0]
	return max
}

export function potentialMin(team: PointlessTeam) {
	return team.score || 0
}

export const game: PointlessGame = {
	currentRound: 3,
	currentQuestion: 1,
	currentPass: 1,
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
					detail: `
						We don't need the first name here
						- so if there are any presidents that have the same surname
						- that surname is only included once
					`,
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
					detail: `
						All reached top 25# in UK singles chart. You can see
						- initials for the words of songs
						- top position
						- year it reached that position
					`,
					boards: [
						[
							{ hint: 'HTF (#13 - 1984)', answer: 'Hammer To Fall', score: fake(), extra: '' },
							{ hint: 'FBG (#11 - 1978)', answer: 'Fat Bottomed Girls', score: fake(), extra: '' },
							{ hint: 'IWTBF (#3 - 1984)', answer: 'I Want To Break Free', score: fake(), extra: '' },
							{ hint: 'KQ (#2 - 1974)', answer: 'Killer Queen', score: fake(), extra: '' },
							{ hint: 'RGG (#2 - 1984)', answer: 'Radio Ga Ga', score: fake(), extra: 'Famously the inspiration for the name of Lady Gaga' },
							{ hint: 'YMBF (#7 - 1976)', answer: `You're My Best Friend`, score: fake(), extra: '' }
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
					question: 'What are these Netflix original series',
					detail: `
						We're gonna show you 6 titles of Netflix original series with every other letter removed
					`,
					boards: [
						[
							{ hint: 'H_U_E _F _A_D_', answer: 'House Of Card', score: fake(), extra: '' },
							{ hint: 'O_A_G_ I_ T_E _E_ B_A_K', answer: 'Orange Is The New Black', score: fake(), extra: '' },
							{ hint: 'B_J_C_ H_R_E_A_', answer: 'Bojack Horseman', score: fake(), extra: '' },
							{ hint: 'U_B_E_K_B_E _I_M_ S_H_I_T', answer: 'Unbreakable Kimmy Schmidt', score: fake(), extra: '' },
							{ hint: 'S_X _D_C_T_O_', answer: 'Sex Education', score: fake(), extra: '' },
							{ hint: 'R_V_R_A_E', answer: 'Riverdale', score: fake(), extra: '' }
						]
					]
				},
				{
					max: 25,
					category: 'Geography',
					question: 'What are these Red, White and Blue Flags',
					detail: 'What country do these flags represent',
					boards: [
						[
							{ image: '/pointless/questions/flags/france.png', answer: 'France', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/cambodia.png', answer: 'Cambodia', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/new-zealand.png', answer: 'New Zealand', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/czech-republic.png', answer: 'Czech Republic', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/iceland.png', answer: 'Iceland', score: fake(), extra: '' },
							{ image: '/pointless/questions/flags/cuba.png', answer: 'Cuba', score: fake(), extra: '' }
						]
					]
				},
				{
					max: 25,
					category: 'Chemistry',
					question: 'Identify the common names for these chemical compounds',
					detail: 'All of them have much more common names in English',
					boards: [
						[
							{ hint: 'CO', answer: 'Carbon monoxide', score: fake(), extra: '' },
							{ hint: 'H<sub>2</sub>O', answer: 'Water', score: fake(), extra: '' },
							{ hint: 'N<span class="lc">a</span>C<span class="lc">l</span>', answer: 'Salt', score: fake(), extra: 'Sodium Chloride' },
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
					detail: 'Any movie on these actors/actresses have been in or are currently in post production',
					groupedAnswers: [
						[
							{ answer: `Stardust Memories`, score: fake(), extra: '' },
							{ answer: `Les Uns et les Autres`, score: fake(), extra: '' },
							{ answer: `Deadly Blessing`, score: fake(), extra: '' },
							{ answer: `Irreconcilable Differences`, score: fake(), extra: '' },
							{ answer: `King Solomon's Mines`, score: fake(), extra: '' },
							{ answer: `Allan Quatermain and the Lost City of Gold`, score: fake(), extra: '' },
							{ answer: `Police Academy 4: Citizens on Patrol`, score: fake(), extra: '' },
							{ answer: `Cold Steel`, score: fake(), extra: '' },
							{ answer: `Above the Law`, score: fake(), extra: '' },
							{ answer: `Action Jackson`, score: fake(), extra: '' },
							{ answer: `Beyond the Stars`, score: fake(), extra: '' },
							{ answer: `Blood and Sand`, score: fake(), extra: '' },
							{ answer: `Total Recall`, score: fake(), extra: '' },
							{ answer: `He Said, She Said`, score: fake(), extra: '' },
							{ answer: `Diary of a Hitman`, score: fake(), extra: '' },
							{ answer: `Scissors`, score: fake(), extra: '' },
							{ answer: `Year of the Gun`, score: fake(), extra: '' },
							{ answer: `Where Sleeping Dogs Lie`, score: fake(), extra: '' },
							{ answer: `Basic Instinct`, score: fake(), extra: '' },
							{ answer: `Sliver`, score: fake(), extra: '' },
							{ answer: `Last Action Hero`, score: fake(), extra: '' },
							{ answer: `Intersection`, score: fake(), extra: '' },
							{ answer: `The Specialist`, score: fake(), extra: '' },
							{ answer: `The Quick and the Dead`, score: fake(), extra: '' },
							{ answer: `Casino`, score: fake(), extra: '' },
							{ answer: `Diabolique`, score: fake(), extra: '' },
							{ answer: `Last Dance`, score: fake(), extra: '' },
							{ answer: `Sphere`, score: fake(), extra: '' },
							{ answer: `Antz`, score: fake(), extra: '' },
							{ answer: `The Mighty`, score: fake(), extra: '' },
							{ answer: `Gloria`, score: fake(), extra: '' },
							{ answer: `The Muse`, score: fake(), extra: '' },
							{ answer: `Simpatico`, score: fake(), extra: '' },
							{ answer: `Basic Insect`, score: fake(), extra: '' },
							{ answer: `Picking Up the Pieces`, score: fake(), extra: '' },
							{ answer: `Beautiful Joe`, score: fake(), extra: '' },
							{ answer: `Cold Creek Manor`, score: fake(), extra: '' },
							{ answer: `A Different Loyalty`, score: fake(), extra: '' },
							{ answer: `Catwoman`, score: fake(), extra: '' },
							{ answer: `Broken Flowers`, score: fake(), extra: '' },
							{ answer: `Alpha Dog`, score: fake(), extra: '' },
							{ answer: `Basic Instinct 2`, score: fake(), extra: '' },
							{ answer: `Bobby`, score: fake(), extra: '' },
							{ answer: `When a Man Falls in the Forest`, score: fake(), extra: '' },
							{ answer: `If I Had Known I Was a Genius`, score: fake(), extra: '' },
							{ answer: `Democrazy`, score: fake(), extra: '' },
							{ answer: `The Year of Getting to Know Us`, score: fake(), extra: '' },
							{ answer: `Five Dollars a Day`, score: fake(), extra: '' },
							{ answer: `Streets of Blood`, score: fake(), extra: '' },
							{ answer: `Largo Winch II`, score: fake(), extra: '' },
							{ answer: `Border Run`, score: fake(), extra: '' },
							{ answer: `Lovelace`, score: fake(), extra: '' },
							{ answer: `Gods Behaving Badly`, score: fake(), extra: '' },
							{ answer: `Fading Gigolo`, score: fake(), extra: '' },
							{ answer: `Love in Vegas`, score: fake(), extra: '' },
							{ answer: `A Golden Boy`, score: fake(), extra: '' },
							{ answer: `Life on the Line`, score: fake(), extra: '' },
							{ answer: `Savva: Heart of the Warrior`, score: fake(), extra: '' },
							{ answer: `Mothers and Daughters`, score: fake(), extra: '' },
							{ answer: `Running Wild`, score: fake(), extra: '' },
							{ answer: `All I Wish`, score: fake(), extra: '' },
							{ answer: `The Disaster Artist`, score: fake(), extra: '' },
							{ answer: `Rolling Thunder Revue: A Bob Dylan Story by Martin Scorsese`, score: fake(), extra: '' },
							{ answer: `The Laundromat`, score: fake(), extra: '' },
							{ answer: `What About Love`, score: fake(), extra: '' }
						],
						[
							{ answer: `Die Hard`, score: fake(), extra: '' },
							{ answer: `The January Man`, score: fake(), extra: '' },
							{ answer: `Quigley Down Under`, score: fake(), extra: '' },
							{ answer: `Truly, Madly, Deeply`, score: fake(), extra: '' },
							{ answer: `Closet Land`, score: fake(), extra: '' },
							{ answer: `Robin Hood: Prince of Thieves`, score: fake(), extra: '' },
							{ answer: `Close My Eyes`, score: fake(), extra: '' },
							{ answer: `Bob Roberts`, score: fake(), extra: '' },
							{ answer: `Mesmer`, score: fake(), extra: '' },
							{ answer: `An Awfully Big Adventure`, score: fake(), extra: '' },
							{ answer: `Sense and Sensibility`, score: fake(), extra: '' },
							{ answer: `Michael Collins`, score: fake(), extra: '' },
							{ answer: `The Winter Guest`, score: fake(), extra: '' },
							{ answer: `Judas Kiss`, score: fake(), extra: '' },
							{ answer: `Dark Harbor`, score: fake(), extra: '' },
							{ answer: `Dogma`, score: fake(), extra: '' },
							{ answer: `Galaxy Quest`, score: fake(), extra: '' },
							{ answer: `Help! I'm a Fish`, score: fake(), extra: '' },
							{ answer: `Blow Dry`, score: fake(), extra: '' },
							{ answer: `Play`, score: fake(), extra: '' },
							{ answer: `The Search for John Gissing`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Philosopher's Stone`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Chamber of Secrets`, score: fake(), extra: '' },
							{ answer: `Love Actually`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Prisoner of Azkaban`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Goblet of Fire`, score: fake(), extra: '' },
							{ answer: `The Hitchhiker's Guide to the Galaxy`, score: fake(), extra: '' },
							{ answer: `Snow Cake`, score: fake(), extra: '' },
							{ answer: `Perfume: The Story of a Murderer`, score: fake(), extra: '' },
							{ answer: `Nobel Son`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Order of the Phoenix`, score: fake(), extra: '' },
							{ answer: `Sweeney Todd: The Demon Barber of Fleet Street`, score: fake(), extra: '' },
							{ answer: `Bottle Shock`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Half-Blood Prince`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Deathly Hallows – Part 1`, score: fake(), extra: '' },
							{ answer: `Alice in Wonderland`, score: fake(), extra: '' },
							{ answer: `The Wildest Dream`, score: fake(), extra: '' },
							{ answer: `Portraits in Dramatic Time`, score: fake(), extra: '' },
							{ answer: `Harry Potter and the Deathly Hallows – Part 2`, score: fake(), extra: '' },
							{ answer: `The Boy in the Bubble`, score: fake(), extra: '' },
							{ answer: `Gambit`, score: fake(), extra: '' },
							{ answer: `The Butler`, score: fake(), extra: '' },
							{ answer: `A Promise`, score: fake(), extra: '' },
							{ answer: `CBGB`, score: fake(), extra: '' },
							{ answer: `Dust`, score: fake(), extra: '' },
							{ answer: `A Little Chaos`, score: fake(), extra: '' },
							{ answer: `Eye in the Sky`, score: fake(), extra: '' },
							{ answer: `Alice Through the Looking Glass`, score: fake(), extra: '' }
						],
						[
							{ answer: `The Cry Baby Killer`, score: fake(), extra: '' },
							{ answer: `Too Soon to Love`, score: fake(), extra: '' },
							{ answer: `The Wild Ride`, score: fake(), extra: '' },
							{ answer: `The Little Shop of Horrors`, score: fake(), extra: '' },
							{ answer: `Studs Lonigan`, score: fake(), extra: '' },
							{ answer: `The Broken Land`, score: fake(), extra: '' },
							{ answer: `The Raven`, score: fake(), extra: '' },
							{ answer: `The Terror`, score: fake(), extra: '' },
							{ answer: `Thunder Island`, score: fake(), extra: '' },
							{ answer: `Flight to Fury`, score: fake(), extra: '' },
							{ answer: `Back Door to Hell`, score: fake(), extra: '' },
							{ answer: `Ensign Pulver`, score: fake(), extra: '' },
							{ answer: `The Shooting`, score: fake(), extra: '' },
							{ answer: `Ride in the Whirlwind`, score: fake(), extra: '' },
							{ answer: `The St. Valentine's Day Massacre`, score: fake(), extra: '' },
							{ answer: `Hells Angels on Wheels`, score: fake(), extra: '' },
							{ answer: `The Trip`, score: fake(), extra: '' },
							{ answer: `Psych-Out`, score: fake(), extra: '' },
							{ answer: `Head`, score: fake(), extra: '' },
							{ answer: `Easy Rider`, score: fake(), extra: '' },
							{ answer: `On a Clear Day You Can See Forever`, score: fake(), extra: '' },
							{ answer: `The Rebel Rousers`, score: fake(), extra: '' },
							{ answer: `Five Easy Pieces`, score: fake(), extra: '' },
							{ answer: `Carnal Knowledge`, score: fake(), extra: '' },
							{ answer: `A Safe Place`, score: fake(), extra: '' },
							{ answer: `Drive, He Said`, score: fake(), extra: '' },
							{ answer: `The King of Marvin Gardens`, score: fake(), extra: '' },
							{ answer: `The Last Detail`, score: fake(), extra: '' },
							{ answer: `Chinatown`, score: fake(), extra: '' },
							{ answer: `The Passenger`, score: fake(), extra: '' },
							{ answer: `The Fortune`, score: fake(), extra: '' },
							{ answer: `One Flew Over the Cuckoo's Nest`, score: fake(), extra: '' },
							{ answer: `Tommy`, score: fake(), extra: '' },
							{ answer: `The Missouri Breaks`, score: fake(), extra: '' },
							{ answer: `The Last Tycoon`, score: fake(), extra: '' },
							{ answer: `Goin' South`, score: fake(), extra: '' },
							{ answer: `The Shining`, score: fake(), extra: '' },
							{ answer: `The Postman Always Rings Twice`, score: fake(), extra: '' },
							{ answer: `Reds`, score: fake(), extra: '' },
							{ answer: `The Border`, score: fake(), extra: '' },
							{ answer: `Terms of Endearment`, score: fake(), extra: '' },
							{ answer: `Prizzi's Honor`, score: fake(), extra: '' },
							{ answer: `Heartburn`, score: fake(), extra: '' },
							{ answer: `The Witches of Eastwick`, score: fake(), extra: '' },
							{ answer: `Broadcast News`, score: fake(), extra: '' },
							{ answer: `Ironweed`, score: fake(), extra: '' },
							{ answer: `Batman`, score: fake(), extra: '' },
							{ answer: `The Two Jakes`, score: fake(), extra: '' },
							{ answer: `Man Trouble`, score: fake(), extra: '' },
							{ answer: `A Few Good Men`, score: fake(), extra: '' },
							{ answer: `Hoffa`, score: fake(), extra: '' },
							{ answer: `Wolf`, score: fake(), extra: '' },
							{ answer: `The Crossing Guard`, score: fake(), extra: '' },
							{ answer: `Blood and Wine`, score: fake(), extra: '' },
							{ answer: `The Evening Star`, score: fake(), extra: '' },
							{ answer: `Mars Attacks!`, score: fake(), extra: '' },
							{ answer: `As Good as It Gets`, score: fake(), extra: '' },
							{ answer: `The Pledge`, score: fake(), extra: '' },
							{ answer: `About Schmidt`, score: fake(), extra: '' },
							{ answer: `Anger Management`, score: fake(), extra: '' },
							{ answer: `Something's Gotta Give`, score: fake(), extra: '' },
							{ answer: `The Departed`, score: fake(), extra: '' },
							{ answer: `The Bucket List`, score: fake(), extra: '' },
							{ answer: `How Do You Know`, score: fake(), extra: '' }
						]
					]
				},
				{
					max: 25,
					category: 'Sporting Winners',
					question: [
						'Winners of NBA Finals<br />since 2000',
						'Winners of Tour de France<br />since 2000',
						'Winners of Champions League<br />since 1980'
					],
					detail: `
						For UEFA Champions League we also mean European Cup before it was renamed<br />
						We're not including winner that has been stripped of their win -
						but we will include replacement winners
					`,
					groupedAnswers: [
						[
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' }
						],
						[
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' }
						],
						[
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' }
						]
					]
				},
				{
					max: 25,
					category: 'European Cities',
					question: [
						'German town/city with a population of over 250,000',
						'French town/city with a population of over 150,000',
						'Greek town/city with a population of over 100,000'
					],
					detail: `
						Germany and Greece is based off 2011 cencus data.<br />
						France is based of 2017 data from their National Institute of Statistics and Economic Studies
					`,
					groupedAnswers: [
						[
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' }
						],
						[
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' }
						],
						[
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' },
							{ answer: 'Grant', score: fake(), extra: 'Ulysses S. Grant' }
						]
					]
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
			out: false
		},
		{
			name: 'Guy & Lisa',
			googleName: 'Guy',
			credits: [ 'Guy Stephens', 'Lisa Reinfelder' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
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
