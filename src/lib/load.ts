import { applyAction } from '$app/forms';
import { type AmenityKey } from '$lib/amenities';
import AppError from './error';
import type { Location } from './location';
import { tr } from './translations';

export interface Amenity {
	location: Location,
	distance: number;
	operator?: string;
	tags: string[];
	osm: {
		type: any;
		id: any;
	}
}

async function load_where_internal({ lat, lon }: Location, type: AmenityKey) {
	const filter = `(around:1000,${lat},${lon})`;
	const filterAccess = `${filter}[access!=no][access!=private][access!=customers]`;

	let queryBody;
	switch (type) {
		case 'coffee':
			queryBody = `( nwr${filterAccess}[shop="coffee"]; nwr${filterAccess}[amenity="cafe"]; nwr${filterAccess}["drink:coffee"=yes]; nwr${filterAccess}[vending=coffee]; );`;
			break;
		case 'drinking_water':
			queryBody = `nwr${filterAccess}[amenity="drinking_water"];`;
			break;
		case 'toilet':
			queryBody = `nwr${filterAccess}[amenity=toilets];`;
			break;
		case 'pub':
			queryBody = `nwr${filterAccess}[amenity=pub];`;
			break;
		case 'megges':
			queryBody = `nwr${filterAccess}[amenity=fast_food][brand="McDonald's"];`;
			break;
		case 'pizza':
			queryBody = `nwr${filterAccess}[cuisine=pizza];`;
			break;
		case 'atm':
			queryBody = `( nwr${filterAccess}[amenity=atm]; nwr${filterAccess}[amenity=bank]; );`;
			break;
		case 'kebab':
			queryBody = `nwr${filterAccess}[cuisine=kebab];`;
			break;
		//case 'trash':
		//	queryBody = `( nwr${filterAccess}[amenity=waste_disposal]; nwr${filterAccess}[amenity=waste_basket]; );`
		//	break;
	}

	queryBody = `[out:json];${queryBody}out center;`;

	const res = await fetch('https://overpass-api.de/api/interpreter', {
		method: 'post',
		body: queryBody,
	});
	const data = await res.json();

	if (!data.elements.length) {
		return [];
	}

	let results: Amenity[] = [];

	for (const el of data.elements) {
		const elLat = el.lat ?? el.center.lat;
		const elLon = el.lon ?? el.center.lon;

		let amenity: Amenity = {
			location: {
				lat: elLat,
				lon: elLon,
			},
			distance: distance(lat, lon, elLat, elLon),
			operator: el.tags.operator,
			tags: [],
			osm: {
				id: el.id,
				type: el.type,
			}
		};

		if (el.tags.wheelchair === 'yes') amenity.tags.push(tr('tags.wheelchair_friendly'));
		else if (el.tags.wheelchair === 'no') amenity.tags.push(tr('tags.wheelchair_unfriendly'));

		switch (type) {
			case 'coffee':
				if (el.tags['vending'] === 'coffee') {
					amenity.tags.push("Automat");
				}
				break;
			case 'drinking_water':
				if (el.tags['drinking_water:legal'] === 'yes') {
					amenity.tags.push(tr('tags.explicitly_legal'));
				}
				if (el.tags.fountain === 'bottle_refill') {
					amenity.tags.push(tr('tags.bottle_refill'));
				}
				if (el.tags.bottle === 'yes') {
					amenity.tags.push(tr('tags.bottle'));
				}
				break;
			case 'toilet':
				if (el.tags.charge || el.tags.free) {
					amenity.tags.push(el.tags.charge || el.tags.free);
				}
				Object.entries(toilet_genders(el.tags))
					.filter(([_, val]) => !!val)
					.forEach(([key]) => amenity.tags.push(key));

				if (el.tags.changing_table === 'yes') {
					amenity.tags.push(tr('tags.changing_table'));
				}
				break;
			case 'pub':
				if ((el.tags.theme = 'irish')) {
					amenity.tags.push(tr('tags.irish_themed'));
				}
				break;
			case 'atm':
				amenity.operator = el.tags.brand || el.tags.operator || el.tags.name;
				amenity.tags.push(el.tags.amenity === 'atm' ? 'ATM' : 'Bank');
				if (el.tags.cash_in === 'yes') {
					amenity.tags.push(tr('tags.cash_in'));
				}
				if (amenity.operator?.match('Euronet')) {
					amenity.tags.push(tr('tags.expensive'));
				}
				break;
		}

		results.push(amenity);
	}

	results.sort((a, b) => a.distance - b.distance);

	return results;
}

export default async function load_where(location: Location, type: AmenityKey) {
	return load_where_internal(location, type).catch(err => {
		console.error(err);
		return Promise.reject(AppError.FailedToFetchAmenities);
	});
}

function toilet_genders(tags: any) {
	const unisex = tags.unisex ? tags.unisex === 'yes' : null;
	const segregated = tags.gender_segregated === 'yes';
	let both = segregated && unisex;
	return {
		male: both || (tags.male ? tags.male === 'yes' : null),
		female: both || (tags.female ? tags.female === 'yes' : null),
		unisex: !segregated && unisex,
	};
}

function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
	lat1 *= Math.PI / 180;
	lon1 *= Math.PI / 180;
	lat2 *= Math.PI / 180;
	lon2 *= Math.PI / 180;

	const sLat = Math.sin((lat2 - lat1) / 2);
	const sLon = Math.sin((lon2 - lon1) / 2);

	const radius = 6371000;

	const a = sLat * sLat + Math.cos(lat1) * Math.cos(lat2) * sLon * sLon;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return radius * c;
}

function charge(tags: any) {
	if (tags.fee === 'no') return 'free';
	const charge = tags.charge;
	if (!charge) {
		if (tags.fee === 'yes') return 'not free';
		return null;
	}
	const [value, currency] = charge.split(' ');
	return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(value);
}
