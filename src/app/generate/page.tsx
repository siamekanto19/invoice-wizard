"use client";

import DatePicker from "@/components/form-sections/DatePicker";
import ItemsSection from "@/components/form-sections/ItemsSection";
import InvoiceForm from "@/components/invoice/invoice-form";
import InvoicePreview from "@/components/invoice/invoice-preview";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useInvoiceStore } from "@/store/invoice-store";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

const templateOptions = [
  { value: "professional", label: "Professional" },
  { value: "minimal", label: "Minimal" },
  { value: "elegant", label: "Elegant" },
  { value: "playful", label: "Playful" },
  { value: "corporate", label: "Corporate" },
  { value: "classic", label: "Classic" },
];

const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
  { value: "CAD", label: "CAD ($)" },
  { value: "AUD", label: "AUD ($)" },
  { value: "BDT", label: "BDT (৳)" },
  { value: "INR", label: "INR (₹)" },
  { value: "PKR", label: "PKR (₨)" },
];

const paymentTermsOptions = [
  { value: "Due on Receipt", label: "Due on Receipt" },
  { value: "NET 15", label: "Net 15 Days" },
  { value: "NET 30", label: "Net 30 Days" },
  { value: "NET 60", label: "Net 60 Days" },
  { value: "NET 90", label: "Net 90 Days" },
];

function LayoutSelector({ onSelect }: { onSelect: (mode: string) => void }) {
  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => onSelect("form")}
        className="group text-left rounded-2xl border border-stone-200 bg-white p-7 hover:border-stone-400 transition-colors duration-150 cursor-pointer"
      >
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-3">
          Recommended
        </p>
        <h2 className="text-base font-semibold text-stone-900 mb-2">
          Full form
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          All sections visible at once with a live invoice preview panel.
        </p>
        <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 group-hover:gap-2.5 transition-all duration-150">
          Choose this
          <ArrowRight className="h-3 w-3" />
        </div>
      </button>

      <button
        onClick={() => onSelect("questionnaire")}
        className="group text-left rounded-2xl border border-stone-200 bg-white p-7 hover:border-stone-400 transition-colors duration-150 cursor-pointer"
      >
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-3">
          Guided
        </p>
        <h2 className="text-base font-semibold text-stone-900 mb-2">
          Step by step
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Answer questions one at a time to build the invoice.
        </p>
        <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 group-hover:gap-2.5 transition-all duration-150">
          Choose this
          <ArrowRight className="h-3 w-3" />
        </div>
      </button>
    </div>
  );
}

function InvoiceQuestionnaire() {
  const { invoiceData, setInvoiceData } = useInvoiceStore();
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () => [
      {
        id: "company",
        title: "Your business",
        question: "What is your business called?",
        description: "This appears at the top of the invoice.",
        required: true,
        isComplete: invoiceData.companyName.trim() !== "",
        content: (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Business name
              </label>
              <Input
                placeholder="Acme Studio"
                value={invoiceData.companyName}
                onChange={(e) =>
                  setInvoiceData({ companyName: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Business email
                </label>
                <Input
                  placeholder="hello@acme.com"
                  type="email"
                  value={invoiceData.companyEmail}
                  onChange={(e) =>
                    setInvoiceData({ companyEmail: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Phone (optional)
                </label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  value={invoiceData.companyPhone}
                  onChange={(e) =>
                    setInvoiceData({ companyPhone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "company-address",
        title: "Business address",
        question: "Where should your business be located on the invoice?",
        description: "Optional, but helps clients file your invoice.",
        required: false,
        isComplete: true,
        content: (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Street address
              </label>
              <Input
                placeholder="123 Main Street"
                value={invoiceData.companyAddress}
                onChange={(e) =>
                  setInvoiceData({ companyAddress: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  City
                </label>
                <Input
                  placeholder="New York"
                  value={invoiceData.companyCity}
                  onChange={(e) =>
                    setInvoiceData({ companyCity: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  State / Province
                </label>
                <Input
                  placeholder="NY"
                  value={invoiceData.companyState}
                  onChange={(e) =>
                    setInvoiceData({ companyState: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  ZIP / Postal code
                </label>
                <Input
                  placeholder="10001"
                  value={invoiceData.companyZip}
                  onChange={(e) =>
                    setInvoiceData({ companyZip: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Country
                </label>
                <Input
                  placeholder="United States"
                  value={invoiceData.companyCountry}
                  onChange={(e) =>
                    setInvoiceData({ companyCountry: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "client",
        title: "Client details",
        question: "Who are you billing?",
        description: "This will appear as the recipient on the invoice.",
        required: true,
        isComplete: invoiceData.clientName.trim() !== "",
        content: (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Client name
              </label>
              <Input
                placeholder="Client Company"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({ clientName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Client email
                </label>
                <Input
                  placeholder="client@example.com"
                  type="email"
                  value={invoiceData.clientEmail}
                  onChange={(e) =>
                    setInvoiceData({ clientEmail: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Phone (optional)
                </label>
                <Input
                  placeholder="+1 (555) 987-6543"
                  type="tel"
                  value={invoiceData.clientPhone}
                  onChange={(e) =>
                    setInvoiceData({ clientPhone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "client-address",
        title: "Client address",
        question: "Where should the invoice be sent?",
        description: "Optional for email-only invoices.",
        required: false,
        isComplete: true,
        content: (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Street address
              </label>
              <Input
                placeholder="456 Oak Avenue"
                value={invoiceData.clientAddress}
                onChange={(e) =>
                  setInvoiceData({ clientAddress: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  City
                </label>
                <Input
                  placeholder="Los Angeles"
                  value={invoiceData.clientCity}
                  onChange={(e) =>
                    setInvoiceData({ clientCity: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  State / Province
                </label>
                <Input
                  placeholder="CA"
                  value={invoiceData.clientState}
                  onChange={(e) =>
                    setInvoiceData({ clientState: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  ZIP / Postal code
                </label>
                <Input
                  placeholder="90210"
                  value={invoiceData.clientZip}
                  onChange={(e) =>
                    setInvoiceData({ clientZip: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Country
                </label>
                <Input
                  placeholder="United States"
                  value={invoiceData.clientCountry}
                  onChange={(e) =>
                    setInvoiceData({ clientCountry: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "invoice",
        title: "Invoice basics",
        question: "Set the invoice number and dates.",
        description: "You can auto-generate a number anytime.",
        required: true,
        isComplete: invoiceData.invoiceNumber.trim() !== "",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Invoice number
                </label>
                <Input
                  placeholder="INV-2026-001"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) =>
                    setInvoiceData({ invoiceNumber: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                className="h-9 px-3 rounded-md border border-stone-200 text-xs font-medium text-stone-700 hover:border-stone-400 transition-colors cursor-pointer"
                onClick={() => {
                  const date = new Date();
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const random = Math.floor(Math.random() * 1000)
                    .toString()
                    .padStart(3, "0");
                  setInvoiceData({
                    invoiceNumber: `INV-${year}${month}${day}-${random}`,
                  });
                }}
              >
                Auto
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Invoice date
                </label>
                <DatePicker
                  value={invoiceData.invoiceDate}
                  onChange={(date: string) =>
                    setInvoiceData({ invoiceDate: date })
                  }
                  placeholder="Select date"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  Due date
                </label>
                <DatePicker
                  value={invoiceData.dueDate}
                  onChange={(date: string) => setInvoiceData({ dueDate: date })}
                  placeholder="Select date"
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "template",
        title: "Template and currency",
        question: "Choose how the invoice should look.",
        description: "You can change this later.",
        required: true,
        isComplete: true,
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Template
              </label>
              <Select
                value={invoiceData.template}
                onValueChange={(value) => setInvoiceData({ template: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Currency
              </label>
              <Select
                value={invoiceData.currency}
                onValueChange={(value) => setInvoiceData({ currency: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Payment terms
              </label>
              <Select
                value={invoiceData.paymentTerms}
                onValueChange={(value) =>
                  setInvoiceData({ paymentTerms: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTermsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ),
      },
      {
        id: "items",
        title: "Line items",
        question: "What are you billing for?",
        description: "Add at least one item to continue.",
        required: true,
        isComplete: invoiceData.items.length > 0,
        content: <ItemsSection />,
      },
      {
        id: "adjustments",
        title: "Taxes and discounts",
        question: "Add any taxes or discounts.",
        description: "Optional adjustments applied to the subtotal.",
        required: false,
        isComplete: true,
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Tax rate (%)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={invoiceData.taxRate}
                onChange={(e) =>
                  setInvoiceData({
                    taxRate: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Discount (%)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={invoiceData.discountRate}
                onChange={(e) =>
                  setInvoiceData({
                    discountRate: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        ),
      },
      {
        id: "notes",
        title: "Notes and terms",
        question: "Share notes or payment policies.",
        description: "These appear at the bottom of the invoice.",
        required: false,
        isComplete: true,
        content: (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Notes
              </label>
              <Textarea
                placeholder="Thank you for your business!"
                className="min-h-[90px] resize-none"
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({ notes: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1.5">
                Terms & Conditions
              </label>
              <Textarea
                placeholder="Payment terms, late fees, etc."
                className="min-h-[90px] resize-none"
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData({ terms: e.target.value })}
              />
            </div>
          </div>
        ),
      },
      {
        id: "review",
        title: "Review",
        question: "Everything looks ready.",
        description: "Preview and download on the right when complete.",
        required: false,
        isComplete: true,
        content: (
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 space-y-3">
            {[
              { label: "Invoice number", value: invoiceData.invoiceNumber || "Not set" },
              { label: "Business", value: invoiceData.companyName || "Not set" },
              { label: "Client", value: invoiceData.clientName || "Not set" },
              { label: "Items", value: String(invoiceData.items.length) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-stone-500">{row.label}</span>
                <span className="font-medium text-stone-900">{row.value}</span>
              </div>
            ))}
          </div>
        ),
      },
    ],
    [invoiceData, setInvoiceData],
  );

  const currentStep = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const canContinue = currentStep.required ? currentStep.isComplete : true;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <p className="text-[10px] text-stone-400">{progress}%</p>
          </div>
          <div className="h-0.5 rounded-full bg-stone-100">
            <div
              className="h-0.5 rounded-full bg-stone-900 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1.5">
            {currentStep.title}
          </p>
          <h2 className="text-base font-semibold text-stone-900">
            {currentStep.question}
          </h2>
          {currentStep.description && (
            <p className="text-xs text-stone-500 mt-1">
              {currentStep.description}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6">
        {currentStep.content}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={stepIndex === 0}
          className="h-9 px-4 rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-stone-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Back
        </button>
        {stepIndex < steps.length - 1 ? (
          <button
            onClick={() =>
              setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
            }
            disabled={!canContinue}
            className="h-9 px-5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            disabled={!canContinue}
            className="h-9 px-5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

function FormLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3">
        <InvoiceForm />
      </div>
      <div className="lg:col-span-2 lg:sticky lg:top-[4.5rem]">
        <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-100">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Live Preview</p>
          </div>
          <div className="p-5">
            <InvoicePreview />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionnaireLayout() {
  const { invoiceData } = useInvoiceStore();
  const isReady =
    invoiceData.invoiceNumber.trim() !== "" &&
    invoiceData.companyName.trim() !== "" &&
    invoiceData.clientName.trim() !== "" &&
    invoiceData.items.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3">
        <InvoiceQuestionnaire />
      </div>
      <div className="lg:col-span-2 lg:sticky lg:top-[4.5rem]">
        <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">Preview</p>
            <span className="text-[10px] text-stone-400">
              {isReady ? "Ready" : "Complete steps"}
            </span>
          </div>
          <div className="p-5">
            {isReady ? (
              <InvoicePreview />
            ) : (
              <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 px-4 py-10 text-center">
                <p className="text-xs text-stone-400">Complete the required steps to unlock preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode");
  const needsSelection = !mode || mode === "select";

  const headerSubtitle = needsSelection
    ? "Choose a layout to start creating"
    : mode === "questionnaire"
      ? "Answer short questions to build the invoice"
      : "Complete each section and preview instantly";

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-sm border-b border-stone-200/70">
        <div className="container mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors duration-150"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
            <div className="w-px h-4 bg-stone-200" />
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Invoice Wizard"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="text-sm font-semibold text-stone-900">
                Invoice Wizard
              </span>
            </div>
          </div>
          {!needsSelection && (
            <button
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors duration-150 cursor-pointer"
              onClick={() => router.push("/generate?mode=select")}
            >
              Change layout
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-10">
        {needsSelection ? (
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-2">Get started</p>
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                Choose your layout
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Pick the experience that fits how you work.
              </p>
            </div>
            <LayoutSelector
              onSelect={(selected) => router.push(`/generate?mode=${selected}`)}
            />
          </div>
        ) : mode === "questionnaire" ? (
          <QuestionnaireLayout />
        ) : (
          <FormLayout />
        )}
      </main>

      <Toaster />
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <GeneratePageContent />
    </Suspense>
  );
}
