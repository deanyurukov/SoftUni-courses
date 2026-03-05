function reversedDayOfTheWeek(day: string): number | string {
    enum days {
        Monday = 1,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    };

    const idx = days[day as keyof typeof days];
    return idx ?? "error";
}

console.log(reversedDayOfTheWeek("Monday"));