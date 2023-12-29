<script lang="ts">
	export let name = '';
	const stringToColour = (str: string) => {
		let hash = 0;
		str.split('').forEach((char) => {
			hash = char.charCodeAt(0) + ((hash << 5) - hash);
		});
		return `hsl(${(hash >> 8) & 0xff}, 60%, 40%)`;
	};
</script>

<div class="px-1 rounded" style="background-color: {stringToColour(name)}">
	{name}
</div>
