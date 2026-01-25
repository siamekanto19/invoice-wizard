"use client";

import InvoiceForm from "@/components/invoice/invoice-form";
import InvoicePreview from "@/components/invoice/invoice-preview";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-900 rounded-md flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">
                  Create Invoice
                </h1>
                <p className="text-xs text-neutral-500">
                  Complete each section and preview instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-neutral-500">
                  Step 1 of 2
                </p>
                <h2 className="text-xl font-semibold text-neutral-900">
                  Invoice details
                </h2>
                <p className="text-sm text-neutral-600">
                  Fill out each section below. The preview updates as you type.
                </p>
              </div>
            </div>
            <InvoiceForm />
          </div>
          <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Live Preview
                </h3>
                <span className="text-xs text-neutral-500">PDF ready</span>
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <InvoicePreview />
            </div>
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
