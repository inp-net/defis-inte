# Défis site intégration 2026 - 2027

## DEV 

-- Faire Attention --
- si on whipe la db les cookie reste sur le site ( car son sur le navigateur ) donc peut arriver probleme de connexion 

### Lancer le projet en devloppement 

1 - installer bun ([https://bun.com/])

2 - faire bun install pour installer les dependances.

1 -  copier .env.exemple dans .env et demander les auth à un root.

2 - Lancer le docker 
    docker compose up

### Info utile pour le devleoppement 

- churros change les années des utilisateur fin aout donc pour securiser correctement variable PUBLIC_1ATo2AChurros à false avant puis à true au changement sur churros

- On ajoutes les clubs que des gens qui s'inscrivent quand ils se connecte pour la première fois

- 

### TODO 
- Dans formatCheck changer l'année des groups d'inté

## PROD 

#### 1 Tester si l'image docker marche 

1 - 

2 - Tester si l'image de prod marche 
    docker compose -f docker-compose-test-prod.yml up --build

#### 2 mettre en prod (ROOT)
1 - Sur git mettre un TAG 

2 - mettre à jour la version dans deployment.yaml sur fluxcd et dans configmap mettre PUBLIC_1ATo2AChurros à false 

3 - Supprimer les volumes si ce n'es pas déjà fait 

#### 3 (ROOT)

1 - se connecter à la db et mettre admin les personnes que l'on veut : 
