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
import { Badge } from "@/components/ui/badge";
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
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Eye,
  FileText,
  Mail,
  Package,
  RefreshCw,
  Save,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ElegantTemplate from "./templates/ElegantTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PlayfulTemplate from "./templates/PayfulTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

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

function calculateCompletionProgress(invoiceData: any): number {
  const fields = [
    "invoiceNumber",
    "companyName",
    "clientName",
    "items",
    "currency",
    "paymentTerms",
    "template",
  ];

  const completedFields = fields.filter((field) => {
    if (field === "items") {
      return invoiceData[field] && invoiceData[field].length > 0;
    }
    return invoiceData[field] && invoiceData[field].toString().trim() !== "";
  });

  return Math.round((completedFields.length / fields.length) * 100);
}

function InvoiceSummary() {
  const { invoiceData, resetInvoice } = useInvoiceStore();
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress = calculateCompletionProgress(invoiceData);
  const currencySymbol = getCurrencySymbol(invoiceData.currency);

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  // Copy invoice number to clipboard
  const copyInvoiceNumber = useCallback(async () => {
    if (invoiceData.invoiceNumber) {
      await navigator.clipboard.writeText(invoiceData.invoiceNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [invoiceData.invoiceNumber]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "d") {
          e.preventDefault();
          if (progress === 100 && invoiceData.items.length > 0) {
            handleDownloadPDF();
          }
        }
        if (e.key === "p") {
          e.preventDefault();
          setShowPreview(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [progress, invoiceData.items.length]);

  const requiredFields = [
    {
      key: "invoiceNumber",
      label: "Invoice Number",
      value: invoiceData.invoiceNumber,
      icon: FileText,
    },
    {
      key: "companyName",
      label: "Company Name",
      value: invoiceData.companyName,
      icon: Users,
    },
    {
      key: "clientName",
      label: "Client Name",
      value: invoiceData.clientName,
      icon: Mail,
    },
    {
      key: "items",
      label: "Invoice Items",
      value: invoiceData.items.length > 0,
      icon: Package,
    },
  ];

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
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSaveInvoice = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      if (invoiceData.items.length === 0) {
        toast({
          title: "⚠️ Missing Items",
          description: "Please add at least one item to the invoice.",
          variant: "destructive",
        });
        return;
      }

      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "✅ Invoice Saved",
        description: "Your invoice has been saved successfully!",
        variant: "default",
      });

      console.log("Saving invoice...", invoiceData);
    } catch (error) {
      toast({
        title: "❌ Save Failed",
        description: "Failed to save invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetForm = () => {
    resetInvoice();
    toast({
      title: "🔄 Form Reset",
      description: "All form data has been cleared.",
      variant: "default",
    });
  };

  const isReady = progress === 100 && invoiceData.items.length > 0;
  const completedFields = requiredFields.filter((field) =>
    field.key === "items"
      ? field.value
      : field.value && field.value.toString().trim() !== ""
  );

  return (
    <div className="sticky top-24 z-10">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/60 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              {isReady && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Invoice Preview
              </h2>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                {invoiceData.invoiceNumber ? (
                  <>
                    <span>#{invoiceData.invoiceNumber}</span>
                    <button
                      onClick={copyInvoiceNumber}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="Copy invoice number"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    {copySuccess && (
                      <Badge variant="secondary" className="text-xs">
                        Copied!
                      </Badge>
                    )}
                  </>
                ) : (
                  "Draft invoice"
                )}
              </p>
            </div>
          </div>

          {isReady && (
            <Badge className="bg-emerald-500 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Ready
            </Badge>
          )}
        </div>

        {/* Compact Progress & Metrics */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">Progress</span>
              <Badge
                variant={progress === 100 ? "default" : "secondary"}
                className={progress === 100 ? "bg-emerald-500" : ""}
              >
                {completedFields.length}/{requiredFields.length}
              </Badge>
            </div>
            <span className="text-lg font-bold text-slate-700">
              {animatedProgress}%
            </span>
          </div>

          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                animatedProgress === 100
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                  : animatedProgress >= 70
                  ? "bg-gradient-to-r from-amber-400 to-orange-500"
                  : "bg-gradient-to-r from-red-400 to-purple-500"
              }`}
              style={{ width: `${animatedProgress}%` }}
            />
          </div>

          {/* Compact Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-xs text-blue-600">Items</span>
              </div>
              <div className="text-xl font-bold text-blue-700 pt-2">
                {invoiceData.items.length}
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between">
                <Wallet className="h-5 w-5 text-emerald-600" />
                <span className="text-xs text-emerald-600">Total</span>
              </div>
              <div className="text-xl font-bold text-emerald-700 pt-2">
                {currencySymbol}
                {invoiceData.total.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Compact Status */}
          <div
            className={`p-3 rounded-xl border ${
              animatedProgress === 100
                ? "bg-emerald-50 border-emerald-200"
                : animatedProgress >= 70
                ? "bg-amber-50 border-amber-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {animatedProgress === 100 ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : animatedProgress >= 70 ? (
                <Clock className="h-5 w-5 text-amber-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <div className="flex-1">
                <p
                  className={`font-medium text-sm ${
                    animatedProgress === 100
                      ? "text-emerald-800"
                      : animatedProgress >= 70
                      ? "text-amber-800"
                      : "text-red-800"
                  }`}
                >
                  {animatedProgress === 100
                    ? "Ready to generate!"
                    : animatedProgress >= 70
                    ? "Almost there!"
                    : "Complete required fields"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Requirements Checklist */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-slate-600" />
            Requirements
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {requiredFields.map((field) => {
              const isComplete =
                field.key === "items"
                  ? field.value
                  : field.value && field.value.toString().trim() !== "";
              const Icon = field.icon;

              return (
                <div
                  key={field.key}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${
                    isComplete
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isComplete
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium truncate">{field.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-flow-row grid-cols-2 gap-4">
          {/* Preview Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 py-4 h-auto font-medium transition-all duration-200 flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Invoice
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle className="text-xl flex items-center gap-3">
                  Invoice Preview
                </SheetTitle>
                <SheetDescription>
                  Preview how your invoice will look as a PDF document
                </SheetDescription>
              </SheetHeader>
              <div className="px-6">
                <div className="h-[calc(100vh-140px)] rounded-xl overflow-hidden border border-slate-200">
                  <InvoiceDocument data={invoiceData} previewMode={true} />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Reset Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 py-4 h-auto font-medium transition-all duration-200"
              >
                <X className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Reset Form
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to reset the form? All data will be lost
                  and cannot be recovered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleResetForm}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reset Form
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Save Draft Button */}
          <Button
            variant="outline"
            onClick={handleSaveInvoice}
            disabled={isSaving}
            className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 py-3 h-auto font-medium transition-all duration-200 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </>
            )}
          </Button>

          {/* Download Button */}
          <Button
            onClick={handleDownloadPDF}
            disabled={!isReady || isDownloading}
            className={`w-full py-4 h-auto font-medium transition-all duration-200 ${
              isReady
                ? "bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                : "border-slate-200 text-slate-400 bg-slate-50 border cursor-not-allowed"
            }`}
          >
            {isDownloading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
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
    default:
      return <ProfessionalTemplate data={invoiceData} />;
  }
}

export default function InvoicePreview() {
  return <InvoiceSummary />;
}

export { InvoiceSummary };
