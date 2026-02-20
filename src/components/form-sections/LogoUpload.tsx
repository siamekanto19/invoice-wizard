"use client";

import React from "react";
import { Upload, X } from "lucide-react";
import { useInvoiceStore } from "@/store/invoice-store";

const LogoUpload = () => {
  const { invoiceData, setInvoiceData } = useInvoiceStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-stone-600">Company Logo</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id="logo-upload"
      />
      {invoiceData.companyLogo ? (
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 flex items-center justify-center">
            <img
              src={invoiceData.companyLogo}
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={removeLogo}
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-700">Logo uploaded</p>
            <button
              type="button"
              onClick={() => document.getElementById("logo-upload")?.click()}
              className="text-xs text-stone-400 hover:text-stone-700 transition-colors mt-0.5 cursor-pointer"
            >
              Replace image
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => document.getElementById("logo-upload")?.click()}
          className="w-full h-20 rounded-lg border border-dashed border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-stone-100 transition-colors duration-150 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
        >
          <Upload className="h-4 w-4 text-stone-400 group-hover:text-stone-600 transition-colors" />
          <p className="text-xs font-medium text-stone-500 group-hover:text-stone-700 transition-colors">
            Upload logo
          </p>
          <p className="text-[10px] text-stone-400">PNG, JPG up to 5MB</p>
        </button>
      )}
    </div>
  );
};

export default LogoUpload;

