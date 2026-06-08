<script lang='ts'>

    import Select from '$lib/components/Select.svelte';
    import ButtonGroupFix from '$lib/components/ButtonGroupFix.svelte';
    import BackButton from '$lib/components/BackButton.svelte';
    import { UploadType } from '@prisma/client';
    import type { PageData } from './$types';

    import { Button, Flex, Stack, Frame, TextInput } from 'azucar-ui';

    import {
        SearchIcon,
        Check
    } from '@lucide/svelte';

    let { data }: { data: PageData } = $props();

    // Valeurs initiales du form. Réupéré de la db.
    const getInitialState = (ec: typeof data.existingChallenge) => ({
        challengeId: ec?.challengeId ?? null,
        name: ec?.name ?? "",
        description: ec?.description ?? "",
        groupName: ec?.groupName ?? "",
        locationName: ec?.locationName ?? "",
        nbPoints: ec?.nbPoints ?? 10,
        type: ec?.type ?? "PHOTO"
    });

    let formState = $state(getInitialState(data.existingChallenge));
    let isSubmitting = $state(false);

    $effect(() => {
        formState = getInitialState(data.existingChallenge);
    });


    // Options du Select
    let clubOptions: string[] = $derived(data.clubs.map(c => c.name));
    let locationOptions: string[] = $derived(data.locations.map(l => l.name));
    let uploadTypes: string[] = Object.values(UploadType).map(l => l.toUpperCase());
    let presetPoints = [10, 20, 50, 80, 100];

    /** Fonction envoie du formulaire à l'api api/challenge. */
    async function sendChallenge() {
        if (!formState.name || !formState.groupName || !formState.locationName) {
            console.error("Formulaire incomplet");
            return;
        }
        try {
            isSubmitting = true;

            const response = await fetch('?/upsert', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true' },
                body: JSON.stringify(formState)
            });

        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        } finally {
            isSubmitting = false;
        }
    }

</script>

<Flex direction="column" gap="xxl" margin="lg">

    <Stack>
        <Stack align="baseline"> 
            <BackButton backCount={2} />
            <h2>Ajouter un Défi</h2>
            <p>Remplissez les informations ci-dessous pour proposer un défi.</p>
        </Stack>
    </Stack>

    <Stack>
        <Frame>
            <Flex gap="md" direction="column">
                
                <Flex gap="md" align="center">
                    <Flex direction="column" gap="xxs" style="flex-grow: 1;">
                        <!-- solution temporaire made by AI : Azucar supporte pas bind encore -->
                        <TextInput
                            type="text"
                            placeholder="Ex: Fermer la porte du local Tvn7."
                            value={formState.name}
                            required
                            oninput={(e) => formState.name = (e.target as HTMLInputElement).value}
                        >Nom du défi</TextInput>
                    </Flex>
                    
                    <Flex direction="column" gap="xxs" style="flex-grow: 2;">
                        <!-- solution temporaire made by AI : Azucar supporte pas bind encore -->
                        <TextInput
                            type="text"
                            placeholder="Description et ou contraintes."
                            value={formState.description}
                            oninput={(e) => formState.description = (e.target as HTMLInputElement).value}
                        >Description</TextInput>
                    </Flex>
                </Flex>

                <Flex gap="md" align="center">
                    
                    <Select
                        options={clubOptions}
                        bind:value={formState.groupName}
                        icon={SearchIcon}
                        placeholder="Choisir un club"
                        required
                        type='datalist'
                        id='1'
                    >Club Organisateur</Select>

                    <Select
                        options={locationOptions}
                        bind:value={formState.locationName}
                        icon={SearchIcon}
                        placeholder="Lieu du défi"
                        required
                    >Lieu</Select>

                    <Select
                        options={uploadTypes}
                        bind:value={formState.type}
                        icon={SearchIcon}
                        placeholder="Type de rendu"
                        required
                    >Type de preuve</Select>

                    <Flex direction="column" gap="xxs">
                        <span>Nombre de Points</span>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <ButtonGroupFix>
                                {#each presetPoints as pts}
                                    <Button 
                                        variant={formState.nbPoints === pts ? 'default' : 'outline'}
                                        onclick={() => formState.nbPoints = pts}
                                    >
                                        {pts}
                                    </Button>
                                {/each}
                            </ButtonGroupFix>
                        </div>
                    </Flex>

                </Flex>

                <Flex gap="xs" style="flex-grow: 1; margin-top: var(--size-lg);" justify='right'>
                    <!-- TODO faire retour depuis le navigateur pour meilleur UI -->
                    <Button variant="outline" href="/">Annuler</Button>
                    <Button icon={Check} class="success" name="Success" onclick={sendChallenge} disabled={isSubmitting}>Créer le défi</Button>
                </Flex>
                
            </Flex>
        </Frame>
    </Stack>

</Flex>

