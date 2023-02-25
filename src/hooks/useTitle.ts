import { useEffect } from 'react';

export const useTitle = (titlePage?: string) => {
  useEffect(() => {
    if (!titlePage) return;
    const prevTitle = document.title;
    document.title = titlePage;
    return () => {
      document.title = prevTitle;
    };
  }, [titlePage]);
};
