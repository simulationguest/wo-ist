import DE from './de';
import EN from './en';

export enum Language {
	DE = 'de',
	EN = 'en'
}

export type Translation =
	| {
			[key: string]: Translation;
	  }
	| string
	| string[];

export const translations: {
	[key in Language]: Translation;
} = {
	de: DE,
	en: EN
};
