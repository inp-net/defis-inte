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
        <h4>{firstName}</h4>
        <h4>{lastName}</h4>
    </Flex>
</Flex>
