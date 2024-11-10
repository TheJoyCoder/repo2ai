export function Footer() {
  return (
    <footer className="w-full bg-gray-50 mt-24 py-12 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">© 2024 repo2ai.com</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/repo2ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacidad
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
