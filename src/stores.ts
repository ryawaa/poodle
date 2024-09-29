import { writable } from 'svelte/store';

export type Category = {
	name: string;
	savePath: string;
};

export type Tag = string;

export enum Status {
	DOWNLOADING = 'Downloading',
	FINISHED = 'Finished',
	PAUSED = 'Paused',
	STOPPED = 'Stopped',
	ERRORED = 'Errored',
	QUEUED = 'Queued',
}

export type Download = {
	id: number;
	name: string;
	url: string;
	duration: number;
	category: Category;
	tags: Tag[];
	status: Status;
	progress: number;
	quality: string;
	savePath: string;
	size: number;
};

export const downloads = writable<Download[]>([]);
export const categories = writable<Category[]>([{ name: 'Uncategorized', savePath: '' }]);
export const tags = writable<Tag[]>(['Untagged' as Tag]);

export const selectedDownloads = writable<Download[]>([]);

// current filters
export const currentSearchQuery = writable<string>('');
export const currentStatusFilter = writable<Status | null>(null);
export const currentCategoryFilter = writable<Category | null>(null);
export const currentTagFilter = writable<Tag | null>(null);
