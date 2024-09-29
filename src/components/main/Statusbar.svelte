<script lang="ts">
    import { selectedDownloads, downloads } from '../../stores.ts';
    import { derived } from 'svelte/store';

    export let currentlyShown = 0;
  
    
    const displayInfo = derived(
      [selectedDownloads, downloads],
      ([$selectedDownloads, $downloads]) => {
        return {
          selected: $selectedDownloads.length,
          total: $downloads.length
        };
      }
    );
  </script>
  
  <div class="flex flex-row text-white text-xs p-2 bg-black/30 border-t-2 border-white/10">
    {#if $displayInfo.selected > 0}
      <div>Selected {$displayInfo.selected} of {$displayInfo.total} download{$displayInfo.total === 1 ? "" : "s"}.</div>
    {:else}
      <div>Showing {currentlyShown} of {$displayInfo.total} download{$displayInfo.total === 1 ? "" : "s"}.</div>
    {/if}
  </div>