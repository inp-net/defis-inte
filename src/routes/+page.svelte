<script lang="ts">

    import type { PageData } from './$types';
    import { Flex, Stack } from 'azucar-ui';
    import type { ChallengeRead } from '$lib/types/types.d.ts';
    import Header from '$lib/components/Header.svelte';
    import FrameChallenge from '$lib/components/FrameChallenge.svelte';
    import AddChallenge from '$lib/components/AddChallenge.svelte';
    import Sort from '$lib/components/Sort.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';

    import { signIn, signOut } from "@auth/sveltekit/client";
    let { data }: { data: PageData } = $props();
    let challenges : ChallengeRead[] = $state(data.posts.challenges);

    // Recherche de défis

    let searchValue : string = $state("");
    let searchedItems = $derived(
        challenges.filter(
            (a) => {
                // On met tout en minuscule moins sensible
                const search = searchValue.toLowerCase();
                if (!search) return true;
                // True ou false si contient
                const containsName = a.name.toLowerCase().includes(search);
                const containsClub = a.groupName.toLowerCase().includes(search);
                return containsName || containsClub;
            }
        )
    );

    // Trier les défis

    const sortList : string[] = ["points", "clubs", "lieux", "date"];
    let sortBind : string = $state(sortList[0]);
    let isSortDesc = $state(true);
    let sortedSearchedChallenges = $derived.by(() => {
        const items = [...searchedItems]; 
        const flip = isSortDesc ? 1 : -1;
        switch(sortBind) {
            case "points":
                return items.sort((a, b) => flip * (Number(b.nbPoints) - Number(a.nbPoints)));
            case "clubs":
                return items.sort((a, b) => flip * b.groupName.localeCompare(a.groupName));
            case "lieux":
                return items.sort((a, b) => flip * (b.locationName || "").localeCompare(a.locationName || ""));
            case "date":
                return items.sort((a, b) => flip * (b.challengeId - a.challengeId));
            default:
                return items;
        }
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
            <SearchBar bind:value={searchValue} />
            <Sort bind:bind={sortBind} options={sortList} bind:isDesc={isSortDesc} />
        </Flex>
        <Flex gap="xs" direction="column" style="max-width: 100%; width: 100%;" wrap={false}>
            {#each sortedSearchedChallenges as challenge}
                <FrameChallenge
                    name={challenge.name}
                    nbPoints={challenge.nbPoints}
                    isText={challenge.type === "TEXT"}
                    location={challenge.locationName}
                    clubName={challenge.groupName}
                    desc={challenge.description}
                />
            {/each}
        </Flex>
    </Stack>

</Flex>

<style>
</style>
