<script lang="ts">
	import type { Download } from '../../stores.ts';
	import { Status, selectedDownloads } from '../../stores';

	
	import MaterialSymbolsDownload from '~icons/material-symbols/download';
	import MdiPause from '~icons/mdi/pause';
	import MdiStop from '~icons/mdi/stop';
	import MdiPlay from '~icons/mdi/play';
	import MdiDotsHorizontalCircleOutline from '~icons/mdi/dots-horizontal-circle-outline';
	import IcBaselineErrorOutline from '~icons/ic/baseline-error-outline';
	import MaterialSymbolsRestartAlt from '~icons/material-symbols/restart-alt';
	import MaterialSymbolsDeleteRounded from '~icons/material-symbols/delete-rounded';
	import MaterialSymbolsSettings from '~icons/material-symbols/settings';
	import MaterialSymbolsFolder from '~icons/material-symbols/folder';
	import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded';
	import RiCheckboxFill from '~icons/ri/checkbox-fill';
	import RiCheckboxIndeterminateFill from '~icons/ri/checkbox-indeterminate-fill';
	import RiCheckboxBlankLine from '~icons/ri/checkbox-blank-line';

	export let download: Download;

	let isHovered = false;
	let isExpanded = false;

	let downloadSpeed = 30000; 

	$: downloadedSize = (download.progress / 100) * download.size;
	$: remainingBytes = download.size - downloadedSize;
	$: timeRemainingSeconds = Math.round(remainingBytes / downloadSpeed);
	$: timeRemaining = formatTime(timeRemainingSeconds);

	function formatBytes(bytes: number): string {
		const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
		let i = 0;
		while (bytes >= 1024 && i < units.length - 1) {
			bytes /= 1024;
			i++;
		}
		return `${bytes.toFixed(1)} ${units[i]}`;
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}m ${secs}s`;
	}

	function getDownloadState(status: Status): string {
		switch (status) {
			case Status.DOWNLOADING:
				return `${download.status.toLowerCase()} - ${formatBytes(downloadedSize)}/${formatBytes(download.size)} - ${formatBytes(downloadSpeed)}/s - ${timeRemaining} remaining`;
			case Status.PAUSED:
			case Status.STOPPED:
			case Status.ERRORED:
			case Status.QUEUED:
				return `${download.status.toLowerCase()} - ${formatBytes(downloadedSize)}/${formatBytes(download.size)}`;
			case Status.FINISHED:
				return `${download.status.toLowerCase()} - ${download.savePath}`;
		}
	}

	function getYouTubeID(url: string): string {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : '';
	}

	function getProgressBarColor(status: Status): string {
		switch (status) {
			case Status.DOWNLOADING:
				return 'bg-green-500';
			case Status.PAUSED:
				return 'bg-gray-500';
			case Status.STOPPED:
				return 'bg-transparent';
			case Status.ERRORED:
				return 'bg-red-500';
			case Status.FINISHED:
				return 'bg-green-500';
			case Status.QUEUED:
				return 'bg-blue-500';
			default:
				return 'bg-gray-500';
		}
	}

    
    function selectedHandler() {
        selectedDownloads.update((downloads) => {
			if (downloads && downloads.includes(download)) {
                return downloads.filter((d) => d !== download);
            } else {
				return [...(downloads || []), download];
            }
        });
    }
</script>

<div class="flex-row flex w-full rounded-lg">
	
	<div
		class="w-full"
	>
		<div
			class="relative flex flex-row text-white text-xs p-2 border-white/10 w-full rounded-lg bg-cover bg-center"
			style="background-image: url('https://img.youtube.com/vi/{getYouTubeID(
				download.url
			)}/maxresdefault.jpg');"
		>
			<!-- Blurred and dimmed overlay -->
			<div class="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg"></div>

			<!-- Content over the dimmed & blurred background -->
			<div class="relative flex flex-row w-full gap-2">
                <button class="flex flex-row" on:click={selectedHandler}>
                    {#if $selectedDownloads.some(d => d.id === download.id)}
                        <RiCheckboxFill class="text-white" on:click={selectedHandler} />
                    {:else}
                        <RiCheckboxBlankLine class="text-white" on:click={selectedHandler} />
                    {/if}
                </button>
                <div class="flex flex-col w-full"
                on:mouseover={() => (isHovered = true)}
                on:mouseout={() => (isHovered = false)}
                on:click={() => (isExpanded = !isExpanded)}>
                    <div class="flex flex-row justify-between items-center">
                        <div class="flex flex-row items-center gap-1">
                            {#if download.status === Status.DOWNLOADING}
                                <MaterialSymbolsDownload class="text-sm" />
                            {:else if download.status === Status.PAUSED}
                                <MdiPause class="text-sm" />
                            {:else if download.status === Status.STOPPED}
                                <MdiStop class="text-sm" />
                            {:else if download.status === Status.ERRORED}
                                <IcBaselineErrorOutline class="text-sm text-red-200" />
                            {:else if download.status === Status.FINISHED}
                                <MaterialSymbolsCheckRounded class="text-sm" />
                            {:else if download.status === Status.QUEUED}
                                <MdiDotsHorizontalCircleOutline class="text-sm" />
                            {/if}
                            <span>
                                {#if isHovered && !isExpanded}
                                    {getDownloadState(download.status)}
                                {:else}
                                    {download.name}
                                {/if}
                            </span>
                        </div>
                        <div class="flex flex-row text-white/80 gap-2 items-center">
                            {#if download.status === Status.DOWNLOADING}
                                <MdiPause class="text-sm" />
                                <MdiStop class="text-sm" />
                            {:else if download.status === Status.PAUSED}
                                <MdiPlay class="text-sm" />
                                <MdiStop class="text-sm" />
                            {:else if download.status === Status.STOPPED}
                                <MdiPlay class="text-sm" />
                            {:else if download.status === Status.ERRORED}
                                <MaterialSymbolsRestartAlt class="text-sm" />
                            {:else if download.status === Status.FINISHED}
                                <MaterialSymbolsFolder class="text-sm" />
                            {:else if download.status === Status.QUEUED}
                                <MdiPause class="text-sm" />
                                <MdiStop class="text-sm" />
                            {/if}
                            <MaterialSymbolsDeleteRounded />
                            <MaterialSymbolsSettings class="text-xs" />
                        </div>
                    </div>
                    <!-- Conditionally display progress bar -->
                    {#if isExpanded}
                        <span class="text-[10px] text-white/80">{download.url} - {download.quality}</span>
                        <span class="mt-2 text-[10px] text-white/80">{getDownloadState(download.status)}</span>
                    {/if}
                    {#if (download.status !== Status.FINISHED && download.status !== Status.STOPPED) || isExpanded}
                        <div class="w-full bg-black/40 rounded-full h-1 overflow-hidden mt-1">
                            <!-- Progress bar -->
                            <div
                                class="{getProgressBarColor(download.status)} h-full rounded-full"
                                style="width: {download.progress}%;"
                            ></div>
                        </div>
                    {/if}
                </div>
            </div>
		</div>
	</div>
</div>
