# LinkApi - Pipedrive && Bling

Este projeto é um teste para realizar a integração entre duas APIs, sendo uma do Pipedrive e a outro do Bling. A integração deve buscar oportunidades no Pipedrive com status de ganho, recuperar as informações e inseri-las como pedidos no Bling. Além de inserir as informações em outra API, é necessário salva-las em um banco de dados MongoDB.

## ⚡ Sobre
A aplicação é uma Api REST desenvolvida para o desafio da LinkApi que tem como objetivo a integração entre o Pipedrive e o Bling.
O desafio contém os seguintes requisitos:
  - Criar contas testes nas plataformas Pipedrive e Bling.

  - Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

  - Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça.

  - Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

  - Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## ⚡ Techs
Esse projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- Typescript
- NodeJS
- Axios
- eslint
- Mongoose
- prettier
- jstoxml

## ⚡ Executando o Projeto

1. Faça um clone:

```sh
  $ git clone https://github.com/neaar3/linkapi.git
```

2. Entre na pasta da aplicação:

  - Crie um arquivo ``.env`` na raiz do rojeto.
  - Copie o conteúdo do arquivo .env.example e cole no seu arquivo ``.env``

3. Adicione as chaves de acesso no ``.env``:

    Para que se conectar a aplicação com a Api do Pipedrive, Bling e com o Mongodb, é necessário que você adicione as keys de acesso no arquivo ``.env``.


  No fim, o seu .env deve ser parecido com isso: 
  ```ts
    PORT=8080
    DATABASE_NAME= seu database name
    PIPEDRIVE_API_KEY= sua pipedrive api key
    BLING_API_KEY= suabling api key
  ```
4. Instale as depedências:
```sh
  # Instale as dependências
  npm ci
```

5. Execute a aplicação:
```sh
  # Inicie a API
  npm run dev
```

Assim que as messagens ``Application running on http://localhost:8080`` e ``Connected to database`` aparecerem em seu terminal, você ja pode fazer suas requisições.
## ⚡ Rotas

Como a aplicação estará executando em ambiente local, utilize o endereço ``http://localhost:SUA_PORTA_ENV`` como baseUrl.

A aplicação possue diversos endpoints e aceita requisiçõe do tipo GET e do tipo POST, sendo elas: 

  - ``GET /pipedrive/deals/``
  Lista todos os negócios disponiveis no Pipedrive com status "won".
  - ``POST /bling/orders``
  Salva a lista de oportunidades do Pipedrive no Bling como pedido.
  - ``POST /deals``
  Salva no banco de dados os negocios disponiveis no Pipedrive com status "won".
  - ``POST /``
  Busca no Pipedrive todas as oportunidades com o status "won" e as insere no Bling como pedido.
  Também salva no banco as oportunidades inseridas no Bling.

---
<h4 align="center">
    Feito por <a href="https://www.linkedin.com/in/iago-tostes/" target="_blank">Iago Tostes</a>
</h4>
