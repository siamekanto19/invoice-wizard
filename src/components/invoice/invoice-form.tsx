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
    <div className="w-full space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaveInvoice)}
          className="space-y-4"
        >
          <section className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                Invoice Details
              </p>
              <p className="text-sm font-semibold text-stone-900 mt-0.5">
                Number, dates &amp; template
              </p>
            </div>
            <div className="p-6">
              <InvoiceDetails
                form={form}
                invoiceData={invoiceData}
                debouncedUpdateField={debouncedUpdateField}
                generateInvoiceNumber={generateInvoiceNumber}
              />
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                Your Business
              </p>
              <p className="text-sm font-semibold text-stone-900 mt-0.5">
                Company name &amp; contact
              </p>
            </div>
            <div className="p-6">
              <CompanySection form={form} />
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                Bill To
              </p>
              <p className="text-sm font-semibold text-stone-900 mt-0.5">
                Client name &amp; contact
              </p>
            </div>
            <div className="p-6">
              <ClientSection form={form} />
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                Line Items
              </p>
              <p className="text-sm font-semibold text-stone-900 mt-0.5">
                Services, quantities &amp; rates
              </p>
            </div>
            <div className="p-6">
              <InvoiceItemsSection
                form={form}
                debouncedUpdateField={debouncedUpdateField}
                invoiceData={invoiceData}
              />
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                  Payment Details
                </p>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">
                  Terms, currency &amp; bank info
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                Optional
              </span>
            </div>
            <div className="p-6">
              <PaymentSection form={form} />
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}
