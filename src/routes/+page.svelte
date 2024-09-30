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

	import { invoke } from '@tauri-apps/api';
	import type { Download } from '../stores.ts';
	import {
		Status,
		currentStatusFilter,
		currentTagFilter,
		currentCategoryFilter,
		currentSearchQuery,
		downloads
	} from '../stores';

	async function openWindow() {
		await invoke('open_new_window');
	}

	async function openAbout() {
		await invoke('open_about_window');
	}

	async function openConfig() {
		await invoke('open_config_window');
	}

	import { writable, derived } from 'svelte/store';
	import Toolbar from '../components/main/Toolbar.svelte';
	import Filter from '../components/main/Filter.svelte';
	import DownloadItem from '../components/main/DownloadItem.svelte';
	import Statusbar from '../components/main/Statusbar.svelte';

	// dummy data

	const filteredDownloads = derived(
		[currentStatusFilter, currentCategoryFilter, currentTagFilter, downloads, currentSearchQuery],
		([$currentStatusFilter, $currentCategoryFilter, $currentTagFilter, $downloads, $currentSearchQuery]) => {
			return $downloads.filter(
				(download) =>
					($currentStatusFilter === null || download.status === $currentStatusFilter) &&
					($currentCategoryFilter === null || download.category === $currentCategoryFilter) &&
					($currentTagFilter === null || download.tags.includes($currentTagFilter)) &&
					($currentSearchQuery === '' || download.name.toLowerCase().includes($currentSearchQuery.toLowerCase()))
			);
		}
	);

	let currentlyShown = 0;
	filteredDownloads.subscribe(($filteredDownloads) => {
		currentlyShown = $filteredDownloads.length;
	});
</script>

<div class="w-full h-screen max-h-screen bg-[#1E1E2E] flex-col flex justify-between">
	<Toolbar />
	<div class="flex flex-row p-4 h-full overflow-hidden">
		<Filter />
		<div
			class="w-full h-full max-h-screen text-white text-xs shadow-md rounded-lg gap-2 flex flex-col"
		>
			<div class="bg-black/20 flex flex-col h-full overflow-y-scroll p-2 gap-2 rounded-lg">
				{#each $filteredDownloads as download}
					<DownloadItem {download} />
				{/each}
			</div>
		</div>
	</div>
	<Statusbar {currentlyShown} />
</div>
