"use client";

import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { useInvoiceStore } from "@/store/invoice-store";

const LogoUpload = () => {
  const { invoiceData, setInvoiceData } = useInvoiceStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setInvoiceData({ companyLogo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setInvoiceData({ companyLogo: "" });
  };

  return (
    <div className="space-y-2">
      <FormLabel className="text-sm font-medium text-slate-700">
        Company Logo
      </FormLabel>
      <div className="flex items-center space-x-4">
        {invoiceData.companyLogo ? (
          <div className="relative">
            <img
              src={invoiceData.companyLogo}
              alt="Company Logo"
              className="w-20 h-20 object-contain border rounded-lg border-slate-200"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0"
              onClick={removeLogo}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-slate-300 rounded-lg">
            <Upload className="h-6 w-6 text-slate-400" />
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="logo-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("logo-upload")?.click()}
            className="border-slate-200 hover:bg-slate-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Logo
          </Button>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 5MB</p>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
