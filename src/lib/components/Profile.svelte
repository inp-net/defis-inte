<script lang="ts">

    import { Flex, Stack, Avatar, Frame } from 'azucar-ui';

    type Props = {
        src?: string;
        alt: string;
        size?: 'small' | 'large';
        firstName: string;
        lastName: string;
    };

    const {
        src,
        alt = 'Avatar',
        size = 'small',
        firstName,
        lastName
    }: Props = $props();

</script>

<Flex align="center" gap="md">
    <Avatar src={src} alt={alt} size={size} />
    <Flex direction="column" gap="xxs">
        <h4 class={`title-${size}`}>{firstName}</h4>
        <h4 class={`title-${size}`}>{lastName}</h4>
    </Flex>
</Flex>

<style>
    .title-large{
        font-size: var(--size-lg);
    }

    .title-small {
        font-size: var(--size-md);
    }
</style>
