export class RentDto {
    center: string;
    name: string;
    email: string;
    phone: string;
    message: string;

    constructor(center: string, name: string, email: string, phone: string, message: string) {
        this.center = center;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }
}
