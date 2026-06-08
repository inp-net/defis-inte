<script lang="ts">

    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { Flex, Stack } from 'azucar-ui';
    import type { ChallengeRead } from '$lib/types/types.d.ts';
    import Header from '$lib/components/Header.svelte';
    import FrameChallenge from '$lib/components/FrameChallenge.svelte';
    import AddChallenge from '$lib/components/AddChallenge.svelte';
    import Sort from '$lib/components/Sort.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';

    let { data }: { data: PageData } = $props();
    let challenges : ChallengeRead[] = $state(data.posts.challenges);

    const sortList : string[] = ["points", "clubs", "lieux", "date"];
    let sortBind : string = $state(sortList[0]);

    let sortChallenge = (option: string, desc: boolean) => {
        // Convertie le boolean 0 et 1 en -1 et 1
        let flip = 2 * Number(desc) - 1;
        console.log(option);
        switch(option) {
            case "points":
                challenges.sort((a, b) => flip * (Number(b.nbPoints) - Number(a.nbPoints)));
                break;
            case "clubs":
                challenges.sort((a, b) => flip * b.groupName.localeCompare(a.groupName))
                break;
            case "lieux":
                challenges.sort((a, b) => flip * b.locationName.localeCompare(a.locationName))
                break;
            case "date":
                challenges.sort((a, b) => flip * (b.challengeId - a.challengeId))
                break;
        };
    };

    onMount(() => {
        // trie les défis par points au lancement
        sortChallenge("points", true);
	});

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
        <Flex gap="xs" wrap={false} align="center">
            <SearchBar />
            <Sort bind={sortBind} options={sortList} onSorted={sortChallenge}/>
        </Flex>
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
