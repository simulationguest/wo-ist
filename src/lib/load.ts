import { type AmenityKey } from "$lib";

export interface Amenity {
	lat: number,
	lon: number,
	distance: number;
	wheelchair_friendy?: boolean,
	operator?: string,
	tags: DrinkingWater | Toilet | ATM | null,
}

interface DrinkingWater {
	type: "drinking_water",
	explicitly_legal?: boolean,
	bottle_refill?: boolean,
	bottle_friendly?: boolean
}

interface Toilet {
	type: "toilet",
	charge: string | null,
	genders: ReturnType<typeof toilet_genders>,
	change_table?: boolean,
}

interface ATM {
	type: "atm",
	category: "Bank" | "ATM",
	who?: string;
	cash_in?: boolean,
	expensive?: boolean,
}

export default async function load_where(lat: number, lon: number, type: AmenityKey) {
	const filter = `(around:1000,${lat},${lon})`;
	const filterAccess = `${filter}[access!=no][access!=private][access!=customers]`;

	let queryBody;
	switch (type) {
		case "drinking_water":
			queryBody = `nwr${filterAccess}[amenity="drinking_water"];`;
			break;
		case "toilet":
			queryBody = `nwr${filterAccess}[amenity=toilets];`
			break;
		case "atm":
			queryBody = `( nwr${filterAccess}[amenity=atm]; nwr${filterAccess}[amenity=bank]; );`;
			break;
	}

	queryBody = `[out:json];${queryBody}out center;`;

	const res = await fetch("https://overpass-api.de/api/interpreter", {
		method: "post",
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

		let wheelchair_friendy;
		if (el.tags.wheelchair === "yes") wheelchair_friendy = true;
		else if (el.tags.wheelchair === "no") wheelchair_friendy = false;

		let amenity: Amenity = {
			lat: elLat,
			lon: elLon,
			distance: distance(lat, lon, elLat, elLon),
			wheelchair_friendy,
			operator: el.tags.operator,
			tags: null
		}

		switch (type) {
			case "drinking_water":
				amenity.tags = {
					type,
					explicitly_legal: el.tags["drinking_water:legal"] === "yes",
					bottle_refill: el.tags.fountain === "bottle_refill",
					bottle_friendly: el.tags.bottle === "yes",
				}
				break;
			case "toilet":
				amenity.tags = {
					type,
					charge: charge(el.tags),
					genders: toilet_genders(el.tags),
					change_table: el.tags.changing_table === "yes",
				}
				break;
			case "atm":
				let who = el.tags.brand || el.tags.operator || el.tags.name;
				amenity.operator = undefined;
				amenity.tags = {
					type,
					category: el.tags.amenity === "atm" ? "ATM" : "Bank",
					who,
					cash_in: el.tags.cash_in === "yes",
					expensive: who.match("Euronet"),
				}
		}

		results.push(amenity);
	}

	results.sort((a, b) => a.distance - b.distance);

	return results;
}

function toilet_genders(tags: any) {
	const unisex = tags.unisex ? tags.unisex === "yes" : null;
	const segregated = tags.gender_segregated === "yes";
	let both = segregated && unisex;
	return {
		male: both || (tags.male ? tags.male === "yes" : null),
		female: both || (tags.female ? tags.female === "yes" : null),
		unisex: !segregated && unisex,
	}
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
	if (tags.fee === "no") return "free";
	const charge = tags.charge;
	if (!charge) {
		if (tags.fee === "yes") return "not free";
		return null;
	}
	const [value, currency] = charge.split(" ");
	return new Intl.NumberFormat([...navigator.languages], { style: "currency", currency }).format(value);
}