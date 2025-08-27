"use client";

import {
  CreditCard,
  DollarSign,
  Building2,
  FileText,
  MessageSquare,
} from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useInvoiceStore } from "@/store/invoice-store";

export default function PaymentSection({ form }: { form: any }) {
  const { invoiceData } = useInvoiceStore();

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        {/* Payment Terms & Currency */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Payment Settings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Currency *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">🇺🇸 USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">🇪🇺 EUR - Euro</SelectItem>
                      <SelectItem value="GBP">
                        🇬🇧 GBP - British Pound
                      </SelectItem>
                      <SelectItem value="JPY">🇯🇵 JPY - Japanese Yen</SelectItem>
                      <SelectItem value="CAD">
                        🇨🇦 CAD - Canadian Dollar
                      </SelectItem>
                      <SelectItem value="AUD">
                        🇦🇺 AUD - Australian Dollar
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
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Payment Terms *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Due on Receipt">
                        Due on Receipt
                      </SelectItem>
                      <SelectItem value="NET 15">Net 15 Days</SelectItem>
                      <SelectItem value="NET 30">Net 30 Days</SelectItem>
                      <SelectItem value="NET 60">Net 60 Days</SelectItem>
                      <SelectItem value="NET 90">Net 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Bank Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Bank Details
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Bank Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bank of America"
                        {...field}
                        className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Account Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789"
                        {...field}
                        className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankRouting"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Routing Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="021000021"
                        {...field}
                        className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="text-sm font-medium text-slate-700">
                  SWIFT Code
                </FormLabel>
                <Input
                  placeholder="BOFAUS3N"
                  value={invoiceData.bankSwift}
                  onChange={(e) =>
                    useInvoiceStore
                      .getState()
                      .setInvoiceData({ bankSwift: e.target.value })
                  }
                  className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              <div className="md:col-span-2">
                <FormLabel className="text-sm font-medium text-slate-700">
                  Bank Branch
                </FormLabel>
                <Input
                  placeholder="Main Branch"
                  value={invoiceData.bankBranch}
                  onChange={(e) =>
                    useInvoiceStore
                      .getState()
                      .setInvoiceData({ bankBranch: e.target.value })
                  }
                  className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Additional Information
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Thank you for your business! Payment is due within the specified terms."
                      className="min-h-[120px] border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
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
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Terms and Conditions
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Payment terms, late fees, and other conditions..."
                      className="min-h-[120px] border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
