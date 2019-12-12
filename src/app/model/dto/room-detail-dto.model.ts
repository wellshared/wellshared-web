export class RoomDetailDto {
    timeFrom: string;
    timeTo: string;

    constructor(timeFrom: string, timeTo: string) {
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
    }
}
