export class Marker {
    lat: number;
    lng: number;
    draggable: boolean;
    description: string;
    label?: string;
    price: string;
    img: string;
    centerid: number;
    constructor(lat, lng, draggable, label, description, price, img, centerid) {
        this.lat = lat;
        this.lng = lng;
        this.draggable = draggable;
        this.label = label;
        this.description = description;
        this.price = price;
        this.img = img;
        this.centerid = centerid;
    }
}
