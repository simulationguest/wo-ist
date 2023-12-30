<script>
	import '../app.css';
	import { tr } from '$lib/translations';
</script>

<svelte:head>
	<title>{tr('app_name')}</title>
</svelte:head>

<div class="bg-slate-100 dark:bg-slate-900 dark:text-white min-h-screen w-full">
	<slot />
</div>
<footer class="text-center dark:text-slate-600">
	<a href="https://github.com/simulationguest/wo-ist">Source code</a>
</footer>
