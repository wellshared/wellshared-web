import { Localidad } from './localidad.model';
import { Imagen } from './imagen.model';

export class Centro {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: Imagen;
    localidad: Localidad;
    direccion: string;
    descripcion2: string;
    telefono: string;
    img: string;
    precio: string;
    lat: string;
    lang: string;
    individual: number;
    actividades: number;
    url: string;
}
