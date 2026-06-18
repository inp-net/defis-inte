<script lang="ts">
    import { Flex, Frame, Button } from "azucar-ui";
    import { Check, XIcon } from "@lucide/svelte";
    import { slide } from "svelte/transition";

    type Props = {
        /** Identifiant unique de l'élément. */
        id: number;
        /** Si true, l'élément est approuvé - désactive les boutons d'action et affiche un check.*/
        isApprouved?: boolean;
        /** Si true, l'élément est désactivé - désactive les boutons d'action et affiche une crois.*/
        isDisabled?: boolean;
        /** Nom affiché de l'élément. Horizontal scroll si dépasse.*/
        name: string;
        /** Nombre de points requis pour l'élément.*/
        points?: number;
        /** Si true, affiche un bouton "Modifier" avec le lien fourni.*/
        isModifiable: boolean;
        /** URL de destination pour le bouton "Modifier" (requis si isModifiable=true).*/
        modifiableURL: string;
        /** Callback déclenché lors de l'acceptation, reçoit l'id de l'élément.*/
        onAccepted: (id: number) => void;
        /** Callback déclenché lors du refus/suppression, reçoit l'id de l'élément.*/
        onDeleted: (id: number) => void;
        /** Cacher les boutons. */
        hideButtons: boolean
        /** Contenu optionnel affiché dans la zone pliable lorsqu'on clique sur l'en-tête.*/
        children?: import("svelte").Snippet;
    };

    let {
        id,
        isApprouved,
        isDisabled,
        name,
        points,
        isModifiable,
        modifiableURL,
        onAccepted,
        onDeleted,
        hideButtons = false,
        children,
    }: Props = $props();

    let showChildren = $state(false);
</script>

<!--
@component
Carte interactive pour afficher des éléments à valider, refuser ou modifier.
-->
<main class="custom-frame">
    <Frame style="overflow: visible">
        <Flex
            justify="space-between"
            gap="md"
            direction="column"
            style="width: 100%; max-width: 100%; min-width: 0;"
        >
            <button
                class="no-style"
                onclick={() => (showChildren = !showChildren)}
            >
                <Flex justify="space-between" align="center" gap="xs">
                    {#if isApprouved}
                        <Check style="flex-shrink: 0;" />
                    {:else if isDisabled}
                        <XIcon style="flex-shrink: 0;" />
                    {/if}

                    <div
                        class="scrollable-container"
                        style="flex: 1 1 0%; min-width: 0;"
                    >
                        <p class="scrollable-text">{name}</p>
                    </div>

                    {#if points}
                        <Flex style="margin-left: auto; flex-shrink: 0;">
                            <p style="text-wrap: nowrap;">
                                <b>{points} pts</b>
                            </p>
                        </Flex>
                    {/if}
                </Flex>
            </button>

            {#if children && showChildren}
                <div transition:slide={{ duration: 100 }}>
                    <hr />
                    {@render children()}
                </div>
            {/if}

            <Flex gap="xs" style="margin-left: auto; flex-shrink: 0;">
                {#if isModifiable}
                    <Button href={modifiableURL} variant="outline">
                        Modifier
                    </Button>
                {/if}
                {#if !hideButtons}
                    <Button
                        icon={XIcon}
                        class="danger"
                        name="Delete"
                        disabled={isDisabled}
                        onclick={() => onDeleted(id)}
                    />
                    <Button
                        icon={Check}
                        class="success"
                        name="Success"
                        disabled={isApprouved || isDisabled}
                        onclick={() => onAccepted(id)}
                    />
                {/if}
            </Flex>
        </Flex>
    </Frame>
</main>

<style>
    .custom-frame {
        border-radius: var(--corner-radius);
        padding: var(--size-xs) var(--size-xs);
        color: var(--color-fg-high);
        background-color: var(--color-bg-subtle);
        width: 100%;
        box-sizing: border-box;
        box-shadow: inset 0 0 0 1px var(--color-border);
    }

    hr {
        color: var(--color-border);
        margin: var(--size-md) 0;
    }

    .no-style {
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
    }

    .scrollable-container {
        flex: 1 1 0%;
        min-width: 0;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: var(--size-xxs) 0px;
    }

    .scrollable-container::-webkit-scrollbar {
        display: none;
    }

    .scrollable-text {
        white-space: nowrap;
        margin: 0;
        text-align: left;
        width: max-content;
    }
</style>
