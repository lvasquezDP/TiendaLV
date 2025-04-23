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
export interface PrecioVenta {
    id:           number;
    tiendaId:     number;
    productoId:   number;
    precioCompra: number;
    precioVenta:  number;
    stock:        number;
    minStock:     number;
    producto:     Producto;
}

export interface Producto {
    id:            number;
    codigo:        string;
    nombre:        string;
    nombrePublico: string;
    descripcion:   string;
    img?:          string;
    precio:        number;
    proveedorId:   number;
    proveedor:     Proveedor;
}
