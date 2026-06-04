<script lang="ts">

    import { Flex, Stack } from 'azucar-ui';
    import Header from '$lib/components/Header.svelte'
    import type { PageData } from "./$types";
    import { signIn, signOut } from "@auth/sveltekit/client";

    let { data }: { data: PageData } = $props();

</script>

<Header />
<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>
    
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>
    <h1>A</h1>

</Flex>

<!-- bouton pour se connecter avec authentik -->
    <button onclick={() => signIn("authentik", { callbackUrl: "/home"})}>
        Se connecter
    </button>