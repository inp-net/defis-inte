<script lang="ts">
    import { ChevronDown, ChevronUp, Upload } from '@lucide/svelte';
    import { Frame, Flex, Button } from 'azucar-ui';
    import UploadProof from './UploadProof.svelte';
    
    type Prop = {
        name: String
        nbPoints: Number
        isText: Boolean
        desc: String
    }

    const {
        name = '',
        nbPoints = 0,
        isText = true,
        desc = '',
    }: Prop = $props();

    let isUnfolded = $state(false);

</script>

<Frame>
    <Flex justify="space-between" align="center">
        <Flex wrap={false} style="flex: 1 1 auto; min-width: 150px; white-space: normal; word-break: break-word;" gap="xs">
            <p>{name}</p>
            <p><b>{nbPoints} points</b></p>
        </Flex>
        <Flex style="flex-shrink: 0; margin-between: auto; margin-left: auto;">
            <Button icon={isUnfolded ? ChevronUp : ChevronDown} onclick={() => isUnfolded = !isUnfolded} ></Button>
        </Flex>
    </Flex>

    {#if isUnfolded}
            <Flex 
            direction="column" 
            style="
                margin-top: 8px; 
                width: 95%; 
                padding-top: 12px; 
                border-top: 1px solid #eaeaea;
            ">
                <UploadProof desc={desc} isText={isText}></UploadProof>
            </Flex>
        {/if}
</Frame>