"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/invoice-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Package,
  DollarSign,
  Share2,
  Copy,
  Clock,
  Zap,
  ArrowRight,
  Sparkles,
  Calendar,
  Mail,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Progress as ProgressComponent } from "@/components/ui/progress";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";

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
  const { invoiceData } = useInvoiceStore();
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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
      const blob = await pdf(<InvoiceDocument />).toBlob();
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

  const isReady = progress === 100 && invoiceData.items.length > 0;
  const completedFields = requiredFields.filter((field) =>
    field.key === "items"
      ? field.value
      : field.value && field.value.toString().trim() !== ""
  );

  return (
    <div className="sticky top-24 z-10">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/10">
        {/* Header with enhanced visual hierarchy */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <FileText className="h-7 w-7 text-white" />
              </div>
              {isReady && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Invoice Preview
              </h2>
              <p className="text-slate-600 flex items-center gap-2">
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
                      <Badge
                        variant="secondary"
                        className="text-xs animate-in fade-in duration-200"
                      >
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
            <Badge
              variant="default"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 animate-in slide-in-from-right duration-300"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Ready
            </Badge>
          )}
        </div>

        {/* Enhanced Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-slate-900">
                Completion Status
              </span>
              <Badge
                variant={progress === 100 ? "default" : "secondary"}
                className={
                  progress === 100 ? "bg-emerald-500 hover:bg-emerald-600" : ""
                }
              >
                {completedFields.length}/{requiredFields.length} Complete
              </Badge>
            </div>
            <span className="text-2xl font-bold text-slate-700">
              {animatedProgress}%
            </span>
          </div>

          <div className="relative">
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  animatedProgress === 100
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/50"
                    : animatedProgress >= 70
                    ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50"
                    : "bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 shadow-lg shadow-red-500/50"
                }`}
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
            {animatedProgress === 100 && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Sparkles className="h-3 w-3 text-white animate-pulse" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200/50">
            {animatedProgress === 100 ? (
              <>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-emerald-800 font-semibold text-sm">
                    🎉 Invoice is ready to generate!
                  </p>
                  <p className="text-emerald-600 text-xs">
                    All required fields completed
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-600" />
              </>
            ) : animatedProgress >= 70 ? (
              <>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-800 font-semibold text-sm">
                    Almost there!
                  </p>
                  <p className="text-amber-600 text-xs">
                    {requiredFields.length - completedFields.length} fields
                    remaining
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-red-800 font-semibold text-sm">
                    Complete required fields
                  </p>
                  <p className="text-red-600 text-xs">
                    Fill in {requiredFields.length - completedFields.length}{" "}
                    more fields to continue
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group cursor-pointer p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-3">
                    <Package className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    <Badge variant="secondary" className="text-xs">
                      Items
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">
                    {invoiceData.items.length}
                  </div>
                  <div className="text-sm text-blue-600/80">
                    {invoiceData.items.length === 1 ? "Item" : "Items"} added
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of line items in your invoice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group cursor-pointer p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-3">
                    <DollarSign className="h-8 w-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                    <Badge variant="secondary" className="text-xs">
                      Total
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-emerald-700 mb-1">
                    {currencySymbol}
                    {invoiceData.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-emerald-600/80">
                    Final amount
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total invoice amount including tax and discounts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Enhanced Required Fields Checklist */}
        <div className="mb-8">
          <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-slate-600" />
            Requirements Checklist
          </h4>
          <div className="space-y-3">
            {requiredFields.map((field, index) => {
              const isComplete =
                field.key === "items"
                  ? field.value
                  : field.value && field.value.toString().trim() !== "";
              const Icon = field.icon;

              return (
                <div
                  key={field.key}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    isComplete
                      ? "bg-emerald-50/50 border-emerald-200/50 hover:bg-emerald-50"
                      : "bg-slate-50/50 border-slate-200/50 hover:bg-slate-100/50"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isComplete
                        ? "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`font-medium ${
                        isComplete ? "text-emerald-800" : "text-slate-700"
                      }`}
                    >
                      {field.label}
                    </span>
                    {isComplete && field.key !== "items" && (
                      <p className="text-sm text-emerald-600 truncate max-w-[200px]">
                        {field.value}
                      </p>
                    )}
                    {isComplete && field.key === "items" && (
                      <p className="text-sm text-emerald-600">
                        {invoiceData.items.length} items added
                      </p>
                    )}
                  </div>
                  {isComplete && (
                    <Badge
                      variant="default"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                    >
                      ✓
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="space-y-4 mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full group border-slate-300 hover:border-blue-400 hover:bg-blue-50 rounded-2xl px-6 py-6 h-auto transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Preview Invoice</span>
                  <span className="text-xs text-slate-500">Ctrl+P</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-6xl">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl flex items-center gap-3">
                  <Eye className="h-6 w-6" />
                  Invoice Preview
                </SheetTitle>
                <SheetDescription className="text-base">
                  Preview how your invoice will look as a PDF document
                </SheetDescription>
              </SheetHeader>
              <div className="h-[calc(100vh-140px)] rounded-xl overflow-hidden border border-slate-200">
                <PDFViewer width="100%" height="100%" className="rounded-xl">
                  <InvoiceDocument />
                </PDFViewer>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            onClick={handleDownloadPDF}
            disabled={!isReady || isDownloading}
            className={`w-full group rounded-2xl px-8 py-6 h-auto text-lg font-semibold transition-all duration-300 ${
              isReady
                ? "bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Download PDF</span>
                  {isReady && (
                    <span className="text-sm opacity-75">Ctrl+D</span>
                  )}
                </>
              )}
            </div>
          </Button>
        </div>

        {/* Enhanced Status Messages */}
        <div className="space-y-3">
          {isReady && (
            <div className="animate-in slide-in-from-bottom duration-500 flex items-center gap-4 p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-emerald-800 text-base">
                  🎉 Ready to download!
                </p>
                <p className="text-emerald-600 text-sm">
                  Your invoice is complete and ready to be generated
                </p>
              </div>
              <div className="text-right">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              </div>
            </div>
          )}

          {invoiceData.items.length === 0 && (
            <div className="animate-in slide-in-from-bottom duration-500 flex items-center gap-4 p-5 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-800 text-base">
                  Add invoice items
                </p>
                <p className="text-amber-600 text-sm">
                  You need at least one item to generate your invoice
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-600" />
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50">
          <h5 className="font-medium text-slate-700 mb-2 text-sm">
            💡 Quick Tips
          </h5>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>
              • Use{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-xs">
                Ctrl+P
              </kbd>{" "}
              to preview
            </li>
            <li>
              • Use{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-xs">
                Ctrl+D
              </kbd>{" "}
              to download when ready
            </li>
            <li>• Click the copy icon to copy your invoice number</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  companyInfo: {
    flex: 1,
  },
  invoiceDetails: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    width: 80,
  },
  value: {
    flex: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  tableCell: {
    padding: 8,
    textAlign: "left",
  },
  tableCellRight: {
    padding: 8,
    textAlign: "right",
  },
  totals: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 20,
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 5,
    minWidth: 200,
  },
  totalLabel: {
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  totalValue: {
    fontWeight: "bold",
    minWidth: 80,
    textAlign: "right",
  },
  notes: {
    marginTop: 30,
    fontSize: 10,
    color: "#666",
  },
  divider: {
    borderBottom: "1px solid #ddd",
    marginVertical: 20,
  },
});

function InvoiceDocument() {
  const { invoiceData } = useInvoiceStore();

  switch (invoiceData.template) {
    case "professional":
      return <ProfessionalTemplate invoiceData={invoiceData} />;
    case "minimal":
      return <MinimalTemplate invoiceData={invoiceData} />;
    case "elegant":
      return <ElegantTemplate invoiceData={invoiceData} />;
    default:
      return <ProfessionalTemplate invoiceData={invoiceData} />;
  }
}

export default function InvoicePreview() {
  return <InvoiceSummary />;
}

export { InvoiceSummary };
