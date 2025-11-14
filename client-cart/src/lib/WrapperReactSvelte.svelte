<script lang="ts" context="module">
  export interface ReactWrapperProps {
    render: (props?: any) => void;
    destroy: () => void;
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let dynamicImportPromise: Promise<() => () => ReactWrapperProps>;

  let container: HTMLElement;
  let reactWrapper: ReactWrapperProps;

  onMount(async () => {
    const reactWrapperFn = (await dynamicImportPromise)['default'];
    reactWrapper = reactWrapperFn(container);
    reactWrapper.render();
  });

  onDestroy(() => {
    if (reactWrapper) {
      reactWrapper.destroy();
    }
  });
</script>

<div bind:this={container} />