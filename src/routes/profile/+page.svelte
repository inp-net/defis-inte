<script lang="ts">

    import { Flex, Stack, Frame, Switch } from 'azucar-ui';
    import BackButton from '$lib/components/BackButton.svelte';
    import Profile from '$lib/components/Profile.svelte';

    let { data }: { data: PageData } = $props();

    let categories = $derived(data.posts.returnCategories);
    let user = $derived(data.user);

    const [firstName, ...reste] = (user.name.split(" "))
    const lastName = $state(reste.join(" "))

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
                <Profile size='large' firstName={firstName} lastName={lastName} src={user.profilePictureURL}/>
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
</Flex>
