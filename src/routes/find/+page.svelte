<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { amenities as amenity_types, type AmenityKey } from '$lib';
	import { error } from '@sveltejs/kit';
	import load_where, { type Amenity } from '$lib/load';

	const amenity = $page.url.searchParams.get('amenity');

	enum State {
		FETCHING = 2,
		LOCATION_UNKNOWN = 1,
		DONE = 0,
		LOCATION_ERROR = -1,
		BAD_REQUEST = -2,
		FAILED_TO_FETCH = -3
	}

	let state = State.FAILED_TO_FETCH;

	let amenities: Amenity[] = [];

	// @ts-ignore
	if (!amenity || amenity_types.indexOf(amenity) == -1) {
		state = State.BAD_REQUEST;
	}

	function fetch() {
		state = State.LOCATION_UNKNOWN;
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				state = State.FETCHING;
				load_where(pos.coords.latitude, pos.coords.longitude, amenity as AmenityKey)
					.then((a) => {
						amenities = a;
						console.log(amenities);
						state = State.DONE;
					})
					.catch((err) => {
						console.error(err);
						state = State.FAILED_TO_FETCH;
					});
			},
			(err) => {
				console.error(err);
				state = State.LOCATION_ERROR;
			},
			{ enableHighAccuracy: true }
		);
	}

	if (browser && state == State.LOCATION_UNKNOWN) {
		fetch();
	}
</script>

<main class="max-w-7xl flex flex-col gap-4">
	{#if state == State.LOCATION_UNKNOWN}
		<h1>Wo bist <span class="text-green-500">du</span>?</h1>
		<p>Gib mal Standort ;)</p>
	{:else if state == State.FETCHING}
		<h1>Einen Moment ...</h1>
		<div class="mx-auto w-12 h-12 rounded-full border-8 border-slate-300 dark:border-slate-800 border-t-green-600 dark:border-t-green-500 animate-spin"></div>
	{:else if state == State.FAILED_TO_FETCH}
		<h1>Die Daten konnten nicht heruntergeladen werden :/</h1>
		<p>Nochmal probieren?</p>
		<button on:click={fetch} class="mx-auto rounded px-6 py-3 bg-green-500 text-white">Vielleicht gehts jetzt</button>
	{:else if state == State.DONE}
		<h1>Sodala :)</h1>
	{:else if state == State.BAD_REQUEST}
		<h1>Irgendwas ist schiefgelaufen :(</h1>
		<p>Das sollte eigentlich nicht passieren.</p>
	{/if}
</main>

<style lang="postcss">
	h1 {
		@apply text-4xl font-bold text-center;
	}
	p {
		@apply text-center text-slate-600 dark:text-slate-400;
	}
</style>
