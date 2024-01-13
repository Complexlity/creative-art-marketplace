import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, type = "relative") {
  if (type === "full") {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return dayjs(date).fromNow();
}

export const getCategory = {
  "COL": "Collectibles",
  "ART": "art",
  "GAM": "gaming",
    'MUS': "music",
  "EST": "real estate",
  "DOM":"domain names"
}


export function verifyDates(startDate: string, endDate: string) {
  const checkedStartDate = new Date(startDate);
  checkedStartDate.setHours(0, 0, 0, 0);
  const checkedEndDate = new Date(endDate);
  checkedEndDate.setDate(checkedEndDate.getDate());
  checkedEndDate.setHours(0, 0, 0, 0);

  return checkedEndDate.getTime() > checkedStartDate.getTime();
}