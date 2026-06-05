<script lang="ts">

    import type { PageData } from '../$types';
    import type { GroupChallenge } from '$lib/types/types.d';
    import { Flex, Stack } from 'azucar-ui';
    import Filters from '$lib/components/Filters.svelte';
    import ChallengesToAccept from '$lib/components/ChallengesToAccept.svelte';

    let { data }: { data: PageData } = $props();
    let groupChallenge : GroupChallenge[] = $state(data.posts.challenges);
<<<<<<< HEAD

    $effect(() => {
        groupChallenge = data.posts.challenges;
    })
=======

    $effect(() => {
        groupChallenge = data.posts.challenges;
    })

    // Extrait les nom des groupes clubs qui peuvent être filtrés.
    // let filterNames = $derived(groupChallenge.map(challenge => challenge.name));
    //
    //
    // // Sous liste de groupes filtrés.
    // let activeChallenges = $derived(
    //     activeIndexes.length === 0 
    //         ? groupChallenge
    //         : groupChallenge.filter((_, index) => activeIndexes.includes(index))
    // );
>>>>>>> 271b554 (feat(ui): accepter un défi et db mise à jour)

    // Filtres actifs sur défis.
    let activeIndexes = $state<number[]>([]);

    // Extrait les nom des groupes clubs qui peuvent être filtrés.
    let filterNames = $derived(groupChallenge.map(challenge => challenge.name));
    
    let sortedGroupsByChallenge : GroupChallenge[] = $derived(
        groupChallenge.map(group => ({
            ...group,
            challenges: [...group.challenges].sort((a, b) => Number(a.defiAccepte) - Number(b.defiAccepte))
        }))
    );

    let activeGroups = $derived(
        activeIndexes.length === 0
            ? sortedGroupsByChallenge
            : sortedGroupsByChallenge.filter((_, index) => activeIndexes.includes(index))
    );

    async function approuveChallenge(id: number): Promise<void> {
        try {
<<<<<<< HEAD
            const formData = new FormData();
            formData.append('challengeId', id.toString());

            const response = await fetch('?/accept', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true', },
                body: formData
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === 'failure') {
                    console.error("Erreur de validation :", result.data?.message);
                    return;
                }
                const challenge = groupChallenge.find(c => c.challengeId === id);
                if (challenge) {
                    challenge.defiAccepte = true
                }
            }
        } catch(err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function deleteChallenge(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('challengeId', id.toString());

            const response = await fetch('?/delete', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true', },
                body: formData
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === 'failure') {
                    console.error("Erreur de validation :", result.data?.message);
                    return;
                }
                const challenge = groupChallenge.find(c => c.challengeId === id);
=======

            const response = await fetch('/api/challenge/accept', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ challengeId: id })
            });
            
            if (response.ok) {
                const challenge = group.challenge.find(c => c.challengeId === id);
>>>>>>> 271b554 (feat(ui): accepter un défi et db mise à jour)
                if (challenge) {
                    challenge.defiAccepte = true
                }
            }
<<<<<<< HEAD
=======

>>>>>>> 271b554 (feat(ui): accepter un défi et db mise à jour)
        } catch(err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }
    
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack>
        <h2>Défis proposés</h2>
    </Stack>
    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Filters
            filters={filterNames} 
            bind:activeIndexes={activeIndexes}
        />
        <Flex gap="md" direction="column" style="max-width: 100%; width: 100%;">
            {#each activeGroups as group}
                <ChallengesToAccept
                    groupName={group.name}
                    groupURL={group.groupURL}
                    challenges={group.challenges}
                    onChallengeApprouved={approuveChallenge}
<<<<<<< HEAD
                    onChallengeDeleted={deleteChallenge}
=======
>>>>>>> 271b554 (feat(ui): accepter un défi et db mise à jour)
                />
            {/each}
        </Flex>
    </Stack>
</Flex>
