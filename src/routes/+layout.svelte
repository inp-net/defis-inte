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

<div class="page-wrapper">
    <div class="bg-glow" aria-hidden="true"></div>
    <div class="container">
        {@render children?.()}
        <Footer isDarkTheme={darkMode} />
    </div>
</div>

<style>

    /* CHANGER LA COULEUR ICI */
    :root {
        --base-color: oklch(0.8053 0.1109 19.78);
    }

    :global(html, body) {
        overflow-x: clip;
    }

    .page-wrapper {
        position: relative;
        min-height: 100vh;
        width: 100%;
        isolation: isolate; 
        overflow: hidden;
    }

    .bg-glow {
        position: absolute;
        inset: 0;
        width: 100%;
        z-index: -1;
        pointer-events: none;

        background-image: 
            radial-gradient(circle 220vw at 0% 250px, color-mix(in oklch, var(--base-color) 12%, transparent) 0%, transparent 60%),
            radial-gradient(circle 180vw at 100% 850px, color-mix(in oklch, var(--base-color) 10%, transparent) 0%, transparent 65%),
            radial-gradient(circle 200vw at 0% 1400px, color-mix(in oklch, var(--base-color) 12%, transparent) 0%, transparent 60%),

            radial-gradient(circle 160vw at 100% 400px, color-mix(in oklch, var(--base-color) 10%, transparent) 0%, transparent 65%),
            radial-gradient(circle 190vw at 0% 1350px, color-mix(in oklch, var(--base-color) 12%, transparent) 0%, transparent 60%),
            radial-gradient(circle 210vw at 100% 2100px, color-mix(in oklch, var(--base-color) 10%, transparent) 0%, transparent 65%);

        background-size: 
            100% 1600px,
            100% 1600px,
            100% 1600px,
            100% 2500px,
            100% 2500px,
            100% 2500px;

        background-repeat: repeat-y;
        filter: blur(60px);
        transform: translateZ(0);
        will-change: transform;
    }

    @media (min-width: 768px) {
        .bg-glow {
            background-image: 
                radial-gradient(circle 2200px at 0% 250px, color-mix(in oklch, var(--base-color) 8%, transparent) 0%, transparent 65%),
                radial-gradient(circle 1100px at 100% 850px, color-mix(in oklch, var(--base-color) 6%, transparent) 0%, transparent 70%),
                radial-gradient(circle 1600px at 0% 1400px, color-mix(in oklch, var(--base-color) 8%, transparent) 0%, transparent 65%),

                radial-gradient(circle 900px at 100% 400px, color-mix(in oklch, var(--base-color) 6%, transparent) 0%, transparent 70%),
                radial-gradient(circle 1800px at 0% 1350px, color-mix(in oklch, var(--base-color) 8%, transparent) 0%, transparent 65%),
                radial-gradient(circle 2000px at 100% 2100px, color-mix(in oklch, var(--base-color) 6%, transparent) 0%, transparent 70%);

            background-size: 
                100% 1600px,
                100% 1600px,
                100% 1600px,
                100% 2500px,
                100% 2500px,
                100% 2500px;

            filter: blur(120px);
        }
    }

    .container {
        max-width: min(1000px, 100%);
        margin: 0 auto;
    }
</style>
