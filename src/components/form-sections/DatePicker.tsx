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
import { format, parseISO } from "date-fns";

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

  // Parse the date string as local date (not UTC)
  const parseLocalDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    // Split the date string and create a local date
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Format date to YYYY-MM-DD without timezone issues
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDate = parseLocalDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-9 justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-3 h-4 w-4 text-neutral-500" />
          {selectedDate ? (
            <span className="text-neutral-900">
              {format(selectedDate, "PPP")}
            </span>
          ) : (
            <span className="text-neutral-500">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              onChange(formatLocalDate(date));
              setOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
