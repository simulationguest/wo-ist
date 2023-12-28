<script>
import { page } from '$app/stores';
</script>

<main class="max-w-7xl text-center">
	<h1 class="text-4xl font-bold">Irgendwas ist schiefgelaufen :/</h1>
	<p>{$page.error?.message}</p>
</main>