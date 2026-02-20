import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-stone-900 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-sm border-b border-stone-200/70">
        <div className="container mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="Invoice Wizard"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-semibold text-sm tracking-tight text-stone-900">
              Invoice Wizard
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            <a
              href="#how-it-works"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150"
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150"
            >
              Features
            </a>
          </nav>
          <Link href="/generate">
            <button className="h-8 px-4 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors duration-150 cursor-pointer">
              Create Invoice
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
          {/* Left: Copy */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-medium text-stone-500 tracking-wide">
                Free · No account needed
              </span>
            </div>

            <h1 className="text-[2.75rem] lg:text-[3.25rem] leading-[1.07] font-bold text-stone-900 tracking-tight">
              Invoice like a pro.
              <br />
              <span className="text-stone-400">In under two minutes.</span>
            </h1>

            <p className="mt-6 text-[0.9375rem] text-stone-500 leading-relaxed max-w-[22rem]">
              Fill in your details, pick a template, and download a
              pixel-perfect PDF — all in your browser.
            </p>

            <div className="mt-9 flex items-center gap-5">
              <Link href="/generate">
                <button className="h-11 px-6 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer">
                  Start for free
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
              <span className="text-xs text-stone-400">
                No sign-up · Works offline
              </span>
            </div>

            <div className="mt-12 pt-10 border-t border-stone-200 grid grid-cols-3 gap-4">
              {[
                { value: "6", label: "Templates" },
                { value: "1-click", label: "PDF export" },
                { value: "0", label: "Data stored" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-stone-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Invoice card mock */}
          <div className="relative select-none">
            {/* Shadow cards */}
            <div className="absolute inset-x-4 -bottom-3 h-full rounded-2xl bg-stone-300/40 border border-stone-300/60" />
            <div className="absolute inset-x-2 -bottom-1.5 h-full rounded-2xl bg-stone-200/60 border border-stone-300/40" />

            {/* Main invoice card */}
            <div className="relative bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              {/* Top bar */}
              <div className="border-b border-stone-100 px-7 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-stone-900 flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">IW</span>
                  </div>
                  <span className="text-xs font-semibold text-stone-700">
                    Acme Studio LLC
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    Sent
                  </span>
                </div>
              </div>

              <div className="px-7 py-6">
                {/* Invoice number + meta */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">
                      Invoice
                    </p>
                    <p className="text-2xl font-bold text-stone-900 tracking-tight">
                      #INV-0248
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">
                      Due date
                    </p>
                    <p className="text-sm font-semibold text-stone-900">
                      Apr 12, 2026
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Net 30</p>
                  </div>
                </div>

                {/* Bill info */}
                <div className="grid grid-cols-2 gap-5 mb-7 p-4 rounded-xl bg-stone-50 border border-stone-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1.5">
                      From
                    </p>
                    <p className="text-xs font-semibold text-stone-900">
                      Acme Studio LLC
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      SF, California
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1.5">
                      Bill to
                    </p>
                    <p className="text-xs font-semibold text-stone-900">
                      Pixel Works Co.
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      hello@pixelworks.co
                    </p>
                  </div>
                </div>

                {/* Line items */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                      Description
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                      Amount
                    </p>
                  </div>
                  {[
                    { name: "Brand Identity Design", price: "$800.00" },
                    { name: "UI Component Library", price: "$320.00" },
                    { name: "Revision Rounds ×4", price: "$120.00" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-1.5"
                    >
                      <p className="text-xs text-stone-700">{item.name}</p>
                      <p className="text-xs font-medium text-stone-900">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-stone-900">
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Total due
                  </p>
                  <p className="text-xl font-bold text-stone-900">$1,240.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thin trust bar */}
      <div className="border-y border-stone-200/70 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-3 gap-x-8 text-xs text-stone-500">
            {[
              "Runs entirely in your browser",
              "Zero data stored on servers",
              "6 professional templates",
              "PDF export in one click",
              "Open source & free forever",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section
        id="how-it-works"
        className="container mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-3">
            Process
          </p>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Three steps from blank to sent.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden bg-white">
          {[
            {
              step: "01",
              title: "Add your details",
              desc: "Enter your business info, client details, and line items. Upload a logo if you have one.",
              cta: null,
            },
            {
              step: "02",
              title: "Pick a template",
              desc: "Choose from 6 professionally designed templates. Your invoice preview updates live as you type.",
              cta: null,
            },
            {
              step: "03",
              title: "Download & send",
              desc: "Export a pixel-perfect PDF and send it directly to your client. Done.",
              cta: "/generate",
            },
          ].map((item) => (
            <div key={item.step} className="p-8 flex flex-col gap-4">
              <p className="text-4xl font-black text-stone-100 leading-none select-none">
                {item.step}
              </p>
              <div>
                <h3 className="font-semibold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {item.cta && (
                <Link href={item.cta} className="mt-auto">
                  <button className="text-xs font-medium text-stone-900 inline-flex items-center gap-1.5 group cursor-pointer">
                    Get started
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features — dark section */}
      <section id="features" className="bg-stone-900">
        <div className="container mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-20 items-start">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-3">
                Features
              </p>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                Everything you need.
                <br />
                <span className="text-stone-400">Nothing you don&apos;t.</span>
              </h2>
              <p className="mt-4 text-stone-400 text-sm leading-relaxed max-w-xs">
                Built for freelancers and small businesses who just want to get
                paid.
              </p>
              <Link href="/generate" className="mt-8 inline-block">
                <button className="h-9 px-5 rounded-full border border-stone-700 text-white text-sm font-medium hover:bg-stone-800 transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer">
                  Try it now
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-px bg-stone-700/40 rounded-xl overflow-hidden border border-stone-700/40">
              {[
                {
                  label: "Live preview",
                  desc: "See changes instantly as you type",
                  symbol: "↳",
                },
                {
                  label: "6 templates",
                  desc: "Minimal to corporate, your choice",
                  symbol: "▨",
                },
                {
                  label: "Tax & discounts",
                  desc: "Automatic line-item calculations",
                  symbol: "%",
                },
                {
                  label: "PDF export",
                  desc: "One-click pixel-perfect export",
                  symbol: "↓",
                },
                {
                  label: "Logo upload",
                  desc: "Brand your invoices immediately",
                  symbol: "◈",
                },
                {
                  label: "Custom notes",
                  desc: "Add payment terms or a thank-you",
                  symbol: "≡",
                },
                {
                  label: "Multi-currency",
                  desc: "Support for global currencies",
                  symbol: "¥",
                },
                {
                  label: "Zero friction",
                  desc: "No sign-up. Start in seconds.",
                  symbol: "✓",
                },
              ].map((f) => (
                <div key={f.label} className="bg-stone-900 p-5 lg:p-6">
                  <p className="text-stone-600 text-lg font-mono mb-3 leading-none select-none">
                    {f.symbol}
                  </p>
                  <p className="text-sm font-semibold text-white mb-1">
                    {f.label}
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="rounded-3xl border border-stone-200 bg-white px-10 py-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
              Ready to create
              <br />
              your first invoice?
            </h2>
            <p className="text-stone-500 mt-3 text-sm max-w-sm">
              No account. No credit card. No nonsense. Your data stays entirely
              in your browser.
            </p>
          </div>
          <Link href="/generate" className="shrink-0">
            <button className="h-12 px-8 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors duration-150 inline-flex items-center gap-2.5 cursor-pointer whitespace-nowrap">
              Create Invoice
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200/70">
        <div className="container mx-auto max-w-6xl px-6 py-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Invoice Wizard"
                width={20}
                height={20}
                className="rounded"
              />
              <span className="text-sm font-medium text-stone-700">
                Invoice Wizard
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Free and open source invoice generator
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
