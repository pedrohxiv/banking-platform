# Projeto Banking Platform

## Descrição do Projeto

A Banking Platform é uma plataforma financeira SaaS moderna, desenvolvida com o objetivo de conectar múltiplas contas bancárias, exibir transações em tempo real, permitir transferências de dinheiro para outros usuários da plataforma e gerenciar finanças de forma integrada.

## Principais Funcionalidades

- **Autenticação Segura:** Implementação de autenticação com SSR, utilizando validações rigorosas e autorização para garantir segurança total aos usuários.
- **Conexão de Bancos:** Integração com o **Plaid** para permitir que os usuários conectem múltiplas contas bancárias.

- **Página Inicial:** Visão geral das finanças, mostrando o saldo total de todas as contas bancárias conectadas, transações recentes, e gastos em diferentes categorias.

- **Minhas Contas Bancárias:** Exibe uma lista completa de todos os bancos conectados, com seus respectivos saldos e detalhes das contas.

- **Histórico de Transações:** Permite visualização detalhada do histórico de transações, com opções de paginação e filtros.

- **Atualizações em Tempo Real:** Reflete todas as mudanças em tempo real quando novas contas bancárias são conectadas ou transações são realizadas.

- **Transferência de Fundos:** Habilita transferências de dinheiro entre contas usando a API da **Dwolla**, garantindo que os campos necessários e ID do banco do destinatário sejam fornecidos.

- **Responsividade Completa:** A aplicação é completamente responsiva, se adaptando perfeitamente a diferentes tamanhos de tela e dispositivos, garantindo uma experiência consistente em desktops, tablets e smartphones.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@hookform/resolvers`: ^3.9.0,
- `@radix-ui/react-dialog`: ^1.1.1,
- `@radix-ui/react-label`: ^2.1.0,
- `@radix-ui/react-progress`: ^1.1.0,
- `@radix-ui/react-select`: ^2.1.1,
- `@radix-ui/react-slot`: ^1.1.0,
- `@radix-ui/react-tabs`: ^1.1.0,
- `@radix-ui/react-toast`: ^1.2.1,
- `chart.js`: ^4.4.3,
- `class-variance-authority`: ^0.7.0,
- `clsx`: ^2.1.1,
- `dwolla-v2`: ^3.4.0,
- `lucide-react`: ^0.427.0,
- `next`: 14.2.5,
- `node-appwrite`: ^13.0.0,
- `plaid`: ^26.0.0,
- `query-string`: ^9.1.0,
- `react`: ^18,
- `react-chartjs-2`: ^5.2.0,
- `react-countup`: ^6.5.3,
- `react-dom`: ^18,
- `react-hook-form`: ^7.52.2,
- `react-plaid-link`: ^3.5.2,
- `tailwind-merge`: ^2.4.0,
- `tailwindcss-animate`: ^1.0.7,
- `zod`: ^3.23.8,
- `@types/node`: ^20,
- `@types/react`: ^18,
- `@types/react-dom`: ^18,
- `eslint`: ^8,
- `eslint-config-next`: 14.2.5,
- `postcss`: ^8,
- `tailwindcss`: ^3.4.1,
- `typescript`: ^5,

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
NEXT_PUBLIC_SITE_URL=seu_valor_aqui
NEXT_PUBLIC_APPWRITE_ENDPOINT=seu_valor_aqui
NEXT_PUBLIC_APPWRITE_PROJECT=seu_valor_aqui
APPWRITE_DATABASE_ID=seu_valor_aqui
APPWRITE_USER_COLLECTION_ID=seu_valor_aqui
APPWRITE_BANK_COLLECTION_ID=seu_valor_aqui
APPWRITE_TRANSACTION_COLLECTION_ID=seu_valor_aqui
NEXT_APPWRITE_KEY=seu_valor_aqui
PLAID_CLIENT_ID=seu_valor_aqui
PLAID_SECRET=seu_valor_aqui
PLAID_ENV=seu_valor_aqui
PLAID_PRODUCTS=seu_valor_aqui
PLAID_COUNTRY_CODES=seu_valor_aqui
DWOLLA_KEY=seu_valor_aqui
DWOLLA_SECRET=seu_valor_aqui
DWOLLA_BASE_URL=seu_valor_aqui
DWOLLA_ENV=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Inicie o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em `http://localhost:3000` e explore as funcionalidades completas do Banking Platform e adapte-as conforme suas necessidades específicas.
