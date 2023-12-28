export const amenities = ['drinking_water', 'toilet', 'atm', 'pub', 'pizza', 'megges'] as const;

export type AmenityKey = (typeof amenities)[number];

export const languages = ['de', 'en'] as const;

export const translations: {
	[key in (typeof languages)[number]]: {
		[key in AmenityKey]: string;
	};
} = {
	en: {
		atm: 'ATM',
		drinking_water: 'Drinking water',
		toilet: 'toilet',
		pub: 'Irish pub'	
	},
	de: {
		atm: 'Geldautomat',
		drinking_water: 'Trinkwasser',
		toilet: 'Toilette',
		pub: 'Irish Pub',
		megges: 'McDonalds',
		pizza: 'Pizza'
	}
};

export function tr(key: AmenityKey): string {
	return translations['de'][key];
}
