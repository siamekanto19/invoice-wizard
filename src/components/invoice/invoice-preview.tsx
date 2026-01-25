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
import { Button } from "@/components/ui/button";
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
    <div className="sticky top-24">
      <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-medium text-neutral-900 mb-1">Summary</h2>
          <p className="text-sm text-neutral-500">
            {invoiceData.invoiceNumber ? `#${invoiceData.invoiceNumber}` : "New invoice"}
          </p>
        </div>

        {/* Total */}
        <div className="py-4 border-y border-neutral-200">
          <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
          <p className="text-2xl font-semibold text-neutral-900">
            {currencySymbol}{invoiceData.total.toFixed(2)}
          </p>
          {invoiceData.items.length > 0 && (
            <p className="text-sm text-neutral-500 mt-1">
              {invoiceData.items.length} item{invoiceData.items.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-700 mb-3">
            Required fields ({completedCount}/{requiredFields.length})
          </p>
          {requiredFields.map((field) => {
            const isComplete =
              field.key === "items"
                ? field.value
                : field.value && field.value.toString().trim() !== "";

            return (
              <div
                key={field.key}
                className="flex items-center gap-3 text-sm"
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center ${
                    isComplete
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300"
                  }`}
                >
                  {isComplete && <Check className="h-3 w-3" />}
                </div>
                <span className={isComplete ? "text-neutral-900" : "text-neutral-500"}>
                  {field.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          {/* Download Button */}
          <Button
            onClick={handleDownloadPDF}
            disabled={!isReady || isDownloading}
            className="w-full"
            size="lg"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>

          {/* Preview Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full" size="lg">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Invoice Preview</SheetTitle>
                <SheetDescription>
                  See how your invoice will look when downloaded
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <div className="h-[calc(100vh-140px)] rounded-lg overflow-hidden border border-neutral-200 bg-white">
                  <InvoiceDocument data={invoiceData} previewMode={true} />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Reset Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full text-neutral-500 hover:text-neutral-700">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Reset Form
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
