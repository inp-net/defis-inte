# Site des défis d'intégration 2026 - 2027

## Projet

Ce site a été réalisé dans le cadre du [stage de 2026](https://git.inpt.fr/net7/stage-26-27).

![ImagePreview](preview1.png)

Ce site est connecté à l'API de Churros.
Il permet de faire les actions suivantes :
- Les 2A peuvent proposer des défis pour chaque club.
- Les membres du bureau de chaque club peuvent valider les défis.
- Les 1A, membres d'un groupe d'intégration, peuvent réaliser les défis validés par les clubs.
- Les membres du bureau des clubs respectifs peuvent valider les réalisations.
- Les points sont mis à jour.

## Contribuer

### Lancer en développement

1. Installer [bun](https://bun.com/) et les dépendences :

```
bun install
```

2. Copier le fichier `.env.exemple` et le renommer `.env`. Remplir le fichier avec les secrets.

3. \[Optionnel\] Si vous voulez lancer le projet sans Authentik, modifier la valeur de `ENABLE_MOCK_AUTH` à `true`.

4. Lancer la base de données avec docker :

```
docker compose up -d
```

5. Préparer Prisma :

Appliquer le schéma à la DB.

```
bun prisma db push
```

6. Remplissage de la base de données (Seed) :

```
bun prisma db seed
```

7. Lancer le projet Svelte :

```
bun --dev run dev
```

### Résolution de problèmes

- Les utilisateurs travaillant sur le projet avant l'intégration seront
  considérés comme 1A par Churros. En effet, la mise à jour est tardive. Pour
  résoudre ce problème, mettre la variable d'environnement dans le `.env`
  `PUBLIC_1ATo2AChurros` à `false` **temporairement**.

- L'ajout des clubs est faite lorsqu'un membre concerné par ce dernier se
  connecte. Si lorsque vous lancez le projet en prod, vous ne voyez pas tous
  les clubs, c'est normal.

- Si vous effectuez des modifications et le site se bloque. Pensez à supprimer
  les cookies.

- Si on whipe la db les cookie reste sur le site donc peut arriver probleme de
  connexion, pensez donc à les supprimer en même temps.

- Dans formatCheck changer l'année des groups d'inté

### Mise en production

La mise en production se fait par l'ajout de tags avec gitlab CI/CD.

Voir le [**wiki**](https://wiki.inpt.fr/fr/inp-net/adminsys/kubernetes). Vous
devez être root.

1. Crée un tag :

```
git tag v<major>.<medium>.<minor>
```

Example

```
git tag v1.0.1
```

2. Attendre la fin du runner.

3. Update la version pour Kubernetes :

Aller sur le dépôt [fluxcd](https://git.inpt.fr/inp-net/fluxcd/-/tree/master/apps/crop/defis).

Changer le paramètre `image` dans le fichier `deployment.yaml` avec la nouvelle image.

4. \[Root\] Se connecter à la DB et modifier manuellement les admins.

## Stack technique

Ce projet a été développé en Svelte. Il utilise
[Prisma 7](https://www.prisma.io/docs/orm) pour la base de données.

L'UI a été réalisé à l'aide de l'a librairie de composant
[Azucar-UI](https://git.inpt.fr/inp-net/azucar-ui) développé en interne.
