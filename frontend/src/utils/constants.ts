export const SEEC_API_URL =
    // @ts-ignore
    import.meta.env.VITE_SECRETS_API || "https://api.seec.alexpts.dev"
export const EXPIRE_DURATION = [
    "MINUTE",
    "HOUR",
    "DAY",
    "WEEK",
    "MONTH"
] as const

export type EXPIRE_DURATION_TYPE = typeof EXPIRE_DURATION[number]

export const EXPIRE_MIN = 1
export const EXPIRE_MAX = 100

export const EXPIRE_DURATIONS: Array<{name: string, duration: EXPIRE_DURATION_TYPE}> = [
    {
        name: "encryptSecret.durationMinute",
        duration: "MINUTE"
    },
    {
        name: "encryptSecret.durationHour",
        duration: "HOUR"
    },
    {
        name: "encryptSecret.durationDay",
        duration: "DAY"
    },
    {
        name: "encryptSecret.durationWeek",
        duration: "WEEK"
    },
    {
        name: "encryptSecret.durationMonth",
        duration: "MONTH"
    }

 ] as const