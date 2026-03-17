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

  // 关闭菜单时禁止背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // 路由变化时关闭菜单
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-background border-b border-border'
        }`}
      >
        <div className="mx-4 md:mx-8 lg:mx-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="group relative text-lg md:text-xl font-bold text-foreground
                         hover:text-primary transition-colors duration-300"
            >
              <span className="relative z-10">KQ Blog</span>
              <span
                className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 -z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1), transparent 70%)',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm
                                transition-all duration-300
                                ${isActive
                                  ? 'text-primary'
                                  : 'text-muted-foreground hover:text-foreground'
                                }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5
                                   bg-primary rounded-full"
                      />
                    )}
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
              <div className="ml-1">
                <ThemeSwitcher />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeSwitcher />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center
                           rounded-lg text-foreground hover:bg-secondary
                           transition-colors duration-200"
                aria-label="打开菜单"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* 背景遮罩 */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* 侧边栏 */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-background border-l border-border
                      shadow-xl transition-transform duration-300 ease-out
                      ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold text-foreground">导航</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                         text-muted-foreground hover:text-foreground hover:bg-secondary
                         transition-colors duration-200"
              aria-label="关闭菜单"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium
                              transition-all duration-200
                              ${isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                              }
                              ${isMenuOpen ? 'animate-slide-in-right' : ''}`}
                  style={{
                    animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 侧边栏底部 */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2025 KQ Blog
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
