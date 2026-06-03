<script lang="ts">

    import { Flex, Frame, Button } from 'azucar-ui';
    import { Dot, Settings } from '@lucide/svelte';
    import Profile from '$lib/components/Profile.svelte';

    const dotSize = "15px";
    const pointsGroup = "676";
    const percentCommit = "10%";

</script>

<div class="sticky">
    <Frame transparent={true} border={true} shadow={true}>
        <Flex justify="space-between" align="center" wrap={false}>
            <Flex align="center" gap="md">
                <Profile firstName="Bilèle" lastName="El Haddadi" alt="Avatar" hideName={true} /> 
                <section class="remove-small">
                    <Dot size={dotSize}/>
                </section>
                <section class="remove-small">
                    <Flex direction="column" gap="xxs">
                        <p><b>Groupe B</b></p>
                        <p>Points groupe : {pointsGroup}</p>
                        <p>Contribution : {percentCommit}</p>
                    </Flex>
                </section>
            </Flex>
            <Flex wrap={false} gap="xs">
                <Button href="/leaderboard">Classement</Button>
                <Button href="/settings" icon={Settings} variant="outline"></Button>
            </Flex>
        </Flex>
    </Frame>
</div>

<style>

    .sticky {
        position: sticky;
        top: 0;
        padding: 10px;
        z-index: 100;
    }

    @media (max-width: 600px) {
        .remove-small {
            display: none;
        }
    }


</style>
