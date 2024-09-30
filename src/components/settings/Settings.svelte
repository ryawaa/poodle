<script lang="ts">
	import { appSettings } from '../../settings/settings';
	import {
		BooleanSetting,
		StringSetting,
		PathSetting,
		NumberSetting,
		ArraySetting,
		YTDLPSetting,
		YTDLPPathSetting,
		YTDLPMultiArgSetting
	} from '../../classes/settings.class';
	import RadixIconsReset from '~icons/radix-icons/reset';

	const generateId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

	function updateSetting(
		setting:
			| BooleanSetting
			| StringSetting
			| PathSetting
			| NumberSetting
			| ArraySetting
			| YTDLPSetting
			| YTDLPPathSetting
			| YTDLPMultiArgSetting,
		newValue: any
	) {
		if (setting instanceof BooleanSetting || setting instanceof YTDLPSetting) {
			setting.setValue(Boolean(newValue));
		} else if (
			setting instanceof StringSetting ||
			setting instanceof PathSetting ||
			setting instanceof YTDLPPathSetting
		) {
			setting.setValue(newValue as string);
		} else if (setting instanceof NumberSetting) {
			setting.setValue(Number(newValue));
		} else if (setting instanceof ArraySetting || setting instanceof YTDLPMultiArgSetting) {
			if (Array.isArray(newValue)) {
				setting.setValue(newValue);
			}
		}

		console.log(`Updated setting: ${setting.name} to ${setting.value}`);
	}
</script>

<div class="w-full min-h-screen">
	{#each appSettings.categories as category}
		<div id={generateId(category.name)} class="text-white mx-6 mb-8">
			<h2 class="text-sm uppercase font-semibold mb-1 text-[#4B5563]">{category.name}</h2>
			<hr class="border-[#4B5563] border-opacity-40" />
			{#each category.sections as section}
				<div class="" id={`${generateId(category.name)}-sub-${generateId(section.name)}`}>
					<h3 class="text-xs font-bold mb-1 uppercase text-white mt-4 bg-opacity-30">
						{section.name}
					</h3>
					<hr class="border-[#4B5563] border-opacity-40" />
					{#if section.description}
						<p class="text-white">{section.description}</p>
					{/if}
					<!-- Display settings within the section here -->
					<ul>
						{#each section.settings as setting}
							<li class="mb-4">
								<div class="flex flex-row align-middle items-center justify-between">
									<div class="mt-4">
										<strong class="block text-sm font-medium text-white">{setting.name}</strong>
										<span class="text-xs text-white/60">{setting.description}</span>
									</div>

									<!-- Handle various setting types (Boolean, String, etc.) including YTDLP -->
									<div class="flex flex-row items-center align-middle justify-end">
										<div class="ml-4">
											{#if setting instanceof BooleanSetting || setting instanceof YTDLPSetting}
												<input
													type="checkbox"
													class=" accent-[#BFDBFE] bg-transparent"
													checked={setting.value}
													on:change={(e) => updateSetting(setting, e.target.checked)}
												/>
											{:else if setting instanceof StringSetting || setting instanceof PathSetting || setting instanceof YTDLPPathSetting}
												<input
													type="text"
													class="border border-gray-300/30 rounded px-2 py-1 bg-transparent"
													value={setting.value}
													on:input={(e) => updateSetting(setting, e.target.value)}
												/>
											{:else if setting instanceof NumberSetting}
												<input
													type="number"
													class="border border-gray-300/30 rounded px-2 py-1 bg-transparent"
													value={setting.value}
													on:input={(e) => updateSetting(setting, +e.target.value)}
												/>
											{:else if setting instanceof ArraySetting || setting instanceof YTDLPMultiArgSetting}
												<div>
													<div class="flex space-x-2 bg-transparent">
														{#each setting.value as item}
															<span class="text-white">{item}</span>
														{/each}
													</div>
												</div>
											{/if}
										</div>
										{#if setting instanceof BooleanSetting || setting instanceof StringSetting || setting instanceof PathSetting || setting instanceof NumberSetting || setting instanceof ArraySetting || setting instanceof YTDLPSetting || setting instanceof YTDLPPathSetting || setting instanceof YTDLPMultiArgSetting}
											<button
												class="ml-4 px-3 py text-white transition disabled:text-gray-500"
												on:click={() => setting.reset()}
												disabled={setting.value === setting.default}
											>
												<RadixIconsReset class="h-4 w-4" />
											</button>
										{/if}
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/each}
</div>
