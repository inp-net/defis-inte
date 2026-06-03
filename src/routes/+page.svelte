<script lang="ts">
    import type { PageData } from "./$types";
    import { signIn, signOut } from "@auth/sveltekit/client";

    let { data }: { data: PageData } = $props();

</script>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<!-- bouton pour se connecter avec authentik -->
    <button onclick={() => signIn("authentik", { callbackUrl: "/home"})}>
        Se connecter
    </button>