<script lang="ts">
	import MaterialSymbolsDeleteRounded from '~icons/material-symbols/delete-rounded';
	import MaterialSymbolsAddCircle from '~icons/material-symbols/add-circle';
	import MdiPause from '~icons/mdi/pause';
	import MdiPlay from '~icons/mdi/play';
	import MdiStop from '~icons/mdi/stop';
	import MaterialSymbolsSettings from '~icons/material-symbols/settings';
	import RadixIconsDividerVertical from '~icons/radix-icons/divider-vertical';
	import MaterialSymbolsSearch from '~icons/material-symbols/search';
	import IcBaselineErrorOutline from '~icons/ic/baseline-error-outline';
	import MaterialSymbolsRestartAlt from '~icons/material-symbols/restart-alt';
	import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded';
	import MaterialSymbolsFolder from '~icons/material-symbols/folder';
	import MaterialSymbolsDownload from '~icons/material-symbols/download';
	import MdiDotsHorizontalCircleOutline from '~icons/mdi/dots-horizontal-circle-outline';
	import MaterialSymbolsArrowDropDown from '~icons/material-symbols/arrow-drop-down';
	
	let selectedQuality = 'low';
	let addToTop = false; 

	
	const qualities = [
		{ value: 'Video+Audio', label: 'Video+Audio' },
		{ value: 'Video Only', label: 'Video Only' },
		{ value: 'Audio Only', label: 'Audio Only' }
	];
</script>

<div class="w-full h-screen bg-[#1E1E2E] flex-col flex justify-between text-white">
	<div class="m-4">
		<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
			<MaterialSymbolsSearch class="text-xs" />
			<input class="bg-transparent text-xs" type="text" placeholder="link of url to download" />
		</div>
	</div>
	<div class="flex flex-row gap-4 my-2 mx-4 justify-between h-full">
		<div class="flex flex-col gap-2 w-[70%]">
			<span class="text-[10px] font-bold">DOWNLOAD LOCATION</span>
			<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
				<MaterialSymbolsFolder class="text-xs" />
				<input
					class="bg-transparent text-xs w-full"
					type="text"
					placeholder="/Users/ryanamay/Downloads"
				/>
			</div>
			<div class="flex-row flex items-center gap-2 mt-1">
				<!-- Checkbox input -->
				<input
					type="checkbox"
					bind:checked={addToTop}
					class="align-middle text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-0 focus:ring-offset-0 focus:ring-transparent cursor-pointer"
				/>
				<!-- Label for the checkbox -->
				<label class="text-xs align-middle text-gray-200 cursor-pointer" for="addToTop">
					Set as default for unspecified category?
				</label>
			</div>
			<span class="text-[10px] font-bold mt-2">TYPE OF DOWNLOAD</span>
			<div class=" rounded-md flex gap-4 items-center mb-2">
				{#each qualities as quality}
					<label class="flex items-center gap-1 text-xs">
						<input
							type="radio"
							bind:group={selectedQuality}
							value={quality.value}
							class="appearance-none bg-transparent text-xs border border-gray-300 rounded-full h-2 w-2 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						/>
						<span>{quality.label}</span>
					</label>
				{/each}
			</div>

			<div class="flex flex-row items-center justify-between gap-4">
				<span class="text-[10px] font-bold">VIDEO QUALITY</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex flex-grow gap-2 items-center">
					<input class="bg-transparent text-xs w-full" type="text" placeholder="Best" />
					<MaterialSymbolsArrowDropDown class="text-xs" />
				</div>
			</div>
			<div class="flex flex-row items-center justify-between gap-4">
				<span class="text-[10px] font-bold">AUDIO QUALITY</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex flex-grow gap-2 items-center">
					<input class="bg-transparent text-xs w-full" type="text" placeholder="Best" />
					<MaterialSymbolsArrowDropDown class="text-xs" />
				</div>
			</div>
			<div class="flex-row flex items-center gap-2 mt-1">
				<!-- Checkbox input -->
				<input
					type="checkbox"
					bind:checked={addToTop}
					class="align-middle text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-0 focus:ring-offset-0 focus:ring-transparent cursor-pointer"
				/>
				<!-- Label for the checkbox -->
				<label class="text-xs align-middle text-gray-200 cursor-pointer" for="addToTop">
					Add to top of queue?
				</label>
			</div>
			<div class="flex-row flex items-center gap-2 mt-1">
				<!-- Checkbox input -->
				<input
					type="checkbox"
					bind:checked={addToTop}
					class="align-middle text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-0 focus:ring-offset-0 focus:ring-transparent cursor-pointer"
				/>
				<!-- Label for the checkbox -->
				<label class="text-xs align-middle text-gray-200 cursor-pointer" for="addToTop">
					Start downloading immediately
				</label>
			</div>
			<div class="mt-4 flex-col flex gap-2">
				<span class="text-[10px] font-bold">POST-PROCESSING</span>
				<hr />
				<div class="flex flex-row items-center justify-between gap-4">
					<span class="text-[10px] font-bold">CONVERT OUTPUT TO</span>
					<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex flex-grow gap-2 items-center">
						<input class="bg-transparent text-xs w-full" type="text" placeholder="Disabled" />
						<MaterialSymbolsArrowDropDown class="text-xs" />
					</div>
				</div>
				<div class="flex flex-row items-center justify-between gap-4">
					<span class="text-[10px] font-bold">COMPRESSION TECHNIQUE</span>
					<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex flex-grow gap-2 items-center">
						<input class="bg-transparent text-xs w-full" type="text" placeholder="Disabled" />
						<MaterialSymbolsArrowDropDown class="text-xs" />
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-4 w-[30%] bg-black/30 rounded-lg p-4">
			<span class="text-[10px] font-bold">VIDEO DETAILS</span>
			<img class="rounded-lg" src="https://img.youtube.com/vi/MRtg6A1f2Ko/maxresdefault.jpg" />
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-bold">Title</span>
				<span class="text-xs">Title of the video</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-bold">Duration</span>
				<span class="text-xs">20:04</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-bold">Size</span>
				<span class="text-xs">100MiB</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-bold">Collection</span>
				<div class="p-1 px-2 bg-white/10 rounded-lg flex-row flex gap-2 items-center">
					<MaterialSymbolsSearch class="text-xs" />
					<input
						class="bg-transparent text-xs w-full"
						type="text"
						placeholder="Add to collection..."
					/>
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-bold">Tags</span>
				<div class="p-1 px-2 text-xs bg-white/10 rounded-lg w-min">+</div>
			</div>
		</div>
	</div>
	<div
		class="flex flex-row text-white text-xs p-2 bg-black/30 border-t-2 border-white/10 justify-between items-center px-4"
	>
		<span> Retrieving metadata... </span>
		<div class="flex gap-4">
			<!-- Cancel Button -->
			<button
				on:click={() => console.log('Cancel clicked')}
				class="px-4 py-1 text-xs text-gray-200 bg-red-500/20 rounded-md hover:bg-red-500/30 transition duration-150 ease-in-out"
			>
				Cancel
			</button>

			<!-- Import Button -->
			<button
				on:click={() => console.log('Import clicked')}
				class="px-4 py-1 text-xs text-gray-200 bg-blue-500/20 rounded-md hover:bg-blue-500/30 transition duration-150 ease-in-out"
			>
				Import
			</button>
		</div>
	</div>
</div>

