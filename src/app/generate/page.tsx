"use client";

import DatePicker from "@/components/form-sections/DatePicker";
import ItemsSection from "@/components/form-sections/ItemsSection";
import InvoiceForm from "@/components/invoice/invoice-form";
import InvoicePreview from "@/components/invoice/invoice-preview";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, FileText } from "lucide-react";
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
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium text-neutral-500">Recommended</p>
          <h2 className="text-lg font-semibold text-neutral-900 mt-1">
            Traditional form
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Fill everything at once with sections and a live preview.
          </p>
        </div>
        <Button onClick={() => onSelect("form")}>Use Form Layout</Button>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium text-neutral-500">Guided</p>
          <h2 className="text-lg font-semibold text-neutral-900 mt-1">
            Questionnaire
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Answer short questions step by step to build the invoice.
          </p>
        </div>
        <Button variant="outline" onClick={() => onSelect("questionnaire")}>
          Use Questionnaire
        </Button>
      </div>
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
              <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
                Client name
              </label>
              <Input
                placeholder="Client Company"
                value={invoiceData.clientName}
                onChange={(e) =>
                  setInvoiceData({ clientName: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
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
              <Button
                type="button"
                variant="outline"
                className="h-9"
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
                Auto-generate
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-600 block mb-2">
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
                <label className="text-sm text-neutral-600 block mb-2">
                  Due date
                </label>
                <DatePicker
                  value={invoiceData.dueDate}
                  onChange={(date: string) =>
                    setInvoiceData({ dueDate: date })
                  }
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
              <label className="text-sm text-neutral-600 block mb-2">
                Template
              </label>
              <Select
                value={invoiceData.template}
                onValueChange={(value) =>
                  setInvoiceData({ template: value })
                }
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
              <label className="text-sm text-neutral-600 block mb-2">
                Currency
              </label>
              <Select
                value={invoiceData.currency}
                onValueChange={(value) =>
                  setInvoiceData({ currency: value })
                }
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
              <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
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
              <label className="text-sm text-neutral-600 block mb-2">
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
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Invoice number</span>
              <span className="text-neutral-900">
                {invoiceData.invoiceNumber || "Not set"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Business</span>
              <span className="text-neutral-900">
                {invoiceData.companyName || "Not set"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Client</span>
              <span className="text-neutral-900">
                {invoiceData.clientName || "Not set"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Items</span>
              <span className="text-neutral-900">
                {invoiceData.items.length}
              </span>
            </div>
          </div>
        ),
      },
    ],
    [invoiceData, setInvoiceData]
  );

  const currentStep = steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const canContinue = currentStep.required ? currentStep.isComplete : true;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-1 rounded-full bg-neutral-100">
          <div
            className="h-1 rounded-full bg-neutral-900"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-500">
            {currentStep.title}
          </p>
          <h2 className="text-xl font-semibold text-neutral-900 mt-2">
            {currentStep.question}
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            {currentStep.description}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        {currentStep.content}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={stepIndex === 0}
        >
          Back
        </Button>
        {stepIndex < steps.length - 1 ? (
          <Button
            onClick={() =>
              setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
            }
            disabled={!canContinue}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => setStepIndex(steps.length - 1)}
            disabled={!canContinue}
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}

function FormLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3 space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-neutral-500">Step 1 of 2</p>
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
      <div className="lg:col-span-3 space-y-6">
        <InvoiceQuestionnaire />
      </div>
      <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900">
              Preview
            </h3>
            <span className="text-xs text-neutral-500">
              {isReady ? "Ready" : "Complete steps"}
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {isReady ? (
            <InvoicePreview />
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
              Complete the required questions to unlock the preview.
            </div>
          )}
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
                <p className="text-xs text-neutral-500">{headerSubtitle}</p>
              </div>
            </div>
          </div>
          {!needsSelection && (
            <Button
              variant="ghost"
              className="text-sm text-neutral-600"
              onClick={() => router.push("/generate?mode=select")}
            >
              Change layout
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-10">
        {needsSelection ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Choose your layout
              </h2>
              <p className="text-sm text-neutral-600 mt-2">
                Pick the experience that fits how you want to create your
                invoice.
              </p>
            </div>
            <LayoutSelector
              onSelect={(selected) =>
                router.push(`/generate?mode=${selected}`)
              }
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
    <Suspense fallback={<div className="min-h-screen bg-neutral-50" />}>
      <GeneratePageContent />
    </Suspense>
  );
}
