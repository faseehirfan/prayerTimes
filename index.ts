import axios from "axios";
import ical, { ICalAlarmType } from "ical-generator"; // Correct import for TypeScript
import moment from "moment";
import { Datatype } from "./types";
import fs from "fs"; // For saving the file

// Fetch prayer times
async function getPrayerTimes() {
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/calendarByCity/2024/11?city=Surrey&state=BC&country=Canada&method=2&school=1`
    );
    return response.data as Record<string, Datatype>;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return undefined;
  }
}

// Generate an iCal file
async function generateICal({
  alarm = 0,
  duration = 25,
}: { alarm?: number; duration?: number } = {}): Promise<void> {
  const prayerTimes = await getPrayerTimes();
  if (!prayerTimes) {
    console.log("Could not fetch prayer times. Exiting...");
    return;
  }

  const days = Object.values(prayerTimes).flatMap((month) => month);
  const allowedEvents = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
    "Midnight",
  ];
  const calendar = ical({
    name: "Prayer Times",
    timezone: days[0].meta.timezone,
  });

  for (const day of days) {
    for (const [name, time] of Object.entries(day.timings)) {
      if (!allowedEvents.includes(name)) continue;
      const startDate = moment(
        `${day.date.gregorian.date} ${time}`,
        "DD-MM-YYYY HH:mm"
      ).toDate();
      const defaultDuration =
        name === "Sunrise"
          ? 10
          : name === "Midnight"
          ? 1
          : duration
          ? +duration
          : 25;
      const event = calendar.createEvent({
        start: startDate,
        end: moment(startDate).add(defaultDuration, "minute").toDate(),
        summary: name,
        timezone: day.meta.timezone,
      });
      if (alarm && +alarm > 0) {
        event.createAlarm({
          type: ICalAlarmType.audio,
          triggerBefore: +alarm * 60,
        });
      }
    }
  }

  // Write the iCal file to the local directory
  const filePath = "./prayer-times.ics";
  fs.writeFileSync(filePath, calendar.toString(), "utf8");
  console.log(`iCal file saved to: ${filePath}`);
}

// Run the function
generateICal({ alarm: 5, duration: 30 }); // Example: 5-minute alarm, 30-minute duration
