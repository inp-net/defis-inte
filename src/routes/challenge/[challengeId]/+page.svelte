<script lang='ts'>

    import Select from '$lib/components/Select.svelte';
    import { UploadType, Difficulty } from '$generated/prisma';
    import type { PageData } from './$types';
    import type { ChallengeInput } from '$lib/types';

    import {
        Button,
            Flex,
            Stack,
            ButtonGroup,
            Frame,
            Switch,
            TextInput
    } from 'azucar-ui';

    import {
        SearchIcon,
        Check
    } from '@lucide/svelte';

    let { data }: { data: PageData } = $props();

    // Element séléctionné par l'utilisateur

    type State = {
        selectedName: string,
        selectedDescription: string
    }

    let formState = $state<ChallengeInput>({
        name: "",
        description: "",
        groupId: "",
        type: UploadType.IMAGE,
        nbPoints: 10,
        difficulty: Difficulty.easy,
        locationName: "ENSEEIHT"
    });

    // Liste des éléments qui peuvent être séléctionné

    let clubOptions: string[] = data.clubs.map(c => ({ value: c.groupId, label: c.name }));
    let locationOptions: string[] = data.locations.map(l => l.name);
    let uploadTypes: string[] = Object.values(UploadType);

    let showSuccess = $state(false);
    let showFailure = $state(false);

    async function sendChallenge() {
        if (!formState.name || !formState.groupId || !formState.locationName) {
            console.error("Formulaire incomplet");
            showFailure = true;
            return;
        }
        try {
            const response = await fetch('/api/challenge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                showSuccess = true;
            } else {
                showFailure = true;
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
            showFailure = true;
        }
    }

</script>

<Flex direction="column" gap="xxl" margin="lg">

    <Stack>
        <Flex>
        <h2>Ajouter un Défi</h2>
        </Flex>
        <p>Remplissez les informations ci-dessous pour proposer un défi.</p>
    </Stack>

    <Stack>
        <Frame>
            <Flex gap="md" direction="column">
                
                <Flex gap="md" align="center">
                    <Flex direction="column" gap="xxs" style="flex-grow: 1;">
                        <span>Nom du défi</span>
                        <TextInput type="text" placeholder="Ex: Boire un café en moins de 5s" value={formState.name} required />
                    </Flex>
                    
                    <Flex direction="column" gap="xxs" style="flex-grow: 2;">
                        <span>Description</span>
                        <TextInput type="text" placeholder="Détails ou contraintes du défi..." value={formState.description} />
                    </Flex>
                </Flex>

                <Flex gap="md" align="center">
                    
                    <Select
                        options={clubOptions}
                        bind:value={formState.groupId}
                        icon={SearchIcon}
                        placeholder="Choisir un club"
                        required
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
                        <TextInput type="number" placeholder="10" min="0" step="5" value={formState.nbPoints}></TextInput>
                    </Flex>

                    <Flex direction="column" gap="xxs">
                        <span>Difficulté</span>
                        <ButtonGroup>
                            <Button
                                variant={formState.difficulty === 'easy' ? 'default' : 'outline'}
                                onclick={() => formState.difficulty = 'easy'}
                            >Facile</Button>
                            <Button
                                variant={formState.difficulty === 'medium' ? 'default' : 'outline'}
                                onclick={() => formState.difficulty = 'medium'}
                            >Moyen</Button>
                            <Button
                                variant={formState.difficulty === 'hard' ? 'default' : 'outline'}
                                onclick={() => formState.difficulty = 'hard'}
                            >Difficile</Button>
                        </ButtonGroup>
                    </Flex>

                </Flex>

                <Flex gap="xs" style="flex-grow: 1" justify='right'>
                    <Button variant="outline" href="/challenges">Annuler</Button>
                    <Button icon={Check} class="success" name="Success" onclick={sendChallenge}>Créer le défi</Button>
                </Flex>
                
            </Flex>
        </Frame>
    </Stack>

</Flex>

