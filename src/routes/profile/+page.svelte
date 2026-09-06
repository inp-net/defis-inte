<script lang="ts">
    import type { PageData } from "./$types";
    import { Flex, Stack, Frame } from "azucar-ui";
    import { Clock, User, Loader } from "@lucide/svelte";
    import { type ProofRead } from "$lib/types/types.d";
    import { ProfileProofItem } from '$lib/types/models.d';
    import BackButton from "$lib/components/BackButton.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import RenderList from '$lib/components/RenderList.svelte';

    let { data }: { data: PageData } = $props();

    const proofs: ProofRead[] = $derived(
        (data.posts.userProofs ?? []).map((raw: any) => new ProfileProofItem(raw))
    );

    const proofSortOptions = [
        {
            label: "Date",
            comparator: (a: ProofRead, b: ProofRead) =>
                new Date(b.date).getTime() - new Date(a.date).getTime(),
            groupBy: () => "Toutes les preuves"
        },
        {
            label: "Nom",
            comparator: (a: ProofRead, b: ProofRead) =>
                (a.user.firstName ?? "").localeCompare(b.user.firstName ?? ""),
            groupBy: (p: ProofRead) => (p.user?.firstName + " " + p.user?.lastName),
            categoryUrl: (p: ProofRead) => p.user.profilePictureURL
        },
        {
            label: "Club",
            comparator: (a: ProofRead, b: ProofRead) =>
                (a.alt ?? "").localeCompare(b.alt ?? ""),
            groupBy: (p: ProofRead) => p.alt ?? "Inconnu",
            categoryUrl: (p: ProofRead) => p.challenge?.group?.pictureURL ?? ''
        }
    ];

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

    const metadata = (proof: ProofRead) => [
        { name: "Par", icon: User, values: [proof.user.firstName + " " + proof.user.lastName] },
        { name: "Date", icon: Clock, values: [formatDateTime(proof.date)] },
        { name: "Status", icon: Loader, values: [proof.status] },
    ];
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

        <RenderList
            items={proofs}
            {metadata}
            sortOptions={proofSortOptions}
            getSearchableText={(p) =>
                `${p.text} ${p.alt ?? ''} ${p.user.firstName} ${p.user.lastName} ${p.user.groupInte?.name ?? ''} ${p.challenge?.group?.name ?? ''}`
            }
        >
            {#snippet children(proof: ProofRead)}
                <Flex direction="column" gap="xs">
                    {#if proof.type !== "TEXT"}
                        {#each proof.content as proofContent, index}
                            <a href={proofContent}>Média preuve {index + 1}</a>
                        {/each}
                    {:else}
                        <p><b>Réponse :</b> {proof.content.join(', ')}</p>
                    {/if}
                </Flex>
                {#if proof.comment}
                    <p><b>Commentaire :</b> {proof.comment}</p>
                {/if}
            {/snippet}
        </RenderList>

    </Stack>
</Flex>
