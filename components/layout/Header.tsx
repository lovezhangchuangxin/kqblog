'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/about', label: '关于' },
  { href: '/links', label: '友链' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-background border-b border-border'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group relative text-xl font-bold text-foreground
                       hover:text-primary transition-colors duration-300"
          >
            <span className="relative z-10">KQ Blog</span>
            {/* Logo 悬停光效 */}
            <span
              className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100
                         transition-opacity duration-300 -z-10"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1), transparent 70%)',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg font-medium
                              transition-all duration-300
                              ${isActive
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                              }`}
                >
                  {link.label}
                  {/* 活动指示器 */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5
                                 bg-primary rounded-full animate-underline-expand"
                    />
                  )}
                  {/* 悬停背景 */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100
                               transition-opacity duration-200 -z-10"
                    style={{
                      background: 'hsl(var(--secondary))',
                    }}
                  />
                </Link>
              );
            })}
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center
                         rounded-lg text-foreground hover:bg-secondary
                         transition-colors duration-200"
              aria-label="切换菜单"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left
                    ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300
                    ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left
                    ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out
                      ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav className="py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200
                      ${isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animation: isMenuOpen ? `fade-in-up 0.3s ease-out ${index * 50}ms forwards` : 'none',
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
