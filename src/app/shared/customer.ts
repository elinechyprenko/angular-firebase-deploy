export interface Customer {
    key?: string; //id - необязательно, ибо id генерирует сервер
    name: string;
    email: string;
    phone: string;
    location: string;
}