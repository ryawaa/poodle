<script lang="ts">
	import { invoke } from '@tauri-apps/api';
	import MaterialSymbolsDeleteRounded from '~icons/material-symbols/delete-rounded';
	import MaterialSymbolsAddCircle from '~icons/material-symbols/add-circle';
	import MdiPause from '~icons/mdi/pause';
	import MdiPlay from '~icons/mdi/play';
	import MdiStop from '~icons/mdi/stop';
	import MaterialSymbolsSettings from '~icons/material-symbols/settings';
	import RadixIconsDividerVertical from '~icons/radix-icons/divider-vertical';
	import MaterialSymbolsSearch from '~icons/material-symbols/search';
    import GgDebug from '~icons/gg/debug'

	import { Status, downloads, currentSearchQuery } from '../../stores';
	import type { Download } from '../../stores';

	async function openWindow() {
		await invoke('open_new_window');
	}

	async function openAbout() {
		await invoke('open_about_window');
	}

	async function openConfig() {
		await invoke('open_config_window');
	}

	function addDownloads() {
		const demo: Download[] = [
        {
            id: 1,
            name: 'I Tried Every Airbnb Category',
            url: 'https://www.youtube.com/watch?v=9ZXzsjeRtdk',
            duration: 715, 
            category: { name: 'Tech', savePath: '/downloads/tech' },
            tags: ['robotics', 'fun'],
            status: Status.FINISHED,
            progress: 100,
            quality: '1080p',
            savePath: '/downloads/tech/surgery-robot.mp4',
            size: 314572800 
        },
        {
            id: 2,
            name: 'Exotic Jokers are INSANE!!!',
            url: 'https://www.youtube.com/watch?v=UMh3a7N5Hd8',
            duration: 437, 
            category: { name: 'Comedy', savePath: '/downloads/comedy' },
            tags: ['humor', 'tech'],
            status: Status.DOWNLOADING,
            progress: 60,
            quality: '720p',
            savePath: '/downloads/comedy/trigger-me-elmo.mp4',
            size: 209715200 
        },
        {
            id: 3,
            name: 'Doctor Reacts to the Lunchly Controversy',
            url: 'https://www.youtube.com/watch?v=m9vRFoLbVDE',
            duration: 535, 
            category: { name: 'Tech Experiments', savePath: '/downloads/tech-experiments' },
            tags: ['camera', 'prank'],
            status: Status.PAUSED,
            progress: 30,
            quality: '1080p',
            savePath: '/downloads/tech-experiments/tazer-camera.mp4',
            size: 157286400 
        },
        {
            id: 4,
            name: 'The Downfall of Roblox Cheating',
            url: 'https://www.youtube.com/watch?v=Kx5WOYiQtPQ',
            duration: 290, 
            category: { name: 'Fun Experiments', savePath: '/downloads/experiments' },
            tags: ['experiment', 'electrocuting'],
            status: Status.QUEUED,
            progress: 0,
            quality: '1080p',
            savePath: '/downloads/experiments/force-dab.mp4',
            size: 104857600 
        },
        {
            id: 5,
            name: 'valorant moments that make you whiff',
            url: 'https://www.youtube.com/watch?v=p60wCCqslSI',
            duration: 642, 
            category: { name: 'Animals', savePath: '/downloads/animals' },
            tags: ['fish', 'driving'],
            status: Status.STOPPED,
            progress: 45,
            quality: '720p',
            savePath: '/downloads/animals/fish-driving.mp4',
            size: 209715200 
        },
        {
            id: 6,
            name: 'I Redesigned the ENTIRE Steam UI from Scratch',
			url: 'https://www.youtube.com/watch?v=cDY2p1CTkPo',
            duration: 838, 
            category: { name: 'Finance', savePath: '/downloads/finance' },
            tags: ['finance', 'goldfish'],
            status: Status.ERRORED,
            progress: 5,
            quality: '1080p',
            savePath: '/downloads/finance/goldfish-trading.mp4',
            size: 419430400 
        },
        {
            id: 7,
            name: 'KSI Just Destroyed His Reputation...',
            url: 'https://www.youtube.com/watch?v=BJPpfgtRu_Q',
            duration: 480, 
            category: { name: 'Robotics', savePath: '/downloads/robotics' },
            tags: ['roomba', 'robotics'],
            status: Status.DOWNLOADING,
            progress: 75,
            quality: '1080p',
            savePath: '/downloads/robotics/screaming-roomba.mp4',
            size: 262144000 
        }
    ];

		
		downloads.set(demo);
	}

	function removeDownloads() {
		downloads.set([]);
	}

	function handleSearch(event: Event) {
		const target = event.target as HTMLInputElement;
		currentSearchQuery.set(target.value);
	}
</script>

<div
	class="flex flex-row gap-2 p-2 px-4 text-white align-center items-center justify-between bg-black/20 border-b-2 border-white/10"
>
	<div class="flex flex-row gap-2 align-center items-center">
		<button on:click={openWindow}>
			<MaterialSymbolsAddCircle class="text-lg" />
		</button>
		<button on:click={openAbout}>
			<GgDebug />
		</button>
		<button on:click={addDownloads}>
			<GgDebug />
		</button>
		<button on:click={removeDownloads}>
			<GgDebug />
		</button>
		<div class="text-gray-700">
			<RadixIconsDividerVertical />
		</div>
		<MdiPlay class="text-lg" />
		<MdiPause class="text-xl" />
		<MdiStop class="text-xl" />
		<MaterialSymbolsDeleteRounded />
		<div class="text-gray-700">
			<RadixIconsDividerVertical />
		</div>
		<button on:click={openConfig}>
			<MaterialSymbolsSettings class="text-md" />
		</button>
		
	</div>
	<div>
		<div class="p-2 px-4 bg-white/10 rounded-md flex-row flex gap-2 items-center">
			<MaterialSymbolsSearch class="text-xs" />
			<input class="bg-transparent text-xs" type="text" placeholder="search downloads" on:change={handleSearch} />
		</div>
	</div>
</div>
