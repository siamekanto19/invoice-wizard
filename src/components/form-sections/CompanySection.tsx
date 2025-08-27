"use client";

import { Building, MapPin, Phone, Globe, Mail, Hash } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LogoUpload from "./LogoUpload";
import { useInvoiceStore } from "@/store/invoice-store";

export default function CompanySection({ form }: { form: any }) {
  const { invoiceData, setInvoiceData } = useInvoiceStore();

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700">
                Company Name *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Company"
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
          name="companyEmail"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="company@example.com"
                  {...field}
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LogoUpload />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={invoiceData.companyPhone}
                  onChange={(e) =>
                    setInvoiceData({ companyPhone: e.target.value })
                  }
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          <div>
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  value={invoiceData.companyWebsite}
                  onChange={(e) =>
                    setInvoiceData({ companyWebsite: e.target.value })
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
              Address Information
            </FormLabel>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormItem>
                  <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St"
                      value={invoiceData.companyAddress}
                      onChange={(e) =>
                        setInvoiceData({ companyAddress: e.target.value })
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
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York"
                      value={invoiceData.companyCity}
                      onChange={(e) =>
                        setInvoiceData({ companyCity: e.target.value })
                      }
                      className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <FormItem>
                  <FormLabel className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NY"
                      value={invoiceData.companyState}
                      onChange={(e) =>
                        setInvoiceData({ companyState: e.target.value })
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
                    ZIP Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10001"
                      value={invoiceData.companyZip}
                      onChange={(e) =>
                        setInvoiceData({ companyZip: e.target.value })
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
                      value={invoiceData.companyCountry}
                      onChange={(e) =>
                        setInvoiceData({ companyCountry: e.target.value })
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

        <div>
          <FormItem>
            <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Tax ID
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Tax ID / VAT Number"
                value={invoiceData.taxId}
                onChange={(e) => setInvoiceData({ taxId: e.target.value })}
                className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </div>
    </div>
  );
}
