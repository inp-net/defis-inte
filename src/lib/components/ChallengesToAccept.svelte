<script lang="ts">
    import type { ChallengeRead } from "$lib/types/types.d";
    import { Avatar, Flex, Frame, Button } from "azucar-ui";
    import { ChevronUp, ChevronDown, MapPin, User, XIcon, Check } from "@lucide/svelte";
    import AcceptableCard from "$lib/components/AcceptableCard.svelte";
    import ChallengeCard from "$lib/components/ChallengeCard.svelte";
    import { invalidateAll } from '$app/navigation';

    type Prop = {
        groupName: string;
        groupURL: string;
        challenges: ChallengeRead[];
        hideDone: boolean;
        onChallengeApprouved: (id: number) => void;
        onChallengeDeleted: (id: number) => void;
    };

    let isHide: boolean = $state(false);

    const {
        groupName = "",
        groupURL = "",
        challenges = [],
        hideDone = $bindable(),
        onChallengeApprouved,
        onChallengeDeleted,
    }: Prop = $props();

    const visibleChallenges = $derived(
        challenges
            .filter((challenge) => {
                if (!hideDone) return true;
                if (isHide) return false;

                const isApproved = challenge.defiAccepte;
                const isDeleted = challenge.isDeleted;

                if (isDeleted) return false;
                if (hideDone && isApproved) return false;

                return true;
            })
            .sort((a, b) => Number(a.chellengeId) - Number(b.challengeId)),
    );

    async function handleAccept(id: number) {
        await onChallengeApprouved(id);
        invalidateAll();
    }

    async function handleDelete(id: number) {
        await onChallengeDeleted(id);
        invalidateAll();
    }
</script>

<!--
    @component
    Composant qui liste tous les défis pouvant être acceptés. Les défis déjà
    accepté peuvent être masqué. Ce composant gère le masquage.
-->

<Flex gap="xs" direction="column">
    <Flex gap="xs" direction="column">
        <!-- ne pas afficher les Challenges dones si hideDone est true -->
        {#each visibleChallenges as challenge (challenge.challengeId)}
            {@const defiApprouved = challenge.defiAccepte}
            {@const defiDeleted = challenge.isDeleted}
            <!-- pour éviter de surcharger le serveur, les données sont sauvegardés en locals -->

            
            <ChallengeCard
                title={challenge.name}
                points={challenge.nbPoints}
                isUnfolded={true}
                badges={[
                    { name: "Lieu", icon: MapPin, values: [challenge.locationName]},
                    { name: "Créateur", icon: User, values: [challenge.userName]},
                ]}
            >
                {#snippet content()}
                    <p><b>Description: </b>{"\ " + challenge.description}</p>
                {/snippet}
                {#snippet actions()}
                    <Flex gap="xs" style="margin-left: auto; flex-shrink: 0;">
                        <Button
                            href={`challenge/${challenge.challengeId}`}
                            variant="outline"
                            disabled={defiDeleted}
                        >
                            Modifier
                        </Button>
                        <Button
                            icon={XIcon}
                            class="danger"
                            name="Delete"
                            disabled={defiDeleted}
                            onclick={() => handleDelete(challenge.challengeId)}
                        />
                        <Button
                            icon={Check}
                            class="success"
                            name="Success"
                            disabled={defiApprouved || defiDeleted}
                            onclick={() => handleAccept(challenge.challengeId)}
                        />
                    </Flex>
                {/snippet}
            </ChallengeCard>

            <!-- <AcceptableCard -->
            <!--     id={challenge.challengeId} -->
            <!--     name={challenge.name} -->
            <!--     points={challenge.nbPoints} -->
            <!--     isModifiable={!(defiDeleted)} -->
            <!--     isApprouved={(defiApprouved) && !defiDeleted} -->
            <!--     isDisabled={defiDeleted} -->
            <!--     modifiableURL={`challenge/${challenge.challengeId}`} -->
            <!--     onAccepted={() => handleAccept(challenge.challengeId)} -->
            <!--     onDeleted={() => handleDelete(challenge.challengeId)} -->
            <!-- > -->
            <!--     <Flex direction="column" gap="xs"> -->
            <!--         <Flex wrap={false} gap="xs" align="center"> -->
            <!--             <MapPin size="15px" /> -->
            <!--             <p>{challenge.locationName}</p> -->
            <!--         </Flex> -->
            <!--         <Flex wrap={false} gap="xs" align="center"> -->
            <!--             <User size="15px" /> -->
            <!--             <p>{challenge.userName}</p> -->
            <!--         </Flex> -->
            <!--     </Flex> -->
            <!--     <p><b>Desc: </b>{"\ " + challenge.description}</p> -->
            <!-- </AcceptableCard> -->
        {/each}
    </Flex>
</Flex>

<style>
    .no-style {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        width: 100%;
        min-width: 0;
        display: block;
    }
</style>
