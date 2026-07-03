<script lang="ts">
    import { Flex, Frame, Button } from "azucar-ui";
    import { Trophy, Settings, Wrench, ImageUp } from "@lucide/svelte";
    import Profile from "$lib/components/Profile.svelte";
    import ButtonNotification from "$lib/components/ButtonNotification.svelte";

    const dotSize = "15px";

    type Props = {
        firstName: string;
        lastName: string;
        picture: string;
        accessAdmin: boolean;
        notificationsDefis?: number;
        notificationsPreuves?: number;
    };

    const {
        firstName,
        lastName,
        picture,
        accessAdmin,
        notificationsDefis,
        notificationsPreuves,
    }: Props = $props();

    // const username = $derived(user?.name ?? 'Invité');
    // const [firstName, ...reste] = $derived(username.split(" "))
    // const lastName = $derived(reste.join(" "))
</script>

<div class="sticky">
    <Frame transparent={true} border={true} shadow={true}>
        <Flex justify="space-between" align="center" wrap={false}>
            <Flex align="center" gap="md">
                <Profile {firstName} {lastName} src={picture} hideName={true} size="xl" />
            </Flex>
            <Flex wrap={false} gap="xs" align="center">
                <Button href="/leaderboard" icon={Trophy}>
                    <span class="hide-small">Classement</span>
                </Button>
                {#if accessAdmin}
                    <ButtonNotification
                        href="/board"
                        icon={Wrench}
                        variant="outline"
                        notifications={notificationsDefis}
                    ></ButtonNotification>
                    <ButtonNotification
                        href="/proof"
                        icon={ImageUp}
                        variant="outline"
                        notifications={notificationsPreuves}
                    ></ButtonNotification>
                {/if}
                <Button href="/settings" icon={Settings} variant="outline"
                ></Button>
            </Flex>
        </Flex>
    </Frame>
</div>

<style>
    .sticky {
        position: sticky;
        top: 0;
        padding: 10px;
        z-index: 100;
    }

    @media (max-width: 600px) {
        .hide-small {
            display: none;
        }
    }
</style>
