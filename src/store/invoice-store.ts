import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  template: string;

  // Company Information (Sender)
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  companyCountry: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  taxId: string;
  companyLogo: string;

  // Client Information (Recipient)
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  clientCountry: string;
  clientPhone: string;
  clientEmail: string;

  // Invoice Items
  items: InvoiceItem[];

  // Payment Details
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;

  // Payment Information
  paymentTerms: string;
  currency: string;
  bankName: string;
  bankAccount: string;
  bankRouting: string;
  bankSwift: string;
  bankBranch: string;

  // Notes
  notes: string;
  terms: string;
}

interface InvoiceStore {
  invoiceData: InvoiceData;
  setInvoiceData: (data: Partial<InvoiceData>) => void;
  addItem: (item: Omit<InvoiceItem, "id" | "total">) => void;
  updateItem: (id: string, item: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;
  calculateTotals: () => void;
  resetInvoice: () => void;
}

const defaultInvoiceData: InvoiceData = {
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  template: "professional",

  companyName: "",
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyZip: "",
  companyCountry: "",
  companyPhone: "",
  companyEmail: "",
  companyWebsite: "",
  taxId: "",
  companyLogo: "",

  clientName: "",
  clientAddress: "",
  clientCity: "",
  clientState: "",
  clientZip: "",
  clientCountry: "",
  clientPhone: "",
  clientEmail: "",

  items: [],

  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  discountRate: 0,
  discountAmount: 0,
  total: 0,

  paymentTerms: "Net 30",
  currency: "USD",
  bankName: "",
  bankAccount: "",
  bankRouting: "",
  bankSwift: "",
  bankBranch: "",

  notes: "",
  terms: "",
};

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set, get) => ({
      invoiceData: defaultInvoiceData,

      setInvoiceData: (data) => {
        set((state) => ({
          invoiceData: { ...state.invoiceData, ...data },
        }));
        get().calculateTotals();
      },

      addItem: (item) => {
        const newItem: InvoiceItem = {
          id: crypto.randomUUID(),
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
        };

        set((state) => ({
          invoiceData: {
            ...state.invoiceData,
            items: [...state.invoiceData.items, newItem],
          },
        }));
        get().calculateTotals();
      },

      updateItem: (id, item) => {
        set((state) => ({
          invoiceData: {
            ...state.invoiceData,
            items: state.invoiceData.items.map((existingItem) => {
              if (existingItem.id === id) {
                const updatedItem = { ...existingItem, ...item };
                if (
                  item.quantity !== undefined ||
                  item.unitPrice !== undefined
                ) {
                  updatedItem.total =
                    updatedItem.quantity * updatedItem.unitPrice;
                }
                return updatedItem;
              }
              return existingItem;
            }),
          },
        }));
        get().calculateTotals();
      },

      removeItem: (id) => {
        set((state) => ({
          invoiceData: {
            ...state.invoiceData,
            items: state.invoiceData.items.filter((item) => item.id !== id),
          },
        }));
        get().calculateTotals();
      },

      calculateTotals: () => {
        const state = get();
        const { items, taxRate, discountRate } = state.invoiceData;

        const subtotal = items.reduce((sum, item) => sum + item.total, 0);
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;

        set((state) => ({
          invoiceData: {
            ...state.invoiceData,
            subtotal,
            taxAmount,
            discountAmount,
            total,
          },
        }));
      },

      resetInvoice: () => {
        set({ invoiceData: defaultInvoiceData });
      },
    }),
    {
      name: "invoice-storage",
    }
  )
);
