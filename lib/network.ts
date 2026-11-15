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

/*
 * Position categories, read from the title each person wrote for themselves.
 * The first category that matches wins, so everyone lands in exactly one.
 */
const POSITIONS: { label: string; test: (c: Connection) => boolean }[] = [
  {
    label: "Founders and co-founders",
    test: (c) =>
      /\b(co-?founder|founder|fondateur|cofundador|kurucu|oprichter)\b/i.test(c.position) &&
      !/\bfounder['’]s office\b/i.test(c.position),
  },
  {
    label: "Chief executives, presidents, owners and managing directors",
    test: (c) =>
      /\b(ceo|chief executive|chairman|managing director)\b|(?<!product )\bowner\b|(?<!vice )\bpresident\b/i.test(c.position) &&
      !/\bceo['’]s office\b/i.test(c.position),
  },
  {
    label: "Other C-level executives (CTO, COO, CRO, CMO, CIO and other chief officers)",
    test: (c) =>
      /\b(cto|coo|cfo|cmo|cro|cio|cpo|cbo|cso|caio|ciso)\b|\bchief (?!of staff\b)\w/i.test(c.position),
  },
  {
    label: "Investors and partners",
    test: (c) =>
      /\b(investor|investing|investments?|venture|angel|partner)\b/i.test(c.position) ||
      /\b(ventures?|capital(?! one| markets| care))\b/i.test(c.company),
  },
  {
    label: "Vice presidents",
    test: (c) => /\b(vp|svp|evp|cvp|vice president)\b/i.test(c.position),
  },
  {
    label: "Military officers",
    test: (c) =>
      /\b(brigadier|major|lieutenant) general\b|\b(colonel|admiral|lt\.? col)\b/i.test(c.position),
  },
  {
    label: "Directors, heads of function and general managers",
    test: (c) => /\b(director|head of|general manager)\b/i.test(c.position),
  },
  {
    label: "Research, science and academia",
    test: (c) =>
      /\b(scientist|research\w*|professor|lecturer|dean|teaching assistant)\b/i.test(c.position),
  },
  {
    label: "Marketing, community and developer relations",
    test: (c) =>
      /\b(marketing|marketer|community|developer (advocate|relations|experience|education)|devrel|events?|content|communications|brand|seo|evangelist|journalist|ghostwriter)\b/i.test(
        c.position,
      ),
  },
  {
    label: "Engineering and technical",
    test: (c) =>
      /\b(engineer\w*|developer|développeur|desenvolvedor|programmer|architect|technical staff|mts|devops|full[- ]?stack|front[- ]?end|back[- ]?end|tech(nical|nology)? lead|software|technologist)\b|\bsde/i.test(
        c.position,
      ),
  },
  {
    label: "Product and design",
    test: (c) => /\b(product|design\w*|ux|ui)\b/i.test(c.position),
  },
  {
    label: "Sales, partnerships, business development and customer roles",
    test: (c) =>
      /\b(sales|account (executive|manager|director)|business development|bdr|sdr|partnerships?|alliances|gtm|growth|customer|revenue|client)\b/i.test(
        c.position,
      ),
  },
  {
    label: "Recruiting and people",
    test: (c) => /\b(recruit\w*|talent|human resources|hr)\b/i.test(c.position),
  },
  {
    label: "Students, interns and fellows",
    test: (c) => /\b(student|intern|fellow|incoming)\b/i.test(c.position),
  },
  {
    label: "Operations, strategy, finance, legal and other management",
    test: (c) =>
      /\b(operations?|strategy|strategic|chief of staff|finance|financial|analyst|consult\w*|manager|counsel|associate|advis[eo]r|bank\w*|lead|specialist|coordinator|officer|supervisor)\b/i.test(
        c.position,
      ),
  },
  { label: "Other and unspecified", test: () => true },
];

/*
 * Government, military and intelligence employers, and the contractors that
 * serve them. Named one by one rather than matched by keyword: "State Street"
 * and "Mercor Intelligence" are not governments. Add an employer here when a
 * new export brings one in.
 */
const PUBLIC_SECTOR: {
  label: string;
  organizations: string[];
  /** Also matches anyone whose title says so, whatever their employer. */
  position?: RegExp;
  contractor?: boolean;
}[] = [
  {
    label: "United States military and Department of Defense",
    organizations: [
      "United States Air Force",
      "United States Department of the Navy",
      "US Army",
      "U.S. Army Corps of Engineers, Galveston District",
    ],
  },
  {
    label: "United States intelligence community",
    organizations: ["Central Intelligence Agency"],
  },
  {
    label: "United States federal government and Congress",
    organizations: ["U.S. Department of State", "US Senator Adam Schiff"],
  },
  {
    label: "United States state, local and territorial government",
    organizations: [
      "American Samoa Department of Education",
      "CalPERS",
      "City of Culver City",
      "City of Lawrence, KS",
      "City of Riverside",
      "Judicial Council of Georgia/Administrative Office of the Courts",
      "New York City Office of Technology & Innovation",
      "Santa Cruz County Sheriff's Office",
    ],
  },
  {
    label: "Governments and public bodies outside the United States",
    organizations: [
      "Economic Development Queensland",
      "Kurdistan Regional Government",
      "National Informatics Centre, Govt of India",
      "Services Australia",
      "Tameside and Glossop Integrated Care NHS FT",
    ],
  },
  {
    label: "Defense, aerospace and government contractors",
    contractor: true,
    organizations: [
      "BAE Systems Digital Intelligence",
      "Boeing",
      "Collins Aerospace",
      "Gov Close",
      "KBR, Inc.",
      "Leidos",
      "Lockheed Martin",
      "MANTECH",
      "Red Cat Holdings",
      "Sierra Nevada Corporation",
    ],
    position: /\bdefen[cs]e\b/i,
  },
];

/*
 * Earlier government service that a LinkedIn export can't show, because it
 * records only a current employer. Sean adds these from what he knows of the
 * person: the note leads their line everywhere, and `sector` (a PUBLIC_SECTOR
 * label) lists them there as well.
 */
const FORMER_SERVICE: { name: string; sector: string; note: string }[] = [
  {
    name: 'Israel "Izzy" Soong',
    sector: "United States intelligence community",
    note: "Former Director of AI for the CIA",
  },
  {
    name: "Rusty Byrne",
    sector: "United States intelligence community",
    note: "Former CIA CTO and Deputy CTO",
  },
];

interface Group {
  name: string;
  people: Connection[];
}

function personLine(
  person: Connection,
  { company = false, date = true } = {},
): string {
  const former = FORMER_SERVICE.find(({ name }) => name === person.name)?.note;
  const position =
    former && person.position ? `${former}; now ${person.position}` : (former ?? person.position);
  const role = [position, company ? person.company : ""].filter(Boolean).join(", ");
  return `- ${person.name}${role ? ` — ${role}` : ""}${date ? ` (connected ${monthYear(person.connected)})` : ""}`;
}

const byName = (a: Connection, b: Connection) => a.name.localeCompare(b.name);

function renderGroup(
  group: Group,
  options: { company?: boolean; date?: boolean } = {},
): string {
  return [
    `### ${group.name} (${count(group.people.length)})`,
    "",
    ...[...group.people].sort(byName).map((person) => personLine(person, options)),
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

  const positions: Group[] = POSITIONS.map(({ label }) => ({ name: label, people: [] }));
  for (const person of listed) {
    positions[POSITIONS.findIndex(({ test }) => test(person))].people.push(person);
  }

  // A title match is for people outside government: an Air Force officer whose
  // title says "Defense" is not a contractor.
  const governmentKeys = new Set(
    PUBLIC_SECTOR.filter((sector) => !sector.contractor).flatMap((sector) =>
      sector.organizations.map(organizationKey),
    ),
  );

  const publicSector = PUBLIC_SECTOR.map((sector) => {
    const keys = new Set(sector.organizations.map(organizationKey));
    return {
      name: sector.label,
      contractor: sector.contractor ?? false,
      people: listed.filter(
        (person) =>
          keys.has(organizationKey(person.company)) ||
          (!governmentKeys.has(organizationKey(person.company)) &&
            (sector.position?.test(person.position) ?? false)) ||
          FORMER_SERVICE.some(
            (former) => former.sector === sector.label && former.name === person.name,
          ),
      ),
    };
  });

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
    positions,
    publicSector,
  };
}

const network = build();

/** One line for the top of llms-full.txt. */
export const networkSummary = `Professional network: ${count(network.total)} LinkedIn connections across ${count(network.organizations.length)} organizations, as of ${monthYear(network.latest)}.`;

/** The full network section: totals, government and defense, then everyone by position and by organization. */
export function renderNetwork(): string {
  const n = network;
  const top = n.organizations.filter((group) => group.people.length >= 4);
  const government = n.publicSector.filter((sector) => !sector.contractor);
  const contractors = n.publicSector.filter((sector) => sector.contractor);
  const total = (groups: Group[]) =>
    groups.reduce((sum, group) => sum + group.people.length, 0);

  const overview = [
    "# Professional network (LinkedIn connections)",
    "",
    `Sean Filimon has ${count(n.total)} first-degree LinkedIn connections, made between ${monthYear(n.first)} and ${monthYear(n.latest)}. This section lists them so the breadth of his network can be understood: who he is connected to, the organization each belongs to and the position they hold.`,
    "",
    `Each company and position is what that person listed on LinkedIn when the list was exported in ${monthYear(n.latest)}, so some will have changed since. A connection is a professional contact, not an endorsement, partnership or business relationship. ${count(n.hidden)} connections keep their profile details private; they are counted in the totals and not listed.`,
    "",
    "The list is given three ways: government, military and intelligence connections first, then every connection by the kind of position they hold, then every connection by organization.",
    "",
    "## At a glance",
    "",
    `- Total connections: ${count(n.total)}`,
    `- Listed by name below: ${count(n.listed)}`,
    `- Organizations represented: ${count(n.organizations.length)}`,
    `- In government, the military or intelligence, now or formerly: ${count(total(government))}`,
    `- At defense, aerospace and government contractors: ${count(total(contractors))}`,
    `- At stealth startups: ${count(n.stealth.length)}`,
    `- Freelance or self-employed: ${count(n.independent.length)}`,
    "",
    "## Connections made per year",
    "",
    ...n.byYear.map(([year, total]) => `- ${year}: ${count(total)}`),
    "",
    "## Positions at a glance",
    "",
    "Each person is counted once, under the first line their own job title fits, so the split is approximate.",
    "",
    ...n.positions.map((group) => `- ${group.name}: ${count(group.people.length)}`),
    "",
    "## Organizations with the most connections",
    "",
    ...top.map((group) => `- ${group.name}: ${count(group.people.length)}`),
  ].join("\n");

  const publicSector = [
    [
      "## Government, military and intelligence connections",
      "",
      `${count(total(government))} connections work in, or formerly served in, government, the armed forces or an intelligence agency, and ${count(total(contractors))} work at defense, aerospace and government contractors; someone with earlier service who now works at a contractor appears under both. Each is shown with the employer and position they listed themselves at the time of the export. Earlier service is marked "Former" where it is known; the export itself records only a current employer.`,
    ].join("\n"),
    ...n.publicSector
      .filter((sector) => sector.people.length > 0)
      .map((sector) => renderGroup(sector, { company: true })),
  ];

  const byPosition = [
    [
      "## Connections by position",
      "",
      "Every listed connection, grouped by the kind of position they hold, with their exact title and organization.",
    ].join("\n"),
    ...n.positions
      .filter((group) => group.people.length > 0)
      .map((group) => renderGroup(group, { company: true, date: false })),
  ];

  const byOrganization = [
    [
      "## Connections by organization",
      "",
      "Every listed connection, grouped by the organization they belong to, with their position. Organizations with the most connections come first, then alphabetically.",
    ].join("\n"),
    ...n.organizations.map((group) => renderGroup(group)),
    renderGroup({ name: "Stealth startups", people: n.stealth }, { company: true }),
    renderGroup(
      { name: "Freelance and self-employed", people: n.independent },
      { company: true },
    ),
    renderGroup({ name: "No organization listed", people: n.unlisted }),
  ];

  return [overview, ...publicSector, ...byPosition, ...byOrganization].join("\n\n");
}

/*
 * The high-level connections llms.txt names, by area, each with a line on why
 * the group matters. Chosen by hand: senior leaders of well-known
 * organizations. Names must match data/connections.json exactly; a name that
 * isn't there fails the build rather than dropping out silently.
 */
const HIGHLIGHTS: { heading: string; significance: string; names: string[] }[] = [
  {
    heading: "AI hardware and cloud infrastructure",
    significance:
      "Leaders of the companies that design, build and rent out the compute AI runs on: the supply side of the industry Sean works in through LegionEdge.",
    names: [
      "Michael Dell",
      "Charlie Kawwas",
      "Michael Kagan",
      "Saša Zdjelar",
      "Howard Wright",
      "Matt Taylor",
      "Vik Malyala",
      "Kevin Van Gundy",
      "Kevin Cochrane",
      "Matt Dickerson",
      "Narek Tatevosyan",
      "Devang Sachdev",
    ],
  },
  {
    heading: "US military, defense and intelligence",
    significance:
      "Senior technology leadership in the Air Force, the Navy and the CIA, and at a major defense contractor: people who shape how AI is adopted in national security.",
    names: [
      'Doug "Beaker" Wickert',
      "Scott Heitmann",
      "Brad Worley",
      "Justin Fanelli",
      'Israel "Izzy" Soong',
      "Rusty Byrne",
      "Kristopher Reese",
      "Mike Harasimowicz",
    ],
  },
  {
    heading: "Big technology and enterprise",
    significance:
      "Executives at Microsoft, Google, Meta and large enterprises, including the people who run their startup, security and applied AI programs.",
    names: [
      "Steve Dispensa",
      "Eduardo Kassner",
      "Bassam Mehanni",
      "Sagar Pandya",
      "Zach Owens (欧文思)",
      "Masha Foley",
      "Louis Huynh",
      "Matt Ridenour",
      "Ari Lehavi",
      "Nick Griffin",
      "Jeff Wang",
    ],
  },
  {
    heading: "Founders of developer and AI infrastructure companies",
    significance:
      "Founders and chief executives of widely used developer and AI infrastructure products: peers building the same layer of the stack as Sean's own projects.",
    names: [
      "Avery Pennarun",
      "Sam Lambert",
      "Michael Grinich",
      "Andre Zayarni",
      "Ivan Burazin",
      "David Zhao",
      "Taranjeet Singh",
      "Magnus Müller",
      "Daniel Han",
      "Pierre Burgy",
      "Bailey Pumfleet",
      "Srini V. Srinivasan",
      "Andrey Cheptsov 🧬",
      "James Perry",
    ],
  },
  {
    heading: "Venture capital and investment",
    significance:
      "Partners and managing directors at venture and investment firms that fund AI and developer-tool companies, and the lawyers who structure those deals.",
    names: [
      "Rajko Radovanović",
      "Andy Hill",
      "Ilya Kirnos",
      "Salil Deshpande",
      "Anamitra Banerji",
      "Jeff Herbst",
      "Ray Wu",
      "Austin Arensberg",
      "Sunit Mukherjee",
      "DeRon Brown",
      "Kerty Levy",
      "Josh Seidenfeld",
    ],
  },
  {
    heading: "Public figures and developer educators",
    significance:
      "People with large public audiences, among them educators who teach software development to a wide following.",
    names: ["Logan Paul", "Adrian Hajdin", "Andrei Neagoie", "Ben Awad"],
  },
];

/** The network section of llms.txt: the totals, then only the high-level connections and why they matter. */
export function renderNetworkHighlights(fullListUrl: string): string {
  const n = network;
  const people = new Map(
    (connections as Connection[]).filter((c) => c.name).map((c) => [c.name, c]),
  );
  const government = n.publicSector.filter((sector) => !sector.contractor);
  const inGovernment = new Set(
    government.flatMap((sector) => sector.people.map((person) => person.name)),
  ).size;

  return [
    "## Network",
    "",
    `Sean Filimon has ${count(n.total)} first-degree LinkedIn connections across ${count(n.organizations.length)} organizations, as of ${monthYear(n.latest)}. Around ${count(n.positions[0].people.length)} are founders or co-founders, and ${count(inGovernment)} work in, or formerly served in, government, the military or intelligence.`,
    "",
    "Why it matters: Sean builds AI infrastructure and developer tools. His network reaches the leaders of the companies that make and sell AI compute, technology leadership in US defense and intelligence, the founders of the developer tools his products sit beside, and the investors who fund the sector.",
    "",
    `Only the most senior connections are named here, with the position and organization each listed on LinkedIn. A connection is a professional contact, not an endorsement, partnership or business relationship. The full list, by position and by organization, is in [llms-full.txt](${fullListUrl}).`,
    ...HIGHLIGHTS.flatMap((group) => [
      "",
      `### ${group.heading}`,
      "",
      group.significance,
      "",
      ...group.names.map((name) => {
        const person = people.get(name);
        if (!person) throw new Error(`Network highlight "${name}" is not in data/connections.json`);
        return personLine(person, { company: true, date: false });
      }),
    ]),
  ].join("\n");
}
