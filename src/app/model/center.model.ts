import { Image } from './image.model';
import { Service } from './service.model';
import { Location } from './location.model';
export class Center {
    id: number;
    name: string;
    description: string;
    image: Image;
    images: Image[] = [];
    location: Location;
    adress: string;
    description2: string;
    phone: string;
    price: string;
    lat: string;
    lon: string;
    individual: number;
    activites: number;
    services: Service[] = [];
    url: string;
}
