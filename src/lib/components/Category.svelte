<script lang="ts">
    import { Flex } from "azucar-ui";
    import { ChevronDown, ChevronUp } from "@lucide/svelte";

    interface Props {
        name: string;
        list: string[];
        enabled: boolean;
    }

    let { name, list = $bindable(), enabled = false }: Props = $props();

    /** Ajoute dans la liste si n'est pas présent, supprime si présent. */
    function flipFlopAddList() {
        if (list.includes(name)) {
            list = list.filter((item) => item !== name);
            enabled = false;
        } else {
            list.push(name);
            enabled = true;
        }
    }
</script>

<button onclick={() => flipFlopAddList()}>
    <br />
    <Flex justify="space-between" align="center" margin="xs">
        <h4>{name}</h4>
        {#if enabled}
            <ChevronUp />
        {:else}
            <ChevronDown />
        {/if}
    </Flex>
    <hr />
    <br />
</button>

<style>
    br {
        padding: 0 var(--size-xl);
    }

    hr {
        display: block;
        height: 2px;
        color: var(--color-fg-high);
        background-color: var(--color-fg-high);
        border: none;
        border-radius: 1px;
    }

    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        width: 100%;
        min-width: 0;
        display: block;
        -webkit-tap-highlight-color: transparent;
    }
</style>
