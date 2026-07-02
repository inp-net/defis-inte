<script lang="ts">
    import { ArrowUp, ArrowDown } from "@lucide/svelte";
    import { Button, Flex } from "azucar-ui";

    type Props = {
        bind: string;
        options: string[];
        isDesc: boolean;
        onSorted?: (option: string, desc: boolean) => void;
    };

    let {
        bind = $bindable(),
        options = [],
        isDesc = $bindable(true),
        onSorted,
    }: Props = $props();

    function capitalizeFirstLetter(val: string) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    /** Fonction qui récupère le click sur le composant.
     * Appel la fonction onSorted spécifié en paramètre.
     * @param option: string l'option cliqué.
     */
    function handleInternalClick(option: string) {
        onSorted?.(option, isDesc);
    }

    /** FlipFlop pour trier dans l'ordre croissant ou décroissant. */
    function flipSortType() {
        isDesc = !isDesc;
        onSorted?.(bind, isDesc);
    }
</script>

<!--
    @component
    Composant pour faire un filtre parmi une selection.
-->

<Flex>
    <Button variant="outline">
        {#if isDesc}
            <ArrowUp size="20px" onclick={() => flipSortType()} />
        {:else}
            <ArrowDown size="20px" onclick={() => flipSortType()} />
        {/if}

        <select
            bind:value={bind}
            class="select-invisible"
            onclick={() => handleInternalClick(bind)}
        >
            {#each options as option}
                <option value={option}>{capitalizeFirstLetter(option)}</option>
            {/each}
        </select>
    </Button>
</Flex>

<style>
    select.select-invisible {
        background: transparent;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        outline: none;
        padding-left: 5px;
    }
</style>
