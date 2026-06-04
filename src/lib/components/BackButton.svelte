<script lang="ts">

    import { goto } from "$app/navigation";
    import { Button } from 'azucar-ui';
    import { ArrowLeft } from '@lucide/svelte';

    let { backCount = 1 }: { backCount?: number } = $props();
    
    function navigateBack() {
        const steps = backCount ?? 1;

        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        
        if (segments.length > steps) {
            const targetSegments = segments.slice(0, segments.length - steps);
            goto('/' + targetSegments.join('/'));
        } else {
            goto('/');
        }
    }

</script>

<Button icon={ArrowLeft} onclick={navigateBack}>
Retour
</Button>
