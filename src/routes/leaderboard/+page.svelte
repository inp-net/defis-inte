<script lang="ts">

    import type { GroupLeaderboard } from '$lib/types/types.d.ts';
    import type { PageData } from './$types';
    import { Flex, Stack, ButtonGroup, Button } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';
    import Rank from '$lib/components/Rank.svelte'

    let { data }: { data: PageData } = $props();

    // -- Statistique du profil

    // TODO faire ce calcul coté client sur +server.ts

    // Type catégorie, prend un titre de catégories et une liste de string
    // placés dans cette catégorie.
    type Categorie = {
        key: String;
        valeurs: String[];
    }
    
    // Variable catégorie calculé de la DB
    let categories : Categorie[];
    categories = [
        { key:"Statistiques personnel", valeurs: ["Points : 100", "Contribution : 20%", "Maximum défi par jours : 10"] },
        { key:"Statistiques groupe", valeurs: ["Points : 1000", "Tu es fort"] }
    ]

    // --

    let groups : GroupLeaderboard[] = $derived(data.posts.groups);
    let userGroup : GroupLeaderboard[] = $derived(data.posts.userGroup);

</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline"> 
        <BackButton />
        <h2>Classement</h2>
        <p>Classement des groupes.</p>
    </Stack>

    <Stack style="max-width: 100%;">
        <Flex align="center" justify="center">
            <ButtonGroup>
                <Button>Groupe</Button>
                <Button variant='outline'>Individuel</Button>
            </ButtonGroup>
        </Flex>

        <!-- max-width permet d'avoir le scroll horizontal sur les titres groupes -->
        <Flex gap="sm" justify="space-between" direction="column" style="max-width: 100%;">
            {#each groups as group, i}
                <Rank
                    groupName={group.name}
                    groupUrl={group.pictureURL}
                    points={group.points}
                    rank={(i+1).toString()}
                />
            {/each}
        </Flex>
    </Stack>
</Flex>

<style>
</style>
