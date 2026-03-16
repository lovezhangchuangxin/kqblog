import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} KQ Blog. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/rss.xml"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              RSS
            </Link>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              关于
            </Link>
          </div>
        </div>

        {/* Powered by */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Powered by Next.js & Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
