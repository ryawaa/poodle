<script lang="ts">
	import { writable } from 'svelte/store';
	import MaterialSymbolsArrowDropDownRounded from '~icons/material-symbols/arrow-drop-down-rounded';
	import MaterialSymbolsArrowDropUpRounded from '~icons/material-symbols/arrow-drop-up-rounded';
	import { appSettings } from '../../settings/settings'; // Import your settings data

	// Store to manage dropdown state for each category
	let categoryDropdowns = appSettings.categories.map(() => writable(true));

	const generateId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

	// Toggle dropdown state for a specific category
	function toggleDropdown(index: number) {
		categoryDropdowns[index].update((open) => !open);
	}
</script>

<div class="text-white h-full flex flex-col gap-1 min-w-max ">
	<ul class="text-xs ml-2 mr-8">
		{#each appSettings.categories as category, index}
			<li class="my-2">
				<!-- </li>Subscribe to the dropdown state for the current category -->
				{#await categoryDropdowns[index] then $open}
					<button
						class="text-xs font-bold flex flex-row items-center uppercase"
						on:click={() => toggleDropdown(index)}
					>
						{#if $open}
							<MaterialSymbolsArrowDropUpRounded class="text-xs" />
						{:else}
							<MaterialSymbolsArrowDropDownRounded class="text-xs" />
						{/if}
						{category.name}
					</button>

					<!-- Section list that shows/hides based on isOpen state -->
					{#if $open}
						<ul class="ml-4">
							{#each category.sections as section}
								<li class="cursor-pointer p-1">
									<a
										href={`#${generateId(category.name)}-sub-${generateId(section.name)}`}
										class="text-white hover:underline"
									>
										- {section.name}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				{/await}
			</li>
		{/each}
	</ul>
</div>
