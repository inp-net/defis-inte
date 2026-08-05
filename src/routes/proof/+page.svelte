<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import type { PageData } from "../$types";
    import { Flex, Stack, Button, Frame } from "azucar-ui";
    import { User, Clock, XIcon, Check } from "@lucide/svelte";
    import type { Proof } from "$lib/types/types.d";
    import { Status } from "$lib/types/types.d";
    import AcceptableCard from "$lib/components/AcceptableCard.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import ChallengeCard from "$lib/components/ChallengeCard.svelte";

    let { data }: { data: PageData } = $props();
    let proofs: Proof[] = $state(data.posts.proofs);
    $effect(() => {
        proofs = data.posts.proofs;
    });

    async function approveProof(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("proofId", id.toString());

            const response = await fetch("?/approve", {
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
                const proof: Proof = proofs.find((c) => c.proofId === id);
                if (proof) {
                    proof.status = "VALID";
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function denyProof(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("proofId", id.toString());

            const response = await fetch("?/deny", {
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
                const proof = proofs.find((c) => c.challengeId === id);
                if (proof) {
                    proof.status = "DENIED";
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function handleAccept(id: number) {
        approveProof(id);
        invalidateAll(); // reset les données
    }

    async function handleDeny(id: number) {
        denyProof(id);
        invalidateAll();
    }

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
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Preuves</h2>
        <p>Validation des preuves</p>
    </Stack>

    <Stack
        style="max-width: 100%; width: 100%; min-width: 0; display: flex; flex-direction: column;"
    >
        <Flex
            gap="xs"
            direction="column"
            style="display: flex; flex-direction: column; width: 100%; min-width: 0;"
        >
            {#each proofs as proof}
                <!-- <AcceptableCard -->
                <!--     id={proof.proofId} -->
                <!--     name={"Défi : " + proof.challenge.name} -->
                <!--     isModifiable={false} -->
                <!--     onAccepted={() => } -->
                <!--     onDeleted={() => } -->
                <!--     isApprouved={proof.status === Status.VALID} -->
                <!--     isDisabled={proof.status === Status.DENIED} -->
                <!-- > -->
                <!--     {@render proofDetails(proof)} -->
                <!-- </AcceptableCard> -->
                <ChallengeCard
                    title={"Défi : " + proof.challenge.name}
                    points={proof.challenge.nbPoints}
                    badges={[
                        { name: "Par", icon: User, values: [proof.user.firstName + " " + proof.user.lastName] },
                        { name: "Date", icon: Clock, values: [formatDateTime(proof.date)] },
                    ]}
                >
                    {#snippet content()}
                        <p><b>Description :</b> {proof.challenge.description}</p>
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
                        </Flex>
                    {/snippet}
                    {#snippet actions()}
                        <Flex gap="xs" style="margin-left: auto; flex-shrink: 0;">
                            <Button
                                icon={XIcon}
                                class="danger"
                                name="Delete"
                                onclick={() => handleDeny(proof.proofId)}
                            />
                            <Button
                                icon={Check}
                                class="success"
                                name="Success"
                                onclick={() => handleAccept(proof.proofId)}
                            />
                        </Flex>
                    {/snippet}
                </ChallengeCard>
            {/each}
        </Flex>
    </Stack>
</Flex>

<style>
    .text-response {
        width: 100%;
        padding: var(--size-sm);
        border-radius: 8px;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }

    @media (max-width: 640px) {
        .video-container video,
        .image-container img {
            max-height: 250px;
        }
    }
</style>
