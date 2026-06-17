<script lang="ts">
    // TS
    import type { PageData } from "./$types";
    import type { ChallengeRead } from "$lib/types/types.d.ts";
    import { signIn } from "@auth/sveltekit/client";
    import { Churros1ATo2A } from "$lib/env";

    // composants
    import { Flex, Stack, Button } from "azucar-ui";
    import { MapPin, UsersRound, Trophy } from "@lucide/svelte";
    import Header from "$lib/components/Header.svelte";
    import FrameChallenge from "$lib/components/FrameChallenge.svelte";
    import AddChallenge from "$lib/components/AddChallenge.svelte";
    import Sort from "$lib/components/Sort.svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import Category from "$lib/components/Category.svelte";

    let { data }: { data: PageData } = $props();
    let challenges: ChallengeRead[] = $state(data.posts.challenges);

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

    async function handleSave(
        fichiers: FileList | null,
        textePreuve: string,
        type: string,
        isOkTVn7: boolean = false,
        challengeId: number,
    ) {
        try {
            const formData = new FormData();
            formData.append("challengeId", challengeId.toString());
            formData.append("type", type);
            if (textePreuve) {
                formData.append("textePreuve", textePreuve);
            } else {
                formData.append("isOkTVn7", isOkTVn7.toString());
                for (const file of fichiers) {
                    formData.append("file", file);
                }
            }

            const response = await fetch("?/save", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                // Changement local des modifications serveur
                const result = await response.json();
                if (result.type === "failure") {
                    console.error(
                        "Erreur de validation :",
                        result.data?.message,
                    );
                    return;
                }
                /*
                const proof : Proof = proofs.find(c => c.proofId === id);
                if (proof) {
                    proof.status = 'VALID'
                }
                */
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    // Trier les défis

    const sortList: string[] = ["points", "clubs", "lieux", "date", "réussite"];
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
            case "points":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        sortByPoints(a, b) ||
                        sortByClub(a, b),
                );
            case "clubs":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        sortByClub(a, b) ||
                        sortByPoints(a, b),
                );
            case "lieux":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        flip *
                            (b.locationName || "").localeCompare(
                                a.locationName || "",
                            ) ||
                        secondarySort(a, b),
                );
            case "date":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        flip * (b.challengeId - a.challengeId) ||
                        secondarySort(a, b),
                );
            case "réussite":
                return items.sort(
                    (a, b) =>
                        sortByDone(a, b) ||
                        flip *
                            (b.groupInteSucceed.length -
                                a.groupInteSucceed.length) ||
                        secondarySort(a, b),
                );
            default:
                return items.sort(secondarySort);
        }
    });
    let isConnected: boolean = $state(!!user);

    // Précompute les endroits où il faut mettre une catégorie
    const processedChallenges = $derived(() => {
        let currentClub = null;
        return sortedSearchedChallenges.map((challenge) => {
            const showCategory =
                sortBind === "clubs" && challenge.groupName !== currentClub;
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
    <Flex gap="xs" margin="xs" justify="right">
        <Button
            onclick={() => signIn("authentik", { callbackUrl: "/" })}
            style="padding: var(--size-md)"
        >
            Se connecter
        </Button>
    </Flex>
{:else}
    <Header
        firstName={user?.firstName ?? null}
        lastName={user?.lastName ?? null}
        picture={user?.profilePictureURL ?? null}
        accessAdmin={user?.isAdmin || user?.groupBoard.length > 0}
        notificationsDefis={data.posts.pendingChallengeCount}
        notificationsPreuves={data.posts.pendingProofCount}
    ></Header>
{/if}
<Flex direction="column" gap="xxl" margin="lg">
    <Stack>
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>

    <!-- A afficher que pour les membres 2A de groupes et plus -->
    {#if user && !(user.is1A === Churros1ATo2A)}
        <Stack>
            <AddChallenge />
        </Stack>
    {/if}

    {#snippet challengeDetails(challenge)}
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
                {#each challenge.groupInteSucceed as inte}
                    <p>- {inte.name}</p>
                {/each}
            </Flex>
        </Flex>
        <Flex gap="xs" align="center"
            ><UsersRound size="15px" /> {challenge.groupName}
        </Flex>
        <Flex gap="xs" align="center"
            ><MapPin size="15px" /> {challenge.locationName}
        </Flex>
    {/snippet}

    <!-- Liste des défis -->
    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Flex gap="xs" wrap={false} align="center">
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
                {#if challenge.showCategory}
                    <Category
                        name={challenge.groupName}
                        bind:list={hiddenClub}
                    />
                {/if}
                {#if !challenge.is_hidden}
                    <FrameChallenge
                        challengeId={challenge.challengeId}
                        name={challenge.isDone
                            ? `✔ ${challenge.name}`
                            : challenge.name}
                        nbPoints={challenge.nbPoints}
                        isText={challenge.type === "TEXT"}
                        location={challenge.locationName}
                        clubName={challenge.groupName}
                        clubUrl={challenge.groupUrl}
                        desc={challenge.description}
                        type={challenge.type}
                        onSave={handleSave}
                        defaultTVn7={user?.isOkTVn7}
                        is1A={user?.is1A}
                        isEnabled={isConnected && !challenge.isDone}
                    >
                        {@render challengeDetails(challenge)}
                    </FrameChallenge>
                {/if}
            {/each}
        </Flex>
    </Stack>
</Flex>
