<script lang="ts">

    import type { ChallengeRead } from '$lib/types/types.d';
    import { Avatar, Flex, Frame, Button } from 'azucar-ui'

    type Prop = {
        groupName: string,
        groupURL: string,
        challenges: ChallengeRead[],
        onChallengeApprouved : (id: number) => void
    };

    // Va stocker temporairement et localement les défis qui viennent d'être
    // accepté pour ne pas refaire une requête serveur.
    let successChallengeIds = $state<number[]>([]);

    const {
        groupName = "",
        groupURL = "",
        challenges = [],
        onChallengeApprouved
    }: Prop = $props();

    async function handleAccept(id : number) {
        await onChallengeApprouved(id);
        successChallengeIds.push(id);
    }

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
            <Frame>
                <Flex justify="space-between" align="center">
                    <Flex wrap={false} style="flex: 1 1 auto; min-width: 150px; white-space: normal; word-break: break-word;" gap="xs">
                        <p>{challenge.name}</p>
                        <p><b>{challenge.nbPoints} points</b></p>
                    </Flex>
                    <Flex style="flex-shrink: 0; margin-between: auto; margin-left: auto;">
                        <Button disabled={challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId)} onclick={() => handleAccept(challenge.challengeId)}> Accepter le défi </Button>
                        <Button href="/challenge/{challenge.challengeId}"> Modifier </Button>
                    </Flex>
                </Flex>
            </Frame>
        {/each}
    </Flex>
</Flex>

<style>
</style>
