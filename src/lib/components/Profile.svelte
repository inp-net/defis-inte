<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { Flex, Avatar } from "azucar-ui";
    type Size = ComponentProps<typeof Avatar>["size"];
    // import type { Size } from "azucar-ui/types";

    type Props = {
        src?: string;
        size?: Size;
        firstName: string;
        lastName: string;
        groupName?: string;
    };

    const {
        src,
        size = "xl",
        firstName,
        lastName,
        groupName,
    }: Props = $props();

    let name = $derived(firstName + " " + lastName);
</script>

<!--
    @component
    Composant Profile met l'avatar et le nom et prénom d'un utilisateur.
-->

<a href="/profile" class="profile-link">
    <Flex align="center" gap="md">
        <Avatar {src} alt={name} {size} />
        <div class="info-container">
            <Flex direction="column" gap="xxs">
                <h4 class={`title-${size}`}>{firstName}</h4>
                <h4 class={`title-${size}`}>{lastName}</h4>
                <p>{groupName}</p>
            </Flex>
        </div>
    </Flex>
</a>

<style>
    .profile-link {
        text-decoration: none;
        color: inherit;
        display: block;
        max-width: 100%;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }

    .info-container {
        text-decoration: none;
        min-width: 0;
        flex: 1;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: thin;
    }

    .info-container h4,
    .info-container p {
        white-space: nowrap;
        margin: 0;
    }

    .title-large {
        font-size: var(--size-lg);
    }

    .title-small {
        font-size: var(--size-md);
    }
</style>
