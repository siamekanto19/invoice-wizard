"use client";

import React from "react";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Invoice Number */}
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }: any) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm text-neutral-600">
                  Invoice Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="INV-001" {...field} />
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
              className="h-9"
            >
              Generate
            </Button>
          </div>
        </div>

        {/* Template */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm text-neutral-600">
                Template
              </FormLabel>
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

        {/* Invoice Date */}
        <FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm text-neutral-600">
                Invoice Date
              </FormLabel>
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

        {/* Due Date */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel className="text-sm text-neutral-600">
                Due Date
              </FormLabel>
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
