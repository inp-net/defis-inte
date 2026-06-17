<script lang="ts">
    import { Button, Flex } from "azucar-ui";
    import { Heart } from "@lucide/svelte";
</script>

<footer class="footer-container">
    <Flex align="center" justify="center" gap="md">
        <p>Made with Svelte</p>
        <Button icon={Heart} class="danger-text" name="Delete" />
        <p>Azucar-UI</p>
    </Flex>
</footer>

<style>
    .footer-container {
        padding: 5em 0em 1em 0em;
        left: 0;
        width: 100%;
        z-index: 10;
    }
</style>
