<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import "azucar-ui/tokens.css"
    import "azucar-ui/base.css"
    import Footer from '$lib/components/Footer.svelte'

	let { children } = $props();

    $effect(() => {
        document.documentElement.style.setProperty('color-scheme', 'light');
    });

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
    {@render children?.()}
    <Footer />
</div>

<style>
    :root {
        --base-color: oklch(0.63 0.331 285.4);
    }

    .container {
        max-width: min(1000px, 100%);
        margin: 0 auto;
    }

</style>
