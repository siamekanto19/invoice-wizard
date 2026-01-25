"use client";

import ItemsSection from "./ItemsSection";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function InvoiceItemsSection({
  form,
  debouncedUpdateField,
  invoiceData,
}: {
  form: any;
  debouncedUpdateField: (field: string, value: any) => void;
  invoiceData: any;
}) {
  const currencySymbol =
    {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
      INR: "₹",
      BDT: "৳",
      PKR: "₨",
      CNY: "¥",
      SGD: "S$",
      MYR: "RM",
      THB: "฿",
      IDR: "Rp",
      PHP: "₱",
      VND: "₫",
      KRW: "₩",
      AED: "د.إ",
      SAR: "﷼",
      QAR: "ر.ق",
      KWD: "د.ك",
      BHD: "ب.د",
      OMR: "ر.ع.",
      TRY: "₺",
      RUB: "₽",
      BRL: "R$",
      MXN: "$",
      ARS: "$",
      CLP: "$",
      COP: "$",
      PEN: "S/",
      UYU: "$",
      PYG: "₲",
      BOB: "Bs.",
      ZAR: "R",
      NGN: "₦",
      KES: "KSh",
      GHS: "₵",
      EGP: "£",
      MAD: "د.م.",
      TND: "د.ت",
      DZD: "د.ج",
      LBP: "ل.ل",
      JOD: "د.ا",
      ILS: "₪",
      PLN: "zł",
      CZK: "Kč",
      HUF: "Ft",
      RON: "lei",
      BGN: "лв",
      HRK: "kn",
      RSD: "дин.",
      BAM: "KM",
      MKD: "ден.",
      ALL: "L",
      ISK: "kr",
      NOK: "kr",
      SEK: "kr",
      DKK: "kr",
      CHF: "Fr",
    }[invoiceData.currency] || "$";

  return (
    <div className="space-y-6">
      {/* Items List */}
      <ItemsSection />

      {/* Tax and Discount */}
      <div className="pt-4 border-t border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="taxRate"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-600">
                  Tax Rate (%)
                </FormLabel>
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
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-sm text-neutral-600">
                  Discount (%)
                </FormLabel>
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
      </div>

      {/* Totals */}
      <div className="pt-4 border-t border-neutral-100">
        <div className="space-y-2 max-w-xs ml-auto text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Subtotal</span>
            <span className="text-neutral-900">
              {currencySymbol}
              {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          {invoiceData.taxRate > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Tax ({invoiceData.taxRate}%)
              </span>
              <span className="text-neutral-900">
                {currencySymbol}
                {invoiceData.taxAmount.toFixed(2)}
              </span>
            </div>
          )}
          {invoiceData.discountRate > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Discount ({invoiceData.discountRate}%)
              </span>
              <span className="text-neutral-900">
                -{currencySymbol}
                {invoiceData.discountAmount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-neutral-200 font-medium">
            <span className="text-neutral-900">Total</span>
            <span className="text-neutral-900 text-base">
              {currencySymbol}
              {invoiceData.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
