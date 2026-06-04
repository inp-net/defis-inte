<script lang="ts">

    import type { PageData } from '../$types';
    import type { GroupChallenge } from '$lib/types/types.d';
    import { Flex, Stack, Frame, Button } from 'azucar-ui';
    import Filters from '$lib/components/Filters.svelte';
    import ChallengesToAccept from '$lib/components/ChallengesToAccept.svelte';

    let { data }: { data: PageData } = $props();
    let groupChallenge : GroupChallenge[] = $derived(data.posts.challenges);

    // Extrait les nom des groupes clubs qui peuvent être filtrés.
    let filterNames = $derived(groupChallenge.map(challenge => challenge.name));

    // Filtres actifs sur défis.
    let activeIndexes = $state<number[]>([]);

    // Sous liste de groupes filtrés.
    let activeChallenges = $derived(
        activeIndexes.length === 0 
            ? groupChallenge
            : groupChallenge.filter((_, index) => activeIndexes.includes(index))
    );

    
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack>
        <h1>Défis proposés</h1>
    </Stack>
    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Filters
            filters={filterNames} 
            bind:activeIndexes={activeIndexes}
        />
        <Flex gap="md" direction="column" style="max-width: 100%; width: 100%;">
            {#each activeChallenges as group}
                <ChallengesToAccept
                    groupName={group.name}
                    groupURL={group.groupURL}
                    validChallenges={group.challenges.filter(a => a.defiAccepte === true)}
                    pendingChallenges={group.challenges.filter(a => a.defiAccepte === false)}
                />
            {/each}
        </Flex>
    </Stack>
</Flex>
