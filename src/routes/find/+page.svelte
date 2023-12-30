<script lang="ts">
	import { page } from '$app/stores';
	import { isAmenity } from '$lib/amenities';
	import { tr } from '$lib/translations/index';
	import load_where, { type Amenity } from '$lib/load';
	import Tag from './Tag.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import Loader from './Loader.svelte';
	import { getLocation } from '$lib/location';
	import { redirect } from '@sveltejs/kit';
	import { makeMapsURL, mapProvider, MapProviders } from '$lib/util';
	import AppError from '$lib/error';

	const type = $page.url.searchParams.get('amenity');

	enum State {
		LocationUnknown,
		Fetching,
		Done,
		Error,
	}
	let error: AppError | null = null;
	let state = State.LocationUnknown;

	let amenities: Amenity[] = [];

	if (!isAmenity(type)) {
		redirect(307, '/');
	}

	async function fetch() {
		try {
			state = State.LocationUnknown;
			const location = (await getLocation()).location;
			state = State.Fetching;
			//@ts-ignore
			amenities = await load_where(location, type);
			state = State.Done;
		} catch (err) {
			state = State.Error;
			console.error(err);
			// @ts-ignore
			error = err;
		}
	}

	if (state == State.LocationUnknown) {
		fetch();
	}
</script>

<header class="top-bar">
	<a
		href="/"
		class="text-slate-800 dark:text-slate-500 flex flex-row items-center justify-start gap-2"
	>
		<ArrowLeft className="stroke-slate-700 dark:stroke-slate-400"></ArrowLeft>
		{tr('findpage.go_back')}
	</a>

	<select bind:value={$mapProvider} class="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">
		{#each Object.entries(MapProviders) as [key, val]}
			<option value={key}>{val}</option>{/each}
	</select>
</header>
<main class="max-w-5xl mx-auto flex flex-col gap-4 w-full">
	{#if state == State.LocationUnknown}
		<h1>{tr('findpage.headings.fetching_location.title')}</h1>
		<p class="text-center mb-4">{tr('findpage.headings.fetching_location.subtitle')}</p>
		<Loader />
	{:else if state == State.Fetching}
		<h1>{tr('findpage.headings.fetching_amenities.title')}</h1>
		<p class="text-center mb-4">{tr('findpage.headings.fetching_amenities.subtitle')}</p>
		<Loader />
	{:else if state == State.Error}
		<h1>{tr(`error.${error}`)}</h1>
		<button on:click={() => window.location.reload()} class="button mx-auto"
			>{tr('findpage.maybe_now')}</button
		>
	{:else if state == State.Done && amenities.length > 0}
		<h1>{tr('findpage.headings.done.title')}</h1>
		<p class="text-center">{tr('findpage.headings.done.subtitle')}</p>
		<div
			class="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-600 w-full"
		>
			{#each amenities as a}
				<a
					class="px-5 py-4 flex flex-row items-center gap-4"
					target="_blank"
					href={makeMapsURL(a)}
				>
					<div>{Math.round(a.distance)}m</div>
					<div>
						<h2 class="text-xl">{tr(`amenities.${type}`)}</h2>
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
	{:else if state == State.Done && amenities.length == 0}
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
