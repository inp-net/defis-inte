<script lang="ts">
    import type { Icon } from '@lucide/svelte';
    import { Button } from 'azucar-ui';

    type Props = (AnchorProps | ButtonProps) & {
        variant?: 'default' | 'outline' | 'ghost';
        icon?: typeof Icon;
        notifications?: number;
    };

    let {
        variant = 'default',
        disabled = false,
        href,
        icon,
        class: className,
        children,
        notifications = 0,
        ...rest
    }: Props = $props();
</script>

<div class="button-container">
    <Button
        icon={icon} 
        variant={variant}
        disabled={disabled}
        href={href}
    >
    </Button>

    {#if notifications > 0}
        <span class="notification-badge">
            {notifications > 99 ? '99+' : notifications}
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
