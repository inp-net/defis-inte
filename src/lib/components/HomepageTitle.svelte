<script lang="ts">

    import { Flex, Stack } from "azucar-ui";
    import LogoAE from "$lib/components/LogoAE.svelte";

</script>

<!--
    @component
    Composant titre. Il est présent dans la page home. Il affiche
    le logo de l'AE et le titre.
-->

<Stack>

    <Flex align="center" wrap={false}> 
        <LogoAE 
            top={10} 
            size="clamp(150px, 20vw, 200px)"
        /> 
        <Flex direction="column" gap="xs"> 
            <h1 class="title">Défis</h1> 
            <p>À l'AEBordage ! Hisse haut les couleurs de ton équipe !</p> 
        </Flex> 
    </Flex>

</Stack>

<style>
    @media (max-width: 640px) {
        /* le titre est trop gros sur mobile */
        .title {
            font-size: var(--size-xl)
        }
    }
</style>
