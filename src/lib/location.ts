import { page } from '$app/stores';
import { get, writable } from 'svelte/store';
import AppError from './error';

export type Location = {
	lat: number;
	lon: number;
};

type UserLocation = { location: Location; lastUpdated: number };

export const currentLocation = writable<Promise<UserLocation>>(fetchLocation());

async function fetchLocation(): Promise<UserLocation> {
	console.log("Called")
	if (navigator.permissions && navigator.permissions.query) {
		const permission = await navigator.permissions.query({ name: 'geolocation' });
		if (permission.state == 'denied') {
			return Promise.reject(AppError.LocationPermissionDenied);
		}
	}
	if (!navigator.geolocation) {
		throw AppError.NoGPSAPI;
	}
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lastUpdated: Date.now(),
					location: {
						lat: pos.coords.latitude,
						lon: pos.coords.longitude,
					},
				});
			},
			(err) => {
				console.error('Failed to get location:', err);
				reject(AppError.FailedToGetLocation);
			},
			{ enableHighAccuracy: true },
		);
	});
}

export async function getLocation() {
	const cached = await get(currentLocation);
	if (cached !== null && (Date.now() - cached.lastUpdated) / 1000 < 120) {
		return cached;
	}
	const location = fetchLocation();
	currentLocation.set(location);
	return await location;
}
