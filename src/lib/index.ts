export const amenities = ['drinking_water', 'toilet', 'atm'] as const;

export type AmenityKey = typeof amenities[number];

export const languages = ['de', 'en'] as const;

export const translations: {
	[key in (typeof languages)[number]]: {
		[key in (typeof amenities)[number]]: string;
	};
} = {
	en: {
		atm: 'ATM',
		drinking_water: 'Drinking water',
		toilet: 'toilet'
	},
	de: {
		atm: 'Geldautomat',
		drinking_water: 'Trinkwasser',
		toilet: 'Toilette'
	}
};
