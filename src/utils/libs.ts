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


  export function convertStringDateToMilleseconds(date: string | null) {
    if (!date) return Date.now();
    const dateObject = new Date(date);
      return dateObject.setHours(0, 0, 0, 0);
}

export function getAuctionDateStatus(start_date: string, end_date: string) {
  const now = new Date();
  const startDate = convertStringDateToMilleseconds(start_date)

    if (now.getTime() > startDate) {
      return { started: true, countDownDate: end_date };
    }
  return { started: false, countDownDate: start_date };
}