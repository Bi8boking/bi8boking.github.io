'use client';

import { useEffect } from 'react';

export function useLocalizedPageTitle(title: string | undefined) {
  useEffect(() => {
    if (!title) return;

    const syncTitle = () => {
      if (document.title !== title) document.title = title;
    };

    syncTitle();
    // Next.js may restore the static title when it finishes hydrating the metadata.
    const observer = new MutationObserver(syncTitle);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [title]);
}
