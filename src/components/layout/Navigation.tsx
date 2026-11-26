'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { getMessages } from '@/lib/i18n/messages';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { cn } from '@/lib/utils';
import type { SiteConfig } from '@/lib/config';
import type { I18nRuntimeConfig } from '@/types/i18n';

type NavigationItem = SiteConfig['navigation'][number];

interface NavigationProps {
  items: NavigationItem[];
  siteTitle: string;
  enableOnePageMode?: boolean;
  i18n: I18nRuntimeConfig;
  itemsByLocale?: Record<string, NavigationItem[]>;
  siteTitleByLocale?: Record<string, string>;
}

export default function Navigation({
  items,
  siteTitle,
  enableOnePageMode,
  i18n,
  itemsByLocale,
  siteTitleByLocale,
}: NavigationProps) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const locale = useLocaleStore(state => i18n.enabled && state.isReady ? state.locale : i18n.defaultLocale);
  const [activeTarget, setActiveTarget] = useState('about');
  const messages = getMessages(locale);
  const effectiveItems = itemsByLocale?.[locale] || itemsByLocale?.[i18n.defaultLocale] || items;
  const effectiveTitle = siteTitleByLocale?.[locale] || siteTitleByLocale?.[i18n.defaultLocale] || siteTitle;
  const observeSections = Boolean(enableOnePageMode && pathname === '/');

  useEffect(() => {
    if (!observeSections) return;

    const syncHash = () => setActiveTarget(window.location.hash.slice(1) || 'about');
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);

    const sections = effectiveItems
      .filter(item => item.type !== 'link')
      .map(item => document.getElementById(item.target))
      .filter((section): section is HTMLElement => section !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      setActiveTarget(current => {
        if (visible.has(current)) return current;
        return sections.find(section => visible.has(section.id))?.id || current;
      });
    }, { rootMargin: '-17% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, [effectiveItems, observeSections]);

  function linkProps(item: NavigationItem) {
    const isAnchor = enableOnePageMode && item.type !== 'link';
    const href = isAnchor ? `/#${item.target}` : item.href;
    const active = item.type !== 'link' && (
      observeSections ? activeTarget === item.target : pathname === (item.href.replace(/\/$/, '') || '/')
    );
    const current: 'location' | 'page' | undefined = active ? (observeSections ? 'location' : 'page') : undefined;

    return {
      href,
      'aria-current': current,
      onClick: () => {
        if (isAnchor) setActiveTarget(item.target);
      },
      className: cn(
        'block whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200',
        active ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white',
      ),
    };
  }

  return (
    <Disclosure as="nav" aria-label={messages.navigation.menu} className="fixed inset-x-0 top-0 z-50 bg-[var(--navbar)] text-white shadow-sm">
      {({ open }) => (
        <>
          <div className="site-container flex h-14 items-center justify-between gap-3">
            <Link href="/" className="min-w-0 truncate rounded-sm text-lg font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200">
              {effectiveTitle}
            </Link>

            <div className="flex shrink-0 items-center gap-2">
              <ul className="hidden items-center gap-0.5 lg:flex">
                {effectiveItems.map(item => (
                  <li key={item.target}>
                    <Link {...linkProps(item)}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <LanguageToggle i18n={i18n} />
              <ThemeToggle />
              <DisclosureButton
                aria-label={open ? messages.navigation.closeMainMenu : messages.navigation.openMainMenu}
                className="flex h-9 items-center gap-1.5 rounded-md border border-white/20 px-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 lg:hidden"
              >
                {open ? <XMarkIcon className="size-4" aria-hidden="true" /> : <Bars3Icon className="size-4" aria-hidden="true" />}
                <span className="hidden min-[360px]:inline">{messages.navigation.menu}</span>
              </DisclosureButton>
            </div>
          </div>

          <DisclosurePanel className="border-t border-white/10 lg:hidden">
            <ul className="site-container space-y-1 py-2">
              {effectiveItems.map(item => (
                <li key={item.target}>
                  <DisclosureButton as={Link} {...linkProps(item)}>{item.title}</DisclosureButton>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
