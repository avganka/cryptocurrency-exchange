import { RefObject, useLayoutEffect, useMemo, useState } from 'react';

interface useVirtualScrollProps {
  containerHeight: number;
  itemHeight: number;
  itemsCount: number;
  overscan?: number;
  containerRef: RefObject<HTMLElement>;
}

interface VirtualItem {
  index: number;
  offset: number;
}

export const useVirtualScroll = ({
  containerHeight,
  itemHeight,
  overscan = 3,
  itemsCount,
  containerRef
}: useVirtualScrollProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const handleScroll = () => {
      const scroll = containerRef.current?.scrollTop as number;

      setScrollTop(scroll);
    };

    handleScroll();

    containerRef.current.addEventListener('scroll', handleScroll);

    // eslint-disable-next-line consistent-return
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const virtualItems = useMemo(() => {
    const renderRangeStart = scrollTop;
    const renderRangeEnd = scrollTop + containerHeight;

    let startIndex = Math.floor(renderRangeStart / itemHeight);
    let endIndex = Math.ceil(renderRangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(endIndex + overscan, itemsCount - 1);

    const items: VirtualItem[] = [];

    // eslint-disable-next-line no-plusplus
    for (let index = startIndex; index <= endIndex; index++) {
      items.push({
        index,
        offset: index * itemHeight
      });
    }

    return items;
  }, [scrollTop, containerHeight, itemsCount]);

  const listHeight = itemHeight * itemsCount;

  return { virtualItems, listHeight };
};
