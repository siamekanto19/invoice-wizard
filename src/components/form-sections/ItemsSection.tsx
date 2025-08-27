"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Package } from "lucide-react";
import { useInvoiceStore } from "@/store/invoice-store";

export default function ItemsSection() {
  const { invoiceData, addItem, removeItem, updateItem } = useInvoiceStore();
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const handleAddItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.unitPrice >= 0) {
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
    <div className="space-y-6">
      {/* Add New Item Section */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-4 w-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">
            Add New Item
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wide block mb-2">
              Description *
            </label>
            <Input
              placeholder="Product or service description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              onKeyPress={handleItemKeyPress}
              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wide block mb-2">
              Quantity
            </label>
            <Input
              type="number"
              placeholder="1"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
              onKeyPress={handleItemKeyPress}
              min="1"
              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wide block mb-2">
              Unit Price
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={newItem.unitPrice}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  unitPrice: parseFloat(e.target.value) || 0,
                })
              }
              onKeyPress={handleItemKeyPress}
              min="0"
              step="0.01"
              className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-600 uppercase tracking-wide block mb-2">
              Total
            </label>
            <div className="h-11 flex items-center justify-center font-bold text-slate-900 bg-white px-4 border border-slate-200 rounded-lg">
              ${(newItem.quantity * newItem.unitPrice).toFixed(2)}
            </div>
          </div>

          <div className="md:col-span-1">
            <Button
              type="button"
              onClick={handleAddItem}
              className="h-11 w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!newItem.description || newItem.quantity <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {invoiceData.items.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
            <div className="p-3 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">No items added yet</p>
            <p className="text-sm text-slate-400">
              Add your first item above to get started
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 uppercase tracking-wide">
              <div className="md:col-span-5">Description</div>
              <div className="md:col-span-2">Quantity</div>
              <div className="md:col-span-2">Unit Price</div>
              <div className="md:col-span-2">Total</div>
              <div className="md:col-span-1">Action</div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {invoiceData.items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="md:col-span-5">
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleUpdateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Item description"
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateItem(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="1"
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleUpdateItem(
                          item.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min="0"
                      step="0.01"
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="h-10 flex items-center justify-center font-semibold text-slate-900 bg-slate-50 px-3 border border-slate-200 rounded-lg">
                      ${item.total.toFixed(2)}
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-10 w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
