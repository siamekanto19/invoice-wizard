"use client";

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
    <div className="space-y-6">
      {/* Currency & Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm text-neutral-600">
                Currency
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="AUD">AUD ($)</SelectItem>
                  <SelectItem value="BDT">BDT (৳)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="PKR">PKR (₨)</SelectItem>
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
            <FormItem className="w-full">
              <FormLabel className="text-sm text-neutral-600">
                Payment Terms
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
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

      {/* Bank Details */}
      <div className="pt-4 border-t border-neutral-100">
        <p className="text-sm text-neutral-500 mb-4">
          Bank Details (Optional)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-600">
                  Bank Name
                </FormLabel>
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
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-600">
                  Account Number
                </FormLabel>
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
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-600">
                  Routing Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="021000021" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
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
            />
          </FormItem>
        </div>
      </div>

      {/* Notes & Terms */}
      <div className="pt-4 border-t border-neutral-100">
        <p className="text-sm text-neutral-500 mb-4">Additional Notes</p>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-600">
                  Notes
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Thank you for your business!"
                    className="min-h-[80px] resize-none"
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
                <FormLabel className="text-sm text-neutral-600">
                  Terms & Conditions
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Payment terms, late fees, etc."
                    className="min-h-[80px] resize-none"
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
  );
}
