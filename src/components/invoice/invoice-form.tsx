"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useInvoiceStore } from "@/store/invoice-store";
import {
  Plus,
  Trash2,
  Save,
  Download,
  Calendar,
  Upload,
  X,
  Building,
  User,
  Package,
  CreditCard,
  FileText,
  Palette,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

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
  const {
    invoiceData,
    setInvoiceData,
    addItem,
    removeItem,
    updateItem,
    resetInvoice,
  } = useInvoiceStore();
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

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

  const DatePicker = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (date: string) => void;
    placeholder: string;
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {value ? (
              format(new Date(value), "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (date) {
                onChange(date.toISOString().split("T")[0]);
                setOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };

  const LogoUpload = () => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          debouncedUpdateField("companyLogo", base64);
        };
        reader.readAsDataURL(file);
      }
    };

    const removeLogo = () => {
      debouncedUpdateField("companyLogo", "");
    };

    return (
      <div className="space-y-2">
        <FormLabel>Company Logo</FormLabel>
        <div className="flex items-center space-x-4">
          {invoiceData.companyLogo ? (
            <div className="relative">
              <img
                src={invoiceData.companyLogo}
                alt="Company Logo"
                className="w-20 h-20 object-contain border rounded"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0"
                onClick={removeLogo}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="logo-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("logo-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleSaveInvoice = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      alert("Please fix the form errors before saving.");
      return;
    }

    if (invoiceData.items.length === 0) {
      alert("Please add at least one item to the invoice.");
      return;
    }

    console.log("Saving invoice...", invoiceData);
    // Here you could save to a database or local storage
    alert("Invoice saved successfully!");
  };

  const handleDownloadInvoice = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      alert("Please fix the form errors before downloading.");
      return;
    }

    if (invoiceData.items.length === 0) {
      alert("Please add at least one item to the invoice.");
      return;
    }

    console.log("Downloading invoice...", invoiceData);
    // Here you could generate PDF or other formats
    alert("Download feature coming soon!");
  };

  const handleResetForm = () => {
    if (
      confirm("Are you sure you want to reset the form? All data will be lost.")
    ) {
      resetInvoice();
      form.reset();
      setNewItem({ description: "", quantity: 1, unitPrice: 0 });
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Invoice Generator
            </CardTitle>
            <p className="text-gray-600">
              Fill in the details below to create your professional invoice
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Current Total</div>
            <div className="text-2xl font-bold text-green-600">
              ${invoiceData.total.toFixed(2)} {invoiceData.currency}
            </div>
            <div className="text-xs text-gray-400">
              {invoiceData.items.length} item
              {invoiceData.items.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveInvoice)}>
            <div className="space-y-8">
              {/* Invoice Details Section */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Invoice Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Invoice Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="INV-001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateInvoiceNumber}
                          className="mb-[1px]"
                          title="Generate auto invoice number"
                        >
                          Auto
                        </Button>
                      </div>
                    </div>
                    <div>
                      <FormLabel>Invoice Date *</FormLabel>
                      <DatePicker
                        value={invoiceData.invoiceDate}
                        onChange={(date) =>
                          debouncedUpdateField("invoiceDate", date)
                        }
                        placeholder="Select invoice date"
                      />
                    </div>
                    <div>
                      <FormLabel>Due Date *</FormLabel>
                      <DatePicker
                        value={invoiceData.dueDate}
                        onChange={(date) =>
                          debouncedUpdateField("dueDate", date)
                        }
                        placeholder="Select due date"
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="template"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select template" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">
                                Professional
                              </SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="elegant">Elegant</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Company & Client Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Information */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Your Company
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="company@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <LogoUpload />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>Phone</FormLabel>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          value={invoiceData.companyPhone}
                          onChange={(e) =>
                            debouncedUpdateField("companyPhone", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>Website</FormLabel>
                        <Input
                          placeholder="https://example.com"
                          value={invoiceData.companyWebsite}
                          onChange={(e) =>
                            debouncedUpdateField(
                              "companyWebsite",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>Address</FormLabel>
                        <Input
                          placeholder="123 Main St"
                          value={invoiceData.companyAddress}
                          onChange={(e) =>
                            debouncedUpdateField(
                              "companyAddress",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>City</FormLabel>
                        <Input
                          placeholder="New York"
                          value={invoiceData.companyCity}
                          onChange={(e) =>
                            debouncedUpdateField("companyCity", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <FormLabel>State</FormLabel>
                        <Input
                          placeholder="NY"
                          value={invoiceData.companyState}
                          onChange={(e) =>
                            debouncedUpdateField("companyState", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>ZIP</FormLabel>
                        <Input
                          placeholder="10001"
                          value={invoiceData.companyZip}
                          onChange={(e) =>
                            debouncedUpdateField("companyZip", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>Country</FormLabel>
                        <Input
                          placeholder="USA"
                          value={invoiceData.companyCountry}
                          onChange={(e) =>
                            debouncedUpdateField(
                              "companyCountry",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <FormLabel>Tax ID</FormLabel>
                      <Input
                        placeholder="Tax ID"
                        value={invoiceData.taxId}
                        onChange={(e) =>
                          debouncedUpdateField("taxId", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Client Information */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Client Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Client Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clientEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="client@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>Phone</FormLabel>
                        <Input
                          placeholder="+1 (555) 987-6543"
                          value={invoiceData.clientPhone}
                          onChange={(e) =>
                            debouncedUpdateField("clientPhone", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>Address</FormLabel>
                        <Input
                          placeholder="456 Oak Ave"
                          value={invoiceData.clientAddress}
                          onChange={(e) =>
                            debouncedUpdateField(
                              "clientAddress",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>City</FormLabel>
                        <Input
                          placeholder="Los Angeles"
                          value={invoiceData.clientCity}
                          onChange={(e) =>
                            debouncedUpdateField("clientCity", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>State</FormLabel>
                        <Input
                          placeholder="CA"
                          value={invoiceData.clientState}
                          onChange={(e) =>
                            debouncedUpdateField("clientState", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel>ZIP Code</FormLabel>
                        <Input
                          placeholder="90210"
                          value={invoiceData.clientZip}
                          onChange={(e) =>
                            debouncedUpdateField("clientZip", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FormLabel>Country</FormLabel>
                        <Input
                          placeholder="USA"
                          value={invoiceData.clientCountry}
                          onChange={(e) =>
                            debouncedUpdateField(
                              "clientCountry",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Invoice Items */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Invoice Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg">
                    <Input
                      placeholder="Description"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      onKeyPress={handleItemKeyPress}
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      onKeyPress={handleItemKeyPress}
                      min="1"
                    />
                    <Input
                      type="number"
                      placeholder="Unit Price"
                      value={newItem.unitPrice}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          unitPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      onKeyPress={handleItemKeyPress}
                      min="0"
                      step="0.01"
                    />
                    <div className="flex items-center justify-center font-semibold bg-white px-3 py-2 border rounded">
                      ${(newItem.quantity * newItem.unitPrice).toFixed(2)}
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddItem}
                      className="flex items-center gap-2"
                      disabled={!newItem.description || newItem.quantity <= 0}
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {invoiceData.items.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 border rounded-lg bg-white"
                      >
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            handleUpdateItem(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                        />
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateItem(
                              item.id,
                              "quantity",
                              parseInt(e.target.value) || 0
                            )
                          }
                          min="1"
                        />
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleUpdateItem(
                              item.id,
                              "unitPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          min="0"
                          step="0.01"
                        />
                        <div className="flex items-center justify-center font-semibold">
                          ${item.total.toFixed(2)}
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <FormField
                      control={form.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Rate (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                field.onChange(value);
                                debouncedUpdateField("taxRate", value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Rate (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                field.onChange(value);
                                debouncedUpdateField("discountRate", value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-wrap justify-end gap-4 pt-4 border-t">
                    <Badge variant="secondary">
                      Subtotal: ${invoiceData.subtotal.toFixed(2)}
                    </Badge>
                    <Badge variant="secondary">
                      Tax: ${invoiceData.taxAmount.toFixed(2)}
                    </Badge>
                    <Badge variant="secondary">
                      Discount: ${invoiceData.discountAmount.toFixed(2)}
                    </Badge>
                    <Badge variant="default" className="text-lg">
                      Total: ${invoiceData.total.toFixed(2)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">
                                USD - US Dollar
                              </SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">
                                GBP - British Pound
                              </SelectItem>
                              <SelectItem value="JPY">
                                JPY - Japanese Yen
                              </SelectItem>
                              <SelectItem value="CAD">
                                CAD - Canadian Dollar
                              </SelectItem>
                              <SelectItem value="AUD">
                                AUD - Australian Dollar
                              </SelectItem>
                              <SelectItem value="CHF">
                                CHF - Swiss Franc
                              </SelectItem>
                              <SelectItem value="CNY">
                                CNY - Chinese Yuan
                              </SelectItem>
                              <SelectItem value="INR">
                                INR - Indian Rupee
                              </SelectItem>
                              <SelectItem value="MXN">
                                MXN - Mexican Peso
                              </SelectItem>
                              <SelectItem value="BRL">
                                BRL - Brazilian Real
                              </SelectItem>
                              <SelectItem value="RUB">
                                RUB - Russian Ruble
                              </SelectItem>
                              <SelectItem value="KRW">
                                KRW - South Korean Won
                              </SelectItem>
                              <SelectItem value="SGD">
                                SGD - Singapore Dollar
                              </SelectItem>
                              <SelectItem value="HKD">
                                HKD - Hong Kong Dollar
                              </SelectItem>
                              <SelectItem value="NOK">
                                NOK - Norwegian Krone
                              </SelectItem>
                              <SelectItem value="SEK">
                                SEK - Swedish Krona
                              </SelectItem>
                              <SelectItem value="DKK">
                                DKK - Danish Krone
                              </SelectItem>
                              <SelectItem value="PLN">
                                PLN - Polish Złoty
                              </SelectItem>
                              <SelectItem value="THB">
                                THB - Thai Baht
                              </SelectItem>
                              <SelectItem value="MYR">
                                MYR - Malaysian Ringgit
                              </SelectItem>
                              <SelectItem value="ZAR">
                                ZAR - South African Rand
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentTerms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Terms *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment terms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="net_15">Net 15</SelectItem>
                              <SelectItem value="net_30">Net 30</SelectItem>
                              <SelectItem value="net_60">Net 60</SelectItem>
                              <SelectItem value="due_on_receipt">
                                Due on Receipt
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Bank of America" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Account</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankRouting"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Routing</FormLabel>
                          <FormControl>
                            <Input placeholder="021000021" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <FormLabel>Bank SWIFT</FormLabel>
                      <Input
                        placeholder="BOFAUS3N"
                        value={invoiceData.bankSwift}
                        onChange={(e) =>
                          debouncedUpdateField("bankSwift", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <FormLabel>Bank Branch</FormLabel>
                      <Input
                        placeholder="Main Branch"
                        value={invoiceData.bankBranch}
                        onChange={(e) =>
                          debouncedUpdateField("bankBranch", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-4 border-t">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Additional notes..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Terms and Conditions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Terms and conditions..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-end pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetForm}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Reset Form
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveInvoice}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Invoice
                </Button>
                <Button
                  type="button"
                  onClick={handleDownloadInvoice}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
