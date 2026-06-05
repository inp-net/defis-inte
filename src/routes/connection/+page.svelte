<script lang="ts">

    import { Flex, Stack, Button } from 'azucar-ui';
    import Header from '$lib/components/Header.svelte'
    import type { PageData } from "./$types";
    import { signIn, signOut } from "@auth/sveltekit/client";

    let { data }: { data: PageData } = $props();

</script>



<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis d'inté</h1>
    </Stack>
    <!-- bouton pour se connecter avec authentik -->
    <Button onclick={() => signIn("authentik", { callbackUrl: "/"})}>
        Se connecter
    </Button>



</Flex>

