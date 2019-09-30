export class Marker {
    lat: number;
    lng: number;
    draggable: boolean;
    description: string;
    label?: string;
    precio: string;
    img: string;
    centroid: number;
    constructor(lat, lng, draggable, label, description, precio, img, centroid) {
        this.lat = lat;
        this.lng = lng;
        this.draggable = draggable;
        this.label = label;
        this.description = description;
        this.precio = precio;
        this.img = img;
        this.centroid = centroid;
    }
}
