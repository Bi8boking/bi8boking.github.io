'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const Heading = embedded ? 'h2' : 'h1';

    return (
        <div>
            <div className={embedded ? "mb-4" : "mb-8"}>
                <Heading className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</Heading>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {config.items.map((item, index) => (
                    <article
                        key={index}
                        className="card-bg rounded-xl border border-neutral-200 p-4 shadow-sm sm:p-5"
                    >
                        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>{item.title}</h3>
                            {item.date && (
                                <span className="shrink-0 whitespace-nowrap rounded-md bg-neutral-100 px-2.5 py-1 text-sm font-medium tabular-nums text-neutral-600">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className="text-sm font-medium text-accent">
                                {item.subtitle_icon && (
                                    <Image
                                        src={item.subtitle_icon}
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="mr-2 inline-block size-6 rounded-full bg-white object-contain align-middle"
                                    />
                                )}
                                {item.subtitle}
                            </p>
                        )}
                        {item.content && (
                            <div className="mt-3 text-base leading-relaxed text-neutral-700">
                                <ReactMarkdown components={markdownComponents}>
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}
