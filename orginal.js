const axios = require('axios');
const ical = require('ical-generator').default; // Correct import
const moment = require('moment');
const fs = require('fs'); // For saving the file

const CITY = 'Surrey';
const STATE = 'BC';
const METHOD = 2; // ISNA
const SCHOOL = 1; // Hanafi = 1, Shafi = 0
const YEAR = 2024;
const MONTH = 11;

// Fetch prayer times
async function getPrayerTimes() {
  try {
    const response = await axios.get(`https://api.aladhan.com/v1/calendarByCity/${YEAR}/${MONTH}?city=${CITY}&state=${STATE}&country=Canada&method=${METHOD}&school=${SCHOOL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching prayer times:", error.message);
    return undefined;
  }
}

// Generate an iCal file
async function generateICal({ alarm = 0, duration = 25 } = {}) {
  const prayerTimes = await getPrayerTimes();
  if (!prayerTimes) {
    console.log("Could not fetch prayer times. Exiting...");
    return;
  }

  const days = Object.values(prayerTimes.data).flatMap((month) => month);
  const allowedEvents = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];

  const calendar = ical({
    name: 'Prayer Times',
    timezone: days[0]?.meta?.timezone || 'UTC',
  });

  for (const day of days) {
    for (const [name, time] of Object.entries(day.timings)) {
      if (!allowedEvents.includes(name)) continue;

      const startDate = moment(`${day.date.gregorian.date} ${time}`, 'DD-MM-YYYY HH:mm').toDate();
      const eventDuration = name === 'Sunrise' ? 10 : name === 'Midnight' ? 1 : duration;

      const event = calendar.createEvent({
        start: startDate,
        end: moment(startDate).add(eventDuration, 'minute').toDate(),
        summary: name,
        timezone: day.meta.timezone,
      });

      if (alarm > 0) {
        event.createAlarm({
          type: 'audio', // Use plain string for alarm type
          triggerBefore: alarm * 60,
        });
      }
    }
  }

  // Write the iCal file to the local directory
  const filePath = './prayer-times.ics';
  fs.writeFileSync(filePath, calendar.toString(), 'utf8');
  console.log(`iCal file saved to: ${filePath}`);
}

// Run the function
generateICal({ alarm: 5, duration: 30 }); // Example: 5-minute alarm, 30-minute duration

