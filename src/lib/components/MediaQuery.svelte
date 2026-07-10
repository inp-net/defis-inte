<script lang="ts">
    let { query, children } = $props();
    let matches = $state(false);

    $effect(() => {
        const mql = window.matchMedia(query);
        matches = mql.matches;
        const listener = (e) => {
            matches = e.matches;
        };
        mql.addEventListener("change", listener);
        return () => {
            mql.removeEventListener("change", listener);
        };
    });
</script>

{@render children?.(matches)}
