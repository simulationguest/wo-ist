import type { Translation } from './translation';

const EN: Translation = {
	app_name: 'Where is?',
	homepage: {
		where_is: 'Where is',
		amenities: {
			atm: 'an ATM',
			drinking_water: 'drinking water',
			toilet: 'a toilet',
			pub: 'a pub',
			megges: 'McDonalds',
			pizza: 'Pizza'
		},
		in_proximity: 'nearby?',
		lets_go: ["Let's go!", 'Alright!']
	},
	tags: {
		wheelchair_friendly: 'wheelchair friendly',
		wheelchair_unfriendly: 'not wheelchair friendly',
		bottle_refill: 'bottle refill',
		bottle: 'bottle',
		changing_table: 'changing table',
		cash_in: 'cash in',
		expensive: 'expensive',
		explicitly_legal: 'legal',
		irish_themed: 'irish themed'
	},
	amenities: {
		atm: 'ATM',
		drinking_water: 'drinking water',
		toilet: 'toilette',
		pub: 'pub',
		megges: 'McDonalds',
		pizza: 'Pizza'
	},
	findpage: {
		go_back: 'Go back',
		headings: {
			fetching_location: {
				title: ['Looking for you..', 'Getting your location'],
				subtitle: ['Where are you??', 'we will find you.']
			},
			fetching_amenities: {
				title: ['one moment', 'one second please'],
				subtitle: ['almost got it :)', 'please stay']
			},
			nothing_found: {
				title: ['we found nothing', 'nothing found'],
				subtitle: 'Deine Umgebung ist langweilig'
			},
			done: {
				title: ['Sodala', 'Fertig', 'Bitteschön :)'],
				subtitle: 'Frohes finden'
			}
		},
	}
};

export default EN;
