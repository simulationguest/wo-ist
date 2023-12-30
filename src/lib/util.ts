import { browser } from "$app/environment";
import { get, writable } from "svelte/store";
import type { Location } from "./location";
import type { Amenity } from "./load";

let isSafari = () => browser && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const MapProviders = { 'osm': 'OSM', 'google': 'Google Maps', 'apple': 'Apple Maps' } as const;

type MapProvider = keyof typeof MapProviders;

export const mapProvider = writable<MapProvider>(browser && localStorage.getItem("map_provider") as MapProvider || 'google');
mapProvider.subscribe(provider => localStorage.setItem("map_provider", provider));

export function makeMapsURL(provider: MapProvider, { location: { lat, lon }, osm: { id, type } }: Amenity) {
	switch (provider) {
		case 'apple':
			return `https://maps.apple.com/?daddr=${lat},${lon}`;
		case 'osm':
			return `https://openstreetmap.org/${type}/${id}`;
		default:
			return `https://www.google.com/maps/place/${lat},${lon}`;
	}
}
