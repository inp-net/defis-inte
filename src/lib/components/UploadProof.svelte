<script lang="ts">

    import { Flex, Button, TextInput } from 'azucar-ui'

    type Prop = {
        desc: String
        isText: Boolean
    }

    let fichiers = $state<FileList | null>(null);
    let textePreuve = $state("");

    function handleValidation() {
        // TODO
    }

    function boutonvalider(fichiers: FileList | null, textePreuve: String, isText: Boolean){
        if (isText){
            return textePreuve.trim().length === 0;
        } else {
            return !fichiers || fichiers.length === 0;
        }
    }

    const {
        desc = '',
        isText = false,
    }: Prop = $props();
</script>

<Flex direction="column" gap="md">
    <p><b>Description :</b> {desc}</p>
    {#if isText}
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
                accept=".png, .jpeg, .jpg, .mp3, .mp4" 
                style="width: 100%; cursor: pointer;"
            />
        </Flex>
    {/if}

    <Flex justify="flex-end">
        <Button 
            onclick={handleValidation} 
            disabled={boutonvalider(fichiers, textePreuve, isText)}
        >
            Envoyer la preuve
        </Button>
    </Flex>
</Flex>

