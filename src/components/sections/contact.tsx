"use client";

import { useId, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/content/profile";
import { enquiryKinds } from "@/content/services";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Panel, PanelHead } from "@/components/ui/panel";
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
  options,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  /** Present → renders a <select> of these values instead of an input. */
  options?: readonly string[];
}) {
  // 16px input text: anything smaller makes iOS zoom the viewport on focus.
  const shared =
    "w-full rounded-sharp border border-line bg-surface-2 px-4 py-3 text-base text-text placeholder:text-muted/60 transition-colors duration-150 focus:border-accent focus:outline-none";

  return (
    <div>
      <label htmlFor={id} className="type-label mb-2 block text-muted">
        {label}
      </label>
      {options ? (
        <select id={id} className={shared} defaultValue={options[0]} {...rest}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
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
        `The form isn’t configured yet. Email me directly at ${profile.email}.`,
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
          subject: [
            String(data.get("enquiry_kind") ?? "").trim(),
            String(data.get("subject") ?? "").trim(),
          ]
            .filter(Boolean)
            .join(" — "),
          message: String(data.get("message") ?? "").trim(),
          current_time: new Date().toLocaleString(),
        },
        { publicKey: EMAILJS.publicKey! },
      );
      setStatus("sent");
      setMessage("Message sent. I’ll get back to you within a day or two.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        `Something went wrong sending that. Email me directly at ${profile.email}.`,
      );
    }
  }

  return (
    <Section id="contact">
      <SectionHeader
        id="contact"
        title="Let’s"
        accent="talk"
        lede="Roles, collaborations, or a question about something above — all welcome."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Reveal direction="up" className="h-full">
            <Panel className="h-full">
              <PanelHead label="Direct" trailing="Channels" />
              <ul className="divide-y divide-line">
                {channels.map((channel) => {
                  const inner = (
                    <>
                      <span className="grid size-10 shrink-0 place-items-center rounded-sharp border border-line bg-surface-2 text-accent">
                        <channel.icon
                          className="size-4.5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="type-label block text-muted">
                          {channel.label}
                        </span>
                        <span className="mt-1 block truncate">
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
                          className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-surface-2"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-5 py-4">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.socials
                .filter((s) => s.icon !== "mail")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ticks group flex items-center justify-between gap-3 rounded-sharp border border-line bg-surface p-4 transition-colors duration-150 hover:border-line-strong"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      {social.icon === "github" ? (
                        <GitHubIcon className="size-5 shrink-0 text-accent" />
                      ) : (
                        <LinkedInIcon className="size-5 shrink-0 text-accent" />
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
                    <ArrowRight
                      className="size-4 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                ))}
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.08}>
          <Panel>
            <PanelHead label="Send a message" trailing="Form" />
            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
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

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  id={`${uid}-kind`}
                  name="enquiry_kind"
                  label="This is about"
                  options={enquiryKinds}
                  required
                />
                <Field
                  id={`${uid}-subject`}
                  name="subject"
                  label="Subject"
                  placeholder="One line of detail"
                  required
                />
              </div>

              <div className="mt-5">
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
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sharp bg-accent-fill px-7 py-3.5 font-semibold text-accent-ink transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
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
                  status === "error" ? "text-error" : "text-accent"
                }`}
              >
                {message}
              </p>
            </form>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
