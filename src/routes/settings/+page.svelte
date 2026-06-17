<script lang="ts">
    import { Flex, Stack, Frame, Button, Switch } from "azucar-ui";
    import BackButton from "$lib/components/BackButton.svelte";
    import { Power } from "@lucide/svelte";
    import { signOut } from "@auth/sveltekit/client";
    import { goto } from "$app/navigation";

    let { data } = $props();

    let darkMode = $state(data.user?.darkMode ?? false);
    let okTVn7 = $state(data.user?.isOkTVn7 ?? false);

    async function darkModeChange() {
        try {
            const formData = new FormData();
            formData.append("darkMode", darkMode.toString());

            const response = await fetch("?/modifyDarkMode", {
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
                window.location.reload();
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
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack align="baseline">
        <BackButton />
        <h2>Paramètres</h2>
        <p>Paramètres de l'application</p>
        <Flex direction="column">
            <Flex>
                <Switch bind:checked={darkMode} onchange={darkModeChange}
                ></Switch>
                <p>Thème sombre</p>
            </Flex>
            <Flex>
                <Switch bind:checked={okTVn7} onchange={okTVn7Change}></Switch>
                <p>
                    Autoriser automatiquement TVN7 à utiliser les médias
                    transmis*
                </p>
            </Flex>
            <Flex>
                <Button
                    icon={Power}
                    onclick={() => signOut({ redirectTo: "/" })}
                    >Se déconnecter</Button
                >
            </Flex>
        </Flex>
        <!-- TODO remplir les explications TVN7-->
        <p>* explications</p>
    </Stack>
</Flex>

<style>
</style>
