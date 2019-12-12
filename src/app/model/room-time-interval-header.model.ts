import { Center } from './center.model';
import { RoomTimeIntervalDetail } from './room-time-interval-detail.model';

export class RoomTimeIntervalHeader {
    id: number;
    center: Center;
    dayFrom: Date;
    dayTo: Date;
    roomTimeIntervalDetails: RoomTimeIntervalDetail[];
    active: number;
}
