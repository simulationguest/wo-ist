<script>
	import { amenities } from '$lib/amenities';
	import { getLocation } from '$lib/location';
	import { tr } from '$lib/translations/index';
	import { onMount } from 'svelte';

	onMount(getLocation);
</script>

<div class="w-full min-h-x p-5 max-lg:pt-16 grid place-items-center">
	<form class="max-w-7xl flex flex-col items-center gap-8" method="GET" action="/find">
		<h1 class="text-center text-4xl text-slate-400 dark:text-slate-500 font-bold">
			{tr('app_name')}
		</h1>
		<p class="text-3xl text-center leading-relaxed">
			{tr('homepage.where_is')}
			<select name="amenity" class="bg-slate-200 border border-slate-300 dark:bg-gray-700 px-1 py-0.5 rounded">
				{#each amenities as amenity}
					<option value={amenity}>{tr(`homepage.amenities.${amenity}`)}</option>
				{/each}
			</select>
			{tr('homepage.in_proximity')}
		</p>
		<button type="submit" class="button">
			{tr('homepage.lets_go')}
		</button>
	</form>
</div>
