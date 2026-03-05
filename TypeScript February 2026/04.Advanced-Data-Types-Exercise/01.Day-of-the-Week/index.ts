function dayOfTheWeek(index: number): string {
    enum days {
        Monday = 1,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    };

    return days[index] ?? "error";
}

console.log(dayOfTheWeek(1));