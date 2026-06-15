<script lang="ts">

    import type { PageData } from './$types';
    import { Flex, Stack, Button } from 'azucar-ui';
    import type { ChallengeRead } from '$lib/types/types.d.ts';
    import Header from '$lib/components/Header.svelte';
    import FrameChallenge from '$lib/components/FrameChallenge.svelte';
    import AddChallenge from '$lib/components/AddChallenge.svelte';
    import Sort from '$lib/components/Sort.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import { signIn } from "@auth/sveltekit/client";



    let { data }: { data: PageData } = $props();
    let challenges : ChallengeRead[] = $state(data.posts.challenges);
    
    // Données liées au profil de l'utilisateur
    const user = $derived(data?.user);

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

    async function handleSave(fichiers: FileList | null, textePreuve: string, type: string, isOkTVn7: boolean = false, challengeId: number){
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
    const isConnected : boolean = $state(user)

</script>
{#if !isConnected}
    <Flex gap="xs" margin="xs" justify="right">
        <Button onclick={() => signIn("authentik", { callbackUrl: "/"})} style = "padding: var(--size-md)" >
            Se connecter
        </Button>
    </Flex>
{:else}
    <Header
        firstName={user?.firstName ?? null}
        lastName={user?.lastName ?? null}
        picture={user?.profilePictureURL ?? null}
        accessAdmin={user?.isAdmin || (user?.groupBoard.length > 0)}
        notificationsDefis={data.posts.pendingChallengeCount}
        notificationsPreuves={data.posts.pendingProofCount}>
    </Header>
{/if}
<Flex direction="column" gap="xxl" margin="lg">
    <Stack> 
        <h1>Défis</h1>
        <p>Défis d'intégration 2026 - 2027.</p>
    </Stack>

    <!-- A afficher que pour les membres 2A de groupes et plus -->
    <!-- {#if user && !user.is1A} -->
        <Stack>
            <AddChallenge />
        </Stack>
    <!-- {/if} -->

    <!-- Liste des défis -->
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
                    clubUrl={challenge.groupUrl}
                    desc={challenge.description}
                    type={challenge.type}
                    onSave={handleSave}
                    defaultTVn7={user?.isOkTVn7}
                    isConnected={isConnected}
                />
            {/each}
        </Flex>
    </Stack>

</Flex>

<style>
</style>
