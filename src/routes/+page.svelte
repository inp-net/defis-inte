<script lang="ts">

    import type { PageData } from './$types';
    import { Flex, Stack, Button } from 'azucar-ui';
    import Header from '$lib/components/Header.svelte';
    import FrameChallenge from '$lib/components/FrameChallenge.svelte';
    import AddChallenge from '$lib/components/AddChallenge.svelte';

    let { data }: { data: PageData } = $props();
    let challenges = $state(data.posts.challenges);

</script>

<Header notifications={data.posts.pendingChallengeCount} />
<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>

    <!-- A afficher que pour les membres 2A de groupes et plus -->
    <Stack>
        <AddChallenge />
    </Stack>

    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Flex gap="xs" direction="column" style="max-width: 100%; width: 100%;" wrap={false}>
            {#each challenges as challenge}
                <FrameChallenge
                    name={challenge.name}
                    nbPoints={challenge.nbPoints}
                    isText={challenge.type === "TEXT"}
                    desc={challenge.description}
                />
            {/each}
        </Flex>
    </Stack>

</Flex>

<style>
</style>
