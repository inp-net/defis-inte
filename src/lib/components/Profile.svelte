<script lang="ts">

    import { Flex, Stack, Avatar, Frame } from 'azucar-ui';

    type Props = {
        src?: string;
        alt: string;
        size?: 'small' | 'large';
        firstName: string;
        lastName: string;
        hideName?: boolean; // Will hide the name on small screens
    };

    const {
        src,
        alt = 'Avatar',
        size = 'small',
        firstName,
        lastName,
        hideName = false
    }: Props = $props();

</script>

<a href="/profile">
    <Flex align="center" gap="md">
            <Avatar src={src} alt={alt} size={size} />
            <div class:hidden-mobile={hideName}>
                <Flex direction="column" gap="xxs">
                    <h4 class={`title-${size}`}>{firstName}</h4>
                    <h4 class={`title-${size}`}>{lastName}</h4>
                </Flex>
            </div>
    </Flex>
</a>

<style>
    .title-large{
        font-size: var(--size-lg);
    }

    .title-small {
        font-size: var(--size-md);
    }

    @media (max-width: 767px) {
        .hidden-mobile {
            display: none;
        }
    }

    a {
        text-decoration:none;
        color: inherit;
    }
</style>
