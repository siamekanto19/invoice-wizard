"use client";

import React from "react";
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
import DatePicker from "@/components/form-sections/DatePicker";

type Props = {
  form: any;
  invoiceData: any;
  debouncedUpdateField: (field: string, value: any) => void;
  generateInvoiceNumber: () => void;
};

export default function InvoiceDetails({
  form,
  invoiceData,
  debouncedUpdateField,
  generateInvoiceNumber,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-2 items-end">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }: any) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs font-medium text-stone-600">
                  Invoice Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="INV-2026-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="button"
            onClick={generateInvoiceNumber}
            className="h-9 px-3 rounded-md border border-stone-200 text-xs font-medium text-stone-700 hover:border-stone-400 transition-colors duration-150 cursor-pointer shrink-0"
          >
            Auto
          </button>        </div>

        <FormField
          control={form.control}
          name="template"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <FormLabel className="text-xs font-medium text-stone-600">
                Template
              </FormLabel>
              <p className="text-xs text-stone-500 mb-2">
                Choose a layout for the PDF
              </p>
              <FormControl className="w-full">
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-stone-600">
                Invoice Date
              </FormLabel>
              <p className="text-xs text-stone-500 mb-2">
                Date the invoice is issued
              </p>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={(date: string) => {
                    field.onChange(date);
                    debouncedUpdateField("invoiceDate", date);
                  }}
                  placeholder="Select date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-stone-600">
                Due Date
              </FormLabel>
              <p className="text-xs text-stone-500 mb-2">
                When payment is expected
              </p>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={(date: string) => {
                    field.onChange(date);
                    debouncedUpdateField("dueDate", date);
                  }}
                  placeholder="Select date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
