<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
    import type { Icon } from "@lucide/svelte";
    import { Button } from "azucar-ui";

    // Le LSP veut pas détecter disabled sans ça
    type AnchorProps = HTMLAnchorAttributes & { href: string, disabled: boolean };
    type ButtonProps = HTMLButtonAttributes & { href?: never, disabled: boolean };

    type Props = (AnchorProps | ButtonProps) & {
        variant?: "default" | "outline" | "ghost";
        icon?: typeof Icon;
        notifications?: number;
        href: string
        disabled?: boolean;
    };

    let {
        variant = "default",
        icon,
        notifications = 0,
        href,
        disabled = false,
    }: Props = $props();
</script>

<!--
    @component
    Composant bouton de Azucar-UI avec la possibilité de mettre un compteur de notifications.
-->

<div class="button-container">
    <Button {icon} {variant} {disabled} {href}></Button>

    {#if notifications > 0}
        <span class="notification-badge">
            {notifications > 99 ? "99+" : notifications}
        </span>
    {/if}
</div>

<style>
    .button-container {
        position: relative;
        display: inline-block;
        flex-grow: 1;
    }

    .notification-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10px;
        width: 10px;
        min-width: 20px;
        padding: 0 4px;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: #ef4444;
        pointer-events: none;
        font-size: var(--size-sm);
        color: white;
        padding: 10px;
        z-index: 100;
    }
</style>
