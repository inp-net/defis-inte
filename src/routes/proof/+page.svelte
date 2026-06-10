<script lang="ts">

    import type { PageData } from '../$types';
    import { Flex, Stack, Button, Frame } from 'azucar-ui';
    import { User, Clock, File } from '@lucide/svelte';
    import BackButton from '$lib/components/BackButton.svelte';
    import type { Proof } from '$lib/types/types.d';
    import { Status } from '$lib/types/types.d';
    import AcceptableCard from '$lib/components/AcceptableCard.svelte';

    let { data }: { data: PageData } = $props();
    let proofs : Proof[] = $state(data.posts.proofs);

    $effect(() => {
        proofs = data.posts.proofs;
    })

    async function approveProof(id: number): Promise<void> {
        console.log("Tentative d'accepter la preuve");
        try {
            const formData = new FormData();
            formData.append('proofId', id.toString());

            const response = await fetch('?/approve', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true', },
                body: formData
            });
            if (response.ok) {
                // Changement local des modifications serveur
                const result = await response.json();
                if (result.type === 'failure') {
                    console.error("Erreur de validation :", result.data?.message);
                    return;
                }
                const proof : Proof = proofs.find(c => c.proofId === id);
                if (proof) {
                    proof.status = 'VALID'
                }

                console.log("OK preuve validé");
            }
        } catch(err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function denyProof(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('proofId', id.toString());

            const response = await fetch('?/deny', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true', },
                body: formData
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === 'failure') {
                    console.error("Erreur de validation :", result.data?.message);
                    return;
                }
                const proof = proofs.find(c => c.challengeId === id);
                if (proof) {
                    proof.status = 'DENIED'
                }
            }
        } catch(err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    let validProofIds = $state<number[]>([]);
    let deniedProofIds = $state<number[]>([]);

    async function handleAccept(id : number) {
        await approveProof(id);
        validProofIds.push(id);
    }

    async function handleDeny(id : number) {
        await denyProof(id);
        deniedProofIds.push(id);
    }

    function formatDateTime(date: Date | string): string {
        const d = new Date(date);
        return d.toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
    }
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Preuves</h2>
        <p>Validation des preuves</p>
    </Stack>
    <Stack style="max-width: 100%; width: 100%; min-width: 0; display: flex; flex-direction: column;">
        <Flex gap="xs" direction="column" style="display: flex; flex-direction: column; width: 100%; min-width: 0;">
            {#each proofs as proof}
                <AcceptableCard
                    id={proof.proofId}
                    name={"Défi : " + proof.challenge.name}
                    points={proof.challenge.nbPoints}
                    isModifiable={false}
                    onAccepted={() => handleAccept(proof.proofId)}
                    onDeleted={() => handleDeny(proof.proofId)}
                    isApprouved={proof.status === Status.VALID || validProofIds.includes(proof.proofId)}
                    isDisabled={proof.status === Status.DENIED || deniedProofIds.includes(proof.proofId)}
                >
                    <Flex direction="column" gap="xs" style="max-width: 100%; width: 100%; min-width: 0;">
                        <Flex wrap={false} gap="xs" align="center">
                            <User size='15px'/> 
                            <p>{proof.user.name}</p>
                        </Flex>
                        <Flex wrap={false} gap="xs" align="center">
                            <Clock size='15px'/> 
                            <p>{formatDateTime(proof.date)}</p>
                        </Flex>
                        <Flex wrap={false} gap="xs" align="center">
                            <File size='15px'/> 
                            <p>{proof.type.toLowerCase()}</p>
                        </Flex>
                    </Flex>
                    {#if (proof.type == "TEXT")}
                        <p><b>Réponse :</b> {proof.content}</p>
                    {:else if (proof.type == "VIDEO")}
                        <video style="max-width: 250px; max-height: 250px; width: auto; height: auto; border-radius: 8px; object-fit: contain;" controls>
                            <source src={proof.content}>
                        </video>
                    {:else}
                        <img 
                            src={proof.content} 
                            alt="Une photo" 
                            style="max-width: 250px; max-height: 250px; width: auto; height: auto; border-radius: 8px; object-fit: contain;"
                        >
                    {/if}
                </AcceptableCard>
            {/each}
        </Flex>
    </Stack>
</Flex>
