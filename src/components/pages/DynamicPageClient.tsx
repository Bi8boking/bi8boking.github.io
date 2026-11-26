'use client';

import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import { Publication } from '@/types/publication';
import {
  PublicationPageConfig,
  TextPageConfig,
  CardPageConfig,
} from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useLocalizedPageTitle } from '@/lib/i18n/useLocalizedPageTitle';

export type DynamicPageLocaleData = { siteTitle: string } & (
  | { type: 'publication'; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; config: TextPageConfig; content: string }
  | { type: 'card'; config: CardPageConfig }
);

interface DynamicPageClientProps {
  dataByLocale: Record<string, DynamicPageLocaleData>;
  defaultLocale: string;
}

export default function DynamicPageClient({ dataByLocale, defaultLocale }: DynamicPageClientProps) {
  const locale = useLocaleStore(state => state.isReady ? state.locale : defaultLocale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const pageData = dataByLocale[locale] || fallback;
  useLocalizedPageTitle(pageData ? `${pageData.config.title} | ${pageData.siteTitle}` : undefined);

  if (!pageData) {
    return null;
  }

  return (
    <div className="site-container max-w-4xl py-6 sm:py-8">
      {pageData.type === 'publication' && (
        <PublicationsList config={pageData.config} publications={pageData.publications} />
      )}
      {pageData.type === 'text' && (
        <TextPage config={pageData.config} content={pageData.content} />
      )}
      {pageData.type === 'card' && (
        <CardPage config={pageData.config} />
      )}
    </div>
  );
}
