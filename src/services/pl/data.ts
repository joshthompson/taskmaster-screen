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
	currentRound: 0,
	currentQuestion: 0,
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
					question: 'Former US President Surnames that are 6 letters of fewer',
					detail: `
						We don't need the first name here
						- so if there are any presidents that have the same surname
						- that surname is only included once
					`,
					openAnswers: [
						{ answer: 'Adams', score: 4, extra: 'Father and son - John and John Quincy Adams - 2nd and 6th President' },
						{ answer: 'Monroe', score: 0, extra: 'James Monroe - Bought Florida for $5 million - died on 4th July' },
						{ answer: 'Tyler', score: 1, extra: 'John Tyler - First Vice President to take over after President William Henry Harrison passed away' },
						{ answer: 'Polk', score: 0, extra: 'James K. Polk - Known for his polka dot print suits (Not true)' },
						{ answer: 'Taylor', score: 0, extra: 'Zachary Taylor - His nickname was Old Rough and Ready' },
						{ answer: 'Pierce', score: 0, extra: 'Franklin Pierce - He was the first president to "promise" his oath instead of "swearing" it' },
						{ answer: 'Grant', score: 0, extra: `Ulysses S. Grant - S doesn't stand for anything - His phantom middle initial is the result of an error from Ohio Congressman Thomas Hamer, who accidentally added for a form and it just stuck` },
						{ answer: 'Hayes', score: 0, extra: `Rutherford B. Hayes - His whitehouse saw America's first Siamese cat - His wife Lucy Hayes loved cats - was gifted it` },
						{ answer: 'Arthur', score: 0, extra: 'Chester A. Arthur - Nicknames included Elegant Arthur and Gentleman Boss' },
						{ answer: 'Taft', score: 0, extra: 'William Howard Taft - He was a heavyweight wrestling champion at Yale - rumours he got stuck in the white house bathtub' },
						{ answer: 'Wilson', score: 4, extra: 'Woodrow Wilson - Only president with the word wood in his name' },
						{ answer: 'Hoover', score: 5, extra: 'Herbert Hoover - Has been known to be mistaken with Henry Hoover on the real Pointless' },
						{ answer: 'Truman', score: 1, extra: 'Harry S. Truman - His middle name is just S. as given by parents' },
						{ answer: 'Nixon', score: 13, extra: 'Richard Nixon - Avid Bowler -  He had a bowling alley installed under the White House' },
						{ answer: 'Ford', score: 4, extra: 'Gerald Ford - He was a male model and he locked himself out of the white house once' },
						{ answer: 'Carter', score: 1, extra: 'Jimmy Carter - Currently 95 years old - the longest living US president' },
						{ answer: 'Reagan', score: 14, extra: 'Ronald Reagan - Loved jelly beans' },
						{ answer: 'Bush', score: 20, extra: 'George H. W. Bush and George W. Bush - George H.W. Bush went skydiving to celebrate his 80th, 85th and 90th birthdays' },
						{ answer: 'Obama', score: 16, extra: `Barack Obama - Still very popular - but would he be as popular if people knew that he didn't like ice cream?` },
						{ answer: 'Trump', score: 16, extra: 'Donald Trump - Nothing' }
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
							{ hint: 'AOBTD (#7 - 1980)', answer: 'Another One Bites The Dust', score: 7, extra: `Micheal Jackson fought for it to be a single` },
							{ hint: 'S (#25 - 1989)', answer: 'Scandal', score: 0, extra: `Roger Taylor said it was one of the most boring videos they ever made` },
							{ hint: 'WATC (#2 - 1977)', answer: 'We Are The Champions', score: 9, extra: `We Will rock you - wrote at same time` },
							{ hint: 'F (#10 - 1980)', answer: 'Flash', score: 3, extra: `Only reached #1 in one national chart - Austria. In US only got to #42` },
							{ hint: 'UP (#1 - 1981)', answer: 'Under Pressure', score: 9, extra: 'Featuring David Bowie but they never got together to play it live' },
							{ hint: 'BR (#1 - 1975, #1 - 1991)', answer: 'Bohemian Rhapsody', score: 14, extra: `It is the most streamed song from the 20th century` }
						],
						[
							{ hint: 'HTF (#13 - 1984)', answer: 'Hammer To Fall', score: 2, extra: `On songfacts.com Mr. B from Doon Bish, England said "Well Queen did about 8billion apaling songs but this is one of those 30 or so that are pretty mint."` },
							{ hint: 'FBG (#11 - 1978)', answer: 'Fat Bottomed Girls', score: 9, extra: `Released as a double A-side with Bicyle Race - both songs contain a references to each other "Fat bottomed girls, they'll be riding today, so look out for those beauties, oh yeah." "get on your bikes and ride!"` },
							{ hint: 'IWTBF (#3 - 1984)', answer: 'I Want To Break Free', score: 13, extra: `Music video has them famously all dressed as women. Have you performed this on stage Craig?` },
							{ hint: 'KQ (#2 - 1974)', answer: 'Killer Queen', score: 13, extra: `An Extraordinarily nice answer. Guarenteed to blow the score thingy` },
							{ hint: 'RGG (#2 - 1984)', answer: 'Radio Ga Ga', score: 8, extra: 'Famously the inspiration for the name of Lady Gaga' },
							{ hint: 'YMBF (#7 - 1976)', answer: `You're My Best Friend`, score: 4, extra: `John Deacon wrote this song about his wife` }
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
							{ hint: 'H_U_E _F _A_D_', answer: 'House Of Card', score: 7, extra: `Netflix's first original series` },
							{ hint: 'O_A_G_ I_ T_E _E_ B_A_K', answer: 'Orange Is The New Black', score: 16, extra: `Netflix's 3rd original series` },
							{ hint: 'B_J_C_ H_R_E_A_', answer: 'Bojack Horseman', score: 13, extra: `Netflix's best original series. - BoJack Horseman has contributed to the rise of the "sadcom", a tragicomic format that balances humour and sadness.` },
							{ hint: 'U_B_E_K_B_E _I_M_ S_H_I_T', answer: 'Unbreakable Kimmy Schmidt', score: 8, extra: `It is about one of the Indiana mole women - a group of women who were kidnapped by a cult leader and how they reintergrate into the world` },
							{ hint: 'S_X _D_C_T_O_', answer: 'Sex Education', score: 10, extra: `Two different people thought this was Sexy Doctor - which sounds like it would work as a show also - so netflix, if you're listening` },
							{ hint: 'R_V_R_A_E', answer: 'Riverdale', score: 7, extra: `Based on the characters of Archie Comics which also featued Sabrina the teenage witch so it is set in the same Universe as the Netflix seriss Chilling Adventures of Sabrina` }
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
							{ image: '/pointless/questions/flags/france.png', answer: 'France', score: 19, extra: `To the people, the three colours eventually came to represent liberty, equality and fraternity; these were the main ideologies of the French Revolution` },
							{ image: '/pointless/questions/flags/cambodia.png', answer: 'Cambodia', score: 8, extra: `Features a depiction of the temple complex of Angkor Wat which is the largest religious monument in the world` },
							{ image: '/pointless/questions/flags/new-zealand.png', answer: 'New Zealand', score: 15, extra: `The had two referendums in 2015 and 2016 to change it - but ended up keeping their original flag. Members of the public were invited to send some in.` },
							{ image: '/pointless/questions/flags/czech-republic.png', answer: 'Czech Republic', score: 12, extra: `Same flag used by former Czechoslovakia and it originally didn't have the blue triangle. They added it to make it more distinctive from Poland's flag` },
							{ image: '/pointless/questions/flags/iceland.png', answer: 'Iceland', score: 11, extra: `One of the Nordic cross flags - the others being Denmark, Finland, Norway, Sweden and many other Nordic teritories - they all share the off centre cross` },
							{ image: '/pointless/questions/flags/cuba.png', answer: 'Cuba', score: 9, extra: `t is one of the two flags of a currently socialist country (the other being Laos) that does not use any communist symbolism.` }
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
							{ hint: 'CO', answer: 'Carbon monoxide', score: 11, extra: `Cats can sense a carbon monoxide leak and are known to refuse to come into the house` },
							{ hint: 'H<sub>2</sub>O', answer: 'Water', score: 24, extra: `68.7% of the fresh water on Earth is trapped in glaciers.` },
							{ hint: 'N<span class="lc">a</span>C<span class="lc">l</span>', answer: 'Salt', score: 11, extra: `Sodium Chloride - It is the only mineral most humans eat intentially as it's raw mineral form` },
							// { hint: 'KNO<sub>3</sub>', answer: 'Potassium Nitrate', score: 4, extra: `It is the main ingredient in gunpowder` },
							{ hint: 'O<sub>3</sub>', answer: 'Ozone', score: 9, extra: 'If the ozone layer was compressed to the pressure of the air at sea level - it would only be about a 3mm thick' },
							{ hint: 'CH<sub>4</sub>', answer: 'Methane', score: 3, extra: `It is the one of the gases that make up a fart (hydrogen, carbon dioxide, and methane combine with hydrogen sulfide and ammonia) - [ Real fact from the internet ] All people fart sometimes, whether they live in France, the Fiji islands, or Fresno, California!` },
							{ hint: 'CO<sub>2</sub>', answer: 'Carbon Dioxide', score: 21, extra: `There are roughly 500 parts per million, meaning that 0.05% of the Earth’s atmosphere is carbon dioxide` }
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
							{ answer: `Stardust Memories`, score: 0, extra: `` },
							{ answer: `Les Uns et les Autres`, score: 0, extra: `` },
							{ answer: `Deadly Blessing`, score: 0, extra: `` },
							{ answer: `Irreconcilable Differences`, score: 0, extra: `` },
							{ answer: `King Solomon's Mines`, score: 0, extra: `` },
							{ answer: `Allan Quatermain and the Lost City of Gold`, score: 0, extra: `` },
							{ answer: `Police Academy 4: Citizens on Patrol`, score: 0, extra: `` },
							{ answer: `Cold Steel`, score: 0, extra: `` },
							{ answer: `Above the Law`, score: 0, extra: `` },
							{ answer: `Action Jackson`, score: 0, extra: `` },
							{ answer: `Beyond the Stars`, score: 0, extra: `` },
							{ answer: `Blood and Sand`, score: 0, extra: `` },
							{ answer: `Total Recall`, score: 0, extra: `` },
							{ answer: `He Said, She Said`, score: 0, extra: `` },
							{ answer: `Diary of a Hitman`, score: 0, extra: `` },
							{ answer: `Scissors`, score: 0, extra: `` },
							{ answer: `Year of the Gun`, score: 0, extra: `` },
							{ answer: `Where Sleeping Dogs Lie`, score: 0, extra: `` },
							{ answer: `Basic Instinct`, score: 10, extra: `` },
							{ answer: `Sliver`, score: 0, extra: `` },
							{ answer: `Last Action Hero`, score: 0, extra: `` },
							{ answer: `Intersection`, score: 0, extra: `` },
							{ answer: `The Specialist`, score: 0, extra: `` },
							{ answer: `The Quick and the Dead`, score: 0, extra: `` },
							{ answer: `Casino`, score: 0, extra: `` },
							{ answer: `Diabolique`, score: 0, extra: `` },
							{ answer: `Last Dance`, score: 0, extra: `` },
							{ answer: `Sphere`, score: 0, extra: `` },
							{ answer: `Antz`, score: 0, extra: `` },
							{ answer: `The Mighty`, score: 0, extra: `` },
							{ answer: `Gloria`, score: 0, extra: `` },
							{ answer: `The Muse`, score: 0, extra: `` },
							{ answer: `Simpatico`, score: 0, extra: `` },
							{ answer: `Picking Up the Pieces`, score: 0, extra: `` },
							{ answer: `Beautiful Joe`, score: 0, extra: `` },
							{ answer: `Cold Creek Manor`, score: 0, extra: `` },
							{ answer: `A Different Loyalty`, score: 0, extra: `` },
							{ answer: `Catwoman`, score: 1, extra: `` },
							{ answer: `Broken Flowers`, score: 0, extra: `` },
							{ answer: `Alpha Dog`, score: 0, extra: `` },
							{ answer: `Basic Instinct 2`, score: 2, extra: `` },
							{ answer: `Bobby`, score: 0, extra: `` },
							{ answer: `When a Man Falls in the Forest`, score: 0, extra: `` },
							{ answer: `If I Had Known I Was a Genius`, score: 0, extra: `` },
							{ answer: `Democrazy`, score: 0, extra: `` },
							{ answer: `The Year of Getting to Know Us`, score: 0, extra: `` },
							{ answer: `Five Dollars a Day`, score: 0, extra: `` },
							{ answer: `Streets of Blood`, score: 0, extra: `` },
							{ answer: `Largo Winch II`, score: 0, extra: `` },
							{ answer: `Border Run`, score: 0, extra: `` },
							{ answer: `Lovelace`, score: 0, extra: `` },
							{ answer: `Gods Behaving Badly`, score: 0, extra: `` },
							{ answer: `Fading Gigolo`, score: 0, extra: `` },
							{ answer: `Love in Vegas`, score: 0, extra: `` },
							{ answer: `A Golden Boy`, score: 0, extra: `` },
							{ answer: `Life on the Line`, score: 0, extra: `` },
							{ answer: `Savva: Heart of the Warrior`, score: 0, extra: `` },
							{ answer: `Mothers and Daughters`, score: 0, extra: `` },
							{ answer: `Running Wild`, score: 0, extra: `` },
							{ answer: `All I Wish`, score: 0, extra: `` },
							{ answer: `The Disaster Artist`, score: 0, extra: `` },
							{ answer: `Rolling Thunder Revue: A Bob Dylan Story by Martin Scorsese`, score: 0, extra: `` },
							{ answer: `The Laundromat`, score: 0, extra: `` },
							{ answer: `What About Love`, score: 0, extra: `` }
						],
						[
							{ answer: `Die Hard`, score: 8, extra: `The is a big debate of course as to whether it counts as a "christmas" film or not` },
							{ answer: `The January Man`, score: 0, extra: 'Greg Walker, who plays the January Man, is a professional stunt man, and was also the stunt coordinator for this film' },
							{ answer: `Quigley Down Under`, score: 0, extra: 'One of two movies from 1990 with "Down Under" in the title. The other was Rescuers Down Under' },
							{ answer: `Truly, Madly, Deeply`, score: 1, extra: `Alan Rickman had cello lessons, and handles the right (bowing) hand, but the left hand is provided by a real cellist standing behind him with his arm through Alan Rickman's armpit.` },
							{ answer: `Closet Land`, score: 0, extra: `About an interrogator played by Alan Rickman and his victim (Madeleine Stowe). They are the only two cast members` },
							{ answer: `Robin Hood: Prince of Thieves`, score: 5, extra: `It is rumored that Kevin Costner had some of Alan Rickman's scenes cut when he realized that Rickman was upstaging him.` },
							{ answer: `Close My Eyes`, score: 0, extra: `` },
							{ answer: `Bob Roberts`, score: 0, extra: `` },
							{ answer: `Mesmer`, score: 0, extra: `` },
							{ answer: `An Awfully Big Adventure`, score: 0, extra: `The title is an ironic nod to the original Peter Pan story, in which Peter says, "To die will be an awfully big adventure."` },
							{ answer: `Sense and Sensibility`, score: 1, extra: `` },
							{ answer: `Michael Collins`, score: 0, extra: `` },
							{ answer: `The Winter Guest`, score: 0, extra: `` },
							{ answer: `Judas Kiss`, score: 0, extra: `` },
							{ answer: `Dark Harbor`, score: 0, extra: `` },
							{ answer: `Dogma`, score: 3, extra: `` },
							{ answer: `Galaxy Quest`, score: 0, extra: `` },
							{ answer: `Help! I'm a Fish`, score: 0, extra: `` },
							{ answer: `Blow Dry`, score: 0, extra: `` },
							{ answer: `Play`, score: 0, extra: `` },
							{ answer: `The Search for John Gissing`, score: 0, extra: `` },
							{ answer: `Harry Potter and the Philosopher's Stone`, score: 19, extra: `` },
							{ answer: `Harry Potter and the Chamber of Secrets`, score: 14, extra: `` },
							{ answer: `Love Actually`, score: 10, extra: `` },
							{ answer: `Harry Potter and the Prisoner of Azkaban`, score: 14, extra: `` },
							{ answer: `Harry Potter and the Goblet of Fire`, score: 14, extra: `` },
							{ answer: `The Hitchhiker's Guide to the Galaxy`, score: 2, extra: `` },
							{ answer: `Snow Cake`, score: 0, extra: `` },
							{ answer: `Perfume: The Story of a Murderer`, score: 0, extra: `` },
							{ answer: `Nobel Son`, score: 0, extra: `` },
							{ answer: `Harry Potter and the Order of the Phoenix`, score: 14, extra: `` },
							{ answer: `Sweeney Todd: The Demon Barber of Fleet Street`, score: 1, extra: `` },
							{ answer: `Bottle Shock`, score: 1, extra: `` },
							{ answer: `Harry Potter and the Half-Blood Prince`, score: 14, extra: `` },
							{ answer: `Harry Potter and the Deathly Hallows – Part 1`, score: 14, extra: `` },
							{ answer: `Alice in Wonderland`, score: 2, extra: `` },
							{ answer: `The Wildest Dream`, score: 0, extra: `` },
							{ answer: `Portraits in Dramatic Time`, score: 0, extra: `` },
							{ answer: `Harry Potter and the Deathly Hallows – Part 2`, score: 14, extra: `` },
							{ answer: `The Boy in the Bubble`, score: 0, extra: `` },
							{ answer: `Gambit`, score: 0, extra: `` },
							{ answer: `The Butler`, score: 0, extra: `` },
							{ answer: `A Promise`, score: 0, extra: `` },
							{ answer: `CBGB`, score: 0, extra: `` },
							{ answer: `Dust`, score: 0, extra: `` },
							{ answer: `A Little Chaos`, score: 0, extra: `` },
							{ answer: `Eye in the Sky`, score: 0, extra: `` },
							{ answer: `Alice Through the Looking Glass`, score: 1, extra: `` }
						],
						[
							{ answer: `The Cry Baby Killer`, score: 0, extra: `` },
							{ answer: `Too Soon to Love`, score: 0, extra: `` },
							{ answer: `The Wild Ride`, score: 0, extra: `` },
							{ answer: `The Little Shop of Horrors`, score: 0, extra: `` },
							{ answer: `Studs Lonigan`, score: 0, extra: `` },
							{ answer: `The Broken Land`, score: 0, extra: `` },
							{ answer: `The Raven`, score: 0, extra: `` },
							{ answer: `The Terror`, score: 0, extra: `` },
							{ answer: `Thunder Island`, score: 0, extra: `` },
							{ answer: `Flight to Fury`, score: 0, extra: `` },
							{ answer: `Back Door to Hell`, score: 0, extra: `` },
							{ answer: `Ensign Pulver`, score: 0, extra: `` },
							{ answer: `The Shooting`, score: 0, extra: `` },
							{ answer: `Ride in the Whirlwind`, score: 0, extra: `` },
							{ answer: `The St. Valentine's Day Massacre`, score: 0, extra: `` },
							{ answer: `Hells Angels on Wheels`, score: 0, extra: `` },
							{ answer: `The Trip`, score: 0, extra: `` },
							{ answer: `Psych-Out`, score: 0, extra: `` },
							{ answer: `Head`, score: 0, extra: `` },
							{ answer: `Easy Rider`, score: 0, extra: `` },
							{ answer: `On a Clear Day You Can See Forever`, score: 0, extra: `` },
							{ answer: `The Rebel Rousers`, score: 0, extra: `` },
							{ answer: `Five Easy Pieces`, score: 0, extra: `` },
							{ answer: `Carnal Knowledge`, score: 0, extra: `` },
							{ answer: `A Safe Place`, score: 0, extra: `` },
							{ answer: `Drive, He Said`, score: 0, extra: `` },
							{ answer: `The King of Marvin Gardens`, score: 0, extra: `` },
							{ answer: `The Last Detail`, score: 0, extra: `` },
							{ answer: `Chinatown`, score: 0, extra: `` },
							{ answer: `The Passenger`, score: 0, extra: `` },
							{ answer: `The Fortune`, score: 0, extra: `` },
							{ answer: `One Flew Over the Cuckoo's Nest`, score: 11, extra: `` },
							{ answer: `Tommy`, score: 0, extra: `` },
							{ answer: `The Missouri Breaks`, score: 0, extra: `` },
							{ answer: `The Last Tycoon`, score: 0, extra: `` },
							{ answer: `Goin' South`, score: 0, extra: `` },
							{ answer: `The Shining`, score: 13, extra: `` },
							{ answer: `The Postman Always Rings Twice`, score: 0, extra: `` },
							{ answer: `Reds`, score: 0, extra: `` },
							{ answer: `The Border`, score: 0, extra: `` },
							{ answer: `Terms of Endearment`, score: 0, extra: `` },
							{ answer: `Prizzi's Honor`, score: 0, extra: `` },
							{ answer: `Heartburn`, score: 0, extra: `` },
							{ answer: `The Witches of Eastwick`, score: 0, extra: `` },
							{ answer: `Broadcast News`, score: 0, extra: `` },
							{ answer: `Ironweed`, score: 0, extra: `` },
							{ answer: `Batman`, score: 10, extra: `` },
							{ answer: `The Two Jakes`, score: 0, extra: `` },
							{ answer: `Man Trouble`, score: 0, extra: `` },
							{ answer: `A Few Good Men`, score: 0, extra: `` },
							{ answer: `Hoffa`, score: 0, extra: `` },
							{ answer: `Wolf`, score: 0, extra: `` },
							{ answer: `The Crossing Guard`, score: 0, extra: `` },
							{ answer: `Blood and Wine`, score: 0, extra: `` },
							{ answer: `The Evening Star`, score: 0, extra: `` },
							{ answer: `Mars Attacks!`, score: 1, extra: `` },
							{ answer: `As Good as It Gets`, score: 1, extra: `` },
							{ answer: `The Pledge`, score: 0, extra: `` },
							{ answer: `About Schmidt`, score: 1, extra: `` },
							{ answer: `Anger Management`, score: 3, extra: `` },
							{ answer: `Something's Gotta Give`, score: 1, extra: `` },
							{ answer: `The Departed`, score: 3, extra: `` },
							{ answer: `The Bucket List`, score: 3, extra: `` },
							{ answer: `How Do You Know`, score: 0, extra: `` }
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
							{ answer: `LA Lakers`, score: 8, extra: `` },
							{ answer: `San Antonio Spurs`, score: 0, extra: `` },
							{ answer: `Detroit Pistons`, score: 0, extra: `` },
							{ answer: `Miami Heat`, score: 1, extra: `` },
							{ answer: `Golden State Warriors`, score: 2, extra: `` },
							{ answer: `Dallas Mavericks`, score: 0, extra: `` },
							{ answer: `Cleveland Cavaliers`, score: 0, extra: `` },
							{ answer: `Boston Celtics`, score: 0, extra: `` },
							{ answer: `Toronto Raptors`, score: 2, extra: `` }
						],
						[
							{ answer: `Óscar Pereiro`, score: 0, extra: `` },
							{ answer: `Alberto Contador`, score: 0, extra: `` },
							{ answer: `Andy Schleck`, score: 0, extra: `` },
							{ answer: `Cadel Evans`, score: 0, extra: `` },
							{ answer: `Bradley Wiggins`, score: 8, extra: `` },
							{ answer: `Chris Froome`, score: 6, extra: `` },
							{ answer: `Vincenzo Nibali`, score: 0, extra: `` },
							{ answer: `Geraint Thomas`, score: 5, extra: `` },
							{ answer: `Egan Bernal`, score: 0, extra: `` }
						],
						[
							{ answer: `A.C. Milan`, score: 8, extra: `` },
							{ answer: `Ajax`, score: 1, extra: `` },
							{ answer: `Aston Villa`, score: 0, extra: `` },
							{ answer: `Barcelona`, score: 10, extra: `` },
							{ answer: `Bayern Munich`, score: 7, extra: `` },
							{ answer: `Borussia Dortmund`, score: 2, extra: `` },
							{ answer: `Chelsea`, score: 7, extra: `` },
							{ answer: `Hamburger SV`, score: 0, extra: `` },
							{ answer: `Inter Milan`, score: 4, extra: `` },
							{ answer: `Juventus`, score: 6, extra: `` },
							{ answer: `Liverpool`, score: 11, extra: `` },
							{ answer: `Manchester United`, score: 10, extra: `` },
							{ answer: `Marseille`, score: 0, extra: `` },
							{ answer: `Nottingham Forest`, score: 2, extra: `` },
							{ answer: `Porto`, score: 5, extra: `` },
							{ answer: `PSV`, score: 0, extra: `` },
							{ answer: `Real Madrid`, score: 11, extra: `` },
							{ answer: `Red Star Belgrade`, score: 0, extra: `` },
							{ answer: `Steaua București`, score: 0, extra: `` }
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
							{ answer: `Berlin`, score: 21, extra: `` },
							{ answer: `Hamburg`, score: 13, extra: `` },
							{ answer: `Munich`, score: 16, extra: `` },
							{ answer: `Cologne`, score: 8, extra: `` },
							{ answer: `Frankfurt am Main`, score: 11, extra: `` },
							{ answer: `Düsseldorf`, score: 7, extra: `` },
							{ answer: `Stuttgart`, score: 8, extra: `` },
							{ answer: `Dortmund`, score: 3, extra: `` },
							{ answer: `Essen`, score: 2, extra: `` },
							{ answer: `Bremen`, score: 2, extra: `` },
							{ answer: `Dresden`, score: 2, extra: `` },
							{ answer: `Hanover`, score: 3, extra: `` },
							{ answer: `Leipzig`, score: 2, extra: `` },
							{ answer: `Duisburg`, score: 0, extra: `` },
							{ answer: `Nuremberg`, score: 2, extra: `` },
							{ answer: `Bochum`, score: 0, extra: `` },
							{ answer: `Wuppertal`, score: 0, extra: `` },
							{ answer: `Bielefeld`, score: 0, extra: `` },
							{ answer: `Bonn`, score: 2, extra: `` },
							{ answer: `Mannheim`, score: 0, extra: `` },
							{ answer: `Münster`, score: 0, extra: `` },
							{ answer: `Karlsruhe`, score: 0, extra: `` },
							{ answer: `Wiesbaden`, score: 1, extra: `` },
							{ answer: `Augsburg`, score: 0, extra: `` },
							{ answer: `Gelsenkirchen`, score: 0, extra: `` },
							{ answer: `Mönchengladbach`, score: 0, extra: `` }
						],
						[
							{ answer: `Paris`, score: 22, extra: `` },
							{ answer: `Marseille`, score: 13, extra: `` },
							{ answer: `Lyon`, score: 10, extra: `` },
							{ answer: `Toulouse`, score: 7, extra: `` },
							{ answer: `Nice`, score: 14, extra: `` },
							{ answer: `Nantes`, score: 4, extra: `` },
							{ answer: `Montpellier`, score: 3, extra: `` },
							{ answer: `Strasbourg`, score: 6, extra: `` },
							{ answer: `Bordeaux`, score: 10, extra: `` },
							{ answer: `Lille`, score: 6, extra: `` },
							{ answer: `Rennes`, score: 4, extra: `` },
							{ answer: `Reims`, score: 4, extra: `` },
							{ answer: `Saint-Étienne`, score: 0, extra: `` },
							{ answer: `Toulon`, score: 1, extra: `` },
							{ answer: `Le Havre`, score: 0, extra: `` },
							{ answer: `Grenoble`, score: 1, extra: `` },
							{ answer: `Dijon`, score: 3, extra: `` },
							{ answer: `Angers`, score: 0, extra: `` },
							{ answer: `Nîmes`, score: 0, extra: `` }
						],
						[
							{ answer: `Athens`, score: 22, extra: `` },
							{ answer: `Thessaloniki`, score: 5, extra: `` },
							{ answer: `Patras`, score: 1, extra: `` },
							{ answer: `Piraeus`, score: 0, extra: `` },
							{ answer: `Larissa`, score: 0, extra: `` },
							{ answer: `Heraklion`, score: 1, extra: `` },
							{ answer: `Peristeri`, score: 0, extra: `` },
							{ answer: `Kallithea`, score: 0, extra: `` }
						]
					]
				}
			]
		}
	],
	teams: [
		{
			name: 'Nick & Tanya',
			googleNames: ['Tanya'],
			credits: [ 'Nick Pearson', 'Tanya Alam' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
		},
		{
			name: 'Holly & Adam',
			googleNames: ['Holly'],
			credits: [ 'Holly Young', 'Adam Smith' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
		},
		{
			name: 'Vicki & Leo',
			googleNames: ['Vicki', 'Leo'],
			credits: [ 'Vicki Church', 'Leo Baines-Jump' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
		},
		{
			name: 'Paul & Sarah',
			googleNames: ['Paul'],
			credits: [ 'Paul Barratt', 'Sarah Bell' ],
			score: null,
			answers: 0,
			headToHeadScore: 0,
			out: false
		}
	]
}
