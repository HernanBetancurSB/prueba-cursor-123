# 🚀 Nexus Chat - Aplicación de Chat con IA

Una aplicación de chat moderna estilo ChatGPT/Gemini/Claude construida con Next.js 14, TypeScript y TailwindCSS.

![Nexus Chat](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características

- 🎨 **Diseño moderno y atractivo** - UI glassmorphism con animaciones suaves
- 💬 **Múltiples conversaciones** - Gestiona y alterna entre diferentes chats
- 💾 **Persistencia local** - Las conversaciones se guardan en localStorage
- 📱 **Totalmente responsive** - Funciona perfectamente en móvil y desktop
- ⚡ **Animaciones fluidas** - Transiciones suaves con Framer Motion
- 🌙 **Tema oscuro elegante** - Diseño optimizado para reducir fatiga visual
- ♿ **Accesible** - Implementación de ARIA labels y navegación por teclado
- 📝 **Markdown básico** - Soporte para formato de texto en mensajes

## 🛠️ Tecnologías

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **IDs únicos:** UUID

## 📦 Instalación

1. **Clona el repositorio o navega al directorio del proyecto:**

```bash
cd prueba-cursor-123
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Ejecuta el servidor de desarrollo:**

```bash
npm run dev
```

4. **Abre tu navegador en:**

```
http://localhost:3000
```

## 🚀 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta el linter |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css      # Estilos globales y Tailwind
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/
│   ├── ChatArea.tsx     # Área principal del chat
│   ├── ChatInput.tsx    # Input para enviar mensajes
│   ├── MessageBubble.tsx # Burbuja de mensaje
│   ├── MobileHeader.tsx # Header para móvil
│   ├── Sidebar.tsx      # Barra lateral con conversaciones
│   └── TypingIndicator.tsx # Indicador de escritura
├── hooks/
│   └── useChat.ts       # Hook personalizado para el estado del chat
├── types/
│   └── chat.ts          # Tipos TypeScript
└── utils/
    ├── aiResponses.ts   # Simulación de respuestas IA
    └── storage.ts       # Funciones de localStorage
```

## 🎯 Funcionalidades

### Conversaciones
- ✅ Crear nuevas conversaciones
- ✅ Eliminar conversaciones existentes
- ✅ Cambiar entre conversaciones
- ✅ Títulos automáticos basados en el primer mensaje
- ✅ Persistencia en localStorage

### Mensajes
- ✅ Enviar mensajes de texto
- ✅ Respuestas simuladas de IA
- ✅ Indicador de escritura mientras "piensa"
- ✅ Copiar mensajes al portapapeles
- ✅ Formato básico de markdown
- ✅ Auto-scroll a nuevos mensajes

### UI/UX
- ✅ Diseño glassmorphism
- ✅ Animaciones de entrada/salida
- ✅ Responsive design (móvil/desktop)
- ✅ Sidebar colapsable en móvil
- ✅ Sugerencias de prompts
- ✅ Contador de caracteres

## 🔧 Personalización

### Colores
Los colores principales se definen en `tailwind.config.ts`:
- `primary` - Azul para acentos principales
- `dark` - Escala de grises para el tema oscuro

### Respuestas de IA
Puedes modificar las respuestas simuladas en `src/utils/aiResponses.ts`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

Hecho con ❤️ usando Next.js y TailwindCSS
