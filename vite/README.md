# YouTube Downloader Frontend

Um aplicativo React moderno e elegante para download de vídeos do YouTube, construído com as melhores tecnologias frontend.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** com SWC para build ultra-rápido
- **Tailwind CSS** para estilização moderna
- **React Hook Form** com validação Zod
- **Lucide React** para ícones elegantes
- **React Hot Toast** para notificações

## ✨ Características

- 🎯 **Interface Intuitiva**: Design moderno e responsivo
- 📱 **Mobile-First**: Funciona perfeitamente em todos os dispositivos
- 🔗 **Múltiplas URLs**: Suporte para download de vários vídeos simultaneamente
- ✅ **Validação Robusta**: Validação inteligente de URLs do YouTube
- 🎨 **Feedback Visual**: Estados de loading e notificações em tempo real
- 🛡️ **Type Safety**: Construído com TypeScript para máxima confiabilidade

## 🎬 Funcionalidades

- Formulário dinâmico para adicionar/remover URLs
- Validação em tempo real de URLs do YouTube
- Estados visuais de loading e sucesso
- Notificações toast para feedback do usuário
- Design responsivo com gradientes e animações
- Tratamento de erros elegante

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🔧 API Integration

O aplicativo envia requisições POST para o endpoint `/download` com o seguinte formato:

```json
{
  "urls": [
    "https://www.youtube.com/watch?v=exemplo1",
    "https://www.youtube.com/watch?v=exemplo2"
  ]
}
```

## 📁 Estrutura do Projeto

```
src/
├── App.tsx          # Componente principal com formulário
├── index.css        # Estilos Tailwind
└── main.tsx         # Ponto de entrada
```

## 🎨 Design System

- **Cores**: Paleta baseada em vermelho (YouTube) com tons suaves
- **Tipografia**: Sistema de fontes responsivo
- **Spacing**: Grid e espaçamento consistente
- **Animações**: Transições suaves e micro-interações

## 🛠️ Configuração do Ambiente

O projeto utiliza:
- **Vite** para desenvolvimento rápido
- **SWC** como compilador TypeScript
- **PostCSS** com Tailwind CSS
- **ESLint** para qualidade de código

## 📝 Validação

URLs aceitas incluem:
- `https://www.youtube.com/watch?v=ID`
- `https://youtu.be/ID`
- `https://www.youtube.com/embed/ID`
- `https://www.youtube.com/v/ID`

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
