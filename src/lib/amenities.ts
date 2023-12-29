export const amenities = ['drinking_water', 'toilet', 'atm', 'pub', 'pizza', 'megges', 'kebab', 'trash'] as const;

export type AmenityKey = (typeof amenities)[number];

export function isAmenity(s: string | null) {
	// @ts-ignore
	return !!s && amenities.indexOf(s) > -1;
}
