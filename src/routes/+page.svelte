<script lang="ts">

    import type { PageData } from './$types';
    import type { GroupChallenge } from '$lib/types/types.d';
    import { Flex, Stack, Button } from 'azucar-ui';
    import Header from '$lib/components/Header.svelte';
    import Challenges from '$lib/components/Challenges.svelte';
    import Filters from '$lib/components/Filters.svelte';
    import { signIn, signOut } from "@auth/sveltekit/client";

    let { data }: { data: PageData } = $props();
    let groupChallenge : GroupChallenge[] = $derived(data.posts.challenges);

    // Extrait les nom des groupes clubs qui peuvent être filtrés.
    let filterNames = $derived(groupChallenge.map(challenge => challenge.name));

    // Filtres actifs sur défis.
    let activeIndexes = $state<number[]>([]);

    // Sous liste de groupes filtés.
    let activeChallenges = $derived(
        activeIndexes.length === 0 
            ? groupChallenge
            : groupChallenge.filter((_, index) => activeIndexes.includes(index))
    );

</script>

<Header notifications={data.posts.pendingChallengeCount} />
<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>

    <Stack>
        <Button href="/challenge/8">
        Page défis
        </Button>
    </Stack>
    
    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Filters
            filters={filterNames} 
            bind:activeIndexes={activeIndexes}
        />
        <Flex gap="md" direction="column" style="max-width: 100%; width: 100%;">
            {#each activeChallenges as group}
                <Challenges
                    groupName={group.name}
                    groupURL={group.groupURL}
                    challenges={group.challenges}
                />
            {/each}
        </Flex>
    </Stack>

</Flex>

    <button onclick={() => signIn("authentik", { callbackUrl: "/home"})}>
        Se connecter
    </button>

<style>
</style>
