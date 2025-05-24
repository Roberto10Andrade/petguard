# 🐾 PetGuard

Sistema premium para monitoramento e cuidado animal, focado em experiência do usuário, segurança e design moderno.

## ✨ Descrição
O **PetGuard** é uma aplicação web desenvolvida em Next.js e React, com autenticação via Firebase, voltada para donos de pets que desejam monitorar, cadastrar e gerenciar informações dos seus animais de forma prática, segura e elegante.

## 🚀 Principais Recursos
- Cadastro e login com e-mail/senha ou Google
- Interface minimalista e responsiva (mobile/desktop)
- Design premium com glassmorphism e tipografia clara
- Navbar inteligente: ícone de perfil só aparece quando logado
- Acesso seguro e rápido ao dashboard e funcionalidades
- Totalmente integrado ao Firebase Auth

## 🛠️ Tecnologias Utilizadas
- [Next.js](https://nextjs.org/) 15+
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Auth](https://firebase.google.com/products/auth)
- [React Icons](https://react-icons.github.io/react-icons/)

## ⚡ Instalação e Uso
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/petguard.git
   cd petguard
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
yarn install
   ```
3. **Configure o Firebase:**
   - Renomeie `.env.example` para `.env.local` (se existir) e adicione suas chaves do Firebase.
   - Ou edite `src/app/firebaseConfig.ts` com suas credenciais.
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
yarn dev
   ```
5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🔒 Autenticação
- O sistema utiliza [Firebase Auth](https://firebase.google.com/products/auth) para login seguro.
- Cadastro e login por e-mail/senha ou Google.
- Navbar exibe ícone de perfil e menu apenas quando o usuário está logado.

## 🎨 Personalização
- Altere cores, fontes e imagens em `src/app/components` e `tailwind.config.js`.
- Para mudar textos, edite os arquivos em `src/app/cadastro/page.tsx` e `src/app/login/page.tsx`.

## 🤝 Contribuição
Pull requests são bem-vindos! Sinta-se à vontade para propor melhorias ou abrir issues.

## 📧 Suporte
Dúvidas ou sugestões? Abra uma issue ou envie um e-mail para [seu-email@dominio.com].

---
Feito com ❤️ para os pets!


- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
