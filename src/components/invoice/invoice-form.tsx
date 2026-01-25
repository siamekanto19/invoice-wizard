"use client";

import ClientSection from "@/components/form-sections/ClientSection";
import CompanySection from "@/components/form-sections/CompanySection";
import InvoiceDetails from "@/components/form-sections/InvoiceDetails";
import InvoiceItemsSection from "@/components/form-sections/InvoiceItemsSection";
import PaymentSection from "@/components/form-sections/PaymentSection";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useInvoiceStore } from "@/store/invoice-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building,
  CreditCard,
  FileText,
  Package,
  Users,
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
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

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
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Only update if values have actually changed
      if (JSON.stringify(value) !== JSON.stringify(invoiceData)) {
        debouncedSetInvoiceData(value);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSetInvoiceData, invoiceData]);

  const handleSaveInvoice = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please fix the form errors before saving.",
          variant: "destructive",
        });
        return;
      }

      if (invoiceData.items.length === 0) {
        toast({
          title: "Missing Items",
          description: "Please add at least one item to the invoice.",
          variant: "destructive",
        });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLastSaved(new Date());
      toast({
        title: "Invoice Saved",
        description: "Your invoice has been saved successfully.",
      });

      console.log("Saving invoice...", invoiceData);
    } catch (error) {
      toast({
        title: "Save Failed",
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
      title: "Invoice Number Generated",
      description: `New invoice number: ${invoiceNumber}`,
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

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaveInvoice)}
          className="space-y-6"
        >
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Invoice Details
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Number, dates, and template
                  </p>
                </div>
              </div>
            </div>
            <InvoiceDetails
              form={form}
              invoiceData={invoiceData}
              debouncedUpdateField={debouncedUpdateField}
              generateInvoiceNumber={generateInvoiceNumber}
            />
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Building className="h-4 w-4 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Your Business
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Company name and contact
                  </p>
                </div>
              </div>
            </div>
            <CompanySection form={form} />
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Bill To
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Client name and contact
                  </p>
                </div>
              </div>
            </div>
            <ClientSection form={form} />
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Package className="h-4 w-4 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Line Items
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Services, quantities, and rates
                  </p>
                </div>
              </div>
            </div>
            <InvoiceItemsSection
              form={form}
              debouncedUpdateField={debouncedUpdateField}
              invoiceData={invoiceData}
            />
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-neutral-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Payment Details
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Terms and payment method
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-neutral-400">
                Optional
              </span>
            </div>
            <PaymentSection form={form} />
          </section>
        </form>
      </Form>
    </div>
  );
}
