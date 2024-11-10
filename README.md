# repo2ai.com

Repo2AI es una plataforma que permite extraer y visualizar el contenido completo de repositorios de GitHub de manera estructurada y segura. Diseñada para facilitar el acceso y análisis de repositorios, con especial enfoque en la preparación de datos para su uso con modelos de lenguaje (LLMs).

## 🚀 Características Principales

### Acceso Simple y Seguro
- Autenticación mediante GitHub OAuth
- Soporte para repositorios públicos y privados
- Control total sobre permisos y accesos

### Extracción Completa del Repositorio
- Dump completo respetando la estructura de carpetas y archivos
- Visualización clara del contenido del repositorio
- Soporte para todo tipo de archivos (código, documentación, configuraciones)

### Visualización y Descarga
- Interfaz organizada que refleja la jerarquía del repositorio
- Opción de descarga completa en formato comprimido
- Navegación intuitiva por el contenido

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14, React, TypeScript
- **Autenticación**: NextAuth.js con GitHub Provider
- **Estilos**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Notificaciones**: Sonner
- **Estado**: React Hooks
- **Routing**: Next.js App Router

## 🔧 Configuración del Proyecto

### Prerrequisitos

- Node.js 18.x o superior
- Una cuenta de GitHub
- Credenciales de OAuth de GitHub

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_aleatorio
```

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/repo2ai.com.git
cd repo2ai.com
```

2. Instala las dependencias:
```bash
bun install
```

3. Inicia el servidor de desarrollo:
```bash
bun run dev
```

## 🚀 Estructura del Proyecto

```
repo2ai.com/
├── app/                    # Directorio principal de la aplicación
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout principal
│   └── repo/             # Rutas para visualización de repositorios
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI básicos
│   ├── repo-input.tsx    # Input principal
│   └── repo-viewer.tsx   # Visualizador de repositorios
├── lib/                   # Utilidades y configuraciones
│   ├── auth.ts           # Configuración de autenticación
│   └── github.ts         # Utilidades para la API de GitHub
└── public/               # Archivos estáticos
```

## 📖 Casos de Uso

### Documentación y Auditoría
- Revisión de estructura y contenido de repositorios
- Compartir contenido con equipos sin acceso directo a GitHub
- Generación de documentación basada en el código

### Análisis y Respaldo
- Copias locales para análisis detallado
- Respaldos de seguridad de repositorios
- Preparación de datos para análisis con IA

### Integración con IA
- Exportación de código en formato optimizado para LLMs
- Análisis automatizado de código
- Generación de documentación inteligente

## 🔒 Seguridad

- Autenticación segura mediante OAuth 2.0
- Tokens de acceso temporales
- Sin almacenamiento de credenciales
- Acceso limitado según los permisos otorgados
- Scope de GitHub limitado a lo necesario

## 🤝 Contribución

Las contribuciones son bienvenidas.
## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📬 Contacto

- Sitio Web: [repo2ai.com](https://repo2ai.com)
- GitHub: [@repo2ai](https://github.com/thejoycoder/repo2ai)

