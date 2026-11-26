'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getMessages } from '@/lib/i18n/messages';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface LanguageToggleProps {
  i18n: I18nRuntimeConfig;
}

export default function LanguageToggle({ i18n }: LanguageToggleProps) {
  const locale = useLocaleStore(state => state.isReady ? state.locale : i18n.defaultLocale);
  const setLocale = useLocaleStore(state => state.setLocale);

  if (!i18n.enabled || !i18n.switcher || i18n.locales.length <= 1) {
    return null;
  }

  const currentLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;

  return (
    <div className="relative shrink-0">
      <select
        aria-label={getMessages(currentLocale).navigation.language}
        value={currentLocale}
        onChange={event => setLocale(event.target.value)}
        className="h-9 w-[5.25rem] cursor-pointer appearance-none rounded-md border border-white/20 bg-[var(--navbar)] py-1 pl-2 pr-5 text-sm font-medium text-slate-100 transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
      >
        {i18n.locales.map(option => (
          <option key={option} value={option} lang={option}>{i18n.labels[option] || option}</option>
        ))}
      </select>
      <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-slate-200" />
    </div>
  );
}
