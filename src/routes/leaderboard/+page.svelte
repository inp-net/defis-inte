<script lang="ts">

    import { Flex, Stack, Frame } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';
    import Profile from '$lib/components/Profile.svelte';

    type Ligne = {
        key: String;
        valeurs: String[];
    }
    
    let categories : Ligne[];
    categories = [
        { key:"Statistiques personnel", valeurs: ["Points : 100", "Contribution : 20%", "Maximum défi par jours : 10"] },
        { key:"Statistiques groupe", valeurs: ["Points : 1000", "Tu es fort"] },
        { key:"Test", valeurs: ["Okay", "Tu es fort"] }
    ]

</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline"> 
        <BackButton />
        <h1>Classement</h1>
        <p>Classement des groupes.</p>
    </Stack>

    <section class="sticky">
        <Stack>
            <Frame transparent={true} border={true} shadow={true}>
                <Flex direction="column" gap="lg">
                    <Profile size='large' firstName="Bilèle" lastName="El Haddadi"/>
                    <Flex gap="xl" justify="space-between">
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
    </section>

    <h1>AAA</h1>
    <h1>AAA</h1>
    <h1>AAA</h1>
    <h1>AAA</h1>
    <h1>AAA</h1>
    <h1>AAA</h1>
</Flex>

<style>
    .sticky {
        position: sticky;
        top: 0;
        padding: 10px;
    }
</style>
