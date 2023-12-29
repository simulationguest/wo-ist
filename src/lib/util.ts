import { browser } from '$app/environment';

let is_safari = browser && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function make_maps_url(lat: number, lon: number) {
	if (is_safari) {
		return `https://maps.apple.com/?daddr=${lat},${lon}`;
	}
	return `https://www.google.com/maps/place/${lat},${lon}`;
}
