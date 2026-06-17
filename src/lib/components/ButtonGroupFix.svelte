<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
        gap?: "xs" | "sm" | "md";
    };

    let { children, gap = "xs" }: Props = $props();
</script>

<div class="button-group {gap}">
    {@render children?.()}
</div>

<style>
    .button-group {
        display: flex;
    }

    /* gap variants */
    .xs {
        gap: 4px;
    }

    /* first (= */
    .button-group > :global(*:first-of-type) {
        border-top-left-radius: var(--corner-radius);
        border-bottom-left-radius: var(--corner-radius);
        border-top-right-radius: var(--corner-radius-sm);
        border-bottom-right-radius: var(--corner-radius-sm);
    }

    /* middle == */
    .button-group > :global(*:not(:first-of-type):not(:last-of-type)) {
        border-radius: var(--corner-radius-sm);
    }

    /* last =) */
    .button-group > :global(*:last-of-type) {
        border-top-left-radius: var(--corner-radius-sm);
        border-bottom-left-radius: var(--corner-radius-sm);
        border-top-right-radius: var(--corner-radius);
        border-bottom-right-radius: var(--corner-radius);
    }
</style>
