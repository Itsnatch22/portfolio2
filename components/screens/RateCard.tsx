"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Clock3,
  Globe,
  MessageCircle,
  Phone,
  Rocket,
  ShoppingCart,
  TabletSmartphone,
  Wrench,
} from "lucide-react";
import Magnetic from "../ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const PHONE_DISPLAY = "0705683870";
const WHATSAPP_NUMBER = "254705683870";

const RATE_CARDS = [
  {
    title: "Personal Portfolio",
    price: "$149",
    timeline: "7 – 21 days",
    bestFor: "Developers, creatives, consultants, and personal brands.",
    accent: "from-amber-400/20 via-orange-500/10 to-transparent",
    icon: TabletSmartphone,
    features: [
      "Up to 5 sections",
      "Responsive design",
      "Basic contact form or WhatsApp CTA",
      "Simple animations and launch setup",
    ],
    message:
      "Hi Mark, I saw your rate card and I want a personal portfolio website. My budget is around $149.",
  },
  {
    title: "Landing Page",
    price: "$199",
    timeline: "3 – 7 days",
    bestFor: "Campaigns, products, waitlists, and single-offer businesses.",
    accent: "from-emerald-400/20 via-teal-500/10 to-transparent",
    icon: Rocket,
    features: [
      "One high-converting page",
      "Clear CTA strategy",
      "Lead capture form",
      "Speed and mobile optimization",
    ],
    message:
      "Hi Mark, I saw your rate card and I want a landing page for my business. My budget is around $199.",
  },
  {
    title: "Business Website",
    price: "$349",
    timeline: "14 – 28 days",
    bestFor: "Companies that need credibility, service pages, and inquiries.",
    accent: "from-sky-400/20 via-cyan-500/10 to-transparent",
    icon: Briefcase,
    features: [
      "Up to 7 pages",
      "Services, about, and contact pages",
      "WhatsApp + email contact flow",
      "Basic SEO structure",
    ],
    message:
      "Hi Mark, I saw your rate card and I want a business website. My budget is around $349.",
  },
  {
    title: "E-commerce Website",
    price: "$649",
    timeline: "30 – 90 days",
    bestFor: "Brands selling physical or digital products online.",
    accent: "from-fuchsia-400/20 via-rose-500/10 to-transparent",
    icon: ShoppingCart,
    features: [
      "Product catalog setup",
      "Cart and checkout flow",
      "Mobile-first shopping experience",
      "Admin-ready structure",
    ],
    message:
      "Hi Mark, I saw your rate card and I want an e-commerce website. My budget is around $649.",
  },
  {
    title: "Booking or Service Site",
    price: "$499",
    timeline: "30 – 60 days",
    bestFor: "Salons, clinics, coaches, agencies, and service businesses.",
    accent: "from-lime-300/20 via-green-500/10 to-transparent",
    icon: BadgeCheck,
    features: [
      "Service breakdown pages",
      "Booking or inquiry flow",
      "Trust-building sections",
      "WhatsApp handoff for fast conversion",
    ],
    message:
      "Hi Mark, I saw your rate card and I want a booking or service website. My budget is around $499.",
  },
  {
    title: "Custom Website Build",
    price: "From $999",
    timeline: "60 - 180+ days",
    bestFor: "Bigger websites with unique pages, flows, and integrations.",
    accent: "from-white/20 via-white/5 to-transparent",
    icon: Wrench,
    features: [
      "Custom scope and architecture",
      "Advanced sections and interactions",
      "Third-party integrations",
      "Discovery call before quote",
    ],
    message:
      "Hi Mark, I saw your rate card and I want a custom website build. Can we talk about scope and pricing?",
  },
] as const;

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function RateCardScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".rate-card");

    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    intro
      .from(".rate-topbar", {
        y: -32,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
      })
      .from(
        ".rate-eyebrow",
        {
          y: 28,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.35"
      )
      .from(
        ".rate-title-line",
        {
          y: 120,
          opacity: 0,
          rotate: 2,
          stagger: 0.12,
          duration: 1.15,
        },
        "-=0.3"
      )
      .from(
        ".rate-copy, .rate-chip, .rate-summary",
        {
          y: 32,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
        },
        "-=0.6"
      );

    gsap.from(".rate-band", {
      scaleX: 0,
      transformOrigin: "left center",
      ease: "power4.out",
      duration: 1,
      scrollTrigger: {
        trigger: ".rate-band",
        start: "top 85%",
      },
    });

    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        rotateX: 8,
        duration: 1,
        ease: "power4.out",
        delay: index % 3 === 0 ? 0 : 0.05,
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-24 h-105 w-105 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute right-[-12%] top-12 h-115 w-115 rounded-full bg-amber-500/10 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-95 w-95 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      <div className="rate-topbar relative z-10 mx-auto flex w-full max-w-350 items-center justify-between px-6 py-6 md:px-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>
        <a
          href={buildWhatsAppLink("Hi Mark, I saw your rate card and I'd like to talk about my website project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)', color: 'var(--link-color)' }}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>

      <main className="relative z-10 mx-auto max-w-350 px-6 pb-20 md:px-24 md:pb-28">
        <section className="grid gap-14 border-b pb-14 pt-10 md:grid-cols-[1.35fr_0.9fr] md:gap-16 md:pb-20" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <p className="rate-eyebrow mb-6 text-xs uppercase tracking-[0.34em]" style={{ color: 'var(--muted)' }}>
              Rate Card / Starting Prices
            </p>

            <div className="space-y-2">
              <div className="overflow-hidden">
                <h1 className="rate-title-line text-[16vw] font-playfair leading-[0.88] tracking-[-0.05em] md:text-[7.4vw]" style={{ color: 'var(--foreground)' }}>
                  WEBSITE
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="rate-title-line ml-[10vw] text-[16vw] font-playfair leading-[0.88] tracking-[-0.05em] md:ml-[5vw] md:text-[7.4vw]" style={{ color: 'var(--foreground)' }}>
                  CHARGES
                </h1>
              </div>
            </div>

            <p className="rate-copy mt-8 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: 'var(--muted)' }}>
              Clean pricing for common website types, designed to help clients
              understand where to start. Final quotes depend on content, number
              of pages, integrations, and custom functionality.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {["Responsive", "SEO-ready structure"].map((item) => (
                <span
                  key={item}
                  className="rate-chip rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em]"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--link-color)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="rate-summary rounded-4xl border p-6 backdrop-blur-sm md:p-8" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em]" style={{ color: 'var(--muted)' }}>
                  Direct Contact
                </p>
                <h2 className="mt-4 text-3xl font-playfair md:text-4xl" style={{ color: 'var(--foreground)' }}>
                  Let&apos;s price your next build.
                </h2>
              </div>
              <div className="rounded-full border p-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)' }}>
                <Phone className="h-5 w-5" style={{ color: 'var(--muted)' }} />
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="uppercase tracking-[0.22em]">Phone</span>
                <span className="text-base" style={{ color: 'var(--foreground)' }}>{PHONE_DISPLAY}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="uppercase tracking-[0.22em]">Currency</span>
                <span className="text-base" style={{ color: 'var(--foreground)' }}>USD</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="uppercase tracking-[0.22em]">Typical reply</span>
                <span className="inline-flex items-center gap-2 text-base" style={{ color: 'var(--foreground)' }}>
                  <Clock3 className="h-4 w-4" style={{ color: 'var(--muted)' }} />
                  Same day
                </span>
              </div>
            </div>

            <Magnetic className="mt-8 inline-block w-full">
              <a
                href={buildWhatsAppLink("Hi Mark, I saw your rate card and I'd like to discuss a website project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between rounded-full border px-5 py-4 text-sm font-medium uppercase tracking-[0.18em] transition-transform hover:scale-[1.01]"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
              >
                Chat on WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </aside>
        </section>

        <section className="py-14 md:py-20">
          <div className="rate-band mb-12 flex items-center justify-between gap-6 border-b border-t py-5" style={{ borderColor: 'var(--border-color)' }}>
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em]" style={{ color: 'var(--muted)' }}>
              <Globe className="h-4 w-4" />
              Different website types
            </div>
            <p className="hidden max-w-xl text-right text-sm md:block" style={{ color: 'var(--muted)' }}>
              These are starting prices for projects with a clear scope. Extra
              pages, payment systems, dashboards, copywriting, or custom
              integrations can change the final quote.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {RATE_CARDS.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rate-card group relative overflow-hidden rounded-[30px] border p-6 md:p-7"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)' }}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${card.accent} opacity-100 transition-opacity duration-500 group-hover:opacity-70`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_48%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-full border p-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)' }}>
                        <Icon className="h-5 w-5" style={{ color: 'var(--muted)' }} />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.24em]" style={{ color: 'var(--muted)' }}>
                        Starting from
                      </span>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-3xl font-playfair leading-tight" style={{ color: 'var(--foreground)' }}>
                        {card.title}
                      </h3>
                      <p className="mt-3 text-3xl font-medium tracking-tight md:text-4xl" style={{ color: 'var(--foreground)' }}>
                        {card.price}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {card.bestFor}
                      </p>
                    </div>

                    <div className="mt-6 rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)', color: 'var(--muted)' }}>
                      <div className="flex items-center justify-between gap-4">
                        <span className="uppercase tracking-[0.22em]">Timeline</span>
                        <span className="text-base" style={{ color: 'var(--foreground)' }}>{card.timeline}</span>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm" style={{ color: 'var(--muted)' }}>
                      {card.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--foreground)' }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: 'var(--muted)' }}>
                          Call / WhatsApp
                        </p>
                        <p className="mt-2 text-lg" style={{ color: 'var(--foreground)' }}>{PHONE_DISPLAY}</p>
                      </div>

                      <Magnetic className="inline-block">
                        <a
                          href={buildWhatsAppLink(card.message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors"
                          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)', color: 'var(--foreground)' }}
                        >
                          Contact
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="pb-4">
          <div className="rounded-[34px] border px-6 py-10 md:px-10 md:py-12" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--nav-bg)' }}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em]" style={{ color: 'var(--muted)' }}>
                  Need a custom quote?
                </p>
                <h2 className="mt-4 text-4xl font-playfair leading-tight md:text-5xl" style={{ color: 'var(--foreground)' }}>
                  Share your scope and I&apos;ll quote it properly.
                </h2>
                <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                  If your project needs advanced integrations, strategy, or a
                  larger content structure, the fastest route is WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:items-end">
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Phone: {PHONE_DISPLAY}</p>
                <Magnetic className="inline-block">
                  <a
                    href={buildWhatsAppLink("Hi Mark, I need a custom website quote. Here's a short summary of my project:")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-transform hover:scale-[1.01]"
                    style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                  >
                    Start on WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
