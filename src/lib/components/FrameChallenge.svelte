<script lang="ts">
    import { TextAlignStart,Files } from "@lucide/svelte";
    import { Frame, Flex } from "azucar-ui";
    import UploadProof from "./UploadProof.svelte";
    import { Churros1ATo2A } from "$lib/env";

    type Prop = {
        challengeId: number;
        name: string;
        nbPoints: number;
        clubName: string;
        clubUrl: string;
        desc: string;
        type: string;
        onSave: (
            fichiers: FileList | null,
            textePreuve: string,
            type: string,
            isOkTVn7: boolean,
            challengeId: number,
        ) => void;
        defaultTVn7: boolean;
        isEnabled: boolean;
        isConnected: boolean;
        children?: import("svelte").Snippet;
    };

    const {
        challengeId = 0,
        name = "",
        nbPoints = 0,
        clubName,
        clubUrl,
        desc = "",
        type,
        onSave,
        defaultTVn7 = false,
        isConnected = false,
        isEnabled,
        children,
    }: Prop = $props();
</script>

<!--
    @component
    Composant FrameChallenge est le composant qui permet de lire
    et d'envoyer les challenges. Il est présent dans la page
    d'acceuil. Il peut être unfold.
-->

<Frame
    border={true}
    style="padding: 6px 10px; display: flex; align-content: center; flex-direction: column;"
>
    <details class="challenge-details">
        <summary class="no-style clickable-header" style="width: 100%;">
            <!-- Forcer max-width et min-width permet de ne pas dépasser de l'écran et de laisser le nom avoir un scroll -->
            <Flex
                justify="space-between"
                align="center"
                gap="sm"
                wrap={false}
                style="max-width: 100%; min-width: 0; overflow: hidden; flex-grow: 1;"
            >
                {#if clubUrl}
                    <img src={clubUrl} alt={clubName} />
                {:else}
                    <!-- espacement vertical qui remplace l'image -->
                    <span style="display: inline-block; height: 2.5em;"></span>
                {/if}
                <!-- Le nom peut être scroll horizontalement si il y a pas de places -->
                <div class="scrollable" style="min-width: 0;">
                    <p>{name}</p>
                </div>
                <!-- Le margin left permet de mettre à droite le nombre de points -->
                <!-- Le flex-shrink à 0 permet d'empêcher le nombre de points de diminuer de taille pour forcer le horizontal scroll du nom -->
                <Flex
                    style="flex-shrink: 0; margin-between: auto; margin-left: auto;"
                    align="baseline"
                >
                    <p><b>{nbPoints} pts</b></p>
                </Flex>
            </Flex>
        </summary>

        <div class="panel-content">
            <div style="border-top: 1px solid #eaeaea; width: 95%;">
                <Flex direction="column" gap="md">
                    <Flex gap="xs" direction="column">
                        {#if children}
                            <Flex
                                direction="column"
                                wrap={false}
                                gap="xxs"
                                style="padding: 10px 0;"
                            >
                                {@render children()}
                            </Flex>
                        {/if}
                        <Flex gap="xs" align="center">
                            <TextAlignStart size="15px" /><b>Description :</b>
                            {desc}
                        </Flex>
                    </Flex>
                    {#if isEnabled}
                        <UploadProof
                            {challengeId}
                            {desc}
                            {type}
                            {onSave}
                            {defaultTVn7}
                        ></UploadProof>
                    {:else if !isConnected}
                        <span>Connectez-vous pour réaliser le défi</span>
                    {/if}
                </Flex>
            </div>
        </div>
    </details>
</Frame>

<style>
    .challenge-details summary::-webkit-details-marker,
    .challenge-details summary::marker {
        display: none;
        content: "";
    }

    .panel-content {
        padding: 10px 0 10px 10px;
    }

    img {
        width: var(--size-xl);
        height: var(--size-xl);
        border-radius: var(--size-xl);
        object-fit: cover;
    }

    .scrollable {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }

    .scrollable p {
        white-space: nowrap;
        margin: 0;
        text-align: left;
    }

    .scrollable::-webkit-scrollbar {
        display: none;
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
        top: -12px;
        bottom: -12px;
        left: -12px;
        right: -12px;
        z-index: 1;
    }
</style>
