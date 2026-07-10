<script lang="ts">
    import { Avatar, Frame, Flex } from "azucar-ui";
    
    type RankGroup = {
        groupName: string;
        groupUrl?: string;
        points: string;
        rank: string;
        highlight: boolean;
    };

    const {
        groupName = "Group Unknown",
        groupUrl = undefined,
        points = "0",
        rank = "0",
        highlight = false
    }: RankGroup = $props();

    //Couleur pour le Top3
    const colorTop = $derived.by(() => {
        if (parseInt(rank) === 1) return "oklch(89% 0.182 95.6 / 0.2)";
        else if (parseInt(rank) === 2) return "oklch(80.8% 0 0 / 0.2)";
        else if (parseInt(rank) === 3) return "oklch(66.6% 0.132 61.3 / 0.2)";
        return null;
    });
</script>

<!--
    @component
    Composant utilisé pour le classement. Met le nombre de points, le rang et
    les informations utilises pour un classement.
    Thibault ou Claude ? This is the question
-->

<Frame style="border-radius: 50pt; max-width: 100%;  background-color: {colorTop};"  border = {highlight}>
    <Flex
        justify="space-between"
        wrap={false}
        style="width: 100%; max-width: 100%"
    >
        <Flex
            align="center"
            wrap={false}
            style="min-width: 0; width: 100%; flex: 1; max-width: 100%;"
        >
            <div class="no-shrink">
                <Avatar src={groupUrl} alt={groupName} size="xl" />
            </div>
            <p class="scrollable-text">{groupName}</p>
        </Flex>
        <Flex align="center" wrap={false} gap="sm" style="flex-shrink: 0;">
            <p>{points}</p>
            <p>#{rank}</p>
        </Flex>
    </Flex>
</Frame>

<style>
    .scrollable-text {
        white-space: nowrap;
        overflow-x: auto;
        padding: 1em 0;
        -webkit-overflow-scrolling: touch;
    }

    .scrollable-text::-webkit-scrollbar {
        display: none;
    }

    .scrollable-text {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .no-shrink {
        flex-shrink: 0;
    }
</style>
