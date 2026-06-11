<script lang="ts">

    import { Flex, Button, TextInput, Switch } from 'azucar-ui'

    type Prop = {
        challengeId: number
        desc: String
        type: string
        onSave: (fichiers: FileList | null, textePreuve: string, type: string, isOkTVn7: boolean, challengeId: number) => void;
    }

    let fichiers = $state<FileList | null>(null);
    let textePreuve = $state("");

    let isOkTVn7: boolean = $state(false);

    function boutonvalider(fichiers: FileList | null, textePreuve: String, isText: Boolean){
        if (isText){
            return textePreuve.trim().length === 0;
        } else {
            return !fichiers || fichiers.length === 0;
        }
    }

    const {
        challengeId = 0,
        desc = '',
        type = "TEXT",
        onSave,
    }: Prop = $props();
</script>

<Flex direction="column" gap="md">
    <p><b>Description :</b> {desc}</p>
    {#if type === "TEXT"}
        <TextInput 
            type="text"
            placeholder="Saisissez votre réponse ici"
            value={textePreuve}
            oninput={(e) => textePreuve = (e.target as HTMLInputElement).value}    
        ></TextInput>
    {:else}
        <Flex 
            align="center" 
            style="padding: 15px; border: 2px dashed #ccc; border-radius: 6px; background-color: #fafafa;"
        >
            <input 
                type="file" 
                bind:files={fichiers} 
                accept=".png, .jpeg, .jpg, .mp4, .tif, .tiff, .avif, .heif, .heic, .webm, .mov, .webp, .gif" 
                style="width: 100%; cursor: pointer;"
            />
        </Flex>
    {/if}

    <Flex justify="flex-end" align="center">
        <Switch bind:checked = {isOkTVn7}>Is U Ok To Donner TVn7 rights ?</Switch>
        <Button 
            onclick={() => onSave(fichiers, textePreuve, type, isOkTVn7, challengeId)} 
            disabled={boutonvalider(fichiers, textePreuve, type === "TEXT")}
        >
            Envoyer la preuve
        </Button>
    </Flex>
</Flex>

