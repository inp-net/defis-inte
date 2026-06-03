<script lang="ts">

    import type { ChallengeRead } from '$lib/types/types.d';
    import { Avatar, Flex, Frame, Button } from 'azucar-ui'

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
            <Button href="/{challenge.challengeId}">
                <Flex justify="space-between" wrap={false} style="flex-shrink: 0;">
                    <p>{challenge.name}</p>
                    <p>{challenge.nbPoints}</p>
                </Flex>
            </Button>
        {/each}
    </Flex>
</Flex>
