<script lang="ts" generics="Item extends ListPrimitive">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { MetadataCard, ListPrimitive } from '$lib/types/types.d';
    import { Flex } from 'azucar-ui';
    import type { Snippet } from 'svelte';
    import Category from '$lib/components/Category.svelte';
    import ChallengeCard from '$lib/components/ChallengeCard.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import Sort from '$lib/components/Sort.svelte';
    import PageNavigation from '$lib/components/PageNavigation.svelte';

    type SortOption = {
        label: string;
        comparator: (a: Item, b: Item) => number;
        groupBy?: (item: Item) => string;
        categoryUrl?: (item: Item) => string;
    };

    type Props = HTMLAttributes<HTMLDivElement> & {
        items: Item[];
        metadata?: (c: Item) => MetadataCard[];
        sortOptions?: SortOption[];
        getSearchableText?: (item: Item) => string;
        children?: Snippet<[Item]>;
        actionsSnippet?: Snippet<[Item]>;
    };

    // option pour tirer
    const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

    const defaultSortOptions: SortOption[] = [
        {
            label: 'Points',
            comparator: (a, b) => b.points - a.points || collator.compare(a.text, b.text),
            groupBy: () => 'Général'
        },
        {
            label: 'Titre',
            comparator: (a, b) => collator.compare(a.text, b.text),
            groupBy: () => 'Général'
        },
        {
            label: 'Catégorie',
            comparator: (a, b) => collator.compare(a.alt ?? '', b.alt ?? '') || b.points - a.points,
            groupBy: (item) => item.alt || 'Autres'
        }
    ];

    let {
        items,
        metadata,
        children,
        actionsSnippet,
        sortOptions = defaultSortOptions,
        getSearchableText = (item: Item) => `${item.text} ${item.alt ?? ''} ${item.description ?? ''}`
    }: Props = $props();

    // recherche
    let searchValue = $state('');
    let sortBind = $state(sortOptions[0]?.label ?? '');
    let isSortDesc = $state(true);
    let page = $state(0);

    const activeSortOption = $derived(
        sortOptions.find((opt) => opt.label === sortBind) ?? sortOptions[0]
    );

    // filtrage
    const filteredItems = $derived.by(() => {
        const query = searchValue.trim().toLowerCase();
        if (!query) return items;
        return items.filter((item) => getSearchableText(item).toLowerCase().includes(query));
    });

    // trie
    const sortedItems = $derived.by(() => {
        const list = [...filteredItems];
        const multiplier = isSortDesc ? 1 : -1;
        const compareFn = activeSortOption.comparator;

        return list.sort((a, b) => multiplier * compareFn(a, b));
    });

    // groupage pour les catégories
    const groupedList = $derived.by(() => {
        const groups: Record<string, Item[]> = {};
        const groupFn = activeSortOption.groupBy ?? (() => 'Général');

        for (let i = 0; i < sortedItems.length; i++) {
            const item = sortedItems[i];
            const key = groupFn(item);
            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
        }
        return groups;
    });

    // pagination
    const isFlat = $derived(Object.keys(groupedList).length <= 1);
    const showPerPage = $derived(!isFlat ? 8 : 25);

    const maxPage: number = $derived.by(() => {
        const total = isFlat ? sortedItems.length : Object.keys(groupedList).length;
        return Math.max(0, Math.ceil(total / showPerPage) - 1);
    });

    $effect(() => {
        searchValue;
        sortBind;
        isSortDesc;
        page = 0;
    });

    const renderCategories = $derived(
        Object.entries(groupedList).slice(page * showPerPage, (page + 1) * showPerPage)
    );
</script>

<Flex gap="xl" wrap={true} justify="center" align="center" style="width: 100%;">
    <Flex gap="xxs" wrap={true} style="margin-right: auto;">
        <SearchBar bind:value={searchValue} />
        <Sort
            bind:bind={sortBind}
            options={sortOptions.map((o) => o.label)}
            bind:isDesc={isSortDesc}
        />
    </Flex>

    <PageNavigation bind:page {maxPage} />
</Flex>

<Flex gap="xs" direction="column" style="max-width: 100%; width: 100%;" wrap={false}>
    {#if !isFlat}
        {#each renderCategories as [key, values]}
            <Category
                name={key}
                src={sortOptions?.find((s) => s.label === sortBind)?.categoryUrl?.(values[0])}
                folded={false}
            >
                {#each values as value (value.id)}
                    {@render card(value)}
                {/each}
            </Category>
        {/each}
    {:else}
        {@const paginatedItems = sortedItems.slice(page * showPerPage, (page + 1) * showPerPage)}
        {#each paginatedItems as value (value.id)}
            {@render card(value)}
        {/each}
    {/if}
</Flex>

{#if maxPage > 0}
    <PageNavigation bind:page {maxPage} />
{/if}

{#snippet card(value: Item)}
    <ChallengeCard
        title={value.text}
        points={value.points}
        badges={metadata?.(value)}
    >
        {#snippet header()}
            {#if value.url}
                <img src={value.url} alt={value.alt} loading="lazy" />
            {/if}
        {/snippet}

        {#snippet content()}
            {#if children}
                {@render children(value)}
            {:else if value.description}
                <p><b>Description :</b> {value.description}</p>
            {/if}
        {/snippet}

        {#snippet actions()}
            {#if actionsSnippet}
                {@render actionsSnippet(value)}
            {/if}
        {/snippet}
    </ChallengeCard>
{/snippet}

<style>
    img {
        width: var(--size-lg);
        height: var(--size-lg);
        border-radius: var(--size-xl);
        object-fit: cover;
    }
</style>
