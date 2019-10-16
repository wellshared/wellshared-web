import { Authority } from './authority.model';
export class User {
    authenticated: boolean;
    authorities: Authority;
    name: string;
}
