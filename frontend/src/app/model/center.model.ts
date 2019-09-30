import { Localidad } from './location.model';
import { Image } from './image.model';
import { Service } from './service.model';

export class Center {
    id: number;
    name: string;
    description: string;
    image: Image;
    location: Localidad;
    adress: string;
    description2: string;
    phone: string;
    mainImage: string;
    price: string;
    lat: string;
    lon: string;
    individual: number;
    activites: number;
    services: Service[];
    url: string;
}
