<!---------HEU C'EST VRAIMENT UTILE CE TRUC ?-->

<script lang="ts">

    import type { ChallengeRead } from '$lib/types/types.d';
    import { Avatar, Flex, Frame} from 'azucar-ui'
    import FrameChallenge from './FrameChallenge.svelte';

    type Prop = {
        groupName: string,
        groupURL: string,
        challenges: ChallengeRead[]
    };

    const {
        groupName = "",
        groupURL = "",
        challenges = []
    }: Prop = $props();

</script>

<Flex gap="xs" direction="column">
    <Frame shadow={true} transparent={true} border={true}>
        <Flex align="center">
            <Avatar src={groupURL} alt={groupName} />
            <p>{groupName}</p>
        </Flex>
    </Frame>
    <Flex gap="xs" direction="column">
        {#each challenges as challenge}
            <FrameChallenge name={challenge.name} nbPoints={challenge.nbPoints} isText={challenge.type === "text"} desc={challenge.description} ></FrameChallenge>
        {/each}
    </Flex>
</Flex>

<style>
</style>
