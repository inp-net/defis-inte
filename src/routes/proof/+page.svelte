<script lang="ts">
    import { Toaster, toast } from 'svelte-sonner'
    import { invalidateAll } from '$app/navigation';
    import type { PageData } from "./$types";
    import { Flex, Stack, Button, Frame, Switch, TextInput } from "azucar-ui";
    import { User, Users, Clock, XIcon, Check, Video, House, Loader, Hammer } from "@lucide/svelte";
    import type { Proof } from "$lib/types/types.d";
    import BackButton from "$lib/components/BackButton.svelte";
    import ChallengeCard from "$lib/components/ChallengeCard.svelte";

    let showPending = $state(false);
    let comments = $state<Record<number, string>>({});

    let { data }: { data: PageData } = $props();
    const proofsRaw: Proof[] = $derived(data.posts.proofs);
    const proofs = $derived(proofsRaw
        .filter((p) => p.status === "PENDING" || showPending)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );

    async function approveProof(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("proofId", id.toString());

            const text = comments[id]?.trim();
            if (text) {
                formData.append("comment", text);
            }
            console.log(text);

            const response = await fetch("?/approve", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === "failure") {
                    console.error("Erreur de validation :", result.data?.message ?? result);
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

            const text = comments[id]?.trim();
            if (text) {
                formData.append("comment", text);
            }

            const response = await fetch("?/deny", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === "failure") {
                    console.error("Erreur de validation :", result.data?.message ?? result);
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function handleAccept(id: number) {

        await approveProof(id);
        delete comments[id];
        await invalidateAll(); // reset les données
    }

    async function handleDeny(id: number) {
        await denyProof(id);
        delete comments[id];
        await invalidateAll();
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

    <Frame border={true}>
        <Stack>
            <Switch bind:checked={showPending}>Afficher les preuves traités</Switch>
        </Stack>
    </Frame>

    <Stack
        style="max-width: 100%; width: 100%; min-width: 0; display: flex; flex-direction: column;"
    >
        <Flex
            gap="xs"
            direction="column"
            style="display: flex; flex-direction: column; width: 100%; min-width: 0;"
        >
            {#each proofs as proof (proof.proofId)}
                <ChallengeCard
                    title={"Défi : " + proof.challenge.name}
                    points={proof.challenge.nbPoints}
                    badges={[
                        { name: "Par", icon: User, values: [proof.user.firstName + " " + proof.user.lastName] },
                        { name: "Groupe", icon: Users, values: [proof.user.groupInte?.name ?? "Inconnu"] },
                        { name: "Pour", icon: House, values: [proof.challenge.group?.name ?? "Inconnu"] },
                        { name: "Status", icon: Loader, values: [proof.status] },
                        { name: "Droit TVn7 ?", icon: Video, values: [proof.isOkTVn7 ? 'oui' : 'non'] },
                        { name: "Date", icon: Clock, values: [formatDateTime(proof.date)] },
                        { name: "Id du validateur", icon: Hammer, values: [proof.validatorId ?? "personne"] },
                    ]}
                >
                    {#snippet header()}
                        <img src={proof.challenge.group.pictureURL} alt={proof.challenge.group.pictureURL} />
                    {/snippet}
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
                        {#if proof.status === "PENDING"}
                            <TextInput
                                placeholder="Optionnel, visible par le groupe"
                                oninput={(e) =>
                                    (comments[proof.proofId] = (
                                        e.target as HTMLInputElement
                            ).value)}>
                                Commentaire
                            </TextInput >
                        {:else if proof.comment}
                            <p><b>Commentaire :</b> {proof.comment}</p>
                        {/if}
                    {/snippet}
                    {#snippet actions()}
                        {#if proof.status === "PENDING"}
                            <Flex gap="xs" style="margin-left: auto; flex-shrink: 0;">
                                <Button
                                    icon={XIcon}
                                    class="danger"
                                    name="Delete"
                                    onclick={() =>
                                        toast('Voulez-vous refuser la preuve ?', {
                                            action: {
                                                label: 'Oui',
                                                onClick: () => handleDeny(proof.proofId)
                                            },
                                        })
                                    }
                                />
                                <Button
                                    icon={Check}
                                    class="success"
                                    name="Success"
                                    onclick={() =>
                                        toast('Voulez-vous valider la preuve ?', {
                                            action: {
                                                label: 'Oui',
                                                onClick: () => handleAccept(proof.proofId)
                                            },
                                        })
                                    }
                                />
                            </Flex>
                        {/if}
                    {/snippet}
                </ChallengeCard>
            {/each}
        </Flex>
    </Stack>
</Flex>

<Toaster richColors  />

<style>
    img {
        width: var(--size-lg);
        height: var(--size-lg);
        border-radius: var(--size-xl);
        object-fit: cover;
    }
</style>
