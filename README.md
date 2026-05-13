# 🅰️ Angular App

> Sistema de administração desenvolvido com Angular 21, Signals e Material UI.

![E2E Tests](https://github.com/KaLucas/angular-app/actions/workflows/e2e.yml/badge.svg)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#️-como-usar)
- [Testes](#-testes)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contato](#-contato)

---

## 💡 Sobre o Projeto

**Angular App** é um sistema de administração web moderno, construído com Angular 21 e TypeScript. A aplicação oferece uma interface intuitiva para gerenciamento de usuários, utilizando a nova API de Signals do Angular, componentes do Angular Material (M3), gerenciamento de estado reativo com `rxResource` e `linkedSignal`, e navegação entre páginas com Angular Router.

> ⚠️ **Nota:** Este projeto faz parte do meu portfólio pessoal e tem como objetivo demonstrar organização de código, boas práticas e domínio das tecnologias utilizadas. Ele representa o básico do que sei fazer — e está longe de ser o limite do meu conhecimento.

---

## 🚀 Tecnologias

### Core

- **[Angular 21](https://angular.dev/)** — Framework para construção de aplicações web
- **[TypeScript](https://www.typescriptlang.org/)** — Superset do JavaScript com tipagem estática
- **[Angular Signals](https://angular.dev/guide/signals)** — API reativa moderna do Angular (signal, computed, effect, linkedSignal, rxResource)
- **[Angular Router](https://angular.dev/guide/routing)** — Roteamento com lazy loading e guards

### UI & Estilo

- **[Angular Material (MUI) v3](https://material.angular.dev/)** — Biblioteca de componentes baseada no Material Design 3
- **[Font Awesome](https://fontawesome.com/)** — Ícones adicionais via `@fortawesome/angular-fontawesome`

### Formulários

- **[Angular Signal Forms](https://angular.dev/guide/forms/signals/overview)** — Nova API de formulários baseada em Signals (developer preview)

### HTTP & Estado

- **[HttpClient](https://angular.dev/guide/http)** — Requisições HTTP nativas do Angular
- **[rxResource](https://angular.dev/guide/signals/resource)** — Gerenciamento de estado assíncrono com Signals

### Qualidade de Código

- **[ESLint](https://eslint.org/)** — Linting via `@angular-eslint/schematics` com flat config
- **[Prettier](https://prettier.io/)** — Formatação automática de código

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/KaLucas/angular-app.git
```

### 2. Acesse a pasta do projeto

```bash
cd angular-app
```

### 3. Instale as dependências

```bash
npm install
```

---

## 🔑 Acesso

Para acessar o sistema, utilize as credenciais abaixo:

| Campo  | Valor             |
| ------ | ----------------- |
| E-mail | `admin@email.com` |
| Senha  | `123456`          |

---

## ▶️ Como Usar

### Iniciando o servidor de desenvolvimento

```bash
npm start
```

A aplicação estará disponível em [http://localhost:4200](http://localhost:4200).

### Gerando build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`, prontos para deploy.

---

## 🧪 Testes

O projeto conta com dois tipos de teste:

### Testes Unitários — Vitest

Utiliza o **[Vitest](https://vitest.dev/)** com **Browser Mode** via `@angular/build:unit-test`, cobrindo services, guards e componentes isolados.

```bash
# Abre a interface visual do Vitest
npm run test

# Interface visual no browser
npm run test -- --ui
```

### Testes E2E — Cypress

Utiliza o **[Cypress](https://www.cypress.io/)** para testes end-to-end, cobrindo os principais fluxos da aplicação. Os testes são executados automaticamente via **[GitHub Actions](https://github.com/KaLucas/angular-app/actions/workflows/e2e.yml)** a cada push ou pull request na branch `master`.

```bash
# Abre a interface visual do Cypress
npx cypress open

# Executa em modo headless
npx cypress run
```

---

## 📁 Estrutura de Pastas

```
angular-app/
├── cypress/                     # Testes end-to-end
│   ├── e2e/
│   │   ├── auth/
│   │   ├── routes/
│   │   └── users/
│   ├── fixtures/                # Dados mockados
│   └── support/                 # Comandos customizados
├── public/                      # Arquivos estáticos públicos
├── src/
│   ├── app/
│   │   ├── core/                # Guards, interceptors, serviços globais
│   │   │   ├── guards/
│   │   │   └── services/
│   │   ├── shared/              # Componentes e models reutilizáveis
│   │   │   ├── components/
│   │   │   └── models/
│   │   ├── features/
│   │   │   ├── public/          # Área pública
│   │   │   │   └── main/
│   │   │   └── admin/           # Painel administrativo
│   │   │       ├── dashboard/
│   │   │       │   └── users-list/
│   │   │       ├── login/
│   │   │       └── shared/
│   │   │           ├── delete-dialog/
│   │   │           ├── sidebar/
│   │   │           └── user-form-dialog/
│   │   ├── services/            # Serviços HTTP
│   │   ├── store/               # Estado global com rxResource
│   │   ├── environments/        # Variáveis de ambiente
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   └── styles.scss
├── angular.json
├── cypress.config.ts
├── eslint.config.ts
├── tsconfig.json
└── package.json
```

---

## 📜 Scripts Disponíveis

| Comando            | Descrição                                          |
| ------------------ | -------------------------------------------------- |
| `npm start`        | Inicia o servidor de desenvolvimento na porta 4200 |
| `npm run build`    | Compila o TypeScript e gera o build de produção    |
| `npm run test`     | Executa os testes unitários com Vitest             |
| `npm run lint`     | Executa o ESLint para análise estática do código   |
| `npm run lint:fix` | Corrige automaticamente os erros de lint           |
| `npm run format`   | Formata o código com Prettier                      |
| `npx cypress open` | Abre a interface visual do Cypress                 |
| `npx cypress run`  | Executa os testes E2E em modo headless             |

---

## 📬 Contato

**Karina Lucas**

- 📧 [karina.lucas@gmail.com](mailto:karina.lucas@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/karinalucas/)
- 🐙 [GitHub](https://github.com/KaLucas)
