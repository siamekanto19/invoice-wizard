"use client";

import { User, MapPin, Phone, Mail } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInvoiceStore } from "@/store/invoice-store";

export default function ClientSection({ form }: { form: any }) {
  const { invoiceData } = useInvoiceStore();

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700">
                Client Name *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Client Company"
                  {...field}
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="client@example.com"
                  {...field}
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4">
          <div>
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 (555) 987-6543"
                  value={invoiceData.clientPhone}
                  onChange={(e) =>
                    useInvoiceStore
                      .getState()
                      .setInvoiceData({ clientPhone: e.target.value })
                  }
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <FormLabel className="text-sm font-medium text-slate-700">
              Billing Address
            </FormLabel>
          </div>

          <div>
            <FormItem>
              <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Street Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="456 Oak Ave"
                  value={invoiceData.clientAddress}
                  onChange={(e) =>
                    useInvoiceStore
                      .getState()
                      .setInvoiceData({ clientAddress: e.target.value })
                  }
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormItem>
                <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Los Angeles"
                    value={invoiceData.clientCity}
                    onChange={(e) =>
                      useInvoiceStore
                        .getState()
                        .setInvoiceData({ clientCity: e.target.value })
                    }
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  State
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="CA"
                    value={invoiceData.clientState}
                    onChange={(e) =>
                      useInvoiceStore
                        .getState()
                        .setInvoiceData({ clientState: e.target.value })
                    }
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormItem>
                <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  ZIP Code
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="90210"
                    value={invoiceData.clientZip}
                    onChange={(e) =>
                      useInvoiceStore
                        .getState()
                        .setInvoiceData({ clientZip: e.target.value })
                    }
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="USA"
                    value={invoiceData.clientCountry}
                    onChange={(e) =>
                      useInvoiceStore
                        .getState()
                        .setInvoiceData({ clientCountry: e.target.value })
                    }
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
