<script lang="ts" generics="Item extends ListPrimitive">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { MetadataCard, ListPrimitive } from '$lib/types/types.d';
    import { Flex } from 'azucar-ui';
    import Category from '$lib/components/Category.svelte';
    import ChallengeCard from '$lib/components/ChallengeCard.svelte';

    type Props = HTMLAttributes<HTMLDivElement> & {
        list: Record<string, Item[]>;
        metadata: MetadataCard[];
    }

    let {
        list,
        metadata,
        children
    }: Props = $props();

    // si la liste contient des catégories
    const isFlat = $derived(Object.keys(list).length == 1);

    // navigations and paging
    let page = $state(0);
    let showPerPage = $derived(!isFlat ? 8 : 25);
    const maxPage: number = $derived.by(() => {
        if (!isFlat) {
            return Math.max(0, Math.ceil(Object.keys(list).length / showPerPage) - 1);
        } else {
            return Math.max(0, Math.ceil(Object.values(list).length / showPerPage) - 1);
        }
    });

    // final list
    const renderList = $derived(
        Object.entries(list).slice(page * showPerPage, (page + 1) * showPerPage)
    );
</script>

<Flex
    gap="xs"
    direction="column"
    style="max-width: 100%; width: 100%;"
    wrap={false}
>
    <Flex
        gap="xs"
        direction="column"
        style="max-width: 100%; width: 100%;"
        wrap={false}
    >
        {#if !isFlat}
            {#each renderList as [key, values]} 
                <Category 
                    name={key} 
                    src={values[0]?.url} 
                    folded={false}
                > 
                    {#each values as value (value.id)} 
                        {@render card(value)} 
                    {/each} 
                </Category> 
            {/each}
        {:else}
            {@const paginatedChallenges = list[0].slice(page * showPerPage, (page + 1) * showPerPage)}
            {#each paginatedChallenges as value (value.id)} 
                {@render card(value)} 
            {/each}
        {/if}
    </Flex>
</Flex>

{#snippet card(value: Item)}
    <ChallengeCard
        title={value.text}
        points={value.points}
        badges={metadata}
    >
        {#snippet header()}
            {#if value.url}
                <img src={value.url} alt={value.alt} loading="lazy" />
            {/if}
        {/snippet}
        {#snippet content()}
            <p><b>Description :</b> {value.description}</p>
            {#if children}
                {@render children()}
            {/if}
        {/snippet}
    </ChallengeCard>
{/snippet}
