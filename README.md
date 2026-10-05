# Site des défis d'intégration 2026 - 2027

[TOC]

## Projet

Ce site a été réalisé dans le cadre du [stage de 2026](https://git.inpt.fr/net7/stage-26-27).

![ImagePreview](https://cloud.inpt.fr/apps/files_sharing/publicpreview/empiYj3CbZX8XAj?file=/&fileId=713845&x=1920&y=1080&a=true&etag=1f2b04cfead05ee674b8c75f5411a97d)

Ce site est connecté à l'API de Churros.
Il permet d'effectuer les actions suivantes :
- Les 2A peuvent proposer des défis pour chaque club.
- Les membres du bureau de chaque club peuvent valider les défis.
- Les 1A, membres d'un groupe d'intégration, peuvent réaliser les défis validés par les clubs.
- Les membres du bureau des clubs respectifs peuvent valider les réalisations.
- Les points sont mis à jour.

## Contribuer

### Lancer en développement

1. Installer [bun](https://bun.com/) et les dépendances :

```
bun install
```

2. Copier le fichier `.env.exemple` et le renommer `.env`. Remplir le fichier avec les secrets.

3. \[Optionnel\] Si vous voulez lancer le projet sans Authentik, modifiez la valeur de `ENABLE_MOCK_AUTH` à `true`.

4. Lancer la base de données avec Docker :

```
docker compose up -d
```

5. Préparer Prisma :

Appliquer le schéma à la base de données.

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
  résoudre ce problème, mettez la variable d'environnement
  `PUBLIC_1ATo2AChurros` à `false` dans le fichier `.env` **temporairement**.

- L'ajout des clubs est fait lorsqu'un membre concerné par ce dernier se
  connecte. Si vous ne voyez pas tous les clubs lorsque vous lancez le projet
  en production, c'est normal.

- Si vous effectuez des modifications et que le site se bloque, pensez à supprimer
  les cookies.

- Si l'on re-initialise la base de données, les cookies restent sur le site, ce*
  qui peut engendrer des problèmes de connexion. Pensez donc à les supprimer en même temps.

- Dans `formatCheck`, changer l'année des groupes d'inté.

### Mise en production

Avant de mettre en prod tester en local si tout marche correctement avec l'image docker quand elle est build. Faire ``` docker compose --profile prod-test up --build ``` pour le tester.

La mise en production se fait par l'ajout de tags avec GitLab CI/CD.

Voir le [**wiki**](https://wiki.inpt.fr/fr/inp-net/adminsys/kubernetes). Vous
devez être root.

1. Créer un tag :

```
git tag v<major>.<medium>.<minor>
```

Exemple

```
git tag v1.0.1
```

2. Attendre la fin du runner.

3. Mettre à jour la version pour Kubernetes :

Aller sur le dépôt [fluxcd](https://git.inpt.fr/inp-net/fluxcd/-/tree/master/apps/crop/defis).

Changer le paramètre `image` dans le fichier `deployment.yaml` avec la nouvelle image.

4. \[Root\] Se connecter à la base de données et modifier manuellement les admins.

## Stack technique

Ce projet a été développé en Svelte. Il utilise
[Prisma 7](https://www.prisma.io/docs/orm) pour la base de données.

L'UI a été réalisée à l'aide de la librairie de composants
[Azucar-UI](https://git.inpt.fr/inp-net/azucar-ui) développée en interne.

# Preview

![Image1](https://cloud.inpt.fr/apps/files_sharing/publicpreview/dS7542bQiSbGtfy?file=/&fileId=713848&x=1920&y=1080&a=true&etag=1a50a116c2fa68faf4985df3e1470f82)

![Image2](https://cloud.inpt.fr/apps/files_sharing/publicpreview/oaGC9DTk3McRATF?file=/&fileId=713846&x=1920&y=1080&a=true&etag=75d8a4158acddc4aa78cd2cbb8bede2d)

![Image2](https://cloud.inpt.fr/apps/files_sharing/publicpreview/empiYj3CbZX8XAj?file=/&fileId=713845&x=1920&y=1080&a=true&etag=1f2b04cfead05ee674b8c75f5411a97d)