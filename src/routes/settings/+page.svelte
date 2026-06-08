<script lang="ts">

    import { Flex, Stack, Frame } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';

</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline"> 
        <BackButton />
        <h2>Paramètres</h2>
        <p>Paramètres de l'application</p>
    </Stack>
</Flex>

<style>
</style>
