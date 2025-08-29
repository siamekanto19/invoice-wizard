"use client";

import ItemsSection from "./ItemsSection";
import {
  Package,
  Calculator,
  Percent,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
    <div className="space-y-8">
      {/* Items Section with Enhanced Styling */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-slate-50/50">
        <ItemsSection />
      </Card>

      {/* Enhanced Tax and Discount Section */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-blue-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
            <Calculator className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Tax & Discount
            </h4>
            <p className="text-xs text-slate-500">
              Configure tax and discount rates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="taxRate"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Percent className="h-3.5 w-3.5 text-emerald-500" />
                  Tax Rate (%)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      className="h-12 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl pl-4 pr-12 bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                        debouncedUpdateField("taxRate", value);
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="text-xs font-medium text-slate-400">
                        %
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountRate"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <TrendingDown className="h-3.5 w-3.5 text-orange-500" />
                  Discount Rate (%)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      className="h-12 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl pl-4 pr-12 bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                        debouncedUpdateField("discountRate", value);
                      }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="text-xs font-medium text-slate-400">
                        %
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Enhanced Financial Summary */}
      <Card className="p-6 border-slate-200 shadow-lg bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Financial Summary
            </h4>
            <p className="text-xs text-slate-500">
              Calculated totals and breakdowns
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Subtotal */}
          <div className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-300 hover:border-slate-300">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                Subtotal
              </span>
              <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                {currencySymbol}
                {invoiceData.subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Tax */}
          <div className="group p-4 bg-emerald-50/70 backdrop-blur-sm rounded-xl border border-emerald-200/50 hover:shadow-md transition-all duration-300 hover:border-emerald-300">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">
                Tax
              </span>
              <span className="text-lg font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
                {currencySymbol}
                {invoiceData.taxAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Discount */}
          <div className="group p-4 bg-orange-50/70 backdrop-blur-sm rounded-xl border border-orange-200/50 hover:shadow-md transition-all duration-300 hover:border-orange-300">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">
                Discount
              </span>
              <span className="text-lg font-bold text-orange-700 group-hover:text-orange-800 transition-colors duration-300">
                {currencySymbol}
                {invoiceData.discountAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-xl border-2 border-blue-200/50 hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:scale-105">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                Total
              </span>
              <span className="text-xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors duration-300">
                {currencySymbol}
                {invoiceData.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
