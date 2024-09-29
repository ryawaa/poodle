<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
    import MaterialSymbolsArrowDropDownRounded from '~icons/material-symbols/arrow-drop-down-rounded'
    import MaterialSymbolsArrowDropUpRounded from '~icons/material-symbols/arrow-drop-up-rounded'

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
</script>

<div class="text-white h-full flex flex-col gap-1 w-[20%]">
	<!-- Status Dropdown -->
	<div>
		<button class="text-xs font-bold flex flex-row" on:click={() => showStatusDropdown.update((n) => !n)}>
			{#if $showStatusDropdown}
                <MaterialSymbolsArrowDropUpRounded class="text-xs" />
            {:else}
                <MaterialSymbolsArrowDropDownRounded class="text-xs" />
            {/if}
            STATUS
		</button>
		{#if $showStatusDropdown}
			<ul class="text-xs ml-3" on:click={clearSelectedDownloads}>
				<li
					class="cursor-pointer p-1"
					class:text-blue-200={$currentStatusFilter === null}
					on:click={() => currentStatusFilter.set(null)}
				>
					all ({totalDownloads})
				</li>
				{#each statuses as status}
					<li
						class="cursor-pointer p-1"
						class:text-blue-200={$currentStatusFilter === status}
						on:click={() => currentStatusFilter.set(status)}
					>
						{status.toLowerCase()} ({$filteredStatusLengths.find(s => s.status === status)?.length || 0})
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Category Dropdown -->
	<div>
		<button class="text-xs font-bold flex flex-row" on:click={() => showCategoryDropdown.update((n) => !n)}>
			{#if $showStatusDropdown}
                <MaterialSymbolsArrowDropUpRounded class="text-xs" />
            {:else}
                <MaterialSymbolsArrowDropDownRounded class="text-xs" />
            {/if}
            CATEGORIES
		</button>
		{#if $showCategoryDropdown}
			<ul class="text-xs ml-3" on:click={clearSelectedDownloads}>
				<li
					class="cursor-pointer p-1"
					class:text-blue-200={$currentCategoryFilter === null}
					on:click={() => currentCategoryFilter.set(null)}
				>
					all ({totalDownloads})
				</li>
				{#each $categories as category}
					<li
						class="cursor-pointer p-1"
						class:text-blue-200={$currentCategoryFilter === category}
						on:click={() => currentCategoryFilter.set(category)}
					>
						{category.name.toLowerCase()} ({$filteredCategoryLengths.find(c => c.category === category)?.length || 0})
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Tags Dropdown -->
	<div>
		<button class="text-xs font-bold flex flex-row" on:click={() => showTagDropdown.update((n) => !n)}>
			{#if $showStatusDropdown}
                <MaterialSymbolsArrowDropUpRounded class="text-xs" />
            {:else}
                <MaterialSymbolsArrowDropDownRounded class="text-xs" />
            {/if}
            TAGS
		</button>
		{#if $showTagDropdown}
			<ul class="text-xs ml-3" on:click={clearSelectedDownloads}>
				<li
					class="cursor-pointer p-1"
					class:text-blue-200={$currentTagFilter === null}
					on:click={() => currentTagFilter.set(null)}
				>
					all ({totalDownloads})
				</li>
				{#each $tags as tag}
					<li
						class="cursor-pointer p-1"
						class:text-blue-200={$currentTagFilter === tag}
						on:click={() => currentTagFilter.set(tag)}
					>
						{tag.toLowerCase()} ({$filteredTagLengths.find(t => t.tag === tag)?.length || 0})
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
