import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download, Clock, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-neutral-100">
        <div className="container mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-md flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-neutral-900">Invoice Wizard</span>
          </div>
          <Link href="/generate">
            <Button variant="ghost" className="text-sm">
              Create Invoice
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-neutral-500 mb-4">
            Free Invoice Generator
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Create professional invoices in seconds
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl">
            No account required. Fill in your details, preview your invoice, and download a PDF. It's that simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/generate">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Creating
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-neutral-700" />
            </div>
            <h3 className="font-medium text-neutral-900">Live Preview</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              See your invoice update in real-time as you type. What you see is what you get.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Download className="h-5 w-5 text-neutral-700" />
            </div>
            <h3 className="font-medium text-neutral-900">PDF Export</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Download a professionally formatted PDF ready to send to your clients.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-neutral-700" />
            </div>
            <h3 className="font-medium text-neutral-900">No Sign-up</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Start immediately. Your data stays in your browser—nothing is stored on our servers.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <span className="text-sm font-medium text-neutral-400 shrink-0">01</span>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">Add your details</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Enter your business info, client details, and line items.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-sm font-medium text-neutral-400 shrink-0">02</span>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">Preview your invoice</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Review the live preview and make adjustments as needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-sm font-medium text-neutral-400 shrink-0">03</span>
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">Download & send</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Export as PDF and send directly to your client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="container mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Everything you need
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              A simple tool with all the features required for creating clean, professional invoices.
            </p>
            <Link href="/generate">
              <Button variant="outline" className="gap-2">
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
      <section className="container mx-auto max-w-5xl px-6 py-16">
        <div className="bg-neutral-900 rounded-lg p-8 md:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Ready to create your invoice?
            </h2>
            <p className="text-neutral-400 mb-6">
              No account needed. Start creating your first invoice right now—it takes less than two minutes.
            </p>
            <Link href="/generate">
              <Button 
                variant="secondary" 
                size="lg"
                className="gap-2"
              >
                Create Invoice
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100">
        <div className="container mx-auto max-w-5xl px-6 py-8">
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
