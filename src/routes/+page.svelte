<script lang="ts">

    import type { PageData } from './$types';
    import { Flex, Stack } from 'azucar-ui';
    import type { ChallengeRead } from '$lib/types/types.d.ts';
    import Header from '$lib/components/Header.svelte';
    import FrameChallenge from '$lib/components/FrameChallenge.svelte';
    import AddChallenge from '$lib/components/AddChallenge.svelte';
    import Sort from '$lib/components/Sort.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';


    let { data }: { data: PageData } = $props();
    let challenges : ChallengeRead[] = $state(data.posts.challenges);
    
    // Données liées au profil de l'utilisateur
    const user = data.user;   // explication user  faut let {data} = $pops puis cette ligne qui permet d'avoir l'objet user 

    // Recherche de défis

    let searchValue : string = $state("");
    let searchedItems = $derived(
        challenges.filter(
            (a) => {
                // On met tout en minuscule moins sensible
                const search = searchValue.toLowerCase();
                if (!search) return true;
                // True ou false si contient
                const containsName = a.name.toLowerCase().includes(search);
                const containsClub = a.groupName.toLowerCase().includes(search);
                return containsName || containsClub;
            }
        )
    );

    async function handleSave(fichiers: FileList | null, textePreuve: string, type: string, isOkTVn7: boolean, challengeId: number){
        console.log("Tentative de création de la preuve");
        try {
            const formData = new FormData();
            formData.append('challengeId', challengeId.toString());
            formData.append('type', type)
            if (textePreuve){
                formData.append('textePreuve', textePreuve);
            } else {
                formData.append('isOkTVn7', isOkTVn7.toString());
                for (const file of fichiers){
                    formData.append('file',file);
                }
            }
            
            const response = await fetch('?/save', {
                method: 'POST',
                headers: { 'x-sveltekit-action': 'true', },
                body: formData
            });
            if (response.ok) {
                // Changement local des modifications serveur
                const result = await response.json();
                if (result.type === 'failure') {
                    console.error("Erreur de validation :", result.data?.message);
                    return;
                }
                /*
                const proof : Proof = proofs.find(c => c.proofId === id);
                if (proof) {
                    proof.status = 'VALID'
                }
                console.log("OK preuve validé");*/
            }
        } catch(err) {
            console.error("Erreur lors de l'envoi du form : ", err);
        }
    }

    // Trier les défis

    const sortList : string[] = ["points", "clubs", "lieux", "date"];
    let sortBind : string = $state(sortList[0]);
    let isSortDesc = $state(true);
    let sortedSearchedChallenges = $derived.by(() => {
        const items = [...searchedItems]; 
        const flip = isSortDesc ? 1 : -1;
        switch(sortBind) {
            case "points":
                return items.sort((a, b) => flip * (Number(b.nbPoints) - Number(a.nbPoints)));
            case "clubs":
                return items.sort((a, b) => flip * b.groupName.localeCompare(a.groupName));
            case "lieux":
                return items.sort((a, b) => flip * (b.locationName || "").localeCompare(a.locationName || ""));
            case "date":
                return items.sort((a, b) => flip * (b.challengeId - a.challengeId));
            default:
                return items;
        }
    });



</script>
<Header
    user={user}
    notificationsDefis={data.posts.pendingChallengeCount}
    notificationsPreuves={data.posts.pendingProofCount}/>
<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>

    <!-- A afficher que pour les membres 2A de groupes et plus -->
    <Stack>
        <AddChallenge />
    </Stack>

    <Stack style="max-width: 100%; min-width: 0; overflow: hidden;">
        <Flex gap="xs" wrap={false} align="center">
            <SearchBar bind:value={searchValue} />
            <Sort bind:bind={sortBind} options={sortList} bind:isDesc={isSortDesc} />
        </Flex>
        <Flex gap="xs" direction="column" style="max-width: 100%; width: 100%;" wrap={false}>
            {#each sortedSearchedChallenges as challenge}
                <FrameChallenge
                    challengeId={challenge.challengeId}
                    name={challenge.name}
                    nbPoints={challenge.nbPoints}
                    isText={challenge.type === "TEXT"}
                    location={challenge.locationName}
                    clubName={challenge.groupName}
                    clubUrl="https://media.gettyimages.com/id/78038972/fr/photo/london-a-seven-foot-tall-waxwork-figure-of-movie-characture-shrek-is-unveiled-at-madame.jpg?s=612x612&w=gi&k=20&c=dq3bowem92dUWxW2DtFzCq6s4XTVxau7jN8afRSIBhM="
                    desc={challenge.description}
                    type={challenge.type}
                    onSave={handleSave}
                />
            {/each}
        </Flex>
    </Stack>

</Flex>

<style>
</style>
