<script lang="ts">
    import { Flex } from "azucar-ui";
    import { ChevronDown, ChevronUp } from "@lucide/svelte";

    interface Props {
        // Nom de la catégorie
        name: string;
        // Liste général des catégories. Le nom sera écrit si ce composant est désactivé
        list: string[];
        // Logo affiché dans la catégorie
        src?: string;
        // La catégorie est masqué
        enabled?: boolean;
    }

    let { name, list = $bindable(), src, enabled = false }: Props = $props();

    /** Ajoute dans la liste si n'est pas présent, supprime si présent. */
    function flipFlopAddList() {
        if (list.includes(name)) {
            list = list.filter((item) => item !== name);
            enabled = false;
        } else {
            list.push(name);
            enabled = true;
        }
    }
</script>

<!--
    @component
    Agit comme la balise `details` en HTML.

    Composant Category. Il permet à l'utilisateur de cliquer sur une catégorie
    pour l'activer ou la désactiver, ce qui met à jour une liste partagée avec
    le composant parent.

    La list est une liste générale. Quand le composant est cliqué, son nom est
    ajouté dans cette liste. Ceci permet à la page de savoir quels catégories
    sont activés.

    Utilisé par exemple comme Header d'un club (net7) dans la liste des défis
    et cache la liste des défis si folded.
-->

<button onclick={() => flipFlopAddList()} style="margin-bottom: var(--size-lg)">
    <Flex justify="space-between" align="center" margin="xs" wrap={false}>
        <Flex align="center" gap="md" wrap={false}>
            {#if src}
                <img src={src} alt={name} />
            {/if}
            <h4>{name}</h4>
        </Flex>
        {#if enabled}
            <ChevronUp />
        {:else}
            <ChevronDown />
        {/if}
    </Flex>
    <hr />
</button>

<style>
    img {
        height: 3em;
        width: 3em;
        border-radius: 100%;
    }

    hr {
        display: block;
        height: 2px;
        color: var(--color-fg-high);
        background-color: var(--color-fg-high);
        border: none;
        border-radius: 1px;
    }

    h4 {
        margin: 0;
        text-align: left;
    }

    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        width: 100%;
        min-width: 0;
        display: block;
        -webkit-tap-highlight-color: transparent;
    }
</style>
