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
        <Flex gap="md" direction="column" style="max-width: 100%; width: 100%;">
            {#each proofs as proof}
                <Frame>
                    <Flex justify="space-between" align="center" gap="md">
                        <Flex>
                            <p>Preuve de : {proof.user.name}</p>
                            <p>Défi : {proof.challenge.name}</p>
                        </Flex>
                        <Flex style="flex-shrink: 0; margin-left: auto;" gap="xs">
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
                </Frame>
            {/each}
        </Flex>
    </Stack>
</Flex>
