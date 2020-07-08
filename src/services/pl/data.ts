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
					question: 'US President Surnames that are 6 letters of fewer',
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
							{ answer: `Stardust Memories`, score: fake(), extra: `` },
							{ answer: `Les Uns et les Autres`, score: fake(), extra: `` },
							{ answer: `Deadly Blessing`, score: fake(), extra: `` },
							{ answer: `Irreconcilable Differences`, score: fake(), extra: `` },
							{ answer: `King Solomon's Mines`, score: fake(), extra: `` },
							{ answer: `Allan Quatermain and the Lost City of Gold`, score: fake(), extra: `` },
							{ answer: `Police Academy 4: Citizens on Patrol`, score: fake(), extra: `` },
							{ answer: `Cold Steel`, score: fake(), extra: `` },
							{ answer: `Above the Law`, score: fake(), extra: `` },
							{ answer: `Action Jackson`, score: fake(), extra: `` },
							{ answer: `Beyond the Stars`, score: fake(), extra: `` },
							{ answer: `Blood and Sand`, score: fake(), extra: `` },
							{ answer: `Total Recall`, score: fake(), extra: `` },
							{ answer: `He Said, She Said`, score: fake(), extra: `` },
							{ answer: `Diary of a Hitman`, score: fake(), extra: `` },
							{ answer: `Scissors`, score: fake(), extra: `` },
							{ answer: `Year of the Gun`, score: fake(), extra: `` },
							{ answer: `Where Sleeping Dogs Lie`, score: fake(), extra: `` },
							{ answer: `Basic Instinct`, score: fake(), extra: `` },
							{ answer: `Sliver`, score: fake(), extra: `` },
							{ answer: `Last Action Hero`, score: fake(), extra: `` },
							{ answer: `Intersection`, score: fake(), extra: `` },
							{ answer: `The Specialist`, score: fake(), extra: `` },
							{ answer: `The Quick and the Dead`, score: fake(), extra: `` },
							{ answer: `Casino`, score: fake(), extra: `` },
							{ answer: `Diabolique`, score: fake(), extra: `` },
							{ answer: `Last Dance`, score: fake(), extra: `` },
							{ answer: `Sphere`, score: fake(), extra: `` },
							{ answer: `Antz`, score: fake(), extra: `` },
							{ answer: `The Mighty`, score: fake(), extra: `` },
							{ answer: `Gloria`, score: fake(), extra: `` },
							{ answer: `The Muse`, score: fake(), extra: `` },
							{ answer: `Simpatico`, score: fake(), extra: `` },
							{ answer: `Basic Insect`, score: fake(), extra: `` },
							{ answer: `Picking Up the Pieces`, score: fake(), extra: `` },
							{ answer: `Beautiful Joe`, score: fake(), extra: `` },
							{ answer: `Cold Creek Manor`, score: fake(), extra: `` },
							{ answer: `A Different Loyalty`, score: fake(), extra: `` },
							{ answer: `Catwoman`, score: fake(), extra: `` },
							{ answer: `Broken Flowers`, score: fake(), extra: `` },
							{ answer: `Alpha Dog`, score: fake(), extra: `` },
							{ answer: `Basic Instinct 2`, score: fake(), extra: `` },
							{ answer: `Bobby`, score: fake(), extra: `` },
							{ answer: `When a Man Falls in the Forest`, score: fake(), extra: `` },
							{ answer: `If I Had Known I Was a Genius`, score: fake(), extra: `` },
							{ answer: `Democrazy`, score: fake(), extra: `` },
							{ answer: `The Year of Getting to Know Us`, score: fake(), extra: `` },
							{ answer: `Five Dollars a Day`, score: fake(), extra: `` },
							{ answer: `Streets of Blood`, score: fake(), extra: `` },
							{ answer: `Largo Winch II`, score: fake(), extra: `` },
							{ answer: `Border Run`, score: fake(), extra: `` },
							{ answer: `Lovelace`, score: fake(), extra: `` },
							{ answer: `Gods Behaving Badly`, score: fake(), extra: `` },
							{ answer: `Fading Gigolo`, score: fake(), extra: `` },
							{ answer: `Love in Vegas`, score: fake(), extra: `` },
							{ answer: `A Golden Boy`, score: fake(), extra: `` },
							{ answer: `Life on the Line`, score: fake(), extra: `` },
							{ answer: `Savva: Heart of the Warrior`, score: fake(), extra: `` },
							{ answer: `Mothers and Daughters`, score: fake(), extra: `` },
							{ answer: `Running Wild`, score: fake(), extra: `` },
							{ answer: `All I Wish`, score: fake(), extra: `` },
							{ answer: `The Disaster Artist`, score: fake(), extra: `` },
							{ answer: `Rolling Thunder Revue: A Bob Dylan Story by Martin Scorsese`, score: fake(), extra: `` },
							{ answer: `The Laundromat`, score: fake(), extra: `` },
							{ answer: `What About Love`, score: fake(), extra: `` }
						],
						[
							{ answer: `Die Hard`, score: fake(), extra: `The is a big debate of course as to whether it counts as a "christmas" film or not` },
							{ answer: `The January Man`, score: fake(), extra: 'Greg Walker, who plays the January Man, is a professional stunt man, and was also the stunt coordinator for this film' },
							{ answer: `Quigley Down Under`, score: fake(), extra: 'One of two movies from 1990 with "Down Under" in the title. The other was Rescuers Down Under' },
							{ answer: `Truly, Madly, Deeply`, score: fake(), extra: `Alan Rickman had cello lessons, and handles the right (bowing) hand, but the left hand is provided by a real cellist standing behind him with his arm through Alan Rickman's armpit.` },
							{ answer: `Closet Land`, score: fake(), extra: `About an interrogator played by Alan Rickman and his victim (Madeleine Stowe). They are the only two cast members` },
							{ answer: `Robin Hood: Prince of Thieves`, score: fake(), extra: `It is rumored that Kevin Costner had some of Alan Rickman's scenes cut when he realized that Rickman was upstaging him.` },
							{ answer: `Close My Eyes`, score: fake(), extra: `` },
							{ answer: `Bob Roberts`, score: fake(), extra: `` },
							{ answer: `Mesmer`, score: fake(), extra: `` },
							{ answer: `An Awfully Big Adventure`, score: fake(), extra: `The title is an ironic nod to the original Peter Pan story, in which Peter says, "To die will be an awfully big adventure."` },
							{ answer: `Sense and Sensibility`, score: fake(), extra: `` },
							{ answer: `Michael Collins`, score: fake(), extra: `` },
							{ answer: `The Winter Guest`, score: fake(), extra: `` },
							{ answer: `Judas Kiss`, score: fake(), extra: `` },
							{ answer: `Dark Harbor`, score: fake(), extra: `` },
							{ answer: `Dogma`, score: fake(), extra: `` },
							{ answer: `Galaxy Quest`, score: fake(), extra: `` },
							{ answer: `Help! I'm a Fish`, score: fake(), extra: `` },
							{ answer: `Blow Dry`, score: fake(), extra: `` },
							{ answer: `Play`, score: fake(), extra: `` },
							{ answer: `The Search for John Gissing`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Philosopher's Stone`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Chamber of Secrets`, score: fake(), extra: `` },
							{ answer: `Love Actually`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Prisoner of Azkaban`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Goblet of Fire`, score: fake(), extra: `` },
							{ answer: `The Hitchhiker's Guide to the Galaxy`, score: fake(), extra: `` },
							{ answer: `Snow Cake`, score: fake(), extra: `` },
							{ answer: `Perfume: The Story of a Murderer`, score: fake(), extra: `` },
							{ answer: `Nobel Son`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Order of the Phoenix`, score: fake(), extra: `` },
							{ answer: `Sweeney Todd: The Demon Barber of Fleet Street`, score: fake(), extra: `` },
							{ answer: `Bottle Shock`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Half-Blood Prince`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Deathly Hallows – Part 1`, score: fake(), extra: `` },
							{ answer: `Alice in Wonderland`, score: fake(), extra: `` },
							{ answer: `The Wildest Dream`, score: fake(), extra: `` },
							{ answer: `Portraits in Dramatic Time`, score: fake(), extra: `` },
							{ answer: `Harry Potter and the Deathly Hallows – Part 2`, score: fake(), extra: `` },
							{ answer: `The Boy in the Bubble`, score: fake(), extra: `` },
							{ answer: `Gambit`, score: fake(), extra: `` },
							{ answer: `The Butler`, score: fake(), extra: `` },
							{ answer: `A Promise`, score: fake(), extra: `` },
							{ answer: `CBGB`, score: fake(), extra: `` },
							{ answer: `Dust`, score: fake(), extra: `` },
							{ answer: `A Little Chaos`, score: fake(), extra: `` },
							{ answer: `Eye in the Sky`, score: fake(), extra: `` },
							{ answer: `Alice Through the Looking Glass`, score: fake(), extra: `` }
						],
						[
							{ answer: `The Cry Baby Killer`, score: fake(), extra: `` },
							{ answer: `Too Soon to Love`, score: fake(), extra: `` },
							{ answer: `The Wild Ride`, score: fake(), extra: `` },
							{ answer: `The Little Shop of Horrors`, score: fake(), extra: `` },
							{ answer: `Studs Lonigan`, score: fake(), extra: `` },
							{ answer: `The Broken Land`, score: fake(), extra: `` },
							{ answer: `The Raven`, score: fake(), extra: `` },
							{ answer: `The Terror`, score: fake(), extra: `` },
							{ answer: `Thunder Island`, score: fake(), extra: `` },
							{ answer: `Flight to Fury`, score: fake(), extra: `` },
							{ answer: `Back Door to Hell`, score: fake(), extra: `` },
							{ answer: `Ensign Pulver`, score: fake(), extra: `` },
							{ answer: `The Shooting`, score: fake(), extra: `` },
							{ answer: `Ride in the Whirlwind`, score: fake(), extra: `` },
							{ answer: `The St. Valentine's Day Massacre`, score: fake(), extra: `` },
							{ answer: `Hells Angels on Wheels`, score: fake(), extra: `` },
							{ answer: `The Trip`, score: fake(), extra: `` },
							{ answer: `Psych-Out`, score: fake(), extra: `` },
							{ answer: `Head`, score: fake(), extra: `` },
							{ answer: `Easy Rider`, score: fake(), extra: `` },
							{ answer: `On a Clear Day You Can See Forever`, score: fake(), extra: `` },
							{ answer: `The Rebel Rousers`, score: fake(), extra: `` },
							{ answer: `Five Easy Pieces`, score: fake(), extra: `` },
							{ answer: `Carnal Knowledge`, score: fake(), extra: `` },
							{ answer: `A Safe Place`, score: fake(), extra: `` },
							{ answer: `Drive, He Said`, score: fake(), extra: `` },
							{ answer: `The King of Marvin Gardens`, score: fake(), extra: `` },
							{ answer: `The Last Detail`, score: fake(), extra: `` },
							{ answer: `Chinatown`, score: fake(), extra: `` },
							{ answer: `The Passenger`, score: fake(), extra: `` },
							{ answer: `The Fortune`, score: fake(), extra: `` },
							{ answer: `One Flew Over the Cuckoo's Nest`, score: fake(), extra: `` },
							{ answer: `Tommy`, score: fake(), extra: `` },
							{ answer: `The Missouri Breaks`, score: fake(), extra: `` },
							{ answer: `The Last Tycoon`, score: fake(), extra: `` },
							{ answer: `Goin' South`, score: fake(), extra: `` },
							{ answer: `The Shining`, score: fake(), extra: `` },
							{ answer: `The Postman Always Rings Twice`, score: fake(), extra: `` },
							{ answer: `Reds`, score: fake(), extra: `` },
							{ answer: `The Border`, score: fake(), extra: `` },
							{ answer: `Terms of Endearment`, score: fake(), extra: `` },
							{ answer: `Prizzi's Honor`, score: fake(), extra: `` },
							{ answer: `Heartburn`, score: fake(), extra: `` },
							{ answer: `The Witches of Eastwick`, score: fake(), extra: `` },
							{ answer: `Broadcast News`, score: fake(), extra: `` },
							{ answer: `Ironweed`, score: fake(), extra: `` },
							{ answer: `Batman`, score: fake(), extra: `` },
							{ answer: `The Two Jakes`, score: fake(), extra: `` },
							{ answer: `Man Trouble`, score: fake(), extra: `` },
							{ answer: `A Few Good Men`, score: fake(), extra: `` },
							{ answer: `Hoffa`, score: fake(), extra: `` },
							{ answer: `Wolf`, score: fake(), extra: `` },
							{ answer: `The Crossing Guard`, score: fake(), extra: `` },
							{ answer: `Blood and Wine`, score: fake(), extra: `` },
							{ answer: `The Evening Star`, score: fake(), extra: `` },
							{ answer: `Mars Attacks!`, score: fake(), extra: `` },
							{ answer: `As Good as It Gets`, score: fake(), extra: `` },
							{ answer: `The Pledge`, score: fake(), extra: `` },
							{ answer: `About Schmidt`, score: fake(), extra: `` },
							{ answer: `Anger Management`, score: fake(), extra: `` },
							{ answer: `Something's Gotta Give`, score: fake(), extra: `` },
							{ answer: `The Departed`, score: fake(), extra: `` },
							{ answer: `The Bucket List`, score: fake(), extra: `` },
							{ answer: `How Do You Know`, score: fake(), extra: `` }
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
							{ answer: `LA Lakers`, score: fake(), extra: `` },
							{ answer: `San Antonio Spurs`, score: fake(), extra: `` },
							{ answer: `Detroit Pistons`, score: fake(), extra: `` },
							{ answer: `Miami Heat`, score: fake(), extra: `` },
							{ answer: `Golden State Warriors`, score: fake(), extra: `` },
							{ answer: `Dallas Mavericks`, score: fake(), extra: `` },
							{ answer: `Cleveland Cavaliers`, score: fake(), extra: `` },
							{ answer: `Boston Celtics`, score: fake(), extra: `` },
							{ answer: `Toronto Raptors`, score: fake(), extra: `` }
						],
						[
							{ answer: `Óscar Pereiro`, score: fake(), extra: `` },
							{ answer: `Alberto Contador`, score: fake(), extra: `` },
							{ answer: `Andy Schleck`, score: fake(), extra: `` },
							{ answer: `Cadel Evans`, score: fake(), extra: `` },
							{ answer: `Bradley Wiggins`, score: fake(), extra: `` },
							{ answer: `Chris Froome`, score: fake(), extra: `` },
							{ answer: `Vincenzo Nibali`, score: fake(), extra: `` },
							{ answer: `Geraint Thomas`, score: fake(), extra: `` },
							{ answer: `Egan Bernal`, score: fake(), extra: `` }
						],
						[
							{ answer: `A.C. Milan`, score: fake(), extra: `` },
							{ answer: `Ajax`, score: fake(), extra: `` },
							{ answer: `Aston Villa`, score: fake(), extra: `` },
							{ answer: `Barcelona`, score: fake(), extra: `` },
							{ answer: `Bayern Munich`, score: fake(), extra: `` },
							{ answer: `Borussia Dortmund`, score: fake(), extra: `` },
							{ answer: `Chelsea`, score: fake(), extra: `` },
							{ answer: `Hamburger SV`, score: fake(), extra: `` },
							{ answer: `Inter Milan`, score: fake(), extra: `` },
							{ answer: `Juventus`, score: fake(), extra: `` },
							{ answer: `Liverpool`, score: fake(), extra: `` },
							{ answer: `Manchester United`, score: fake(), extra: `` },
							{ answer: `Marseille`, score: fake(), extra: `` },
							{ answer: `Nottingham Forest`, score: fake(), extra: `` },
							{ answer: `Porto`, score: fake(), extra: `` },
							{ answer: `PSV`, score: fake(), extra: `` },
							{ answer: `Real Madrid`, score: fake(), extra: `` },
							{ answer: `Red Star Belgrade`, score: fake(), extra: `` },
							{ answer: `Steaua București`, score: fake(), extra: `` }
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
							{ answer: `Athens`, score: fake(), extra: `` },
							{ answer: `Thessaloniki`, score: fake(), extra: `` },
							{ answer: `Patras`, score: fake(), extra: `` },
							{ answer: `Piraeus`, score: fake(), extra: `` },
							{ answer: `Larissa`, score: fake(), extra: `` },
							{ answer: `Heraklion`, score: fake(), extra: `` },
							{ answer: `Peristeri`, score: fake(), extra: `` },
							{ answer: `Kallithea`, score: fake(), extra: `` }
						],
						[
							{ answer: `Berlin`, score: fake(), extra: `` },
							{ answer: `Hamburg`, score: fake(), extra: `` },
							{ answer: `Munich`, score: fake(), extra: `` },
							{ answer: `Cologne`, score: fake(), extra: `` },
							{ answer: `Frankfurt am Main`, score: fake(), extra: `` },
							{ answer: `Düsseldorf`, score: fake(), extra: `` },
							{ answer: `Stuttgart`, score: fake(), extra: `` },
							{ answer: `Dortmund`, score: fake(), extra: `` },
							{ answer: `Essen`, score: fake(), extra: `` },
							{ answer: `Bremen`, score: fake(), extra: `` },
							{ answer: `Dresden`, score: fake(), extra: `` },
							{ answer: `Hanover`, score: fake(), extra: `` },
							{ answer: `Leipzig`, score: fake(), extra: `` },
							{ answer: `Duisburg`, score: fake(), extra: `` },
							{ answer: `Nuremberg`, score: fake(), extra: `` },
							{ answer: `Bochum`, score: fake(), extra: `` },
							{ answer: `Wuppertal`, score: fake(), extra: `` },
							{ answer: `Bielefeld`, score: fake(), extra: `` },
							{ answer: `Bonn`, score: fake(), extra: `` },
							{ answer: `Mannheim`, score: fake(), extra: `` },
							{ answer: `Münster`, score: fake(), extra: `` },
							{ answer: `Karlsruhe`, score: fake(), extra: `` },
							{ answer: `Wiesbaden`, score: fake(), extra: `` },
							{ answer: `Augsburg`, score: fake(), extra: `` },
							{ answer: `Gelsenkirchen`, score: fake(), extra: `` },
							{ answer: `Mönchengladbach`, score: fake(), extra: `` }
						],
						[
							{ answer: `Paris`, score: fake(), extra: `` },
							{ answer: `Marseille`, score: fake(), extra: `` },
							{ answer: `Lyon`, score: fake(), extra: `` },
							{ answer: `Toulouse`, score: fake(), extra: `` },
							{ answer: `Nice`, score: fake(), extra: `` },
							{ answer: `Nantes`, score: fake(), extra: `` },
							{ answer: `Montpellier`, score: fake(), extra: `` },
							{ answer: `Strasbourg`, score: fake(), extra: `` },
							{ answer: `Bordeaux`, score: fake(), extra: `` },
							{ answer: `Lille`, score: fake(), extra: `` },
							{ answer: `Rennes`, score: fake(), extra: `` },
							{ answer: `Reims`, score: fake(), extra: `` },
							{ answer: `Saint-Étienne`, score: fake(), extra: `` },
							{ answer: `Toulon`, score: fake(), extra: `` },
							{ answer: `Le Havre`, score: fake(), extra: `` },
							{ answer: `Grenoble`, score: fake(), extra: `` },
							{ answer: `Dijon`, score: fake(), extra: `` },
							{ answer: `Angers`, score: fake(), extra: `` },
							{ answer: `Nîmes`, score: fake(), extra: `` }
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
