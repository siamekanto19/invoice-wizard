import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download, Clock, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Navigation */}
      <header className="border-b border-neutral-100">
        <div className="container mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-md flex items-center justify-center shadow-sm">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-neutral-900">
              Invoice Wizard
            </span>
          </div>
          <Link href="/generate">
            <Button
              variant="ghost"
              className="text-sm text-neutral-700 hover:text-neutral-900"
            >
              Create Invoice
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
              Free Invoice Generator
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-[1.1]">
              Create professional invoices in seconds
            </h1>
            <p className="mt-5 text-lg text-neutral-600 leading-relaxed max-w-xl">
              No account required. Fill in your details, preview your invoice,
              and download a PDF. It&apos;s that simple.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/generate">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Creating
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="text-sm text-neutral-500 flex items-center">
                No sign-up required
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-neutral-500">Invoice</p>
                <p className="text-lg font-semibold text-neutral-900">
                  #INV-0248
                </p>
              </div>
              <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                Draft
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between text-neutral-600">
                <span>Client</span>
                <span className="font-medium text-neutral-900">
                  Acme Studio
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <span>Due date</span>
                <span className="font-medium text-neutral-900">
                  Apr 12, 2026
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <span>Items</span>
                <span className="font-medium text-neutral-900">4</span>
              </div>
            </div>
            <div className="mt-6 border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>Total</span>
                <span className="text-base font-semibold text-neutral-900">
                  $1,240.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-neutral-700" />
            </div>
            <h3 className="mt-4 font-medium text-neutral-900">Live Preview</h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              See your invoice update in real-time as you type. What you see is
              what you get.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Download className="h-5 w-5 text-neutral-700" />
            </div>
            <h3 className="mt-4 font-medium text-neutral-900">PDF Export</h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              Download a professionally formatted PDF ready to send to your
              clients.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-neutral-700" />
            </div>
            <h3 className="mt-4 font-medium text-neutral-900">No Sign-up</h3>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              Start immediately. Your data stays in your browser—nothing is
              stored on our servers.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-xs font-semibold text-neutral-500 shrink-0">
                01
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">
                  Add your details
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Enter your business info, client details, and line items.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-xs font-semibold text-neutral-500 shrink-0">
                02
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">
                  Preview your invoice
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Review the live preview and make adjustments as needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-xs font-semibold text-neutral-500 shrink-0">
                03
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">
                  Download & send
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Export as PDF and send directly to your client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Everything you need
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              A simple tool with all the features required for creating clean, professional invoices.
            </p>
            <Link href="/generate">
              <Button variant="outline" className="gap-2 border-neutral-300">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {[
              "Company & client details",
              "Multiple line items",
              "Tax calculation",
              "Discount support",
              "Multiple templates",
              "Custom notes",
              "Payment terms",
              "Currency selection",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-neutral-400" />
                <span className="text-sm text-neutral-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Ready to create your invoice?
            </h2>
            <p className="text-neutral-600 mt-3">
              No account needed. Start creating your first invoice right now—it
              takes less than two minutes.
            </p>
          </div>
          <Link href="/generate">
            <Button size="lg" className="gap-2">
              Create Invoice
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center">
                <FileText className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-neutral-600">Invoice Wizard</span>
            </div>
            <p className="text-sm text-neutral-500">
              Free and open source invoice generator
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
