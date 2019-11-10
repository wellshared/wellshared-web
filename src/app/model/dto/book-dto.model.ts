export class BookDto {
    centerId: number;
    name: string;
    sname: string;
    number: number;
    email: string;
    phone: string;
    date: string;
    timeFrom: string;
    timeTo: string;

    constructor(
        centerId: number, name: string, sname: string,
        email: string, phone: string, numb: string,
        date: string, timeTo: string, timeFrom: string
        ) {
        this.centerId = centerId;
        this.name = name;
        this.sname = sname;
        this.email = email;
        this.phone = phone;
        this.number = numb;
        this.date = date;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
    }
}
