import { get, writable } from 'svelte/store';
import { Language, translations, type Translation } from './translation';

export const currentLanguage = writable<Language>(Language.DE);

function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

export function tr(key: string): string {
	const keyParts = key.split('.');
	let translated: Translation = translations[get(currentLanguage)];
	for (const part of keyParts) {
		// @ts-ignore
		translated = translated[part];
	}
	if (Array.isArray(translated)) {
		return translated[getRandomInt(translated.length)];
	}
	return translated as string;
}
