<script lang="ts">

    import type { ChallengeRead } from '$lib/types/types.d';
    import { Avatar, Flex, Frame, Button } from 'azucar-ui';
    import { ChevronUp, ChevronDown, MapPin, User } from '@lucide/svelte';
    import AcceptableCard from '$lib/components/AcceptableCard.svelte';

    type Prop = {
        groupName: string,
        groupURL: string,
        challenges: ChallengeRead[],
        hideDone: boolean,
        onChallengeApprouved : (id: number) => void
        onChallengeDeleted : (id: number) => void
    };

    let isHide : boolean = $state(false);

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

    const visibleChallenges = $derived(
        challenges.filter(challenge => {
            if (isHide) return false;

            const isApproved = challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId);
            const isDeleted = challenge.isDeleted || deletedChallengeIds.includes(challenge.challengeId);

            if (isDeleted) return false;
            if (hideDone && isApproved) return false;

            return true;
        }).sort((a, b) => Number(a.chellengeId) - Number(b.challengeId))
    );

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
    <Frame transparent={true} border={true}>
        <Flex align="center">
            <Avatar src={groupURL} alt={groupName} />
            <p>{groupName}</p>
            <Button 
                variant='outline'
                icon={isHide ? ChevronUp : ChevronDown}
                onclick={() => isHide = !isHide}
                style="margin-left: auto"
            />
        </Flex>
    </Frame>
    <Flex gap="xs" direction="column">
        <!-- ne pas afficher les Challenges dones si hideDone est true -->
        {#each visibleChallenges as challenge (challenge.challengeId)}
            <AcceptableCard
                id={challenge.challengeId}
                name={challenge.name}
                points={challenge.nbPoints}
                isModifiable={true}
                modifiableURL={"challenge/{challenge.challengeId}"}
                isApprouved={(challenge.defiAccepte || successChallengeIds.includes(challenge.challengeId)) && !challenge.isDeleted}
                isDisabled={challenge.isDeleted || deletedChallengeIds.includes(challenge.challengeId)}
                onAccepted={() => handleAccept(challenge.challengeId)}
                onDeleted={() => handleDelete(challenge.challengeId)}
            >
                <Flex direction="column" gap="xs">
                    <Flex wrap={false} gap="xs" align="center">
                        <MapPin size='15px'/> 
                        <p>{challenge.locationName}</p>
                    </Flex>
                    <Flex wrap={false} gap="xs" align="center">
                        <User size='15px'/> 
                        <p>{challenge.userName}</p>
                    </Flex>
                </Flex>
                <p><b>Desc: </b>{"\ " + challenge.description}</p>
            </AcceptableCard>
        {/each}
    </Flex>
</Flex>
