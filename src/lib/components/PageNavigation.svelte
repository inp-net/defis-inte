<script lang="ts">
    import { Flex, Button } from 'azucar-ui';
    import { ArrowLeft, ArrowRight } from '@lucide/svelte';

    type Props = {
        page: number;
        maxPage: number;
    };

    let {
        page = $bindable(0),
        maxPage = 0,
    }: Props = $props();

    let maxPagePrint = $derived(maxPage + 1);
    let pagePrint = $derived(page + 1);
</script>

<Flex align="center" style="margin: 0 auto">
    <Button
        onclick={() => page = Math.max(page - 1, 0)}
        disabled={page == 0}
        icon={ArrowLeft}
    />
    <Flex gap="xs" align="center">
        <p>Page </p>
        <input 
            type="number" 
            min="0" 
            max={maxPagePrint} 
            bind:value={pagePrint} 
            class="page-input"
        />
        <p> / {maxPagePrint}</p>
    </Flex>
    <Button
        onclick={() => page = Math.min(page + 1, maxPage)}
        disabled={page == maxPage}
        icon={ArrowRight}
    />
</Flex>

<style>
    .page-input {
        width: 50px;
        text-align: center;
        font-size: 1rem;
        border: none;
        outline: none;
        transition: border-color 0.2s;
        font-family: Atkinson Hyperlegible;
        color: var(--color-fg-high);
        background-color: transparent;
    }
</style>
