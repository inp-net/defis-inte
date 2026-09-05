<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { Flex, Stack } from "azucar-ui";
    import { ChevronDown, ChevronUp } from "@lucide/svelte";

    type Props = HTMLAttributes<HTMLDivElement> & {
        // Nom de la catégorie
        name: string;
        // Logo affiché dans la catégorie
        src?: string;
        // La catégorie est masquée
        folded?: boolean;
    }

    let { name, src, folded = true, children }: Props = $props();

    let isOpen = $state(!folded);

    $effect(() => {
        isOpen = !folded;
    });
</script>

<details bind:open={isOpen} style="margin: 0 0 var(--size-xl) 0">
    <summary>
        <Flex justify="space-between" align="center" margin="xs" wrap={false}>
            <Flex align="center" gap="md" wrap={false}>
                {#if src}
                    <img src={src} alt={name} />
                {/if}
                <h4>{name}</h4>
            </Flex>
            {#if isOpen}
                <ChevronUp />
            {:else}
                <ChevronDown />
            {/if}
        </Flex>
        <hr />
    </summary>
    <Stack gap="xs">
        {#if children}
            {@render children()}
        {/if}
    </Stack>
</details>

<style>
    img {
        height: 3em;
        width: 3em;
        border-radius: 100%;
    }

    hr {
        display: block;
        height: 2px;
        color: var(--color-fg-high);
        background-color: var(--color-fg-high);
        border: none;
        border-radius: 1px;
    }

    h4 {
        margin: 0;
        text-align: left;
    }

    summary {
        padding-bottom: 1em;
    }

    details summary::-webkit-details-marker {
        display:none;
    }

    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>
