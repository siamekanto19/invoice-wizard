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

export default function ClientSection({ form }: { form: any }) {
  const { invoiceData, setInvoiceData } = useInvoiceStore();

  return (
    <div className="space-y-4">
      {/* Client Name */}
      <FormField
        control={form.control}
        name="clientName"
        render={({ field }: any) => (
          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
              Client Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Client Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm text-neutral-600">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="client@example.com"
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
              placeholder="+1 (555) 987-6543"
              type="tel"
              value={invoiceData.clientPhone}
              onChange={(e) =>
                useInvoiceStore
                  .getState()
                  .setInvoiceData({ clientPhone: e.target.value })
              }
            />
          </FormControl>
        </FormItem>
      </div>

      {/* Address Section */}
      <div className="pt-4 border-t border-neutral-100">
        <p className="text-sm text-neutral-500 mb-4">Billing Address</p>

        <FormItem className="mb-4">
          <FormLabel className="text-sm text-neutral-600">Street</FormLabel>
          <FormControl>
            <Input
              placeholder="456 Oak Avenue"
              value={invoiceData.clientAddress}
              onChange={(e) =>
                useInvoiceStore
                  .getState()
                  .setInvoiceData({ clientAddress: e.target.value })
              }
            />
          </FormControl>
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel className="text-sm text-neutral-600">City</FormLabel>
            <FormControl>
              <Input
                placeholder="Los Angeles"
                value={invoiceData.clientCity}
                onChange={(e) =>
                  useInvoiceStore
                    .getState()
                    .setInvoiceData({ clientCity: e.target.value })
                }
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
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
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormItem>
            <FormLabel className="text-sm text-neutral-600">
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
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel className="text-sm text-neutral-600">Country</FormLabel>
            <FormControl>
              <Input
                placeholder="United States"
                value={invoiceData.clientCountry}
                onChange={(e) =>
                  useInvoiceStore
                    .getState()
                    .setInvoiceData({ clientCountry: e.target.value })
                }
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
    </div>
  );
}
