import { source } from "@/lib/source";
import type { InferPageType } from "fumadocs-core/source";
import { siteUrl } from "@/lib/metadata";

export function getLLMText(page: InferPageType<typeof source>) {
  return `# ${page.data.title} (${siteUrl}${page.url})\n\n${page.data.description ?? ""}`;
}
