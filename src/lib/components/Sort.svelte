<script lang="ts">
    import { ArrowUp, ArrowDown } from "@lucide/svelte";
    import { Button, Flex } from "azucar-ui";
    import Select from '$lib/components/Select.svelte';

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

    const capitalizedOptions = $derived(options.map(capitalizeFirstLetter));

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

<Flex wrap={false} gap="xxs" style="flex-grow: 1;">
    <Select
        options={capitalizedOptions}
        bind:value={bind}
        outline={true}
        id="sort-select"
    />
    <Button
        variant="outline"
        icon={isDesc ? ArrowUp : ArrowDown}
        onclick={() => flipSortType()}
    />
</Flex>
