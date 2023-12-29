<script>
	import '../app.css';
	import { tr } from '$lib/translations';
</script>

<svelte:head>
	<title>{tr('app_name')}</title>
</svelte:head>

<div
	class="w-full min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white p-5 max-lg:pt-16 lg:grid place-items-center"
>
	<slot />
</div>
