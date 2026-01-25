"use client";

import InvoiceForm from "@/components/invoice/invoice-form";
import InvoicePreview from "@/components/invoice/invoice-preview";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
           
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-900 rounded-md flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">
                  Create Invoice
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <InvoiceForm />
          </div>
          <div className="lg:col-span-2">
            <InvoicePreview />
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
