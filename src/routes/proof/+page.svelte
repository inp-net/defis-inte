<script lang="ts">

    import type { PageData } from '../$types';
    import { Flex, Stack, Button, Frame } from 'azucar-ui';
    import { User, Clock, TextAlignStart } from '@lucide/svelte';
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
                    isModifiable={false}
                    onAccepted={() => handleAccept(proof.proofId)}
                    onDeleted={() => handleDeny(proof.proofId)}
                    isApprouved={proof.status === Status.VALID || validProofIds.includes(proof.proofId)}
                    isDisabled={proof.status === Status.DENIED || deniedProofIds.includes(proof.proofId)}
                >
                    <Flex direction="column" gap="lg">
                        <Flex direction="column" gap="xs" style="max-width: 100%; width: 100%; min-width: 0;">
                            <Flex wrap={false} gap="xs" align="center">
                                <User size='15px'/> 
                                <p>{proof.user.firstName} {proof.user.lastName}</p>
                            </Flex>
                            <Flex wrap={false} gap="xs" align="center">
                                <Clock size='15px'/> 
                                <p>{formatDateTime(proof.date)}</p>
                            </Flex>
                            <Flex wrap={false} gap="xs" align="center">
                                <TextAlignStart size='15px'/> 
                                <p>{proof.challenge.description}</p>
                            </Flex>
                        </Flex>
                        <div class="proof-media-list">
                            {#each proof.content as content, index}
                                {#if proof.type == "TEXT"}
                                    <div class="text-response">
                                        <p><b>Réponse {proof.content.length > 1 ? index + 1 : ''} :</b> {content}</p>
                                    </div>
                                {:else if proof.type == "VIDEO"}
                                    <div class="media-container video-container">
                                        <video controls preload="metadata">
                                            <source src={content}>
                                            <p>Votre navigateur ne supporte pas la vidéo</p>
                                        </video>
                                    </div>
                                {:else}
                                    <div class="media-container image-container">
                                        <img 
                                            src={content} 
                                            alt={`Preuve image ${index + 1}`}
                                            loading="lazy"
                                        >
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </Flex>
                </AcceptableCard>
            {/each}
        </Flex>
    </Stack>
</Flex>

<style>
    .proof-content {
        max-width: 100%;
        overflow-x: hidden;
    }
    
    .proof-media-list {
        display: flex;
        flex-direction: column;
        gap: var(--size-md);
        width: 100%;
        max-width: 100%;
    }
    
    .media-container {
        width: 100%;
        max-width: 100%;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    
    .video-container {
        background: #000;
        min-height: 200px;
    }
    
    .image-container {
        min-height: 100px;
    }
    
    .video-container video {
        width: 100%;
        height: auto;
        max-width: 100%;
        max-height: 300px;
        aspect-ratio: 16 / 9;
        object-fit: contain;
        display: block;
    }
    
    .image-container img {
        width: auto;
        max-width: 100%;
        max-height: 300px;
        height: auto;
        object-fit: contain;
        display: block;
    }
    
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
