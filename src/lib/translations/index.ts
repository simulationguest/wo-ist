import { get, writable } from 'svelte/store';
import { translations, type Translation, languages } from './translation';

//@ts-ignore
export const currentLanguage = writable<(typeof languages)[number]>(getLanguage() || 'en');

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
	console.log(key, translated);
	return translated as string;
}

function getLanguage() {
	if (!navigator) return;
	if (navigator.languages != undefined) {
		// @ts-ignore;
		return (
			navigator.languages.map((x) => x.trim().slice(0, 2)).find((id) => languages.includes(id)) ||
			navigator.language
		);
	}
	return navigator.language;
}

export function setLanguage() {
	//@ts-ignore
	currentLanguage.set(getLanguage() || 'en');
}
