<script lang="ts">

    import { Avatar, Frame, Flex } from 'azucar-ui';

</script>

<Frame style="border-radius: 50pt">
    <Flex justify="space-between" wrap={false}>
        <Flex align="center" wrap={false}>
            <Avatar />
            <p>nom groupe</p>
        </Flex>
        <Flex align="center" wrap={false} gap="xl">
            <p>2025</p>
            <p>#1</p>
        </Flex>
    </Flex>
</Frame>

<style>
</style>
