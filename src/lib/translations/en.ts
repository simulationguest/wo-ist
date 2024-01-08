import type { Translation } from './translation';

const EN: Translation = {
	app_name: 'Where is?',
	homepage: {
		where_is: 'Where is',
		amenities: {
			coffee: 'a coffee',
			atm: 'an ATM',
			drinking_water: 'drinking water',
			toilet: 'a toilet',
			pub: 'a pub',
			megges: 'McDonalds',
			pizza: 'Pizza',
			kebab: 'Kebab',
			trash: 'a trashcan',
		},
		in_proximity: 'nearby?',
		lets_go: ["Let's go!", 'Alright!'],
	},
	error: {
		no_location_permission: "No location permission",
		no_gps_api: "no gps found",
		fetch_failed: "search failed",
		location_failed: "no gps found",
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
		irish_themed: 'irish themed',
	},
	amenities: {
		coffee: 'coffee',
		atm: 'ATM',
		drinking_water: 'drinking water',
		toilet: 'toilette',
		pub: 'pub',
		megges: 'McDonalds',
		pizza: 'Pizza',
		kebab: 'Kebab',
		trash: 'Trashcan',
	},
	findpage: {
		go_back: 'Go back',
		maybe_now: ["Maybe now?", "Try again?"],
		headings: {
			fetching_location: {
				title: ['Looking for you..', 'Getting your location'],
				subtitle: ['Where are you??', 'we will find you.'],
			},
			fetching_amenities: {
				title: ['one moment', 'one second please'],
				subtitle: ['almost got it :)', 'please stay'],
			},
			nothing_found: {
				title: ['we found nothing', 'nothing found'],
				subtitle: 'Deine Umgebung ist langweilig',
			},
			done: {
				title: ['Sodala', 'Fertig', 'Bitteschön :)'],
				subtitle: 'Frohes finden',
			},
		},
	},
};

export default EN;
