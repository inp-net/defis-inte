<script>
	import { goto } from "$app/navigation";
	import { Frame, Button } from "azucar-ui";
	import { page } from "$app/state";
</script>

<Frame>
	<h1>{page.status}</h1>
	{#if page.status === 500}
		<p>
			Une erreur interne est survenue. Veuillez contacter <strong
				>Net7ellite</strong
			>.
		</p>
	{:else}
		<p>{page.error?.message}</p>
	{/if}
	<p class="hint">Petit malin, retourne sur le droit chemin</p>
	<Button onclick={() => goto("/")}>Retour à l'envoyeur</Button>
	<button onclick={() => goto("/app/home")}>Retour à l'accueil</button>
</Frame>
