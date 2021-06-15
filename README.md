# simple-store-manager

## Sistema de Gerenciamento de Estabelecimentos(SGES)

Projeto simples que utiliza React com TypeScript no frontend e NodeJS com o framework [Fastify](https://www.fastify.io/) no backend.

Este é um monorepo feito com [Lerna](https://github.com/lerna/lerna).

## Requisitos

-   [Nodejs v13+](https://nodejs.org)
-   [MongoDB](https://www.mongodb.com/try/download/community)

## Instalação

```bash
cd simple-store-manager
npm i
```

Também é excecutado `npx lerna bootstrap` que baixa os pacotes do frontend e backend.

## Execução

### Desenvolvimento

Inicia o frontend e backend no localhost, portas 3000 e 8080 respectivamente.

Inicie individualmente com dois terminais:

```bash
 cd simple-store-manager/packages/client
 npm start
```

```bash
 cd simple-store-manager/packages/server
 npm start
```

### Produção

Gera uma build de produção do frontend (`npm run build -> react-scripts build`) e copia os arquivos para a pasta `./public` no servidor. O servidor serve de host do frontend.

```bash
 cd simple-store-manager
 npm run start-prod
```

## Outras bibliotecas

### Frontend

-   [Ant Design](https://ant.design/)
-   [Axios](https://github.com/axios/axios)
-   [React Router](https://reactrouter.com/web/guides/quick-start)

### Backend

-   [Fastify JWT](https://github.com/fastify/fastify-jwt)
-   [bcrypt](https://github.com/dcodeIO/bcrypt.js#readme)
-   [shx](https://github.com/shelljs/shx#readme)
