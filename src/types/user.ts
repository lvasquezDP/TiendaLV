export interface UserLogin extends User {
    tienda:        Tienda;
}
export interface User {
    id:            number;
    nombre:        string;
    correo:        string;
    correoValido:  boolean;
    rol:           string;
    img:           null;
    tiendaId:      number;
    fechaCreacion: Date;
}

export interface Tienda {
    id:            number;
    nombre:        string;
    contacto:      string;
    direccion:     string;
    img?:          string;
    fechaCreacion: Date;
}

export interface Proveedor {
    id:            number;
    nombre:        string;
    contacto:      string;
    direccion:     string;
    img?:          string;
    fechaCreacion: Date;
}
