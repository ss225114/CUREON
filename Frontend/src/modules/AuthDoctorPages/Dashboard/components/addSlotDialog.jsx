import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDashboard } from "../context/DashboardContext";
import { FaPlus } from "react-icons/fa";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function AddSlotDialog({ date }) {
  const [open, setOpen] = useState(false);

  const {
    slotForm,
    handleSlotChange,
    submitSlot,
    getSlotsByDate
  } = useDashboard();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
        >
          <FaPlus className="mr-2 h-3 w-3" />
          Add Slot
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[450px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#293379] dark:text-white">
            Add Schedule Slot
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Day */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Day
            </label>
            <select
              name="day_of_week"
              value={slotForm.day_of_week}
              onChange={handleSlotChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800"
            >
              {days.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Start Time
            </label>
            <input
              type="time"
              name="start_time"
              value={slotForm.start_time}
              onChange={handleSlotChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#293379]"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              End Time
            </label>
            <input
              type="time"
              name="end_time"
              value={slotForm.end_time}
              onChange={handleSlotChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#293379]"
            />
          </div>

          {/* Slot Duration */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Slot Duration (minutes)
            </label>
            <input
              type="number"
              name="slot_duration"
              value={slotForm.slot_duration}
              onChange={handleSlotChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#016b61]"
            />
          </div>

          {/* Break Time */}
          <div>
            <div className="text-sm text-gray-500 mb-1">
              Break Time (optional)
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                name="break_start"
                value={slotForm.break_start}
                onChange={handleSlotChange}
                className="p-2 border rounded-lg dark:bg-gray-800"
              />
              <input
                type="time"
                name="break_end"
                value={slotForm.break_end}
                onChange={handleSlotChange}
                className="p-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="bg-[#016b61] hover:bg-[#015951] text-white w-full"
            onClick={async () => {
              const success = await submitSlot();
              if (success) {
                setOpen(false);
                await getSlotsByDate(date);
                // onSlotAdded();
              }
            }}
          >
            Save Slot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}