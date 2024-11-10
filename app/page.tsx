import { auth } from '@/lib/auth';
import { RepoInput } from '../components/repo-input';
import { FileDown, Shield, FileSearch } from 'lucide-react';
import { SignInButton } from '../components/sign-in-button';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Extrae y visualiza repositorios de GitHub
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Accede y descarga el contenido completo de tus repositorios de GitHub de forma estructurada.
            Ideal para documentación, auditorías y análisis offline.
          </p>
          
          {session ? (
            <div className="mt-10">
              <RepoInput />
              <p className="mt-2 text-sm text-gray-500">
                Introduce la URL del repositorio que deseas exportar
              </p>
            </div>
          ) : (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <SignInButton />
            </div>
          )}
        </div>

        {/* Sección de características */}
        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Acceso Seguro</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Autenticación segura con GitHub OAuth. Accede a repositorios públicos y privados manteniendo el control total.
            </p>
          </div>
          
          <div className="relative p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <FileDown className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Dump Completo</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Obtén una copia completa del repositorio respetando la estructura de carpetas y archivos original.
            </p>
          </div>
          
          <div className="relative p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <FileSearch className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Exploración Sencilla</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Navega por el contenido del repositorio con una interfaz clara y descarga todo en un archivo comprimido.
            </p>
          </div>
        </div>

        {/* Nueva sección de AI después de las características */}
        <div className="mt-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Preparado para la IA</h2>
            <p className="text-lg text-gray-700 mb-6">
              Extrae tus repositorios en un formato optimizado para interactuar con modelos de lenguaje (LLMs).
              Analiza, comprende y obtén insights de tu código usando IA.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Análisis de Código con IA</h3>
                <p className="text-gray-600">
                  Estructura tu código de manera que los LLMs puedan entenderlo mejor y proporcionar análisis más precisos.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Documentación Inteligente</h3>
                <p className="text-gray-600">
                  Prepara tu repositorio para generar documentación automática y obtener respuestas contextualizadas sobre tu código.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de casos de uso */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">Casos de Uso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Documentación y Auditoría</h3>
              <p className="text-gray-600">
                Ideal para revisar la estructura y contenido de repositorios de manera offline o compartirlo con otros equipos.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Análisis y Respaldo</h3>
              <p className="text-gray-600">
                Obtén una copia local completa de tus proyectos para análisis detallado o como respaldo de seguridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
