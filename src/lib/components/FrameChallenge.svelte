<script lang="ts">
    import { ChevronDown, ChevronUp, Upload } from '@lucide/svelte';
    import { Frame, Flex, Button } from 'azucar-ui';
    import UploadProof from './UploadProof.svelte';
    
    type Prop = {
        name: string
        nbPoints: number
        isText: boolean
        desc?: string | null
    }

    const {
        name = "",
        nbPoints = 0,
        isText = true,
        desc,
    }: Prop = $props();

    let isUnfolded = $state(false);

</script>

<Frame border={true} shadow={true}>
    <button class="no-style" onclick={() => isUnfolded = !isUnfolded}>
    <Flex justify="space-between" align="center" wrap={false} style="max-width: 100%; min-width: 0; overflow: hidden">
        <div class="scrollable" style="min-width: 0;">
            <p>{name}</p>
        </div>
        <Flex style="flex-shrink: 0; margin-between: auto; margin-left: auto;" align="center">
            <p><b>{nbPoints} pts</b></p>
            <!-- <Button icon={isUnfolded ? ChevronUp : ChevronDown} onclick={() => isUnfolded = !isUnfolded} ></Button> -->
        </Flex>
    </Flex>
    </button>

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

<style>
    .scrollable {
        padding: var(--size-xxs) 0px; 
        width: 100%; 
        overflow-x: auto; 
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }

    .scrollable p {
        white-space: nowrap;
        margin: 0;
    }

    .scrollable::-webkit-scrollbar { 
        display: none; 
    }

    .no-style {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
</style>
