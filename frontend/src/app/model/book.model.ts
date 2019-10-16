import { Center } from './center.model';
import { BookStatus } from './book-status.model';
export class Book {
    id: number;
    center: Center;
    email: string;
    date: string;
    timeTo: string;
    timeFrom: string;
    bookStatus: BookStatus;
    constructor(id: number, center: Center, email: string, date: string, timeTo: string, timeFrom: string, bookStatus: BookStatus) {
        this.id = id;
        this.center = center;
        this.email = email;
        this.date = date;
        this.timeTo = timeTo;
        this.timeFrom = timeFrom;
        this.bookStatus = bookStatus;
    }
}
