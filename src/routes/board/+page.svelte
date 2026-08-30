<script lang="ts">
    import type { PageData } from "../$types";
    import type { GroupChallenge } from "$lib/types/types.d";
    import { Flex, Stack, Frame, Switch, Button } from "azucar-ui";
    import { MapPin, User, XIcon, Check, Paperclip } from "@lucide/svelte";
    import { invalidateAll } from "$app/navigation";
    import Filters from "$lib/components/Filters.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import Category from "$lib/components/Category.svelte";
    import ChallengeCard from "$lib/components/ChallengeCard.svelte";

    let { data }: { data: PageData } = $props();
    let groupChallenge: GroupChallenge[] = $state(data.posts.challenges);

    $effect(() => {
        groupChallenge = data.posts.challenges;
    });

    // Filtres actifs sur défis.
    let activeIndexes = $state<number[]>([]);

    // Extrait les nom des groupes clubs qui peuvent être filtrés.
    let filterNames = $derived(
        groupChallenge.map((challenge) => challenge.name),
    );

    let sortedGroupsByChallenge: GroupChallenge[] = $derived(
        groupChallenge.map((group) => ({
            ...group,
            challenges: [...group.challenges].sort(
                (a, b) => Number(a.defiAccepte) - Number(b.defiAccepte),
            ),
        })),
    );

    let activeGroups = $derived(
        activeIndexes.length === 0
            ? sortedGroupsByChallenge
            : sortedGroupsByChallenge.filter((_, index) =>
                  activeIndexes.includes(index),
              ),
    );

    /** Masquer les défis déjà validés. */
    let hideDone: boolean = $state(true);

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
                    console.error(
                        "Erreur de validation :",
                        result.data?.message,
                    );
                    return;
                }
                const challenge = groupChallenge.find(
                    (c) => c.challengeId === id,
                );
                if (challenge) {
                    challenge.defiAccepte = true;
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
                    console.error(
                        "Erreur de validation :",
                        result.data?.message,
                    );
                    return;
                }
                const challenge = groupChallenge.find(
                    (c) => c.challengeId === id,
                );
                if (challenge) {
                    challenge.defiAccepte = true;
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
        invalidateAll();
    }

    /** Nom des clubs qui sont cachés dans la page. */
    let hiddenClubs: string[] = $state([]);
</script>

<!-- fonction qui affiche la liste de challenge pour le groupe -->
{#snippet showChallenges(group)}
    {#each group.challenges as challenge (challenge.challengeId)}
        {@const defiApprouved = challenge.defiAccepte}
        {@const defiDeleted = challenge.isDeleted}

        {#if !(hideDone && (defiDeleted || defiApprouved))}
            <ChallengeCard
                title={challenge.name}
                points={challenge.nbPoints}
                isUnfolded={false}
                badges={[
                    {
                        name: "Lieu",
                        icon: MapPin,
                        values: [challenge.locationName],
                    },
                    { name: "Par", icon: User, values: [challenge.userName] },
                    { name: "Type", icon: Paperclip, values: [challenge.type] },
                ]}
            >
                {#snippet content()}
                    <p><b>Description: </b>{"\ " + challenge.description}</p>
                {/snippet}
                {#snippet actions()}
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
                            onclick={() =>
                                deleteChallenge(challenge.challengeId)}
                        />
                        <Button
                            icon={Check}
                            class="success"
                            name="Success"
                            disabled={defiApprouved || defiDeleted}
                            onclick={() =>
                                approuveChallenge(challenge.challengeId)}
                        />
                    </Flex>
                {/snippet}
            </ChallengeCard>
        {/if}
    {/each}
{/snippet}

<Flex direction="column" gap="xl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Board admin</h2>
        <p>Toutes les fonctionnalités admin.</p>
    </Stack>

    <Stack style="width: 100%;">
        <Frame border={true} style="width: 100%; max-width: 100%;">
            <Flex direction="column" style="width: 100%; max-width: 100%;">
                <Switch bind:checked={hideDone}
                    >Masquer les défis validés</Switch
                >
                <Flex
                    gap="xs"
                    wrap={false}
                    align="center"
                    style="width: 100%; max-width: 100%;"
                >
                    <span style="padding-right: 10px;">Filtre</span>
                    <Filters
                        filters={filterNames}
                        save={true}
                        name="active-clubs"
                        bind:activeIndexes
                    />
                </Flex>
            </Flex>
        </Frame>
    </Stack>

    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Flex gap="md" direction="column" style="max-width: 100%; width: 100%;">
            {#each activeGroups as group}
                <Flex
                    direction="column"
                    gap="xs"
                    style="max-width: 100%; width: 100%;"
                >
                    <Category
                        name={group.name}
                        bind:list={hiddenClubs}
                        src={group.pictureURL}
                    />

                    <Flex gap="xs" direction="column" style="max-width: 100%">
                        {#if hiddenClubs.includes(group.name)}
                            {@render showChallenges(group)}
                        {/if}
                    </Flex>

                    {#if group.challenges.length == 0 && !hiddenClubs.includes(group.name)}
                        <p><i>( aucun challenge à accepter )</i></p>
                    {/if}
                </Flex>
            {/each}
        </Flex>
    </Stack>

    <Stack></Stack>
</Flex>
