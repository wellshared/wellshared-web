export class Constants {
    public static CALENDAR_API_KEY = 'AIzaSyCb8_OZDRltemoo6sK3wrKDdu1vIZil-2w';
    public static STORAGE_USR = 'wllshusrss';
    public static hours = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
    ];

    public static months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    public static get years() {
        const list = [];
        const current: number = (new Date()).getFullYear();
        for (let index = 0; index < 6; index++) {
            list.push(current + index);
        }
        return list;
    }



}
