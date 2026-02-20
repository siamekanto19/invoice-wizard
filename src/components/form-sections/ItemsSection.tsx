"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useInvoiceStore } from "@/store/invoice-store";

export default function ItemsSection() {
  const { invoiceData, addItem, removeItem, updateItem } = useInvoiceStore();
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const handleAddItem = () => {
    if (newItem.description && newItem.quantity > 0) {
      addItem(newItem);
      setNewItem({ description: "", quantity: 1, unitPrice: 0 });
    }
  };

  const handleItemKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleUpdateItem = (
    id: string,
    field: string,
    value: string | number
  ) => {
    updateItem(id, { [field]: value });
  };

  return (
    <div className="space-y-3">
      {/* Column headers */}
      <div className="hidden md:grid grid-cols-12 gap-2 px-1 pb-1">
        <p className="col-span-5 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Description</p>
        <p className="col-span-2 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Qty</p>
        <p className="col-span-2 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Unit price</p>
        <p className="col-span-2 text-[10px] uppercase tracking-widest text-stone-400 font-medium">Total</p>
        <p className="col-span-1" />
      </div>

      {/* Existing items */}
      {invoiceData.items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 py-8 text-center">
          <p className="text-xs font-medium text-stone-400">No items yet</p>
          <p className="text-xs text-stone-300 mt-0.5">Add your first item below</p>
        </div>
      ) : (
        <div className="space-y-2">
          {invoiceData.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 p-3 bg-white border border-stone-200 rounded-lg items-center"
            >
              <div className="col-span-12 md:col-span-5">
                <Input
                  value={item.description}
                  onChange={(e) =>
                    handleUpdateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="h-8 text-sm border-stone-200 focus-visible:ring-stone-300"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateItem(item.id, "quantity", parseInt(e.target.value) || 0)
                  }
                  min="1"
                  className="h-8 text-sm border-stone-200 focus-visible:ring-stone-300"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleUpdateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                  }
                  step="0.01"
                  className="h-8 text-sm border-stone-200 focus-visible:ring-stone-300"
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <div className="h-8 flex items-center px-3 rounded-md bg-stone-50 border border-stone-200 text-xs font-medium text-stone-700 tabular-nums">
                  ${item.total.toFixed(2)}
                </div>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="w-full h-8 flex items-center justify-center text-stone-300 hover:text-red-500 transition-colors duration-150 cursor-pointer rounded-md hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new item row */}
      <div className="grid grid-cols-12 gap-2 p-3 bg-stone-50 border border-dashed border-stone-300 rounded-lg items-end">
        <div className="col-span-12 md:col-span-5">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1.5 md:hidden">
            Description
          </label>
          <Input
            placeholder="Product or service"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            onKeyDown={handleItemKeyPress}
            className="h-8 text-sm bg-white border-stone-200 focus-visible:ring-stone-300"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1.5 md:hidden">
            Qty
          </label>
          <Input
            type="number"
            placeholder="1"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
            onKeyDown={handleItemKeyPress}
            min="1"
            className="h-8 text-sm bg-white border-stone-200 focus-visible:ring-stone-300"
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1.5 md:hidden">
            Price
          </label>
          <Input
            type="number"
            placeholder="0.00"
            value={newItem.unitPrice}
            onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) || 0 })}
            onKeyDown={handleItemKeyPress}
            step="0.01"
            className="h-8 text-sm bg-white border-stone-200 focus-visible:ring-stone-300"
          />
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="h-8 flex items-center px-3 rounded-md bg-white border border-stone-200 text-xs text-stone-400 tabular-nums">
            ${(newItem.quantity * newItem.unitPrice).toFixed(2)}
          </div>
        </div>
        <div className="col-span-1">
          <button
            type="button"
            onClick={handleAddItem}
            disabled={!newItem.description || newItem.quantity <= 0}
            className="w-full h-8 flex items-center justify-center bg-stone-900 text-white rounded-md hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

