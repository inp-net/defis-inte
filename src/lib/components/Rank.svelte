<script lang="ts">

    import { Avatar, Frame, Flex } from 'azucar-ui';

    type RankGroup = {
        groupName: string;
        groupUrl?: string;
        points: string;
        rank: string;
    };

    const {
        groupName = "Group Unknown",
        groupUrl = undefined,
        points = "0",
        rank = "0",
    }: RankGroup = $props()

</script>

<Frame style="border-radius: 50pt; max-width: 100%;">
    <Flex justify="space-between" wrap={false} style="width: 100%; max-width: 100%">
        <Flex align="center" wrap={false} style="min-width: 0; width: 100%; flex: 1; max-width: 100%;">
            <div class="no-shrink">
                <Avatar src={groupUrl} alt={groupName} />
            </div>
            <p class="scrollable-text">{groupName}</p>
        </Flex>
        <Flex align="center" wrap={false} gap="xl" style="flex-shrink: 0;">
            <p>{points}</p>
            <p>#{rank}</p>
        </Flex>
    </Flex>
</Frame>

<style>
    .scrollable-text {
        white-space: nowrap;
        overflow-x: auto;
        margin: 0;
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
