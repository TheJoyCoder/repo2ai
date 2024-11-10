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

## 🔧 Configuración del Proyecto

### Prerrequisitos

- Node.js 18.x o superior
- Una cuenta de GitHub
- Credenciales de OAuth de GitHub

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
GITHUB_CLIENT
