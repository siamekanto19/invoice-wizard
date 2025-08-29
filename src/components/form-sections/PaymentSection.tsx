"use client";

import {
  CreditCard,
  DollarSign,
  Building2,
  FileText,
  MessageSquare,
  Banknote,
  Globe,
  Clock,
  ShieldCheck,
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
import { Card } from "@/components/ui/card";
import { useInvoiceStore } from "@/store/invoice-store";

export default function PaymentSection({ form }: { form: any }) {
  const { invoiceData } = useInvoiceStore();

  return (
    <div className="space-y-6">
      {/* Payment Settings Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Payment Settings
            </h4>
            <p className="text-xs text-slate-500">
              Configure currency and payment terms
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-emerald-500" />
                  Currency *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!h-10 w-full border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                    <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                    <SelectItem value="JPY">JPY (¥) - Japanese Yen</SelectItem>
                    <SelectItem value="CAD">
                      CAD ($) - Canadian Dollar
                    </SelectItem>
                    <SelectItem value="AUD">
                      AUD ($) - Australian Dollar
                    </SelectItem>
                    <SelectItem value="BDT">
                      BDT (৳) - Bangladeshi Taka
                    </SelectItem>
                    <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                    <SelectItem value="PKR">
                      PKR (₨) - Pakistani Rupee
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
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  Payment Terms *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!h-10 w-full border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md">
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
      </Card>

      {/* Bank Information Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-blue-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Bank Details
            </h4>
            <p className="text-xs text-slate-500">
              Optional banking information for payments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Banknote className="h-3.5 w-3.5 text-blue-500" />
                  Bank Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Bank of America"
                    {...field}
                    className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
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
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <CreditCard className="h-3.5 w-3.5 text-blue-500" />
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456789"
                    {...field}
                    className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
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
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  Routing Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="021000021"
                    {...field}
                    className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="group">
            <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-blue-500" />
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
              className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
            />
          </FormItem>

          <div className="md:col-span-2">
            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-blue-500" />
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
                className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
              />
            </FormItem>
          </div>
        </div>
      </Card>

      {/* Notes and Terms Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-amber-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-sm">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Additional Information
            </h4>
            <p className="text-xs text-slate-500">
              Add notes and terms for your invoice
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                  Notes
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Thank you for your business! Payment is due within the specified terms."
                    className="min-h-[120px] border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md resize-none"
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
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                  Terms and Conditions
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Payment terms, late fees, and other conditions..."
                    className="min-h-[120px] border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
