import connections from "@/data/connections.json";

/*
 * Sean's LinkedIn network, rendered as plain text for llms-full.txt.
 *
 * data/connections.json comes from a LinkedIn connections export with the
 * profile URLs and email addresses removed: it holds each connection's name,
 * the company and position they listed, and the date they connected. Entries
 * with an empty name are connections whose profile details LinkedIn withholds;
 * they count toward the totals and are never listed.
 */

interface Connection {
  name: string;
  company: string;
  position: string;
  /** ISO date, e.g. "2026-11-13". */
  connected: string;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const monthYear = (iso: string) =>
  `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

const count = (n: number) => n.toLocaleString("en-US");

/* Not organizations: people between companies, or who haven't named theirs. */
const STEALTH = /^stealth\b/i;
const INDEPENDENT = /^(freelanc\w*|self[- ]?employed|various startups)\b/i;

/* One key per organization: case, a YC batch tag and a trailing "Inc." or
   "Ltd." don't make "Okta, Inc." a different company from "Okta". */
function organizationKey(company: string): string {
  return company
    .toLowerCase()
    .replace(/\s*\(yc [^)]*\)/, "")
    .replace(/,?\s+(inc|ltd)\.?$/, "")
    .trim();
}

/* Seniority and function, read from the title each person wrote for
   themselves. A title can match more than one. */
const ROLES: { label: string; test: (c: Connection) => boolean }[] = [
  {
    label: "Founders, co-founders, owners and chief executives",
    test: (c) =>
      /\b(co-?founder|founder|ceo|chief executive|owner)\b/i.test(c.position),
  },
  {
    label:
      "Other senior leaders (C-level, president, partner, VP, director, head of)",
    test: (c) =>
      /\b(chief|c[a-z]o|president|partner|vp|vice president|director|head of|general manager)\b/i.test(
        c.position,
      ) && !/\b(co-?founder|founder|ceo|chief executive|owner)\b/i.test(c.position),
  },
  {
    label: "Investors and venture capital",
    test: (c) =>
      /\b(investor|investing|investments?|venture|angel)\b/i.test(c.position) ||
      /\b(ventures?|capital|vc)\b/i.test(c.company),
  },
  {
    label: "Engineers and developers",
    test: (c) =>
      /\b(engineer\w*|developer|programmer|sde|architect|technical staff)\b/i.test(
        c.position,
      ),
  },
];

interface Group {
  name: string;
  people: Connection[];
}

function personLine(person: Connection, withCompany = false): string {
  const role = [person.position, withCompany ? person.company : ""]
    .filter(Boolean)
    .join(", ");
  return `- ${person.name}${role ? ` — ${role}` : ""} (connected ${monthYear(person.connected)})`;
}

function renderGroup(group: Group, withCompany = false): string {
  const people = [...group.people].sort((a, b) => a.name.localeCompare(b.name));
  return [
    `### ${group.name} (${count(people.length)})`,
    "",
    ...people.map((person) => personLine(person, withCompany)),
  ].join("\n");
}

function build() {
  const all = connections as Connection[];
  const listed = all.filter((c) => c.name);

  const organizations = new Map<string, Group>();
  const stealth: Connection[] = [];
  const independent: Connection[] = [];
  const unlisted: Connection[] = [];

  for (const person of listed) {
    if (!person.company) unlisted.push(person);
    else if (STEALTH.test(person.company)) stealth.push(person);
    else if (INDEPENDENT.test(person.company)) independent.push(person);
    else {
      const key = organizationKey(person.company);
      const group = organizations.get(key);
      // The first spelling seen names the group; the export is newest first.
      if (group) group.people.push(person);
      else organizations.set(key, { name: person.company, people: [person] });
    }
  }

  const ranked = [...organizations.values()].sort(
    (a, b) =>
      b.people.length - a.people.length || a.name.localeCompare(b.name),
  );

  const byYear = new Map<string, number>();
  for (const c of all) {
    const year = c.connected.slice(0, 4);
    byYear.set(year, (byYear.get(year) ?? 0) + 1);
  }

  const dates = all.map((c) => c.connected).sort();

  return {
    total: all.length,
    listed: listed.length,
    hidden: all.length - listed.length,
    organizations: ranked,
    stealth,
    independent,
    unlisted,
    byYear: [...byYear.entries()].sort(([a], [b]) => a.localeCompare(b)),
    first: dates[0],
    latest: dates[dates.length - 1],
    roles: ROLES.map((role) => ({
      label: role.label,
      total: listed.filter(role.test).length,
    })),
  };
}

const network = build();

/** One line for the top of llms-full.txt. */
export const networkSummary = `Professional network: ${count(network.total)} LinkedIn connections across ${count(network.organizations.length)} organizations, as of ${monthYear(network.latest)}.`;

/** The full network section: totals, the largest organizations, everyone by organization. */
export function renderNetwork(): string {
  const n = network;
  const top = n.organizations.filter((group) => group.people.length >= 4);

  const overview = [
    "# Professional network (LinkedIn connections)",
    "",
    `Sean Filimon has ${count(n.total)} first-degree LinkedIn connections, made between ${monthYear(n.first)} and ${monthYear(n.latest)}. This section lists them so the breadth of his network can be understood: who he is connected to, where they work and what they do.`,
    "",
    `Each company and position is what that person listed on LinkedIn when the list was exported in ${monthYear(n.latest)}, so some will have changed since. A connection is a professional contact, not an endorsement, partnership or business relationship. ${count(n.hidden)} connections keep their profile details private; they are counted in the totals and not listed.`,
    "",
    "## At a glance",
    "",
    `- Total connections: ${count(n.total)}`,
    `- Listed by name below: ${count(n.listed)}`,
    `- Organizations represented: ${count(n.organizations.length)}`,
    `- At stealth startups: ${count(n.stealth.length)}`,
    `- Freelance or self-employed: ${count(n.independent.length)}`,
    "",
    "## Connections made per year",
    "",
    ...n.byYear.map(([year, total]) => `- ${year}: ${count(total)}`),
    "",
    "## Roles",
    "",
    "Counted from the words in each person's own job title, so these are approximate, and one person can count under more than one line.",
    "",
    ...n.roles.map((role) => `- ${role.label}: ${count(role.total)}`),
    "",
    "## Organizations with the most connections",
    "",
    ...top.map((group) => `- ${group.name}: ${count(group.people.length)}`),
    "",
    "## Connections by organization",
    "",
    "Organizations with the most connections first, then alphabetically. People are in alphabetical order within each.",
  ].join("\n");

  const groups = [
    ...n.organizations.map((group) => renderGroup(group)),
    renderGroup({ name: "Stealth startups", people: n.stealth }, true),
    renderGroup(
      { name: "Freelance and self-employed", people: n.independent },
      true,
    ),
    renderGroup({ name: "No organization listed", people: n.unlisted }),
  ];

  return [overview, ...groups].join("\n\n");
}
