import DE from './de';
import EN from './en';

export const languages = ['de', 'en'] as const;

export type Translation =
	| {
			[key: string]: Translation;
	  }
	| string
	| string[];

export const translations: {
	[key in (typeof languages)[number]]: Translation;
} = {
	de: DE,
	en: EN,
};
