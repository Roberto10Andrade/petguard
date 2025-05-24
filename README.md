# 🐾 PetGuard

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

</div>

## 📋 Sobre o Projeto

O **PetGuard** é uma plataforma premium de monitoramento e cuidado animal, desenvolvida com foco em experiência do usuário, segurança e design moderno. Nossa missão é proporcionar uma solução completa para donos de pets que desejam gerenciar a saúde e bem-estar de seus animais de forma inteligente e intuitiva.

### ✨ Destaques

- 🔐 **Segurança Avançada**: Autenticação robusta via Firebase
- 🎨 **Design Premium**: Interface moderna com glassmorphism e tipografia clara
- 📱 **Totalmente Responsivo**: Experiência perfeita em qualquer dispositivo
- ⚡ **Performance Otimizada**: Construído com Next.js para máxima velocidade
- 🔄 **Atualizações em Tempo Real**: Monitoramento contínuo do seu pet

## 🚀 Tecnologias

- **Frontend:**
  - [Next.js 15+](https://nextjs.org/)
  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Icons](https://react-icons.github.io/react-icons/)

- **Backend & Autenticação:**
  - [Firebase Auth](https://firebase.google.com/products/auth)
  - [Firebase Firestore](https://firebase.google.com/products/firestore)

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Roberto10Andrade/petguard.git
   cd petguard
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Crie um arquivo .env.local na raiz do projeto
   cp .env.example .env.local
   ```
   Adicione suas credenciais do Firebase no arquivo `.env.local`

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse `http://localhost:3000` no seu navegador

## 📱 Funcionalidades

### 🔐 Autenticação
- Login com e-mail/senha
- Login com Google
- Recuperação de senha
- Proteção de rotas

### 👤 Perfil do Usuário
- Gerenciamento de dados pessoais
- Histórico de atividades
- Preferências de notificação

### 🐕 Gestão de Pets
- Cadastro de múltiplos pets
- Histórico médico
- Agendamento de consultas
- Registro de vacinas

## 🎨 Personalização

O PetGuard foi desenvolvido para ser facilmente personalizável:

- **Cores**: Edite o arquivo `tailwind.config.ts`
- **Componentes**: Modifique os arquivos em `src/app/components`
- **Páginas**: Personalize as rotas em `src/app`
- **Estilos**: Ajuste os estilos globais em `src/app/globals.css`




