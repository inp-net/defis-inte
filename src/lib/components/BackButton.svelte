<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "azucar-ui";
    import { ArrowLeft } from "@lucide/svelte";

    let {
        backCount = 1,
        specialBack = "",
    }: { backCount?: number; specialBack?: string } = $props();

    function navigateBack() {
        const steps = backCount ?? 1;

        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);
        if (specialBack) {
            goto(specialBack);
        } else if (segments.length > steps) {
            const targetSegments = segments.slice(0, segments.length - steps);
            goto("/" + targetSegments.join("/"));
        } else {
            goto("/");
        }
    }
</script>

<!--
    @component
    Composant overengineered pour faire un retour de n pages.
    Il n'utilise pas le retour de l'historique mais supprime les / du site.
-->

<Button icon={ArrowLeft} onclick={navigateBack}>Retour</Button>
