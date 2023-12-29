import type { AmenityKey } from "$lib";

// export enum TranslationKeys {
//   WhereIs,
//   WhereIsA,
//   InProximity,
//   LetsGo,
// }

export const languages = ['de', 'en'] as const;

export const translations: {
  [key in (typeof languages)[number]]: {
    [aKey in AmenityKey]: string;
  };
} = {
  en: {
    atm: 'ATM',
    drinking_water: 'drinking water',
    toilet: 'toilet',
    pub: 'pub',
    pizza: 'pizza',
    megges: 'McDonalds',
  },

  de: {
    atm: 'Geldautomat',
    drinking_water: 'Trinkwasser',
    toilet: 'Toilette',
    pub: 'Irish Pub',
    megges: 'McDonalds',
    pizza: 'Pizza',

  }
};

export function tr(key: AmenityKey): string {
  return translations['de'][key];
}
