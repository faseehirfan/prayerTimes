"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ical_generator_1 = __importStar(require("ical-generator")); // Correct import for TypeScript
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs")); // For saving the file
// Fetch prayer times
function getPrayerTimes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.aladhan.com/v1/calendarByCity/2024/11?city=Surrey&state=BC&country=Canada&method=2&school=1`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching prayer times:", error);
            return undefined;
        }
    });
}
// Generate an iCal file
function generateICal() {
    return __awaiter(this, arguments, void 0, function* ({ alarm = 0, duration = 25, } = {}) {
        const prayerTimes = yield getPrayerTimes();
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
        const calendar = (0, ical_generator_1.default)({
            name: "Prayer Times",
            timezone: days[0].meta.timezone,
        });
        for (const day of days) {
            for (const [name, time] of Object.entries(day.timings)) {
                if (!allowedEvents.includes(name))
                    continue;
                const startDate = (0, moment_1.default)(`${day.date.gregorian.date} ${time}`, "DD-MM-YYYY HH:mm").toDate();
                const defaultDuration = name === "Sunrise"
                    ? 10
                    : name === "Midnight"
                        ? 1
                        : duration
                            ? +duration
                            : 25;
                const event = calendar.createEvent({
                    start: startDate,
                    end: (0, moment_1.default)(startDate).add(defaultDuration, "minute").toDate(),
                    summary: name,
                    timezone: day.meta.timezone,
                });
                if (alarm && +alarm > 0) {
                    event.createAlarm({
                        type: ical_generator_1.ICalAlarmType.audio,
                        triggerBefore: +alarm * 60,
                    });
                }
            }
        }
        // Write the iCal file to the local directory
        const filePath = "./prayer-times.ics";
        fs_1.default.writeFileSync(filePath, calendar.toString(), "utf8");
        console.log(`iCal file saved to: ${filePath}`);
    });
}
// Run the function
generateICal({ alarm: 5, duration: 30 }); // Example: 5-minute alarm, 30-minute duration
