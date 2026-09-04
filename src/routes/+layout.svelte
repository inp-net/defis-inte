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
            radial-gradient(circle 140vw at 0% 250px, color-mix(in oklch, var(--base-color) 10%, transparent) 0%, transparent 75%),
            radial-gradient(circle 120vw at 100% 850px, color-mix(in oklch, var(--base-color) 15%, transparent) 0%, transparent 75%),
            radial-gradient(circle 140vw at 0% 1400px, color-mix(in oklch, var(--base-color) 10%, transparent) 0%, transparent 75%),

            radial-gradient(circle 110vw at 100% 400px, color-mix(in oklch, var(--base-color) 15%, transparent) 0%, transparent 75%),
            radial-gradient(circle 130vw at 0% 1350px, color-mix(in oklch, var(--base-color) 10%, transparent) 0%, transparent 75%),
            radial-gradient(circle 140vw at 100% 2100px, color-mix(in oklch, var(--base-color) 15%, transparent) 0%, transparent 75%);

        background-size: 
            100% 1600px,
            100% 1600px,
            100% 1600px,
            100% 2500px,
            100% 2500px,
            100% 2500px;

        background-repeat: repeat-y;
        filter: blur(50px);
        transform: translateZ(0);
        will-change: transform;
    }

    @media (min-width: 768px) {
        .bg-glow {
            background-image: 
                radial-gradient(circle 900px at 0% 250px, color-mix(in oklch, var(--base-color) 30%, transparent) 0%, transparent 75%),
                radial-gradient(circle 800px at 100% 850px, color-mix(in oklch, var(--base-color) 25%, transparent) 0%, transparent 75%),
                radial-gradient(circle 950px at 0% 1400px, color-mix(in oklch, var(--base-color) 30%, transparent) 0%, transparent 75%),

                radial-gradient(circle 1000px at 100% 400px, color-mix(in oklch, var(--base-color) 25%, transparent) 0%, transparent 75%),
                radial-gradient(circle 900px at 0% 1350px, color-mix(in oklch, var(--base-color) 30%, transparent) 0%, transparent 75%),
                radial-gradient(circle 1000px at 100% 2100px, color-mix(in oklch, var(--base-color) 25%, transparent) 0%, transparent 75%);

            background-size: 
                100% 1600px,
                100% 1600px,
                100% 1600px,
                100% 2500px,
                100% 2500px,
                100% 2500px;

            filter: blur(90px);
        }
    }

    .container {
        max-width: min(1000px, 100%);
        margin: 0 auto;
        font-display: swap;
    }
</style>
