function fridayThe13th(arr: unknown[]): void {
    enum months {
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    } 

    for (const element of arr) {
        if (element instanceof Date && element.getDay() === 5 && element.getDate() === 13) {
            console.log(`${element.getDate()}-${months[element.getMonth()]}-${element.getFullYear()}`);
        }
    }
}

fridayThe13th([{}, new Date(2025, 4, 13), null, new Date(2025, 5, 13), '13-09-2023', new Date(2025, 6, 13)]);