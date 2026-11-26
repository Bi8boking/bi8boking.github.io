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
        <div className={embedded ? undefined : "surface-card p-6 sm:p-9"}>
            <div className={embedded ? "mb-3" : "mb-6"}>
                <Heading className={`${embedded ? "text-xl" : "text-3xl"} font-semibold tracking-tight text-primary`}>{config.title}</Heading>
                {config.description && (
                    <div className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className="divide-y divide-neutral-200/75">
                {config.items.map((item, index) => (
                    <article key={index} className="flex items-start gap-2.5 py-3 first:pt-0 last:pb-0">
                        {item.image && (
                            <Image
                                src={item.image}
                                alt=""
                                width={28}
                                height={28}
                                className="mt-0.5 size-7 shrink-0 rounded-full bg-white object-contain"
                            />
                        )}
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                <h3 className="text-base font-semibold leading-relaxed text-primary">{item.title}</h3>
                                {item.date && (
                                    <span className="ml-auto shrink-0 whitespace-nowrap text-sm tabular-nums text-neutral-600">
                                        {item.date}
                                    </span>
                                )}
                            </div>
                            {item.subtitle && (
                                <p className="mt-1 text-sm leading-relaxed text-neutral-600">
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
                                <div className="mt-1.5 text-base leading-relaxed text-foreground">
                                    <ReactMarkdown components={markdownComponents}>
                                        {item.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                            {item.tags && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="rounded bg-neutral-100 px-2 py-1 text-sm text-neutral-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
