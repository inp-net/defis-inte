<script lang="ts">

    import type { ChallengeRead } from '$lib/types/types.d';
    import { Avatar, Flex, Frame, Button } from 'azucar-ui';
    import EditableChallenge from '$lib/components/EditableChallenge.svelte';

    type Prop = {
        groupName: string,
        groupURL: string,
        challenges: ChallengeRead[],
        hideDone: boolean,
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
        hideDone = $bindable(),
        onChallengeApprouved,
        onChallengeDeleted
    }: Prop = $props();

    async function handleAccept(id : number) {
        await onChallengeApprouved(id);
        successChallengeIds = [...successChallengeIds, id];
    }

    async function handleDelete(id : number) {
        await onChallengeDeleted(id);
        deletedChallengeIds = [...deletedChallengeIds, id];
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
            <!-- ne pas afficher les Challenges dones si hideDone est true -->
            {#if !hideDone || (!challenge.defiAccepte && !successChallengeIds.includes(challenge.challengeId))}
                <EditableChallenge
                    challengeId={challenge.challengeId}
                    name={challenge.name}
                    points={challenge.nbPoints}
                    isApprouved={(challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId)) && !challenge.isDeleted}
                    isDisabled={challenge.isDeleted || deletedChallengeIds.includes(challenge.challengeId)}
                    onAccepted={() => handleAccept(challenge.challengeId)}
                    onDeleted={() => handleDelete(challenge.challengeId)}
                />
            {/if}
        {/each}
    </Flex>
</Flex>

<style>
</style>
