export const amenities = ['drinking_water', 'toilet', 'atm', 'pub', 'pizza', 'megges'] as const;

export type AmenityKey = (typeof amenities)[number];
