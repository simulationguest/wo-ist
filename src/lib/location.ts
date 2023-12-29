import { get, writable } from 'svelte/store';

export type Location = {
	lat: number;
	lon: number;
}

export const currentLocation = writable<{ location: Location, lastUpdated: number } | null>(null);

export enum LocationError {
	PermissionDenied = "permission denied",
	NoGeolocationAPI = "no geolocation api",
	FailedToFetch = "failed to fetch",
}

async function fetchLocation(): Promise<Location> {
	if (navigator.permissions && navigator.permissions.query) {
		const permission = await navigator.permissions.query({ name: 'geolocation' });
		if (permission.state == 'denied') {
			return Promise.reject(LocationError.PermissionDenied);
		}
	}
	if (!navigator.geolocation) {
		return Promise.reject(LocationError.NoGeolocationAPI);
	}
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				})
			},
			(err) => {
				reject(err);
			},
			{ enableHighAccuracy: true }
		);

	})
}

export async function getLocation() {
	const cached = get(currentLocation);
	if (cached !== null && ((Date.now() - cached.lastUpdated) / 1000) < 120) {
		return cached.location;
	}
	const location = await fetchLocation();
	currentLocation.set({
		lastUpdated: Date.now(),
		location,
	});
	return location;
}