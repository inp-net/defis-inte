<script lang="ts">
    import { ChevronDown, ChevronUp, Upload, MapPin, Building, File } from '@lucide/svelte';
    import { Frame, Flex, Button, Avatar } from 'azucar-ui';
    import UploadProof from './UploadProof.svelte';
    
    type Prop = {
        challengeId: number,
        name: string,
        nbPoints: number,
        isText: boolean,
        location: string,
        clubName: string,
        clubUrl: string,
        desc?: string | null,
        type: string
        onSave: (fichiers: FileList | null, textePreuve: string, type: string, isOkTVn7: boolean, challengeId: number) => void;
    }

    const {
        challengeId = 0,
        name = "",
        nbPoints = 0,
        isText = true,
        location,
        clubName,
        clubUrl,
        desc,
        type,
        onSave,
    }: Prop = $props();

    let isUnfolded = $state(false);

    const initials = (str: string) =>
        str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('');

</script>

<Frame border={true}>
    <button class="no-style" style="width: 100%;" onclick={() => isUnfolded = !isUnfolded}>
        <!-- Forcer max-width et min-width permet de ne pas dépasser de l'écran et de laisser le nom avoir un scroll -->
        <Flex justify="space-between" align="center" gap="sm" wrap={false} style="max-width: 100%; min-width: 0; overflow: hidden; flex-grow: 1;">
            {#if clubUrl}
                <img src={clubUrl} alt={clubName} />
            {:else}
                <span class="initials">{initials(clubName)}</span>
            {/if}
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
            gap="md"
            style="
                margin-top: 8px; 
                width: 95%; 
                padding-top: 12px; 
                border-top: 1px solid #eaeaea;
            ">
                <Flex gap="xs" direction="column">
                    <Flex gap="xs" align="center"><Building size="15px"/> {clubName}</Flex>
                    <Flex gap="xs" align="center"><MapPin size="15px"/> {location}</Flex>
                    {#if (type != "TEXT")}
                        <Flex gap="xs" align="center"><File size="15px"/>{type}</Flex>
                    {/if}
                </Flex>
                <UploadProof challengeId={challengeId} desc={desc} type={type} onSave={onSave}></UploadProof>
            </Flex>
        {/if}
</Frame>

<style>
    .initials {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        color: var(--color-fg-solid);
        font-weight: bold;
        height: 100%;
        font-size: var(--size-sm);
        width: var(--size-lg);
        height: var(--size-lg);
        background-color: var(--color-bg-solid);
        border-radius: 100%;
    }

    img {
        width: var(--size-lg);
        height: var(--size-lg);
        object-fit: cover;
    }


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
