<script lang="ts">
    // TS
    import type { PageData } from "./$types";
    import type { ChallengeRead } from "$lib/types/types.d.ts";
    import { signIn } from "@auth/sveltekit/client";
    import { Churros1ATo2A } from "$lib/env";
    import { Toaster, toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";
    import { UploadType } from "$lib/types/types.d";
    import { deserialize } from '$app/forms';

    // composants
    import { Flex, Stack, Button } from "azucar-ui";
    import { MapPin, UsersRound, Trophy, LogIn, Files } from "@lucide/svelte";
    import Header from "$lib/components/Header.svelte";
    import FrameChallenge from "$lib/components/FrameChallenge.svelte";
    import AddChallenge from "$lib/components/AddChallenge.svelte";
    import Sort from "$lib/components/Sort.svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import Category from "$lib/components/Category.svelte";
    import HomepageTitle from "$lib/components/HomepageTitle.svelte";

    let { data }: { data: PageData } = $props();
    let challenges: ChallengeRead[] = $derived(data.posts.challenges);

    // Données liées au profil de l'utilisateur
    const user = $derived(data?.user);

    // Recherche de défis
    let searchValue: string = $state("");
    let searchedItems = $derived(
        challenges.filter((a) => {
            // On met tout en minuscule moins sensible
            const search = searchValue.toLowerCase();
            if (!search) return true;
            // True ou false si contient
            const containsName = a.name.toLowerCase().includes(search);
            const containsClub = a.groupName.toLowerCase().includes(search);
            return containsName || containsClub;
        }),
    );

    let isSending = $state(false);

    /** Fonction pour gérer l'envoie d'une preuve
     * @param fichiers - Les fichiers à envoyer (peut être null)
     * @param textePreuve - Le texte de la preuve (peut être vide)
     * @param type - Le type de preuve (texte ou fichier)
     * @param isOkTVn7 - Indique si l'utilisateur est OK avec TVn7
     * @param challengeId - L'ID du défi
     * @returns void
     */
    async function handleSave(
        fichiers: FileList | null,
        textePreuve: string,
        type: string,
        isOkTVn7: boolean = false,
        challengeId: number,
    ) {
        if (isSending) return;

        // Vérifie que le groupe n'a pas déjà fait le défi
        const currentChallenge = challenges.find(
            (c) => c.challengeId === challengeId,
        );
        if (currentChallenge?.isDone) {
            toast.error("Votre groupe a déjà validé ce défi !");
            return;
        }

        try {
            isSending = true;
            toast.info("Preuve envoyée.");

            const formData = new FormData();
            formData.append("challengeId", challengeId.toString());
            formData.append("type", type);
            if (textePreuve) {
                formData.append("textePreuve", textePreuve);
            } else {
                formData.append("isOkTVn7", isOkTVn7.toString());
                if (fichiers) {
                    for (const file of fichiers) {
                        formData.append("file", file);
                    }
                }
            }

            const response = await fetch("?/save", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                const resultNoReadable = await response.text();
                const result = deserialize(resultNoReadable);

                if (result.type === "success") {
                    toast.success("Preuve ajouté avec succès");
                    invalidateAll();
                }
                if (result.type === "failure") {
                    const message = result.data?.message ?? result.data ?? "" ;
                    toast.error(
                        `Impossible d'envoyer la preuve. ${message}`
                    );
                }
            }
        } catch (err) {
            toast.error("Erreur dans l'envoie du défi : " + err);
            console.error("Erreur lors de l'envoi du form : ", err);
        } finally {
            isSending = false;
        }
    }

    // Trier les défis

    const sortList: string[] = ["Points", "Clubs", "Lieux", "Date", "Tendance"];
    let sortBind: string = $state(sortList[1]);
    let isSortDesc = $state(true);

    let hiddenClub: string[] = $state([]);

    let sortedSearchedChallenges = $derived.by(() => {
        const items = [...searchedItems];
        const flip = isSortDesc ? 1 : -1;

        const sortByClub = (a: any, b: any) =>
            flip * (b.groupName || "").localeCompare(a.groupName || "");
        const sortByPoints = (a: any, b: any) =>
            flip * (Number(b.nbPoints) - Number(a.nbPoints));
        const sortByDone = (a: any, b: any) =>
            a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1;
        // Le trie secondaire trie par clubs puis par points
        const secondarySort = (a: any, b: any) =>
            sortByClub(a, b) || sortByPoints(a, b);

        switch (sortBind) {
            case "Points":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        sortByPoints(a, b) ||
                        sortByClub(a, b),
                );
            case "Clubs":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        sortByClub(a, b) ||
                        sortByPoints(a, b),
                );
            case "Lieux":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        flip *
                            (b.locationName || "").localeCompare(
                                a.locationName || "",
                            ) ||
                        secondarySort(a, b),
                );
            case "Date":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        flip * (b.challengeId - a.challengeId) ||
                        secondarySort(a, b),
                );
            case "Tendance":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        flip *
                            (b.groupInteSucceedName.length -
                                a.groupInteSucceedName.length) ||
                        secondarySort(a, b),
                );
            default:
                return items.sort(secondarySort);
        }
    });
    let isConnected: boolean = $derived(Boolean(user));

    // Précompute les endroits où il faut mettre une catégorie
    const processedChallenges = $derived(() => {
        let currentClub = null;
        return sortedSearchedChallenges.map((challenge) => {
            const showCategory =
                sortBind === "Clubs" && challenge.groupName !== currentClub;
            if (showCategory) {
                currentClub = challenge.groupName;
            }
            return {
                ...challenge,
                showCategory,
                is_hidden: hiddenClub.includes(challenge.groupName),
            };
        });
    });
</script>

{#if !isConnected}
    <Flex gap="xs" margin="lg" justify="right">
        <Button
            onclick={() => signIn("authentik", { callbackUrl: "/" })}
            icon={LogIn}
        >
            Se connecter
        </Button>
    </Flex>
{:else}
    <Header
        firstName={user?.firstName ?? null}
        lastName={user?.lastName ?? null}
        groupName={user?.is1A ? user?.groupInte?.name : ""}
        picture={user?.profilePictureURL ?? null}
        accessAdmin={user?.isAdmin || user?.groupBoard.length > 0}
        notificationsDefis={data.posts.pendingChallengeCount}
        notificationsPreuves={data.posts.pendingProofCount}
    ></Header>
{/if}
<Flex direction="column" gap="xxl" margin="lg">

    <HomepageTitle />

    <!-- A afficher que pour les membres 2A de groupes et plus -->
    {#if user && !(user.is1A === Churros1ATo2A)}
        <Stack>
            <AddChallenge />
        </Stack>
    {/if}

    <!-- Snippet pour afficher les métadonnées d'un challenge -->
    {#snippet challengeDetails(challenge)}
        <Flex gap="xs" align="center"
            ><UsersRound size="15px" /> {challenge.groupName}
        </Flex>
        <Flex gap="xs" align="center"
            ><MapPin size="15px" /> {challenge.locationName}
        </Flex>
        <Flex gap="xs" align="center"
            ><Files size="15px" />
            <p>Type de preuve attendu :</p>
            {UploadType[challenge.type as keyof typeof UploadType]}</Flex
        >
        {#if challenge.groupInteSucceedName.length > 0}
            <Flex gap="xs" direction="column">
                <Flex gap="xs" align="center">
                    <Trophy size="15px" />
                    <p>Défi réussi par :</p>
                </Flex>
                <Flex
                    direction="column"
                    gap="xxs"
                    wrap={false}
                    style="max-height: 100px; overflow: scroll; margin-left: 10px;"
                >
                    {#each challenge.groupInteSucceedName as name}
                        <p>- {name}</p>
                    {/each}
                </Flex>
            </Flex>
        {/if}
    {/snippet}

    <!-- Liste des défis -->
    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Flex gap="xxs" wrap={false} align="center">
            <SearchBar bind:value={searchValue} />
            <Sort
                bind:bind={sortBind}
                options={sortList}
                bind:isDesc={isSortDesc}
            />
        </Flex>
        <Flex
            gap="xs"
            direction="column"
            style="max-width: 100%; width: 100%;"
            wrap={false}
        >
            {#each processedChallenges() as challenge (challenge.challengeId)}
                {@const isDone = challenge.isDone}
                {@const isPending = challenge.isPending}
                {@const challengeTitle = isDone
                    ? `✔ ${challenge.name}`
                    : isPending
                      ? `⏳ ${challenge.name} (En attente)`
                      : challenge.name}

<!--
    Cette section devrait être refactor. Du a une mauvaise
    architecture de départ, fix fonctionne. Client side, les
    challenges sont triés par clubs et quand il y a un changement
    de club d'un challenge à l'autre, ce dernier à son terme
    showCategory à true.
-->

                {#if challenge.showCategory}
                    <Category
                        name={challenge.groupName}
                        bind:list={hiddenClub}
                        src={challenge.groupUrl}
                    />
                {/if}
                {#if !challenge.is_hidden || sortBind !== "Clubs"}
                    <FrameChallenge
                        challengeId={challenge.challengeId}
                        name={challengeTitle}
                        nbPoints={challenge.nbPoints}
                        isText={challenge.type === "TEXT"}
                        location={challenge.locationName}
                        clubName={challenge.groupName}
                        clubUrl={sortBind === "Clubs" ? "" : challenge.groupUrl}
                        desc={challenge.description}
                        type={challenge.type}
                        onSave={handleSave}
                        defaultTVn7={user?.isOkTVn7}
                        {isConnected}
                        isEnabled={isConnected &&
                            !challenge.isDone &&
                            !isSending &&
                            Churros1ATo2A &&
                            user?.is1A}
                    >
                        {@render challengeDetails(challenge)}
                    </FrameChallenge>
                {/if}
            {/each}
        </Flex>
    </Stack>

    <Toaster />
</Flex>
