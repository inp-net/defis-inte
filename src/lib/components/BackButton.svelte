<script lang="ts">

    import { goto } from "$app/navigation";
    import { Button } from 'azucar-ui';
    import { ArrowLeft } from '@lucide/svelte';
    
    function navigateBack() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        if (segments.length > 1) {
            segments.pop(); 
            goto('/' + segments.join('/'));
        } else {
            goto('/');
        }
    }

</script>

<Button icon={ArrowLeft} onclick={navigateBack}>
Retour
</Button>
