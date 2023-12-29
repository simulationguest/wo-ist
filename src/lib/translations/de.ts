const DE = {
	app_name: 'Wo ist?',
	homepage: {
		where_is: 'Wo ist denn',
		amenities: {
			atm: 'ein Geldautomat',
			drinking_water: 'Trinkwasser',
			toilet: 'eine Toilette',
			pub: 'ein Pub',
			megges: 'McDonalds',
			pizza: 'Pizza',
		},
		in_proximity: 'in der Nähe?',
		lets_go: 'Auf gehts!',
	},
	error: {
		no_location_permission: "Keine Standortberechtigung",
		no_gps_api: "Kein GPS gefunden",
		fetch_failed: "Suche fehlgeschlagen",
		location_failed: "Kein GPS gefunden",
	},
	tags: {
		wheelchair_friendly: 'Rollstuhl-freundlich',
		wheelchair_unfriendly: 'Nicht Rollstuhl-freundlich',
		bottle_refill: 'Flasche auffüllbar',
		bottle: 'Flasche',
		changing_table: 'Wickeltisch',
		cash_in: 'Bargeldeinzahlung',
		expensive: 'Teuer',
		explicitly_legal: 'Legal',
		irish_themed: 'Irish Themed',
	},
	amenities: {
		atm: 'Geldautomat',
		drinking_water: 'Trinkwasser',
		toilet: 'Toilette',
		pub: 'Pub',
		megges: 'McDonalds',
		pizza: 'Pizza',
	},
	findpage: {
		go_back: ['Zurück bitte', 'halt stopp!'],
		maybe_now: ["Vielleicht jetzt?", "Nochmal probieren"],
		headings: {
			fetching_location: {
				title: 'Suche Standort..',
				subtitle: 'Wo bist du denn??',
			},
			fetching_amenities: {
				title: ['Einen Moment ...', 'Schau ma mal was wird'],
				subtitle: 'Wir hams gleich',
			},
			nothing_found: {
				title: 'Nix gefunden',
				subtitle: 'Deine Umgebung ist langweilig',
			},
			done: {
				title: ['Sodala', 'Fertig', 'Bitteschön :)'],
				subtitle: 'Frohes finden',
			},
		},
	},
};

export default DE;
