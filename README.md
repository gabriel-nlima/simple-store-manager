# simple-store-manager

## Sistema de Gerenciamento de Estabelecimentos(SGES)

Projeto simples que utiliza React com TypeScript no frontend e NodeJS com o framework [Fastify](https://www.fastify.io/) no backend.

Este é um monorepo feito com [Lerna](https://github.com/lerna/lerna).

## Requisitos

-   [Nodejs v12+](https://nodejs.org)
-   [MongoDB](https://www.mongodb.com/try/download/community)

## Instalação

```bash
cd simple-store-manager
npm i
npx lerna bootstrap
```

## Execução

### Desenvolvimento

Inicia o frontend e backend no localhost, portas 3000 e 8080 respectivamente.

```bash
 cd simple-store-manager
 npm start
```

Ou inicie individualmente com dois terminais:

```bash
 cd simple-store-manager/packages/client
 npm start
```

```bash
 cd simple-store-manager/packages/server
 npm start
```

### Produção

```bash
 cd simple-store-manager
 npm run start:prod
```
