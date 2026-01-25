"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInvoiceStore } from "@/store/invoice-store";

export default function CompanySection({ form }: { form: any }) {
  const { invoiceData, setInvoiceData } = useInvoiceStore();

  return (
    <div className="space-y-4">
      {/* Company Name */}
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }: any) => (
          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
              Company Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Your Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm text-neutral-600">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="company@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-sm text-neutral-600">Phone</FormLabel>
          <FormControl>
            <Input
              placeholder="+1 (555) 123-4567"
              type="tel"
              value={invoiceData.companyPhone}
              onChange={(e) => setInvoiceData({ companyPhone: e.target.value })}
            />
          </FormControl>
        </FormItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormItem>
          <FormLabel className="text-sm text-neutral-600">Website</FormLabel>
          <FormControl>
            <Input
              placeholder="https://example.com"
              type="url"
              value={invoiceData.companyWebsite}
              onChange={(e) =>
                setInvoiceData({ companyWebsite: e.target.value })
              }
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel className="text-sm text-neutral-600">Tax ID</FormLabel>
          <FormControl>
            <Input
              placeholder="Tax ID / VAT Number"
              value={invoiceData.taxId}
              onChange={(e) => setInvoiceData({ taxId: e.target.value })}
            />
          </FormControl>
        </FormItem>
      </div>

      {/* Address Section */}
      <div className="pt-4 border-t border-neutral-100">
        <p className="text-sm text-neutral-500 mb-4">Address</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel className="text-sm text-neutral-600">Street</FormLabel>
            <FormControl>
              <Input
                placeholder="123 Main Street"
                value={invoiceData.companyAddress}
                onChange={(e) =>
                  setInvoiceData({ companyAddress: e.target.value })
                }
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm text-neutral-600">City</FormLabel>
            <FormControl>
              <Input
                placeholder="New York"
                value={invoiceData.companyCity}
                onChange={(e) =>
                  setInvoiceData({ companyCity: e.target.value })
                }
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
              State/Province
            </FormLabel>
            <FormControl>
              <Input
                placeholder="NY"
                value={invoiceData.companyState}
                onChange={(e) =>
                  setInvoiceData({ companyState: e.target.value })
                }
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
              ZIP/Postal Code
            </FormLabel>
            <FormControl>
              <Input
                placeholder="10001"
                value={invoiceData.companyZip}
                onChange={(e) => setInvoiceData({ companyZip: e.target.value })}
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm text-neutral-600">Country</FormLabel>
            <FormControl>
              <Input
                placeholder="United States"
                value={invoiceData.companyCountry}
                onChange={(e) =>
                  setInvoiceData({ companyCountry: e.target.value })
                }
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
    </div>
  );
}
