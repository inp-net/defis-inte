<script lang="ts">
    import { Flex, Stack, Frame, Switch } from "azucar-ui";
    import BackButton from "$lib/components/BackButton.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import { Button } from "azucar-ui";
    import PopUpVerification from "$lib/components/PopUpVerification.svelte";

    let { data }: { data: PageData } = $props();

    let categories = $derived(data.posts.returnCategories);
    let user = $derived(data.user);

    let showPopUp: boolean = $state(false);

    // Sert a recalculer les points
    async function reCalculPoints() {
        try {
            const response = await fetch("?/reCalculPoints", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: new FormData(),
            });
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Profil</h2>
        <p>Voir les informations du profil.</p>
    </Stack>

    <Stack>
        <Frame transparent={true} border={true} shadow={true}>
            <Flex direction="column" gap="lg">
                <Profile
                    size="large"
                    firstName={user.firstName}
                    lastName={user.lastName}
                    src={user.profilePictureURL}
                />
                <Flex gap="xl">
                    {#each categories as category}
                        <Flex direction="column" gap="md">
                            <h3>{category.key}</h3>
                            <Flex direction="column" gap="xs">
                                {#each category.valeurs as ligne}
                                    <p>{ligne}</p>
                                {/each}
                            </Flex>
                        </Flex>
                    {/each}
                </Flex>
            </Flex>
        </Frame>
    </Stack>
    {#if user.isAdmin}
        <Stack align="baseline">
            <h2>Admin</h2>
            <Button onclick={() => (showPopUp = true)}>Re Calcul Points</Button>
        </Stack>

        <PopUpVerification
            bind:open={showPopUp}
            message="Es-tu sûr de vouloir recalculer les points ?"
            onConfirm={() => reCalculPoints()}
        />
    {/if}
</Flex>
