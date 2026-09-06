<script lang="ts">
    import { Toaster, toast } from 'svelte-sonner';
    import { invalidateAll } from '$app/navigation';
    import type { PageData } from "./$types";
    import { type ProofRead, UploadType } from "$lib/types/types.d";
    import { ProofItem } from '$lib/types/models.d';
    import { Flex, Stack, Button, Frame, Switch, TextInput } from "azucar-ui";
    import { User, Users, Clock, XIcon, Check, Video, House, Loader, Hammer } from "@lucide/svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import RenderList from '$lib/components/RenderList.svelte';

    let { data }: { data: PageData } = $props();

    let showPending = $state(false);
    let comments = $state<Record<number, string>>({});

    const rawProofs: ProofRead[] = $derived(
        (data.posts.proofs ?? []).map((raw: any) => new ProofItem(raw))
    );

    // si le switch veut voir les preuves pending
    const visibleProofs = $derived(
        rawProofs.filter((p) => p.status === "PENDING" || showPending)
    );

    const proofSortOptions = [
        {
            label: "Date",
            comparator: (a: ProofRead, b: ProofRead) =>
                new Date(b.date).getTime() - new Date(a.date).getTime(),
            groupBy: () => "Toutes les preuves"
        },
        {
            label: "Groupe",
            comparator: (a: ProofRead, b: ProofRead) =>
                (a.user.groupInte?.name ?? "").localeCompare(b.user.groupInte?.name ?? ""),
            groupBy: (p: ProofRead) => p.user.groupInte?.name ?? "Inconnu"
        },
        {
            label: "Club",
            comparator: (a: ProofRead, b: ProofRead) =>
                (a.alt ?? "").localeCompare(b.alt ?? ""),
            groupBy: (p: ProofRead) => p.alt ?? "Inconnu"
        }
    ];

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

    const metadata = (proof: ProofRead) => [
        { name: "Par", icon: User, values: [`${proof.user.firstName} ${proof.user.lastName}`] },
        { name: "Groupe", icon: Users, values: [proof.user.groupInte?.name ?? "Inconnu"] },
        { name: "Pour", icon: House, values: [proof.alt ?? "Inconnu"] },
        { name: "Status", icon: Loader, values: [proof.status] },
        { name: "Droit TVn7 ?", icon: Video, values: [proof.isOkTVn7 ? 'oui' : 'non'] },
        { name: "Date", icon: Clock, values: [formatDateTime(proof.date)] },
        { name: "Id du validateur", icon: Hammer, values: [proof.validatorId ?? "personne"] },
    ];
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
            <Flex justify="space-between" align="center" wrap={false}>
                <p>Recherche</p>
                <TextInput
                    placeholder="Citer l'unique asso technique ..."
                    oninput={(e) => (search = ( e.target as HTMLInputElement).value)}
                />
            </Flex>
        </Stack>
    </Frame>

    <Stack style="max-width: 100%; width: 100%; min-width: 0;">
        <RenderList
            items={visibleProofs}
            {metadata}
            sortOptions={proofSortOptions}
            getSearchableText={(p) =>
                `${p.text} ${p.alt ?? ''} ${p.user.firstName} ${p.user.lastName} ${p.user.groupInte?.name ?? ''}`
            }
        >
            {#snippet children(proof: ProofRead)}
                {#if proof.description}
                    <p><b>Description :</b> {proof.description}</p>
                {/if}
                <Flex direction="column" gap="xs">
                    {#if proof.type !== "TEXT"}
                        {#each proof.content as proofContent, index}
                            <a href={proofContent}>Média preuve {index + 1}</a>
                        {/each}
                    {:else}
                        <p><b>Réponse :</b> {proof.content.join(', ')}</p>
                    {/if}
                </Flex>
                {#if proof.status === "PENDING"}
                    <TextInput
                        placeholder="Optionnel, visible par le groupe"
                        oninput={(e) => (comments[proof.id] = (e.target as HTMLInputElement).value)}
                    >
                        Commentaire
                    </TextInput>
                {:else if proof.comment}
                    <p><b>Commentaire :</b> {proof.comment}</p>
                {/if}
            {/snippet}

            {#snippet actions(proof: ProofRead)}
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
                                        onClick: () => handleDeny(proof.id)
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
                                        onClick: () => handleAccept(proof.id)
                                    },
                                })
                            }
                        />
                    </Flex>
                {/if}
            {/snippet}
        </RenderList>
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
