<script lang="ts">

    import { Flex, Stack, Frame } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';
    import Profile from '$lib/components/Profile.svelte';
    import Rank from '$lib/components/Rank.svelte'

    // -- Statistique du profil

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

    // -- Classement groupe
    type Group = {
        groupName: string;
        groupUrl?: string;
        points: string;
    };

    let groups : Group[] = $state();

    groups = [
        { groupName: "Groupe 8", points: "1024" },
        { groupName: "Groupe 9", points: "224" },
        { groupName: "7Groupe", points: "24" },
        { groupName: "Un group qui possède un nom très long", points: "0" },
    ]

</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline"> 
        <BackButton />
        <h2>Classement</h2>
        <p>Classement des groupes.</p>
    </Stack>

    <Stack>
        <Frame transparent={true} border={true} shadow={true}>
            <Flex direction="column" gap="lg">
                <Profile size='large' firstName="Bilèle" lastName="El Haddadi" alt="Photo"/>
                <Flex gap="xl">
                    {#each categories as category}
                        <Flex direction="column" gap="md">
                            <h3>{category.key}</h3>
                            <Flex direction="column" gap="xs">
                                {#each category.valeurs as ligne}
                                    <p>{ligne}</p>
                                {/each}
                            </Flex>
                        </Flex>
                    {/each}
                </Flex>
            </Flex>
        </Frame>
    </Stack>

    <!-- max-width permet d'avoir le scroll horizontal sur les titres groupes -->
    <Flex gap="sm" justify="space-between" direction="column" style="max-width: 100%;">
        {#each groups as group, index}
            <Rank
                groupName={group.groupName}
                groupUrl={group.groupUrl}
                points={group.points}
                rank={index}
            />
        {/each}
    </Flex>
</Flex>

<style>
    .sticky {
        position: sticky;
        top: 0;
        padding: 10px;
    }
</style>
