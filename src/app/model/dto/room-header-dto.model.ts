export class RoomHeaderDto {
    dayFrom: Date;
    dayTo: Date;

    constructor(dayFrom: Date, dayTo: Date) {
        this.dayFrom = dayFrom;
        this.dayTo = dayTo;
    }
}
