export function createDatesByWeek(from: Date, weekCount: number): Date[] {
    const dates: Date[] = []

    const day = from.getDate()
    const month = from.getMonth()
    const year = from.getFullYear()

    for (let i = 0; i <= weekCount; i++) {
        dates.push(new Date(year, month, day - 7 * i))
    }

    return dates
}
