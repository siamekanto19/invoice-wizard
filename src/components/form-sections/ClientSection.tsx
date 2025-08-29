"use client";

import { User, MapPin, Phone, Mail, Building, Globe } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useInvoiceStore } from "@/store/invoice-store";

export default function ClientSection({ form }: { form: any }) {
  const { invoiceData } = useInvoiceStore();

  return (
    <div className="space-y-6">
      {/* Client Information Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-blue-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Client Information
            </h4>
            <p className="text-xs text-slate-500">
              Basic contact and identification details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }: any) => (
              <FormItem className="group md:col-span-2">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-blue-500" />
                  Client Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Client Company"
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
            name="clientEmail"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-blue-500" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="client@example.com"
                    type="email"
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
              <Phone className="h-3.5 w-3.5 text-blue-500" />
              Phone Number
            </FormLabel>
            <FormControl>
              <Input
                placeholder="+1 (555) 987-6543"
                type="tel"
                value={invoiceData.clientPhone}
                onChange={(e) =>
                  useInvoiceStore
                    .getState()
                    .setInvoiceData({ clientPhone: e.target.value })
                }
                className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </Card>

      {/* Billing Address Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-green-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Billing Address
            </h4>
            <p className="text-xs text-slate-500">
              Client's billing and mailing address
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormItem className="group">
            <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-green-500" />
              Street Address
            </FormLabel>
            <FormControl>
              <Input
                placeholder="456 Oak Avenue"
                value={invoiceData.clientAddress}
                onChange={(e) =>
                  useInvoiceStore
                    .getState()
                    .setInvoiceData({ clientAddress: e.target.value })
                }
                className="h-12 border-slate-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Building className="h-3.5 w-3.5 text-green-500" />
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
                  className="h-12 border-slate-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-green-500" />
                State/Province
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
                  className="h-12 border-slate-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-green-500" />
                ZIP/Postal Code
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
                  className="h-12 border-slate-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-green-500" />
                Country
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="United States"
                  value={invoiceData.clientCountry}
                  onChange={(e) =>
                    useInvoiceStore
                      .getState()
                      .setInvoiceData({ clientCountry: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
      </Card>
    </div>
  );
}
