<script lang="ts">
    import type { PageData } from "./$types";
    import { type ChallengeRead, type MetadataCard, UploadType } from "$lib/types/types.d";
    import { signIn } from "@auth/sveltekit/client";
    import { Churros1ATo2A } from "$lib/env";
    import { Toaster, toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";
    import { deserialize } from '$app/forms';
    import { ChallengeItem } from '$lib/types/models.d';

    import { Flex, Stack, Button } from "azucar-ui";
    import { MapPin, UsersRound, Trophy, LogIn, Paperclip } from "@lucide/svelte";
    import Header from "$lib/components/Header.svelte";
    import AddChallenge from "$lib/components/AddChallenge.svelte";
    import HomepageTitle from "$lib/components/HomepageTitle.svelte";
    import UploadProof from "$lib/components/UploadProof.svelte";
    import RenderList from '$lib/components/RenderList.svelte';

    let { data }: { data: PageData } = $props();
    
    let challenges: ChallengeRead[] = $derived(
        data.posts.challenges.map((raw: any) => new ChallengeItem(raw))
    );

    const user = $derived(data?.user);
    const isConnected: boolean = $derived(Boolean(user));
    let isSending = $state(false);

    const challengeSortOptions = [
        {
            label: "Clubs",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                (Number(a.isDone) - Number(b.isDone)) ||
                (b.groupName || "").localeCompare(a.groupName || "") ||
                b.nbPoints - a.nbPoints,
            groupBy: (c: ChallengeRead) => c.groupName || "Autres",
            categoryUrl: (c: ChallengeRead) => c.groupUrl
        },
        {
            label: "Points",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                (Number(a.isDone) - Number(b.isDone)) ||
                b.nbPoints - a.nbPoints ||
                (a.groupName || "").localeCompare(b.groupName || "")
        },
        {
            label: "Lieux",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                (Number(a.isDone) - Number(b.isDone)) ||
                (b.locationName || "").localeCompare(a.locationName || ""),
            groupBy: (c: ChallengeRead) => c.locationName || "Autres"
        },
        {
            label: "Date",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                (Number(a.isDone) - Number(b.isDone)) || (b.challengeId - a.challengeId)
        },
        {
            label: "Tendance",
            comparator: (a: ChallengeRead, b: ChallengeRead) =>
                (Number(a.isDone) - Number(b.isDone)) ||
                ((b.allSucceedGroupNames?.length ?? 0) - (a.allSucceedGroupNames?.length ?? 0))
        }
    ];

    async function handleSave(
        fichiers: FileList | null,
        textePreuve: string,
        type: string,
        isOkTVn7: boolean = false,
        challengeId: number,
    ) {
        if (isSending) return;

        const currentChallenge = challenges.find((c) => c.challengeId === challengeId);
        if (currentChallenge?.isDone) {
            toast.error("Votre groupe a déjà validé ce défi !");
            return;
        }

        try {
            isSending = true;
            toast.info("Preuve envoyée.");

            const formData = new FormData();
            formData.append("challengeId", challengeId.toString());
            formData.append("type", type);
            if (textePreuve) {
                formData.append("textePreuve", textePreuve);
            } else {
                formData.append("isOkTVn7", isOkTVn7.toString());
                if (fichiers) {
                    for (const file of fichiers) formData.append("file", file);
                }
            }

            const response = await fetch("?/save", {
                method: "POST",
                headers: { "x-sveltekit-action": "true" },
                body: formData,
            });

            if (response.ok) {
                const resultNoReadable = await response.text();
                const result = deserialize(resultNoReadable);

                if (result.type === "success") {
                    toast.success("Preuve ajouté avec succès");
                    invalidateAll();
                }
                if (result.type === "failure") {
                    const message = result.data?.message ?? result.data ?? "";
                    toast.error(`Impossible d'envoyer la preuve. ${message}`);
                }
            }
        } catch (err) {
            toast.error("Erreur dans l'envoie du défi : " + err);
        } finally {
            isSending = false;
            invalidateAll();
        }
    }

    const metadata = (c: ChallengeRead): MetadataCard[] => [
        { name: "Club", icon: UsersRound, values: [ c.groupName ?? 'inconnu' ] },
        { name: "Lieu", icon: MapPin, values: [ c.locationName ?? 'inconnu' ] },
        { name: "Type de preuve", icon: Paperclip, values: [ UploadType[c.type as keyof typeof UploadType]] },
        ...(c.allSucceedGroupNames?.length
            ? [{ name: "Défi réussi par", icon: Trophy, values: c.allSucceedGroupNames }]
            : [])
    ];
</script>

{#if !isConnected}
    <Flex gap="xs" margin="lg" justify="right">
        <Button onclick={() => signIn("authentik", { callbackUrl: "/" })} icon={LogIn}>
            Se connecter
        </Button>
    </Flex>
{:else}
    <Header
        firstName={user?.firstName ?? undefined}
        lastName={user?.lastName ?? undefined}
        groupName={user?.is1A ? user?.groupInte?.name : ""}
        picture={user?.profilePictureURL ?? undefined}
        accessAdmin={user?.isAdmin}
        accessBoard={user?.groupBoard.length > 0}
        notificationsDefis={data.posts.pendingChallengeCount}
        notificationsPreuves={data.posts.pendingProofCount}
    />
{/if}

<Flex direction="column" gap="xxl" margin="lg">
    <HomepageTitle />

    {#if user && (!(user.is1A && Churros1ATo2A) || !user.is1A)}
        <Stack>
            <AddChallenge />
        </Stack>
    {/if}

    <Stack gap="xl" style="max-width: 100%; min-width: 0; overflow: hidden;">
        <RenderList
            items={challenges}
            {metadata}
            sortOptions={challengeSortOptions}
            getSearchableText={(c) => `${c.name} ${c.groupName} ${c.locationName ?? ''}`}
        >
        </RenderList>
    </Stack>

    <Toaster />
</Flex>
