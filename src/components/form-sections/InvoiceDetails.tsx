"use client";

import React from "react";
import {
  FileText,
  Hash,
  Calendar,
  Clock,
  Palette,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      {/* Invoice Identification Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-indigo-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Invoice Identification
            </h4>
            <p className="text-xs text-slate-500">
              Unique identifier and template selection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }: any) => (
                <FormItem className="flex-1 group">
                  <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-indigo-500" />
                    Invoice Number *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="INV-001"
                      {...field}
                      className="h-12 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
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
                className="h-12 px-4 bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-600 rounded-xl transition-all duration-300 hover:shadow-md"
                title="Generate auto invoice number"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Auto
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="template"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-indigo-500" />
                  Template Style *
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v)}
                  >
                    <SelectTrigger className="!h-11 w-full border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          Professional
                        </div>
                      </SelectItem>
                      <SelectItem value="minimal">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          Minimal
                        </div>
                      </SelectItem>
                      <SelectItem value="elegant">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          Elegant
                        </div>
                      </SelectItem>
                      <SelectItem value="playful">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          Playful
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Date Information Card */}
      <Card className="p-6 border-slate-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Date Information
            </h4>
            <p className="text-xs text-slate-500">
              Invoice and payment due dates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                  Invoice Date *
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <DatePicker
                      value={field.value}
                      onChange={(date: string) => {
                        field.onChange(date);
                        debouncedUpdateField("invoiceDate", date);
                      }}
                      placeholder="Select invoice date"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }: any) => (
              <FormItem className="group">
                <FormLabel className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  Due Date *
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <DatePicker
                      value={field.value}
                      onChange={(date: string) => {
                        field.onChange(date);
                        debouncedUpdateField("dueDate", date);
                      }}
                      placeholder="Select due date"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
