"use client";

import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }: any) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm font-medium text-slate-700">
                  Invoice Number *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="INV-001"
                    {...field}
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateInvoiceNumber}
              className="h-11 px-4 bg-slate-50 hover:bg-slate-100 border-slate-200"
              title="Generate auto invoice number"
            >
              Auto
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700">
                Invoice Date *
              </FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={(date: string) => {
                    field.onChange(date);
                    debouncedUpdateField("invoiceDate", date);
                  }}
                  placeholder="Select invoice date"
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
              <FormLabel className="text-sm font-medium text-slate-700">
                Due Date *
              </FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={(date: string) => {
                    field.onChange(date);
                    debouncedUpdateField("dueDate", date);
                  }}
                  placeholder="Select due date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-slate-700">
                Template *
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger className="!h-11 w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
