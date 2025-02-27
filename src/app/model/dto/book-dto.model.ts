export class BookDto {
    centerId: number;
    name: string;
    sname: string;
    number: string;
    email: string;
    phone: string;
    date: Date;
    timeFrom: string;
    timeTo: string;
    paymentDescription: string;
    amount: number;
    currency: string;
    stripeToken: string;

    constructor(
        centerId: number, name: string, sname: string,
        email: string, phone: string, numb: string,
        date: Date, timeFrom: string, timeTo: string,
        paymentDescription: string, amount: number, currency: string,
        stripeToken: string
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
        this.paymentDescription = paymentDescription;
        this.amount = amount;
        this.currency = currency;
        this.stripeToken = stripeToken;
    }
}
