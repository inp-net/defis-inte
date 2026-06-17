<script lang="ts">
    import { Flex, Stack, Frame, Switch, Button } from "azucar-ui";
    import { Clock, UserRound, UserStar, Route } from "@lucide/svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import PopUpVerification from "$lib/components/PopUpVerification.svelte";
    import AcceptableCard from "$lib/components/AcceptableCard.svelte";
    import { type ProofRead, Status } from "$lib/types/types.d";

    let { data }: { data: PageData } = $props();

    let user = $derived(data.user);

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

    // Mettre en forme les métadonnées

    let showPopUp: boolean = $state(false);

    // Sert a recalculer les points
    async function reCalculPoints() {
        try {
            const response = await fetch("?/reCalculPoints", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: new FormData(),
            });
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    const proofs : ProofRead[] = $derived(data.posts.userProofs);

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

    let renderStatus = (status: Status): string => {
        if (status === Status.PENDING) {
            return "[STATUS] En attente de validation ...";
        } else if (status === Status.DENIED) {
            return "[STATUS] Preuve rejetée.";
        } else if (status === Status.VALID) {
            return "[STATUS] Preuve acceptée.";
        } else {
            return "Statut inconnu, voir avec l'admin";
        }
    };

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
                    size="large"
                    firstName={user.firstName}
                    lastName={user.lastName}
                    src={user.profilePictureURL}
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
    {#if user.isAdmin}
        <Stack align="baseline">
            <h2>Admin</h2>
            <Button onclick={() => (showPopUp = true)}>Re Calcul Points</Button>
        </Stack>

        <PopUpVerification
            bind:open={showPopUp}
            message="Es-tu sûr de vouloir recalculer les points ?"
            onConfirm={() => reCalculPoints()}
        />
    {/if}

    {#snippet proofRender(proof)}
        <!-- métadonnées -->
        <Flex direction="column" gap="xs">
            <Flex gap="xs" align="center" >
                <UserRound size="15px" />
                <p>{proof.user.firstName + " " + proof.user.lastName}</p>
            </Flex>
            <Flex gap="xs" align="center" >
                <Clock size="15px" />
                <p>{formatDateTime(proof.date)}</p>
            </Flex>
            <Flex gap="xs" align="center" >
                <Route size="15px" />
                <p>{renderStatus(proof.status)}</p>
            </Flex>
        </Flex>
        <Flex direction="column" gap="xs">
            <h4>Contenu de la preuve :</h4>
            <Flex direction="column" gap="xs">
                {#each proof.content as content}
                    {#if proof.type === 'TEXT'}
                        <p>{content}</p>
                    {:else}
                        <a href={content} target="_blank" rel="noopener noreferrer">
                            <p>Regarder le média</p>
                        </a>
                    {/if}
                {/each}
            </Flex>
        </Flex>
    {/snippet}

    <Stack>
        <h3>Preuves de votre groupe</h3>
        <Flex direction="column" gap="xs">
            {#each proofs as proof}
                <AcceptableCard
                    id={proof.proofId}
                    isApprouved={proof.status === 'VALID'}
                    isDisabled={proof.status === 'DENIED'}
                    name={proof.challenge.name}
                    points={proof.challenge.nbPoints}
                    isModifiable={false}
                    modifiableURL=""
                    hideButtons={false}
                >
                    <Flex direction="column" gap="lg">
                        {@render proofRender(proof)}
                    </Flex>
                </AcceptableCard>
            {/each}
        </Flex>
    </Stack>
</Flex>
