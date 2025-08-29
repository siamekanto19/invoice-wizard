"use client";

import ClientSection from "@/components/form-sections/ClientSection";
import CompanySection from "@/components/form-sections/CompanySection";
import DatePicker from "@/components/form-sections/DatePicker";
import InvoiceDetails from "@/components/form-sections/InvoiceDetails";
import ItemsSection from "@/components/form-sections/ItemsSection";
import InvoiceItemsSection from "@/components/form-sections/InvoiceItemsSection";
import PaymentSection from "@/components/form-sections/PaymentSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInvoiceStore } from "@/store/invoice-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileText,
  Package,
  Sparkles,
  CheckCircle,
  Clock,
  Zap,
  Building,
  Users,
  Calculator,
  CreditCard,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const itemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
});

const formSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  template: z.string().min(1, "Template is required"),

  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z
    .string()
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),

  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z
    .string()
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),

  taxRate: z.number().min(0).max(100),
  discountRate: z.number().min(0).max(100),

  paymentTerms: z.string().min(1, "Payment terms are required"),
  currency: z.string().min(1, "Currency is required"),

  bankName: z.string().optional(),
  bankAccount: z.string().optional(),
  bankRouting: z.string().optional(),

  notes: z.string().optional(),
  terms: z.string().optional(),
});

export default function InvoiceForm() {
  const { invoiceData, setInvoiceData, addItem, removeItem, updateItem } =
    useInvoiceStore();

  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Calculate form completion progress
  const calculateFormProgress = useCallback(() => {
    const requiredFields = [
      "invoiceNumber",
      "companyName",
      "clientName",
      "currency",
      "paymentTerms",
    ];
    const completedFields = requiredFields.filter((field) => {
      const value = invoiceData[field as keyof typeof invoiceData];
      return value && value.toString().trim() !== "";
    });

    const itemsProgress = invoiceData.items.length > 0 ? 1 : 0;
    const totalFields = requiredFields.length + 1; // +1 for items

    return Math.round(
      ((completedFields.length + itemsProgress) / totalFields) * 100
    );
  }, [invoiceData]);

  useEffect(() => {
    setFormProgress(calculateFormProgress());
  }, [calculateFormProgress]);

  // Create debounced update function
  const debouncedSetInvoiceData = useCallback(
    debounce((data: Partial<typeof invoiceData>) => {
      setInvoiceData(data);
    }, 300),
    [setInvoiceData]
  );

  // Create debounced update function for direct field updates
  const debouncedUpdateField = useCallback(
    debounce((field: string, value: any) => {
      setInvoiceData({ [field]: value });
    }, 300),
    [setInvoiceData]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      template: invoiceData.template,

      companyName: invoiceData.companyName,
      companyEmail: invoiceData.companyEmail,

      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,

      taxRate: invoiceData.taxRate,
      discountRate: invoiceData.discountRate,

      paymentTerms: invoiceData.paymentTerms,
      currency: invoiceData.currency,

      bankName: invoiceData.bankName,
      bankAccount: invoiceData.bankAccount,
      bankRouting: invoiceData.bankRouting,

      notes: invoiceData.notes || "",
      terms: invoiceData.terms || "",
    },
  });

  // Watch form values and update store with debouncing
  const watchedValues = form.watch();

  useEffect(() => {
    const subscription = form.watch((value) => {
      // Only update if values have actually changed
      if (JSON.stringify(value) !== JSON.stringify(invoiceData)) {
        debouncedSetInvoiceData(value);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSetInvoiceData, invoiceData]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      // Clear any pending debounced calls - note: our debounce doesn't have flush
    };
  }, []);

  // Replaced by DatePicker, LogoUpload, ItemsSection, CompanySection, ClientSection, PaymentSection

  const handleSaveInvoice = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "⚠️ Validation Error",
          description: "Please fix the form errors before saving.",
          variant: "destructive",
        });
        return;
      }

      if (invoiceData.items.length === 0) {
        toast({
          title: "⚠️ Missing Items",
          description: "Please add at least one item to the invoice.",
          variant: "destructive",
        });
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLastSaved(new Date());
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

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const invoiceNumber = `INV-${year}${month}${day}-${random}`;

    form.setValue("invoiceNumber", invoiceNumber);
    debouncedUpdateField("invoiceNumber", invoiceNumber);

    toast({
      title: "🎯 Invoice Number Generated",
      description: `New invoice number: ${invoiceNumber}`,
      variant: "default",
    });
  };

  const handleAddItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.unitPrice >= 0) {
      addItem(newItem);
      setNewItem({ description: "", quantity: 1, unitPrice: 0 });
    }
  };

  const handleItemKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleUpdateItem = (
    id: string,
    field: string,
    value: string | number
  ) => {
    updateItem(id, { [field]: value });
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "details":
        return FileText;
      case "company":
        return Building;
      case "client":
        return Users;
      case "items":
        return Package;
      case "payment":
        return CreditCard;
      case "summary":
        return Calculator;
      default:
        return FileText;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Enhanced Header with Progress */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-100/50 shadow-lg shadow-blue-500/5">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <FileText className="h-8 w-8 text-white" />
              </div>
              {formProgress === 100 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Create Invoice
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                {invoiceData.invoiceNumber ? (
                  <>
                    <span>Invoice #{invoiceData.invoiceNumber}</span>
                    <Badge variant="secondary" className="text-xs">
                      Draft
                    </Badge>
                  </>
                ) : (
                  "New invoice draft"
                )}
              </p>
              {lastSaved && (
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Status Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <Package className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">
              {invoiceData.items.length}
            </div>
            <div className="text-xs text-blue-600/70 font-medium">Items</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <Calculator className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
            <div className="text-xl font-bold text-emerald-600">
              ${invoiceData.total.toFixed(2)}
            </div>
            <div className="text-xs text-emerald-600/70 font-medium">Total</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-lg font-bold text-purple-600">
              {invoiceData.currency || "USD"}
            </div>
            <div className="text-xs text-purple-600/70 font-medium">
              Currency
            </div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
            <Sparkles className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-sm font-bold text-orange-600 capitalize">
              {invoiceData.template || "Professional"}
            </div>
            <div className="text-xs text-orange-600/70 font-medium">
              Template
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Form Content */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-900/5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSaveInvoice)}
            className="md:p-4"
          >
            <div className="space-y-12">
              {/* Invoice Details Section */}
              <Card className="border-0 shadow-none bg-gradient-to-r from-slate-50/50 to-white rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    Invoice Details
                    <Badge variant="outline" className="ml-auto">
                      Required
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InvoiceDetails
                    form={form}
                    invoiceData={invoiceData}
                    debouncedUpdateField={debouncedUpdateField}
                    generateInvoiceNumber={generateInvoiceNumber}
                  />
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Company & Client Information */}
              <div className="grid grid-cols-1 gap-8">
                <Card className="border-0 shadow-none bg-gradient-to-r from-emerald-50/50 to-white rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Building className="h-5 w-5 text-emerald-600" />
                      </div>
                      Company Information
                      <Badge variant="outline" className="ml-auto">
                        Required
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CompanySection form={form} />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-none bg-gradient-to-r from-purple-50/50 to-white rounded-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      Client Information
                      <Badge variant="outline" className="ml-auto">
                        Required
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ClientSection form={form} />
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-8" />

              {/* Invoice Items Section */}
              <Card className="border-0 shadow-none bg-gradient-to-r from-orange-50/50 to-white rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    Invoice Items
                    <Badge variant="outline" className="ml-auto">
                      Required
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InvoiceItemsSection
                    form={form}
                    debouncedUpdateField={debouncedUpdateField}
                    invoiceData={invoiceData}
                  />
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Payment Section */}
              <Card className="border-0 shadow-none bg-gradient-to-r from-cyan-50/50 to-white rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-cyan-600" />
                    </div>
                    Payment Information
                    <Badge variant="secondary" className="ml-auto">
                      Optional
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentSection form={form} />
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
