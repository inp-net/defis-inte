<script lang="ts">

    import type { PageData } from '../$types';
    import { Flex, Stack, Button, Frame } from 'azucar-ui';
    import { Check, XIcon } from '@lucide/svelte';

    let { data }: { data: PageData } = $props();
    let proofs = $state(data.posts.proofs);
    let len = $derived(proofs.length);

    $effect(() => {
        proofs = data.posts.proofs;
    })

    async function approveProof(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('challengeId', id.toString());

            const response = await fetch('?/approve', {
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
                    proof.status = 'VALID'
                }
            }
        } catch(err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function denyProof(id: number): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('challengeId', id.toString());

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


    
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack>
        <h2>Preuves à traiter</h2>
    </Stack>
    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Flex gap="md" style="max-width: 100%; width: 100%; align-items: center;">
            {#each proofs as proof}
                <Frame border style="height: 100%; max-width: 700px; margin: auto 1%;">
                    <Flex style="height: 100%; width: 100%;" gap="md">
                        
                        <Flex direction="column" style="width: 100%;">
                            <h3>{proof.challenge.name}</h3>
                            <p>Description : {proof.challenge.description}</p>
                            <p>Preuve de : {proof.user.name}</p>
                            {#if (proof.type == "TEXT")}
                                <p>Réponse : <b>{proof.content}</b></p>
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
                            <Flex direction="row" style="justify-content: flex-end;">
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
                        </Flex>
                    </Flex>
                </Frame>
            {/each}
        </Flex>
    </Stack>
</Flex>
