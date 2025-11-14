<script lang="ts" context="module">
  export interface ReactWrapperProps {
    render: (props?: any) => void;
    destroy: () => void;
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let dynamicImportPromise: Promise<any>;

  let container: HTMLElement;
  let reactWrapper: ReactWrapperProps | null = null;

  onMount(async () => {
    try {
      console.log('[WrapperReactSvelte] waiting for dynamic import...');
      const mod = await dynamicImportPromise;
      console.log('[WrapperReactSvelte] import result:', mod);

      // support default export or direct function
      const reactWrapperFactory = mod && (mod.default || mod);
      if (typeof reactWrapperFactory !== 'function') {
        console.error('[WrapperReactSvelte] remote did not export a factory function', reactWrapperFactory);
        return;
      }

      reactWrapper = reactWrapperFactory()(container);
      if (!reactWrapper || typeof reactWrapper.render !== 'function') {
        console.error('[WrapperReactSvelte] factory did not return proper wrapper', reactWrapper);
        return;
      }

      reactWrapper.render?.({});
      console.log('[WrapperReactSvelte] rendered remote react component');
    } catch (e) {
      console.error('[WrapperReactSvelte] failed to load remote:', e);
    }
  });

  onDestroy(() => {
    try {
      reactWrapper?.destroy?.();
    } catch (e) {
      console.error('[WrapperReactSvelte] destroy error:', e);
    }
  });
</script>

<div bind:this={container} />