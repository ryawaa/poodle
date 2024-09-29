<script>
	let ffmpegPath = '';
	let ytdlpPath = '';
	let theme = 'Dark';
	let language = 'English';

	
	let categories = ['Movies', 'Music', 'Podcasts'];
	let tags = ['Favorite', 'To Watch', 'Downloaded'];
	let newCategory = '';
	let newTag = '';

	function downloadFFmpeg() {
		
		console.log('Downloading FFmpeg...');
	}

	function downloadYtdlp() {
		
		console.log('Downloading yt-dlp...');
	}

	function addCategory() {
		if (newCategory.trim()) {
			categories = [...categories, newCategory.trim()];
			newCategory = '';
		}
	}

	function addTag() {
		if (newTag.trim()) {
			tags = [...tags, newTag.trim()];
			newTag = '';
		}
	}
</script>

<div class="w-full h-screen bg-[#1E1E2E] flex-col flex justify-between text-white">
	<div class="m-4">
		<h1 class="text-xl font-bold mb-4">Settings</h1>
		<div class="flex flex-col gap-4">
			<!-- FFmpeg Location -->
			<div>
				<span class="text-[10px] font-bold">FFmpeg Location</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
					<input
						class="bg-transparent text-xs w-full"
						type="text"
						bind:value={ffmpegPath}
						placeholder="Path to FFmpeg..."
					/>
					<button
						class="text-xs px-2 py-1 bg-blue-500/20 rounded hover:bg-blue-500/30"
						on:click={downloadFFmpeg}
					>
						Download
					</button>
				</div>
			</div>

			<!-- yt-dlp Location -->
			<div>
				<span class="text-[10px] font-bold">yt-dlp Location</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
					<input
						class="bg-transparent text-xs w-full"
						type="text"
						bind:value={ytdlpPath}
						placeholder="Path to yt-dlp..."
					/>
					<button
						class="text-xs px-2 py-1 bg-blue-500/20 rounded hover:bg-blue-500/30"
						on:click={downloadYtdlp}
					>
						Download
					</button>
				</div>
			</div>

			<!-- Theme Selection -->
			<div>
				<span class="text-[10px] font-bold">Theme</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
					<select class="bg-transparent text-xs w-full">
						<option value="Dark">Dark</option>
						<!-- Future themes can be added here -->
					</select>
				</div>
			</div>

			<!-- Language Selection -->
			<div>
				<span class="text-[10px] font-bold">Language</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
					<select class="bg-transparent text-xs w-full">
						<option value="English">English</option>
						<!-- Future languages can be added here -->
					</select>
				</div>
			</div>

			<!-- Manage Categories -->
			<div>
				<span class="text-[10px] font-bold">Manage Categories</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex flex-col gap-2">
					<ul class="text-xs list-disc ml-4">
						{#each categories as category}
							<li>{category}</li>
						{/each}
					</ul>
					<div class="flex gap-2 mt-2">
						<input
							class="bg-transparent text-xs w-full p-1 px-2 border border-white/20 rounded-md"
							type="text"
							bind:value={newCategory}
							placeholder="New category..."
						/>
						<button
							class="text-xs px-2 py-1 bg-green-500/20 rounded hover:bg-green-500/30"
							on:click={addCategory}
						>
							Add
						</button>
					</div>
				</div>
			</div>

			<!-- Manage Tags -->
			<div>
				<span class="text-[10px] font-bold">Manage Tags</span>
				<div class="p-2 px-4 bg-white/10 rounded-md flex flex-col gap-2">
					<ul class="text-xs list-disc ml-4">
						{#each tags as tag}
							<li>{tag}</li>
						{/each}
					</ul>
					<div class="flex gap-2 mt-2">
						<input
							class="bg-transparent text-xs w-full p-1 px-2 border border-white/20 rounded-md"
							type="text"
							bind:value={newTag}
							placeholder="New tag..."
						/>
						<button
							class="text-xs px-2 py-1 bg-green-500/20 rounded hover:bg-green-500/30"
							on:click={addTag}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Bottom Buttons (Save and Cancel) -->
	<div
		class="flex flex-row text-white text-xs p-2 bg-black/30 border-t-2 border-white/10 justify-end items-center px-4 gap-4"
	>
		<!-- Save and Cancel Buttons -->
		<button
			on:click={() => console.log('Cancel clicked')}
			class="px-4 py-1 text-xs text-gray-200 bg-red-500/20 rounded-md hover:bg-red-500/30 transition duration-150 ease-in-out"
		>
			Cancel
		</button>
		<button
			on:click={() => console.log('Save clicked')}
			class="px-4 py-1 text-xs text-gray-200 bg-green-500/20 rounded-md hover:bg-green-500/30 transition duration-150 ease-in-out"
		>
			Save
		</button>
	</div>
</div>
