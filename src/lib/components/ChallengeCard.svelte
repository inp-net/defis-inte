<script lang="ts">

    import { Frame, Flex, Badge } from "azucar-ui";
    
    export interface MetadataItem {
        name: string;
        icon?: Component;
        values: string[];
    }

    interface Props {
        // Titre
        title: string;
        // points
        points: number;
        // Affichage du summary
		header?: import("svelte").Snippet;
        // Affichage du contenue
		content?: import("svelte").Snippet;
        // Affichage des actions
		actions?: import("svelte").Snippet;
        // Affichage des métadonnées du challenge
        badges?: MetadataItem[];
        // Est par défaut unfold ?
        isUnfolded: boolean;
	};

    let {
        title,
        points,
        header,
        content,
        actions,
        badges = [],
        isUnfolded = false
    }: Props = $props();

</script>

<!--
    @component
    Composant universel pour afficher des défis. Permet d'être consistant et
    simple. L'affichage est dynamique.
-->

<Frame
    border={true}
    style="display: flex; align-content: center; flex-direction: column;"
>
    <Flex direction="column" wrap={false} gap="md">
        <details class="challenge-details" open={isUnfolded}>
            <!-- le clique de ce composant est étendue pour plus de confort -->
            <summary class="no-style clickable-header" style="width: 100%;">
                <Flex
                    justify="space-between"
                    align="center"
                    gap="sm"
                    wrap={false}
                    style="max-width: 100%; min-width: 0; overflow: hidden; flex-grow: 1;"
                >
                    {#if header}
                        {@render header()}
                    {/if}
                    <div class="scrollable" style="min-width: 0;">
                        <p>{title}</p>
                    </div>
                    <Flex
                        style="flex-shrink: 0; margin-between: auto; margin-left: auto;"
                        align="baseline"
                    >
                        <p><b>{points} pts</b></p>
                    </Flex>
                </Flex>
            </summary>

            <Flex direction="column" gap="sm">
                <p></p>
                <hr />
                <Flex gap="lg" direction="column" wrap={false}>
                    <Flex direction="column" gap="xs">
                        {#each badges as badge}
                            <Flex gap="xs" align="center">
                                {#if badge.icon}
                                    {@const Icon = badge.icon}
                                    <Icon size={14} />
                                {/if}
                                <p>{badge.name} : </p>
                                {#each badge.values as value}
                                    <Badge>{value}</Badge>
                                {/each}
                            </Flex>
                        {/each}
                    </Flex>
                    {#if content}
                        {@render content()}
                    {/if}
                </Flex>
            </Flex>
        </details>

        {#if actions}
            {@render actions()}
        {/if}
    </Flex>
</Frame>

<style>
    hr {
        border: none;
        border-top: 1px solid var(--color-border, #eaeaea);
        margin: var(--size-xs, 8px) 0;
        width: 100%;
    }

    .challenge-details {
        position: relative;
        overflow: visible;
    }

    .challenge-details summary::-webkit-details-marker,
    .challenge-details summary::marker {
        display: none;
        content: "";
    }

    .no-style {
        position: relative;
        display: block;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        flex-grow: 1;
        -webkit-tap-highlight-color: transparent;
        background-color: transparent !important;
        touch-action: manipulation;
        list-style: none;
    }

    .no-style:focus,
    .no-style:active {
        background-color: transparent !important;
        outline: none;
    }

    .clickable-header::before {
        content: "";
        position: absolute;
        top: -16px;
        bottom: -16px;
        left: -16px;
        right: -16px;
        z-index: 10;
        pointer-events: auto;
    }
</style>
