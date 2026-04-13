"use client";

import { useTOCItems } from "fumadocs-ui/components/toc";
import { TOCItems, TOCItem } from "fumadocs-ui/components/toc/default";

export function BlogTOC() {
  const items = useTOCItems();

  return (
    <TOCItems>
      {items.map((item) => (
        <TOCItem key={item.url} item={item} />
      ))}
    </TOCItems>
  );
}
