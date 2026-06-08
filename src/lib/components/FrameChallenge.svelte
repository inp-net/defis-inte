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
    <button class="no-style" style="width: 100%;" onclick={() => isUnfolded = !isUnfolded}>
        <!-- Forcer max-width et min-width permet de ne pas dépasser de l'écran et de laisser le nom avoir un scroll -->
        <Flex justify="space-between" align="left" wrap={false} style="max-width: 100%; min-width: 0; overflow: hidden; flex-grow: 1;">
            <!-- Le nom peut être scroll horizontalement si il y a pas de places -->
            <div class="scrollable" style="min-width: 0;">
                <p>{name}</p>
            </div>
            <!-- Le margin left permet de mettre à droite le nombre de points -->
            <!-- Le flex-shrink à 0 permet d'empêcher le nombre de points de diminuer de taille pour forcer le horizontal scroll du nom -->
            <Flex style="flex-shrink: 0; margin-between: auto; margin-left: auto;" align="baseline">
                <p><b>{nbPoints} pts</b></p>
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
        flex-grow: 1;
    }

    .scrollable p {
        text-align: left;
    }
</style>
