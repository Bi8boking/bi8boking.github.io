'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import { getMessages } from '@/lib/i18n/messages';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
}

export default function Footer({ lastUpdated, lastUpdatedByLocale, defaultLocale = 'en' }: FooterProps) {
  const locale = useLocaleStore((state) => state.isReady ? state.locale : defaultLocale);
  const messages = getMessages(locale);

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <footer className="border-t border-neutral-200/70">
      <div className="site-container py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-neutral-500">
            {messages.footer.lastUpdated} {resolvedLastUpdated}
          </p>
          <p className="text-sm text-neutral-500">
            <a href="https://github.com/xyjoey/PRISM" target="_blank" rel="noopener noreferrer">
              {messages.footer.builtWithPrism}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
