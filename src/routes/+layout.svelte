<script lang="ts">
    import "azucar-ui/tokens.css";
    import "azucar-ui/base.css";
    import Footer from "$lib/components/Footer.svelte";

    let { children, data } = $props();

    const darkMode = $derived(data.user?.darkMode ?? false);
    const color = $derived(darkMode ? "dark" : "light");

    $effect(() => {
        document.documentElement.style.setProperty("color-scheme", color);
        
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>

<!-- <svelte:head> -->
<!-- 	<link rel="icon" href={favicon} /> -->
<!-- </svelte:head> -->

<svelte:head>
	<title>Site des défis</title>
	<meta name="description" content="Proposez et réalisez des défis." />
</svelte:head>

<div class="container">
    {@render children?.()}
    <Footer isDarkTheme={darkMode} />
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
