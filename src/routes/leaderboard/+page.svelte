<script lang="ts">

    import type { Leaderboard } from '$lib/types/types.d.ts';
    import type { PageData } from './$types';
    import { Flex, Stack, ButtonGroup, Button } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';
    import Rank from '$lib/components/Rank.svelte'

    let { data }: { data: PageData } = $props();

    let groups : Leaderboard[] = $derived(data.posts.groups);
    let usersDB = $derived(data.posts.users);
    let users : Leaderboard[] = usersDB.map(user => ({ ...usersDB, name: `${user.firstName} ${user.lastName}` }));

    let isGroupSelected : boolean = $state(true);
    let leaderboard : Leaderboard[] = $derived(isGroupSelected ? groups : users);

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
                    variant={isGroupSelected ? 'default' : 'outline'}
                    onclick={() => isGroupSelected = true}
                >Groupe</Button>
                <Button 
                    variant={!isGroupSelected ? 'default' : 'outline'}
                    onclick={() => isGroupSelected = false}
                >Individuel</Button>
            </ButtonGroup>
        </Flex>

        <!-- max-width permet d'avoir le scroll horizontal sur les titres groupes -->
        <Flex gap="sm" justify="space-between" direction="column" style="max-width: 100%;">
            {#each leaderboard as group, i}
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
