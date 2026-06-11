<script lang="ts">

    import { Flex, Frame, Button } from 'azucar-ui';
    import { Dot, Settings, Wrench, ImageUp } from '@lucide/svelte';
    import Profile from '$lib/components/Profile.svelte';
    import ButtonNotification from '$lib/components/ButtonNotification.svelte';

    const dotSize = "15px";

    type Props = {
        user: any,
        notificationsDefis?: number,
        notificationsPreuves?: number,
    }

    const {
        user,
        notificationsDefis: notifDefi,
        notificationsPreuves: notifProof
    }: Props = $props();

    const [firstName, ...reste] = (user.name.split(" "))
    const lastName = $state(reste.join(" "))

    const percentCommit = (user.groupInte.points ? Math.round((user.points/user.groupInte.points)*100) : 0) 

</script>

<div class="sticky">
    <Frame transparent={true} border={true} shadow={true}>
        <Flex justify="space-between" align="center" wrap={false}>
            <Flex align="center" gap="md">
                <Profile firstName={firstName} lastName={lastName} src={user.profilePictureURL} hideName={true}/> 
                {#if user.is1A}
                    <section class="remove-small">
                        <Dot size={dotSize}/>
                    </section>
                    <section class="remove-small">
                        <Flex direction="column" gap="xxs">
                            <h4>{user.groupInte.name}</h4>
                            <p>Points groupe : {user.groupInte.points}</p>
                            <p>Contribution : {percentCommit}%</p>
                        </Flex>
                    </section>
                {/if}
            </Flex>
            <Flex wrap={false} gap="xs" align="center">
                <Button href="/leaderboard">Classement</Button>
                {#if user.groupBoard || user.isAdmin}
                    <ButtonNotification href="/board" icon={Wrench} variant="outline" notifications={notifDefi}></ButtonNotification>
                    <ButtonNotification href="/proof" icon={ImageUp} variant="outline" notifications={notifProof}></ButtonNotification>
                {/if}
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
