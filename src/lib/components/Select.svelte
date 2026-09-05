<script lang="ts">
    import type { HTMLSelectAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { ChevronDown } from '@lucide/svelte';

    type Props = HTMLSelectAttributes & {
        id: string;
        variant?: 'default' | 'outline';
        options?: string[];
        value?: string;
        disabled?: boolean;
        children?: Snippet;
    };

    let {
        id = '',
        variant = 'default',
        options = [],
        value = $bindable(),
        disabled = false,
        children,
        ...restProps
    }: Props = $props();
</script>

<label class="select-label" for={id}>
    {#if children}
        {@render children()}
    {/if}
    <div class="select-container select-{variant}" disabled={disabled}>
        <select
            class="select"
            bind:value={value}
            {id}
            {...restProps}
        >
            {#each options as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
        <div class="arrow" aria-hidden="true">
            <ChevronDown size="1.1em" />
        </div>
    </div>
</label>

<style>
    .select-label {
        display: inline-flex;
        flex-direction: column;
        gap: var(--size-xxs);
    }

    .select-container {
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: var(--corner-radius);
    }

    .select-default {
        color: var(--color-fg-solid);
        background: linear-gradient(
            in oklch to bottom,
            var(--color-bg-solid),
            var(--color-bg-solid-hover)
        );
        box-shadow: var(--shadow-surface);
    }

    .select-default:hover:not(:disabled) {
        background: linear-gradient(
            in oklch to bottom,
            var(--color-bg-solid-hover),
            var(--color-bg-solid-hover)
        );
    }

    .btn-default:disabled {
        --base-color: var(--color-neutral);
        color: var(--color-border-subtle);
        background: var(--color-bg);
        cursor: not-allowed;
    }

    .select-outline {
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        box-shadow:
            0 0 0 1px var(--color-border) inset,
            var(--shadow-surface);
    }

    .select-outline:hover:not(:disabled) {
        background-color: var(--color-bg-hover);
    }

    .select-outline:active:not(:disabled) {
        color: var(--color-fg-low);
        background-color: var(--color-bg-active);
        box-shadow:
            0 0 0 1px var(--color-border-focus) inset,
            var(--shadow-surface);
        scale: var(--active-scale-factor);
    }

    .select-outline:focus-visible:not(:disabled) {
        box-shadow: var(--shadow-surface);
    }

    .select {
        --active-scale-factor: 0.98;

        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font: inherit;
        font-weight: 800;
        line-height: 1.25;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        border: none;
        border-radius: var(--corner-radius);
        background: transparent;
        color: inherit;
        cursor: pointer;
        user-select: none;
        padding: var(--padding-y-icon) calc(var(--size-md) * 2) var(--padding-y-icon) var(--size-md);
        margin: 0 var(--size-xxs);

        /* Remove default browser arrow */
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .arrow {
        position: absolute;
        right: 0.75em;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
        pointer-events: none;
    }
</style>

