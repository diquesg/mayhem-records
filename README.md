# 🎵 Mayhem Records

<div align="center">
  <img src="public/logos/logo2.svg" alt="Mayhem Records Logo" width="300">
  
  **E-commerce fictício especializado em discos de vinil**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

## 📖 Sobre o Projeto

Mayhem Records é uma plataforma fictícia de e-commerce moderna e responsiva dedicada à venda de discos de vinil. O projeto simula uma loja online completa com funcionalidades avançadas de navegação, busca, carrinho de compras e sistema de favoritos.

### 🎯 Objetivo

Criar uma experiência de compra imersiva para entusiastas de música, oferecendo uma interface elegante e funcional para descobrir e adquirir discos de vinil raros e populares.

## ✨ Funcionalidades

### 🛍️ E-commerce Completo
- **Catálogo de Produtos**: Navegação por álbuns com filtros por gênero e artista
- **Sistema de Busca**: Busca inteligente com histórico de pesquisas
- **Carrinho de Compras**: Adicionar, remover e gerenciar itens
- **Lista de Favoritos**: Salvar produtos para compra posterior
- **Processamento de Pagamento**: Simulação de pagamento via cartão e PIX

### 🎨 Interface e Experiência
- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Tema Escuro**: Interface moderna com paleta de cores elegante
- **Animações Suaves**: Transições e efeitos visuais aprimorados
- **Carrossel de Banners**: Destaque para promoções e lançamentos
- **Curadoria Editorial**: Seção especial com recomendações

### 🔍 Navegação Avançada
- **Filtros Dinâmicos**: Por gênero musical, artista e preço
- **Paginação**: Navegação eficiente através do catálogo
- **Overlay de Busca**: Interface de pesquisa sobreposta
- **Histórico de Navegação**: Breadcrumbs e navegação contextual

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Next.js 15.3.4](https://nextjs.org/)** - Framework React com SSR e SSG
- **[React 18](https://reactjs.org/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e customizáveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrossel responsivo

### Backend
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB
- **API Routes (Next.js)** - Endpoints RESTful integrados

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[PostCSS](https://postcss.org/)** - Processador CSS
- **[Turbopack](https://turbo.build/pack)** - Bundler de alta performance

## 📁 Estrutura do Projeto

```
mayhem-records/
├── public/                 # Arquivos estáticos
│   ├── backgrounds/        # Imagens de fundo
│   ├── banners/           # Banners promocionais
│   ├── icons/             # Ícones da aplicação
│   ├── images/            # Imagens gerais
│   ├── logos/             # Logotipos
│   └── payment/           # Ícones de pagamento
├── src/
│   ├── app/               # App Router (Next.js 13+)
│   │   ├── api/           # Rotas da API
│   │   ├── busca/         # Página de busca
│   │   ├── carrinho/      # Carrinho e pagamento
│   │   ├── catalogo/      # Catálogo de produtos
│   │   ├── configuracoes/ # Configurações do usuário
│   │   └── conta/         # Página da conta
│   ├── components/        # Componentes React
│   │   ├── common/        # Componentes compartilhados
│   │   ├── layout/        # Componentes de layout
│   │   └── ui/            # Componentes de interface
│   ├── hooks/             # Context providers
│   ├── types/             # Definições TypeScript
│   └── utils/             # Utilitários e helpers
├── components/            # Componentes UI base
└── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- MongoDB (local ou Atlas)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/mayhem-records.git
   cd mayhem-records
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas configurações:
   ```env
   MONGODB_URI=sua_string_de_conexao_mongodb
   NEXTAUTH_SECRET=sua_chave_secreta
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Páginas e Funcionalidades

### 🏠 Página Inicial
- Carrossel de banners promocionais
- Produtos em destaque
- Seção de curadoria editorial
- Navegação rápida para categorias

### 🔍 Busca
- Busca em tempo real
- Histórico de pesquisas
- Sugestões automáticas
- Filtros avançados

### 📚 Catálogo
- Listagem completa de produtos
- Filtros por gênero e artista
- Ordenação por relevância, preço e popularidade
- Paginação otimizada


### 🛒 Carrinho
- Adição/remoção de produtos
- Cálculo automático de totais
- Persistência entre sessões
- Processo de checkout simplificado

### 💳 Pagamento
- Simulação de pagamento por cartão
- Integração com PIX (simulado)
- Validação de formulários
- Confirmação de pedido

### ❤️ Favoritos
- Lista personalizada de produtos
- Acesso rápido aos itens salvos

## 🎨 Design System

### Paleta de Cores
- **Primária**: Tons de cinza e preto para elegância
- **Secundária**: Acentos coloridos para CTAs
- **Neutros**: Escala de cinzas para textos e backgrounds

### Tipografia
- **Libre Caslon Text**: Para títulos e destaques
- **Inter**: Para textos corridos e interface

### Componentes
- Botões com estados hover e active
- Cards responsivos para produtos
- Modais e overlays acessíveis
- Formulários com validação visual

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint automaticamente
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Comunidade Next.js pela excelente documentação
- Shadcn UI pelos componentes acessíveis
- Unsplash pelas imagens utilizadas no projeto

---

<div align="center">
  <p>Feito com ❤️ e muito ☕</p>
  <p>© 2025 Mayhem Records. Todos os direitos reservados.</p>
</div>
