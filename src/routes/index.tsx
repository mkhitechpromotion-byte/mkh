import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Layers, Target, Users, Smartphone, Wallet, Coins, FileText, ArrowDownUp, ShieldCheck,
  MessageCircle, Menu, X, ArrowRight, ExternalLink, AlertTriangle, Play, Volume2, VolumeX, Captions,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { whatsappUrl, OFFICIAL_URL } from "@/lib/whatsapp";
import logoAsset from "@/assets/mk-logo.jpg";
import introVideo from "@/assets/mk-promo-intro.mp4";
import showcaseVideo from "@/assets/mk-promo-showcase.mp4";
import showcaseVideoWebm from "@/assets/mk-promo-showcase.webm";
import journeyVideo from "@/assets/mk-promo-journey.mp4";
import journeyVideoWebm from "@/assets/mk-promo-journey.webm";
import introVideoWebm from "@/assets/mk-promo-intro.webm";

const TITLE = "MK Hi-Tech Promotion | Explore Staking, Token Utility and Digital Services";
const DESC =
  "Discover the MK Hi-Tech Promotion ecosystem, explore its digital features, review important platform information, and get answers to your questions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#overview", label: "Overview" },
  { href: "#features", label: "Platform Features" },
  { href: "#how", label: "How It Works" },
  { href: "#faq", label: "FAQs" },
];

function WhatsAppButton({ children, size = "lg" }: { children: ReactNode; size?: "sm" | "lg" }) {
  const cls =
    size === "lg"
      ? "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold"
      : "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold";
  if (!whatsappUrl) {
    return (
      <span className="inline-flex flex-col items-start gap-1">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="WhatsApp number not configured yet"
          className={`${cls} cursor-not-allowed bg-whatsapp/40 text-whatsapp-foreground opacity-70`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> {children}
        </button>
        {size === "lg" && (
          <span className="text-xs text-warning">WhatsApp contact coming soon — number not yet configured.</span>
        )}
      </span>
    );
  }
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} (opens WhatsApp in a new tab)`}
      className={`${cls} bg-whatsapp text-whatsapp-foreground shadow-glow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden /> {children}
    </a>
  );
}

function Logo() {
  return (
    <a href="#overview" className="flex min-w-0 items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="MK Hi-Tech Promotion coin logo"
        className="h-10 w-10 shrink-0 rounded-full border border-primary/40 object-cover shadow-glow"
        width={40}
        height={40}
      />
      <span className="truncate font-display text-base font-semibold sm:text-lg">MK Hi-Tech Promotion</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5">
        <Logo />
        <div className="flex items-center gap-6">
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block"><WhatsAppButton size="sm">Chat on WhatsApp</WhatsAppButton></div>
          <button
            className="rounded-lg p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 hover:bg-muted">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3"><WhatsAppButton size="sm">Chat on WhatsApp</WhatsAppButton></div>
        </nav>
      )}
    </header>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

const CAPTION_LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
  { code: "sw", label: "Kiswahili" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "ru", label: "Русский" },
  { code: "tr", label: "Türkçe" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ไทย" },
];

function VideoPanel({
  sources, label, caption, captions, aspect = "aspect-video", className = "",
}: {
  sources: { mp4: string; webm: string }; label: string; caption?: string; captions?: string; aspect?: string; className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState("off");

  // Show only the chosen subtitle track (or none).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const t = tracks[i];
      if (t) t.mode = t.language === lang ? "showing" : "disabled";
    }
  }, [lang]);

  // Play while the video is on screen, pause when it scrolls out. Keeps
  // autoplay working after browsers pause off-screen videos, and saves
  // bandwidth on mobile.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Browser autoplay policies require videos to start muted; this handler
  // unmutes only after a direct viewer tap, which is always allowed.
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      video.volume = 1;
      video.play().catch(() => {});
    }
  };

  return (
    <figure className={`group relative overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-card ${className}`}>
      <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className={`relative w-full ${aspect} object-cover`}
      >
        <source src={sources.mp4} type="video/mp4" />
        <source src={sources.webm} type="video/webm" />
        {captions && CAPTION_LANGS.map((l) => (
          <track key={l.code} kind="subtitles" srcLang={l.code} label={l.label} src={`/captions/${captions}.${l.code}.vtt`} />
        ))}
      </video>
      <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
        <Play className="h-3 w-3" aria-hidden /> {label}
      </span>
      <div className="absolute right-4 top-4 z-10 flex flex-wrap justify-end gap-2">
        {captions && (
          <label className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/80 py-1 pl-3 pr-1 text-xs font-semibold text-foreground backdrop-blur focus-within:ring-2 focus-within:ring-ring">
            <Captions className="h-4 w-4" aria-hidden />
            <span className="sr-only">Subtitles for {label}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="cursor-pointer rounded-full bg-transparent py-1 pr-1 text-xs font-semibold text-foreground outline-none [&>option]:bg-card"
            >
              <option value="off">CC off</option>
              {CAPTION_LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
        )}
        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={!muted}
          aria-label={muted ? `Turn on sound for ${label}` : `Turn off sound for ${label}`}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3.5 py-2 text-xs font-semibold text-foreground backdrop-blur transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
          {muted ? "Tap for sound" : "Sound on"}
        </button>
      </div>
      {caption && (
        <figcaption className="border-t border-border bg-card/80 px-5 py-3.5 text-sm text-muted-foreground backdrop-blur">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const FEATURES = [
  { icon: Layers, tag: "Staking", title: "Explore Staking Pools", text: "Review available staking pools, their published terms, lock-up periods, applicable fees, and reward structures before making any commitment." },
  { icon: Target, tag: "Prediction games", title: "Interactive Digital Experiences", text: "Explore prediction-based and arcade-style games available on the platform. Understand the rules, costs, and potential losses before participating." },
  { icon: Users, tag: "P2P marketplace", title: "Peer-to-Peer Commerce", text: "Discover the platform's peer-to-peer marketplace and review how offers, payments, counterparties, and transactions work." },
  { icon: Smartphone, tag: "Everyday utilities", title: "Practical Digital Services", text: "Explore available services such as airtime, mobile data, and other supported utilities, subject to current platform availability." },
  { icon: Wallet, tag: "Wallet & activity", title: "Track Your Platform Activity", text: "Learn how wallet balances, staking positions, transactions, and eligible reward records are displayed within the platform." },
];

const STEPS = [
  { title: "Discover", text: "Explore the official MK Hi-Tech Promotion platform to understand the available features, supported tokens, and platform requirements." },
  { title: "Ask Questions", text: "Contact our representative on WhatsApp for assistance finding the official documentation, understanding the onboarding process, and reviewing the relevant terms." },
  { title: "Make an Informed Decision", text: "Review the costs, restrictions, potential losses, and withdrawal conditions before deciding whether to connect a wallet or participate." },
];

const TRANSPARENCY = [
  { icon: Coins, title: "Understand the token", text: "Learn about the supported tokens, their uses, and the factors that may affect their value." },
  { icon: FileText, title: "Review staking terms", text: "Check reward calculations, lock-up periods, early withdrawal fees, and applicable conditions." },
  { icon: ArrowDownUp, title: "Understand withdrawals", text: "Review withdrawal eligibility, network fees, processing requirements, and any restrictions." },
  { icon: ShieldCheck, title: "Protect your wallet", text: "Never share your recovery phrase, private keys, passwords, or wallet access credentials with a representative." },
];

const FAQS: [string, string][] = [
  ["What is MK Hi-Tech Promotion?", "MK Hi-Tech Promotion describes a crypto-based ecosystem offering staking, prediction games, peer-to-peer commerce, token utilities, and selected everyday services. Visit the official platform to review its current features."],
  ["Is MK Hi-Tech Promotion a traditional savings account?", "No. Its crypto-based features should not be treated as equivalent to a bank savings account or a guaranteed-return product. Digital assets and staking arrangements can involve substantial risk."],
  ["Can I make money using the platform?", "Some platform features involve potential rewards, but outcomes are not guaranteed. Returns, token prices, fees, and participation results can vary. You may lose some or all of the funds you commit."],
  ["How do I learn about onboarding?", "Review the official website and its terms first. You can then contact our representative on WhatsApp for help understanding the documented onboarding steps."],
  ["Do I need a crypto wallet?", "Some platform features require a compatible wallet connected to the supported network. Review the official instructions and understand wallet security before connecting."],
  ["Can I withdraw my funds at any time?", "Withdrawal availability may depend on the asset, pool conditions, platform rules, processing requirements, and network fees. Check the current terms for the exact conditions before participating."],
  ["Is any return guaranteed?", "No. Do not assume that any return, reward, token value, or withdrawal is guaranteed. Review the relevant risks and terms before making a financial decision."],
  ["How do I contact a representative?", "Use the WhatsApp contact button on this page to ask questions and request official information."],
];

const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3.5 text-base font-semibold transition hover:border-primary/50 hover:text-primary";

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        {/* Hero */}
        <section id="overview" className="relative bg-hero">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <div className="animate-rise">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore the MK Hi-Tech Promotion ecosystem</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                Explore Digital Finance <span className="text-gradient">Beyond the Ordinary.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                MK Hi-Tech Promotion brings together crypto staking, token-powered experiences, prediction games, peer-to-peer commerce, and selected everyday services in one digital ecosystem. Discover how the platform works before deciding whether it is right for you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
                <WhatsAppButton>Chat With Us on WhatsApp</WhatsAppButton>
                <a href="#features" className={outlineBtn}>Explore the Platform <ArrowRight className="h-4 w-4" /></a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Learn first. Understand the risks. Make informed decisions.</p>
            </div>
            <div className="relative animate-rise [animation-delay:150ms]">
              <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" aria-hidden />
              <VideoPanel
                sources={{ mp4: introVideo.url, webm: introVideoWebm.url }} captions="intro"
                label="Ecosystem overview"
                caption="A guided look through the MK Hi-Tech Promotion ecosystem."
                className="relative"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <SectionHead
            eyebrow="Platform features"
            title="One Ecosystem. Multiple Ways to Explore."
            text="Discover a connected digital environment designed to bring token utility, interactive experiences, and everyday services together."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className={`group rounded-2xl border border-border bg-card p-7 shadow-card transition hover:border-primary/40 lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{f.tag}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            ))}
            <VideoPanel
              sources={{ mp4: showcaseVideo.url, webm: showcaseVideoWebm.url }} captions="showcase"
              label="Platform showcase"
              caption="A short look at the platform in action."
              className="sm:col-span-2 lg:col-span-6"
            />
          </div>
        </section>

        {/* How */}
        <section id="how" className="border-y border-border bg-surface-deep">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <SectionHead eyebrow="How it works" title="Your Journey Starts With Understanding." />
            <ol className="mt-14 grid gap-5 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border border-border bg-card p-7">
                  <span className="font-display text-4xl font-semibold text-gradient">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
            <VideoPanel
              sources={{ mp4: journeyVideo.url, webm: journeyVideoWebm.url }} captions="journey"
              label="The full walkthrough"
              caption="Follow the complete journey from first questions to informed participation."
              className="mt-12"
            />
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <WhatsAppButton>Ask a Question on WhatsApp</WhatsAppButton>
              <p className="max-w-md text-sm text-muted-foreground">
                There is no obligation to participate. Take time to understand the platform before committing funds.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <SectionHead
            eyebrow="Transparency"
            title="Know What You're Getting Into."
            text="Understanding how a digital asset platform operates is an important part of making informed decisions."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRANSPARENCY.map((t) => (
              <div key={t.title} className="rounded-2xl border border-border bg-card p-6">
                <t.icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
              Read the Official Platform Information <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="px-5">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/20 bg-cta px-6 py-16 text-center shadow-glow sm:px-12 md:py-20">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-whatsapp/15 text-whatsapp">
              <MessageCircle className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Have Questions Before You Begin?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Speak with a representative to learn more about MK Hi-Tech Promotion, understand the available features, and find the official information you need to evaluate the platform.
            </p>
            <div className="mt-8 flex justify-center"><WhatsAppButton>Chat With Us on WhatsApp</WhatsAppButton></div>
            <p className="mt-5 text-sm text-muted-foreground">Get information. Ask questions. Decide at your own pace.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <SectionHead eyebrow="FAQs" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-12">
            {FAQS.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Risk */}
        <section id="risk" className="mx-auto max-w-4xl px-5 pb-20">
          <div className="rounded-2xl border border-warning/30 bg-card p-7 sm:p-10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-warning" aria-hidden />
              <h2 className="text-xl font-semibold sm:text-2xl">Important Information About Digital Asset Risk</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>Digital assets, staking, and prediction-based activities involve risk. Token prices may fluctuate, rewards may change, and technical, liquidity, smart-contract, counterparty, or platform-related issues may result in financial loss. You may lose some or all of the funds you commit.</p>
              <p>Displayed reward rates, where available, should not be interpreted as guaranteed profits. Past activity does not establish future performance. Before participating, review the applicable terms, fees, withdrawal conditions, and the legal and regulatory status of the operator in your jurisdiction.</p>
              <p>This page provides general platform information and is not personalised financial advice. Do not commit money you cannot afford to lose.</p>
            </div>
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              Review the official terms <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-hero">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
            <img
              src={logoAsset.url}
              alt="MK Hi-Tech Promotion coin logo"
              width={96}
              height={96}
              className="mx-auto h-24 w-24 rounded-full border border-primary/40 object-cover shadow-glow"
            />
            <h2 className="mt-8 text-3xl font-semibold sm:text-4xl">Start With the Right Information.</h2>
            <p className="mt-4 text-muted-foreground">
              Curious about MK Hi-Tech Promotion? Explore the official platform, ask your questions, and understand the details before deciding on your next step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">
              <WhatsAppButton>Chat With Us on WhatsApp</WhatsAppButton>
              <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-3.5 font-semibold text-primary hover:underline">
                Visit the Official Website <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A crypto-based digital ecosystem combining staking, token utility, prediction games, peer-to-peer commerce, and selected everyday services.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Platform Features</a></li>
              <li><a href="#how" className="hover:text-foreground">How It Works</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Information</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Official Website</a></li>
              <li><a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Terms</a></li>
              <li><a href="#risk" className="hover:text-foreground">Risk Information</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MK Hi-Tech Promotion. Information page — not financial advice.
        </div>
      </footer>
    </div>
  );
}
