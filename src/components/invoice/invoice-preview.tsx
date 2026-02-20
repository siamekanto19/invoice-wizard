"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { InvoiceData, useInvoiceStore } from "@/store/invoice-store";
import {
  AlertTriangle,
  Check,
  Download,
  Eye,
  FileText,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ElegantTemplate from "./templates/ElegantTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PlayfulTemplate from "./templates/PayfulTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "Fr",
  CNY: "¥",
  INR: "₹",
  MXN: "$",
  BRL: "R$",
  RUB: "₽",
  KRW: "₩",
  SGD: "S$",
  HKD: "HK$",
  NOK: "kr",
  SEK: "kr",
  DKK: "kr",
  PLN: "zł",
  THB: "฿",
  MYR: "RM",
  ZAR: "R",
};

function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

function InvoiceSummary() {
  const { invoiceData, resetInvoice } = useInvoiceStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const currencySymbol = getCurrencySymbol(invoiceData.currency);

  const requiredFields = [
    { key: "invoiceNumber", label: "Invoice number", value: invoiceData.invoiceNumber },
    { key: "companyName", label: "Your business", value: invoiceData.companyName },
    { key: "clientName", label: "Client name", value: invoiceData.clientName },
    { key: "items", label: "Line items", value: invoiceData.items.length > 0 },
  ];

  const completedCount = requiredFields.filter((field) =>
    field.key === "items"
      ? field.value
      : field.value && field.value.toString().trim() !== ""
  ).length;

  const isReady = completedCount === requiredFields.length;

  const handleDownloadPDF = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(
        <InvoiceDocument data={invoiceData} previewMode={false} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${invoiceData.invoiceNumber || "draft"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Downloaded",
        description: "Your invoice has been saved.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResetForm = () => {
    resetInvoice();
    toast({
      title: "Form Reset",
      description: "All data has been cleared.",
    });
  };

  return (
    <div className="space-y-5">
      {/* Total */}
      <div className="rounded-lg border border-stone-200 bg-stone-50 px-5 py-4">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">
          Total due
        </p>
        <p className="text-3xl font-bold text-stone-900 tracking-tight">
          {currencySymbol}{invoiceData.total.toFixed(2)}
        </p>
        {invoiceData.invoiceNumber && (
          <p className="text-xs text-stone-400 mt-1">#{invoiceData.invoiceNumber}</p>
        )}
        {invoiceData.items.length > 0 && (
          <p className="text-xs text-stone-400 mt-0.5">
            {invoiceData.items.length} item{invoiceData.items.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
          Required &nbsp;({completedCount}/{requiredFields.length})
        </p>
        {requiredFields.map((field) => {
          const isComplete =
            field.key === "items"
              ? field.value
              : field.value && field.value.toString().trim() !== "";

          return (
            <div
              key={field.key}
              className="flex items-center gap-2.5"
            >
              <div
                className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 ${
                  isComplete
                    ? "bg-stone-900"
                    : "border border-stone-300"
                }`}
              >
                {isComplete && <Check className="h-2.5 w-2.5 text-white" />}
              </div>
              <span className={`text-xs ${isComplete ? "text-stone-700" : "text-stone-400"}`}>
                {field.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleDownloadPDF}
          disabled={!isReady || isDownloading}
          className="w-full h-10 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </>
          )}
        </button>

        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full h-10 rounded-full border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer">
              <Eye className="h-3.5 w-3.5" />
              Preview invoice
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle>Invoice Preview</SheetTitle>
              <SheetDescription>
                See how your invoice will look when downloaded
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <div className="h-[calc(100vh-140px)] rounded-lg overflow-hidden border border-stone-200 bg-white">
                <InvoiceDocument data={invoiceData} previewMode={true} />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full h-9 text-xs text-stone-400 hover:text-stone-600 transition-colors duration-150 inline-flex items-center justify-center gap-1.5 cursor-pointer">
              <RotateCcw className="h-3 w-3" />
              Reset form
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Reset form
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all invoice data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleResetForm}
                className="bg-red-600 hover:bg-red-700"
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function InvoiceDocument({
  data,
  previewMode,
}: {
  data: InvoiceData;
  previewMode: boolean;
}) {
  const { invoiceData } = useInvoiceStore();

  switch (invoiceData.template) {
    case "professional":
      return (
        <ProfessionalTemplate data={invoiceData} previewMode={previewMode} />
      );
    case "minimal":
      return <MinimalTemplate data={invoiceData} previewMode={previewMode} />;
    case "elegant":
      return <ElegantTemplate data={invoiceData} previewMode={previewMode} />;
    case "playful":
      return <PlayfulTemplate data={invoiceData} previewMode={previewMode} />;
    case "corporate":
      return <CorporateTemplate data={invoiceData} previewMode={previewMode} />;
    case "classic":
      return <ClassicTemplate data={invoiceData} previewMode={previewMode} />;
    default:
      return <ProfessionalTemplate data={invoiceData} />;
  }
}

export default function InvoicePreview() {
  return <InvoiceSummary />;
}

export { InvoiceSummary };
