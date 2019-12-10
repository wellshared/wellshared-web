import { Center } from './center.model';

export class RoomTimeIntervalHeader {
    id: number;
    center: Center;
    dayFrom: Date;
    dayTo: Date;
    active: number;
}
