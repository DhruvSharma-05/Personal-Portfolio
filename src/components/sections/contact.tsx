"use client";

import { useId, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * EmailJS credentials are public by design (the service authenticates by domain
 * allowlist, not by this key). They live in env vars so they can be rotated
 * without a code change — see `.env.example`.
 */
const EMAILJS = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
};

const isConfigured = Boolean(
  EMAILJS.publicKey && EMAILJS.serviceId && EMAILJS.templateId,
);

type Status = "idle" | "sending" | "sent" | "error";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: undefined,
  },
];

function Field({
  id,
  label,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const shared =
    "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-text placeholder:text-muted/60 transition-colors duration-300 focus:border-accent focus:outline-none";

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea id={id} rows={5} className={`${shared} resize-y`} {...rest} />
      ) : (
        <input id={id} type={type} className={shared} {...rest} />
      )}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const uid = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!isConfigured) {
      setStatus("error");
      setMessage(
        `The form isn't configured yet. Email me directly at ${profile.email}.`,
      );
      return;
    }

    setStatus("sending");
    setMessage("");

    const data = new FormData(form);

    try {
      // `send` rather than `sendForm` so `current_time` still reaches the
      // template — the existing EmailJS template expects that variable.
      await emailjs.send(
        EMAILJS.serviceId!,
        EMAILJS.templateId!,
        {
          user_name: String(data.get("user_name") ?? "").trim(),
          user_email: String(data.get("user_email") ?? "").trim(),
          subject: String(data.get("subject") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          current_time: new Date().toLocaleString(),
        },
        { publicKey: EMAILJS.publicKey! },
      );
      setStatus("sent");
      setMessage("Message sent. I'll get back to you within a day or two.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        `Something went wrong sending that. Email me directly at ${profile.email}.`,
      );
    }
  }

  return (
    <Section id="contact" className="border-t border-line">
      <SectionHeader
        id="contact"
        index="06"
        title="Let's"
        accent="talk"
        lede="Roles, collaborations, or a question about something above — all welcome."
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <Reveal direction="up">
            <ul className="space-y-3">
              {channels.map((channel) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                      <channel.icon
                        className="size-4.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block truncate">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.label}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/50"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profile.socials
                .filter((s) => s.icon !== "mail")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/50"
                  >
                    <span className="flex items-center gap-3">
                      {social.icon === "github" ? (
                        <GitHubIcon className="size-5 text-accent" />
                      ) : (
                        <LinkedInIcon className="size-5 text-accent" />
                      )}
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {social.label}
                        </span>
                        <span className="block truncate font-mono text-xs text-muted">
                          {social.handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                ))}
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate={false}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id={`${uid}-name`}
                name="user_name"
                label="Name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
              <Field
                id={`${uid}-email`}
                name="user_email"
                type="email"
                label="Email"
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="mt-5 grid gap-5">
              <Field
                id={`${uid}-subject`}
                name="subject"
                label="Subject"
                placeholder="What's this about?"
                required
              />
              <Field
                id={`${uid}-message`}
                name="message"
                type="textarea"
                label="Message"
                placeholder="Tell me about the role or the project…"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-fill px-7 py-3.5 font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>

            {/* Announced to screen readers the moment the status changes. */}
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 min-h-[1.25rem] text-sm ${
                status === "error" ? "text-red-400" : "text-accent"
              }`}
            >
              {message}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
