<script lang="ts">
    import type { Leaderboard, User } from "$lib/types/types.d";
    import type { PageData } from "./$types";
    import { Flex, Stack, ButtonGroup, Button } from "azucar-ui";
    import BackButton from "$lib/components/BackButton.svelte";
    import Rank from "$lib/components/Rank.svelte";

    let { data }: { data: PageData } = $props();

    let groups: Leaderboard[] = $derived(data.posts.groupLeaderboard);
    let usersDB: User[] = $derived(data.posts.users);
    let users: Leaderboard[] = usersDB.map((user) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
    }));
    let user = $derived(data.posts.user);

    let isGroupSelected: boolean = $state(true);
    let leaderboard: Leaderboard[] = $derived(isGroupSelected ? groups : users);

    function calculateRanks(data) {
        let currentRank = 1;
        
        return data.map((item, index, arr) => {
            if (index > 0 && item.points < arr[index - 1].points) {
            currentRank = index + 1;
            }
            
            return { ...item, rank: currentRank };
        });
    }

    let rankedLeaderboard = $derived(calculateRanks(leaderboard));


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
                <Button
                    variant={isGroupSelected ? "default" : "outline"}
                    onclick={() => (isGroupSelected = true)}>Groupe</Button
                >
                <Button
                    variant={!isGroupSelected ? "default" : "outline"}
                    onclick={() => (isGroupSelected = false)}>Individuel</Button
                >
            </ButtonGroup>
        </Flex>

        <!-- max-width permet d'avoir le scroll horizontal sur les titres groupes -->
        <Flex
            gap="sm"
            justify="space-between"
            direction="column"
            style="max-width: 100%;"
        >
            {#each rankedLeaderboard as group}
                <Rank
                    groupName={group.name}
                    groupUrl={isGroupSelected ? group.pictureURL : group.profilePictureURL}
                    points={group.points}
                    rank={group.rank.toString()}
                    highlight={user.groupInte?.name === group.name || `${user.firstName} ${user.lastName}` === group.name} // groupe et utilisateur
                />
            {/each}
        </Flex>
    </Stack>
</Flex>

<style>
</style>
