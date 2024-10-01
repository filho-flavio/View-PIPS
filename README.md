# PIPS - Frontend (React)

Este repositório contém o frontend do sistema **PIPS** (Plataforma Integrada de Planejamento de Saúde), desenvolvido em **React**. O frontend interage com uma API para fornecer dados e visualizações sobre indicadores de saúde pública, previsões, e análise de infraestrutura de serviços de saúde.

## Estrutura do Projeto

O frontend está organizado da seguinte maneira:

```
/src
│
├── /assets         # Arquivos de mídia, como imagens, ícones e estilos globais
├── /components     # Componentes reutilizáveis da interface do usuário
├── /context        # Contextos globais utilizando React Context API
├── /hooks          # Custom Hooks para abstração de lógica reutilizável
├── /layout         # Componentes que lidam com a estrutura da aplicação, como headers, footers, etc.
├── /pages          # Páginas principais do aplicativo, como Dashboard, Previsões, Análises, etc.
├── /reducer        # Redutores e lógica de estado global (usando useReducer ou Redux)
├── /routes         # Configuração de rotas da aplicação utilizando React Router
├── /utils          # Funções utilitárias e helpers para uso geral
└── index.js        # Ponto de entrada da aplicação
```

### Descrição das Pastas

- **assets/**: Contém arquivos estáticos, como imagens, arquivos SVG, e estilos globais (CSS ou SCSS). Aqui ficam os recursos que são utilizados em várias partes da aplicação.

- **components/**: Componentes reutilizáveis que são usados em várias páginas. Isso inclui botões, modais, formulários e outros elementos da interface de usuário que aparecem em diferentes partes do aplicativo.

- **context/**: Armazena os arquivos de configuração e implementação do React Context API, que gerenciam estados globais da aplicação (como o estado de autenticação, temas, etc.).

- **hooks/**: Custom hooks que encapsulam e compartilham lógica entre diferentes componentes. Exemplos incluem hooks para manipulação de APIs, autenticação, ou manipulação de formulários.

- **layout/**: Componentes que fazem parte da estrutura da aplicação, como o layout principal, cabeçalhos, rodapés, e barras laterais. Esses componentes geralmente são usados para manter a consistência visual e estrutural entre as páginas.

- **pages/**: As páginas principais do aplicativo. Cada arquivo nesta pasta representa uma página completa do sistema, como a página de login, dashboard, gráficos, ou previsões.

- **reducer/**: Contém redutores para manipulação de estados globais, caso o projeto utilize `useReducer` ou Redux. Os redutores definem como o estado deve mudar em resposta a determinadas ações.

- **routes/**: Arquivos de configuração do React Router, que define as rotas da aplicação, gerenciando a navegação entre as diferentes páginas.

- **utils/**: Funções utilitárias e helpers que ajudam na realização de tarefas comuns, como formatação de datas, manipulação de strings, cálculos, etc.

## Instalação e Configuração

### 1. Clone o Repositório

Clone o projeto para sua máquina local:

```bash
git clone https://github.com/filho-flavio/View-PIPS.git
cd pips-frontend
```

### 2. Instale as Dependências

Use o npm ou yarn para instalar todas as dependências necessárias:

```bash
npm install
```

### 3. Rodar a Aplicação

Após instalar as dependências e configurar o ambiente, inicie a aplicação localmente:

```bash
npm run dev
```

A aplicação será executada em `http://localhost:5173/`.

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

- `npm run dev`: Executa a aplicação em modo de desenvolvimento.
- `npm preview`: Executa preview da aplicação web.
- `npm run build`: Compila o aplicativo para produção.

## Fluxo de Trabalho

### 1. Componentização

A aplicação segue uma abordagem de **componentização**, onde cada elemento da interface do usuário é construído como um componente reutilizável. Isso facilita a manutenção, a escalabilidade, e a reutilização dos componentes.

### 2. Gerenciamento de Estado

O projeto utiliza a **Context API** ou **Redux** (dependendo da complexidade) para gerenciamento de estados globais, que são manipulados na pasta `reducer/` e `context/`. Isso facilita a passagem de dados entre componentes sem a necessidade de "prop drilling".

### 3. Hooks Customizados

A pasta `hooks/` contém hooks personalizados que encapsulam a lógica reutilizável, como chamadas a APIs ou manipulação de estados complexos. Isso ajuda a separar a lógica da interface e a manter os componentes mais enxutos.

### 4. Navegação e Rotas

O sistema de rotas da aplicação é gerido pela biblioteca **React Router**, que permite a navegação entre as páginas definidas na pasta `routes/`. Cada rota corresponde a uma página principal dentro da pasta `pages/`.

