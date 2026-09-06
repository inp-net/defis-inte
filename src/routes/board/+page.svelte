<script lang="ts">
    import type { PageData } from "./$types";
    import { ChallengeItem } from '$lib/types/models.d';
    import type { ChallengeRead, MetadataCard } from "$lib/types/types.d";
    import { Flex, Stack, Frame, Switch, Button } from "azucar-ui";
    import { MapPin, User, XIcon, Check, Paperclip } from "@lucide/svelte";
    import { invalidateAll } from "$app/navigation";
    import BackButton from "$lib/components/BackButton.svelte";
    import RenderList from '$lib/components/RenderList.svelte';

    let { data }: { data: PageData } = $props();

    let allChallenges: ChallengeRead[] = $derived(
        data.posts.challenges.map((raw: any) => new ChallengeItem(raw))
    );

    let hideDone: boolean = $state(true);

    let visibleChallenges = $derived(
        allChallenges.filter((c) => !(hideDone && (c.defiAccepte || c.isDeleted)))
    );

    const challengeSortOptions = [
        {
            label: "Clubs",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                (b.groupName || "").localeCompare(a.groupName || "") ||
                (b.challengeId - a.challengeId),
            groupBy: (c: ChallengeRead) => c.groupName || "Autres",
            categoryUrl: (c: ChallengeRead) => c.groupUrl
        },
        {
            label: "Date",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                b.challengeId - a.challengeId,
            groupBy: () => "Tous les défis"
        },
        {
            label: "Points",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                b.nbPoints - a.nbPoints
        }
    ];

    async function approuveChallenge(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("challengeId", id.toString());

            const response = await fetch("?/accept", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === "failure") {
                    console.error("Erreur de validation :", result.data?.message);
                    return;
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
        invalidateAll();
    }

    async function deleteChallenge(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("challengeId", id.toString());

            const response = await fetch("?/delete", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === "failure") {
                    console.error("Erreur de suppression :", result.data?.message);
                    return;
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
        invalidateAll();
    }

    const metadata = (challenge: ChallengeRead): MetadataCard[] => [
        { name: "Lieu", icon: MapPin, values: [challenge.locationName] },
        { name: "Par", icon: User, values: [challenge.userName ?? "Inconnu"] },
        { name: "Type", icon: Paperclip, values: [challenge.type] },
    ];
</script>

<Flex direction="column" gap="xl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Board admin</h2>
        <p>Toutes les fonctionnalités admin.</p>
    </Stack>

    <Stack>
        <Frame border={true} style="width: 100%; max-width: 100%;">
            <Flex direction="column" style="width: 100%; max-width: 100%;">
                <Switch bind:checked={hideDone}>Masquer les défis validés</Switch>
            </Flex>
        </Frame>
    </Stack>

    <Stack>
        <RenderList
            items={visibleChallenges}
            {metadata}
            sortOptions={challengeSortOptions}
            getSearchableText={(c) => `${c.name} ${c.groupName} ${c.userName ?? ''} ${c.locationName ?? ''}`}
        >
            {#snippet actionsSnippet(challenge: ChallengeRead)}
                {@const defiApprouved = challenge.defiAccepte}
                {@const defiDeleted = challenge.isDeleted}

                <Flex gap="xs" style="margin-left: auto; flex-shrink: 0;">
                    <Button
                        variant="outline"
                        disabled={defiDeleted}
                        href={`challenge/${challenge.challengeId}`}
                    >
                        Modifier
                    </Button>
                    <Button
                        icon={XIcon}
                        class="danger"
                        name="Delete"
                        disabled={defiDeleted}
                        onclick={() => deleteChallenge(challenge.challengeId)}
                    />
                    <Button
                        icon={Check}
                        class="success"
                        name="Success"
                        disabled={defiApprouved || defiDeleted}
                        onclick={() => approuveChallenge(challenge.challengeId)}
                    />
                </Flex>
            {/snippet}
        </RenderList>
    </Stack>
</Flex>
