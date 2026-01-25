"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-4">
      {/* Add New Item */}
      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12 md:col-span-5">
            <label className="text-sm text-neutral-600 block mb-1.5">
              Description
            </label>
            <Input
              placeholder="Product or service"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              onKeyPress={handleItemKeyPress}
            />
          </div>

          <div className="col-span-4 md:col-span-2">
            <label className="text-sm text-neutral-600 block mb-1.5">Qty</label>
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
            />
          </div>

          <div className="col-span-4 md:col-span-2">
            <label className="text-sm text-neutral-600 block mb-1.5">
              Price
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
              step="0.01"
            />
          </div>

          <div className="col-span-4 md:col-span-2">
            <label className="text-sm text-neutral-600 block mb-1.5">
              Total
            </label>
            <div className="h-9 flex items-center px-3 bg-white border border-neutral-200 rounded-md text-sm font-medium">
              ${(newItem.quantity * newItem.unitPrice).toFixed(2)}
            </div>
          </div>

          <div className="col-span-12 md:col-span-1">
            <Button
              type="button"
              onClick={handleAddItem}
              className="w-full"
              disabled={!newItem.description || newItem.quantity <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Items List */}
      {invoiceData.items.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-neutral-200 rounded-lg">
          <p className="text-neutral-500 text-sm">No items added yet</p>
          <p className="text-neutral-400 text-xs mt-1">
            Add your first item above
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-3 py-2 text-xs text-neutral-500 font-medium">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          {invoiceData.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 p-3 bg-white border border-neutral-200 rounded-lg items-center"
            >
              <div className="col-span-12 md:col-span-5">
                <Input
                  value={item.description}
                  onChange={(e) =>
                    handleUpdateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="h-9"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
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
                  className="h-9"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
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
                  step="0.01"
                  className="h-9"
                />
              </div>
              <div className="col-span-2 md:col-span-2">
                <div className="h-9 flex items-center px-3 bg-neutral-50 border border-neutral-200 rounded-md text-sm font-medium">
                  ${item.total.toFixed(2)}
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="w-full h-9 text-neutral-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
