"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function DatePicker({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (date: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-11 justify-start text-left font-normal border-slate-200 hover:bg-slate-50 focus:border-blue-500 focus:ring-blue-500/20"
        >
          <CalendarIcon className="mr-3 h-4 w-4 text-slate-500" />
          {value ? (
            <span className="text-slate-900">
              {format(new Date(value), "PPP")}
            </span>
          ) : (
            <span className="text-slate-500">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-slate-200 shadow-lg"
        align="start"
      >
        <CalendarComponent
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            if (date) {
              onChange(date.toISOString().split("T")[0]);
              setOpen(false);
            }
          }}
          initialFocus
          className="rounded-lg"
        />
      </PopoverContent>
    </Popover>
  );
}
