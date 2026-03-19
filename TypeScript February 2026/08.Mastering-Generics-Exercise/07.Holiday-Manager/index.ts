enum TravelVacation {
    Abroad = 'Abroad',
    InCountry = 'InCountry'
}

enum MountainVacation {
    Ski = 'Ski',
    Hiking = 'Hiking'
}

enum BeachVacation {
    Pool = 'Pool',
    Sea = 'Sea',
    ScubaDiving = 'ScubaDiving'
}

interface Holiday {
    set start(val: Date);
    set end(val: Date);
    getInfo(): string;
}

interface VacationManager<T, V> {
    reserveVacation(holiday: T, vacationType: V): void;
    listReservations(): string;
}

class PlannedHoliday implements Holiday {
    private _start!: Date;
    private _end!: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    get start(): Date {
        return this._start;
    }

    set start(val: Date) {
        if (!this.end || (this.end && (val.getTime() < this.end.getTime()))) {
            this._start = val;
        }
        else {
            throw new Error("Start date cannot be after end date");
        }
    }

    get end(): Date {
        return this._end;
    }

    set end(val: Date) {
        if (!this.start || (this.start && (this.start.getTime() < val.getTime()))) {
            this._end = val;
        }
        else {
            throw new Error("End date cannot be before start date");
        }
    }

    getInfo(): string {
        return `Holiday: ${this.formatDate(this.start)} - ${this.formatDate(this.end)}`;
    }

    private formatDate(date: Date): string {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}

class HolidayManager<T extends Holiday, V extends TravelVacation | MountainVacation | BeachVacation> implements VacationManager<T, V> {
    private vacations: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V): void {
        this.vacations.set(holiday, vacationType);
    }

    listReservations(): string {
        const result: string[] = [];

        this.vacations.forEach((vacationType, holiday) => {
            result.push(`${holiday.getInfo()} => ${vacationType}`);
        });

        return result.join("\n");
    }
}

let holiday = new PlannedHoliday(new Date(2024, 1, 1), new Date(2024, 1, 4));
let holiday2 = new PlannedHoliday(new Date(2025, 3, 14), new Date(2025, 3, 17));
let holidayManager = new HolidayManager<Holiday, TravelVacation>();
holidayManager.reserveVacation(holiday, TravelVacation.Abroad);
holidayManager.reserveVacation(holiday2, TravelVacation.InCountry);
console.log(holidayManager.listReservations());