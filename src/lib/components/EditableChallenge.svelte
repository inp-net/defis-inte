<script lang="ts">

    import { Flex, Frame, Button } from 'azucar-ui';
    import { Check, XIcon } from '@lucide/svelte'
    
    type Props = {
        challengeId: number
        isApprouved?: boolean
        isDisabled?: boolean
        name: string
        points: number
        onAccepted: () => void
        onDeleted: () => void
    };

    let {
        challengeId,
        isApprouved,
        isDisabled,
        name,
        points,
        onAccepted,
        onDeleted
    }: Props = $props();

</script>

<Frame>
    <Flex justify="space-between" align="center" gap="md">
        <!-- Section défi -->
        <Flex wrap={false} gap="xs">
            {#if isApprouved}
                <Check />
            {:else if isDisabled}
                <XIcon />
            {/if}
            <p>{name}</p>
            <p><b>{points} points</b></p>
        </Flex>
        <Flex style="flex-shrink: 0; margin-left: auto;" gap="xs">
        <!-- Section Bouton du défis, valider et refuser -->
            <Button href="/challenge/{challengeId}" variant="outline"> Modifier </Button>
            <Button
                icon={XIcon}
                class="danger"
                name="Delete"
                disabled={isApprouved || isDisabled}
                onclick={onDeleted(challengeId)}
            />
            <Button
                icon={Check}
                class="success"
                name="Success"
                disabled={isApprouved || isDisabled} 
                onclick={onAccepted(challengeId)}
            />
        </Flex>
    </Flex>
</Frame>
