<script lang="ts">
    import { Flex, Stack, Button, Switch, Frame } from "azucar-ui";
    import {
        Power,
        Settings2,
        UserRound,
        Wrench,
        Loader
    } from "@lucide/svelte";
    import { signOut } from "@auth/sveltekit/client";
    import { Toaster, toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";
    import { deserialize } from "$app/forms";
    import BackButton from "$lib/components/BackButton.svelte";

    let { data } = $props();

    let darkMode = $state(data.user?.darkMode ?? false);
    let okTVn7 = $state(data.user?.isOkTVn7 ?? false);

    const user = $derived(data.user);

    async function darkModeChange() {
        try {
            document.cookie = `theme=${darkMode ? 'dark' : 'light'}; path=/; max-age=31536000; SameSite=Lax`;

            const formData = new FormData();
            formData.append("darkMode", darkMode.toString());

            const response = await fetch("?/modifyDarkMode", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });

            const result = deserialize(await response.text());

            if (result.type === "success") {
                await invalidateAll();
            } else if (result.type === "failure") {
                darkMode = data.user?.darkMode ?? false;
                document.cookie = `theme=${darkMode ? 'dark' : 'light'}; path=/; max-age=31536000; SameSite=Lax`;
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    async function okTVn7Change() {
        try {
            const formData = new FormData();
            formData.append("okTVn7", okTVn7.toString());

            const response = await fetch("?/modifyOkTVn7", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                if (result.type === "failure") {
                    console.error(
                        "Erreur de validation :",
                        result.data?.message,
                    );
                    return;
                }
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    $effect(() => {
        darkMode = data.user?.darkMode ?? false;
        okTVn7 = data.user?.isOkTVn7 ?? false;
    });

    $effect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

    let hasRecomputedPoints: boolean = $state(false);

    async function recomputePoints() {
        if (hasRecomputedPoints) return;

        toast.info("Recalcul des points en cours.");
        try {
            const response = await fetch("?/recomputePoints", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: new FormData(),
            });

            if (response.ok) {
                hasRecomputedPoints = true;
                const result = await response.json();
                if (result.type === "success")
                    toast.success("Points recalculés, merci de ne pas abuser.");
            }
        } catch (err) {
            toast.error("Impossible de recalculer les points");
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }
</script>

<Flex direction="column" gap="lg" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Paramètres</h2>
    </Stack>
    <span style="height: 2em;"></span>
    <Frame border={true}>
        <Stack align="baseline">
            <Flex wrap={false} gap="sm" align="center">
                <Settings2 size="15px" />
                <h3>Paramètres généraux</h3>
            </Flex>
            <p>Paramètres de l'application.</p>
            <Flex direction="column">
                <Flex wrap={false}>
                    <Switch bind:checked={darkMode} onchange={darkModeChange}
                    ></Switch>
                    <p>Thème sombre</p>
                </Flex>
                <Flex wrap={false}>
                    <Switch bind:checked={okTVn7} onchange={okTVn7Change}
                    ></Switch>
                    <p>
                        Autoriser automatiquement TVn7 à utiliser les médias
                        transmis
                    </p>
                </Flex>
            </Flex>
        </Stack>
    </Frame>
    <Frame border={true}>
        <Stack align="baseline">
            <Flex wrap={false} gap="sm" align="center">
                <UserRound size="15px" />
                <h3>Paramètres du compte</h3>
            </Flex>
            <p>Gestion de votre compte INP-net.</p>
            <Flex direction="column">
                <Button
                    icon={Power}
                    variant="outline"
                    onclick={() => signOut({ redirectTo: "/" })}
                >
                    Se déconnecter
                </Button>
            </Flex>
        </Stack>
    </Frame>

    {#if user.isAdmin}
        <Frame>
            <Stack align="baseline">
                <Flex wrap={false} gap="sm" align="center">
                    <Wrench size="15px" />
                    <h3>Board Admin</h3>
                </Flex>
                <p>Paramètres administrateurs.</p>
                <Button
                    icon={Loader}
                    variant="outline"
                    onclick={() => recomputePoints()}>
                    Recalculer les points
                </Button>
            </Stack>
        </Frame>
    {/if}
</Flex>

<Toaster />

<style>
</style>
