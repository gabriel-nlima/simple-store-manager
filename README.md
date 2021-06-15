# simple-store-manager

## Sistema de Gerenciamento de Estabelecimentos(SGES)

Projeto simples que utiliza React com TypeScript no frontend e NodeJS com o framework [Fastify](https://www.fastify.io/) no backend.

Este é um monorepo feito com [Lerna](https://github.com/lerna/lerna).

### Funcionalidades

-   Autenticação com JsonWebTokens
-   Criptografia de senha
-   API REST com comunicação com JSON e rotas protegidas
-   CRUD de estabelecimentos
-   Busca de estabelecimentos pelo endereço/local e por nome¹
-   Favoritar estabelecimentos
-   Layout simples e responsivo

¹ Por questões de praticidade, foi utilizado para busca por estabelecimentos o [$text](https://docs.mongodb.com/manual/reference/operator/query/text/#mongodb-query-op.-text) do MongoDB, que é performático mas fraco em obter os resultados da busca corretamente.

## Requisitos

-   [Nodejs v13+](https://nodejs.org)
-   [MongoDB v3+](https://www.mongodb.com/try/download/community)

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

## Detalhes

### Organização de pastas

./packages/client/src:

-   ./api:

Arquivos para requisições do servidor, organizados por rotas.

-   ./components:

Componentes de visualização (sem lógicas), genéricos e específicos, do app.

-   ./contexts:

[Contexts](https://reactjs.org/docs/context.html) da aplicação.

-   ./hooks:

Alguns hooks customizados do react.

-   ./pages:

Componentes de páginas do app, contém lógicas, navegação, chamada pra APIs e afins.

./packages/server:

-   ./decorators:

Funções utilitárias para decorar/injetar na instância do servidor, tornando-as disponíveis em rotas e middlewares.

-   ./hooks:

Funções para serem chamadas no ciclo de vida das requisições

-   ./routes:

Rotas da API e seus respectivos handlers.

-   ./index.js:

Entry file do servidor, setta configurações, inicializa plugins, decorators, hooks, rotas e então roda o servidor.

### TODO

-   Refresh do token ao expirar (para não ter que fazer login)
-   Testes
-   Modal de editar dados do usuário
-   Mais campos para estabelecimentos (telefone, tipo...)
-   Indicador de loading entre telas
-   Docker?

## Outras bibliotecas

### Frontend

-   [Ant Design](https://ant.design/)
-   [Axios](https://github.com/axios/axios)
-   [React Router](https://reactrouter.com/web/guides/quick-start)

### Backend

-   [Fastify JWT](https://github.com/fastify/fastify-jwt)
-   [bcrypt](https://github.com/dcodeIO/bcrypt.js#readme)
-   [shx](https://github.com/shelljs/shx#readme)
