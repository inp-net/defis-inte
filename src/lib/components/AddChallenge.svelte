<script lang="ts">
    import { Frame, Flex, Button } from "azucar-ui";
</script>

<!--
    @component
    Composant ajouter un déjà dans la page d'acceuil.
-->

<Frame>
    <Flex direction="column" gap="lg">
        <Flex gap="xs" direction="column">
            <h3>Ajouter un défi</h3>
            <p>Vous avez la possibilité d'ajouter des défis.</p>
        </Flex>
        <Flex justify="right">
            <Button href="/challenge/-1">Ajouter un défi</Button>
        </Flex>
    </Flex>
</Frame>
