"use client";

import {
  Building,
  MapPin,
  Phone,
  Globe,
  Mail,
  Hash,
  Upload,
  Shield,
} from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import LogoUpload from "./LogoUpload";
import { useInvoiceStore } from "@/store/invoice-store";

export default function CompanySection({ form }: { form: any }) {
  const { invoiceData, setInvoiceData } = useInvoiceStore();

  return (
    <div className="space-y-6">
      {/* Company Information Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-purple-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-sm">
            <Building className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Company Information
            </h4>
            <p className="text-xs text-slate-500">
              Your business details and contact information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-purple-500" />
                  Company Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Company"
                    {...field}
                    className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyEmail"
              render={({ field }: any) => (
                <FormItem className="group">
                  <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-purple-500" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="company@example.com"
                      type="email"
                      {...field}
                      className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-purple-500" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  value={invoiceData.companyPhone}
                  onChange={(e) =>
                    setInvoiceData({ companyPhone: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-purple-500" />
                Website
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  type="url"
                  value={invoiceData.companyWebsite}
                  onChange={(e) =>
                    setInvoiceData({ companyWebsite: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-purple-500" />
                Tax ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Tax ID / VAT Number"
                  value={invoiceData.taxId}
                  onChange={(e) => setInvoiceData({ taxId: e.target.value })}
                  className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
      </Card>

      {/* Company Address Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-teal-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-sm">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Business Address
            </h4>
            <p className="text-xs text-slate-500">
              Your company's physical address information
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-teal-500" />
                Street Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main Street"
                  value={invoiceData.companyAddress}
                  onChange={(e) =>
                    setInvoiceData({ companyAddress: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Building className="h-3.5 w-3.5 text-teal-500" />
                City
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="New York"
                  value={invoiceData.companyCity}
                  onChange={(e) =>
                    setInvoiceData({ companyCity: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-teal-500" />
                State/Province
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="NY"
                  value={invoiceData.companyState}
                  onChange={(e) =>
                    setInvoiceData({ companyState: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Hash className="h-3.5 w-3.5 text-teal-500" />
                ZIP/Postal Code
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="10001"
                  value={invoiceData.companyZip}
                  onChange={(e) =>
                    setInvoiceData({ companyZip: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem className="group">
              <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-teal-500" />
                Country
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="United States"
                  value={invoiceData.companyCountry}
                  onChange={(e) =>
                    setInvoiceData({ companyCountry: e.target.value })
                  }
                  className="h-12 border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
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
