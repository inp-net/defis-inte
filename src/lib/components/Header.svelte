<script lang="ts">
    import { Flex, Frame, Button } from "azucar-ui";
    import { Trophy, Settings, Wrench, ImageUp } from "@lucide/svelte";
    import Profile from "$lib/components/Profile.svelte";
    import ButtonNotification from "$lib/components/ButtonNotification.svelte";

    type Props = {
        firstName?: string;
        lastName?: string;
        groupName: string;
        picture?: string;
        accessAdmin: boolean;
        accessBoard: boolean;
        notificationsDefis?: number;
        notificationsPreuves?: number;
    };

    const {
        firstName = "",
        lastName = "",
        groupName = "",
        picture,
        accessAdmin,
        accessBoard,
        notificationsDefis,
        notificationsPreuves,
    }: Props = $props();
</script>

<div class="sticky">
    <!-- fix des paddings des frames pour être constant -->
    <Frame
        transparent={true}
        border={true}
        shadow={true}
        style="padding: var(--size-md) var(--size-md);"
    >
        <Flex justify="space-between" align="center" wrap={false}>
            <Flex align="center" gap="md">
                <Profile {firstName} {lastName} {groupName} src={picture} size="xl" />
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
                        disabled={false}
                    ></ButtonNotification>
                {/if}
                {#if accessAdmin || accessBoard}
                    <ButtonNotification
                        href="/proof"
                        icon={ImageUp}
                        variant="outline"
                        notifications={notificationsPreuves}
                        disabled={false}
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
