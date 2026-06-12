<script lang="ts">

    import { Flex, Stack, Frame, Button } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';
    import { Power } from '@lucide/svelte'
    import { signOut } from '@auth/sveltekit/client';

</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline"> 
        <BackButton />
        <Button icon={Power} onclick={() => signOut()}></Button>
        <h2>Paramètres</h2>
        <p>Paramètres de l'application</p>
    </Stack>
</Flex>

<style>
</style>