<script>
	import '../app.css';
	import { tr } from '$lib/translations';
</script>

<svelte:head>
	<title>{tr('app_name')}</title>
</svelte:head>

<div class="bg-slate-100 dark:bg-slate-900 dark:text-white min-h-screen">
	<div class="w-full min-h-x p-5 max-lg:pt-16 lg:grid place-items-center">
		<slot />
	</div>
	<footer class="text-center dark:text-slate-600">
		<a href="https://github.com/simulationguest/wo-ist">Source code</a>
	</footer>
</div>

<style>
	.min-h-x {
		min-height: calc(100vh - 40px);
	}
</style>
