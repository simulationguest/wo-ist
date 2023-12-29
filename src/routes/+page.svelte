<form class="max-w-7xl flex flex-col items-center gap-8" method="GET" action="/find">
	<h1 class="text-center text-4xl text-slate-400 dark:text-slate-500 font-bold">Wo ist?</h1>
	<p class="text-3xl text-center leading-relaxed">
		Wo ist denn <select name="amenity" class="dark:bg-gray-700 px-1 py-0.5 rounded">
			<option value="drinking_water"> Trinkwasser </option>
			<option value="toilet"> eine Toilette </option>
			<option value="atm"> ein Bankautomat </option>
			<option value="pub">ein Pub</option>
			<option value="pizza">Pizza</option>
			<option value="megges">McDonalds</option>
		</select>
		in der Nähe?
	</p>
	<button type="submit" class="bg-green-600 text-white rounded-xl px-7 py-3"> Auf gehts! </button>
</form>
