<script lang="ts">
    import type {
        HTMLSelectAttributes,
        HTMLInputAttributes,
    } from "svelte/elements";
    import { ChevronDown } from "@lucide/svelte";

    type Props = (HTMLSelectAttributes & HTMLInputAttributes) & {
        options: string[];
        value: string;
        placeholder?: string;
        disabled?: boolean;
        id?: string;
        type?: "select" | "datalist";
        outline?: boolean;
    };

    let {
        options = [],
        value = $bindable(),
        children,
        placeholder,
        disabled = false,
        type = "select",
        id,
        class: className,
        outline = false,
        ...rest
    }: Props = $props();

    let selectRef: HTMLSelectElement | null = $state(null);

    const datalistId = $derived(id);

    const classes = $derived(
        ["text-input", outline && "text-outline", className]
            .filter(Boolean)
            .join(" "),
    );

    function handleWrapperClick(e: MouseEvent) {
        if (disabled || type === "datalist") return;
        
        // If user clicks the outer padding/pseudo-element rather than directly on <select>
        if (e.target !== selectRef && selectRef) {
            selectRef.focus();
            if ("showPicker" in selectRef) {
                selectRef.showPicker();
            }
        }
    }
</script>

<!--
    @component
    Composant généré par IA pour suivre la librairie d'UI Azucar UI rapidement.
    Ce composant sera retravaillé pour être intégré à la librairie de
    componsants.
    Composant pour rechercher parmi une liste déjà prédéfinie. Utilisé par
    exemple pour la séléction d'un club parmi tous les clubs.
    Ce composant peut agit comme :
    - un select : navigation dans une liste
    - un datalist : l'utilisateur écrit et le composant lui suggère la suite.
-->

<label class={classes}>
    {#if children}
        <span class="label">
            {@render children?.()}
            {#if rest.required}
                <span class="required-star" aria-hidden="true">*</span>
            {/if}
        </span>
    {/if}

    <button 
        type="button"
        class="input-wrapper nostyle" 
        data-disabled={disabled}
        onclick={handleWrapperClick}
        {disabled}
    >
        {#if type === "datalist"}
            <input
                type="text"
                bind:value
                {disabled}
                {placeholder}
                list={datalistId}
                {...rest}
            />
            <datalist id={datalistId}>
                {#each options as option}
                    <option value={option}>{option}</option>
                {/each}
            </datalist>
        {:else}
            <select bind:this={selectRef} bind:value {disabled} {...rest}>
                {#if placeholder}
                    <option value="" disabled selected>{placeholder}</option>
                {/if}
                {#each options as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>

            <ChevronDown size="1em" class="select-chevron" />
        {/if}
    </button>
</label>

<style>
    .text-input {
        display: inline-flex;
        flex-direction: column;
        gap: var(--size-xxs);
        width: 100%;
    }

    .label {
        font: inherit;
        width: 100%;
    }

    @media (min-width: 600px) {
        .text-input {
            width: 25%;
        }
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        color: var(--color-fg-low);
        line-height: 1.25;
        font: inherit;
        padding: var(--padding-y-icon) var(--size-md);
        background-color: var(--color-bg-subtle);
        box-shadow: inset 0 0 0 1px var(--color-border);
        border-radius: var(--corner-radius);
        transition:
            opacity 0.2s ease,
            box-shadow 0.2s ease;
        cursor: pointer;
    }

    .input-wrapper::before {
        content: "";
        position: absolute;
        top: -12px;
        bottom: -12px;
        left: -12px;
        right: -12px;
        pointer-events: auto;
    }

    :global(.input-wrapper .select-chevron) {
        position: absolute;
        right: var(--size-md);
        pointer-events: none;
        z-index: 2;
    }

    .input-wrapper select,
    .input-wrapper input {
        width: 100%;
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;
        font: inherit;
        line-height: inherit;
        color: inherit;
        outline: none;
        cursor: inherit;
        position: relative;
        z-index: 1;
    }

    .input-wrapper:has(select:focus-visible, input:focus-visible):not(
            [data-disabled="true"]
        ) {
        box-shadow: inset 0 0 0 1px var(--color-border-focus);
    }

    .input-wrapper[data-disabled="true"] {
        --base-color: var(--color-neutral);
        cursor: not-allowed;
        box-shadow: inset 0 0 0 1px var(--color-border-subtle);
        background-color: var(--color-bg);
    }

    .input-wrapper[data-disabled="true"] select,
    .input-wrapper[data-disabled="true"] input {
        cursor: not-allowed;
        color: var(--color-border-subtle);
    }

    .required-star {
        color: var(--color-danger);
    }

    .input-wrapper select:focus-visible,
    .input-wrapper input:focus-visible {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 4px;
    }

    .text-outline .input-wrapper {
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        box-shadow:
            0 0 0 1px var(--color-border) inset,
            var(--shadow-surface);
    }

    .text-outline .input-wrapper:hover:not([data-disabled="true"]) {
        background-color: var(--color-bg-hover);
    }

    .text-outline .input-wrapper:has(select:active, input:active):not([data-disabled="true"]) {
        color: var(--color-fg-low);
        background-color: var(--color-bg-active);
        box-shadow:
            0 0 0 1px var(--color-border-focus) inset,
            var(--shadow-surface);
        scale: var(--active-scale-factor);
    }

    .text-outline .input-wrapper:has(select:focus-visible, input:focus-visible):not([data-disabled="true"]) {
        box-shadow: var(--shadow-surface);
    }

    .text-outline .input-wrapper[data-disabled="true"] {
        --base-color: var(--color-neutral);
        color: var(--color-border-subtle);
        background: var(--color-bg);
        cursor: not-allowed;
    }

    .nostyle {
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        border: none;
        margin: 0;
        font: inherit;
        color: inherit;
        text-align: left;
    }

    .nostyle:disabled,
    .nostyle[data-disabled="true"] {
        cursor: not-allowed;
    }

    .nostyle:focus-visible {
        outline: none;
    }
</style>
