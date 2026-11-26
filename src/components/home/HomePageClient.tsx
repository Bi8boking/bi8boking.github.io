'use client';

import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { cn } from '@/lib/utils';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  homeColumns: Record<string, SiteConfig['navigation'][number]['home_column']>;
  interestHeading?: string;
  researchInterests?: string[];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  const columnPages = data.pagesToShow.filter(page => page.type === 'card' && data.homeColumns[page.id]);
  const leftPages = columnPages.filter(page => data.homeColumns[page.id] === 'left');
  const rightPages = columnPages.filter(page => data.homeColumns[page.id] === 'right');
  const hasBothColumns = leftPages.length > 0 && rightPages.length > 0;
  const { enableOnePageMode } = data;

  function renderPage(page: PageData) {
    return (
      <section
        key={page.id}
        id={page.id}
        className={cn(
          'min-w-0 scroll-mt-20 space-y-5',
          page.type === 'card' && !columnPages.includes(page) && 'surface-card p-6 sm:p-9',
        )}
      >
        {page.type === 'about' && page.sections.map((section) => {
          switch (section.type) {
            case 'markdown':
              return <About key={section.id} content={section.content || ''} title={section.title} />;
            case 'publications':
              return (
                <SelectedPublications
                  key={section.id}
                  publications={section.publications || []}
                  title={section.title}
                  enableOnePageMode={enableOnePageMode}
                />
              );
            case 'list':
              return <News key={section.id} items={section.items || []} title={section.title} />;
            default:
              return null;
          }
        })}
        {page.type === 'publication' && (
          <PublicationsList config={page.config} publications={page.publications} embedded />
        )}
        {page.type === 'text' && <TextPage config={page.config} content={page.content} embedded />}
        {page.type === 'card' && <CardPage config={page.config} embedded />}
      </section>
    );
  }

  return (
    <div className="site-container grid gap-5 py-6 sm:py-7 lg:grid-cols-[15.75rem_minmax(0,1fr)] lg:gap-7">
      <Profile
        author={data.author}
        social={data.social}
        features={data.features}
        interestHeading={data.interestHeading}
        researchInterests={data.researchInterests}
      />
      <div className="min-w-0 space-y-5">
        {data.pagesToShow.map(page => {
          if (!columnPages.includes(page)) return renderPage(page);
          if (page !== columnPages[0]) return null;

          return (
            <div key={page.id} className={cn('surface-card grid gap-7 p-6 sm:p-8', hasBothColumns && 'md:grid-cols-2 md:gap-0')}>
              {leftPages.length > 0 && (
                <div className={cn('min-w-0 space-y-7', hasBothColumns && 'md:pr-6 lg:pr-8')}>
                  {leftPages.map(renderPage)}
                </div>
              )}
              {rightPages.length > 0 && (
                <div className={cn('min-w-0 space-y-7', hasBothColumns && 'border-t border-neutral-200 pt-7 md:border-t-0 md:border-l md:pt-0 md:pl-6 lg:pl-8')}>
                  {rightPages.map(renderPage)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
