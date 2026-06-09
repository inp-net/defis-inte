<script lang='ts'>

    import Select from '$lib/components/Select.svelte';
    import ButtonGroupFix from '$lib/components/ButtonGroupFix.svelte';
    import BackButton from '$lib/components/BackButton.svelte';
    import type { Location, GroupClub } from '$lib/types/types.d';
    import { UploadType } from '../../../../prisma/generated/prisma/enums';
    import type { PageData } from './$types';
    import { Toaster, toast } from 'svelte-sonner';
    import { Button, Flex, Stack, Frame, TextInput } from 'azucar-ui';
    import { SearchIcon, Check } from '@lucide/svelte';

    let { data, redirect = "/" }: { data: PageData, redirect: string } = $props();

    // Valeurs initiales du form. Réupéré de la db.
    const getInitialState = (ec: typeof data.existingChallenge) => ({
        challengeId: ec?.challengeId ?? -1,
        name: ec?.name ?? "",
        description: ec?.description ?? "",
        groupName: ec?.groupName ?? "",
        locationName: ec?.locationName ?? "ENSEEIHT",
        nbPoints: ec?.nbPoints ?? 10,
        type: ec?.type ?? "PHOTO"
    });

    let formState = $state(getInitialState(data.existingChallenge));
    let isSubmitting = $state(false);

    $effect(() => {
        formState = getInitialState(data.existingChallenge);
    });


    // Options du Select
    let locations : Location[] = $derived(data.locations);
    let clubs : GroupClub[] = $derived(data.clubs);
    let clubOptions: string[] = $derived(clubs.map(c => c.name));
    let locationOptions: string[] = $derived(locations.map(l => l.name));
    let uploadTypes: string[] = Object.values(UploadType).map(l => l.toUpperCase());
    let presetPoints = $derived(data.presetPoints);

    let isNew : boolean = $derived(data.existingChallenge == null);

    /** Fonction envoie du formulaire à l'api api/challenge. */
    async function sendChallenge() {
        // Prétests clients
        if (!formState.name || !formState.groupName || !formState.locationName) {
            toast.error("Formulaire incomplet.");
            return;
        }
        try {
            toast.info('Requête envoyé.')

            isSubmitting = true;
            const response = await fetch('?/upsert', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true' },
                body: JSON.stringify(formState)
            });
            const result = await response.json();

            if (result.type === "success") {
                let mot : string = isNew ? 'crée' : 'modifié';
                toast.success('Défi ' + mot + ' avec succès');
                if (formState.challengeId < 0) {
                    formState.name = "";
                    formState.description = "";
                }
            } else {
                let action : string = isNew ? 'la création' : 'la modification';
                toast.error("Une erreur est survenue lors de " + action + " du défi.");
            }
        } catch (err) {
            toast.error('Erreur dans l\'envoie du défi.');
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
            {#if isNew}
                <h2>Ajouter un Défi</h2>
            {:else}
                <h2>Modifier un Défi</h2>
            {/if}
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
                        placeholder="Lieu du défi";
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
                    <Button icon={Check} class="success" name="Success" onclick={sendChallenge} disabled={isSubmitting}>
                        {#if isNew}
                            Crée le défi
                        {:else}
                            Modifier le défi
                        {/if}
                    </Button>
                </Flex>

                <Toaster />
                
            </Flex>
        </Frame>
    </Stack>

</Flex>

