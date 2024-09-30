<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import MaterialSymbolsArrowDropDownRounded from '~icons/material-symbols/arrow-drop-down-rounded';
	import MaterialSymbolsArrowDropUpRounded from '~icons/material-symbols/arrow-drop-up-rounded';
	import SimpleIconsGithubsponsors from '~icons/simple-icons/githubsponsors';
	import {
		Status,
		downloads,
		tags,
		categories,
		selectedDownloads,
		currentCategoryFilter,
		currentStatusFilter,
		currentTagFilter,
		type Category,
		type Tag
	} from '../../stores';
	import Categories from '../../components/settings/Sidebar.svelte';
	import Settings from '../../components/settings/Settings.svelte';

	let statuses = Object.values(Status);

	let showStatusDropdown = writable(true);
	let showCategoryDropdown = writable(true);
	let showTagDropdown = writable(true);

	let totalDownloads = 0;
	downloads.subscribe((value) => {
		totalDownloads = value.length;
	});

	function createFilteredLengths<T>(store: Writable<T[]>, filterFn: (item: T) => any) {
		let filteredLengths = writable<any[]>([]);
		store.subscribe((items) => {
			filteredLengths.set(items.map(filterFn));
		});
		return filteredLengths;
	}

	const filteredStatusLengths = createFilteredLengths(downloads, (download: any) => ({
		status: download.status,
		length: $downloads.filter((d: any) => d.status === download.status).length
	}));

	const filteredCategoryLengths = createFilteredLengths(categories, (category: any) => ({
		category: category,
		length: $downloads.filter((d: any) => d.category === category).length
	}));

	const filteredTagLengths = createFilteredLengths(tags, (tag: any) => ({
		tag: tag,
		length: $downloads.filter((d: any) => d.tags.includes(tag)).length
	}));

	function clearSelectedDownloads() {
		selectedDownloads.set([]);
	}

	let ffmpegPath = '';
	let ytdlpPath = '';
	let theme = 'Dark';
	let language = 'English';

	let localCategories = ['Movies', 'Music', 'Podcasts'];
	let localTags = ['Favorite', 'To Watch', 'Downloaded'];
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
			localCategories = [...localCategories, newCategory.trim()];
			newCategory = '';
		}
	}

	function addTag() {
		if (newTag.trim()) {
			localTags = [...localTags, newTag.trim()];
			newTag = '';
		}
	}
</script>

<div class="w-full h-screen max-h-screen bg-[#1E1E2E] flex-col flex justify-between">
	<div
		class="flex flex-row gap-2 p-2 px-4 text-white align-center items-center justify-between bg-black/20 border-b-2 border-white/10"
	>
		<div class="flex flex-row gap-2 align-center items-center">Settings</div>
		<button on:click={null}>
			<SimpleIconsGithubsponsors />
		</button>
	</div>

	<div class="flex flex-row p-4 h-full overflow-hidden divide-x-2 divide-white/10">
		<div class="flex flex-col h-full min-w-max overflow-y-scroll">
			<Categories />
		</div>
		<div class="flex flex-col h-full overflow-y-scroll">
			<Settings />
		</div>
	</div>
	<div
		class="flex flex-row text-white text-xs p-2 bg-black/30 border-t-2 border-white/10 justify-between items-center px-4"
	>
		<span> Poodle pre-alpha (insert version number here) </span>
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
				Save
			</button>
		</div>
	</div>
</div>
