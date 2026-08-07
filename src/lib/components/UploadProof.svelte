<script lang="ts">
    import { Flex, Button, TextInput, Switch, Frame } from "azucar-ui";

    type Prop = {
        challengeId: number;
        type: string;
        onSave: (
            fichiers: FileList | null,
            textePreuve: string,
            type: string,
            isOkTVn7: boolean,
            challengeId: number,
        ) => void;
        defaultTVn7?: boolean;
    };

    let fichiers = $state<FileList | null>(null);
    let textePreuve = $state("");

    function boutonvalider(
        fichiers: FileList | null,
        textePreuve: String,
        isText: Boolean,
    ) {
        if (isText) {
            return textePreuve.trim().length === 0;
        } else {
            return !fichiers || fichiers.length === 0;
        }
    }

    const {
        challengeId = 0,
        type = "TEXT",
        onSave,
        defaultTVn7 = false,
    }: Prop = $props();

    // Empecher la syncronisation
    let isOkTVn7 = $state((() => defaultTVn7)());
</script>

<Flex direction="column" gap="md">
    {#if type === "TEXT"}
        <TextInput
            type="text"
            placeholder="Saisissez votre réponse ici"
            value={textePreuve}
            oninput={(e) =>
                (textePreuve = (e.target as HTMLInputElement).value)}
        ></TextInput>
    {:else}
        <Frame style="border: dashed 2px;">
            <Flex align="center" >
                <input
                    type="file"
                    bind:files={fichiers}
                    accept=".png, .jpeg, .jpg, .mp4, .tif, .tiff, .avif, .heif, .heic, .webm, .mov, .webp, .gif"
                    style="width: 100%; cursor: pointer;"
                    multiple 
                />
            </Flex>
        </Frame>
    {/if}

    <Flex justify="flex-end" align="center">
        {#if type != "TEXT"}
            <Switch bind:checked={isOkTVn7}>
                <span class="scrollable"> J'autorise TVn7 à utiliser l'image. </span>
            </Switch>
        {/if}
        <Button
            onclick={() =>
                onSave(fichiers, textePreuve, type, isOkTVn7, challengeId)}
            disabled={boutonvalider(fichiers, textePreuve, type === "TEXT")}
        >
            Envoyer la preuve
        </Button>
    </Flex>
</Flex>

<style>

    .scrollable {
        display: inline-block;
        max-width: 250px;
        white-space: nowrap;
        overflow-x: auto;
        vertical-align: middle;
    }

</style>
