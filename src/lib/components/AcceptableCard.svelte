<script lang="ts">

    import { Flex, Frame, Button } from 'azucar-ui';
    import { Check, XIcon } from '@lucide/svelte'
    
    type Props = {
        id: number
        isApprouved?: boolean
        isDisabled?: boolean
        name: string
        points: number
        isModifiable: boolean
        modifiableURL: string
        onAccepted: (id: number) => void
        onDeleted: (id: number) => void
        children?: import('svelte').Snippet;
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
        children
    }: Props = $props();

    let showChildren = $state(false);

</script>

<div class="custom-frame">
    <Frame style="overflow: visible">
        <Flex justify="space-between" gap="md" direction="column" style="width: 100%; max-width: 100%; min-width: 0;">
            <div class="no-style" onclick={() => showChildren = !showChildren}>
                <div class="header-row">
                    {#if isApprouved}
                        <Check style="flex-shrink: 0;" />
                    {:else if isDisabled}
                        <XIcon style="flex-shrink: 0;" />
                    {/if}
                    
                    <div class="scrollable-container" style="flex: 1 1 0%; min-width: 0;">
                        <p class="scrollable-text">{name}</p>
                    </div>
                    
                    <Flex style="margin-left: auto; flex-shrink: 0;">
                        <p style="text-wrap: nowrap;"><b>{points} pts</b></p>
                    </Flex>
                </div>
            </div>
            
            {#if children && showChildren}
                <hr />
                {@render children()}
            {/if}
            
            <div class="actions-row">
                {#if isModifiable}
                    <Button href={modifiableURL} variant="outline"> Modifier </Button>
                {/if}
                <Button
                    icon={XIcon}
                    class="danger"
                    name="Delete"
                    disabled={isApprouved || isDisabled}
                    onclick={() => onDeleted(id)}
                />
                <Button
                    icon={Check}
                    class="success"
                    name="Success"
                    disabled={isApprouved || isDisabled} 
                    onclick={() => onAccepted(id)}
                />
            </div>
        </Flex>
    </Frame>
</div>

<style>
    .custom-frame {
        border-radius: var(--corner-radius);
        padding: var(--size-xs) var(--size-xs);
        color: var(--color-fg-high);
        background-color: var(--color-bg-subtle);
        width: 100%;
        box-sizing: border-box;
    }

    hr {
        color: var(--color-bg-subtle);
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

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--size-xs);
        width: 100%;
        min-width: 0;
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

    .points-text {
        flex-shrink: 0;
        white-space: nowrap;
    }

    .actions-row {
        display: flex;
        gap: var(--size-xs);
        margin-left: auto;
        flex-shrink: 0;
    }
</style>
