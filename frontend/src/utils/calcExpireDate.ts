import { EXPIRE_DURATION_TYPE } from "./constants";
import {DateTime} from "luxon";

export default function calcExpireDate(duration: EXPIRE_DURATION_TYPE, amountS: string): Date {
    const amount = parseInt(amountS)
    switch (duration) {
        case "MINUTE":
            return DateTime.now().plus({minutes: amount}).toJSDate()
        case "HOUR":
            return DateTime.now().plus({hours: amount}).toJSDate()
        case "DAY":
            return DateTime.now().plus({days: amount}).toJSDate()
        case "WEEK":
            return DateTime.now().plus({weeks: amount}).toJSDate()
        case "MONTH":
            return DateTime.now().plus({months: amount}).toJSDate()
        default:
            return null
    }
}