import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { blog, guides, articles, resources, events } from "@/lib/source";

function getAllContent() {
  const serialize = (
    pages: { url: string; data: Record<string, unknown> }[],
    type: string,
  ) =>
    pages.map((p) => ({
      url: p.url,
      type,
      title: p.data.title as string,
      description: (p.data.description as string) ?? "",
      tags: (p.data.tags as string[]) ?? [],
    }));

  return [
    ...serialize(blog.getPages(), "blog"),
    ...serialize(guides.getPages(), "guide"),
    ...serialize(articles.getPages(), "article"),
    ...serialize(resources.getPages(), "resource"),
    ...serialize(events.getPages(), "event"),
  ];
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const content = getAllContent();

  const contentContext = content
    .map(
      (c) =>
        `[${c.type.toUpperCase()}] "${c.title}" — ${c.description} (${c.url})${c.tags.length ? ` Tags: ${c.tags.join(", ")}` : ""}`,
    )
    .join("\n");

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: `You are an AI assistant on Sean Filimon's personal website. Sean is a 20-year-old entrepreneur who founded LegionEdge, the parent company behind Nokuva (AI-native design editor), Foltrac (cross-cloud deployment), Tavoc (IDE for monorepos), and W0rktree (open-source version control in Rust).

Your job is to help visitors find relevant content on the site and answer questions about Sean's work. Be concise, direct, and helpful. When referencing content, always include the URL as a markdown link.

Here is all the content available on the site:
${contentContext}

Guidelines:
- If the user asks about a topic covered by site content, reference the specific articles/guides/posts with links
- If the user asks about Sean, answer based on what you know about his projects
- Keep responses short and focused — 2-4 sentences max unless the user asks for detail
- Use a professional but approachable tone`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
