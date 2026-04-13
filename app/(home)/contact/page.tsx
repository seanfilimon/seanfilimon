import type { Metadata } from "next";
import { IoMailOutline, IoBusinessOutline, IoNewspaperOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoPersonOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sean Filimon for official business inquiries, media requests, and partnership opportunities.",
  keywords: "Sean Filimon, Sean F, contact, business inquiry, partnership, media, speaking, investment, collaboration",
};

const ACCEPTED_INQUIRIES = [
  { icon: IoBusinessOutline, text: "Established companies and startups with funding" },
  { icon: IoNewspaperOutline, text: "Media outlets and journalists" },
  { icon: IoBusinessOutline, text: "Partnership and collaboration opportunities" },
  { icon: IoBusinessOutline, text: "Speaking engagements and conferences" },
  { icon: IoBusinessOutline, text: "Investment discussions" },
];

const DECLINED_INQUIRIES = [
  "Sales pitches or cold outreach",
  "Recruitment for positions I haven't applied to",
  "Link exchange or SEO requests",
  "Unsolicited product demos",
  "Generic networking requests",
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 sm:py-32">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-fd-border bg-fd-card">
          <IoMailOutline className="h-8 w-8 text-fd-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact</h1>
        <p className="mx-auto mt-4 max-w-lg text-fd-muted-foreground">
          I appreciate your interest in reaching out. To ensure I can respond to meaningful inquiries, please review the guidelines below.
        </p>
      </div>

      {/* Important Notice */}
      <div className="mt-12 border border-fd-border bg-fd-card p-6">
        <h2 className="text-lg font-semibold">Before You Reach Out</h2>
        <p className="mt-2 text-sm text-fd-muted-foreground">
          Due to the volume of messages I receive, I can only respond to official inquiries from established organizations. 
          I read every message but cannot guarantee a response to all.
        </p>
      </div>

      {/* Two columns */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* Accepted */}
        <div className="border border-fd-border bg-fd-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <IoCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">I Respond To</h3>
          </div>
          <ul className="space-y-3">
            {ACCEPTED_INQUIRIES.map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-sm text-fd-muted-foreground">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-fd-foreground/50" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Declined */}
        <div className="border border-fd-border bg-fd-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <IoCloseCircleOutline className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold">Please Don&apos;t Send</h3>
          </div>
          <ul className="space-y-3">
            {DECLINED_INQUIRIES.map((text) => (
              <li key={text} className="flex items-start gap-3 text-sm text-fd-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-fd-muted-foreground/30" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Form / Email */}
      <div className="mt-12 border border-fd-border bg-fd-card p-8 text-center">
        <h2 className="text-xl font-semibold">Get In Touch</h2>
        <p className="mt-2 text-sm text-fd-muted-foreground">
          For legitimate business inquiries, please email me directly.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:sean@legionedge.ai"
            className="group flex w-full flex-col items-center gap-2 border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-foreground hover:bg-fd-accent/30 sm:w-auto sm:min-w-[200px]"
          >
            <IoBusinessOutline className="h-6 w-6 text-fd-muted-foreground transition-colors group-hover:text-fd-foreground" />
            <span className="text-sm font-semibold">Business</span>
            <span className="text-xs text-fd-muted-foreground">sean@legionedge.ai</span>
          </a>
          <a
            href="mailto:contact@seanfilimon.com"
            className="group flex w-full flex-col items-center gap-2 border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-foreground hover:bg-fd-accent/30 sm:w-auto sm:min-w-[200px]"
          >
            <IoPersonOutline className="h-6 w-6 text-fd-muted-foreground transition-colors group-hover:text-fd-foreground" />
            <span className="text-sm font-semibold">Personal</span>
            <span className="text-xs text-fd-muted-foreground">contact@seanfilimon.com</span>
          </a>
        </div>
        <p className="mt-6 text-xs text-fd-muted-foreground/60">
          Please include your company name, role, and a brief description of your inquiry.
        </p>
      </div>

      {/* Footer note */}
      <p className="mt-12 text-center text-sm text-fd-muted-foreground">
        Thank you for understanding. I look forward to connecting with you.
      </p>
    </main>
  );
}
