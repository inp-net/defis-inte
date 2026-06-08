<script lang="ts">

    import { ArrowDownUp, ArrowUp, ArrowDown } from '@lucide/svelte';
    import { Button, Flex } from 'azucar-ui';

    type Props = {
        bind: string,
        options: string[],
        onSorted?: (option: string, desc: boolean) => void;
    }

    let {
        bind = $bindable(),
        options = [],
        onSorted
    }: Props = $props();

    let descSort = $state(true);

    function capitalizeFirstLetter(val : string) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    /** Fonction qui récupère le click sur le composant.
     * Appel la fonction onSorted spécifié en paramètre.
     * @param option: string l'option cliqué.
     */
    function handleInternalClick(option: string) {
        onSorted?.(option, descSort);
    }

    /** FlipFlop pour trier dans l'ordre croissant ou décroissant. */
    function flipSortType() {
        descSort = !descSort;
        onSorted?.(bind, descSort);
    }

</script>

<Flex>
<!-- <Button variant="outline" icon={ArrowDownUp}> -->
<!--     <select> -->
<!--     <h4>Trier</h4> -->
<!--     </select> -->
<!-- </Button> -->

    <Button variant="outline">
        
        {#if descSort}
            <ArrowUp size="20px" onclick={() => flipSortType()} />
        {:else}
            <ArrowDown size="20px" onclick={() => flipSortType()}/>
        {/if}

        <select bind:value={bind} class="select-invisible" onclick={() => handleInternalClick(bind)}>
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
