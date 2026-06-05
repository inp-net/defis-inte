<script lang="ts">

    import type { ChallengeRead } from '$lib/types/types.d';
    import { Avatar, Flex, Frame, Button } from 'azucar-ui'
    import { Check, XIcon } from '@lucide/svelte'

    type Prop = {
        groupName: string,
        groupURL: string,
        challenges: ChallengeRead[],
        onChallengeApprouved : (id: number) => void
        onChallengeDeleted : (id: number) => void
    };

    // Va stocker temporairement et localement les défis qui viennent d'être
    // accepté pour ne pas refaire une requête serveur.
    let successChallengeIds = $state<number[]>([]);
    let deletedChallengeIds = $state<number[]>([]);

    const {
        groupName = "",
        groupURL = "",
        challenges = [],
        onChallengeApprouved,
        onChallengeDeleted
    }: Prop = $props();

    async function handleAccept(id : number) {
        await onChallengeApprouved(id);
        successChallengeIds.push(id);
    }

    async function handleDelete(id : number) {
        await onChallengeDeleted(id);
        deletedChallengeIds.push(id);
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
                <Flex justify="space-between" align="center" gap="md">
                    <Flex wrap={false} gap="xs">
                        {#if (challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId)) && !challenge.isDeleted}
                            <Check />
                        {:else if challenge.isDeleted || deletedChallengeIds.includes(challenge.challengeId)}
                            <XIcon />
                        {/if}
                        <p>{challenge.name}</p>
                        <p><b>{challenge.nbPoints} points</b></p>
                    </Flex>
                    <Flex style="flex-shrink: 0; margin-left: auto;" gap="xs">
                        <Button href="/challenge/{challenge.challengeId}" variant="outline"> Modifier </Button>
                        <Button
                            icon={XIcon}
                            class="danger"
                            name="Delete"
                            disabled={challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId) || challenge.isDeleted || deletedChallengeIds.includes(challenge.challengeId)} 
                            onclick={() => handleDelete(challenge.challengeId)}
                        />
                        <Button
                            icon={Check}
                            class="success"
                            name="Success"
                            disabled={challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId) || challenge.isDeleted || deletedChallengeIds.includes(challenge.challengeId)} 
                            onclick={() => handleAccept(challenge.challengeId)}
                        />
                    </Flex>
                </Flex>
            </Frame>
        {/each}
    </Flex>
</Flex>

<style>
</style>
