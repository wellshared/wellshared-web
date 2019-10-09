export class ContactDto {
    name: string;
    sname: string;
    email: string;
    phone: string;
    message: string;

    constructor(sname: string, name: string, email: string, phone: string, message: string) {
        this.sname = sname;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }
}
