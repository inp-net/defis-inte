<script>
	import { goto } from "$app/navigation";
	import { Frame, Button, Flex } from "azucar-ui";
	import { page } from "$app/state";
</script>

<Frame>
	<Flex direction=column>
    	<h1>{page.status}</h1>
		{#if page.status === 500}
			<p>Une erreur interne est survenue. Merci de contacter <strong>NET7</strong></p>
		{:else}
			<p>{page.error?.message}</p>
		{/if}
		<p class="hint">Petit malin, le thème de l'AE c'est les pirates, mais pas les pirates informatiques 🤣</p>
		<Flex>
			<Button onclick={() => goto('/')}> Supprimer un moussaillon de la DB</Button>
			<Button onclick={() => goto('/')}>Retour au menu principal</Button>
		</Flex>
	</Flex>
</Frame>
