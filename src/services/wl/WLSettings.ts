export default {
	host: 'Josh Thompson',		// Host name - for credits
	hostGoogle: 'Josh',			// The name that appears over their Google Hangout window (for auto director)
	featuring: 'Josh Thompson',	// Voice over during voting - for credits
	roundBaseTime: 180,			// How many seconds does the first round start with
	roundTimeReduction: 10,		// How many seconds are reduced every round
	finalRoundTime: 90,			// How many seconds are for the final (non head-to-head) round
	// chain: [ 5, 10, 25, 50, 100, 150, 250, 375, 500 ],
	chain: [ 1, 2, 5, 10, 20, 40, 70, 110, 180 ],

	notUK: true,				// Should questions that are too reliant on UK culture - be removed
	notUsed: true				// Should questions that have been used - be removed
}
