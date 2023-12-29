<script lang="ts">
	import { page } from '$app/stores';
	import { amenities as amenity_types, type AmenityKey } from '$lib';
	import { tr } from '$lib/translations/index';
	import load_where, { type Amenity } from '$lib/load';
	import Tag from './Tag.svelte';
	import ArrowRight from './ArrowRight.svelte';
	import ArrowLeft from './ArrowLeft.svelte';
	import Loader from './Loader.svelte';
	import { getLocation } from '$lib/location';
	import { redirect } from '@sveltejs/kit';
	import { make_maps_url } from '$lib/util';

	const amenity_type = $page.url.searchParams.get('amenity');

	enum State {
		FETCHING = 2,
		LOCATION_UNKNOWN = 1,
		DONE = 0,
		ERROR = -1
	}
	let error = '';

	let state = State.LOCATION_UNKNOWN;

	let amenities: Amenity[] = [];

	// @ts-ignore
	if (!amenity_type || amenity_types.indexOf(amenity_type) == -1) {
		redirect(307, '/');
	}

	async function fetch() {
		state = State.LOCATION_UNKNOWN;
		const location = await getLocation();
		state = State.FETCHING;
		// TODO error handling
		//@ts-ignore
		amenities = await load_where(location, amenity_type);
		state = State.DONE;
	}

	if (state == State.LOCATION_UNKNOWN) {
		fetch();
	}
</script>

<main class="max-w-5xl flex flex-col gap-4 w-full">
	<a
		href="/"
		class="text-slate-800 dark:text-slate-500 flex flex-row items-center w-full justify-start gap-2 mb-4"
	>
		<ArrowLeft className="stroke-slate-700 dark:stroke-slate-400"></ArrowLeft>
		{tr("findpage.go_back")}
	</a>

	{#if state == State.LOCATION_UNKNOWN}
		<h1>{tr('findpage.headings.fetching_location.title')}</h1>
		<p class="text-center mb-4">{tr('findpage.headings.fetching_location.subtitle')}</p>
		<Loader />
	{:else if state == State.FETCHING}
		<h1>{tr('findpage.headings.fetching_amenities.title')}</h1>
		<p class="text-center mb-4">{tr('findpage.headings.fetching_amenities.subtitle')}</p>
		<Loader />
	{:else if state == State.ERROR}
		<h1>Die Daten konnten nicht heruntergeladen werden :/</h1>
		<button on:click={fetch} class="mx-auto rounded px-6 py-3 bg-green-500 text-white"
			>Vielleicht gehts jetzt</button
		>
	{:else if state == State.DONE && amenities.length > 0}
		<h1>{tr("findpage.headings.done.title")}</h1>
		<p class="text-center">{tr("findpage.headings.done.subtitle")}</p>
		<div
			class="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-600 w-full"
		>
			{#each amenities as a}
				<a
					class="px-5 py-4 flex flex-row items-center gap-4"
					target="_blank"
					href={make_maps_url(a.lat, a.lon)}
				>
					<div>{Math.round(a.distance)}m</div>
					<div>
						<h2 class="text-xl">{tr(`amenities.${amenity_type}`)}</h2>
						{#if a.operator}
							<p class="mb-1">{a.operator}</p>
						{/if}
						<div class="flex flex-row flex-wrap items-center gap-2">
							{#each a.tags as tag}
								<Tag name={tag}>{tag}</Tag>
							{/each}
						</div>
					</div>
					<div class="ml-auto self-start">
						<ArrowRight className="stroke-slate-800 dark:stroke-slate-500"></ArrowRight>
					</div>
				</a>
			{/each}
		</div>
	{:else if state == State.DONE && amenities.length == 0}
		<h1>{tr('findpage.headings.nothing_found.title')}</h1>
		<p class="text-center">{tr('findpage.headings.nothing_found.subtitle')}</p>
	{/if}
</main>

<style lang="postcss">
	h1 {
		@apply text-4xl font-bold text-center;
	}
	p {
		@apply text-slate-600 dark:text-slate-400;
	}
</style>
