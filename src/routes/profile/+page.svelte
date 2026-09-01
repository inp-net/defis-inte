<script lang="ts">
    import type { PageData } from "./$types";
    import { Flex, Stack, Frame } from "azucar-ui";
    import { Clock, UserRound, Route, User, Loader } from "@lucide/svelte";
    import { type ProofRead, Status } from "$lib/types/types.d";
    import BackButton from "$lib/components/BackButton.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import ChallengeCard from "$lib/components/ChallengeCard.svelte";

    let { data }: { data: PageData } = $props();

    let user = $derived(data.user);
    const groupName = $derived(data.posts.groupInteName);

    type Category = {
        key: string;
        valeurs: string[];
    }

    let categories : Category[] = [];

    let statsPersonnels : string[] = [
        "Vous avez " + user.points + " points.",
        "Vous avez réalisé " + (data.posts.proofCount || 0) + " défis.",
        "Vous avez validé " + (data.posts.proofDoneCount || 0) + " défis.",
    ];

    categories.push({ key: "Statistiques", valeurs: statsPersonnels });

    const proofsRaw : ProofRead[] = $derived(data.posts.userProofs);
    const proofs = $derived(proofsRaw
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );

    function formatDateTime(date: Date | string): string {
        const d = new Date(date);
        return d.toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    let emojiStatus = (status: Status | string): string => {
        if (status === "PENDING" || status === Status.PENDING) {
            return "⏳";
        } else if (status === "DENIED" || status === Status.DENIED) {
            return "❌";
        } else if (status === "VALID" || status === Status.VALID) {
            return "✅";
        } else {
            return "LEGENDAIRE";
        }
    }

</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Profil</h2>
        <p>Voir les informations du profil.</p>
    </Stack>

    <Stack>
        <Frame transparent={true} border={true} shadow={true}>
            <Flex direction="column" gap="lg">
                <Profile
                    size="xl"
                    firstName={user.firstName}
                    lastName={user.lastName}
                    src={user.profilePictureURL ?? ""}
                    groupName={groupName ?? "Sans groupe"}
                />
                <Flex gap="xl">
                    {#each categories as category}
                        <Flex direction="column" gap="md">
                            <h3>{category.key}</h3>
                            <Flex direction="column" gap="xs">
                                {#each category.valeurs as ligne}
                                    <p>{ligne}</p>
                                {/each}
                            </Flex>
                        </Flex>
                    {/each}
                </Flex>
            </Flex>
        </Frame>
    </Stack>

    <Stack>
        <h3>Preuves de votre groupe</h3>
        <Flex direction="column" gap="xs">
            {#each proofs as proof}
                <ChallengeCard
                    title={emojiStatus((proof.status as Status) ?? Status.PENDING) + " : " + (proof.challenge?.name ?? "Défi inconnu")}
                    points={proof.challenge?.nbPoints ?? 0}
                    badges={[
                        { name: "Par", icon: User, values: [proof.user.firstName + " " + proof.user.lastName] },
                        { name: "Date", icon: Clock, values: [formatDateTime(proof.date)] },
                        { name: "Status", icon: Loader, values: [proof.status] },
                    ]}
                >
                    {#snippet content()}
                        <Flex direction="column" gap="xs">
                            {#if proof.type !== "TEXT"}
                                {#each proof.content as proofContent, index}
                                    <!-- fait confiant au navigateur pour
                                         ouvrir les fichiers car le gérer sur
                                         le site est chiant -->
                                    <a href={proofContent}>Média preuve {index}</a>
                                {/each}
                            {:else}
                                <p><b>Réponse :</b> {proof.content}</p>
                            {/if}
                            {#if proof.comment}
                                <p><b>Commentaire :</b> {proof.comment}</p>
                            {/if}
                        </Flex>
                    {/snippet}
                </ChallengeCard>
            {/each}
            {#if proofs.length == 0}
                <p><i>(rien pour le moment)</i></p>
            {/if}
        </Flex>
    </Stack>
</Flex>
