<script lang="ts">

    import type { PageData } from './$types';
    import type { GroupChallenge } from '$lib/types/types.d';
    import { Flex, Stack } from 'azucar-ui';
    import Header from '$lib/components/Header.svelte';
    import Challenges from '$lib/components/Challenges.svelte';

    let { data }: { data: PageData } = $props();
    let groupChallenge : GroupChallenge[] = $derived(data.posts.challenges);

</script>

<Header />
<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>
    
    <Stack>
        <section class="small-container">
            <Flex gap="md" direction="column">
                {#each groupChallenge as group}
                    <Challenges
                        groupName={group.name}
                        groupURL={group.groupURL}
                        challenges={group.challenges}
                    />
                {/each}
            </Flex>
        </section>
    </Stack>

</Flex>

<style>
    .small-container {
        max-width: min(100%, 500px);
    }
</style>
